"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Truck, ShieldCheck, Star, ShoppingBag, PhoneCall, MapPin, Package, CheckCircle, CreditCard, ArrowRight, AlertTriangle, X, Shield, HandCoins, BadgeCheck } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { useCartStore } from "@/lib/cartStore";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";
import { ExpectedResultsTimeline } from "@/components/ExpectedResultsTimeline";

export default function ThankYouPage() {
  const lastOrder = useCartStore((state) => state.lastOrder);
  const orderSubmitError = useCartStore((state) => state.orderSubmitError);
  const setOrderSubmitError = useCartStore((state) => state.setOrderSubmitError);

  const [orderReference, setOrderReference] = useState<string | null>(null);

  useEffect(() => {
    setOrderReference(String(Math.floor(100000 + Math.random() * 900000)));
  }, []);

  const crossSells = PRODUCTS.slice(0, 3);
  const primaryProductSlug = lastOrder?.items[0]?.product.slug ?? "";

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col font-sans selection:bg-[#D4AF37]/30">
      <div className="flex-grow pb-12">
        {orderSubmitError && (
        <div className="bg-red-950/50 border-b border-red-900/50 text-red-200">
          <div className="container mx-auto px-4 max-w-2xl py-4 flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
            <div className="flex-1 min-w-0 space-y-1">
              <p className="font-bold text-sm text-red-300">تعذر تأكيد الطلب على السيرفر</p>
              <p className="text-sm text-red-200/90 leading-relaxed">{orderSubmitError}</p>
              <p className="text-xs text-red-300/80">إذا ظهرت لك هذه الرسالة، المرجو المحاولة مرة أخرى من السلة أو التواصل معنا.</p>
            </div>
            <button
              type="button"
              onClick={() => setOrderSubmitError(null)}
              className="p-1.5 rounded-lg hover:bg-red-900/50 transition-colors shrink-0 text-red-400"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      {/* Top Header */}
      <div className="bg-[#0B1B3D] pt-16 pb-8 border-b border-[#FF6B35]/20 relative overflow-hidden">
        {/* Subtle gold glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-[#FF6B35]/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-2xl text-center flex flex-col items-center relative z-10">
          <div className="w-20 h-20 bg-[#FF6B35] text-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,107,53,0.3)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          {lastOrder && (
            <div className="flex items-center justify-center gap-2 mb-3 text-white font-bold tracking-wide">
              <span className="text-xl">🎣</span>
              <span className="text-lg">شكراً {lastOrder.customerName.split(' ')[0]}</span>
            </div>
          )}

          <h1 className="text-2xl md:text-4xl font-black text-white flex items-center justify-center gap-3 mb-2">
            طلبكم محجوز — في انتظار تأكيدكم
          </h1>
          
          <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 font-medium text-sm bg-[#1A365D] px-6 py-2.5 rounded-full border border-[#FF6B35]/20">
            <Package className="w-4 h-4 text-[#FF6B35]" />
            <span>رقم الطلب:</span>
            {orderReference ? (
              <span className="font-bold text-[#FF6B35] tracking-wider" dir="ltr">ORD-{orderReference}</span>
            ) : (
              <span className="inline-block h-4 w-20 bg-[#2a2a2a] rounded align-middle animate-pulse" aria-hidden />
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl space-y-8 mt-8">
        
        {/* Order Summary Box */}
        <div className="bg-[#1A365D] rounded-3xl p-6 border border-[#FF6B35]/20 shadow-lg shadow-black/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent opacity-50"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#0B1B3D] p-2.5 rounded-xl text-[#FF6B35] border border-[#FF6B35]/20">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-black text-white text-xl">ملخص الطلبية</h3>
          </div>

          {lastOrder ? (
            <div className="space-y-4">
              {lastOrder.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-[#0B1B3D] last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#0B1B3D] rounded-xl relative overflow-hidden flex-shrink-0 border border-[#FF6B35]/20">
                      <Image src={item.product.image_url} alt={item.product.name_ar} fill className="object-contain p-2" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-200 text-sm">{item.product.name_ar}</h4>
                      <p className="text-xs text-gray-500 mt-1">الكمية: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="font-black text-[#FF6B35] text-lg">{item.bundlePrice * item.quantity}</span>
                    <span className="text-xs text-gray-500 mr-1">ر.س</span>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 mt-2">
                <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
                  <span>الشحن</span>
                  <span className="font-bold text-[#FF6B35] bg-[#FF6B35]/10 px-3 py-1 rounded-full text-xs">مجاني</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#0B1B3D]">
                  <span className="font-black text-white text-lg">الإجمالي</span>
                  <div className="text-left">
                    <span className="font-black text-2xl text-[#FF6B35]">{lastOrder.total}</span>
                    <span className="text-sm text-white mr-1 font-bold">ر.س</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 text-sm">
              جاري تحميل تفاصيل الطلب...
            </div>
          )}
        </div>
        
        {/* Call Details Box */}
        <div className="bg-[#1A365D] rounded-3xl p-6 border border-[#FF6B35]/20 shadow-lg shadow-black/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#0B1B3D] p-2.5 rounded-xl text-[#FF6B35] border border-[#FF6B35]/20">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-black text-white text-xl">ماذا بعد الطلب؟</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="text-[#FF6B35] mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                  <p className="text-gray-300 font-medium text-sm text-right">سنتصل بك قريباً لتأكيد تفاصيل العنوان.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-[#FF6B35] mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                  <p className="text-gray-300 font-medium text-sm text-right">في حال عدم الرد، سنحاول التواصل معك عبر الواتساب.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="text-[#FF6B35] mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                  <p className="text-gray-300 font-medium text-sm text-right">فريق خدمة العملاء جاهز للإجابة على استفساراتك.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-[#FF6B35] mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                  <p className="text-gray-300 font-medium text-sm text-right">الدفع يتم نقداً أو بالشبكة عند استلام الطلب.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Journey Timeline */}
        <div className="bg-[#1A365D] rounded-3xl p-6 border border-[#FF6B35]/20 shadow-lg shadow-black/50 overflow-hidden">
          <h3 className="font-black text-white text-xl text-right mb-8">رحلة طلبكم</h3>
          
          <div className="relative flex justify-between items-start">
            {/* Connecting Line */}
            <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-[#0B1B3D] -z-10"></div>
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-[#FF6B35] flex items-center justify-center mb-3 border-2 border-[#1A365D] shadow-[0_0_15px_rgba(255,107,53,0.4)]">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-black text-white text-sm mb-1">الآن</h4>
              <p className="text-xs text-gray-400 leading-relaxed">استلمنا طلبكم بنجاح</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-[#0B1B3D] flex items-center justify-center mb-3 border-2 border-[#FF6B35] shadow-[0_0_10px_rgba(255,107,53,0.2)]">
                <PhoneCall className="w-5 h-5 text-[#FF6B35]" />
              </div>
              <h4 className="font-black text-gray-200 text-sm mb-1">في أقرب وقت</h4>
              <p className="text-xs text-gray-400 leading-relaxed">مكالمة تأكيد سريعة</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-[#0B1B3D] flex items-center justify-center mb-3 border-2 border-[#1A365D]">
                <Package className="w-5 h-5 text-gray-500" />
              </div>
              <h4 className="font-black text-gray-400 text-sm mb-1">خلال 24 ساعة</h4>
              <p className="text-xs text-gray-500 leading-relaxed">تجهيز وشحن الطلب</p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-[#0B1B3D] flex items-center justify-center mb-3 border-2 border-[#1A365D]">
                <Truck className="w-5 h-5 text-gray-500" />
              </div>
              <h4 className="font-black text-gray-400 text-sm mb-1">خلال 1-3 أيام</h4>
              <p className="text-xs text-gray-500 leading-relaxed">يصلكم مع المندوب</p>
            </div>
          </div>
        </div>

      {/* Expected Results Box */}
        <div className="bg-[#1A365D] rounded-3xl p-6 border border-[#FF6B35]/20 shadow-lg shadow-black/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B35]/10 blur-[50px] rounded-full pointer-events-none"></div>
          
          <div className="flex items-center gap-2 mb-8 relative z-10">
            <Star className="w-6 h-6 text-[#FF6B35] fill-[#FF6B35]" />
            <h3 className="font-black text-white text-xl">
              تجربة صيد ممتعة مع 
              {lastOrder && lastOrder.items.length > 0 ? (
                <span className="text-[#FF6B35] mr-2">{lastOrder.items[0].product.name_ar}</span>
              ) : (
                <span className="text-[#FF6B35] mr-2">معدات حِداق الخليج</span>
              )}
            </h3>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1A365D] text-center relative z-10">
            <p className="text-sm text-[#FF6B35] italic font-medium">استعد لرحلة صيد لا تُنسى. معداتنا صُممت لتجعل كل لحظة في البحر أكثر متعة ونجاحاً.</p>
          </div>
        </div>

        {/* Preparation / Unboxing Box */}
        <div className="bg-[#1A365D] rounded-3xl p-6 border border-[#1A365D] shadow-lg shadow-black/50">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#0B1B3D] p-2.5 rounded-xl text-[#FF6B35] border border-[#FF6B35]/20">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="font-black text-white text-xl">استعدوا لاستلامه</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#0B1B3D] p-6 rounded-2xl border border-[#1A365D] text-center shadow-inner hover:border-[#FF6B35]/30 transition-colors">
              <div className="w-12 h-12 bg-[#1A365D] border border-[#FF6B35]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#FF6B35]">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="font-black text-gray-200 text-sm mb-2">تغليف آمن</h4>
              <p className="text-xs text-gray-400 leading-relaxed">تصلكم المعدات في تغليف محكم يضمن سلامتها أثناء الشحن.</p>
            </div>
            
            <div className="bg-[#0B1B3D] p-6 rounded-2xl border border-[#1A365D] text-center shadow-inner hover:border-[#FF6B35]/30 transition-colors">
              <div className="w-12 h-12 bg-[#1A365D] border border-[#FF6B35]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#FF6B35]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h4 className="font-black text-gray-200 text-sm mb-2">جاهزة للاستخدام</h4>
              <p className="text-xs text-gray-400 leading-relaxed">الحقيبة متكاملة وكل القطع متوافقة وجاهزة لرحلة الصيد القادمة.</p>
            </div>

            <div className="bg-[#0B1B3D] p-6 rounded-2xl border border-[#1A365D] text-center shadow-inner hover:border-[#FF6B35]/30 transition-colors">
              <div className="w-12 h-12 bg-[#1A365D] border border-[#FF6B35]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#FF6B35]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-black text-gray-200 text-sm mb-2">شاركونا صيدكم</h4>
              <p className="text-xs text-gray-400 leading-relaxed">ابعثوا لنا صور صيدكم بالمعدات الجديدة على الواتساب لنشاركها في صفحتنا.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Reviews Section */}
      <div className="mt-16 bg-[#0B1B3D] pt-8 pb-4 border-y border-[#1A365D]">
        <div className="dark-theme-override">
          <ReviewsSection isDark={true} />
        </div>
      </div>

      {/* Cross-sells Grid */}
      <div className="container mx-auto px-4 max-w-5xl mt-16 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-white">اكتشفوا بقية معداتنا</h2>
          <p className="text-gray-400 text-sm mt-3">إليكم منتجات تكمل رحلتكم (الشحن مجاني لطلبكم الحالي)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" dir="rtl">
          {crossSells.map((p) => (
            <div key={p.id} className="bg-[#1A365D] rounded-2xl p-5 border border-[#FF6B35]/20 shadow-lg shadow-black/50 flex flex-col items-center text-center hover:border-[#FF6B35]/50 hover:-translate-y-1 transition-all duration-300">
              <div className={`w-full h-40 rounded-xl bg-[#0B1B3D] border border-[#1A365D] flex items-center justify-center text-4xl mb-5 relative overflow-hidden group`}>
                <div className="absolute inset-0 opacity-10 flex items-center justify-center text-[#FF6B35]">{p.theme.icon}</div>
                <Image src={p.image_url} alt={p.name_ar} fill className="object-contain p-4 relative z-10 group-hover:scale-110 transition-transform duration-700" />
              </div>
              
              <div className="flex text-[#FF6B35] mb-3">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <h4 className="text-base font-bold text-white mb-2 line-clamp-1">{p.name_ar}</h4>
              <p className="text-xs text-gray-400 line-clamp-2 mb-6 h-8 leading-relaxed">{p.description_ar}</p>
              
              <div className="mt-auto w-full">
                <Link 
                  href={`/product/${p.slug}`}
                  className="w-full py-3 bg-[#FF6B35] text-white font-black rounded-xl hover:bg-[#E55A2B] transition-colors text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,107,53,0.3)]"
                >
                  عرض التفاصيل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 mb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="dark-theme-override">
            <FAQSection isDark={true} />
          </div>
        </div>
      </div>

      {/* Return to Home */}
      <div className="text-center mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6B35] hover:text-white transition-colors">
          <ArrowRight className="w-4 h-4" />
          العودة للمعدات
        </Link>
      </div>
      </div>

      {/* Trust Banner */}
      <div className="border-t border-[#1A365D] bg-[#0B1B3D] mt-auto">
        <div className="container mx-auto px-4 max-w-6xl py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" dir="rtl">
            
            <div className="bg-[#1A365D] border border-[#FF6B35]/20 rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right hover:border-[#FF6B35]/50 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#0B1B3D] border border-[#FF6B35]/20 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 md:w-6 md:h-6 text-[#FF6B35]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-200 text-xs md:text-sm mb-0.5 md:mb-1">شحن سريع داخل السعودية</h4>
                <p className="text-[10px] md:text-xs text-gray-400 leading-tight">توصيل من 1 إلى 3 أيام عمل لجميع المناطق</p>
              </div>
            </div>

            <div className="bg-[#1A365D] border border-[#FF6B35]/20 rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right hover:border-[#FF6B35]/50 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#0B1B3D] border border-[#FF6B35]/20 flex items-center justify-center shrink-0">
                <HandCoins className="w-5 h-5 md:w-6 md:h-6 text-[#FF6B35]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-200 text-xs md:text-sm mb-0.5 md:mb-1">الدفع عند الاستلام</h4>
                <p className="text-[10px] md:text-xs text-gray-400 leading-tight">ادفعوا بعد ما يوصلكم الطلب لباب البيت</p>
              </div>
            </div>

            <div className="bg-[#1A365D] border border-[#FF6B35]/20 rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right hover:border-[#FF6B35]/50 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#0B1B3D] border border-[#FF6B35]/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-[#FF6B35]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-200 text-xs md:text-sm mb-0.5 md:mb-1">ضمان استبدال</h4>
                <p className="text-[10px] md:text-xs text-gray-400 leading-tight">جودة مضمونة أو استبدال فوري</p>
              </div>
            </div>

            <div className="bg-[#1A365D] border border-[#FF6B35]/20 rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right hover:border-[#FF6B35]/50 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#0B1B3D] border border-[#FF6B35]/20 flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5 md:w-6 md:h-6 text-[#FF6B35]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-200 text-xs md:text-sm mb-0.5 md:mb-1">جودة عالية</h4>
                <p className="text-[10px] md:text-xs text-gray-400 leading-tight">معدات مصممة لتحمل ظروف الصيد</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
