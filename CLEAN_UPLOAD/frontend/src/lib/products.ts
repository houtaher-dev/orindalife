export type Product = {
  id: number;
  slug: string;
  name_ar: string;
  name_en: string;
  tagline_ar: string;
  description_ar: string;
  image_url: string;
  badge_ar?: string;
  price: number;
  is_upsell: boolean;
  sort_order: number;
  ingredients: {
    name_ar: string;
    name_en: string;
    description: string;
  }[];
  theme: {
    from: string;
    to: string;
    accent: string;
    icon: string;
  };
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "peaceful-slumber-gummies",
    name_ar: "علكات السُبات الهادئ",
    name_en: "Peaceful Slumber Gummies",
    tagline_ar: "نوم عميق، استيقاظ بنشاط",
    description_ar: "تستهدف التوتر والضغط الذهني لمساعدتك على الاسترخاء والنوم العميق. تركيبة مدروسة لراحة البال.",
    image_url: "/images/peaceful-slumber-gummies.webp",
    badge_ar: "الأكثر مبيعاً",
    price: 199,
    is_upsell: false,
    sort_order: 1,
    ingredients: [
      {
        name_ar: "الأشواغاندا",
        name_en: "Ashwagandha",
        description: "لتقليل التوتر وتهدئة العقل قبل النوم."
      },
      {
        name_ar: "مستخلص البابونج",
        name_en: "Chamomile",
        description: "للاسترخاء الطبيعي."
      },
      {
        name_ar: "الميلاتونين",
        name_en: "Melatonin",
        description: "لتنظيم دورة النوم."
      }
    ],
    theme: {
      from: "from-[#1a0b2e]",
      to: "to-[#0d0514]",
      accent: "#d4af37",
      icon: "🌙",
    }
  },
  {
    id: 2,
    slug: "focus-pro-coffee",
    name_ar: "قهوة اليَقَظَة برو",
    name_en: "Focus Pro Coffee",
    tagline_ar: "طاقة ذهنية بدون توتر",
    description_ar: "طاقة صافية وتركيز عالي بفضل مزيج القهوة المختصة والمستخلصات الطبيعية المعززة للذاكرة.",
    image_url: "/images/focus-pro-coffee.webp",
    badge_ar: "جديد",
    price: 199,
    is_upsell: false,
    sort_order: 2,
    ingredients: [
      {
        name_ar: "قهوة عربية ممتازة",
        name_en: "Premium Arabica",
        description: "لطاقة صافية ومذاق غني."
      },
      {
        name_ar: "فطر عرف الأسد",
        name_en: "Lion's Mane",
        description: "لتعزيز التركيز والذاكرة."
      },
      {
        name_ar: "إل-ثيانين",
        name_en: "L-Theanine",
        description: "لمنع التوتر والرجفة المصاحبة للكافيين."
      }
    ],
    theme: {
      from: "from-[#1a1a1a]",
      to: "to-[#000000]",
      accent: "#d4af37",
      icon: "☕",
    }
  },
  {
    id: 3,
    slug: "anti-stress-calm-drops",
    name_ar: "قطرات الهدوء ضد التوتر",
    name_en: "Anti-Stress Calm Drops",
    tagline_ar: "توازنك النفسي في قطرات",
    description_ar: "مستخلص سائل سريع الامتصاص لتهدئة الأعصاب وتحسين المزاج وتخفيف القلق اليومي.",
    image_url: "/images/anti-stress-calm-drops.webp",
    badge_ar: "الأفضل قيمة",
    price: 199,
    is_upsell: false,
    sort_order: 3,
    ingredients: [
      {
        name_ar: "مستخلص زهرة الآلام",
        name_en: "Passionflower",
        description: "للتهدئة السريعة."
      },
      {
        name_ar: "مستخلص بلسم الليمون",
        name_en: "Lemon Balm",
        description: "لتحسين المزاج وتخفيف القلق."
      },
      {
        name_ar: "المغنيسيوم",
        name_en: "Magnesium",
        description: "لإرخاء الأعصاب."
      }
    ],
    theme: {
      from: "from-[#2e1d0f]",
      to: "to-[#140b04]",
      accent: "#d4af37",
      icon: "💧",
    }
  }
];
