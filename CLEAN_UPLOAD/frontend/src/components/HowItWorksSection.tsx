import React from "react";

export function HowItWorksSection() {
  const steps = [
    {
      num: "١",
      title: "اختر روتينك",
      desc: "ثلاث منتجات تستهدف ثلاث مشاكل: التوتر، قلة النوم، أو ضعف التركيز. اختر الواحدة أو الروتين الكامل."
    },
    {
      num: "٢",
      title: "أكّد طلبك (بدون دفع)",
      desc: "اسمك ورقم جوالك فقط. الدفع عند الاستلام، وفريقنا بيتواصل معك لتأكيد العنوان."
    },
    {
      num: "٣",
      title: "استلم وادفع",
      desc: "نوصل الطلب لباب بيتك خلال 1-3 أيام داخل قطر، ودفعك يكون نقد أو وقت الاستلام."
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-3">How It Works</h2>
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">من الطلب لباب بيتك في 3 خطوات</h3>
          <p className="text-gray-600 text-lg">
            بدون دفع أونلاين. بدون التزام. بدون مخاطرة.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-24 right-24 h-0.5 bg-gray-100 z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-50 flex items-center justify-center text-3xl font-black text-primary shadow-sm mb-6">
                {step.num}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h4>
              <p className="text-gray-600 leading-relaxed max-w-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-gray-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">صحتك وتوازنك يستحق علم، مو وعود</h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            ابدأ روتينك السريري اليوم. الدفع عند الاستلام، شحن داخل قطر، وضمان استرجاع 30 يوم — تجربة بدون مخاطرة.
          </p>
          <button className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
            استكشف المنتجات الآن
          </button>
        </div>
      </div>
    </section>
  );
}
