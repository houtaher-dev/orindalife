"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "هل المنتجات مرخصة من هيئة الغذاء والدواء؟",
    answer: "نعم، جميع منتجات أوريندا مرخصة ومعتمدة من هيئة الغذاء والدواء (SFDA) ومطابقة لأعلى معايير الجودة."
  },
  {
    question: "هل الدفع عند الاستلام متاح لجميع مدن قطر؟",
    answer: "نعم، نوفر خدمة الدفع عند الاستلام (Cash on Delivery) لجميع مناطق ومدن دولة قطر لتسهيل عملية الشراء."
  },
  {
    question: "هل المنتجات حلال وبدون جيلاتين حيواني؟",
    answer: "بالتأكيد، منتجاتنا نباتية 100% وخالية تماماً من الجيلاتين الحيواني ومناسبة للنباتيين."
  },
  {
    question: "كم يستغرق التوصيل في قطر؟",
    answer: "يستغرق التوصيل عادةً من 1 إلى 3 أيام عمل لجميع مناطق قطر عبر شركات شحن موثوقة."
  },
  {
    question: "ما هو ضمان الاسترجاع؟",
    answer: "نقدم ضماناً ذهبياً لمدة 30 يوماً. إذا لم تكن راضياً عن النتائج، يمكنك استرجاع المبلغ بالكامل بدون أي تعقيدات."
  },
  {
    question: "متى سألاحظ النتيجة؟",
    answer: "تختلف النتائج من شخص لآخر، ولكن معظم عملائنا يلاحظون تحسناً ملحوظاً خلال الأسبوع الأول من الاستخدام المنتظم."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="text-center mb-16">
          <h2 className="text-xs font-black tracking-[0.2em] text-gray-400 uppercase mb-4">
            FAQ
          </h2>
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            أسئلة قبل الطلب
          </h3>
          <p className="text-gray-500 text-lg font-medium">
            كل اللي تحتاجين وتعرفين تعرفه قبل ما تدفع أي ريال
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index}
              className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                openIndex === index ? "border-[#134e4a] bg-gray-50/50 shadow-sm" : "border-gray-100 hover:border-gray-200 bg-white"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-right"
              >
                <span className={`font-bold text-lg transition-colors ${openIndex === index ? "text-[#134e4a]" : "text-gray-800"}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  openIndex === index ? "bg-[#134e4a] text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 font-medium leading-relaxed border-t border-gray-200/50 pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
