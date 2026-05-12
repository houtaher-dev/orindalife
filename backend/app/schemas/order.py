from pydantic import BaseModel, field_validator
from typing import List, Optional
import re


class OrderItemIn(BaseModel):
    product_id: int
    product_slug: str
    product_name_ar: str
    quantity: int  # 1 | 2 | 3
    unit_price: float
    line_total: float


class CreateOrderIn(BaseModel):
    customer_name: str
    phone: str
    items: List[OrderItemIn]
    subtotal: float
    browser_event_id: Optional[str] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

    @field_validator("customer_name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("الاسم قصير جداً")
        return v

    @field_validator("phone")
    @classmethod
    def validate_qatar_phone(cls, v: str) -> str:
        cleaned = re.sub(r"[\s\-\(\)\.]", "", v)
        if cleaned.startswith("+974"):
            digits = cleaned[4:]
        elif cleaned.startswith("00974"):
            digits = cleaned[5:]
        elif cleaned.startswith("974") and len(cleaned) == 11:
            digits = cleaned[3:]
        elif cleaned.startswith("0") and len(cleaned) == 9:
            digits = cleaned[1:]
        else:
            digits = cleaned
        if not re.match(r"^[3-7]\d{7}$", digits):
            raise ValueError("يرجى إدخال رقم هاتف قطري صحيح")
        return v


class UpsellDecisionIn(BaseModel):
    accepted: bool


class OrderItemOut(BaseModel):
    id: int
    product_id: int
    product_slug: str
    product_name_ar: str
    quantity: int
    unit_price: float
    line_total: float

    model_config = {"from_attributes": True}


class OrderOut(BaseModel):
    id: int
    order_number: str
    customer_name: str
    phone: str
    subtotal: float
    upsell_accepted: bool
    upsell_amount: float
    total: float
    status: str
    items: List[OrderItemOut] = []

    model_config = {"from_attributes": True}
