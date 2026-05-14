"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Truck, ShieldCheck, ArrowRight, Star, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { useCartStore, LastOrder } from "@/lib/cartStore";

export default function ThankYouPage() {
  const [isMounted, setIsMounted] = useState(false);
  const lastOrder = useCartStore((state) => state.lastOrder);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const crossSells = PRODUCTS.slice(0, 2);

  if (!isMounted) return null; // Prevent hydration mismatch for persisted store

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Success Message */}
        <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-sm border border-gray-100 mb-8">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            تم تأكيد طلبك بنجاح{lastOrder ? ` يا ${lastOrder.customerName}` : ''}!
          </h1>
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

        {/* Order Summary */}
        {lastOrder && (
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-12">
            <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
              <ShoppingBag className="w-6 h-6 text-primary" />
              ملخص الطلبية
            </h2>
            
            <div className="space-y-4">
              {lastOrder.items.map((item, index) => (
                <div key={index} className="flex gap-4 items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-tr ${item.product.theme.from} ${item.product.theme.to} relative overflow-hidden`}>
                    <Image src={item.product.image_url} alt={item.product.name_ar} fill className="object-contain p-2 relative z-10" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">
                      {item.product.name_ar}
                      {item.isUpsell && <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded mr-2 inline-block">عرض خاص</span>}
                    </h4>
                    <div className="text-sm text-gray-500 mt-1">
                      الكمية: {item.quantity * item.bundleQuantity} 
                      {item.bundleQuantity > 1 && !item.isUpsell ? ` (عرض ${item.bundleQuantity} حبات)` : ''}
                    </div>
                  </div>
                  <div className="font-black text-gray-900">
                    {item.bundlePrice * item.quantity} ر.ق
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center bg-green-50 p-4 rounded-xl">
              <span className="font-bold text-green-900">المجموع النهائي (شحن مجاني)</span>
              <span className="text-2xl font-black text-green-700">{lastOrder.total} ر.ق</span>
            </div>
          </div>
        )}

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
