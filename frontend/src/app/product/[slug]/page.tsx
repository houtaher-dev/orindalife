import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { ProductOptions } from "./ProductOptions";
import { Star, ShieldCheck, CheckCircle2, ChevronDown, Check, X } from "lucide-react";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";
import Link from "next/link";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const crossSells = PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <div className="bg-[#f9f8f6] min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="bg-[#f4f2ec] py-12 md:py-24 border-b border-[#e5e0d8]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Right: Text & Options */}
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-[#134e4a] mb-4 leading-tight">
                {product.name_ar}
                <br />
                <span className="text-2xl text-gray-600 font-medium">السبب مو منك، السبب من الروتين</span>
              </h1>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {product.description_ar}
              </p>

              <div className="flex items-center gap-2 mb-8">
                <div className="flex text-amber-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <span className="text-sm font-bold text-gray-900">4.9</span>
                <span className="text-sm text-gray-500 underline">+487 تقييم موثق</span>
              </div>

              {/* Add To Cart Options */}
              <ProductOptions product={product} />

            </div>

            {/* Left: Product Image */}
            <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-xl shadow-gray-200/50">
              <Image 
                src={product.image_url} 
                alt={product.name_ar}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur py-4 px-6 flex justify-between items-center border-t border-gray-100">
                 <div className="text-center">
                   <div className="text-xs text-gray-500 font-bold mb-1">مرخص من</div>
                   <div className="font-black text-gray-900">SFDA</div>
                 </div>
                 <div className="w-px h-8 bg-gray-200"></div>
                 <div className="text-center">
                   <div className="text-xs text-gray-500 font-bold mb-1">صنع في</div>
                   <div className="font-black text-gray-900">حلال</div>
                 </div>
                 <div className="w-px h-8 bg-gray-200"></div>
                 <div className="text-center">
                   <div className="text-xs text-gray-500 font-bold mb-1">الكمية</div>
                   <div className="font-black text-gray-900">30 حبة</div>
                 </div>
                 <div className="w-px h-8 bg-gray-200"></div>
                 <div className="text-center">
                   <div className="text-xs text-gray-500 font-bold mb-1">يكفي لمدة</div>
                   <div className="font-black text-gray-900">شهر</div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Problems & Solutions Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#134e4a] mb-4">مشاكل تعرفينها — وحلول من الداخل</h2>
            <p className="text-gray-600 font-medium">مو ذنبك، السبب هو الروتين الغلط... غيريه للأبد</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {/* Problem 1 */}
              <div className="bg-[#fcfbf9] p-5 rounded-2xl border border-[#eae6de]">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1 text-sm md:text-base">تعب وإرهاق دائم، مهما نمتي تحسين لسا تعبانة؟</p>
                    <p className="text-sm text-gray-600">هذا دليل على نقص الفيتامينات والمعادن الأساسية، جسمك يطلب المساعدة من الداخل.</p>
                  </div>
                </div>
              </div>
              
              {/* Problem 2 */}
              <div className="bg-[#fcfbf9] p-5 rounded-2xl border border-[#eae6de]">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1 text-sm md:text-base">بشرة باهتة وتساقط بالشعر؟ الكريمات ما تنفع؟</p>
                    <p className="text-sm text-gray-600">الكريمات تعالج الطبقة الخارجية فقط، الحل الجذري يبدأ بتغذية الخلايا من الداخل.</p>
                  </div>
                </div>
              </div>

              {/* Problem 3 */}
              <div className="bg-[#fcfbf9] p-5 rounded-2xl border border-[#eae6de]">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1 text-sm md:text-base">صعوبة بالتركيز وتقلبات بالمزاج طول اليوم؟</p>
                    <p className="text-sm text-gray-600">الجهاز العصبي يحتاج لدعم طبيعي، هذي علامة واضحة على الإجهاد الداخلي المستمر.</p>
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div className="bg-[#134e4a] p-6 rounded-2xl mt-8">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white mb-2 text-lg">الحل: {product.name_ar}</p>
                    <p className="text-white/80 text-sm leading-relaxed">
                      تركيبة متطورة تعوض النقص، تدعم وظائف الجسم الحيوية، وتعيد لك حيويتك وتوازنك من أول شهر استخدام.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-[3/4] md:aspect-square rounded-3xl overflow-hidden bg-gray-100">
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
      <section className="py-20 md:py-32 bg-[#f4f2ec]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#134e4a] mb-4">السر في التركيبة، مو في القائمة</h2>
            <p className="text-gray-600 font-medium">كل مكون مختار بعناية وبجرعة مدروسة لتوفير أقصى فائدة، مو مجرد حشو.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2 relative aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-lg">
               <div className={`absolute inset-0 bg-gradient-to-tr ${product.theme.from} ${product.theme.to} opacity-10`}></div>
               <Image 
                  src={product.image_url} 
                  alt="مكونات المنتج"
                  fill
                  className="object-contain p-8"
                />
            </div>

            <div className="md:col-span-3 space-y-6">
              {product.ingredients.map((ing, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-[#eae6de] shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-black text-gray-900">{ing.name_ar}</h3>
                    <div className="px-3 py-1 bg-[#134e4a]/10 text-[#134e4a] text-xs font-bold rounded-full">
                      {ing.name_en}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {ing.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[#134e4a] text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>فعالية مثبتة علمياً، نقاء عالي الجودة</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Section */}
      <section className="py-16 bg-white border-y border-[#eae6de]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
           <h2 className="text-2xl font-black text-gray-900 mb-2">تركيبة سريرية، مو وعود فاضية</h2>
           <p className="text-gray-600 mb-10">مرخصة من الجهات الرسمية ومصنوعة بأعلى معايير الجودة العالمية</p>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
              <div className="border border-[#eae6de] rounded-2xl p-6 bg-[#fcfbf9]">
                 <div className="font-black text-xl text-[#134e4a] mb-2">SFDA</div>
                 <div className="text-xs text-gray-600 font-bold">هيئة الغذاء والدواء</div>
              </div>
              <div className="border border-[#eae6de] rounded-2xl p-6 bg-[#fcfbf9]">
                 <div className="font-black text-xl text-[#134e4a] mb-2">GMP</div>
                 <div className="text-xs text-gray-600 font-bold">ممارسات التصنيع</div>
              </div>
              <div className="border border-[#eae6de] rounded-2xl p-6 bg-[#fcfbf9]">
                 <div className="font-black text-xl text-[#134e4a] mb-2">حلال</div>
                 <div className="text-xs text-gray-600 font-bold">موثق حلال عالمياً</div>
              </div>
              <div className="border border-[#eae6de] rounded-2xl p-6 bg-[#fcfbf9]">
                 <div className="font-black text-xl text-[#134e4a] mb-2">ISO 22000</div>
                 <div className="text-xs text-gray-600 font-bold">سلامة الغذاء</div>
              </div>
           </div>

           <div className="bg-[#134e4a] text-white rounded-3xl p-8 md:p-12 text-center md:text-right flex flex-col md:flex-row items-center gap-8 shadow-xl">
             <div className="flex-1">
                <h3 className="text-2xl font-black mb-4 flex items-center justify-center md:justify-start gap-3">
                  <ShieldCheck className="w-8 h-8 text-[#d4af37]" />
                  شحنتنا السعودية مضمونة
                </h3>
                <p className="text-white/80 leading-relaxed">
                  "التركيبة اللي بين يديك مدعومة بتجارب سريرية موثقة. مو مجرد خلطة عشوائية، بل نسب دقيقة مصممة لتعطي أقصى فعالية وامتصاص. استثمارك في صحتك في مكانه الصح."
                </p>
             </div>
             <div className="grid grid-cols-2 gap-4 flex-shrink-0 w-full md:w-auto">
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <div className="font-black text-2xl mb-1 text-[#d4af37]">+4.9</div>
                  <div className="text-xs font-medium">متوسط تقييم العملاء</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <div className="font-black text-2xl mb-1 text-[#d4af37]">+60</div>
                  <div className="text-xs font-medium">تركيبة مدروسة ومطورة</div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 5. What to expect in 30 days */}
      <section className="py-20 md:py-32 bg-[#f4f2ec]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="mb-4 inline-block px-4 py-1.5 bg-[#134e4a]/10 text-[#134e4a] font-bold text-sm rounded-full">
            من أول شهر استخدام
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#134e4a] mb-16">وش راح تشوفين خلال أول 30 يوم؟</h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-[#eae6de] z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#134e4a] text-white flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-lg shadow-[#134e4a]/20">1</div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#eae6de] h-full">
                <h3 className="text-xl font-black text-gray-900 mb-3">أول 3 أيام</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  امتصاص سريع للمكونات النشطة. تبدأين بملاحظة تحسن في مستويات الطاقة وانخفاض ملحوظ في التعب العام.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 mt-8 md:mt-0">
              <div className="w-16 h-16 rounded-full bg-[#134e4a] text-white flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-lg shadow-[#134e4a]/20">2</div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#eae6de] h-full">
                <h3 className="text-xl font-black text-gray-900 mb-3">الأسبوع الثاني</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  توازن داخلي أوضح. تحسن في جودة النوم، مزاج أكثر استقراراً، وبداية ملاحظة نضارة في البشرة بفضل التغذية الخلوية.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 mt-8 md:mt-0">
              <div className="w-16 h-16 rounded-full bg-[#134e4a] text-white flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-lg shadow-[#134e4a]/20">3</div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#eae6de] h-full">
                <h3 className="text-xl font-black text-gray-900 mb-3">نهاية الشهر الأول</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  النتيجة الكبرى. توازن مستدام، طاقة عالية طوال اليوم، وتغيير جذري في صحتك من الداخل ينعكس بوضوح على الخارج.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Reviews */}
      <div className="bg-white border-b border-[#eae6de]">
         <ReviewsSection />
      </div>

      {/* 7. Money Back Guarantee & Simple Routine */}
      <section className="py-20 md:py-32 bg-[#f4f2ec]">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-16">
           
           {/* Guarantee */}
           <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[#eae6de] max-w-2xl mx-auto">
             <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-green-600" />
             </div>
             <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">30 يوم — أو فلوسك ترجع. بدون أسئلة.</h2>
             <p className="text-gray-600 leading-relaxed">
               حنا واثقين تماماً من التركيبة. إذا استخدمتي العلبة كاملة والتزمتي بالروتين وما شفتي فرق واضح في صحتك وحيويتك، فلوسك ترجع لك فوراً. استثمارك في أمان تام.
             </p>
           </div>

           {/* Routine */}
           <div>
             <h2 className="text-2xl md:text-3xl font-black text-[#134e4a] mb-12">أبسط روتين عمرك جربتيه</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-[#eae6de]">
                   <div className="font-black text-3xl text-[#134e4a] mb-2">2</div>
                   <div className="font-bold text-gray-900 mb-1">حبة كل يوم</div>
                   <p className="text-xs text-gray-500">حبتين مع كوب ماء يومياً لنتائج مثالية.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-[#eae6de]">
                   <div className="font-black text-3xl text-[#134e4a] mb-2">30</div>
                   <div className="font-bold text-gray-900 mb-1">يومياً بدون انقطاع</div>
                   <p className="text-xs text-gray-500">الاستمرارية هي سر التغيير الجذري.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-[#eae6de]">
                   <div className="font-black text-3xl text-[#134e4a] mb-2">+60</div>
                   <div className="font-bold text-gray-900 mb-1">يوم للنتائج التامة</div>
                   <p className="text-xs text-gray-500">الكورس الكامل لشهرين يعطي أفضل نتيجة.</p>
                </div>
                <div className="bg-[#134e4a] text-white p-6 rounded-2xl flex flex-col justify-center items-center">
                   <div className="font-black text-lg mb-1">استعيدي توازنك</div>
                   <p className="text-xs text-white/80">ابدأي روتينك الجديد اليوم</p>
                </div>
             </div>
           </div>

        </div>
      </section>

      {/* 8. FAQ */}
      <div className="bg-white border-b border-[#eae6de]">
         <FAQSection />
      </div>

      {/* 9. Cross-sells Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900">منتجات أخرى من أوريندا</h2>
            <p className="text-gray-600 mt-3 font-medium">كل مشكلة تركيبة حلها متخصصة — اختاري ما يوافقك</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {crossSells.map((p) => (
              <Link href={`/product/${p.slug}`} key={p.id} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div className={`w-full aspect-square rounded-2xl bg-gradient-to-tr ${p.theme.from} ${p.theme.to} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden mb-6`}>
                  <div className="absolute inset-0 opacity-20 flex items-center justify-center text-8xl">{p.theme.icon}</div>
                  <Image src={p.image_url} alt={p.name_ar} fill className="object-contain p-8 relative z-10" />
                </div>
                <div className="flex-1 flex flex-col">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{p.name_ar}</h4>
                  <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed flex-1">{p.description_ar}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-black text-xl text-[#134e4a]">{p.price} ر.ق</span>
                    <span className="text-sm font-bold bg-[#f4f2ec] text-[#134e4a] px-4 py-2 rounded-xl group-hover:bg-[#134e4a] group-hover:text-white transition-colors">
                      اكتشفي المزيد
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar for Mobile (Optional, but good for CRO) */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 p-4 z-40 md:hidden flex justify-between items-center shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)]">
        <div>
           <div className="text-xs text-gray-500 font-bold mb-0.5">يبدأ من</div>
           <div className="font-black text-gray-900 text-lg">199 ر.ق</div>
        </div>
        <a 
          href="#"
          className="px-8 py-3 bg-[#134e4a] text-white font-bold rounded-xl shadow-lg shadow-[#134e4a]/20 flex items-center justify-center"
        >
          اختاري العرض
        </a>
      </div>

    </div>
  );
}
