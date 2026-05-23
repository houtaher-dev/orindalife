"use client";

import React, { useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { Product } from "@/lib/products";
import { ShoppingBag, CheckCircle2 } from "lucide-react";

const BUNDLES = [
  { quantity: 1, title: "حبة واحدة", price: 199, label: "للتجربة" },
  { quantity: 2, title: "حبتين - كورس لشهرين", price: 279, label: "الأكثر مبيعاً", highlight: true },
  { quantity: 5, title: "5 حبات - كورس 5 شهور", price: 349, label: "الأفضل قيمة", highlight: true },
];

export function ProductOptions({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedBundle, setSelectedBundle] = useState(BUNDLES[1]); // Default to 2 items

  const handleAddToCart = () => {
    addItem(product, selectedBundle.quantity, selectedBundle.price);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-400 font-bold">اختر العرض:</span>
      </div>

      <div className="space-y-3 mb-6">
        {BUNDLES.map((bundle, index) => {
          const isSelected = selectedBundle.quantity === bundle.quantity;
          return (
            <div 
              key={index}
              onClick={() => setSelectedBundle(bundle)}
              className={`relative border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-center justify-between
                ${isSelected ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-[#333333] hover:border-[#D4AF37]/30 bg-[#141414]'}
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${isSelected ? 'border-[#D4AF37]' : 'border-gray-500'}
                `}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />}
                </div>
                <div>
                  <div className="font-bold text-gray-200">{bundle.title}</div>
                  {bundle.label && (
                    <div className={`text-xs font-bold px-2 py-0.5 rounded mt-1 inline-block
                      ${bundle.highlight ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-[#333333] text-gray-400'}
                    `}>
                      {bundle.label}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-left">
                <div className="font-black text-xl text-[#D4AF37]">{bundle.price}</div>
                <div className="text-xs text-gray-500 font-medium">ريال قطري</div>
              </div>
            </div>
          );
        })}
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0a0a0a] font-black text-xl rounded-2xl hover:opacity-90 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] transform hover:scale-[1.02]"
      >
        <ShoppingBag className="w-6 h-6" />
        أكمل روتينك بـ {selectedBundle.price} ر.ق
      </button>

      <div className="flex justify-center items-center gap-4 mt-4 text-xs font-bold text-gray-500">
        <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> مرخص من هيئة الغذاء والدواء</span>
        <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> الدفع عند الاستلام</span>
      </div>
    </div>
  );
}
