import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { ArrowLeft, Star } from "lucide-react";

export function ProductsSection() {
  return (
    <section id="products" className="py-12 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-[#D4AF37] uppercase mb-3">Our Formulations</h2>
          <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B8860B] mb-4">ثلاث منتجات. ثلاث مشاكل. حلّ سريري واحد.</h3>
          <p className="text-gray-400 text-lg">
            كل منتج من أوريندا تركيبة مستقلّة، بجرعات سريرية مدروسة. اختر المشكلة اللي تشغلك، أو ادمج الثلاث للروتين الكامل.
          </p>
        </div>

        {/* Grid 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-[#141414] rounded-[2rem] border border-[#333333] shadow-lg shadow-black/50 hover:border-[#D4AF37]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">
              
              {/* Product Image Area */}
              <Link href={`/product/${product.slug}`} className="relative block aspect-square bg-[#1a1a1a] p-8 border-b border-[#333333]">
                {product.badge_ar && (
                  <div className="absolute top-4 right-4 bg-[#0a0a0a]/90 backdrop-blur border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-sm">
                    {product.badge_ar}
                  </div>
                )}
                {/* Background Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-[0.05] group-hover:scale-110 transition-transform duration-700 text-[#D4AF37]">
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
                  <h3 className="text-2xl font-black text-gray-200 mb-3 line-clamp-2 leading-tight group-hover:text-[#D4AF37] transition-colors">
                    <Link href={`/product/${product.slug}`}>{product.name_ar}</Link>
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {product.description_ar}
                  </p>
                </div>

                <div className="flex text-[#D4AF37] mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-gray-500 text-xs ml-2 font-medium">(تقييمات مؤكدة)</span>
                </div>

                {/* Footer of Card */}
                <div className="mt-auto pt-6 border-t border-[#333333] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium">يبدأ من</span>
                    <span className="text-lg font-black text-[#D4AF37]">{product.price} ر.س</span>
                  </div>
                  <Link 
                    href={`/product/${product.slug}`}
                    className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#B8860B] group-hover:text-[#0a0a0a] transition-all shadow-[0_0_10px_rgba(212,175,55,0.1)]"
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
