import httpx
from app.config import settings


async def send_order(order) -> bool:
    """POST order data to Google Apps Script webhook → Google Sheets."""
    if not settings.GOOGLE_SHEETS_WEBHOOK_URL:
        return False

    items_list = [
        {
            "name": item.product_name_ar,
            "qty": item.quantity,
            "price": item.unit_price,
            "total": item.line_total,
        }
        for item in order.items
    ]

    payload = {
        "order_number": order.order_number,
        "timestamp": order.created_at.isoformat(),
        "customer_name": order.customer_name,
        "phone": order.phone_normalized or order.phone,
        "items": items_list,
        "subtotal": order.subtotal,
        "upsell_accepted": order.upsell_accepted,
        "upsell_amount": order.upsell_amount,
        "total": order.total,
        "status": order.status,
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                settings.GOOGLE_SHEETS_WEBHOOK_URL,
                json=payload,
                follow_redirects=True,
            )
            return resp.status_code in (200, 201, 302)
    except Exception:
        return False
