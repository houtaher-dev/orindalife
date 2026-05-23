import math
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, case, distinct
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models.order import Order, OrderItem
from app.models.page_view import PageView
from app.schemas.admin import (
    LoginIn,
    TokenOut,
    DashboardMetrics,
    DailyStats,
    TopProduct,
    OrderDetail,
    OrdersListOut,
    UpdateOrderStatusIn,
    UpdateOrderNotesIn,
)
from app.services.auth import create_access_token, verify_token

router = APIRouter(prefix="/admin", tags=["admin"])


# ──────────────────────────────────────────────
# Auth
# ──────────────────────────────────────────────

@router.post("/login", response_model=TokenOut)
def admin_login(payload: LoginIn):
    if payload.username != settings.ADMIN_USERNAME or payload.password != settings.ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": payload.username})
    return TokenOut(access_token=token)


# ──────────────────────────────────────────────
# Dashboard Metrics
# ──────────────────────────────────────────────

@router.get("/dashboard", response_model=DashboardMetrics)
def get_dashboard(
    date_from: Optional[str] = Query(None, description="YYYY-MM-DD"),
    date_to: Optional[str] = Query(None, description="YYYY-MM-DD"),
    db: Session = Depends(get_db),
    _user: str = Depends(verify_token),
):
    start, end = _parse_date_range(date_from, date_to)
    today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start + timedelta(days=1)

    # Clicks (valid Qatar IPs only)
    clicks_q = db.query(PageView).filter(PageView.is_valid == True)
    orders_q = db.query(Order)

    if start:
        clicks_q = clicks_q.filter(PageView.created_at >= start)
        orders_q = orders_q.filter(Order.created_at >= start)
    if end:
        clicks_q = clicks_q.filter(PageView.created_at < end)
        orders_q = orders_q.filter(Order.created_at < end)

    total_clicks = clicks_q.count()
    unique_visitors = db.query(func.count(distinct(PageView.session_id))).filter(
        PageView.is_valid == True,
        *([PageView.created_at >= start] if start else []),
        *([PageView.created_at < end] if end else []),
    ).scalar() or 0

    total_orders = orders_q.count()
    confirmed_orders = orders_q.filter(Order.status == "confirmed").count()
    cancelled_orders = orders_q.filter(Order.status == "cancelled").count()

    total_revenue = db.query(func.coalesce(func.sum(Order.total), 0.0)).filter(
        Order.status != "cancelled",
        *([Order.created_at >= start] if start else []),
        *([Order.created_at < end] if end else []),
    ).scalar()

    avg_order_value = total_revenue / confirmed_orders if confirmed_orders > 0 else 0.0
    conversion_rate = (total_orders / unique_visitors * 100) if unique_visitors > 0 else 0.0

    # Today stats
    orders_today = db.query(Order).filter(
        Order.created_at >= today_start, Order.created_at < today_end
    ).count()
    revenue_today = db.query(func.coalesce(func.sum(Order.total), 0.0)).filter(
        Order.created_at >= today_start, Order.created_at < today_end,
        Order.status != "cancelled",
    ).scalar()
    clicks_today = db.query(PageView).filter(
        PageView.is_valid == True,
        PageView.created_at >= today_start,
        PageView.created_at < today_end,
    ).count()

    return DashboardMetrics(
        total_clicks=total_clicks,
        unique_visitors=unique_visitors,
        total_orders=total_orders,
        confirmed_orders=confirmed_orders,
        cancelled_orders=cancelled_orders,
        conversion_rate=round(conversion_rate, 2),
        total_revenue=round(total_revenue, 2),
        average_order_value=round(avg_order_value, 2),
        orders_today=orders_today,
        revenue_today=round(revenue_today, 2),
        clicks_today=clicks_today,
    )


