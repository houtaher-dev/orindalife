"use client";

import React, { useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { Product } from "@/lib/products";
import { ShoppingBag, CheckCircle2 } from "lucide-react";

const BUNDLES = [
  { quantity: 1, title: "حقيبة واحدة", price: 169, label: "للتجربة" },
  { quantity: 2, title: "حقيبتين", price: 299, label: "الأكثر مبيعاً", highlight: true },
  { quantity: 3, title: "3 حقائب", price: 399, label: "الأفضل قيمة", highlight: true },
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
                ${isSelected ? 'border-[#FF6B35] bg-[#FF6B35]/5' : 'border-[#1A365D] hover:border-[#FF6B35]/30 bg-[#0B1B3D]'}
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${isSelected ? 'border-[#FF6B35]' : 'border-gray-500'}
                `}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />}
                </div>
                <div>
                  <div className="font-bold text-gray-200">{bundle.title}</div>
                  {bundle.label && (
                    <div className={`text-xs font-bold px-2 py-0.5 rounded mt-1 inline-block
                      ${bundle.highlight ? 'bg-[#FF6B35]/20 text-[#FF6B35]' : 'bg-[#1A365D] text-gray-400'}
                    `}>
                      {bundle.label}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-left">
                <div className="font-black text-xl text-[#FF6B35]">{bundle.price}</div>
                <div className="text-xs text-gray-500 font-medium">ريال سعودي</div>
              </div>
            </div>
          );
        })}
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-[#FF6B35] text-white font-black text-xl rounded-2xl hover:bg-[#E55A2B] transition-all shadow-[0_0_20px_rgba(255,107,53,0.3)] transform hover:scale-[1.02]"
      >
        <ShoppingBag className="w-6 h-6" />
        أكمل معداتك بـ {selectedBundle.price} ر.س
      </button>

      <div className="flex justify-center items-center gap-4 mt-4 text-xs font-bold text-gray-500">
        <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-[#FF6B35]" /> جودة عالية</span>
        <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-[#FF6B35]" /> الدفع عند الاستلام</span>
      </div>
    </div>
  );
}
