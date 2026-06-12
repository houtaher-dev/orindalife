import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-3xl bg-[#141414] p-8 md:p-12 rounded-3xl border border-[#333333] shadow-lg shadow-black/50">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B8860B] mb-8">سياسة الخصوصية</h1>
        
        <div className="text-gray-300 space-y-6 leading-relaxed">
          <p>نحن في أوريندا الحياة نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.</p>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">1. المعلومات التي نجمعها</h3>
            <p>نقوم بجمع المعلومات التي تقدمها لنا طواعية عند تقديم طلب، مثل الاسم ورقم الهاتف وعنوان التوصيل في السعودية. لا نطلب أي معلومات بنكية أو بطاقات ائتمانية لأن الدفع يكون عند الاستلام.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">2. استخدام المعلومات</h3>
            <p className="mb-2">تستخدم معلوماتك حصرياً من أجل:</p>
            <ul className="list-disc pl-5 pr-5 space-y-2 marker:text-[#D4AF37]">
              <li>تأكيد وتوصيل طلبك.</li>
              <li>التواصل معك بخصوص حالة الطلب.</li>
              <li>تحسين خدماتنا وتجربة التسوق.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">3. حماية البيانات</h3>
            <p>نحن نتخذ كافة التدابير الأمنية المناسبة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الإفصاح.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
