import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { StoreShell } from "@/components/StoreShell";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "أوريندا الحياة | Orendalife",
  description: "علكات سريرية لصحة وتوازن يبدأ من الداخل",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className={`${tajawal.variable} font-sans antialiased text-gray-200 bg-[#0a0a0a] flex flex-col min-h-screen selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]`}>
        <StoreShell>{children}</StoreShell>
      </body>
    </html>
  );
}
