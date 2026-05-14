import uuid
from datetime import datetime, timezone
from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from app.database import Base


def generate_order_number() -> str:
    ts = datetime.now(timezone.utc).strftime("%Y%m%d")
    uid = uuid.uuid4().hex[:6].upper()
    return f"ORD-{ts}-{uid}"


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String(30), unique=True, nullable=False, index=True, default=generate_order_number)
    customer_name = Column(String(200), nullable=False)
    phone = Column(String(30), nullable=False)
    phone_normalized = Column(String(30))

    subtotal = Column(Float, nullable=False)
    upsell_accepted = Column(Boolean, default=False)
    upsell_product_id = Column(Integer, ForeignKey("products.id"), nullable=True)
    upsell_amount = Column(Float, default=0.0)
    total = Column(Float, nullable=False)

    # Tracking & deduplication
    browser_event_id = Column(String(100), index=True)  # UUID from frontend for pixel dedup
    ip_address = Column(String(50))
    user_agent = Column(Text)

    # Webhook delivery flags
    sheets_sent = Column(Boolean, default=False)
    meta_capi_sent = Column(Boolean, default=False)
    tiktok_capi_sent = Column(Boolean, default=False)
    snap_capi_sent = Column(Boolean, default=False)

    status = Column(String(20), default="confirmed")  # pending | confirmed | cancelled
    notes = Column(Text)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    upsell_product = relationship("Product", foreign_keys=[upsell_product_id])


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    product_slug = Column(String(100))
    product_name_ar = Column(String(200))
    quantity = Column(Integer, nullable=False)  # 1 | 2 | 3 (pack tier)
    unit_price = Column(Float, nullable=False)
    line_total = Column(Float, nullable=False)

    order = relationship("Order", back_populates="items")
    product = relationship("Product", foreign_keys=[product_id])
