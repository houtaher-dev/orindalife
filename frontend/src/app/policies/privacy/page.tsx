import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-3xl bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm prose prose-gray">
        <h1 className="text-3xl font-black text-gray-900 mb-8">سياسة الخصوصية</h1>
        
        <p>نحن في أوريندا الحياة نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.</p>

        <h3 className="font-bold text-lg mt-8 mb-2">1. المعلومات التي نجمعها</h3>
        <p>نقوم بجمع المعلومات التي تقدمها لنا طواعية عند تقديم طلب، مثل الاسم ورقم الهاتف وعنوان التوصيل في قطر. لا نطلب أي معلومات بنكية أو بطاقات ائتمانية لأن الدفع يكون عند الاستلام.</p>

        <h3 className="font-bold text-lg mt-8 mb-2">2. استخدام المعلومات</h3>
        <p>تستخدم معلوماتك حصرياً من أجل:</p>
        <ul className="list-disc pl-5 pr-5 space-y-2 mt-2">
          <li>تأكيد وتوصيل طلبك.</li>
          <li>التواصل معك بخصوص حالة الطلب.</li>
          <li>تحسين خدماتنا وتجربة التسوق.</li>
        </ul>

        <h3 className="font-bold text-lg mt-8 mb-2">3. حماية البيانات</h3>
        <p>نحن نتخذ كافة التدابير الأمنية المناسبة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الإفصاح.</p>
      </div>
    </div>
  );
}
