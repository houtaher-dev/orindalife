"use client";

import React, { useState } from "react";
import { Plus, Minus, ShieldCheck, CheckCircle2, Truck, CheckCircle } from "lucide-react";

const FAQS = [
  {
    question: "وش تحتوي حقيبة الصيد المتكاملة؟",
    answer: "تحتوي الحقيبة على قصبة صيد (بالمقاس اللي تختاره)، ماكينة صيد متوافقة، خيط نايلون، ومجموعة أساسية من الطعوم والخطاطيف، بالإضافة لحقيبة لحفظ المعدات."
  },
  {
    question: "كيف أختار مقاس القصبة المناسب لي؟",
    answer: "إذا كنت مبتدئ أو تصيد من قارب، مقاس 1.8م أو 2.4م ممتاز للتحكم. إذا كنت تصيد من الشاطئ وتحتاج ترمي لمسافات بعيدة، خذ 3.0م أو 3.6م."
  },
  {
    question: "هل المعدات تتحمل الموية المالحة؟",
    answer: "نعم، جميع معداتنا مصممة خصيصاً للصيد البحري ومصنوعة من مواد مقاومة للصدأ والتآكل."
  },
  {
    question: "كم رسوم الشحن؟",
    answer: "الشحن مجاني تماماً لجميع مناطق ومدن السعودية. ما تدفع أي رسوم إضافية غير قيمة المنتج."
  },
  {
    question: "أقدر أدفع عند الاستلام؟",
    answer: "أكيد! نوفر خدمة الدفع عند الاستلام لراحتك وضمان تسوق آمن."
  }
];

export function FAQSection({ isDark = false }: { isDark?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-2">
      <div className="w-full">
        
        <div className="text-center mb-10">
          <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
            أسئلة سريعة
          </h3>
        </div>

        <div className={`${isDark ? 'bg-[#1A365D] border-[#FF6B35]/20 shadow-black/50' : 'bg-white border-gray-100 shadow-sm'} rounded-3xl border overflow-hidden mb-8`}>
          {FAQS.map((faq, index) => (
            <div 
              key={index}
              className={`border-b ${isDark ? 'border-[#FF6B35]/20' : 'border-gray-100'} last:border-0 transition-all duration-300 ${
                openIndex === index 
                  ? (isDark ? 'bg-[#0B1B3D]' : 'bg-gray-50/50') 
                  : (isDark ? 'bg-[#1A365D] hover:bg-[#0B1B3D]/50' : 'bg-white hover:bg-gray-50/30')
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-right"
              >
                <span className={`font-bold text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {faq.question}
                </span>
                <div className={isDark ? 'text-[#FF6B35]' : 'text-gray-400'}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm leading-relaxed pt-2`}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8" dir="rtl">
          <div className={`${isDark ? 'bg-[#1A365D] border-[#FF6B35]/20' : 'bg-white border-gray-100'} rounded-xl border py-3 px-4 flex items-center justify-center gap-2 shadow-sm`}>
            <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-[#FF6B35]' : 'text-[#0B1B3D]'}`} />
            <span className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>جودة عالية</span>
          </div>
          <div className={`${isDark ? 'bg-[#1A365D] border-[#FF6B35]/20' : 'bg-white border-gray-100'} rounded-xl border py-3 px-4 flex items-center justify-center gap-2 shadow-sm`}>
            <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-[#FF6B35]' : 'text-[#0B1B3D]'}`} />
            <span className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>دفع عند الاستلام</span>
          </div>
          <div className={`${isDark ? 'bg-[#1A365D] border-[#FF6B35]/20' : 'bg-white border-gray-100'} rounded-xl border py-3 px-4 flex items-center justify-center gap-2 shadow-sm`}>
            <Truck className={`w-4 h-4 ${isDark ? 'text-[#FF6B35]' : 'text-[#0B1B3D]'}`} />
            <span className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>شحن مجاني</span>
          </div>
          <div className={`${isDark ? 'bg-[#1A365D] border-[#FF6B35]/20' : 'bg-white border-gray-100'} rounded-xl border py-3 px-4 flex items-center justify-center gap-2 shadow-sm`}>
            <CheckCircle className={`w-4 h-4 ${isDark ? 'text-[#FF6B35]' : 'text-[#0B1B3D]'}`} />
            <span className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>ضمان استبدال</span>
          </div>
        </div>

      </div>
    </section>
  );
}
