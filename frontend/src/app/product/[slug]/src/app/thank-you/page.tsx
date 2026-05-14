import React from "react";
import Link from "next/link";
import { CheckCircle2, Truck, ShieldCheck, ArrowRight, Star } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

export default function ThankYouPage() {
  const crossSells = PRODUCTS.slice(0, 2);

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Success Message */}
        <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-sm border border-gray-100 mb-12">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">تم تأكيد طلبك بنجاح!</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            شكراً لثقتك في أوريندا. فريقنا سيقوم بالتواصل معك قريباً لتأكيد عنوان التوصيل.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3 justify-center border border-gray-100">
              <Truck className="w-6 h-6 text-gray-400" />
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">توصيل سريع</div>
                <div className="text-xs text-gray-500">1-3 أيام داخل قطر</div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3 justify-center border border-gray-100">
              <ShieldCheck className="w-6 h-6 text-gray-400" />
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">الدفع عند الاستلام</div>
                <div className="text-xs text-gray-500">لن تدفع شيئاً الآن</div>
              </div>
            </div>
          </div>
        </div>

        {/* Post-purchase Cross-sells (CRO) */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-gray-900">عملائنا يضيفون هذه المنتجات لروتينهم أيضاً</h2>
            <p className="text-gray-500 mt-2">عزز نتائجك مع منتجاتنا المكملة (الشحن مجاني لطلبك الحالي)</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {crossSells.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div className="flex gap-4">
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${p.theme.from} ${p.theme.to} flex items-center justify-center text-3xl flex-shrink-0`}>
                    {p.theme.icon}
                  </div>
                  <div>
                    <div className="flex text-yellow-400 mb-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{p.name_ar}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{p.description_ar}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                  <div className="font-black text-xl text-gray-900">{p.price} <span className="text-sm font-medium text-gray-500">ر.ق</span></div>
                  <Link 
                    href={`/product/${p.slug}`}
                    className="px-6 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors text-sm"
                  >
                    عرض التفاصيل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary-dark transition-colors">
            <ArrowRight className="w-5 h-5" />
            العودة للصفحة الرئيسية
          </Link>
        </div>

      </div>
    </div>
  );
}
