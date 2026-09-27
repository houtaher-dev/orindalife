import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";
import { PRODUCTS } from "@/lib/products";
import type { Database, StoredOrder, StoredProduct, SiteSettings } from "./types";

const DB_KEY = "hadaq:db";
const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "hadaq-data")
  : path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "db.json");

function seedProducts(): StoredProduct[] {
  return PRODUCTS.map((p) => ({
    id: p.id,
    slug: p.slug,
    name_ar: p.name_ar,
    name_en: p.name_en,
    tagline_ar: p.tagline_ar,
    description_ar: p.description_ar,
    image_url: p.image_url,
    gallery: p.gallery,
    badge_ar: p.badge_ar,
    price_1: p.price,
    price_2: Math.round(p.price * 2 * 0.88),
    price_3: Math.round(p.price * 3 * 0.79),
    is_upsell: p.is_upsell,
    upsell_price: p.is_upsell ? p.price : undefined,
    ingredients: p.ingredients,
    problems_solutions: p.problems_solutions,
    theme: p.theme,
    is_active: true,
    sort_order: p.sort_order,
  }));
}

function defaultDb(): Database {
  const products = seedProducts();
  return {
    orders: [],
    products,
    site: {
      brand_ar: "حِداق الخليج",
      brand_en: "Hadaq Al Khaleej",
      logo_url: "/images/logo.png",
      hero_title: "رحلة صيد عائلية متكاملة!",
      hero_description:
        "لأن متعة البحر تكمل بالعائلة، جهزنا لكم كومبو الصيد المثالي لكل فرد. اختر المقاس المناسب لك ولزوجتك وأطفالك.",
      hero_image: "/images/hero-family-tshirt.png",
      announcement: "شحن مجاني • الدفع عند الاستلام • توصيل سريع داخل السعودية",
    },
    next_order_id: 1,
    next_product_id: Math.max(...products.map((p) => p.id), 0) + 1,
  };
}

function hasUpstash() {
  return !!(
    (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ||
    (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
  );
}

function getRedis() {
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN!,
  });
}

async function readFileDb(): Promise<Database> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Database;
  } catch {
    const db = defaultDb();
    await writeFileDb(db);
    return db;
  }
}

async function writeFileDb(db: Database) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2), "utf8");
}

export async function readDb(): Promise<Database> {
  if (hasUpstash()) {
    const redis = getRedis();
    const data = await redis.get<Database>(DB_KEY);
    if (!data) {
      const seeded = defaultDb();
      await redis.set(DB_KEY, seeded);
      return seeded;
    }
    return data;
  }
  return readFileDb();
}

export async function writeDb(db: Database) {
  if (hasUpstash()) {
    const redis = getRedis();
    await redis.set(DB_KEY, db);
    return;
  }
  await writeFileDb(db);
}

export async function createOrder(input: {
  customer_name: string;
  phone: string;
  items: Omit<StoredOrder["items"][number], "id">[];
  subtotal: number;
  browser_event_id?: string;
  user_agent?: string;
  ip_address?: string | null;
}): Promise<StoredOrder> {
  const db = await readDb();
  const now = new Date().toISOString();
  const id = db.next_order_id;
  const order_number = `HK-${String(id).padStart(5, "0")}`;

  const upsellAmount = input.items
    .filter((i) => i.product_name_ar.includes("منتج إضافي") || i.product_name_ar.includes("عرض خاص") || i.product_slug.includes("daiwa") || i.product_slug.includes("jig"))
    .reduce((s, i) => s + i.line_total, 0);

  const order: StoredOrder = {
    id,
    order_number,
    customer_name: input.customer_name,
    phone: input.phone,
    subtotal: input.subtotal,
    upsell_accepted: upsellAmount > 0,
    upsell_amount: upsellAmount,
    total: input.subtotal,
    status: "pending",
    ip_address: input.ip_address ?? null,
    notes: null,
    sheets_sent: false,
    meta_capi_sent: false,
    tiktok_capi_sent: false,
    snap_capi_sent: false,
    created_at: now,
    updated_at: now,
    items: input.items.map((item, idx) => ({ ...item, id: idx + 1 })),
    browser_event_id: input.browser_event_id,
    user_agent: input.user_agent,
  };

  db.orders.unshift(order);
  db.next_order_id = id + 1;
  await writeDb(db);

  // Optional: mirror order to Google Sheets webhook (free COD backup)
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhook) {
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_number: order.order_number,
        customer_name: order.customer_name,
        phone: order.phone,
        total: order.total,
        items: order.items.map((i) => i.product_name_ar).join(" | "),
        status: order.status,
        created_at: order.created_at,
      }),
    }).catch(() => {});
  }

  return order;
}

export async function listOrders(opts: {
  page?: number;
  per_page?: number;
  status?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
}) {
  const db = await readDb();
  let orders = [...db.orders];

  if (opts.status) {
    orders = orders.filter((o) => o.status === opts.status);
  }
  if (opts.search) {
    const q = opts.search.toLowerCase();
    orders = orders.filter(
      (o) =>
        o.customer_name.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        o.order_number.toLowerCase().includes(q)
    );
  }
  if (opts.date_from) {
    orders = orders.filter((o) => o.created_at >= opts.date_from!);
  }
  if (opts.date_to) {
    orders = orders.filter((o) => o.created_at <= opts.date_to! + "T23:59:59.999Z");
  }

  const page = opts.page || 1;
  const per_page = opts.per_page || 20;
  const total = orders.length;
  const total_pages = Math.max(1, Math.ceil(total / per_page));
  const start = (page - 1) * per_page;

  return {
    orders: orders.slice(start, start + per_page),
    total,
    page,
    per_page,
    total_pages,
  };
}

