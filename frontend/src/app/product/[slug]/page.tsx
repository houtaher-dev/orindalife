import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { ProductOptions } from "./ProductOptions";
import { Star, ShieldCheck, CheckCircle2, ChevronDown, Check, X } from "lucide-react";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";
import Link from "next/link";
import { ExpectedResultsTimeline } from "@/components/ExpectedResultsTimeline";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const crossSells = PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <div className="bg-[#0a0a0a] min-h-screen font-sans selection:bg-[#D4AF37]/30">
      
      {/* 1. Hero Section */}
      <section className="bg-[#0B1B3D] py-12 md:py-24 border-b border-[#1A365D] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B35]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Right: Text & Options */}
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                {product.name_ar}
                <br />
                <span className="text-2xl text-[#FF6B35] font-medium">{product.tagline_ar}</span>
              </h1>
              
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {product.description_ar}
              </p>

              <div className="flex items-center gap-2 mb-8">
                <div className="flex text-[#FF6B35]">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <span className="text-sm font-bold text-white">4.9</span>
                <span className="text-sm text-[#FF6B35] underline">+487 تقييم موثق</span>
              </div>

              {/* Add To Cart Options */}
              <div className="dark-theme-override">
                <ProductOptions product={product} />
              </div>

            </div>

            {/* Left: Product Image */}
            <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-[#0B1B3D] shadow-lg shadow-black/50 border border-[#1A365D]">
              <Image 
                src={product.image_url} 
                alt={product.name_ar}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-[#0B1B3D]/90 backdrop-blur py-4 px-6 flex justify-between items-center border-t border-[#1A365D]">
                 <div className="text-center">
                   <div className="text-xs text-gray-400 font-bold mb-1">جودة</div>
                   <div className="font-black text-[#FF6B35]">عالية</div>
                 </div>
                 <div className="w-px h-8 bg-[#1A365D]"></div>
                 <div className="text-center">
                   <div className="text-xs text-gray-400 font-bold mb-1">توصيل</div>
                   <div className="font-black text-[#FF6B35]">سريع</div>
                 </div>
                 <div className="w-px h-8 bg-[#1A365D]"></div>
                 <div className="text-center">
                   <div className="text-xs text-gray-400 font-bold mb-1">دفع</div>
                   <div className="font-black text-[#FF6B35]">عند الاستلام</div>
                 </div>
                 <div className="w-px h-8 bg-[#1A365D]"></div>
                 <div className="text-center">
                   <div className="text-xs text-gray-400 font-bold mb-1">ضمان</div>
                   <div className="font-black text-[#FF6B35]">استبدال</div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Problems & Solutions Section */}
      <section className="py-20 md:py-32 bg-[#0B1B3D]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">تحديات الصيد — وحلولنا</h2>
            <p className="text-gray-400 font-medium">معدات مصممة لتجاوز التحديات وتسهيل رحلة الصيد.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              {product.problems_solutions.map((item, index) => (
                <div key={index} className="space-y-2">
                  {/* Problem Box */}
                  <div className="bg-[#1A365D] p-5 rounded-xl border border-red-900/50 flex items-center gap-4 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-red-950/50 flex items-center justify-center flex-shrink-0">
                      <X className="w-5 h-5 text-red-500" />
                    </div>
                    <p className="font-bold text-gray-300 text-sm md:text-base">{item.problem}</p>
                  </div>
                  
                  {/* Solution Box */}
                  <div className="bg-[#1A365D] p-5 rounded-xl border border-[#FF6B35]/20 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-5 h-5 text-[#FF6B35]" />
                    </div>
                    <p className="text-sm md:text-base text-gray-300 font-medium leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden bg-[#1A365D] border border-[#FF6B35]/20 sticky top-24 shadow-lg shadow-black/50">
               <Image 
                  src={product.image_url} 
                  alt={product.name_ar}
                  fill
                  className="object-cover"
                />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Ingredients Section */}
      <section className="py-20 md:py-32 bg-[#1A365D] border-t border-[#FF6B35]/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">محتويات الحقيبة</h2>
            <p className="text-gray-400 font-medium">كل ما تحتاجه لرحلة صيد متكاملة في حقيبة واحدة.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2 relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#0B1B3D] shadow-lg shadow-black/50 border border-[#FF6B35]/20">
               <div className={`absolute inset-0 bg-gradient-to-tr ${product.theme.from} ${product.theme.to} opacity-5`}></div>
               <Image 
                  src={product.image_url} 
                  alt="مكونات المنتج"
                  fill
                  className="object-contain p-8 relative z-10"
                />
            </div>

            <div className="md:col-span-3 space-y-6">
              {product.ingredients.map((ing, i) => (
                <div key={i} className="bg-[#0B1B3D] p-6 rounded-2xl border border-[#FF6B35]/20 shadow-sm hover:border-[#FF6B35]/50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-black text-white">{ing.name_ar}</h3>
                    <div className="px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-bold rounded-full border border-[#FF6B35]/20">
                      {ing.name_en}
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {ing.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[#FF6B35] text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>جودة عالية ومتانة مضمونة</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Section */}
      <section className="py-16 bg-[#0B1B3D] border-y border-[#1A365D]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
           <h2 className="text-2xl font-black text-white mb-2">جودة تثق بها</h2>
           <p className="text-gray-400 mb-10">معدات مصممة لتحمل أقسى ظروف الصيد البحري</p>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
              <div className="border border-[#FF6B35]/20 rounded-2xl p-6 bg-[#1A365D] hover:border-[#FF6B35]/50 transition-colors">
                 <div className="font-black text-xl text-[#FF6B35] mb-2">متانة</div>
                 <div className="text-xs text-gray-400 font-bold">مواد عالية الجودة</div>
              </div>
              <div className="border border-[#FF6B35]/20 rounded-2xl p-6 bg-[#1A365D] hover:border-[#FF6B35]/50 transition-colors">
                 <div className="font-black text-xl text-[#FF6B35] mb-2">أداء</div>
                 <div className="text-xs text-gray-400 font-bold">تصميم احترافي</div>
              </div>
              <div className="border border-[#FF6B35]/20 rounded-2xl p-6 bg-[#1A365D] hover:border-[#FF6B35]/50 transition-colors">
                 <div className="font-black text-xl text-[#FF6B35] mb-2">ضمان</div>
                 <div className="text-xs text-gray-400 font-bold">استبدال واسترجاع</div>
              </div>
              <div className="border border-[#FF6B35]/20 rounded-2xl p-6 bg-[#1A365D] hover:border-[#FF6B35]/50 transition-colors">
                 <div className="font-black text-xl text-[#FF6B35] mb-2">قيمة</div>
                 <div className="text-xs text-gray-400 font-bold">أفضل سعر للسوق</div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-[#1A365D] to-[#0B1B3D] border border-[#FF6B35]/20 text-white rounded-3xl p-8 md:p-12 text-center md:text-right flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-black/50">
             <div className="flex-1">
                <h3 className="text-2xl font-black mb-4 flex items-center justify-center md:justify-start gap-3 text-white">
                  <ShieldCheck className="w-8 h-8 text-[#FF6B35]" />
                  شحنتنا للسعودية مضمونة
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  "نحن نضمن لك وصول معداتك بأفضل حالة. نستخدم تغليفاً آمناً ونتعامل مع أفضل شركات الشحن لضمان وصول طلبك بسرعة وأمان لباب بيتك."
                </p>
             </div>
             <div className="grid grid-cols-2 gap-4 flex-shrink-0 w-full md:w-auto">
                <div className="bg-[#0B1B3D] border border-[#1A365D] rounded-2xl p-4 text-center">
                  <div className="font-black text-2xl mb-1 text-[#FF6B35]">+4.9</div>
                  <div className="text-xs font-medium text-gray-400">متوسط تقييم العملاء</div>
                </div>
                <div className="bg-[#0B1B3D] border border-[#1A365D] rounded-2xl p-4 text-center">
                  <div className="font-black text-2xl mb-1 text-[#FF6B35]">1-3</div>
                  <div className="text-xs font-medium text-gray-400">أيام للتوصيل</div>
                </div>
             </div>
           </div>
        </div>
      </section>


      {/* 6. Reviews */}
      <div className="bg-[#0B1B3D] border-y border-[#1A365D]">
         <div className="dark-theme-override">
           <ReviewsSection isDark={true} />
         </div>
      </div>

      {/* 7. Money Back Guarantee & Simple Routine */}
      <section className="py-20 md:py-32 bg-[#1A365D]">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-16">
           
           {/* Guarantee */}
           <div className="bg-[#0B1B3D] p-8 md:p-12 rounded-3xl shadow-lg shadow-black/50 border border-[#FF6B35]/20 max-w-2xl mx-auto relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B35]/10 blur-[50px] rounded-full pointer-events-none"></div>
             <div className="w-16 h-16 bg-[#1A365D] border border-[#FF6B35]/30 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <ShieldCheck className="w-8 h-8 text-[#FF6B35]" />
             </div>
             <h2 className="text-2xl md:text-3xl font-black text-white mb-4 relative z-10">ضمان الاستبدال والاسترجاع</h2>
             <p className="text-gray-400 leading-relaxed relative z-10">
               نحن واثقون من جودة معداتنا. إذا واجهت أي مشكلة مصنعية أو لم تكن راضياً عن الجودة، تواصل معنا وسنقوم باستبدال المنتج أو استرجاع قيمته.
             </p>
           </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <div className="bg-[#0B1B3D] border-b border-[#1A365D]">
         <div className="dark-theme-override">
           <FAQSection isDark={true} />
         </div>
      </div>

      {/* 9. Cross-sells Section */}
      <section className="py-20 md:py-32 bg-[#141414]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white">منتجات أخرى من أوريندا</h2>
            <p className="text-gray-400 mt-3 font-medium">كل مشكلة تركيبة حلها متخصصة — اختر ما يناسبك</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {crossSells.map((p) => (
              <Link href={`/product/${p.slug}`} key={p.id} className="group bg-[#1a1a1a] rounded-3xl p-6 border border-[#333333] shadow-lg shadow-black/50 hover:border-[#D4AF37]/40 hover:-translate-y-1 transition-all flex flex-col">
                <div className={`w-full aspect-square rounded-2xl bg-[#0a0a0a] border border-[#333333] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden mb-6`}>
                  <div className="absolute inset-0 opacity-10 flex items-center justify-center text-8xl text-[#D4AF37]">{p.theme.icon}</div>
                  <Image src={p.image_url} alt={p.name_ar} fill className="object-contain p-8 relative z-10" />
                </div>
                <div className="flex-1 flex flex-col">
                  <h4 className="text-xl font-bold text-gray-200 mb-2">{p.name_ar}</h4>
                  <p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-relaxed flex-1">{p.description_ar}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-black text-xl text-[#D4AF37]">{p.price} ر.س</span>
                    <span className="text-sm font-bold bg-[#0a0a0a] border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-2 rounded-xl group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#B8860B] group-hover:text-[#0a0a0a] transition-all">
                      اكتشف المزيد
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-[#0a0a0a]/95 backdrop-blur-md text-white z-50 border-t border-[#D4AF37]/20 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto px-4 max-w-6xl py-3 flex justify-between items-center">
          
          {/* Right side: Product Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] border border-[#333333] p-1 hidden sm:block flex-shrink-0">
              <Image 
                src={product.image_url} 
                alt={product.name_ar}
                width={48}
                height={48}
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <div className="font-bold text-sm md:text-base line-clamp-1 text-white">{product.name_ar}</div>
              <div className="text-xs text-[#D4AF37] font-medium mt-0.5" dir="rtl">يبدأ من 199 ريال سعودي • الدفع عند الاستلام</div>
            </div>
          </div>

          {/* Left side: Button */}
          <a 
            href="#"
            className="px-5 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0a0a0a] font-black rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:opacity-90 transition-opacity flex items-center gap-2 text-sm md:text-base flex-shrink-0"
          >
            <ChevronDown className="w-4 h-4 rotate-180" />
            ابدأ روتينك الآن
          </a>

        </div>
      </div>

    </div>
  );
}
