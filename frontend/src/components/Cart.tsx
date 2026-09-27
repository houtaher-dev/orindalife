"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/cartStore";
import { PRODUCTS, Product } from "@/lib/products";
import { X, Plus, Minus, ShoppingBag, ShieldCheck, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { generateEventId, trackInitiateCheckout } from "@/lib/tracking/pixels";
import { normalizeSaudiPhone } from "@/lib/phone";
import { bagLabel, packLabel } from "@/lib/pricing";

export function Cart() {
  const { 
    items, isOpen, setIsOpen, isCheckoutOpen, setCheckoutOpen, 
    removeItem, updateQuantity, getCartTotal, clearCart 
  } = useCartStore();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [upsellStep, setUpsellStep] = useState<0 | 1 | 2>(0);
  const [upsellProduct1, setUpsellProduct1] = useState<Product | null>(null);
  const [upsellProduct2, setUpsellProduct2] = useState<Product | null>(null);
  const [catalog, setCatalog] = useState<Product[]>(PRODUCTS);
  const checkoutTracked = useRef(false);

  const cartProductIds = items.map(item => item.product.id);
  const upsellProducts = catalog.filter(p => p.is_upsell);
  const crossSells = upsellProducts.filter(p => !cartProductIds.includes(p.id));

  useEffect(() => {
    fetch("/api/products")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setCatalog(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!isCheckoutOpen) {
      setUpsellStep(0);
      checkoutTracked.current = false;
      return;
    }
    if (checkoutTracked.current || items.length === 0) return;
    checkoutTracked.current = true;
    const numItems = items.reduce((sum, item) => sum + item.quantity * item.bundleQuantity, 0);
    trackInitiateCheckout(getCartTotal(), numItems);
  }, [isCheckoutOpen, items, getCartTotal]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedPhone = normalizeSaudiPhone(phone);
    if (name.trim().length < 2 || !normalizedPhone) {
      setFormError("أدخل الاسم ورقم جوال سعودي مثل 05XXXXXXXX أو +9665XXXXXXXX");
      return;
    }
    setPhone(normalizedPhone);
    setFormError("");

    if (crossSells.length > 0) {
      setUpsellProduct1(crossSells[0]);
      if (crossSells.length > 1) {
        setUpsellProduct2(crossSells[1]);
      }
      setUpsellStep(1);
    } else {
      submitOrderFinal();
    }
  };

  const submitOrderFinal = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const browserEventId = generateEventId();
      const latestItems = useCartStore.getState().items;
      const latestTotal = useCartStore.getState().getCartTotal();

      const normalizedPhone = normalizeSaudiPhone(phone);
      if (!normalizedPhone) {
        setFormError("أدخل رقم جوال سعودي مثل 05XXXXXXXX");
        setUpsellStep(0);
        setIsSubmitting(false);
        return;
      }

      const orderPayload = {
        customer_name: name.trim(),
        phone: normalizedPhone,
        items: latestItems.map(item => {
          const totalBags = item.quantity * item.bundleQuantity;
          const unitPrice = item.isUpsell ? item.bundlePrice : item.bundlePrice / item.bundleQuantity;
          const bundleNameStr = item.isUpsell
            ? " (منتج إضافي)"
            : item.quantity > 1
              ? ` — ${packLabel(item.quantity)} × ${bagLabel(item.bundleQuantity)} = ${bagLabel(totalBags)}`
              : ` — ${bagLabel(totalBags)}`;

          return {
            product_id: item.product.id,
            product_slug: item.product.slug,
            product_name_ar: item.product.name_ar + bundleNameStr,
            quantity: item.isUpsell ? item.quantity : totalBags,
            pack_count: item.quantity,
            bags_per_pack: item.isUpsell ? 1 : item.bundleQuantity,
            unit_price: unitPrice,
            line_total: item.bundlePrice * item.quantity,
          };
        }),
        subtotal: latestTotal,
        browser_event_id: browserEventId,
        user_agent: navigator.userAgent,
      };

      useCartStore.getState().setOrderSubmitError(null);

      let orderNumber: string | undefined;
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.detail || "تعذر حفظ الطلب");
        }
        const data = await res.json();
        orderNumber = data.order_number;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "تعذر حفظ الطلب. البيانات ما زالت هنا، أعد المحاولة.";
        setFormError(msg);
        setUpsellStep(0);
        return;
      }

      if (!orderNumber) {
        setFormError("لم يُحفظ الطلب. البيانات ما زالت هنا، أعد المحاولة.");
        setUpsellStep(0);
        return;
      }

      useCartStore.getState().setLastOrder({
        customerName: name.trim(),
        phone: normalizedPhone,
        total: latestTotal,
        items: latestItems,
        orderNumber,
      });

      router.push("/thank-you");

      setTimeout(() => {
        clearCart();
        setCheckoutOpen(false);
        setIsOpen(false);
        setFormError("");
      }, 50);
      
    } finally {
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  const handleAcceptUpsell1 = () => {
    if (upsellProduct1) {
      useCartStore.getState().addItem(upsellProduct1, 1, upsellProduct1.price, true);
    }
    setUpsellStep(2);
  };

  const handleDeclineUpsell1 = () => {
    submitOrderFinal();
  };

  const handleAcceptUpsell2 = () => {
    if (upsellProduct2) {
      useCartStore.getState().addItem(upsellProduct2, 1, upsellProduct2.price, true);
    }
    submitOrderFinal();
  };

  const handleDeclineUpsell2 = () => {
    submitOrderFinal();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => { setIsOpen(false); setCheckoutOpen(false); }}
      />

      {/* Cart Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-[#0B1B3D] z-[60] shadow-2xl shadow-black flex flex-col transform transition-transform duration-300 ${isCheckoutOpen ? 'translate-x-full md:translate-x-0 md:opacity-50 pointer-events-none' : 'translate-x-0'}`}>
        
        <div className="flex items-center justify-between p-6 border-b border-[#1A365D]">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FF6B35]" />
            سلة المشتريات
          </h2>
          <button type="button" onClick={() => setIsOpen(false)} className="p-2 hover:bg-[#1A365D] rounded-full transition-colors" aria-label="إغلاق السلة">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
              <ShoppingBag className="w-16 h-16 text-[#1A365D]" />
              <p>السلة فارغة حالياً</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-[#1A365D] text-[#FF6B35] border border-[#FF6B35]/20 font-bold rounded-lg hover:bg-[#1A365D]/80 transition-colors"
              >
                تصفح المعدات
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 bg-[#1A365D] border border-[#FF6B35]/20 relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10 flex items-center justify-center text-[#FF6B35]">{item.product.theme.icon}</div>
                    <Image src={item.product.image_url} alt={item.product.name_ar} fill className="object-contain p-2 relative z-10" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-200 line-clamp-1">{item.product.name_ar}</h4>
                        {!item.isUpsell && (
                          <span className="text-xs font-bold text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 rounded mt-1 inline-block">
                            {item.quantity > 1
                              ? `${packLabel(item.quantity)} × ${bagLabel(item.bundleQuantity)} = ${bagLabel(item.quantity * item.bundleQuantity)}`
                              : bagLabel(item.bundleQuantity)}
                          </span>
                        )}
                      </div>
                      <button type="button" onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-500 mr-2" aria-label={`حذف ${item.product.name_ar}`}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-sm font-bold text-[#FF6B35] mt-2">{item.bundlePrice * item.quantity} ر.س</div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center bg-[#1A365D] rounded-lg border border-[#FF6B35]/20">
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 text-gray-400 hover:text-white" aria-label={`إنقاص عدد باقات ${item.product.name_ar}`}>
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-sm text-gray-200">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 text-gray-400 hover:text-white" aria-label={`زيادة عدد باقات ${item.product.name_ar}`}>
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-[#1A365D] bg-[#0B1B3D]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 font-medium">المجموع (شحن مجاني)</span>
              <span className="text-2xl font-black text-[#FF6B35]">{getCartTotal()} ر.س</span>
            </div>
            <button 
              onClick={() => setCheckoutOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6B35] text-white font-black text-lg rounded-xl hover:bg-[#E55A2B] transition-colors shadow-[0_0_15px_rgba(255,107,53,0.3)]"
            >
              إتمام الطلب بأمان
              <ShieldCheck className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-[#0B1B3D]/80 backdrop-blur-sm" onClick={() => !isSubmitting && setCheckoutOpen(false)} />
          
          <div className="bg-[#1A365D] w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-black relative z-10 overflow-hidden flex flex-col max-h-[92dvh] border border-[#FF6B35]/20">
            <div className="bg-[#0B1B3D] p-6 border-b border-[#FF6B35]/20 flex justify-between items-center sticky top-0 z-20">
              <div>
                <h3 className="text-xl font-black text-white">
                  {upsellStep === 0 ? "أكّد طلبك الآن" : "عرض خاص لك!"}
                </h3>
                {upsellStep === 0 && (
                  <p className="text-sm text-[#FF6B35] mt-1">لن تدفع شيء الآن. الدفع عند الاستلام.</p>
                )}
              </div>
              <button type="button" onClick={() => setCheckoutOpen(false)} className="p-2 bg-[#1A365D] hover:bg-[#0B1B3D] rounded-full transition-colors border border-[#FF6B35]/20" aria-label="إغلاق نموذج الطلب" disabled={isSubmitting}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {upsellStep === 0 ? (
              <div className="p-6 overflow-y-auto flex-1">
                <div className="bg-[#0B1B3D] text-[#FF6B35] p-3 rounded-xl text-sm font-medium flex items-center gap-2 mb-6 border border-[#FF6B35]/20 shadow-[0_0_10px_rgba(255,107,53,0.1)]">
                  <CheckCircle2 className="w-5 h-5" />
                  شحن مجاني لطلبك ({getCartTotal()} ر.س)
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                  <div className="bg-[#0B1B3D] rounded-2xl p-4 border border-[#FF6B35]/20 space-y-2 text-sm">
                    <p className="font-black text-white">ملخص الطلب قبل التأكيد</p>
                    {items.map((item) => {
                      const totalBags = item.quantity * item.bundleQuantity;
                      return (
                        <div key={item.id} className="flex justify-between gap-3 text-gray-300">
                          <span>
                            {item.product.name_ar}
                            {item.isUpsell
                              ? " — منتج إضافي"
                              : item.quantity > 1
                                ? ` — ${packLabel(item.quantity)} × ${bagLabel(item.bundleQuantity)} = ${bagLabel(totalBags)}`
                                : ` — ${bagLabel(totalBags)}`}
                          </span>
                          <span className="font-bold text-[#FF6B35] whitespace-nowrap">{item.bundlePrice * item.quantity} ر.س</span>
                        </div>
                      );
                    })}
                    <div className="flex justify-between text-gray-400 pt-2 border-t border-[#1A365D]">
                      <span>سعر المنتجات</span>
                      <span>{getCartTotal()} ر.س</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>الشحن داخل السعودية</span>
                      <span>مجاني</span>
                    </div>
                    <div className="flex justify-between font-black text-white">
                      <span>الإجمالي</span>
                      <span>{getCartTotal()} ر.س</span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="customer-name" className="block text-sm font-bold text-gray-300 mb-2">الاسم الكامل</label>
                    <input 
                      id="customer-name"
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className="w-full px-4 py-3 rounded-xl border border-[#1A365D] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none transition-all bg-[#0B1B3D] text-white placeholder-gray-600"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="customer-phone" className="block text-sm font-bold text-gray-300 mb-2">رقم الجوال (السعودية)</label>
                    <input 
                      id="customer-phone"
                      type="tel" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      dir="ltr"
                      inputMode="tel"
                      autoComplete="tel"
                      className="w-full px-4 py-3 rounded-xl border border-[#1A365D] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none transition-all bg-[#0B1B3D] text-white placeholder-gray-600 text-left"
                      placeholder="05XXXXXXXX"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-right">مثال: 0551234567 أو +966551234567</p>
                  </div>
                  {formError && (
                    <p className="text-sm text-red-300 bg-red-950/40 border border-red-900/50 rounded-xl p-3" role="alert">{formError}</p>
                  )}

                  <div className="pt-4 sticky bottom-0 bg-[#1A365D] pb-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-[#FF6B35] text-white font-black text-lg rounded-xl hover:bg-[#E55A2B] transition-colors shadow-[0_0_15px_rgba(255,107,53,0.3)] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> جاري التحقق...</>
                      ) : (
                        <><CheckCircle2 className="w-5 h-5" /> أرسل الطلب للدفع عند الاستلام</>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-[#FF6B35]/80 font-medium">
                      <ShieldCheck className="w-4 h-4 text-[#FF6B35]" />
                      الدفع عند الاستلام. لا نطلب بيانات البطاقة في هذا النموذج.
                    </div>
                  </div>
                </form>
              </div>
            ) : upsellStep === 1 && upsellProduct1 ? (
              <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center text-center">
                <div className="bg-[#0B1B3D] text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold mb-5 border border-[#FF6B35]/20 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  إضافة اختيارية
                </div>
                <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                  لا تضيّع سمكتك الكبيرة بسبب خيط ضعيف!
                </h3>
                <p className="text-sm text-gray-400 mb-6 px-2 leading-relaxed">
                  خيط <span className="text-white font-bold">Daiwa Triforce</span> صناعة يابانية أصلية 100% — ما ينقطع حتى مع أقوى السحبات. مقاوم للمياه المالحة والاحتكاك بالصخور. الصيادين المحترفين في الخليج يعتمدون عليه لأنه يتحمل اللي غيره ما يتحمل.
                </p>

                <div className="bg-[#0B1B3D] p-4 rounded-2xl w-full mb-6 border border-[#1A365D] flex gap-4 items-center text-right shadow-inner">
                  <div className="w-24 h-24 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#1A365D] border border-[#FF6B35]/20 relative overflow-hidden shadow-sm">
                    <Image src={upsellProduct1.image_url} alt={upsellProduct1.name_ar} fill className="object-contain p-2 relative z-10" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-200 mb-1 leading-tight">خيط دايوى ترايفورس 0.35mm</h4>
                    <p className="text-xs text-gray-400 leading-snug">صناعة يابانية • 270 متر • نايلون مقاوم للتآكل</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-black text-[#FF6B35]">{upsellProduct1.price} ر.س</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleAcceptUpsell1}
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#FF6B35] text-white font-black text-lg rounded-xl hover:bg-[#E55A2B] transition-all shadow-[0_0_15px_rgba(255,107,53,0.3)] mb-4 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  نعم، أضف الخيط لطلبي بـ {upsellProduct1.price} ريال
                </button>
                
                <button 
                  onClick={handleDeclineUpsell1}
                  disabled={isSubmitting}
                  className="text-sm text-gray-500 font-bold hover:text-gray-300 transition-colors"
                >
                  لا شكراً، أكمل بدون خيط إضافي
                </button>
              </div>
            ) : upsellStep === 2 && upsellProduct2 ? (
              <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center text-center">
                <div className="bg-[#0B1B3D] text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold mb-5 border border-[#FF6B35]/20 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  إضافة اختيارية
                </div>
                <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                  بدون طعوم صح... ما راح تصيد شي!
                </h3>
                <p className="text-sm text-gray-400 mb-6 px-2 leading-relaxed">
                  <span className="text-white font-bold">5 طعوم معدنية</span> بألوان مجربة تحاكي حركة السمك الطبيعية — تجذب الهامور والشعري والقابط. وزن مثالي 13.5 جرام للرمي البعيد والغطس السريع. الصيادين اللي يستخدمونها يصيدون الضعف!
                </p>

                <div className="bg-[#0B1B3D] p-4 rounded-2xl w-full mb-6 border border-[#1A365D] flex gap-4 items-center text-right shadow-inner">
                  <div className="w-24 h-24 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#1A365D] border border-[#FF6B35]/20 relative overflow-hidden shadow-sm">
                    <Image src={upsellProduct2.image_url} alt={upsellProduct2.name_ar} fill className="object-contain p-2 relative z-10" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-200 mb-1 leading-tight">مجموعة طعوم معدنية (5 قطع)</h4>
                    <p className="text-xs text-gray-400 leading-snug">5 ألوان مختلفة • 13.5 جرام • جذب فعّال</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-black text-[#FF6B35]">{upsellProduct2.price} ر.س</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleAcceptUpsell2}
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#FF6B35] text-white font-black text-lg rounded-xl hover:bg-[#E55A2B] transition-all shadow-[0_0_15px_rgba(255,107,53,0.3)] mb-4 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  نعم، أضف الطعوم لطلبي بـ {upsellProduct2.price} ريال
                </button>
                
                <button 
                  onClick={handleDeclineUpsell2}
                  disabled={isSubmitting}
                  className="text-sm text-gray-500 font-bold hover:text-gray-300 transition-colors"
                >
                  لا شكراً، أكمل طلبي الآن
                </button>
              </div>
            ) : (
              <div className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#FF6B35] mb-4" />
                <p className="text-gray-400 font-bold">جاري تأكيد الطلب...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
