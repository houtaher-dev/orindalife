"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Truck, ShieldCheck, Star, ShoppingBag, PhoneCall, MapPin, Package, CheckCircle, CreditCard, ArrowRight, AlertTriangle, X } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { useCartStore } from "@/lib/cartStore";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";

export default function ThankYouPage() {
  const lastOrder = useCartStore((state) => state.lastOrder);
  const orderSubmitError = useCartStore((state) => state.orderSubmitError);
  const setOrderSubmitError = useCartStore((state) => state.setOrderSubmitError);

  const [orderReference, setOrderReference] = useState<string | null>(null);

  useEffect(() => {
    setOrderReference(String(Math.floor(100000 + Math.random() * 900000)));
  }, []);

  const crossSells = PRODUCTS.slice(0, 3); // Showing 3 products to match the screenshot layout

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24">
      {orderSubmitError && (
        <div className="bg-red-50 border-b border-red-100 text-red-900">
          <div className="container mx-auto px-4 max-w-2xl py-4 flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0 space-y-1">
              <p className="font-bold text-sm">تعذر تأكيد الطلب على السيرفر</p>
              <p className="text-sm text-red-800/90 leading-relaxed">{orderSubmitError}</p>
              <p className="text-xs text-red-700/80">إذا ظهرت لك هذه الرسالة، المرجو المحاولة مرة أخرى من السلة أو التواصل معنا.</p>
            </div>
            <button
              type="button"
              onClick={() => setOrderSubmitError(null)}
              className="p-1.5 rounded-lg hover:bg-red-100/80 transition-colors shrink-0"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      {/* Top Header */}
      <div className="bg-[#FAF9F6] pt-12 pb-6">
        <div className="container mx-auto px-4 max-w-2xl text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-[#134e4a] text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[#134e4a]/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          
          {lastOrder && (
            <div className="flex items-center justify-center gap-1.5 mb-2 text-[#b5952f] font-bold">
              <span className="text-xl">✨</span>
              <span>شكراً {lastOrder.customerName.split(' ')[0]}</span>
            </div>
          )}

          <h1 className="text-2xl md:text-3xl font-black text-[#134e4a] flex items-center justify-center gap-3">
            طلبك محجوز — في انتظار تأكيدك
          </h1>
          
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 font-medium text-sm">
            <Package className="w-4 h-4" />
            <span>رقم الطلب:</span>
            {orderReference ? (
              <span className="font-bold text-gray-900 tracking-wider" dir="ltr">ORD-{orderReference}</span>
            ) : (
              <span className="inline-block h-4 w-20 bg-gray-200/80 rounded align-middle animate-pulse" aria-hidden />
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl space-y-6">
        
        {/* Call Info Box */}
        <div className="bg-gradient-to-br from-[#f8fcfb] to-[#eef7f6] rounded-3xl p-6 border border-[#e2f0ef] shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-right">
              <p className="text-[#b5952f] font-bold text-sm mb-1">استراحة فريق أوريندا الآن</p>
              <h3 className="font-black text-gray-900 text-lg md:text-xl">
                بنتصل عليك صباح اليوم من الساعة 9 (بتوقيت الدوحة)
              </h3>
            </div>
            <div className="bg-[#134e4a] p-4 rounded-2xl shadow-lg shadow-[#134e4a]/20 text-white shrink-0">
              <PhoneCall className="w-8 h-8 animate-pulse" />
            </div>
          </div>
          
          {lastOrder && (
            <div className="mt-6 bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between">
              <button className="flex items-center gap-2 text-[#134e4a] bg-gray-50 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
                <span className="transform rotate-90">✎</span>
                الرقم غلط؟ عدّليه
              </button>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 text-lg tracking-wider" dir="ltr">{lastOrder.phone || "تم الحفظ"}</span>
                <span className="text-gray-500 text-sm">بنتصل على:</span>
                <PhoneCall className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* Customer Info Box (Hidden as per new design, replaced by the above and below sections) */}
        
        {/* Call Details Box */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-end gap-3 mb-6">
            <h3 className="font-black text-gray-900 text-xl">وش يحصل في المكالمة؟</h3>
            <div className="bg-green-50 p-2 rounded-xl text-[#134e4a]">
              <PhoneCall className="w-6 h-6" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
            <div className="space-y-6">
              <div className="flex items-start justify-end gap-3">
                <div>
                  <p className="text-gray-600 font-medium text-sm">أقل من دقيقتين — نأكد العنوان فقط.</p>
                </div>
                <div className="text-gray-400 mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
              </div>
              <div className="flex items-start justify-end gap-3">
                <div>
                  <p className="text-gray-600 font-medium text-sm">لو ما رديتي، نحاول مرتين + رسالة واتساب. ما نلغي طلبك بسهولة.</p>
                </div>
                <div className="text-gray-400 mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start justify-end gap-3">
                <div>
                  <p className="text-gray-600 font-medium text-sm">موظفة تتكلم بهدوء — مو رجال.</p>
                </div>
                <div className="text-gray-400 mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
              </div>
              <div className="flex items-start justify-end gap-3">
                <div>
                  <p className="text-gray-600 font-medium text-sm">ما نطلب بطاقة بنكية ولا تحويل — كاش/شبكة عند الاستلام.</p>
                </div>
                <div className="text-gray-400 mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Journey Timeline */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm overflow-hidden">
          <h3 className="font-black text-gray-900 text-xl text-right mb-8">رحلة طلبك</h3>
          
          <div className="relative flex justify-between items-start">
            {/* Connecting Line */}
            <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-gray-100 -z-10"></div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 border-2 border-white shadow-sm">
                <Truck className="w-5 h-5 text-[#134e4a]" />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-1">خلال 2-4 أيام</h4>
              <p className="text-xs text-gray-500 leading-relaxed">يصلك مع المندوب — تدفعين كاش/شبكة</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-3 border-2 border-white shadow-sm">
                <Package className="w-5 h-5 text-[#134e4a]" />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-1">خلال 24 ساعة</h4>
              <p className="text-xs text-gray-500 leading-relaxed">شحن من مستودعنا + رقم تتبع على الواتساب</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-[#8ba8a6] flex items-center justify-center mb-3 border-2 border-white shadow-sm ring-4 ring-[#8ba8a6]/20">
                <PhoneCall className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-1">صباح اليوم 9</h4>
              <p className="text-xs text-gray-500 leading-relaxed">مكالمة تأكيد سريعة (دقيقتين)</p>
            </div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-[#134e4a] flex items-center justify-center mb-3 border-2 border-white shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-1">الآن</h4>
              <p className="text-xs text-gray-500 leading-relaxed">استلمنا طلبك بنجاح</p>
            </div>
          </div>
        </div>

        {/* Expected Results Box */}
        <div className="bg-[#f8fcfb] rounded-3xl p-6 border border-[#e2f0ef] shadow-sm">
          <div className="flex items-center justify-end gap-2 mb-6">
            <h3 className="font-black text-[#134e4a] text-lg">نتيجتك المتوقعة مع روتين أوريندا</h3>
            <Star className="w-5 h-5 text-[#b5952f]" />
          </div>

          <div className="space-y-6 relative before:absolute before:right-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {/* Week 1 */}
            <div className="relative flex justify-end items-start gap-4">
              <div className="text-right pt-1">
                <h4 className="font-black text-gray-900 text-base mb-1">أول 7 أيام</h4>
                <p className="text-sm text-gray-600 leading-relaxed">نضارة ولمعان واضحين من اليوم الثالث، بشرتك أصفى وأنعم، والمكياج يثبت أحسن. مضادات الأكسدة بدأت تشتغل من اليوم الأول.</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#134e4a] text-white font-bold flex items-center justify-center shrink-0 z-10 border-4 border-[#f8fcfb]">1</div>
            </div>

            {/* Week 2 */}
            <div className="relative flex justify-end items-start gap-4">
              <div className="text-right pt-1">
                <h4 className="font-black text-gray-900 text-base mb-1">الأسبوع الثاني</h4>
                <p className="text-sm text-gray-600 leading-relaxed">الخطوط الدقيقة حول العين تخف بشكل ملحوظ، علامات الإرهاق تختفي، والبشرة ممتلئة أكثر. تبدأ التعليقات: «وجهك مرتاح اليوم».</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#134e4a] text-white font-bold flex items-center justify-center shrink-0 z-10 border-4 border-[#f8fcfb]">2</div>
            </div>

            {/* End of Box 1 */}
            <div className="relative flex justify-end items-start gap-4">
              <div className="text-right pt-1">
                <h4 className="font-black text-gray-900 text-base mb-1">نهاية العلبة الأولى</h4>
                <p className="text-sm text-gray-600 leading-relaxed">الفرق واضح في صورة قبل وبعد. تجاعيد أقل، بشرة مشدودة، ومظهر أصغر سناً. العلبة الثانية والثالثة تثبّت النتيجة وتمنع رجوعها.</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#134e4a] text-white font-bold flex items-center justify-center shrink-0 z-10 border-4 border-[#f8fcfb]">3</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 italic">تخيلي صورة نفسك بعد 30 يوم من الآن. هذا اللي تستحقينه — وهذا اللي بيوصلك مع طلبك.</p>
          </div>
        </div>

        {/* Preparation / Unboxing Box */}
        <div className="bg-[#fdfbf7] rounded-3xl p-6 border border-[#f0eadd] shadow-sm">
          <div className="flex items-center justify-end gap-2 mb-6">
            <h3 className="font-black text-gray-900 text-lg">حضّري لاستلامه</h3>
            <Star className="w-5 h-5 text-[#b5952f]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center shadow-sm">
              <div className="w-10 h-10 bg-[#fdfbf7] rounded-full flex items-center justify-center mx-auto mb-3 text-[#b5952f]">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-2">تغليف ذهبي فاخر</h4>
              <p className="text-xs text-gray-500 leading-relaxed">يجيك في علبة بتصميم apothecary مع بطاقة تعليمات شخصية بخط اليد.</p>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center shadow-sm">
              <div className="w-10 h-10 bg-[#fdfbf7] rounded-full flex items-center justify-center mx-auto mb-3 text-[#b5952f]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-2">افتحيها مع قهوة الصبح</h4>
              <p className="text-xs text-gray-500 leading-relaxed">أول علكة بعد الفطور — الأستازانثين والكولاجين يُمتصون أحسن مع وجبة فيها دهون صحية.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center shadow-sm">
              <div className="w-10 h-10 bg-[#fdfbf7] rounded-full flex items-center justify-center mx-auto mb-3 text-[#b5952f]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-2">شاركينا أول صورة</h4>
              <p className="text-xs text-gray-500 leading-relaxed">ابعثينا صورة الـ unboxing على واتساب — وتحصلين على هدية صغيرة مع طلبك الجاي.</p>
            </div>
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