import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { Check, ShieldCheck, Truck } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const crossSells = PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Product Main Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-24 bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          
          {/* Image */}
          <div className={`aspect-square md:aspect-[4/3] rounded-2xl bg-gradient-to-tr ${product.theme.from} ${product.theme.to} relative overflow-hidden flex items-center justify-center`}>
            {product.badge_ar && (
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full z-10">
                {product.badge_ar}
              </div>
            )}
            <div className="text-8xl opacity-20">
              {product.theme.icon}
            </div>
            <Image 
              src={product.image_url} 
              alt={product.name_ar}
              fill
              className="object-contain p-8 relative z-10"
            />
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">مرخّص ومطابق للمواصفات</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{product.name_ar}</h1>
              <p className="text-xl text-gray-500 font-medium" style={{color: product.theme.accent}}>{product.tagline_ar}</p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed border-b border-gray-100 pb-8">
              {product.description_ar}
            </p>

            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">المكونات الأساسية:</h3>
              <ul className="space-y-4">
                {product.ingredients.map((ing, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4" style={{color: product.theme.accent}} />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">{ing.name_ar}</span>
                      <span className="text-gray-600 text-sm">{ing.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-8">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-gray-500 text-sm block mb-1">السعر</span>
                  <div className="text-3xl font-black text-gray-900">{product.price} <span className="text-lg text-gray-500 font-medium">ريال قطري</span></div>
                </div>
                <div className="text-left">
                  <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded">شحن مجاني</span>
                </div>
              </div>
              
              <AddToCartButton product={product} />

              <div className="flex items-center justify-center gap-6 mt-6 text-sm font-medium text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  توصيل 1-3 أيام
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  ضمان 30 يوم
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-sells Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900">يكتمل الروتين مع...</h2>
            <p className="text-gray-600 mt-3">أضف هذه المنتجات لنتائج أسرع وتوازن مثالي.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {crossSells.map((p) => (
              <Link href={`/product/${p.slug}`} key={p.id} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-6">
                <div className={`w-32 h-32 rounded-2xl bg-gradient-to-tr ${p.theme.from} ${p.theme.to} flex items-center justify-center text-4xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 flex items-center justify-center">{p.theme.icon}</div>
                  <Image src={p.image_url} alt={p.name_ar} fill className="object-contain p-2 relative z-10" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{p.name_ar}</h4>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{p.description_ar}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{p.price} ر.ق</span>
                    <span className="text-sm font-bold flex items-center gap-1 group-hover:underline" style={{color: p.theme.accent}}>
                      عرض المنتج
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
