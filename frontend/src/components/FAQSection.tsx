"use client";

import React, { useState } from "react";
import { Plus, Minus, ShieldCheck, CheckCircle2, Truck, CheckCircle } from "lucide-react";

const FAQS = [
  {
    question: "وش لو الرقم اللي أدخلته غلط؟",
    answer: "لا تشيل هم، تقدر تعدل رقمك بسهولة من صفحة تأكيد الطلب اللي تظهر لك بعد إتمام الشراء، أو تواصل معنا على الواتساب."
  },
  {
    question: "ليش يتصل عليّ رقم قطري ما أعرفه؟",
    answer: "هذا فريق خدمة العملاء في أوريندا، نتصل بك لتأكيد تفاصيل عنوانك وموعد الاستلام المناسب لك لضمان وصول طلبك بأسرع وقت."
  },
  {
    question: "أقدر ألغي الطلب أو أعدّله؟",
    answer: "أكيد! تقدر تلغي أو تعدل طلبك بكل سهولة أثناء مكالمة التأكيد مع موظف خدمة العملاء، أو عبر التواصل معنا على الواتساب قبل شحن الطلب."
  },
  {
    question: "كم رسوم الشحن؟",
    answer: "الشحن مجاني تماماً لجميع مناطق ومدن دولة قطر. ما تدفع أي رسوم إضافية غير قيمة المنتج."
  },
  {
    question: "متى تصلني الفاتورة الضريبية؟",
    answer: "تصلك الفاتورة الضريبية إلكترونياً عبر الإيميل أو الواتساب فور استلامك للطلب والدفع للمندوب."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-2">
      <div className="w-full">
        
        <div className="text-center mb-10">
          <h3 className="text-xl font-black text-gray-900">
            أسئلة سريعة
          </h3>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          {FAQS.map((faq, index) => (
            <div 
              key={index}
              className={`border-b border-gray-100 last:border-0 transition-all duration-300 ${
                openIndex === index ? "bg-gray-50/50" : "bg-white hover:bg-gray-50/30"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-right"
              >
                <span className="font-bold text-sm text-gray-800">
                  {faq.question}
                </span>
                <div className="text-gray-400">
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-500 text-sm leading-relaxed pt-2">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 py-3 px-2 flex items-center justify-center gap-2 shadow-sm">
            <span className="text-xs font-bold text-gray-800">مرخّص SFDA</span>
            <ShieldCheck className="w-4 h-4 text-[#134e4a]" />
          </div>
          <div className="bg-white rounded-xl border border-gray-100 py-3 px-2 flex items-center justify-center gap-2 shadow-sm">
            <span className="text-xs font-bold text-gray-800">حلال 100%</span>
            <CheckCircle2 className="w-4 h-4 text-[#134e4a]" />
          </div>
          <div className="bg-white rounded-xl border border-gray-100 py-3 px-2 flex items-center justify-center gap-2 shadow-sm">
            <span className="text-xs font-bold text-gray-800">شحن مجاني</span>
            <Truck className="w-4 h-4 text-[#134e4a]" />
          </div>
          <div className="bg-white rounded-xl border border-gray-100 py-3 px-2 flex items-center justify-center gap-2 shadow-sm">
            <span className="text-xs font-bold text-gray-800">ضمان 30 يوم</span>
            <CheckCircle className="w-4 h-4 text-[#134e4a]" />
          </div>
        </div>

      </div>
    </section>
  );
}
