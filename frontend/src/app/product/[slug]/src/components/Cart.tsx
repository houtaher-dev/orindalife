"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/cartStore";
import { PRODUCTS } from "@/lib/products";
import { X, Plus, Minus, ShoppingBag, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
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

  // Find cross-sells (products not in cart)
  const cartProductIds = items.map(item => item.product.id);
  const crossSells = PRODUCTS.filter(p => !cartProductIds.includes(p.id));

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone.startsWith("0")) {
      alert("المرجو إدخال الاسم ورقم هاتف صحيح يبدأ بـ 0");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const browserEventId = generateEventId();
      const orderPayload = {
        customer_name: name,
        phone: phone,
        items: items.map(item => {
          // Calculate unit price per item in the bundle
          const unitPrice = item.bundlePrice / item.bundleQuantity;
          const bundleNameStr = item.bundleQuantity > 1 ? ` (${item.bundleQuantity} حبات)` : "";
          
          return {
            product_id: item.product.id,
            product_slug: item.product.slug,
            product_name_ar: item.product.name_ar + bundleNameStr,
            quantity: item.quantity * item.bundleQuantity, // Total items
            unit_price: unitPrice,
            line_total: item.bundlePrice * item.quantity // Total price for this line
          };
        }),
        subtotal: getCartTotal(),
        browser_event_id: browserEventId,
        user_agent: navigator.userAgent
      };

      await api.orders.create(orderPayload);

      clearCart();
      setCheckoutOpen(false);
      setIsOpen(false);
      router.push("/thank-you");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "حدث خطأ في الاتصال، المرجو المحاولة مرة أخرى");
    } finally {
      setIsSubmitting(false);
    }
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
                <h3 className="text-xl font-black text-gray-900">أكّد طلبك الآن</h3>
                <p className="text-sm text-gray-500 mt-1">لن تدفع شيء الآن. الدفع عند الاستلام.</p>
              </div>
              <button onClick={() => setCheckoutOpen(false)} className="p-2 bg-white hover:bg-gray-100 rounded-full transition-colors border border-gray-200">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
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
                      <><Loader2 className="w-5 h-5 animate-spin" /> جاري تأكيد الطلب...</>
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
          </div>
        </div>
      )}
    </>
  );
}
