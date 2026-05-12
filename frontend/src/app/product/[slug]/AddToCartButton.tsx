"use client";

import React from "react";
import { useCartStore } from "@/lib/cartStore";
import { Product } from "@/lib/products";
import { ShoppingBag } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button 
      onClick={() => addItem(product)}
      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold text-lg rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
    >
      <ShoppingBag className="w-5 h-5" />
      أضف للسلة
    </button>
  );
}
