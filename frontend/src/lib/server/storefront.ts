import { listProducts, getSiteSettings } from "@/lib/server/db";
import type { Product } from "@/lib/products";
import { PRODUCTS } from "@/lib/products";
import type { StoredProduct } from "@/lib/server/types";

const seedBySlug = new Map(PRODUCTS.map((p) => [p.slug, p]));

function applySeedImages(product: Product): Product {
  const seed = seedBySlug.get(product.slug);
  if (!seed) return product;
  return { ...product, image_url: seed.image_url, gallery: seed.gallery };
}

export function mapStoredToProduct(p: StoredProduct): Product {
  return {
    id: p.id,
    slug: p.slug,
    name_ar: p.name_ar,
    name_en: p.name_en,
    tagline_ar: p.tagline_ar || "",
    description_ar: p.description_ar || "",
    image_url: p.image_url || "/images/logo.png",
    gallery: p.gallery,
    badge_ar: p.badge_ar,
    price: p.is_upsell ? (p.upsell_price || p.price_1) : p.price_1,
    is_upsell: p.is_upsell,
    sort_order: p.sort_order,
    ingredients: (p.ingredients as Product["ingredients"]) || [],
    problems_solutions: (p.problems_solutions as Product["problems_solutions"]) || [],
    theme: (p.theme as Product["theme"]) || {
      from: "from-[#0B1B3D]",
      to: "to-[#1A365D]",
      accent: "#FF6B35",
      icon: "🎣",
    },
  };
}

export async function getStorefrontProducts(): Promise<Product[]> {
  try {
    const stored = await listProducts();
    const active = stored.filter((p) => p.is_active);
    if (active.length > 0) {
      return active
        .map(mapStoredToProduct)
        .map(applySeedImages)
        .sort((a, b) => a.sort_order - b.sort_order);
    }
  } catch (err) {
    console.error("Failed loading products from DB, using static fallback", err);
  }
  return PRODUCTS;
}

export async function getStorefrontProduct(slug: string) {
  const products = await getStorefrontProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getPublicSiteSettings() {
  try {
    return await getSiteSettings();
  } catch {
    return null;
  }
}
