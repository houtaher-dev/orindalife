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

  const crossSells = PRODUCTS.slice(0, 3);

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
      <div className="bg-[#0a0a0a] pt-16 pb-8 border-b border-[#D4AF37]/10 relative overflow-hidden">
        {/* Subtle gold glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-2xl text-center flex flex-col items-center relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-[#0a0a0a] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          {lastOrder && (
            <div className="flex items-center justify-center gap-2 mb-3 text-[#F3E5AB] font-bold tracking-wide">
              <span className="text-xl">✨</span>
              <span className="text-lg">شكراً {lastOrder.customerName.split(' ')[0]}</span>
            </div>
          )}

          <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B8860B] flex items-center justify-center gap-3 mb-2">
            طلبكم محجوز — في انتظار تأكيدكم
          </h1>
          
          <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 font-medium text-sm bg-[#141414] px-6 py-2.5 rounded-full border border-[#D4AF37]/20">
            <Package className="w-4 h-4 text-[#D4AF37]" />
            <span>رقم الطلب:</span>
            {orderReference ? (
              <span className="font-bold text-[#F3E5AB] tracking-wider" dir="ltr">ORD-{orderReference}</span>
            ) : (
              <span className="inline-block h-4 w-20 bg-[#2a2a2a] rounded align-middle animate-pulse" aria-hidden />
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl space-y-8 mt-8">
        
        {/* Order Summary Box */}
        <div className="bg-[#141414] rounded-3xl p-6 border border-[#D4AF37]/20 shadow-lg shadow-black/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#1a1a1a] p-2.5 rounded-xl text-[#D4AF37] border border-[#D4AF37]/10">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-black text-white text-xl">ملخص الطلبية</h3>
          </div>

          {lastOrder ? (
            <div className="space-y-4">
              {lastOrder.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-[#333333] last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#1a1a1a] rounded-xl relative overflow-hidden flex-shrink-0 border border-[#D4AF37]/10">
                      <Image src={item.product.image_url} alt={item.product.name_ar} fill className="object-contain p-2" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-200 text-sm">{item.product.name_ar}</h4>
                      <p className="text-xs text-gray-500 mt-1">الكمية: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="font-black text-[#D4AF37] text-lg">{item.bundlePrice * item.quantity}</span>
                    <span className="text-xs text-gray-500 mr-1">ر.ق</span>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 mt-2">
                <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
                  <span>الشحن</span>
                  <span className="font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full text-xs">مجاني</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#333333]">
                  <span className="font-black text-white text-lg">الإجمالي</span>
                  <div className="text-left">
                    <span className="font-black text-2xl text-[#D4AF37]">{lastOrder.total}</span>
                    <span className="text-sm text-[#F3E5AB] mr-1 font-bold">ر.ق</span>
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
        <div className="bg-[#141414] rounded-3xl p-6 border border-[#333333] shadow-lg shadow-black/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#1a1a1a] p-2.5 rounded-xl text-[#D4AF37] border border-[#D4AF37]/10">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-black text-white text-xl">وش يحصل في المكالمة؟</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="text-[#D4AF37] mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                  <p className="text-gray-300 font-medium text-sm text-right">أقل من دقيقتين — نأكد العنوان فقط.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-[#D4AF37] mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                  <p className="text-gray-300 font-medium text-sm text-right">لو لم تردوا، نحاول مرتين + رسالة واتساب. ما نلغي طلبكم بسهولة.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="text-[#D4AF37] mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                  <p className="text-gray-300 font-medium text-sm text-right">فريق متخصص يتكلم بهدوء.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-[#D4AF37] mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                  <p className="text-gray-300 font-medium text-sm text-right">ما نطلب بطاقة بنكية ولا تحويل — كاش/شبكة عند الاستلام.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Journey Timeline */}
        <div className="bg-[#141414] rounded-3xl p-6 border border-[#333333] shadow-lg shadow-black/50 overflow-hidden">
          <h3 className="font-black text-white text-xl text-right mb-8">رحلة طلبكم</h3>
          
          <div className="relative flex justify-between items-start">
            {/* Connecting Line */}
            <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-[#333333] -z-10"></div>
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center mb-3 border-2 border-[#141414] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                <CheckCircle2 className="w-5 h-5 text-[#0a0a0a]" />
              </div>
              <h4 className="font-black text-white text-sm mb-1">الآن</h4>
              <p className="text-xs text-gray-400 leading-relaxed">استلمنا طلبكم بنجاح</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-3 border-2 border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                <PhoneCall className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="font-black text-gray-200 text-sm mb-1">في أقرب وقت</h4>
              <p className="text-xs text-gray-500 leading-relaxed">مكالمة تأكيد سريعة (دقيقتين)</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-3 border-2 border-[#333333]">
                <Package className="w-5 h-5 text-gray-500" />
              </div>
              <h4 className="font-black text-gray-400 text-sm mb-1">خلال 24 ساعة</h4>
              <p className="text-xs text-gray-600 leading-relaxed">شحن من مستودعنا + رقم تتبع</p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center w-1/4">
              <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-3 border-2 border-[#333333]">
                <Truck className="w-5 h-5 text-gray-500" />
              </div>
              <h4 className="font-black text-gray-400 text-sm mb-1">خلال 2-4 أيام</h4>
              <p className="text-xs text-gray-600 leading-relaxed">يصلكم مع المندوب</p>
            </div>
          </div>
        </div>

        {/* Expected Results Box */}
        <div className="bg-[#141414] rounded-3xl p-6 border border-[#D4AF37]/20 shadow-lg shadow-black/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-[50px] rounded-full pointer-events-none"></div>
          
          <div className="flex items-center gap-2 mb-8 relative z-10">
            <Star className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]" />
            <h3 className="font-black text-white text-xl">
              نتيجتكم المتوقعة مع 
              {lastOrder && lastOrder.items.length > 0 ? (
                <span className="text-[#D4AF37] mr-2">{lastOrder.items[0].product.name_ar}</span>
              ) : (
                <span className="text-[#D4AF37] mr-2">روتين أوريندا</span>
              )}
            </h3>
          </div>

          <div className="space-y-8 relative before:absolute before:right-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#333333] z-10">
                {/* Stage 1 */}
                <div className="relative flex items-start gap-5">
                  <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-[#D4AF37] font-black flex items-center justify-center shrink-0 z-10 border-2 border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]">1</div>
                  <div className="text-right pt-1">
                    <h4 className="font-black text-[#F3E5AB] text-base mb-2">أول 7 أيام</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {lastOrder?.items[0]?.product.slug === 'peaceful-slumber-gummies' ? 
                        "الميلاتونين الطبيعي يبدأ في تنظيم ساعتك البيولوجية. الإحساس الأول: استرخاء أسرع قبل النوم، استيقاظ بنشاط ملحوظ في الصباح، وطاقة أعلى خلال اليوم بدون خمول." :
                       lastOrder?.items[0]?.product.slug === 'focus-pro-coffee' ?
                        "الـ L-Theanine يبدأ في تحييد آثار الكافيين السلبية. الإحساس الأول: طاقة صافية ومستدامة، تركيز حاد، واختفاء تام لرجفة القهوة أو التوتر المصاحب لها." :
                       lastOrder?.items[0]?.product.slug === 'anti-stress-calm-drops' ?
                        "مستخلص زهرة الآلام يبدأ في تهدئة الجهاز العصبي. الإحساس الأول: انخفاض ملحوظ في التوتر اليومي، هدوء داخلي، وقدرة أكبر على التعامل مع الضغوطات ببرود." :
                        "تبدأ المكونات الطبيعية في التراكم في جسمك. الإحساس الأول: راحة عامة، طاقة أفضل، وتحسن ملحوظ في روتينك اليومي."
                      }
                    </p>
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="relative flex items-start gap-5">
                  <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-[#D4AF37] font-black flex items-center justify-center shrink-0 z-10 border-2 border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]">2</div>
                  <div className="text-right pt-1">
                    <h4 className="font-black text-[#F3E5AB] text-base mb-2">الأسبوع الثاني</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {lastOrder?.items[0]?.product.slug === 'peaceful-slumber-gummies' ? 
                        "جودة النوم تتحسن بشكل واضح. الاستيقاظ المتكرر في الليل يقل تدريجياً، والمزاج يصبح أصفى وأهدأ. أول مرة تلاحظ فرق في تركيزك خلال النهار." :
                       lastOrder?.items[0]?.product.slug === 'focus-pro-coffee' ?
                        "فطر عرف الأسد يبدأ في تغذية خلايا الدماغ. الذاكرة تقوى وضبابية الدماغ تختفي. أول مرة تلاحظ قدرتك على إنجاز مهام معقدة بدون تشتت." :
                       lastOrder?.items[0]?.product.slug === 'anti-stress-calm-drops' ?
                        "مستويات الكورتيزول تتراجع بشكل واضح. القلق المستمر يقل، والمزاج يتحسن بشكل ملحوظ. تبدأ التعليقات: «أعصابك صارت أهدأ بكثير»." :
                        "النتائج تصبح أكثر وضوحاً. التوازن الداخلي يتحسن، والمزاج يصبح أصفى. أول مرة تلاحظ فرق حقيقي في نشاطك."
                      }
                    </p>
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="relative flex items-start gap-5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-[#0a0a0a] font-black flex items-center justify-center shrink-0 z-10 border-2 border-[#141414] shadow-[0_0_15px_rgba(212,175,55,0.4)]">3</div>
                  <div className="text-right pt-1">
                    <h4 className="font-black text-[#F3E5AB] text-base mb-2">نهاية العلبة الأولى</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {lastOrder?.items[0]?.product.slug === 'peaceful-slumber-gummies' ? 
                        "نوم عميق ومريح، دورة نوم منتظمة تخليك تستغني عن أي منومات. العلبة الثانية تثبّت هذه الساعة البيولوجية وتمنع رجوع الأرق." :
                       lastOrder?.items[0]?.product.slug === 'focus-pro-coffee' ?
                        "أداء ذهني عالي، إنتاجية مضاعفة، وطاقة مستقرة طول اليوم. العلبة الثانية تثبّت هذا النشاط الذهني وتمنع رجوع الخمول والتشتت." :
                       lastOrder?.items[0]?.product.slug === 'anti-stress-calm-drops' ?
                        "سلام داخلي، قدرة عالية على الاسترخاء، ونوم أفضل. العلبة الثانية تثبّت هذا التوازن العصبي وتمنع رجوع نوبات القلق والتوتر." :
                        "استقرار كامل في الروتين. صحة أفضل، طاقة مستدامة، ومزاج معتدل. العلبة الثانية تثبّت النتيجة وتمنع رجوعها."
                      }
                    </p>
                  </div>
                </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#333333] text-center relative z-10">
            <p className="text-sm text-[#D4AF37] italic font-medium">تخيلوا صورة أنفسكم بعد 30 يوم من الآن. هذا اللي تستحقونه — وهذا اللي بيوصلكم مع طلبكم.</p>
          </div>
        </div>

        {/* Preparation / Unboxing Box */}
        <div className="bg-[#141414] rounded-3xl p-6 border border-[#333333] shadow-lg shadow-black/50">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#1a1a1a] p-2.5 rounded-xl text-[#D4AF37] border border-[#D4AF37]/10">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="font-black text-white text-xl">استعدوا لاستلامه</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333333] text-center shadow-inner hover:border-[#D4AF37]/30 transition-colors">
              <div className="w-12 h-12 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="font-black text-gray-200 text-sm mb-2">تغليف ذهبي فاخر</h4>
              <p className="text-xs text-gray-400 leading-relaxed">يصلكم في علبة بتصميم apothecary مع بطاقة تعليمات شخصية بخط اليد.</p>
            </div>
            
            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333333] text-center shadow-inner hover:border-[#D4AF37]/30 transition-colors">
              <div className="w-12 h-12 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h4 className="font-black text-gray-200 text-sm mb-2">ابدأوا روتينكم الجديد</h4>
              <p className="text-xs text-gray-400 leading-relaxed">سواء كانت قهوة الصباح للتركيز، أو قطرات الهدوء خلال اليوم، أو علكات السبات قبل النوم — الالتزام هو سر النتيجة.</p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#333333] text-center shadow-inner hover:border-[#D4AF37]/30 transition-colors">
              <div className="w-12 h-12 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-black text-gray-200 text-sm mb-2">شاركونا أول صورة</h4>
              <p className="text-xs text-gray-400 leading-relaxed">ابعثوا لنا صورة الـ unboxing على واتساب — وستحصلون على هدية صغيرة مع طلبكم الجاي.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Reviews Section */}
      <div className="mt-16 bg-[#141414] pt-8 pb-4 border-y border-[#333333]">
        <div className="dark-theme-override">
          <ReviewsSection isDark={true} />
        </div>
      </div>

      {/* Cross-sells Grid */}
      <div className="container mx-auto px-4 max-w-5xl mt-16 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B8860B]">اكتشفوا بقية منتجاتنا</h2>
          <p className="text-gray-400 text-sm mt-3">إليكم منتجات تكمل روتينكم (الشحن مجاني لطلبكم الحالي)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" dir="rtl">
          {crossSells.map((p) => (
            <div key={p.id} className="bg-[#141414] rounded-2xl p-5 border border-[#333333] shadow-lg shadow-black/50 flex flex-col items-center text-center hover:border-[#D4AF37]/40 hover:-translate-y-1 transition-all duration-300">
              <div className={`w-full h-40 rounded-xl bg-[#1a1a1a] border border-[#333333] flex items-center justify-center text-4xl mb-5 relative overflow-hidden group`}>
                <div className="absolute inset-0 opacity-10 flex items-center justify-center text-[#D4AF37]">{p.theme.icon}</div>
                <Image src={p.image_url} alt={p.name_ar} fill className="object-contain p-4 relative z-10 group-hover:scale-110 transition-transform duration-700" />
              </div>
              
              <div className="flex text-[#D4AF37] mb-3">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <h4 className="text-base font-bold text-white mb-2 line-clamp-1">{p.name_ar}</h4>
              <p className="text-xs text-gray-400 line-clamp-2 mb-6 h-8 leading-relaxed">{p.description_ar}</p>
              
              <div className="mt-auto w-full">
                <Link 
                  href={`/product/${p.slug}`}
                  className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0a0a0a] font-black rounded-xl hover:opacity-90 transition-opacity text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
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
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#F3E5AB] transition-colors">
          <ArrowRight className="w-4 h-4" />
          العودة لمجموعة أوريندا
        </Link>
      </div>
      </div>

      {/* Trust Banner */}
      <div className="border-t border-[#333333] bg-[#0a0a0a] mt-auto">
        <div className="container mx-auto px-4 max-w-6xl py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" dir="rtl">
            
            <div className="bg-[#141414] border border-[#333333] rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right hover:border-[#D4AF37]/30 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-200 text-xs md:text-sm mb-0.5 md:mb-1">شحن سريع داخل قطر</h4>
                <p className="text-[10px] md:text-xs text-gray-500 leading-tight">توصيل من 1 إلى 3 أيام عمل لجميع المناطق</p>
              </div>
            </div>

            <div className="bg-[#141414] border border-[#333333] rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right hover:border-[#D4AF37]/30 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
                <HandCoins className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-200 text-xs md:text-sm mb-0.5 md:mb-1">الدفع عند الاستلام</h4>
                <p className="text-[10px] md:text-xs text-gray-500 leading-tight">ادفعوا بعد ما يوصلكم الطلب لباب البيت</p>
              </div>
            </div>

            <div className="bg-[#141414] border border-[#333333] rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right hover:border-[#D4AF37]/30 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-200 text-xs md:text-sm mb-0.5 md:mb-1">ضمان استرجاع 30 يوم</h4>
                <p className="text-[10px] md:text-xs text-gray-500 leading-tight">ما حسيتوا بفرق؟ نرجع لكم المبلغ كامل</p>
              </div>
            </div>

            <div className="bg-[#141414] border border-[#333333] rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right hover:border-[#D4AF37]/30 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#1a1a1a] border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-200 text-xs md:text-sm mb-0.5 md:mb-1">مرخّص من SFDA • حلال 100%</h4>
                <p className="text-[10px] md:text-xs text-gray-500 leading-tight">تركيبات مفحوصة من هيئة الغذاء والدواء</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
