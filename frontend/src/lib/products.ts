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
    problems_solutions: [
      {
        problem: "«مهما كنت تعبان، مجرد ما أحط راسي على المخدة يبدأ عقلي يفكر وأطير النومة.»",
        solution: "مستخلص الأشواغاندا يقلل هرمون الكورتيزول (هرمون التوتر) في الجسم، ويهدي الأفكار المتسارعة — السبب الجذري للأرق."
      },
      {
        problem: "«أنام، بس أصحى كأني ما نمت، جسمي مكسر وطاقتي صفر.»",
        solution: "الميلاتونين ينظم دورة النوم الطبيعية، ومستخلص البابونج يرخي العضلات لتستمتع بنوم عميق ومريح، وتصحى بكامل نشاطك."
      },
      {
        problem: "«أخاف أتعود على حبوب النوم وتصير عندي مناعة أو آثار جانبية.»",
        solution: "علكاتنا طبيعية 100%، خالية من المواد الكيميائية المسببة للإدمان. تعطيك نوم طبيعي بدون الشعور بالخمول في اليوم التالي."
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
    problems_solutions: [
      {
        problem: "«أشرب قهوة عشان أركز، بس تسبب لي خفقان ورجفة وتوتر.»",
        solution: "الأحماض الأمينية (L-Theanine) مع القهوة تلغي تماماً الآثار الجانبية للكافيين، وتعطيك طاقة صافية وتركيز هادئ بدون رجفة أو توتر."
      },
      {
        problem: "«عندي تشتت وضعف بالذاكرة وأنسى الأشياء بسرعة خلال الشغل.»",
        solution: "فطر عرف الأسد (Lion's Mane) أثبتت الدراسات قدرته على تحفيز نمو خلايا الدماغ وتحسين الذاكرة والتركيز — غذاء حقيقي لعقلك."
      },
      {
        problem: "«بعد الظهر تطيح طاقتي فجأة وأحس بخمول شديد.»",
        solution: "التركيبة توفر طاقة ممتدة المفعول وطبيعية تدوم لساعات أطول، بدون الهبوط المفاجئ للطاقة اللي تسببه القهوة العادية."
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
    slug: "anti-stress-calm-gummies",
    name_ar: "علكات الهدوء ضد التوتر",
    name_en: "Anti-Stress Calm Gummies",
    tagline_ar: "توازنك النفسي في علكات",
    description_ar: "علكات لذيذة وسريعة المفعول لتهدئة الأعصاب وتحسين المزاج وتخفيف القلق اليومي بدون التسبب في النعاس.",
    image_url: "/images/anti-stress-calm-gummies.webp",
    badge_ar: "الأفضل قيمة",
    price: 199,
    is_upsell: false,
    sort_order: 3,
    ingredients: [
      {
        name_ar: "مستخلص الزعفران",
        name_en: "Saffron Extract",
        description: "مضاد طبيعي للاكتئاب، يحسن المزاج ويقلل من القلق بسرعة."
      },
      {
        name_ar: "مستخلص الروديولا",
        name_en: "Rhodiola Rosea",
        description: "عشبة تكيفية تخفض الكورتيزول وتساعد على تحمل الضغط النفسي."
      },
      {
        name_ar: "مستخلص الريحان المقدس",
        name_en: "Holy Basil",
        description: "يهدئ الأعصاب المتوترة ويقلل من التفكير المفرط."
      },
      {
        name_ar: "فيتامينات ب (B6 & B12)",
        name_en: "Vitamin B-Complex",
        description: "دعم صحة الجهاز العصبي وإنتاج نواقل السعادة."
      }
    ],
    problems_solutions: [
      {
        problem: "«أحس بضغط نفسي مستمر وتوتر وقلق من أقل حاجة في الدوام.»",
        solution: "مستخلص الزعفران والروديولا يعملان معاً لخفض هرمون التوتر بسرعة، لترجع لسلامك الداخلي وتكمل يومك بهدوء."
      },
      {
        problem: "«مزاجي متقلب وأحس بضيقة ومو قادر أستمتع بيومي.»",
        solution: "فيتامينات ب المركبة مع الزعفران تساعد طبيعياً على تحسين المزاج ورفع هرمونات السعادة، لتبدأ يومك بإيجابية."
      },
      {
        problem: "«أحس بشد في أعصابي وتفكير مفرط (Overthinking) يمنعني من التركيز.»",
        solution: "الريحان المقدس معروف بقدرته على تصفية الذهن وتهدئة الأعصاب المتوترة، ليعيد لعقلك هدوءه وتركيزه."
      }
    ],
    theme: {
      from: "from-[#2e1d0f]",
      to: "to-[#140b04]",
      accent: "#d4af37",
      icon: "🧘",
    }
  }
];