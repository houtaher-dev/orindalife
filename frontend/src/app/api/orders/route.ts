import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/server/db";
import { PRODUCTS } from "@/lib/products";
import { priceForBags, type BagCount } from "@/lib/pricing";
import { normalizeSaudiPhone } from "@/lib/phone";

function isBagCount(value: number): value is BagCount {
  return value === 1 || value === 2 || value === 3;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const customer_name = String(body.customer_name || "").trim();
    const phone = normalizeSaudiPhone(String(body.phone || ""));
    const items = Array.isArray(body.items) ? body.items : [];

    if (customer_name.length < 2 || !phone || items.length === 0) {
      return NextResponse.json({ detail: "أدخل الاسم ورقم جوال سعودي صحيح مثل 05XXXXXXXX" }, { status: 400 });
    }

    const pricedItems = [];
    for (const raw of items) {
      const slug = String(raw.product_slug || "");
      const product = PRODUCTS.find((entry) => entry.slug === slug);
      if (!product) {
        return NextResponse.json({ detail: "أحد المنتجات غير معروف" }, { status: 400 });
      }
      const packCount = Math.max(1, Number(raw.pack_count) || Number(raw.quantity) || 1);
      if (!Number.isInteger(packCount) || packCount > 20) {
        return NextResponse.json({ detail: "عدد الباقات غير صالح" }, { status: 400 });
      }

      if (product.is_upsell) {
        pricedItems.push({
          product_id: product.id,
          product_slug: product.slug,
          product_name_ar: `${product.name_ar} (منتج إضافي)`,
          quantity: packCount,
          unit_price: product.price,
          line_total: product.price * packCount,
        });
        continue;
      }

      const bagsPerPack = Number(raw.bags_per_pack);
      if (!isBagCount(bagsPerPack)) {
        return NextResponse.json({ detail: "عدد الحقائب يجب أن يكون 1 أو 2 أو 3 من نفس المقاس" }, { status: 400 });
      }
      const packPrice = priceForBags(product.slug, product.price, bagsPerPack);
      const totalBags = packCount * bagsPerPack;
      const packText = packCount > 1
        ? ` — ${packCount} باقات × ${bagsPerPack} حقائب = ${totalBags} حقائب`
        : ` — ${totalBags === 1 ? "حقيبة واحدة" : totalBags === 2 ? "حقيبتان" : `${totalBags} حقائب`}`;
      pricedItems.push({
        product_id: product.id,
        product_slug: product.slug,
        product_name_ar: product.name_ar + packText,
        quantity: totalBags,
        unit_price: packPrice / bagsPerPack,
        line_total: packPrice * packCount,
      });
    }

    const subtotal = pricedItems.reduce((sum, item) => sum + item.line_total, 0);

    const order = await createOrder({
      customer_name,
      phone,
      items: pricedItems,
      subtotal,
      browser_event_id: body.browser_event_id,
      user_agent: body.user_agent || req.headers.get("user-agent") || undefined,
      ip_address: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    });

    return NextResponse.json({
      id: order.id,
      order_number: order.order_number,
      status: order.status,
      total: order.total,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ detail: "تعذر حفظ الطلب" }, { status: 500 });
  }
}
