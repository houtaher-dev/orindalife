"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Truck, ShieldCheck, Star, ShoppingBag, PhoneCall, MapPin, Package, CheckCircle, CreditCard, ArrowRight, AlertTriangle, X, Shield, HandCoins, BadgeCheck } from "lucide-react";
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
    <div className="bg-[#FAF9F6] min-h-screen flex flex-col">
      <div className="flex-grow pb-12">
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
            طلبكم محجوز — في انتظار تأكيدكم
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
        
        {/* Order Summary Box */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#fdfbf7] p-2 rounded-xl text-[#b5952f]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-black text-gray-900 text-xl">ملخص الطلبية</h3>
          </div>

          {lastOrder ? (
            <div className="space-y-4">
              {lastOrder.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl relative overflow-hidden flex-shrink-0 border border-gray-100">
                      <Image src={item.product.image_url} alt={item.product.name_ar} fill className="object-contain p-2" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.product.name_ar}</h4>
                      <p className="text-xs text-gray-500 mt-1">الكمية: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="font-black text-[#134e4a]">{item.bundlePrice * item.quantity}</span>
                    <span className="text-xs text-gray-500 mr-1">ر.ق</span>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 mt-2">
                <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
                  <span>الشحن</span>
                  <span className="font-bold text-green-600">مجاني</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="font-black text-gray-900">الإجمالي</span>
                  <div className="text-left">
                    <span className="font-black text-xl text-[#134e4a]">{lastOrder.total}</span>
                    <span className="text-sm text-gray-500 mr-1 font-bold">ر.ق</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              جاري تحميل تفاصيل الطلب...
            </div>
          )}
          
          {lastOrder && (
            <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500 text-sm">رقم التواصل:</span>
                <span className="font-bold text-gray-900 text-lg tracking-wider" dir="ltr">{lastOrder.phone || "تم الحفظ"}</span>
              </div>
              <button className="flex items-center gap-2 text-[#134e4a] bg-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
                <span className="transform -rotate-90">✎</span>
                تعديل
              </button>
            </div>
          )}
        </div>

        {/* Customer Info Box (Hidden as per new design, replaced by the above and below sections) */}
        
        {/* Call Details Box */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-50 p-2 rounded-xl text-[#134e4a]">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-black text-gray-900 text-xl">وش يحصل في المكالمة؟</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="text-gray-400 mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                  <p className="text-gray-600 font-medium text-sm text-right">أقل من دقيقتين — نأكد العنوان فقط.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-gray-400 mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                  <p className="text-gray-600 font-medium text-sm text-right">لو لم تردوا، نحاول مرتين + رسالة واتساب. ما نلغي طلبكم بسهولة.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="text-gray-400 mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                  <p className="text-gray-600 font-medium text-sm text-right">فريق متخصص يتكلم بهدوء.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-gray-400 mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                  <p className="text-gray-600 font-medium text-sm text-right">ما نطلب بطاقة بنكية ولا تحويل — كاش/شبكة عند الاستلام.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Journey Timeline */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm overflow-hidden">
          <h3 className="font-black text-gray-900 text-xl text-right mb-8">رحلة طلبكم</h3>
          
          <div className="relative flex justify-between items-start">
            {/* Connecting Line */}
            <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-gray-100 -z-10"></div>
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-[#134e4a] flex items-center justify-center mb-3 border-2 border-white shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-1">الآن</h4>
              <p className="text-xs text-gray-500 leading-relaxed">استلمنا طلبكم بنجاح</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-[#8ba8a6] flex items-center justify-center mb-3 border-2 border-white shadow-sm ring-4 ring-[#8ba8a6]/20">
                <PhoneCall className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-1">في أقرب وقت</h4>
              <p className="text-xs text-gray-500 leading-relaxed">مكالمة تأكيد سريعة (دقيقتين)</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-3 border-2 border-white shadow-sm">
                <Package className="w-5 h-5 text-[#134e4a]" />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-1">خلال 24 ساعة</h4>
              <p className="text-xs text-gray-500 leading-relaxed">شحن من مستودعنا + رقم تتبع على الواتساب</p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 border-2 border-white shadow-sm">
                <Truck className="w-5 h-5 text-[#134e4a]" />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-1">خلال 2-4 أيام</h4>
              <p className="text-xs text-gray-500 leading-relaxed">يصلكم مع المندوب — تدفعون كاش/شبكة</p>
            </div>
          </div>
        </div>

        {/* Expected Results Box */}
        <div className="bg-[#f8fcfb] rounded-3xl p-6 border border-[#e2f0ef] shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-[#b5952f]" />
            <h3 className="font-black text-[#134e4a] text-lg">نتيجتكم المتوقعة مع روتين أوريندا</h3>
          </div>

          <div className="space-y-6 relative before:absolute before:right-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {/* Week 1 */}
            <div className="relative flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#134e4a] text-white font-bold flex items-center justify-center shrink-0 z-10 border-4 border-[#f8fcfb]">1</div>
              <div className="text-right pt-1">
                <h4 className="font-black text-gray-900 text-base mb-1">أول 7 أيام</h4>
                <p className="text-sm text-gray-600 leading-relaxed">نضارة ولمعان واضحين من اليوم الثالث، بشرتكم أصفى وأنعم، والمكياج يثبت أحسن. مضادات الأكسدة بدأت تشتغل من اليوم الأول.</p>
              </div>
            </div>

            {/* Week 2 */}
            <div className="relative flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#134e4a] text-white font-bold flex items-center justify-center shrink-0 z-10 border-4 border-[#f8fcfb]">2</div>
              <div className="text-right pt-1">
                <h4 className="font-black text-gray-900 text-base mb-1">الأسبوع الثاني</h4>
                <p className="text-sm text-gray-600 leading-relaxed">الخطوط الدقيقة حول العين تخف بشكل ملحوظ، علامات الإرهاق تختفي، والبشرة ممتلئة أكثر. تبدأ التعليقات: «وجهكم مرتاح اليوم».</p>
              </div>
            </div>

            {/* End of Box 1 */}
            <div className="relative flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#134e4a] text-white font-bold flex items-center justify-center shrink-0 z-10 border-4 border-[#f8fcfb]">3</div>
              <div className="text-right pt-1">
                <h4 className="font-black text-gray-900 text-base mb-1">نهاية العلبة الأولى</h4>
                <p className="text-sm text-gray-600 leading-relaxed">الفرق واضح في صورة قبل وبعد. تجاعيد أقل، بشرة مشدودة، ومظهر أصغر سناً. العلبة الثانية والثالثة تثبّت النتيجة وتمنع رجوعها.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 italic">تخيلوا صورة أنفسكم بعد 30 يوم من الآن. هذا اللي تستحقونه — وهذا اللي بيوصلكم مع طلبكم.</p>
          </div>
        </div>

        {/* Preparation / Unboxing Box */}
        <div className="bg-[#fdfbf7] rounded-3xl p-6 border border-[#f0eadd] shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-[#b5952f]" />
            <h3 className="font-black text-gray-900 text-lg">استعدوا لاستلامه</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center shadow-sm">
              <div className="w-10 h-10 bg-[#fdfbf7] rounded-full flex items-center justify-center mx-auto mb-3 text-[#b5952f]">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-2">تغليف ذهبي فاخر</h4>
              <p className="text-xs text-gray-500 leading-relaxed">يصلكم في علبة بتصميم apothecary مع بطاقة تعليمات شخصية بخط اليد.</p>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center shadow-sm">
              <div className="w-10 h-10 bg-[#fdfbf7] rounded-full flex items-center justify-center mx-auto mb-3 text-[#b5952f]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-2">افتحوه مع قهوة الصبح</h4>
              <p className="text-xs text-gray-500 leading-relaxed">أول علكة بعد الفطور — الأستازانثين والكولاجين يُمتصون أحسن مع وجبة فيها دهون صحية.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center shadow-sm">
              <div className="w-10 h-10 bg-[#fdfbf7] rounded-full flex items-center justify-center mx-auto mb-3 text-[#b5952f]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-black text-gray-900 text-sm mb-2">شاركونا أول صورة</h4>
              <p className="text-xs text-gray-500 leading-relaxed">ابعثوا لنا صورة الـ unboxing على واتساب — وستحصلون على هدية صغيرة مع طلبكم الجاي.</p>
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
          <h2 className="text-xl font-black text-[#134e4a]">اكتشفوا بقية منتجاتنا</h2>
          <p className="text-gray-500 text-sm mt-2">إليكم منتجات تكمل روتينكم (الشحن مجاني لطلبكم الحالي)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" dir="rtl">
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
      <div className="mt-8 mb-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <FAQSection />
        </div>
      </div>

      {/* Return to Home */}
      <div className="text-center mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowRight className="w-4 h-4" />
          العودة لمجموعة أوريندا
        </Link>
      </div>
      </div>

      {/* Trust Banner */}
      <div className="border-t border-gray-200 bg-white mt-auto">
        <div className="container mx-auto px-4 max-w-6xl py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4" dir="rtl">
            
            <div className="bg-[#fdfbf7] border border-[#f0eadd] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#eef7f6] border border-[#e2f0ef] flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-[#134e4a]" />
              </div>
              <div className="text-right flex-1">
                <h4 className="font-bold text-gray-900 text-sm mb-1">شحن سريع داخل قطر</h4>
                <p className="text-xs text-gray-500">توصيل من 1 إلى 3 أيام عمل لجميع المناطق</p>
              </div>
            </div>

            <div className="bg-[#fdfbf7] border border-[#f0eadd] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#eef7f6] border border-[#e2f0ef] flex items-center justify-center shrink-0">
                <HandCoins className="w-6 h-6 text-[#134e4a]" />
              </div>
              <div className="text-right flex-1">
                <h4 className="font-bold text-gray-900 text-sm mb-1">الدفع عند الاستلام</h4>
                <p className="text-xs text-gray-500">ادفعوا بعد ما يوصلكم الطلب لباب البيت</p>
              </div>
            </div>

            <div className="bg-[#fdfbf7] border border-[#f0eadd] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#eef7f6] border border-[#e2f0ef] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#134e4a]" />
              </div>
              <div className="text-right flex-1">
                <h4 className="font-bold text-gray-900 text-sm mb-1">ضمان استرجاع 30 يوم</h4>
                <p className="text-xs text-gray-500">ما حسيتوا بفرق؟ نرجع لكم المبلغ كامل</p>
              </div>
            </div>

            <div className="bg-[#fdfbf7] border border-[#f0eadd] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#eef7f6] border border-[#e2f0ef] flex items-center justify-center shrink-0">
                <BadgeCheck className="w-6 h-6 text-[#134e4a]" />
              </div>
              <div className="text-right flex-1">
                <h4 className="font-bold text-gray-900 text-sm mb-1">مرخّص من SFDA • حلال 100%</h4>
                <p className="text-xs text-gray-500">تركيبات مفحوصة من هيئة الغذاء والدواء</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}