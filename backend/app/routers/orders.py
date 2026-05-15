from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request
from sqlalchemy.orm import Session
import geoip2.webservice
import geoip2.errors

from app.database import get_db
from app.models.order import Order, OrderItem, generate_order_number
from app.models.product import Product
from app.schemas.order import CreateOrderIn, OrderOut, UpsellDecisionIn
from app.utils.hashing import normalize_phone_qa
from app.services import sheets, capi
from app.config import settings

router = APIRouter(prefix="/orders", tags=["orders"])

UPSELL_PRICE = 99.0


@router.post("/", response_model=OrderOut, status_code=201)
async def create_order(
    payload: CreateOrderIn,
    request: Request,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    phone_normalized = normalize_phone_qa(payload.phone)
    ip_address = payload.ip_address or (str(request.client.host) if request.client else "")

    # MaxMind IP Check (Block non-Qatar and VPNs)
    # Whitelist specific test numbers
    if phone_normalized not in ("0544268867", "+974544268867", "544268867", "+9740544268867", "009740544268867"):
        if settings.MAXMIND_ACCOUNT_ID and settings.MAXMIND_LICENSE_KEY and ip_address:
            if ip_address not in ("127.0.0.1", "::1", "localhost"):
                try:
                    with geoip2.webservice.Client(int(settings.MAXMIND_ACCOUNT_ID), settings.MAXMIND_LICENSE_KEY) as client:
                        response = client.insights(ip_address)
                        
                        # 1. Check if country is Qatar
                        if response.country.iso_code != "QA":
                            raise HTTPException(status_code=400, detail="عذراً، الطلبات متاحة فقط من داخل دولة قطر.")
                        
                        # 2. Check for VPN or suspicious IP
                        traits = response.traits
                        if traits.is_anonymous_vpn or traits.is_anonymous_proxy or traits.is_tor_exit_node or traits.is_hosting_provider:
                            raise HTTPException(status_code=400, detail="عذراً، لا يمكن قبول الطلبات باستخدام VPN أو بروكسي.")
                            
                except geoip2.errors.AddressNotFoundError:
                    pass  # IP not found in MaxMind DB
                except geoip2.errors.GeoIP2Error as e:
                    print(f"MaxMind API Error: {e}")
                except ValueError:
                    print("Invalid MaxMind Account ID")

    order = Order(
        order_number=generate_order_number(),
        customer_name=payload.customer_name,
        phone=payload.phone,
        phone_normalized=phone_normalized,
        subtotal=payload.subtotal,
        total=payload.subtotal,  # upsell not accepted yet
        browser_event_id=payload.browser_event_id,
        ip_address=ip_address,
        user_agent=payload.user_agent or request.headers.get("user-agent", ""),
        # Upsell هي فالفرونت (سلة واحدة)، الطلب الواحد هو النسخة النهائية لهذا الزبون
        status="confirmed",
    )
    db.add(order)
    db.flush()

    for item_data in payload.items:
        item = OrderItem(
            order_id=order.id,
            product_id=item_data.product_id,
            product_slug=item_data.product_slug,
            product_name_ar=item_data.product_name_ar,
            quantity=item_data.quantity,
            unit_price=item_data.unit_price,
            line_total=item_data.line_total,
        )
        db.add(item)

    db.commit()
    db.refresh(order)
    background_tasks.add_task(_dispatch_webhooks, order.id)
    return order


@router.post("/{order_id}/upsell", response_model=OrderOut)
def decide_upsell(
    order_id: int,
    payload: UpsellDecisionIn,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.status != "pending":
        raise HTTPException(status_code=400, detail="Order already finalized")

    if payload.accepted:
        upsell_product = db.query(Product).filter(Product.is_upsell == True).first()
        order.upsell_accepted = True
        order.upsell_product_id = upsell_product.id if upsell_product else None
        order.upsell_amount = UPSELL_PRICE
        order.total = order.subtotal + UPSELL_PRICE

    order.status = "confirmed"
    db.commit()
    db.refresh(order)

    background_tasks.add_task(_dispatch_webhooks, order.id)
    return order


async def _dispatch_webhooks(order_id: int) -> None:
    """Send Google Sheets webhook + CAPI events after order finalisation."""
    from app.database import SessionLocal
    db = SessionLocal()
    try:
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order:
            return

        # Google Sheets
        if not order.sheets_sent:
            success = await sheets.send_order(order)
            if success:
                order.sheets_sent = True

        # Meta CAPI
        if not order.meta_capi_sent:
            success = await capi.send_meta_purchase(order)
            if success:
                order.meta_capi_sent = True

        # TikTok CAPI
        if not order.tiktok_capi_sent:
            success = await capi.send_tiktok_purchase(order)
            if success:
                order.tiktok_capi_sent = True

        # Snapchat CAPI
        if not order.snap_capi_sent:
            success = await capi.send_snap_purchase(order)
            if success:
                order.snap_capi_sent = True

        db.commit()
    except Exception:
        pass
    finally:
        db.close()
