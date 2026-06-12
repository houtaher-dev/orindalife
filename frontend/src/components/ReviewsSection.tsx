import React from "react";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    text: "الصراحة السعوديةات الهدوء غيرت روتيني، كنت وايد أعاني من التوتر والضغط. الحين الحمدلله أحس بتوازن وراحة بال. منتج يبيض الوجه ويعطيكم العافية على هالجودة.",
    name: "نورة الكواري",
    details: "34 سنة، الرياض • مشترية مؤكدة",
    initial: "ن"
  },
  {
    id: 2,
    text: "قهوة اليقظة برو ممتازة، تعطيني طاقة حق الدوام بدون ما تسبب لي رجفة الكافيين اللي كنت متعود عليها. صج شغل عدل وأول مرة أثق ببراند يذكر مكوناته بالتفصيل.",
    name: "جاسم المري",
    details: "29 سنة، الريان • مشتري مؤكد",
    initial: "ج"
  },
  {
    id: 3,
    text: "أهم شي عندي إن المنتجات مرخصة وحلال. جربت وايد أشياء قبل بس علكات السبات الهادئ فادتني وايد في تعديل نومي. توصيلكم كان وايد سريع للوكرة، شكراً أوريندا.",
    name: "حصة السليطي",
    details: "38 سنة، الوكرة • مشترية مؤكدة",
    initial: "ح"
  }
];

export function ReviewsSection({ isDark = false }: { isDark?: boolean }) {
  return (
    <section className={`py-12 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-black tracking-[0.2em] text-[#d4af37] uppercase mb-4">
            Verified Reviews
          </h2>
          <h3 className={`text-3xl md:text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-[#134e4a]'}`}>
            عملاء وعميلات قرأوا المكونات قبل الطلب
          </h3>
          <p className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            أوريندا اختيار اللي ما يصدق أي إعلان. يقرأ، يتحقق، ثم يطلب.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div key={review.id} className={`${isDark ? 'bg-[#1a1a1a] border-[#333333]' : 'bg-[#F8F7F3] border-gray-100/50'} rounded-3xl p-8 flex flex-col relative border`}>
              
              {/* Quote Icon */}
              <Quote className="absolute top-6 left-6 w-8 h-8 text-[#d4af37] opacity-20 rotate-180" fill="currentColor" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#d4af37]" fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              {/* Review Text */}
              <p className={`${isDark ? 'text-gray-200' : 'text-gray-800'} text-lg font-bold leading-relaxed text-center mb-8 flex-1`}>
                "{review.text}"
              </p>

              {/* Author */}
              <div className={`flex items-center justify-between mt-auto pt-6 border-t ${isDark ? 'border-[#333333]' : 'border-gray-200/50'}`}>
                <div className="flex flex-col">
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{review.name}</span>
                  <span className={`text-[10px] font-medium mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{review.details}</span>
                </div>
                
                {/* Initial Circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${isDark ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-[#0a0a0a]' : 'bg-[#134e4a] text-white'}`}>
                  {review.initial}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
