import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-3xl bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm prose prose-gray">
        <h1 className="text-3xl font-black text-gray-900 mb-8">سياسة الاسترجاع (ضمان 30 يوم)</h1>
        
        <p>في أوريندا الحياة، نثق في فعالية منتجاتنا، لذلك نقدم ضمان استرجاع لمدة 30 يوماً.</p>

        <h3 className="font-bold text-lg mt-8 mb-2">كيف يعمل الضمان؟</h3>
        <p>إذا استخدمت المنتج بانتظام لمدة 30 يوماً ولم تلاحظ أي فرق أو تحسن، يمكنك طلب استرجاع المبلغ بالكامل.</p>

        <h3 className="font-bold text-lg mt-8 mb-2">شروط الاسترجاع</h3>
        <ul className="list-disc pl-5 pr-5 space-y-2 mt-2">
          <li>يجب التواصل معنا خلال 30 يوماً من تاريخ استلام الطلب.</li>
          <li>يتم إرجاع العبوات (حتى لو كانت فارغة) لغرض الجودة.</li>
          <li>تغطي سياسة الاسترجاع أول طلب فقط للمنتج لتجربته.</li>
        </ul>

        <h3 className="font-bold text-lg mt-8 mb-2">طريقة الاسترجاع</h3>
        <p>تواصل معنا عبر البريد الإلكتروني أو الواتساب، وسيقوم فريقنا بترتيب عملية الاسترجاع وإعادة المبلغ لك في أقرب وقت ممكن.</p>
      </div>
    </div>
  );
}
