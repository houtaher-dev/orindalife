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
  title: "حِداق الخليج | Hadaq Al Khaleej",
  description: "معدات صيد بحري احترافية، جودة عالية وتوصيل سريع لكل مناطق السعودية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className={`${tajawal.variable} font-sans antialiased text-gray-200 bg-[#0B1B3D] flex flex-col min-h-screen selection:bg-[#FF6B35]/30 selection:text-[#FF6B35]`}>
        <StoreShell>{children}</StoreShell>
      </body>
    </html>
  );
}
