"use client";

import React, { useMemo, useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { Product } from "@/lib/products";
import { BagCount, bagLabel, priceForBags } from "@/lib/pricing";
import { ShoppingBag, CheckCircle2 } from "lucide-react";

const TIERS: { quantity: BagCount; title: string; label?: string; highlight?: boolean }[] = [
  { quantity: 1, title: "حقيبة واحدة", label: "للتجربة" },
  { quantity: 2, title: "حقيبتان", label: "الأكثر طلباً", highlight: true },
  { quantity: 3, title: "3 حقائب", label: "أفضل قيمة", highlight: true },
];

export function ProductOptions({
  product,
  initialBags = 1,
}: {
  product: Product;
  initialBags?: BagCount;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const bundles = useMemo(
    () =>
      TIERS.map((tier) => ({
        ...tier,
        price: priceForBags(product.slug, product.price, tier.quantity),
      })),
    [product.price, product.slug]
  );
  const [selectedBundle, setSelectedBundle] = useState(
    () => bundles.find((bundle) => bundle.quantity === initialBags) ?? bundles[0]
  );

  return (
    <div className="mt-8" id="product-options">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-400 font-bold">اختر عدد الحقائب:</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">العرض لحقائب من نفس المقاس.</p>

      <div className="space-y-3 mb-6" role="radiogroup" aria-label="عدد الحقائب">
        {bundles.map((bundle) => {
          const isSelected = selectedBundle.quantity === bundle.quantity;
          return (
            <button
              key={bundle.quantity}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelectedBundle(bundle)}
              className={`relative w-full border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-center justify-between text-right
                ${isSelected ? "border-[#FF6B35] bg-[#FF6B35]/5" : "border-[#1A365D] hover:border-[#FF6B35]/30 bg-[#0B1B3D]"}
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${isSelected ? "border-[#FF6B35]" : "border-gray-500"}
                `}
                >
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />}
                </div>
                <div>
                  <div className="font-bold text-gray-200">{bundle.title}</div>
                  {bundle.label && (
                    <div
                      className={`text-xs font-bold px-2 py-0.5 rounded mt-1 inline-block
                      ${bundle.highlight ? "bg-[#FF6B35]/20 text-[#FF6B35]" : "bg-[#1A365D] text-gray-400"}
                    `}
                    >
                      {bundle.label}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-left">
                <div className="font-black text-xl text-[#FF6B35]">{bundle.price}</div>
                <div className="text-xs text-gray-500 font-medium">ريال سعودي</div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => addItem(product, selectedBundle.quantity, selectedBundle.price)}
        className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-[#FF6B35] text-white font-black text-xl rounded-2xl hover:bg-[#E55A2B] transition-all shadow-[0_0_20px_rgba(255,107,53,0.3)] transform hover:scale-[1.02]"
      >
        <ShoppingBag className="w-6 h-6" />
        أضف {selectedBundle.quantity === 2 ? "حقيبتين" : bagLabel(selectedBundle.quantity)} بـ {selectedBundle.price} ر.س
      </button>

      <div className="flex justify-center items-center gap-4 mt-4 text-xs font-bold text-gray-500">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-[#FF6B35]" /> صناعة كورية
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-[#FF6B35]" /> الدفع عند الاستلام
        </span>
      </div>
    </div>
  );
}