@router.get("/dashboard/daily", response_model=list[DailyStats])
def get_daily_stats(
    date_from: Optional[str] = Query(None),
    date_to: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    _user: str = Depends(verify_token),
):
    start, end = _parse_date_range(date_from, date_to)
    if not start:
        start = datetime.now(timezone.utc) - timedelta(days=30)
    if not end:
        end = datetime.now(timezone.utc) + timedelta(days=1)

    date_trunc = func.date(PageView.created_at)
    clicks_by_day = dict(
        db.query(date_trunc, func.count(PageView.id))
        .filter(PageView.is_valid == True, PageView.created_at >= start, PageView.created_at < end)
        .group_by(date_trunc)
        .all()
    )

    order_date = func.date(Order.created_at)
    orders_by_day_raw = (
        db.query(
            order_date,
            func.count(Order.id),
            func.coalesce(func.sum(case((Order.status != "cancelled", Order.total), else_=0)), 0),
        )
        .filter(Order.created_at >= start, Order.created_at < end)
        .group_by(order_date)
        .all()
    )
    orders_by_day = {str(r[0]): (r[1], float(r[2])) for r in orders_by_day_raw}

    all_dates = sorted(set(str(d) for d in clicks_by_day.keys()) | set(orders_by_day.keys()))

    result = []
    for d in all_dates:
        clicks = clicks_by_day.get(d, 0) if isinstance(clicks_by_day.get(d), int) else clicks_by_day.get(d, 0)
        if not isinstance(clicks, int):
            clicks = int(clicks) if clicks else 0
        orders_count, rev = orders_by_day.get(d, (0, 0.0))
        cr = (orders_count / clicks * 100) if clicks > 0 else 0.0
        result.append(DailyStats(
            date=str(d),
            clicks=clicks,
            orders=orders_count,
            revenue=round(rev, 2),
            conversion_rate=round(cr, 2),
        ))

    return result


@router.get("/dashboard/top-products", response_model=list[TopProduct])
def get_top_products(
    date_from: Optional[str] = Query(None),
    date_to: Optional[str] = Query(None),
    limit: int = Query(10),
    db: Session = Depends(get_db),
    _user: str = Depends(verify_token),
):
    start, end = _parse_date_range(date_from, date_to)

    q = (
        db.query(
            OrderItem.product_name_ar,
            OrderItem.product_slug,
            func.sum(OrderItem.quantity).label("qty"),
            func.sum(OrderItem.line_total).label("rev"),
        )
        .join(Order, Order.id == OrderItem.order_id)
        .filter(Order.status != "cancelled")
    )
    if start:
        q = q.filter(Order.created_at >= start)
    if end:
        q = q.filter(Order.created_at < end)

    rows = q.group_by(OrderItem.product_name_ar, OrderItem.product_slug).order_by(func.sum(OrderItem.line_total).desc()).limit(limit).all()

    return [
        TopProduct(product_name=r[0], product_slug=r[1], quantity_sold=int(r[2]), revenue=round(float(r[3]), 2))
        for r in rows
    ]


# ──────────────────────────────────────────────
# Orders Management
# ──────────────────────────────────────────────

@router.get("/orders", response_model=OrdersListOut)
def list_orders(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    date_from: Optional[str] = Query(None),
    date_to: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    _user: str = Depends(verify_token),
):
    start, end = _parse_date_range(date_from, date_to)

    q = db.query(Order)
    if status:
        q = q.filter(Order.status == status)
    if search:
        like = f"%{search}%"
        q = q.filter(
            (Order.order_number.ilike(like))
            | (Order.customer_name.ilike(like))
            | (Order.phone.ilike(like))
        )
    if start:
        q = q.filter(Order.created_at >= start)
    if end:
        q = q.filter(Order.created_at < end)

    total = q.count()
    total_pages = math.ceil(total / per_page) if total > 0 else 1
    orders = q.order_by(Order.created_at.desc()).offset((page - 1) * per_page).limit(per_page).all()

    return OrdersListOut(
        orders=[OrderDetail.model_validate(o) for o in orders],
        total=total,
        page=page,
        per_page=per_page,
        total_pages=total_pages,
    )


@router.get("/orders/{order_id}", response_model=OrderDetail)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    _user: str = Depends(verify_token),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.patch("/orders/{order_id}/status", response_model=OrderDetail)
def update_order_status(
    order_id: int,
    payload: UpdateOrderStatusIn,
    db: Session = Depends(get_db),
    _user: str = Depends(verify_token),
):
    valid_statuses = ("confirmed", "cancelled", "delivered", "returned", "pending")
    if payload.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Status must be one of: {', '.join(valid_statuses)}")

    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = payload.status
    db.commit()
    db.refresh(order)
    return order


@router.patch("/orders/{order_id}/notes", response_model=OrderDetail)
def update_order_notes(
    order_id: int,
    payload: UpdateOrderNotesIn,
    db: Session = Depends(get_db),
    _user: str = Depends(verify_token),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.notes = payload.notes
    db.commit()
    db.refresh(order)
    return order


# ──────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────

def _parse_date_range(date_from: Optional[str], date_to: Optional[str]):
    start = None
    end = None
    if date_from:
        try:
            start = datetime.strptime(date_from, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        except ValueError:
            pass
    if date_to:
        try:
            end = datetime.strptime(date_to, "%Y-%m-%d").replace(tzinfo=timezone.utc) + timedelta(days=1)
        except ValueError:
            pass
    return start, end
