from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.product import Product
from app.schemas.product import ProductOut

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/", response_model=List[ProductOut])
def list_products(db: Session = Depends(get_db)):
    return db.query(Product).filter(Product.is_active == True, Product.is_upsell == False).order_by(Product.sort_order).all()


@router.get("/upsell", response_model=ProductOut)
def get_upsell_product(db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.is_upsell == True, Product.is_active == True).first()
    if not product:
        raise HTTPException(status_code=404, detail="Upsell product not found")
    return product


@router.get("/{slug}", response_model=ProductOut)
def get_product(slug: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.slug == slug, Product.is_active == True).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
