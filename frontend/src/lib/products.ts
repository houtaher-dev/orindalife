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
  problems_solutions: {
    problem: string;
    solution: string;
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
    slug: "white-rabbit-180",
    name_ar: "حقيبة صيد متكاملة (1.8 متر)",
    name_en: "White Rabbit Combo 1.8m",
    tagline_ar: "مجموعة صيد متكاملة جاهزة للاستخدام",
    description_ar: "حقيبة صيد بحري متكاملة تحتوي على قصبة بطول 1.8 متر، ماكينة صيد، خيط، ومجموعة طعوم. مثالية للمبتدئين والصيد الخفيف.",
    image_url: "/images/white-rabbit-combo.webp",
    badge_ar: "الأكثر طلباً",
    price: 169,
    is_upsell: false,
    sort_order: 1,
    ingredients: [
      {
        name_ar: "قصبة صيد 1.8 متر",
        name_en: "1.8m Fishing Rod",
        description: "قصبة متينة ومرنة مصنوعة من ألياف الكربون."
      },
      {
        name_ar: "ماكينة صيد",
        name_en: "Spinning Reel",
        description: "ماكينة ناعمة وسريعة الاستجابة."
      },
      {
        name_ar: "خيط نايلون",
        name_en: "Nylon Line",
        description: "خيط قوي يتحمل الأوزان."
      }
    ],
    problems_solutions: [
      {
        problem: "«أبي أبدأ صيد بس ما أعرف وش أشتري وكيف أجمع الأغراض.»",
        solution: "هذي الحقيبة توفر لك كل شيء تحتاجه في مكان واحد، جاهزة للاستخدام فوراً بدون تعقيد."
      },
      {
        problem: "«أخاف أشتري معدات غالية وتطلع معقدة أو ما تناسبني.»",
        solution: "المجموعة مصممة خصيصاً لتكون سهلة الاستخدام ومناسبة جداً للمبتدئين بسعر ممتاز وجودة عالية."
      }
    ],
    theme: {
      from: "from-[#0B1B3D]",
      to: "to-[#1A365D]",
      accent: "#FF6B35",
      icon: "🎣",
    }
  },
  {
    id: 2,
    slug: "white-rabbit-240",
    name_ar: "حقيبة صيد متكاملة (2.4 متر)",
    name_en: "White Rabbit Combo 2.4m",
    tagline_ar: "التوازن المثالي بين الطول والتحكم",
    description_ar: "حقيبة صيد بحري متكاملة تحتوي على قصبة بطول 2.4 متر، ماكينة صيد، خيط، ومجموعة طعوم. خيار ممتاز للصيد من الشاطئ أو القارب.",
    image_url: "/images/white-rabbit-combo.webp",
    badge_ar: "خيار المحترفين",
    price: 179,
    is_upsell: false,
    sort_order: 2,
    ingredients: [
      {
        name_ar: "قصبة صيد 2.4 متر",
        name_en: "2.4m Fishing Rod",
        description: "طول مثالي لرميات أبعد وتحكم أفضل."
      },
      {
        name_ar: "ماكينة صيد",
        name_en: "Spinning Reel",
        description: "ماكينة قوية تتحمل الأسماك المتوسطة."
      },
      {
        name_ar: "خيط نايلون",
        name_en: "Nylon Line",
        description: "خيط متين ومرن."
      }
    ],
    problems_solutions: [
      {
        problem: "«أحتاج قصبة أطول عشان أرمي أبعد من الشاطئ.»",
        solution: "طول 2.4 متر يعطيك مسافة رمي ممتازة مع الحفاظ على سهولة التحكم في القصبة."
      },
      {
        problem: "«أبي معدات تتحمل وما تخرب بسرعة مع المويه المالحة.»",
        solution: "المعدات مصنوعة من مواد مقاومة للصدأ والتآكل لتدوم معك طويلاً في بيئة البحر."
      }
    ],
    theme: {
      from: "from-[#0B1B3D]",
      to: "to-[#1A365D]",
      accent: "#FF6B35",
      icon: "🌊",
    }
  },
  {
    id: 3,
    slug: "white-rabbit-300",
    name_ar: "حقيبة صيد متكاملة (3.0 متر)",
    name_en: "White Rabbit Combo 3.0m",
    tagline_ar: "للمسافات البعيدة والصيد الشاطئي",
    description_ar: "حقيبة صيد بحري متكاملة تحتوي على قصبة بطول 3.0 متر، ماكينة صيد، خيط، ومجموعة طعوم. مصممة للرميات الطويلة والأسماك الأكبر.",
    image_url: "/images/white-rabbit-combo.webp",
    price: 189,
    is_upsell: false,
    sort_order: 3,
    ingredients: [
      {
        name_ar: "قصبة صيد 3.0 متر",
        name_en: "3.0m Fishing Rod",
        description: "قوة ومرونة للرميات البعيدة."
      },
      {
        name_ar: "ماكينة صيد",
        name_en: "Spinning Reel",
        description: "سعة خيط أكبر وقوة سحب أعلى."
      },
      {
        name_ar: "خيط نايلون",
        name_en: "Nylon Line",
        description: "قوة تحمل عالية."
      }
    ],
    problems_solutions: [
      {
        problem: "«الصيد من الشاطئ يحتاج رمية بعيدة جداً عشان أوصل للسمك.»",
        solution: "قصبة 3.0 متر مصممة خصيصاً لتعطيك أقصى مسافة رمي ممكنة من الشاطئ بكل سهولة."
      }
    ],
    theme: {
      from: "from-[#0B1B3D]",
      to: "to-[#1A365D]",
      accent: "#FF6B35",
      icon: "⚓",
    }
  },
  {
    id: 4,
    slug: "white-rabbit-360",
    name_ar: "حقيبة صيد متكاملة (3.6 متر)",
    name_en: "White Rabbit Combo 3.6m",
    tagline_ar: "أقصى مسافة رمي وقوة تحمل",
    description_ar: "حقيبة صيد بحري متكاملة تحتوي على قصبة بطول 3.6 متر، ماكينة صيد، خيط، ومجموعة طعوم. الخيار الأمثل للصيد الشاطئي الاحترافي.",
    image_url: "/images/white-rabbit-combo.webp",
    price: 199,
    is_upsell: false,
    sort_order: 4,
    ingredients: [
      {
        name_ar: "قصبة صيد 3.6 متر",
        name_en: "3.6m Fishing Rod",
        description: "أطول قصبة لأبعد مسافة رمي."
      },
      {
        name_ar: "ماكينة صيد",
        name_en: "Spinning Reel",
        description: "أداء قوي وموثوق."
      },
      {
        name_ar: "خيط نايلون",
        name_en: "Nylon Line",
        description: "متانة فائقة."
      }
    ],
    problems_solutions: [
      {
        problem: "«أبي أطول قصبة ممكنة عشان أوصل لأبعد نقطة في البحر.»",
        solution: "هذا المقاس (3.6 متر) هو الأطول في المجموعة، يضمن لك الوصول لمسافات لا يمكن الوصول لها بالقصبات القصيرة."
      }
    ],
    theme: {
      from: "from-[#0B1B3D]",
      to: "to-[#1A365D]",
      accent: "#FF6B35",
      icon: "⭐",
    }
  }
];