import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-right">
          
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-black mb-4 text-white">أوريندا الحياة <span className="text-gray-400 font-normal text-lg">Orendalife</span></h3>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              صيدلية الصحة والتوازن. منتجات سريرية حلال مرخّصة من هيئة الغذاء والدواء (SFDA)، بأبحاث منشورة، لراحة عملائنا في قطر.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 px-4 py-2 rounded-full text-xs font-bold text-gray-300">
                SFDA
              </div>
              <div className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 px-4 py-2 rounded-full text-xs font-bold text-gray-300">
                حلال 100%
              </div>
              <div className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 px-4 py-2 rounded-full text-xs font-bold text-gray-300">
                GMP
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-black mb-6 text-lg text-white">المنتجات</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/#products" className="hover:text-white transition-colors">المجموعة الكاملة</Link></li>
              <li><Link href="/product/peaceful-slumber-gummies" className="hover:text-white transition-colors">علكات السُبات الهادئ</Link></li>
              <li><Link href="/product/focus-pro-coffee" className="hover:text-white transition-colors">قهوة اليَقَظَة برو</Link></li>
              <li><Link href="/product/anti-stress-calm-drops" className="hover:text-white transition-colors">قطرات الهدوء ضد التوتر</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-black mb-6 text-lg text-white">الدعم</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">تواصل معنا</Link></li>
              <li><Link href="/policies/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="/policies/refund" className="hover:text-white transition-colors">سياسة الاسترجاع</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© 2026 أوريندا الحياة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
