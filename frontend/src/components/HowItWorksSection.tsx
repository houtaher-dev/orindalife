import React from "react";

export function HowItWorksSection() {
  const steps = [
    {
      num: "١",
      title: "اختر معداتك",
      desc: "تصفح حقائب الصيد المتكاملة واختر المقاس المناسب لاحتياجاتك ومستوى خبرتك."
    },
    {
      num: "٢",
      title: "أكّد طلبك (بدون دفع)",
      desc: "اسمك ورقم جوالك فقط. الدفع عند الاستلام، وفريقنا بيتواصل معك لتأكيد العنوان."
    },
    {
      num: "٣",
      title: "استلم وادفع",
      desc: "نوصل الطلب لباب بيتك خلال 1-3 أيام داخل السعودية، ودفعك يكون نقد أو وقت الاستلام."
    }
  ];

  return (
    <section className="py-12 bg-[#0B1B3D] border-t border-[#1A365D]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-[#FF6B35] uppercase mb-3">How It Works</h2>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">من الطلب لباب بيتك في 3 خطوات</h3>
          <p className="text-gray-400 text-lg">
            بدون دفع أونلاين. بدون التزام. بدون مخاطرة.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-24 right-24 h-0.5 bg-[#1A365D] z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-[#1A365D] rounded-full border-4 border-[#0B1B3D] flex items-center justify-center text-3xl font-black text-[#FF6B35] shadow-[0_0_15px_rgba(255,107,53,0.2)] mb-6">
                {step.num}
              </div>
              <h4 className="text-xl font-bold text-gray-200 mb-3">{step.title}</h4>
              <p className="text-gray-400 leading-relaxed max-w-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-[#1A365D] rounded-3xl p-8 md:p-12 border border-[#FF6B35]/20 shadow-lg shadow-black/50">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">رحلة صيدك تبدأ من هنا</h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            اطلب معداتك اليوم. الدفع عند الاستلام، شحن داخل السعودية، وضمان استبدال — تجربة تسوق مضمونة.
          </p>
          <button className="px-8 py-4 bg-[#FF6B35] text-white font-black rounded-xl hover:bg-[#E55A2B] transition-colors shadow-[0_0_20px_rgba(255,107,53,0.3)]">
            استكشف المعدات الآن
          </button>
        </div>
      </div>
    </section>
  );
}
