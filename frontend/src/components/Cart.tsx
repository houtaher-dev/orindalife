"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/cartStore";
import { PRODUCTS, Product } from "@/lib/products";
import { X, Plus, Minus, ShoppingBag, ShieldCheck, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/client";
import { generateEventId } from "@/lib/tracking/pixels";

export function Cart() {
  const { 
    items, isOpen, setIsOpen, isCheckoutOpen, setCheckoutOpen, 
    removeItem, updateQuantity, getCartTotal, clearCart 
  } = useCartStore();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Upsell State
  const [upsellStep, setUpsellStep] = useState<0 | 1 | 2>(0);
  const [countdown, setCountdown] = useState(30);
  const [upsellProduct1, setUpsellProduct1] = useState<Product | null>(null);
  const [upsellProduct2, setUpsellProduct2] = useState<Product | null>(null);

  // Find cross-sells (products not in cart)
  const cartProductIds = items.map(item => item.product.id);
  const crossSells = PRODUCTS.filter(p => !cartProductIds.includes(p.id));

  useEffect(() => {
    if (!isCheckoutOpen) {
      setUpsellStep(0);
      setCountdown(30);
    }
  }, [isCheckoutOpen]);

  useEffect(() => {
    if (upsellStep === 0) return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // time ran out
      if (upsellStep === 1 || upsellStep === 2) {
        submitOrderFinal();
      }
    }
  }, [upsellStep, countdown]);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone.startsWith("0")) {
      alert("المرجو إدخال الاسم ورقم هاتف صحيح يبدأ بـ 0");
      return;
    }

    // Determine upsell products
    const inCartIds = items.map(i => i.product.id);
    const availableCrossSells = PRODUCTS.filter(p => !inCartIds.includes(p.id));
    
    // Fallback to random if all are in cart
    const p1 = availableCrossSells.length > 0 ? availableCrossSells[0] : PRODUCTS[0];
    const p2 = availableCrossSells.length > 1 ? availableCrossSells[1] : (availableCrossSells.length === 1 ? PRODUCTS.find(p => p.id !== p1.id)! : PRODUCTS[1]);
    
    setUpsellProduct1(p1);
    setUpsellProduct2(p2);
    setUpsellStep(1);
    setCountdown(30);
  };

  const submitOrderFinal = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const browserEventId = generateEventId();
      // Get LATEST state from Zustand to include accepted upsells
      const latestItems = useCartStore.getState().items;
      const latestTotal = useCartStore.getState().getCartTotal();

      const orderPayload = {
        customer_name: name,
        phone: phone,
        items: latestItems.map(item => {
          const unitPrice = item.bundlePrice / item.bundleQuantity;
          let bundleNameStr = "";
          if (item.isUpsell) {
             bundleNameStr = " (عرض خاص)";
          } else if (item.bundleQuantity > 1) {
             bundleNameStr = ` (${item.bundleQuantity} حبات)`;
          }
          
          return {
            product_id: item.product.id,
            product_slug: item.product.slug,
            product_name_ar: item.product.name_ar + bundleNameStr,
            quantity: item.quantity * item.bundleQuantity,
            unit_price: unitPrice,
            line_total: item.bundlePrice * item.quantity
          };
        }),
        subtotal: latestTotal,
        browser_event_id: browserEventId,
        user_agent: navigator.userAgent
      };

      await api.orders.create(orderPayload);

      // Save order details for Thank You page
      useCartStore.getState().setLastOrder({
        customerName: name,
        total: latestTotal,
        items: latestItems
      });

      clearCart();
      setCheckoutOpen(false);
      setIsOpen(false);
      setUpsellStep(0);
      router.push("/thank-you");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "حدث خطأ في الاتصال، المرجو المحاولة مرة أخرى");
      setUpsellStep(0); // return to checkout form on error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAcceptUpsell1 = () => {
    if (upsellProduct1) {
      useCartStore.getState().addItem(upsellProduct1, 1, 99, true);
    }
    setUpsellStep(2);
    setCountdown(30);
  };

  const handleDeclineUpsell1 = () => {
    submitOrderFinal();
  };

  const handleAcceptUpsell2 = () => {
    if (upsellProduct2) {
      useCartStore.getState().addItem(upsellProduct2, 1, 79, true);
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
      <div className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-white z-[60] shadow-2xl flex flex-col transform transition-transform duration-300 ${isCheckoutOpen ? 'translate-x-full md:translate-x-0 md:opacity-50 pointer-events-none' : 'translate-x-0'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            سلة المشتريات
          </h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
              <ShoppingBag className="w-16 h-16 text-gray-200" />
              <p>السلة فارغة حالياً</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-gray-100 text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 bg-gradient-to-tr ${item.product.theme.from} ${item.product.theme.to} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20 flex items-center justify-center">{item.product.theme.icon}</div>
                    <Image src={item.product.image_url} alt={item.product.name_ar} fill className="object-contain p-2 relative z-10" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900 line-clamp-1">{item.product.name_ar}</h4>
                        {item.bundleQuantity > 1 && (
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded mt-1 inline-block">
                            عرض {item.bundleQuantity} حبات
                          </span>
                        )}
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 mr-2">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-sm font-bold text-gray-900 mt-2">{item.bundlePrice} ر.ق</div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 text-gray-500 hover:text-gray-900">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 text-gray-500 hover:text-gray-900">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Cross-sells in Cart */}
              {crossSells.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-500 mb-4">أضف لروتينك (شحن مجاني):</h4>
                  <div className="space-y-4">
                    {crossSells.map(p => (
                      <div key={p.id} className="flex gap-3 items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0 bg-gradient-to-tr ${p.theme.from} ${p.theme.to} relative overflow-hidden`}>
                          <div className="absolute inset-0 opacity-20 flex items-center justify-center">{p.theme.icon}</div>
                          <Image src={p.image_url} alt={p.name_ar} fill className="object-contain p-1 relative z-10" />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-sm font-bold text-gray-900">{p.name_ar}</h5>
                          <div className="text-xs text-gray-500">{p.price} ر.ق</div>
                        </div>
                        <button 
                          onClick={() => useCartStore.getState().addItem(p, 1, p.price)}
                          className="p-2 bg-white border border-gray-200 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">المجموع (شحن مجاني)</span>
              <span className="text-2xl font-black text-gray-900">{getCartTotal()} ر.ق</span>
            </div>
            <button 
              onClick={() => setCheckoutOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
            >
              إتمام الطلب بأمان
              <ShieldCheck className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Checkout Popup Overlay */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setCheckoutOpen(false)} />
          
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 z-20">
              <div>
                <h3 className="text-xl font-black text-gray-900">
                  {upsellStep === 0 ? "أكّد طلبك الآن" : "عرض خاص لك!"}
                </h3>
                {upsellStep === 0 && (
                  <p className="text-sm text-gray-500 mt-1">لن تدفع شيء الآن. الدفع عند الاستلام.</p>
                )}
              </div>
              <button onClick={() => setCheckoutOpen(false)} className="p-2 bg-white hover:bg-gray-100 rounded-full transition-colors border border-gray-200">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            {upsellStep === 0 ? (
              <div className="p-6 overflow-y-auto flex-1">
                <div className="bg-green-50 text-green-800 p-3 rounded-xl text-sm font-medium flex items-center gap-2 mb-6 border border-green-100">
                  <CheckCircle2 className="w-5 h-5" />
                  شحن مجاني لطلبك ({getCartTotal()} ر.ق)
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف (قطر)</label>
                    <input 
                      type="tel" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white text-left"
                      placeholder="0XXXXXXXX"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-right">مثال: 033123456 (يبدأ بـ 0)</p>
                  </div>

                  <div className="pt-4 sticky bottom-0 bg-white pb-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-gray-900 text-white font-bold text-lg rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> جاري التحقق...</>
                      ) : (
                        <><CheckCircle2 className="w-5 h-5" /> أرسل الطلب للدفع عند الاستلام</>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-500 font-medium">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      معلوماتك آمنة ولن تشارك مع أي طرف
                    </div>
                  </div>
                </form>
              </div>
            ) : upsellStep === 1 && upsellProduct1 ? (
              <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center text-center">
                <div className="bg-green-50 text-green-800 px-4 py-1.5 rounded-full text-xs font-bold mb-5 border border-green-100 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  عرض خاص • مرة واحدة
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">
                  قبل ما نأكد طلبك... أضف روتين مكمل بـ 99 ريال فقط
                </h3>
                <p className="text-sm text-gray-500 mb-6 px-2 leading-relaxed">
                  لأنك اخترت روتينك الأساسي، نقدم لك إضافة واحدة بسعر خاص تظهر مرة واحدة قبل تأكيد الطلب.
                </p>

                <div className="bg-gray-50 p-4 rounded-2xl w-full mb-6 border border-gray-200 flex gap-4 items-center text-right shadow-inner">
                  <div className={`w-24 h-24 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-tr ${upsellProduct1.theme.from} ${upsellProduct1.theme.to} relative overflow-hidden shadow-sm`}>
                    <Image src={upsellProduct1.image_url} alt={upsellProduct1.name_ar} fill className="object-contain p-2 relative z-10" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1 leading-tight">{upsellProduct1.name_ar}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-snug">{upsellProduct1.description_ar}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-black text-primary">99 ر.ق</span>
                      <span className="text-xs text-gray-400 line-through decoration-gray-300">199 ر.ق</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm font-bold text-gray-500 mb-5 flex items-center justify-center gap-2 bg-gray-50 py-2 px-4 rounded-lg border border-gray-100 w-full">
                  ينتهي العرض خلال <span className="text-red-600 font-black text-lg w-6 inline-block text-center">{countdown}</span> ثانية
                </div>

                <button 
                  onClick={handleAcceptUpsell1}
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#134e4a] text-white font-bold text-lg rounded-xl hover:bg-[#0f3d3a] transition-all shadow-lg shadow-[#134e4a]/20 mb-4 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  أضفه لطلبي بـ 99 ريال
                </button>
                
                <button 
                  onClick={handleDeclineUpsell1}
                  disabled={isSubmitting}
                  className="text-sm text-gray-400 font-bold hover:text-gray-600 transition-colors"
                >
                  لا، أكمل طلبي بدون الإضافة
                </button>
              </div>
            ) : upsellStep === 2 && upsellProduct2 ? (
              <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center text-center">
                <div className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold mb-5 border border-red-100 flex items-center gap-1.5 animate-pulse">
                  <AlertCircle className="w-3.5 h-3.5" />
                  الفرصة الأخيرة!
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">
                  عرض إضافي استثنائي... بـ 79 ريال فقط!
                </h3>
                <p className="text-sm text-gray-500 mb-6 px-2 leading-relaxed">
                  أكمل مجموعتك بالكامل بأفضل سعر ممكن. هذا العرض لن يتكرر أبداً.
                </p>

                <div className="bg-gray-50 p-4 rounded-2xl w-full mb-6 border border-gray-200 flex gap-4 items-center text-right shadow-inner">
                  <div className={`w-24 h-24 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-tr ${upsellProduct2.theme.from} ${upsellProduct2.theme.to} relative overflow-hidden shadow-sm`}>
                    <Image src={upsellProduct2.image_url} alt={upsellProduct2.name_ar} fill className="object-contain p-2 relative z-10" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1 leading-tight">{upsellProduct2.name_ar}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-snug">{upsellProduct2.description_ar}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-black text-primary">79 ر.ق</span>
                      <span className="text-xs text-gray-400 line-through decoration-gray-300">199 ر.ق</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm font-bold text-gray-500 mb-5 flex items-center justify-center gap-2 bg-gray-50 py-2 px-4 rounded-lg border border-gray-100 w-full">
                  ينتهي العرض خلال <span className="text-red-600 font-black text-lg w-6 inline-block text-center">{countdown}</span> ثانية
                </div>

                <button 
                  onClick={handleAcceptUpsell2}
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#134e4a] text-white font-bold text-lg rounded-xl hover:bg-[#0f3d3a] transition-all shadow-lg shadow-[#134e4a]/20 mb-4 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  أضفه لطلبي بـ 79 ريال
                </button>
                
                <button 
                  onClick={handleDeclineUpsell2}
                  disabled={isSubmitting}
                  className="text-sm text-gray-400 font-bold hover:text-gray-600 transition-colors"
                >
                  لا، أكمل طلبي الآن
                </button>
              </div>
            ) : (
              <div className="p-6 flex flex-col items-center justify-center h-full text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                <p className="text-gray-500 font-bold">جاري تأكيد الطلب...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
