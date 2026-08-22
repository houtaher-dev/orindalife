import React from "react";
import { Mail, MapPin, MessageCircle } from "lucide-react";

const EMAIL = "support@hadaqalkhaleej.com";
const WHATSAPP_DISPLAY = "0565498867";
const WHATSAPP_LINK = "https://wa.me/966565498867";

export default function ContactPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-black text-white mb-4 text-center">تواصل معنا</h1>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          نحن هنا لمساعدتك. إذا كان لديك أي استفسار حول منتجاتنا أو طلبك، لا تتردد في التواصل معنا.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a
            href={`mailto:${EMAIL}`}
            className="bg-[#0B1B3D] p-6 rounded-2xl border border-[#1A365D] text-center shadow-sm hover:border-[#FF6B35]/40 transition-colors"
          >
            <Mail className="w-8 h-8 text-[#FF6B35] mx-auto mb-4" />
            <h3 className="font-bold text-white mb-2">البريد الإلكتروني</h3>
            <p className="text-gray-300 text-sm break-all" dir="ltr">{EMAIL}</p>
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0B1B3D] p-6 rounded-2xl border border-[#1A365D] text-center shadow-sm hover:border-[#FF6B35]/40 transition-colors"
          >
            <MessageCircle className="w-8 h-8 text-[#FF6B35] mx-auto mb-4" />
            <h3 className="font-bold text-white mb-2">واتساب</h3>
            <p className="text-gray-300 text-sm" dir="ltr">{WHATSAPP_DISPLAY}</p>
          </a>
          <div className="bg-[#0B1B3D] p-6 rounded-2xl border border-[#1A365D] text-center shadow-sm">
            <MapPin className="w-8 h-8 text-[#FF6B35] mx-auto mb-4" />
            <h3 className="font-bold text-white mb-2">المقر الرئيسي</h3>
            <p className="text-gray-300 text-sm">الرياض، السعودية</p>
          </div>
        </div>

        <div className="bg-[#0B1B3D] p-8 rounded-3xl border border-[#1A365D] shadow-sm max-w-2xl mx-auto text-center">
          <p className="text-gray-300 mb-6">للرد السريع، راسلنا على واتساب أو البريد الإلكتروني.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ebe57] transition-colors"
            >
              تواصل عبر واتساب
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="px-8 py-4 bg-[#FF6B35] text-white font-bold rounded-xl hover:bg-[#E55A2B] transition-colors"
            >
              راسلنا بالإيميل
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
