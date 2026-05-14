from pydantic import BaseModel
from typing import Optional


class ProductOut(BaseModel):
    id: int
    slug: str
    name_ar: str
    name_en: str
    tagline_ar: Optional[str] = None
    description_ar: Optional[str] = None
    image_url: Optional[str] = None
    badge_ar: Optional[str] = None
    price_1: float
    price_2: float
    price_3: float
    is_upsell: bool = False
    upsell_price: Optional[float] = None
    is_active: bool = True
    sort_order: int = 0

    model_config = {"from_attributes": True}
