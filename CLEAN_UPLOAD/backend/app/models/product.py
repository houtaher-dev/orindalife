from datetime import datetime, timezone
from sqlalchemy import Boolean, Column, DateTime, Float, Integer, String, Text
from app.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    name_ar = Column(String(200), nullable=False)
    name_en = Column(String(200), nullable=False)
    tagline_ar = Column(String(300))
    description_ar = Column(Text)
    image_url = Column(String(500))
    badge_ar = Column(String(100))

    # Volume pricing (QAR)
    price_1 = Column(Float, nullable=False, default=199.0)
    price_2 = Column(Float, nullable=False, default=279.0)
    price_3 = Column(Float, nullable=False, default=329.0)

    # Upsell / cross-sell
    is_upsell = Column(Boolean, default=False)
    upsell_price = Column(Float, nullable=True)

    is_active = Column(Boolean, default=True)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
