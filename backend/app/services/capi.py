"""
Conversions API (CAPI) services for Meta, TikTok, and Snapchat.
All PII is SHA-256 hashed before transmission. Event IDs match browser pixel events for deduplication.
"""
import time
import uuid
import httpx
from app.config import settings
from app.utils.hashing import hash_phone, hash_name


# ──────────────────────────────────────────────
# Meta (Facebook) CAPI
# ──────────────────────────────────────────────

async def send_meta_purchase(order) -> bool:
    if not settings.META_ACCESS_TOKEN or not settings.META_PIXEL_ID:
        return False

    fn_hash, ln_hash = hash_name(order.customer_name)
    ph_hash = hash_phone(order.phone)
    event_id = order.browser_event_id or str(uuid.uuid4())

    payload = {
        "data": [
            {
                "event_name": "Purchase",
                "event_time": int(time.time()),
                "event_id": f"{event_id}_purchase",
                "action_source": "website",
                "user_data": {
                    "fn": fn_hash,
                    "ln": ln_hash,
                    "ph": ph_hash,
                    "country": "qa",
                },
                "custom_data": {
                    "currency": "QAR",
                    "value": order.total,
                    "order_id": order.order_number,
                    "num_items": sum(i.quantity for i in order.items),
                    "content_ids": [str(i.product_id) for i in order.items],
                    "content_type": "product",
                },
            }
        ]
    }

    if settings.META_TEST_EVENT_CODE:
        payload["test_event_code"] = settings.META_TEST_EVENT_CODE

    url = f"https://graph.facebook.com/v19.0/{settings.META_PIXEL_ID}/events"
    params = {"access_token": settings.META_ACCESS_TOKEN}

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, params=params, json=payload)
            return resp.status_code == 200
    except Exception:
        return False


# ──────────────────────────────────────────────
# TikTok CAPI
# ──────────────────────────────────────────────

async def send_tiktok_purchase(order) -> bool:
    if not settings.TIKTOK_ACCESS_TOKEN or not settings.TIKTOK_PIXEL_ID:
        return False

    ph_hash = hash_phone(order.phone)
    event_id = order.browser_event_id or str(uuid.uuid4())

    payload = {
        "pixel_code": settings.TIKTOK_PIXEL_ID,
        "event": "PlaceAnOrder",
        "event_id": f"{event_id}_purchase",
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S+00:00", time.gmtime()),
        "context": {
            "user": {"phone_number": ph_hash},
        },
        "properties": {
            "currency": "QAR",
            "value": order.total,
            "order_id": order.order_number,
            "contents": [
                {
                    "content_id": str(i.product_id),
                    "content_name": i.product_name_ar,
                    "quantity": i.quantity,
                    "price": i.unit_price,
                }
                for i in order.items
            ],
        },
    }

    url = "https://business-api.tiktok.com/open_api/v1.3/event/track/"
    headers = {"Access-Token": settings.TIKTOK_ACCESS_TOKEN}

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, headers=headers, json=payload)
            return resp.status_code == 200
    except Exception:
        return False


# ──────────────────────────────────────────────
# Snapchat CAPI
# ──────────────────────────────────────────────

async def send_snap_purchase(order) -> bool:
    if not settings.SNAPCHAT_ACCESS_TOKEN or not settings.SNAPCHAT_PIXEL_ID:
        return False

    ph_hash = hash_phone(order.phone)
    event_id = order.browser_event_id or str(uuid.uuid4())

    payload = {
        "pixel_id": settings.SNAPCHAT_PIXEL_ID,
        "data": [
            {
                "event_conversion_type": "WEB",
                "event_type": "PURCHASE",
                "event_time": int(time.time()) * 1000,
                "client_dedup_id": f"{event_id}_purchase",
                "integration": "caapi",
                "user_data": {"phone_number": ph_hash},
                "custom_data": {
                    "currency": "QAR",
                    "price": str(order.total),
                    "transaction_id": order.order_number,
                    "number_items": str(sum(i.quantity for i in order.items)),
                    "item_ids": [str(i.product_id) for i in order.items],
                    "item_category": "health_supplements",
                },
            }
        ],
    }

    url = "https://tr.snapchat.com/v2/conversion"
    headers = {"Authorization": f"Bearer {settings.SNAPCHAT_ACCESS_TOKEN}"}

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, headers=headers, json=payload)
            return resp.status_code == 200
    except Exception:
        return False
