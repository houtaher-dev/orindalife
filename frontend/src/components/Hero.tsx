import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Leaf, Clock, FlaskConical, Award, ArrowLeft } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B1B3D] pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1A365D] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF6B35]/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content (Right side in RTL) */}
          <div className="flex-1 text-center md:text-right space-y-8">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A365D] border border-[#FF6B35]/20 text-sm font-bold text-white mx-auto md:mx-0 shadow-[0_0_10px_rgba(255,107,53,0.1)]">
              <Award className="w-4 h-4 text-[#FF6B35]" />
              <span>الوجهة الأولى لمعدات الصيد البحري في السعودية</span>
            </div>
            
            {/* Headline */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.2] mb-4">
                معدات صيد احترافية <br />
                <span className="text-[#FF6B35]">لرحلة صيد لا تُنسى</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
                اكتشف مجموعتنا المتكاملة من قصبات الصيد والمكائن والطعوم. جودة عالية، متانة فائقة، ومناسبة لجميع مستويات الصيد البحري.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className="flex flex-col items-center justify-center bg-[#1A365D] px-6 py-3 rounded-xl border border-[#FF6B35]/20 shadow-sm min-w-[100px] hover:border-[#FF6B35]/50 transition-colors">
                <span className="text-xs font-bold text-white mb-1">جودة</span>
                <span className="text-[10px] text-[#FF6B35]">عالية ومتينة</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-[#1A365D] px-6 py-3 rounded-xl border border-[#FF6B35]/20 shadow-sm min-w-[100px] hover:border-[#FF6B35]/50 transition-colors">
                <span className="text-xs font-bold text-white mb-1">توصيل</span>
                <span className="text-[10px] text-[#FF6B35]">سريع للمنزل</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-[#1A365D] px-6 py-3 rounded-xl border border-[#FF6B35]/20 shadow-sm min-w-[100px] hover:border-[#FF6B35]/50 transition-colors">
                <span className="text-xs font-bold text-white mb-1">الدفع</span>
                <span className="text-[10px] text-[#FF6B35]">عند الاستلام</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-[#1A365D] px-6 py-3 rounded-xl border border-[#FF6B35]/20 shadow-sm min-w-[100px] hover:border-[#FF6B35]/50 transition-colors">
                <span className="text-xs font-bold text-white mb-1">ضمان</span>
                <span className="text-[10px] text-[#FF6B35]">استبدال واسترجاع</span>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-2">
              <Link 
                href="#products" 
                className="flex items-center gap-2 px-8 py-4 bg-[#FF6B35] text-white font-black rounded-xl hover:bg-[#E55A2B] transition-colors shadow-[0_0_20px_rgba(255,107,53,0.3)] w-full sm:w-auto justify-center"
              >
                استكشف المعدات الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
              
            </div>
            
          </div>

          {/* Image Content (Left side in RTL) */}
          <div className="flex-1 w-full max-w-lg mx-auto relative">
            <div className="aspect-[4/3] sm:aspect-square relative flex items-center justify-center group">
              <Image 
                src="/images/hero-products.webp"
                alt="معدات صيد حِداق الخليج"
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
