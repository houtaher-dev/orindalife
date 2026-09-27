import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Award, ArrowLeft } from "lucide-react";
import { getPublicSiteSettings } from "@/lib/server/storefront";

export async function Hero() {
  const site = await getPublicSiteSettings();
  const title = site?.hero_title || "رحلة صيد عائلية متكاملة!";
  const description =
    site?.hero_description ||
    'لأن متعة البحر تكمل بالعائلة، جهزنا لكم "كومبو" الصيد المثالي لكل فرد. اختر المقاس المناسب لك ولزوجتك وأطفالك، وابدأ مغامرتكم اليوم بكل سهولة واحترافية.';
  const heroImage = site?.hero_image || "/images/hero-family-tshirt.png";
  const brandAr = site?.brand_ar || "حِداق الخليج";

  const titleParts = title.trim().split(/\s+/);
  const lastWord = titleParts.length > 1 ? titleParts.pop()! : "";
  const mainTitle = titleParts.join(" ") || title;

  return (
    <section className="relative overflow-hidden bg-[#0B1B3D] pt-6 pb-16 md:pt-10 md:pb-24">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1A365D] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF6B35]/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center md:text-right space-y-8 md:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A365D]/80 border border-[#FF6B35]/20 text-sm font-bold text-white mx-auto md:mx-0 shadow-[0_0_10px_rgba(255,107,53,0.1)]">
              <Award className="w-4 h-4 text-[#FF6B35]" />
              <span>الوجهة الأولى لمعدات الصيد البحري في السعودية</span>
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.3] mb-5">
                {lastWord ? (
                  <>
                    {mainTitle} <br />
                    <span className="text-[#FF6B35]">{lastWord}</span>
                  </>
                ) : (
                  title
                )}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4">
              <Link href="/policies/refund" className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10 shadow-sm min-w-[100px]">
                <span className="text-sm font-bold text-white mb-1">7 أيام</span>
                <span className="text-[11px] text-gray-400">ضمان استرجاع</span>
              </Link>
              <div className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10 shadow-sm min-w-[100px]">
                <span className="text-sm font-bold text-white mb-1">الدفع</span>
                <span className="text-[11px] text-gray-400">عند الاستلام</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10 shadow-sm min-w-[100px]">
                <span className="text-sm font-bold text-white mb-1">توصيل</span>
                <span className="text-[11px] text-gray-400">سريع للمنزل</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10 shadow-sm min-w-[100px]">
                <span className="text-sm font-bold text-white mb-1">جودة</span>
                <span className="text-[11px] text-gray-400">عالية ومتينة</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start pt-4">
              <Link
                href="#products"
                className="flex items-center gap-2 px-8 py-4 bg-[#FF6B35] text-white font-black rounded-xl hover:bg-[#E55A2B] transition-colors shadow-[0_0_20px_rgba(255,107,53,0.3)] w-full sm:w-auto justify-center"
              >
                اكتشف معدات العائلة
                <ArrowLeft className="w-5 h-5" />
              </Link>

              <Link href="/policies/refund" className="flex items-center gap-3 bg-[#1A365D]/50 px-5 py-3 rounded-xl border border-[#FF6B35]/20">
                <Award className="w-6 h-6 text-[#FF6B35]" />
                <span className="text-sm font-bold text-gray-200">ضمان استرجاع 7 أيام</span>
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-[500px] mx-auto relative md:w-1/2 mt-8 md:mt-0">
            <div className="aspect-[5/4] relative flex items-center justify-center group rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.3)] border-[6px] border-[#1A365D] ring-1 ring-[#FF6B35]/50 bg-[#0B1B3D]">
              <Image
                src={heroImage}
                alt={brandAr}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white rounded-2xl p-3 md:p-4 shadow-2xl z-20 flex items-center gap-3 border border-gray-100 transform transition-transform hover:-translate-y-2 duration-500">
              <div className="bg-[#0B1B3D] p-2 md:p-3 rounded-xl">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-[#FF6B35]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#0B1B3D] font-black text-xs md:text-sm">معدات أصلية</span>
                <span className="text-gray-500 text-[10px] md:text-xs font-bold">جودة مضمونة 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