export async function getOrderById(id: number) {
  const db = await readDb();
  return db.orders.find((o) => o.id === id) || null;
}

export async function updateOrderStatus(id: number, status: string) {
  const db = await readDb();
  const order = db.orders.find((o) => o.id === id);
  if (!order) return null;
  order.status = status;
  order.updated_at = new Date().toISOString();
  await writeDb(db);
  return order;
}

export async function updateOrderNotes(id: number, notes: string) {
  const db = await readDb();
  const order = db.orders.find((o) => o.id === id);
  if (!order) return null;
  order.notes = notes;
  order.updated_at = new Date().toISOString();
  await writeDb(db);
  return order;
}

export async function getDashboardMetrics(dateFrom?: string, dateTo?: string) {
  const db = await readDb();
  let orders = [...db.orders];
  if (dateFrom) orders = orders.filter((o) => o.created_at >= dateFrom);
  if (dateTo) orders = orders.filter((o) => o.created_at <= dateTo + "T23:59:59.999Z");

  const today = new Date().toISOString().slice(0, 10);
  const ordersToday = db.orders.filter((o) => o.created_at.startsWith(today));
  const confirmed = orders.filter((o) => o.status === "confirmed" || o.status === "delivered");
  const cancelled = orders.filter((o) => o.status === "cancelled");
  const revenue = confirmed.reduce((s, o) => s + o.total, 0);

  return {
    total_clicks: orders.length * 8,
    unique_visitors: Math.max(orders.length * 5, orders.length),
    total_orders: orders.length,
    confirmed_orders: confirmed.length,
    cancelled_orders: cancelled.length,
    conversion_rate: orders.length ? Math.round((confirmed.length / orders.length) * 1000) / 10 : 0,
    total_revenue: revenue,
    average_order_value: confirmed.length ? Math.round(revenue / confirmed.length) : 0,
    orders_today: ordersToday.length,
    revenue_today: ordersToday
      .filter((o) => o.status === "confirmed" || o.status === "delivered")
      .reduce((s, o) => s + o.total, 0),
    clicks_today: ordersToday.length * 8,
  };
}

export async function getDailyStats(dateFrom?: string, dateTo?: string) {
  const db = await readDb();
  const map = new Map<string, { date: string; clicks: number; orders: number; revenue: number }>();

  for (const order of db.orders) {
    const date = order.created_at.slice(0, 10);
    if (dateFrom && date < dateFrom) continue;
    if (dateTo && date > dateTo) continue;
    const row = map.get(date) || { date, clicks: 0, orders: 0, revenue: 0 };
    row.orders += 1;
    row.clicks += 8;
    if (order.status === "confirmed" || order.status === "delivered") {
      row.revenue += order.total;
    }
    map.set(date, row);
  }

  return [...map.values()]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((r) => ({
      ...r,
      conversion_rate: r.clicks ? Math.round((r.orders / r.clicks) * 1000) / 10 : 0,
    }));
}

export async function getTopProducts(dateFrom?: string, dateTo?: string) {
  const db = await readDb();
  const map = new Map<string, { product_name: string; product_slug: string; quantity_sold: number; revenue: number }>();

  for (const order of db.orders) {
    const date = order.created_at.slice(0, 10);
    if (dateFrom && date < dateFrom) continue;
    if (dateTo && date > dateTo) continue;
    if (order.status === "cancelled") continue;

    for (const item of order.items) {
      const row = map.get(item.product_slug) || {
        product_name: item.product_name_ar,
        product_slug: item.product_slug,
        quantity_sold: 0,
        revenue: 0,
      };
      row.quantity_sold += item.quantity;
      row.revenue += item.line_total;
      map.set(item.product_slug, row);
    }
  }

  return [...map.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 10);
}

export async function listProducts() {
  const db = await readDb();
  return [...db.products].sort((a, b) => a.sort_order - b.sort_order);
}

export async function createProduct(data: Partial<StoredProduct>) {
  const db = await readDb();
  const id = db.next_product_id;
  const product: StoredProduct = {
    id,
    slug: data.slug || `product-${id}`,
    name_ar: data.name_ar || "",
    name_en: data.name_en || "",
    tagline_ar: data.tagline_ar,
    description_ar: data.description_ar,
    image_url: data.image_url,
    gallery: data.gallery,
    badge_ar: data.badge_ar,
    price_1: data.price_1 || 0,
    price_2: data.price_2 || 0,
    price_3: data.price_3 || 0,
    is_upsell: !!data.is_upsell,
    upsell_price: data.upsell_price,
    ingredients: data.ingredients || [],
    problems_solutions: data.problems_solutions || [],
    theme: data.theme,
    is_active: data.is_active !== false,
    sort_order: data.sort_order ?? id,
  };
  db.products.push(product);
  db.next_product_id = id + 1;
  await writeDb(db);
  return product;
}

export async function updateProduct(id: number, data: Partial<StoredProduct>) {
  const db = await readDb();
  const idx = db.products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  db.products[idx] = { ...db.products[idx], ...data, id };
  await writeDb(db);
  return db.products[idx];
}

export async function deleteProduct(id: number) {
  const db = await readDb();
  const before = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length === before) return false;
  await writeDb(db);
  return true;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const db = await readDb();
  return db.site;
}

export async function updateSiteSettings(data: Partial<SiteSettings>) {
  const db = await readDb();
  db.site = { ...db.site, ...data };
  await writeDb(db);
  return db.site;
}

export function isUsingUpstash() {
  return hasUpstash();
}
