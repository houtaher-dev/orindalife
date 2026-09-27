import { NextResponse } from "next/server";
import { getPublicSiteSettings } from "@/lib/server/storefront";

export async function GET() {
  const site = await getPublicSiteSettings();
  if (!site) {
    return NextResponse.json({
      brand_ar: "حِداق الخليج",
      brand_en: "Hadaq Al Khaleej",
      logo_url: "/images/logo.png",
      hero_title: "رحلة صيد عائلية متكاملة!",
      hero_description:
        "لأن متعة البحر تكمل بالعائلة، جهزنا لكم كومبو الصيد المثالي لكل فرد.",
      hero_image: "/images/hero-family-tshirt.png",
      announcement: "شحن مجاني • الدفع عند الاستلام • توصيل سريع داخل السعودية",
    });
  }
  return NextResponse.json(site);
}
