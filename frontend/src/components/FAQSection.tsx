"use client";

import React, { useState } from "react";
import { Plus, Minus, ShieldCheck, CheckCircle2, Truck, CheckCircle } from "lucide-react";

const FAQS = [
  {
    question: "وش لو الرقم اللي أدخلته غلط؟",
    answer: "لا تشيل هم، تقدر تعدل رقمك بسهولة من صفحة تأكيد الطلب اللي تظهر لك بعد إتمام الشراء، أو تواصل معنا على الواتساب."
  },
  {
    question: "ليش يتصل عليّ رقم السعوديةي ما أعرفه؟",
    answer: "هذا فريق خدمة العملاء في أوريندا، نتصل بك لتأكيد تفاصيل عنوانك وموعد الاستلام المناسب لك لضمان وصول طلبك بأسرع وقت."
  },
  {
    question: "أقدر ألغي الطلب أو أعدّله؟",
    answer: "أكيد! تقدر تلغي أو تعدل طلبك بكل سهولة أثناء مكالمة التأكيد مع موظف خدمة العملاء، أو عبر التواصل معنا على الواتساب قبل شحن الطلب."
  },
  {
    question: "كم رسوم الشحن؟",
    answer: "الشحن مجاني تماماً لجميع مناطق ومدن دولة السعودية. ما تدفع أي رسوم إضافية غير قيمة المنتج."
  },
  {
    question: "متى تصلني الفاتورة الضريبية؟",
    answer: "تصلك الفاتورة الضريبية إلكترونياً عبر الإيميل أو الواتساب فور استلامك للطلب والدفع للمندوب."
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

        <div className={`${isDark ? 'bg-[#141414] border-[#333333] shadow-black/50' : 'bg-white border-gray-100 shadow-sm'} rounded-3xl border overflow-hidden mb-8`}>
          {FAQS.map((faq, index) => (
            <div 
              key={index}
              className={`border-b ${isDark ? 'border-[#333333]' : 'border-gray-100'} last:border-0 transition-all duration-300 ${
                openIndex === index 
                  ? (isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50/50') 
                  : (isDark ? 'bg-[#141414] hover:bg-[#1a1a1a]/50' : 'bg-white hover:bg-gray-50/30')
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-right"
              >
                <span className={`font-bold text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {faq.question}
                </span>
                <div className={isDark ? 'text-[#D4AF37]' : 'text-gray-400'}>
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
          <div className={`${isDark ? 'bg-[#141414] border-[#333333]' : 'bg-white border-gray-100'} rounded-xl border py-3 px-4 flex items-center justify-center gap-2 shadow-sm`}>
            <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#134e4a]'}`} />
            <span className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>مرخّص SFDA</span>
          </div>
          <div className={`${isDark ? 'bg-[#141414] border-[#333333]' : 'bg-white border-gray-100'} rounded-xl border py-3 px-4 flex items-center justify-center gap-2 shadow-sm`}>
            <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#134e4a]'}`} />
            <span className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>حلال 100%</span>
          </div>
          <div className={`${isDark ? 'bg-[#141414] border-[#333333]' : 'bg-white border-gray-100'} rounded-xl border py-3 px-4 flex items-center justify-center gap-2 shadow-sm`}>
            <Truck className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#134e4a]'}`} />
            <span className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>شحن مجاني</span>
          </div>
          <div className={`${isDark ? 'bg-[#141414] border-[#333333]' : 'bg-white border-gray-100'} rounded-xl border py-3 px-4 flex items-center justify-center gap-2 shadow-sm`}>
            <CheckCircle className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#134e4a]'}`} />
            <span className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>ضمان 30 يوم</span>
          </div>
        </div>

      </div>
    </section>
  );
}
