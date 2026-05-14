import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">أوريندا الحياة <span className="text-gray-500 font-normal">Orendalife</span></h3>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              صيدلية الصحة والتوازن. منتجات سريرية حلال مرخّصة من هيئة الغذاء والدواء (SFDA)، بأبحاث منشورة، لراحة عملائنا في قطر.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-1.5 rounded text-xs font-medium text-gray-300">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                SFDA
              </div>
              <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-1.5 rounded text-xs font-medium text-gray-300">
                حلال 100%
              </div>
              <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-1.5 rounded text-xs font-medium text-gray-300">
                GMP
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">المنتجات</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/#products" className="hover:text-white transition-colors">المجموعة الكاملة</Link></li>
              <li><Link href="/product/peaceful-slumber-gummies" className="hover:text-white transition-colors">علكات السُبات الهادئ</Link></li>
              <li><Link href="/product/focus-pro-coffee" className="hover:text-white transition-colors">قهوة اليَقَظَة برو</Link></li>
              <li><Link href="/product/anti-stress-calm-drops" className="hover:text-white transition-colors">قطرات الهدوء ضد التوتر</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">الدعم</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">تواصل معنا</Link></li>
              <li><Link href="/policies/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="/policies/refund" className="hover:text-white transition-colors">سياسة الاسترجاع</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© 2026 أوريندا الحياة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
