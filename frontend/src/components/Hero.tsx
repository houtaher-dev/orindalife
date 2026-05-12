import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Leaf, Clock, FlaskConical, Award, ArrowLeft } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F7F3] pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f0eee4] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#eef1ed] rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content (Right side in RTL) */}
          <div className="flex-1 text-center md:text-right space-y-8">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200/50 border border-gray-200 text-sm font-bold text-gray-700 mx-auto md:mx-0">
              <FlaskConical className="w-4 h-4 text-gray-600" />
              <span>صيدلية الصحة والتوازن السعودية - مرخّصة SFDA</span>
            </div>
            
            {/* Headline */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#134e4a] leading-[1.2] mb-4">
                علكات وقطرات سريرية <br />
                لصحة وتوازن يبدأ من الداخل
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
                ثلاث تركيبات سريرية مدعومة بالأبحاث — تستهدف التوتر، قلة النوم، وضعف التركيز. حلال 100%، مرخّصة من هيئة الغذاء والدواء، ومكونات طبيعية نقية.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className="flex flex-col items-center justify-center bg-white px-6 py-3 rounded-xl border border-gray-100 shadow-sm min-w-[100px]">
                <span className="text-xs font-bold text-gray-900 mb-1">SFDA</span>
                <span className="text-[10px] text-gray-500">مرخّص رسمياً</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white px-6 py-3 rounded-xl border border-gray-100 shadow-sm min-w-[100px]">
                <span className="text-xs font-bold text-gray-900 mb-1">حلال</span>
                <span className="text-[10px] text-gray-500">نباتي 100%</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white px-6 py-3 rounded-xl border border-gray-100 shadow-sm min-w-[100px]">
                <span className="text-xs font-bold text-gray-900 mb-1">GMP</span>
                <span className="text-[10px] text-gray-500">تصنيع طبي</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white px-6 py-3 rounded-xl border border-gray-100 shadow-sm min-w-[100px]">
                <span className="text-xs font-bold text-gray-900 mb-1">30 يوم</span>
                <span className="text-[10px] text-gray-500">ضمان استرجاع</span>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-2">
              <Link 
                href="#products" 
                className="flex items-center gap-2 px-8 py-4 bg-[#134e4a] text-white font-bold rounded-xl hover:bg-[#0f3d3a] transition-colors shadow-lg shadow-[#134e4a]/20 w-full sm:w-auto justify-center"
              >
                استكشف المجموعة الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
              
              <div className="flex items-center gap-2 bg-[#fdf8e7] text-[#9a7b2c] px-4 py-3 rounded-xl font-bold text-sm border border-[#f3e8c3]">
                <Award className="w-5 h-5" />
                <span>ضمان استرجاع 30 يوم</span>
              </div>
            </div>
            
          </div>

          {/* Image Content (Left side in RTL) */}
          <div className="flex-1 w-full max-w-lg mx-auto relative">
            <div className="aspect-[4/3] sm:aspect-square relative flex items-center justify-center group">
              <Image 
                src="/images/hero-products.webp"
                alt="مجموعة أوريندا"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
