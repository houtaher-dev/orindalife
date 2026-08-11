import React from "react";
import { ShieldCheck, Leaf, FlaskConical, BadgeCheck } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="about" className="py-12 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">لماذا حِداق الخليج؟</h3>
          <p className="text-gray-400 text-lg">
            نحن نفهم احتياجات الصياد في السعودية، ونوفر لك أفضل المعدات التي تضمن لك رحلة صيد ناجحة وممتعة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-[#1A365D] p-8 rounded-3xl shadow-lg shadow-black/50 border border-[#FF6B35]/20 hover:border-[#FF6B35]/50 transition-colors flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#0B1B3D] rounded-2xl flex items-center justify-center mb-6 text-[#FF6B35] border border-[#FF6B35]/20 shadow-[0_0_15px_rgba(255,107,53,0.15)]">
              <ShieldCheck className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <h4 className="text-lg font-bold text-gray-200 mb-3 leading-tight">جودة ومتانة عالية</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              معدات مصنوعة من أفضل المواد المقاومة للصدأ والتآكل لتتحمل بيئة البحر القاسية وتدوم طويلاً.
            </p>
          </div>

          <div className="bg-[#1A365D] p-8 rounded-3xl shadow-lg shadow-black/50 border border-[#FF6B35]/20 hover:border-[#FF6B35]/50 transition-colors flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#0B1B3D] rounded-2xl flex items-center justify-center mb-6 text-[#FF6B35] border border-[#FF6B35]/20 shadow-[0_0_15px_rgba(255,107,53,0.15)]">
              <BadgeCheck className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <h4 className="text-lg font-bold text-gray-200 mb-3 leading-tight">مناسبة لجميع المستويات</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              سواء كنت مبتدئاً أو محترفاً، لدينا المعدات المناسبة التي تلبي احتياجاتك وتطور مهاراتك.
            </p>
          </div>

          <div className="bg-[#1A365D] p-8 rounded-3xl shadow-lg shadow-black/50 border border-[#FF6B35]/20 hover:border-[#FF6B35]/50 transition-colors flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#0B1B3D] rounded-2xl flex items-center justify-center mb-6 text-[#FF6B35] border border-[#FF6B35]/20 shadow-[0_0_15px_rgba(255,107,53,0.15)]">
              <FlaskConical className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <h4 className="text-lg font-bold text-gray-200 mb-3 leading-tight">مجموعات متكاملة</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              نوفر لك حقائب صيد متكاملة جاهزة للاستخدام فوراً، توفر عليك عناء البحث وتجميع القطع.
            </p>
          </div>

          <div className="bg-[#1A365D] p-8 rounded-3xl shadow-lg shadow-black/50 border border-[#FF6B35]/20 hover:border-[#FF6B35]/50 transition-colors flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#0B1B3D] rounded-2xl flex items-center justify-center mb-6 text-[#FF6B35] border border-[#FF6B35]/20 shadow-[0_0_15px_rgba(255,107,53,0.15)]">
              <BadgeCheck className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <h4 className="text-lg font-bold text-gray-200 mb-3 leading-tight">دفع عند الاستلام</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              اطلب الآن وادفع براحتك عند استلام الطلب. نضمن لك تجربة تسوق آمنة وموثوقة.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
