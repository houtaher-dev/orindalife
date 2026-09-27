import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-3xl bg-[#141414] p-8 md:p-12 rounded-3xl border border-[#333333] shadow-lg shadow-black/50">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B8860B] mb-8">سياسة الاسترجاع</h1>

        <div className="text-gray-300 space-y-6 leading-relaxed">
          <p>الدفع عند الاستلام، والشحن مجاني داخل السعودية.</p>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">قبل الشحن</h3>
            <p>يمكنك إلغاء الطلب بدون أي مبلغ.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">عند الاستلام</h3>
            <p>إذا وصلت الحقيبة ناقصة أو تالفة، لا تستلمها وراسلنا. نبدلها لك. لا نطلب رقم حساب.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">خلال 7 أيام من الاستلام</h3>
            <p>إذا لم تستخدم الحقيبة وبقيت على حالها، يمكنك إرجاعها أو استبدالها.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">بعد ذلك</h3>
            <p>بعد الاستخدام، أو بعد 7 أيام، لا يوجد استرجاع بسبب تغيير الرأي.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg text-white mb-3">التواصل</h3>
            <p>
              واتساب{" "}
              <a href="https://wa.me/966565498867" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] underline" dir="ltr">
                0565498867
              </a>
              {" "}أو{" "}
              <a href="mailto:support@hadaqalkhaleej.com" className="text-[#FF6B35] underline">
                support@hadaqalkhaleej.com
              </a>
              . اذكر رقم الطلب والمقاس.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
