import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cart } from "@/components/Cart";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "أوريندا الحياة | Orendalife",
  description: "كبسولات وقطرات سريرية لصحة وتوازن يبدأ من الداخل",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className={`${tajawal.variable} font-sans antialiased text-gray-900 bg-[#FAFAFA] flex flex-col min-h-screen`}>
        <Header />
        <Cart />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
