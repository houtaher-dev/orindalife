import React from "react";
import { ShieldCheck, Leaf, FlaskConical, BadgeCheck } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="about" className="py-12 bg-[#F8F7F3]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-3xl md:text-4xl font-black text-[#134e4a] mb-4">صيدلية، مو متجر تجميل</h3>
          <p className="text-gray-600 text-lg">
            أوريندا مبنية على أربعة أركان لا نتنازل عنها: الترخيص، الحلال، التركيبة السريرية، وراحة عملائنا في قطر.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#134e4a] rounded-2xl flex items-center justify-center mb-6 text-white border border-[#134e4a]/10 shadow-md">
              <ShieldCheck className="w-8 h-8 text-[#d4af37]" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3 leading-tight">مرخّص من هيئة الغذاء والدواء (SFDA)</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              كل منتج مسجّل رسمياً في الهيئة العامة للغذاء والدواء. مو مجرد منتج تجميل — منتج معتمد.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#134e4a] rounded-2xl flex items-center justify-center mb-6 text-white border border-[#134e4a]/10 shadow-md">
              <Leaf className="w-8 h-8 text-[#d4af37]" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3 leading-tight">حلال 100% · نباتي · طبيعي</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              مكونات نباتية بالكامل، خالية من المواد المشكوك فيها، لضمان راحتك النفسية والجسدية.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#134e4a] rounded-2xl flex items-center justify-center mb-6 text-white border border-[#134e4a]/10 shadow-md">
              <FlaskConical className="w-8 h-8 text-[#d4af37]" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3 leading-tight">تركيبات سريرية، مو خلطات عشوائية</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              كل مكوّن بجرعة مدروسة بناءً على أبحاث منشورة. نشرح لك المصدر، الجرعة، والدراسة — بدون مكونات سرية.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#134e4a] rounded-2xl flex items-center justify-center mb-6 text-white border border-[#134e4a]/10 shadow-md">
              <BadgeCheck className="w-8 h-8 text-[#d4af37]" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3 leading-tight">ضمان 30 يوم · الدفع عند الاستلام</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              جرّب الروتين كاملاً، وإذا ما لاحظت فرق نرجّع لك فلوسك. تدفع لما يوصلك الطلب فقط.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
