import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-3xl bg-[#141414] p-8 md:p-12 rounded-3xl border border-[#333333] shadow-lg shadow-black/50">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B8860B] mb-8">سياسة الخصوصية</h1>
        
        <div className="text-gray-300 space-y-6 leading-relaxed">
          <p>متجر حِداق الخليج يجمع البيانات اللازمة لتنفيذ طلب معدات الصيد فقط. هذه الصفحة تصف ما يفعله الموقع حالياً.</p>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">1. ما نجمعه عند الطلب</h3>
            <p>الاسم ورقم الجوال، ثم عنوان التوصيل عند تأكيد الطلب هاتفياً. الدفع عند الاستلام، ونموذج الطلب لا يطلب بيانات بطاقة أو حساب بنكي.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">2. أين تُحفظ بيانات الطلب</h3>
            <p>يُحفظ الطلب في قاعدة بيانات المتجر حتى يتابعه الفريق. إذا كان ربط جدول خارجي مفعّلاً، تُرسل نسخة من رقم الطلب والاسم والجوال والمبلغ وأسماء المنتجات. لا نعرض هذه البيانات للزوار.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">3. قياس الإعلانات</h3>
            <p>الصفحات تحمّل أدوات قياس من ميتا وتيك توك وسناب شات. قد تسجّل هذه الأدوات زيارة الصفحة وإتمام الطلب حسب إعدادات تلك المنصات ومتصفحك. لا نحدد هنا مدة احتفاظ تلك المنصات بالبيانات.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">4. التواصل</h3>
            <p>
              للاستفسار عن بيانات طلبك:{" "}
              <a href="mailto:support@hadaqalkhaleej.com" className="text-[#FF6B35] underline">
                support@hadaqalkhaleej.com
              </a>{" "}
              أو واتساب{" "}
              <a href="https://wa.me/966565498867" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] underline" dir="ltr">
                0565498867
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
