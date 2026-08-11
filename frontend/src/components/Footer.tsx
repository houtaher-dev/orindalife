import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B1B3D] text-white pt-16 pb-8 border-t border-[#1A365D]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-row justify-between gap-4 md:gap-12 mb-16 text-right" dir="rtl">
          
          {/* Brand Column */}
          <div className="w-1/2 md:w-1/3">
            <h3 className="text-base md:text-2xl font-black mb-4 text-white">حِداق الخليج <span className="text-[#FF6B35] font-normal text-xs md:text-lg block md:inline mt-1 md:mt-0">Hadaq Al Khaleej</span></h3>
            <p className="text-gray-400 mb-6 leading-relaxed text-[11px] md:text-sm">
              وجهتك الأولى لمعدات الصيد البحري. نوفر لك أفضل القصبات والمكائن والطعوم بأعلى جودة لرحلة صيد ممتعة وناجحة في السعودية.
            </p>
            <div className="flex flex-wrap justify-start gap-2">
              <div className="flex items-center gap-1 bg-[#1A365D] border border-[#FF6B35]/20 px-2 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-xs font-bold text-[#FF6B35]">
                جودة عالية
              </div>
              <div className="flex items-center gap-1 bg-[#1A365D] border border-[#FF6B35]/20 px-2 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-xs font-bold text-[#FF6B35]">
                توصيل سريع
              </div>
              <div className="flex items-center gap-1 bg-[#1A365D] border border-[#FF6B35]/20 px-2 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-xs font-bold text-[#FF6B35]">
                دفع عند الاستلام
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="w-1/2 md:w-2/3 flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Products Column */}
            <div className="md:w-1/2">
              <h4 className="font-black mb-4 md:mb-6 text-sm md:text-lg text-white">المعدات</h4>
              <ul className="space-y-3 md:space-y-4 text-[11px] md:text-sm text-gray-400">
                <li><Link href="/#products" className="hover:text-[#FF6B35] transition-colors">جميع المعدات</Link></li>
                <li><Link href="/product/white-rabbit-180" className="hover:text-[#FF6B35] transition-colors">حقيبة صيد 1.8 متر</Link></li>
                <li><Link href="/product/white-rabbit-240" className="hover:text-[#FF6B35] transition-colors">حقيبة صيد 2.4 متر</Link></li>
                <li><Link href="/product/white-rabbit-300" className="hover:text-[#FF6B35] transition-colors">حقيبة صيد 3.0 متر</Link></li>
                <li><Link href="/product/white-rabbit-360" className="hover:text-[#FF6B35] transition-colors">حقيبة صيد 3.6 متر</Link></li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="md:w-1/2">
              <h4 className="font-black mb-4 md:mb-6 text-sm md:text-lg text-white">الدعم</h4>
              <ul className="space-y-3 md:space-y-4 text-[11px] md:text-sm text-gray-400">
                <li><Link href="/contact" className="hover:text-[#FF6B35] transition-colors">تواصل معنا</Link></li>
                <li><Link href="/policies/privacy" className="hover:text-[#FF6B35] transition-colors">سياسة الخصوصية</Link></li>
                <li><Link href="/policies/refund" className="hover:text-[#FF6B35] transition-colors">سياسة الاسترجاع</Link></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-[#1A365D] text-center text-gray-500 text-sm">
          <p>© 2026 حِداق الخليج. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
