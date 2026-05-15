"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Truck, ShieldCheck, Star, ShoppingBag, PhoneCall, MapPin, Package, CheckCircle, CreditCard, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { useCartStore } from "@/lib/cartStore";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";

export default function ThankYouPage() {
  const [isMounted, setIsMounted] = useState(false);
  const lastOrder = useCartStore((state) => state.lastOrder);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const crossSells = PRODUCTS.slice(0, 3); // Showing 3 products to match the screenshot layout

  if (!isMounted) return null;

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-100 py-8 mb-8 shadow-sm">
        <div className="container mx-auto px-4 max-w-2xl text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-green-50 text-[#134e4a] rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center justify-center gap-3">
            طلبك محجوز — في انتظار تأكيده
          </h1>
          <p className="text-gray-500 mt-2 font-medium">رقم الطلب #{Math.floor(100000 + Math.random() * 900000)}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl space-y-6">
        
        {/* Call Info Box */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-[#134e4a] rounded-r-2xl"></div>
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-full shadow-sm text-[#134e4a] shrink-0">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">الخطوة القادمة والمهمة جداً</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                سيتصل بك فريقنا هاتفياً خلال الساعات القادمة لتأكيد طلبك وتحديد موعد الاستلام. <span className="font-bold text-gray-900">يرجى الرد على مكالماتنا.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Customer Info Box */}
        {lastOrder && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-[#134e4a] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 opacity-70" />
              بيانات الاستلام
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <span className="text-gray-500">الاسم</span>
                <span className="font-bold text-gray-900">{lastOrder.customerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">الدولة</span>
                <span className="font-bold text-gray-900">قطر</span>
              </div>
            </div>
          </div>
        )}

        {/* Order Summary — جدول احترافي */}
        {lastOrder && (
          <div className="rounded-2xl border border-[#134e4a]/12 overflow-hidden shadow-[0_12px_40px_-12px_rgba(19,78,74,0.18)] bg-white">
            <div className="bg-gradient-to-l from-[#134e4a] via-[#175c57] to-[#0f3d3a] px-5 py-4 flex items-center gap-3 border-b border-[#d4af37]/30">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <h3 className="text-white font-black text-base">ملخص الطلب</h3>
                <p className="text-emerald-100/90 text-xs font-medium mt-0.5">تفاصيل المنتجات والأسعار</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[320px] border-collapse">
                <thead>
                  <tr className="bg-[#f7f6f2] text-[#134e4a] text-xs font-bold uppercase tracking-wide border-b border-[#e5e2d9]">
                    <th className="text-right px-4 py-3 w-[52px]">صورة</th>
                    <th className="text-right px-4 py-3">المنتج</th>
                    <th className="text-center px-3 py-3 whitespace-nowrap">الكمية</th>
                    <th className="text-left px-4 py-3 whitespace-nowrap">السعر</th>
                  </tr>
                </thead>
                <tbody>
                  {lastOrder.items.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-[#fafaf8]"}
                    >
                      <td className="px-4 py-3 align-middle border-t border-[#eeece6]">
                        <div className={`relative h-14 w-14 mx-auto rounded-xl overflow-hidden bg-gradient-to-tr ${item.product.theme.from} ${item.product.theme.to} ring-2 ring-[#d4af37]/25 shadow-sm`}>
                          <Image src={item.product.image_url} alt={item.product.name_ar} fill className="object-contain p-1.5" />
                        </div>
                      </td>
                      <td className="px-4 py-3 align-middle border-t border-[#eeece6] text-right">
                        <span className="font-bold text-gray-900 leading-snug">{item.product.name_ar}</span>
                        <div className="flex flex-wrap gap-1.5 mt-2 justify-end">
                          {item.isUpsell && (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-200/80">عرض خاص</span>
                          )}
                          {item.bundleQuantity > 1 && !item.isUpsell && (
                            <span className="text-[10px] font-bold text-[#134e4a] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">عرض {item.bundleQuantity} حبات</span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-3 align-middle border-t border-[#eeece6] text-center font-bold tabular-nums text-gray-800">
                        {item.quantity * item.bundleQuantity}
                      </td>
                      <td className="px-4 py-3 align-middle border-t border-[#eeece6] text-left">
                        <span className="font-black text-[#134e4a] tabular-nums">{item.bundlePrice * item.quantity}</span>
                        <span className="text-[11px] text-gray-500 font-bold mr-1">ر.ق</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-4 bg-gradient-to-l from-[#f7f6f2] to-white border-t-2 border-[#d4af37]/35">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span className="font-medium">الشحن</span>
                <span className="font-bold text-[#134e4a]">مجاني</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="font-black text-gray-900">الإجمالي</span>
                <div className="flex items-baseline gap-1 rounded-xl bg-[#134e4a] text-white px-4 py-2 shadow-lg shadow-[#134e4a]/25">
                  <span className="text-xl font-black tabular-nums">{lastOrder.total}</span>
                  <span className="text-xs font-bold text-emerald-200">ر.ق</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timeline / Delivery Stages */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-[#134e4a] mb-6 flex items-center gap-2">
            <Truck className="w-5 h-5 opacity-70" />
            مراحل تجهيز طلبك
          </h3>
          
          <div className="relative pl-4 space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {/* Stage 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 border-4 border-white text-[#134e4a] shadow-sm z-10">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-gray-50 border border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-1">1. تأكيد الطلب</h4>
                <p className="text-xs text-gray-500 leading-relaxed">سنتصل بك هاتفياً لتأكيد العنوان والطلب.</p>
              </div>
            </div>
            
            {/* Stage 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 border-4 border-white text-gray-400 shadow-sm z-10">
                <Package className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-1">2. التجهيز والتغليف</h4>
                <p className="text-xs text-gray-500 leading-relaxed">تجهيز طلبك بعناية تامة في مستودعاتنا.</p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 border-4 border-white text-gray-400 shadow-sm z-10">
                <Truck className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-1">3. في الطريق إليك</h4>
                <p className="text-xs text-gray-500 leading-relaxed">تسليم الطلب لشركة الشحن (1-3 أيام).</p>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 border-4 border-white text-gray-400 shadow-sm z-10">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-1">4. استلام الطلب</h4>
                <p className="text-xs text-gray-500 leading-relaxed">استلام الطلب والدفع يداً بيد بكل أمان.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl flex flex-col items-center text-center border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6 text-[#134e4a]" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">ضمان أوريندا</h4>
            <p className="text-xs text-gray-500">منتجات أصلية ومضمونة 100%</p>
          </div>
          <div className="bg-white p-4 rounded-2xl flex flex-col items-center text-center border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <CreditCard className="w-6 h-6 text-[#134e4a]" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">الدفع عند الاستلام</h4>
            <p className="text-xs text-gray-500">تسوق بأمان، ادفع عند استلامك</p>
          </div>
        </div>

      </div>

      {/* Reviews Section */}
      <div className="mt-12 bg-white pt-6 pb-2 border-y border-gray-100">
        <ReviewsSection />
      </div>

      {/* Cross-sells Grid */}
      <div className="container mx-auto px-4 max-w-5xl mt-12 mb-12">
        <div className="text-center mb-10">
          <h2 className="text-xl font-black text-[#134e4a]">اكتشف بقية منتجاتنا</h2>
          <p className="text-gray-500 text-sm mt-2">إليك منتجات تكمل روتينك (الشحن مجاني لطلبك الحالي)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {crossSells.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all">
              <div className={`w-full h-40 rounded-xl bg-gradient-to-tr ${p.theme.from} ${p.theme.to} flex items-center justify-center text-4xl mb-4 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20 flex items-center justify-center">{p.theme.icon}</div>
                <Image src={p.image_url} alt={p.name_ar} fill className="object-contain p-4 relative z-10 hover:scale-105 transition-transform duration-500" />
              </div>
              
              <div className="flex text-yellow-400 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-2 line-clamp-1">{p.name_ar}</h4>
              <p className="text-xs text-gray-500 line-clamp-2 mb-4 h-8 leading-relaxed">{p.description_ar}</p>
              
              <div className="mt-auto w-full">
                <Link 
                  href={`/product/${p.slug}`}
                  className="w-full py-2.5 bg-[#134e4a] text-white font-bold rounded-xl hover:bg-[#0f3d3a] transition-colors text-sm flex items-center justify-center gap-2 shadow-sm shadow-[#134e4a]/20"
                >
                  عرض التفاصيل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border-t border-gray-100">
        <FAQSection />
      </div>

      {/* Return to Home */}
      <div className="mt-16 text-center">
        <Link href="/" className="inline-flex items-center gap-2 font-bold text-[#d4af37] hover:text-[#b5952f] transition-colors">
          <ArrowRight className="w-5 h-5" />
          العودة للصفحة الرئيسية
        </Link>
      </div>

    </div>
  );
}