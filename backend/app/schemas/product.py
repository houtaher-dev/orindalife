from pydantic import BaseModel
from typing import Optional, List, Dict, Any


class ProductBase(BaseModel):
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
    ingredients: Optional[List[Dict[str, Any]]] = None
    problems_solutions: Optional[List[Dict[str, Any]]] = None
    theme: Optional[Dict[str, Any]] = None
    is_active: bool = True
    sort_order: int = 0


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    slug: Optional[str] = None
    name_ar: Optional[str] = None
    name_en: Optional[str] = None
    tagline_ar: Optional[str] = None
    description_ar: Optional[str] = None
    image_url: Optional[str] = None
    badge_ar: Optional[str] = None
    price_1: Optional[float] = None
    price_2: Optional[float] = None
    price_3: Optional[float] = None
    is_upsell: Optional[bool] = None
    upsell_price: Optional[float] = None
    ingredients: Optional[List[Dict[str, Any]]] = None
    problems_solutions: Optional[List[Dict[str, Any]]] = None
    theme: Optional[Dict[str, Any]] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None


class ProductOut(ProductBase):
    id: int

    model_config = {"from_attributes": True}
