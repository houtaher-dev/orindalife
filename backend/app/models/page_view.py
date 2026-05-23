from datetime import datetime, timezone
from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text
from app.database import Base


class PageView(Base):
    __tablename__ = "page_views"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), index=True)
    page_url = Column(String(500), nullable=False)
    referrer = Column(String(500))
    ip_address = Column(String(50))
    user_agent = Column(Text)
    country_code = Column(String(10))
    city = Column(String(100))
    is_vpn = Column(Boolean, default=False)
    is_proxy = Column(Boolean, default=False)
    is_tor = Column(Boolean, default=False)
    is_hosting = Column(Boolean, default=False)
    is_valid = Column(Boolean, default=False)  # True only if Qatar IP + not VPN/proxy
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
