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
          <h2 className="text-sm font-bold tracking-widest text-[#FF6B35] uppercase mb-3">Our Equipment</h2>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">معدات الصيد الاحترافية</h3>
          <p className="text-gray-400 text-lg">
            اختر المقاس المناسب لاحتياجاتك. جميع الحقائب تأتي متكاملة وجاهزة للاستخدام الفوري.
          </p>
        </div>

        {/* Grid 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-[#1A365D] rounded-[2rem] border border-[#FF6B35]/20 shadow-lg shadow-black/50 hover:border-[#FF6B35]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">
              
              {/* Product Image Area */}
              <Link href={`/product/${product.slug}`} className="relative block aspect-square bg-[#0B1B3D] p-8 border-b border-[#FF6B35]/20">
                {product.badge_ar && (
                  <div className="absolute top-4 right-4 bg-[#FF6B35] text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-sm">
                    {product.badge_ar}
                  </div>
                )}
                {/* Background Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-[0.05] group-hover:scale-110 transition-transform duration-700 text-[#FF6B35]">
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
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <div className="text-xs font-bold tracking-wider mb-2 text-[#FF6B35]">{product.tagline_ar}</div>
                  <h3 className="text-xl font-black text-white mb-3 line-clamp-2 leading-tight group-hover:text-[#FF6B35] transition-colors">
                    <Link href={`/product/${product.slug}`}>{product.name_ar}</Link>
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {product.description_ar}
                  </p>
                </div>

                <div className="flex text-[#FF6B35] mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-gray-400 text-xs ml-2 font-medium">(تقييمات مؤكدة)</span>
                </div>

                {/* Footer of Card */}
                <div className="mt-auto pt-6 border-t border-[#FF6B35]/20 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium">السعر</span>
                    <span className="text-lg font-black text-[#FF6B35]">{product.price} ر.س</span>
                  </div>
                  <Link 
                    href={`/product/${product.slug}`}
                    className="w-10 h-10 rounded-full bg-[#0B1B3D] border border-[#FF6B35]/30 flex items-center justify-center text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-all shadow-[0_0_10px_rgba(255,107,53,0.2)]"
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
