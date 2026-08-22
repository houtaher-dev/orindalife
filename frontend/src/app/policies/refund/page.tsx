import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-3xl bg-[#141414] p-8 md:p-12 rounded-3xl border border-[#333333] shadow-lg shadow-black/50">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B8860B] mb-8">سياسة الاسترجاع (ضمان 30 يوم)</h1>
        
        <div className="text-gray-300 space-y-6 leading-relaxed">
          <p>في أوريندا الحياة، نثق في فعالية منتجاتنا، لذلك نقدم ضمان استرجاع لمدة 30 يوماً.</p>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">كيف يعمل الضمان؟</h3>
            <p>إذا استخدمت المنتج بانتظام لمدة 30 يوماً ولم تلاحظ أي فرق أو تحسن، يمكنك طلب استرجاع المبلغ بالكامل.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">شروط الاسترجاع</h3>
            <ul className="list-disc pl-5 pr-5 space-y-2 marker:text-[#D4AF37]">
              <li>يجب التواصل معنا خلال 30 يوماً من تاريخ استلام الطلب.</li>
              <li>يتم إرجاع العبوات (حتى لو كانت فارغة) لغرض الجودة.</li>
              <li>تغطي سياسة الاسترجاع أول طلب فقط للمنتج لتجربته.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">طريقة الاسترجاع</h3>
            <p>
              تواصل معنا عبر{" "}
              <a href="mailto:support@hadaqalkhaleej.com" className="text-[#FF6B35] underline">
                support@hadaqalkhaleej.com
              </a>{" "}
              أو واتساب{" "}
              <a href="https://wa.me/966565498867" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] underline" dir="ltr">
                0565498867
              </a>
              ، وسيقوم فريقنا بترتيب عملية الاسترجاع وإعادة المبلغ لك في أقرب وقت ممكن.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
