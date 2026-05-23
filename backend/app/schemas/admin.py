from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class LoginIn(BaseModel):
    username: str
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class DashboardMetrics(BaseModel):
    total_clicks: int
    unique_visitors: int
    total_orders: int
    confirmed_orders: int
    cancelled_orders: int
    conversion_rate: float
    total_revenue: float
    average_order_value: float
    orders_today: int
    revenue_today: float
    clicks_today: int


class DailyStats(BaseModel):
    date: str
    clicks: int
    orders: int
    revenue: float
    conversion_rate: float


class TopProduct(BaseModel):
    product_name: str
    product_slug: str
    quantity_sold: int
    revenue: float


class OrderItemDetail(BaseModel):
    id: int
    product_id: int
    product_slug: str
    product_name_ar: str
    quantity: int
    unit_price: float
    line_total: float

    model_config = {"from_attributes": True}


class OrderDetail(BaseModel):
    id: int
    order_number: str
    customer_name: str
    phone: str
    subtotal: float
    upsell_accepted: bool
    upsell_amount: float
    total: float
    status: str
    ip_address: Optional[str] = None
    notes: Optional[str] = None
    sheets_sent: bool
    meta_capi_sent: bool
    tiktok_capi_sent: bool
    snap_capi_sent: bool
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    items: List[OrderItemDetail] = []

    model_config = {"from_attributes": True}


class OrdersListOut(BaseModel):
    orders: List[OrderDetail]
    total: int
    page: int
    per_page: int
    total_pages: int


class UpdateOrderStatusIn(BaseModel):
    status: str  # confirmed | cancelled | delivered | returned


class UpdateOrderNotesIn(BaseModel):
    notes: str
