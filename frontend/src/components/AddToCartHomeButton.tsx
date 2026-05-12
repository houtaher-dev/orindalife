"use client";

import React from "react";
import { useCartStore } from "@/lib/cartStore";
import { Product } from "@/lib/products";
import { ShoppingBag } from "lucide-react";

export function AddToCartHomeButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button 
      onClick={() => addItem(product)}
      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
    >
      <ShoppingBag className="w-5 h-5" />
      أضف للسلة
    </button>
  );
}
