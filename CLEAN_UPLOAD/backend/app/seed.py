from app.database import SessionLocal
from app.models.product import Product


PRODUCTS_DATA = [
    {
        "slug": "aurora-collagen",
        "name_ar": "أورورا كولاجين مارين",
        "name_en": "Aurora Marine Collagen",
        "tagline_ar": "سر إشراقة بشرتك من الداخل",
        "description_ar": (
            "كولاجين بحري نقي بتركيز 10,000 ملغ، مدعوم بحمض الهيالورونيك وفيتامين C وبيوتين. "
            "مثبت علمياً لتحسين مرونة البشرة، تقوية الشعر، وصحة الأظافر خلال 4 أسابيع من الاستخدام المنتظم."
        ),
        "image_url": "/images/aurora-collagen.jpg",
        "badge_ar": "الأكثر مبيعاً",
        "price_1": 199.0,
        "price_2": 279.0,
        "price_3": 329.0,
        "is_upsell": False,
        "is_active": True,
        "sort_order": 1,
    },
    {
        "slug": "lumina-slim",
        "name_ar": "لومينا سليم",
        "name_en": "Lumina Slim",
        "tagline_ar": "رشاقتك، بالعلم لا بالحرمان",
        "description_ar": (
            "مزيج محكم من خلاصة الشاي الأخضر النقي بنسبة 95٪ والL-كارنيتين وCLA النشط. "
            "يعزز الحرق الطبيعي للدهون، يضبط الشهية، ويمنحكِ طاقة مستدامة طوال اليوم."
        ),
        "image_url": "/images/lumina-slim.jpg",
        "badge_ar": "الأفضل قيمة",
        "price_1": 199.0,
        "price_2": 279.0,
        "price_3": 329.0,
        "is_upsell": False,
        "is_active": True,
        "sort_order": 2,
    },
    {
        "slug": "nova-vitality",
        "name_ar": "نوفا فيتاليتي",
        "name_en": "Nova Vitality",
        "tagline_ar": "قوتكِ وتوازنكِ من الداخل",
        "description_ar": (
            "أشواغاندا KSM-66 + ماكا بيروفيان + فيتامينات B المركب + حديد نشط. "
            "للمرأة العصرية التي تريد طاقة حقيقية، توازناً هرمونياً طبيعياً، وتخلصاً من الإجهاد اليومي."
        ),
        "image_url": "/images/nova-vitality.jpg",
        "badge_ar": "جديد",
        "price_1": 199.0,
        "price_2": 279.0,
        "price_3": 329.0,
        "is_upsell": False,
        "is_active": True,
        "sort_order": 3,
    },
    {
        "slug": "soleil-vitamin-d",
        "name_ar": "سوليل فيتامين D3+K2",
        "name_en": "Soleil Vitamin D3+K2 Drops",
        "tagline_ar": "الإضافة المثالية لروتينكِ الصحي",
        "description_ar": (
            "فيتامين D3 فعّال + K2 ناشط بصيغة قطرات سريعة الامتصاص. "
            "يعزز المناعة، يحمي العظام، ويحسّن المزاج والطاقة — "
            "الإضافة الأذكى لأي روتين صحي."
        ),
        "image_url": "/images/soleil-vitamin-d.jpg",
        "badge_ar": "عرض خاص",
        "price_1": 99.0,
        "price_2": 99.0,
        "price_3": 99.0,
        "is_upsell": True,
        "upsell_price": 99.0,
        "is_active": True,
        "sort_order": 10,
    },
]


def run_seed():
    db = SessionLocal()
    try:
        for data in PRODUCTS_DATA:
            existing = db.query(Product).filter(Product.slug == data["slug"]).first()
            if not existing:
                product = Product(**data)
                db.add(product)
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Seed error: {e}")
    finally:
        db.close()
