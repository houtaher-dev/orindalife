import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-black text-gray-900 mb-4 text-center">تواصل معنا</h1>
        <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
          نحن هنا لمساعدتك. إذا كان لديك أي استفسار حول منتجاتنا أو طلبك، لا تتردد في التواصل معنا.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
            <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">البريد الإلكتروني</h3>
            <p className="text-gray-600 text-sm">support@orindalife.com</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
            <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">الهاتف</h3>
            <p className="text-gray-600 text-sm">+974 3300 0000</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">المقر الرئيسي</h3>
            <p className="text-gray-600 text-sm">الدوحة، قطر</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">الرسالة</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"></textarea>
            </div>
            <button type="button" className="w-full px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
              إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
