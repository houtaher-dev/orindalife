import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { ArrowLeft, Star } from "lucide-react";

export function ProductsSection() {
  return (
    <section id="products" className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-3">Our Formulations</h2>
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">ثلاث منتجات. ثلاث مشاكل. حلّ سريري واحد.</h3>
          <p className="text-gray-600 text-lg">
            كل منتج من أوريندا تركيبة مستقلّة، بجرعات سريرية مدروسة. اختر المشكلة اللي تشغلك، أو ادمج الثلاث للروتين الكامل.
          </p>
        </div>

        {/* Grid 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
              
              {/* Product Image Area */}
              <Link href={`/product/${product.slug}`} className="relative block aspect-square bg-gradient-to-tr from-gray-50 to-gray-100 p-8">
                {product.badge_ar && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-sm">
                    {product.badge_ar}
                  </div>
                )}
                {/* Background Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                  {product.theme.icon}
                </div>
                <Image 
                  src={product.image_url} 
                  alt={product.name_ar}
                  fill
                  className="object-contain p-6 sm:p-10 group-hover:scale-105 transition-transform duration-700 relative z-10"
                />
              </Link>

              {/* Product Info Area */}
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-4">
                  <div className="text-xs font-bold tracking-wider mb-2" style={{color: product.theme.accent}}>{product.tagline_ar}</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3 line-clamp-2 leading-tight hover:text-[#134e4a] transition-colors">
                    <Link href={`/product/${product.slug}`}>{product.name_ar}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {product.description_ar}
                  </p>
                </div>

                <div className="flex text-[#d4af37] mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-gray-400 text-xs ml-2 font-medium">(تقييمات مؤكدة)</span>
                </div>

                {/* Footer of Card */}
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium">يبدأ من</span>
                    <span className="text-lg font-black text-gray-900">{product.price} ر.ق</span>
                  </div>
                  <Link 
                    href={`/product/${product.slug}`}
                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-[#134e4a] group-hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
