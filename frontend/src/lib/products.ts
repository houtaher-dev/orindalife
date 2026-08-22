export type Product = {
  id: number;
  slug: string;
  name_ar: string;
  name_en: string;
  tagline_ar: string;
  description_ar: string;
  image_url: string;
  gallery?: string[];
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
    image_url: "/images/combo-180-tshirt.png",
    gallery: [
      "/images/combo-180-kids-thobe.png",
      "/images/mokawinat-180.png",
      "/images/combo-180-kids-green.png"
    ],
    badge_ar: "الأكثر طلباً",
    price: 169,
    is_upsell: false,
    sort_order: 1,
    ingredients: [
      {
        name_ar: "عصا صيد 180 سم",
        name_en: "1.8m Fishing Rod",
        description: "5 أقسام • طول الطي: 57 سم • الوزن: 145 جرام • كاربون عالي الجودة."
      },
      {
        name_ar: "ماكينة صيد WHITE RABBIT 2000",
        name_en: "Spinning Reel",
        description: "عدد البيرنج: 7 • نسبة النقل: 5.2:1 • فرامل أمامية قوية وسلسة."
      },
      {
        name_ar: "خيط تعبئة 500 متر",
        name_en: "Pre-loaded Line",
        description: "خيط مركب على الماكينة جاهز للاستخدام • مقاس: 0.35 مم • متانة عالية."
      },
      {
        name_ar: "خطاقات (5 قطع)",
        name_en: "Hooks Set",
        description: "المقاسات: #4.0 - #6.0 • حادة ومقاومة للصدأ."
      },
      {
        name_ar: "طعم صناعي",
        name_en: "Artificial Lure",
        description: "الطول: 8 سم • الوزن: 10 جرام • ألوان جذابة للأسماك."
      },
      {
        name_ar: "شينة / عوامة صيد",
        name_en: "Fishing Float",
        description: "مناسبة لجميع أنواع الصيد • سهلة التركيب."
      },
      {
        name_ar: "مشبك دوار + ثقل رصاص",
        name_en: "Swivel + Lead Weight",
        description: "مشبك 4 سم • ثقل رصاص 1 سم • لتثبيت الخيط والطعم."
      },
      {
        name_ar: "شنطة حمل",
        name_en: "Carrying Bag",
        description: "طول 120 سم • عملية لحفظ جميع القطع وسهلة الحمل."
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
      },
      {
        problem: "«أبي مقاس مناسب للأطفال يكون خفيف وسهل عليهم.»",
        solution: "مقاس 1.8 متر هو الأخف والأقصر، مثالي للأطفال والمبتدئين بوزن 145 جرام فقط وسهولة في التحكم."
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
    tagline_ar: "التوازن المثالي بين الط الطول والتحكم",
    description_ar: "حقيبة صيد بحري متكاملة تحتوي على قصبة بطول 2.4 متر، ماكينة صيد، خيط، ومجموعة طعوم. خيار ممتاز للصيد من الشاطئ أو القارب.",
    image_url: "/images/combo-240-pink.png",
    gallery: [
      "/images/combo-240-saudi.png",
      "/images/mokawinat-240.png",
      "/images/combo-240-woman-standing.png"
    ],
    badge_ar: "الأكثر طلباً",
    price: 179,
    is_upsell: false,
    sort_order: 2,
    ingredients: [
      {
        name_ar: "عصا صيد 240 سم",
        name_en: "2.4m Fishing Rod",
        description: "6 أقسام • طول الطي: 65 سم • الوزن: 190 جرام • كاربون عالي الجودة."
      },
      {
        name_ar: "ماكينة صيد WHITE RABBIT 2000",
        name_en: "Spinning Reel",
        description: "عدد البيرنج: 7 • نسبة النقل: 5.2:1 • فرامل أمامية قوية وسلسة."
      },
      {
        name_ar: "خيط تعبئة 500 متر",
        name_en: "Pre-loaded Line",
        description: "خيط مركب على الماكينة جاهز للاستخدام • مقاس: 0.35 مم • متانة عالية."
      },
      {
        name_ar: "خطاقات (5 قطع)",
        name_en: "Hooks Set",
        description: "المقاسات: #4.0 - #6.0 • حادة ومقاومة للصدأ."
      },
      {
        name_ar: "طعم صناعي",
        name_en: "Artificial Lure",
        description: "الطول: 8 سم • الوزن: 10 جرام • ألوان جذابة للأسماك."
      },
      {
        name_ar: "شينة / عوامة صيد",
        name_en: "Fishing Float",
        description: "مناسبة لجميع أنواع الصيد • سهلة التركيب."
      },
      {
        name_ar: "مشبك دوار + ثقل رصاص",
        name_en: "Swivel + Lead Weight",
        description: "مشبك 4 سم • ثقل رصاص 1 سم • لتثبيت الخيط والطعم."
      },
      {
        name_ar: "شنطة حمل",
        name_en: "Carrying Bag",
        description: "طول 120 سم • عملية لحفظ جميع القطع وسهلة الحمل."
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
      },
      {
        problem: "«أبي مقاس يناسبني أنا وزوجتي نستخدمه بالتبادل.»",
        solution: "مقاس 2.4 متر هو التوازن المثالي — مناسب للرجال والنساء، خفيف وسهل التحكم للجميع."
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
    image_url: "/images/combo-300-man.png",
    gallery: [
      "/images/combo-300-qa.png",
      "/images/mokawinat-300.png",
      "/images/combo-300-man.png"
    ],
    price: 189,
    is_upsell: false,
    sort_order: 3,
    ingredients: [
      {
        name_ar: "عصا صيد 300 سم",
        name_en: "3.0m Fishing Rod",
        description: "6 أقسام • طول الطي: 57 سم • الوزن: 195 جرام • كاربون عالي الجودة."
      },
      {
        name_ar: "ماكينة صيد WHITE RABBIT 3000",
        name_en: "Spinning Reel",
        description: "عدد البيرنج: 8 • نسبة النقل: 5.2:1 • فرامل أمامية قوية وسلسة."
      },
      {
        name_ar: "خيط تعبئة 500 متر",
        name_en: "Pre-loaded Line",
        description: "خيط مركب على الماكينة جاهز للاستخدام • مقاس: 0.40 مم • متانة عالية."
      },
      {
        name_ar: "خطاقات (5 قطع)",
        name_en: "Hooks Set",
        description: "المقاسات: #4.0 - #6.0 • حادة ومقاومة للصدأ."
      },
      {
        name_ar: "طعم صناعي",
        name_en: "Artificial Lure",
        description: "الطول: 8 سم • الوزن: 10 جرام • ألوان جذابة للأسماك."
      },
      {
        name_ar: "شينة / عوامة صيد",
        name_en: "Fishing Float",
        description: "مناسبة لجميع أنواع الصيد • سهلة التركيب."
      },
      {
        name_ar: "مشبك دوار + ثقل رصاص",
        name_en: "Swivel + Lead Weight",
        description: "مشبك 4 سم • ثقل رصاص 1 سم • لتثبيت الخيط والطعم."
      },
      {
        name_ar: "شنطة حمل",
        name_en: "Carrying Bag",
        description: "طول 120 سم • عملية لحفظ جميع القطع وسهلة الحمل."
      }
    ],
    problems_solutions: [
      {
        problem: "«الصيد من الشاطئ يحتاج رمية بعيدة جداً عشان أوصل للسمك.»",
        solution: "قصبة 3.0 متر مصممة خصيصاً لتعطيك أقصى مسافة رمي ممكنة من الشاطئ بكل سهولة."
      },
      {
        problem: "«أبي ماكينة قوية تتحمل الأسماك الكبيرة ولا تخذلني.»",
        solution: "ماكينة WHITE RABBIT 3000 بـ 8 بيرنج وفرامل أمامية قوية، مصممة لسحب الأسماك الكبيرة بثقة."
      },
      {
        problem: "«أبي حقيبة كاملة ما أحتاج أشتري شيء ثاني بعدها.»",
        solution: "الحقيبة فيها 8 قطع أساسية — من العصا والماكينة للخيط والطعوم، كل شيء جاهز من أول يوم."
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
    image_url: "/images/combo-360-tshirt.png",
    gallery: [
      "/images/combo-360-thobe-bag.png",
      "/images/mokawinat-360.png",
      "/images/combo-360-thobe-fishing.png"
    ],
    badge_ar: "خيار المحترفين",
    price: 199,
    is_upsell: false,
    sort_order: 4,
    ingredients: [
      {
        name_ar: "عصا صيد 360 سم",
        name_en: "3.6m Fishing Rod",
        description: "7 أقسام • طول الطي: 65 سم • الوزن: 225 جرام • كاربون عالي الجودة."
      },
      {
        name_ar: "ماكينة صيد WHITE RABBIT 4000",
        name_en: "Spinning Reel",
        description: "عدد البيرنج: 7 • نسبة النقل: 5.2:1 • فرامل أمامية قوية وسلسة."
      },
      {
        name_ar: "خيط تعبئة 500 متر",
        name_en: "Pre-loaded Line",
        description: "خيط مركب على الماكينة جاهز للاستخدام • مقاس: 0.40 مم • متانة عالية."
      },
      {
        name_ar: "خطاقات (5 قطع)",
        name_en: "Hooks Set",
        description: "المقاسات: #4.0 - #6.0 • حادة ومقاومة للصدأ."
      },
      {
        name_ar: "طعم صناعي",
        name_en: "Artificial Lure",
        description: "الطول: 8 سم • الوزن: 10 جرام • ألوان جذابة للأسماك."
      },
      {
        name_ar: "شينة / عوامة صيد",
        name_en: "Fishing Float",
        description: "مناسبة لجميع أنواع الصيد • سهلة التركيب."
      },
      {
        name_ar: "مشبك دوار + ثقل رصاص",
        name_en: "Swivel + Lead Weight",
        description: "مشبك 4 سم • ثقل رصاص 1 سم • لتثبيت الخيط والطعم."
      },
      {
        name_ar: "شنطة حمل",
        name_en: "Carrying Bag",
        description: "طول 120 سم • عملية لحفظ جميع القطع وسهلة الحمل."
      }
    ],
    problems_solutions: [
      {
        problem: "«أبي أطول قصبة ممكنة عشان أوصل لأبعد نقطة في البحر.»",
        solution: "هذا المقاس (3.6 متر) هو الأطول في المجموعة، يضمن لك الوصول لمسافات لا يمكن الوصول لها بالقصبات القصيرة."
      },
      {
        problem: "«أبي معدات احترافية للصيد الجدي مو بس للتجربة.»",
        solution: "ماكينة WHITE RABBIT 4000 مع قصبة كاربون 3.6 متر — أداء احترافي حقيقي للصيادين الجادين."
      },
      {
        problem: "«خايف المعدات ما تتحمل الأسماك الكبيرة وتنكسر.»",
        solution: "القصبة مصنوعة من كاربون عالي الجودة بـ 7 أقسام والماكينة بفرامل قوية — مصممة لتحمل أقسى ظروف الصيد."
      }
    ],
    theme: {
      from: "from-[#0B1B3D]",
      to: "to-[#1A365D]",
      accent: "#FF6B35",
      icon: "⭐",
    }
  },
  {
    id: 5,
    slug: "daiwa-triforce-line",
    name_ar: "خيط دايوى ترايفورس ياباني",
    name_en: "Daiwa Triforce Line",
    tagline_ar: "صناعة يابانية أصلية — 270 متر",
    description_ar: "خيط نايلون ياباني أصلي من دايوى، مقاوم للتآكل بمتانة عالية. مقاس 0.35 مم، طول 270 متر. ترقية مثالية للخيط العادي.",
    image_url: "/images/daiwa-triforce.png",
    price: 25,
    is_upsell: true,
    sort_order: 5,
    ingredients: [],
    problems_solutions: [],
    theme: {
      from: "from-[#0B1B3D]",
      to: "to-[#1A365D]",
      accent: "#22C55E",
      icon: "🎣",
    }
  },
  {
    id: 6,
    slug: "fishing-jig-5pcs",
    name_ar: "مجموعة طعوم معدنية (5 قطع)",
    name_en: "Fishing Jig 5pcs",
    tagline_ar: "5 ألوان مختلفة لجذب أنواع متعددة",
    description_ar: "مجموعة من 5 طعوم معدنية احترافية بألوان متنوعة، وزن 13.5 جرام. مصممة لجذب أنواع مختلفة من الأسماك بفعالية عالية.",
    image_url: "/images/fishing-jig-5pcs.png",
    price: 25,
    is_upsell: true,
    sort_order: 6,
    ingredients: [],
    problems_solutions: [],
    theme: {
      from: "from-[#0B1B3D]",
      to: "to-[#1A365D]",
      accent: "#3B82F6",
      icon: "🐟",
    }
  }
];