export type StoredOrderItem = {
  id: number;
  product_id: number;
  product_slug: string;
  product_name_ar: string;
  quantity: number;
  unit_price: number;
  line_total: number;
};

export type StoredOrder = {
  id: number;
  order_number: string;
  customer_name: string;
  phone: string;
  subtotal: number;
  upsell_accepted: boolean;
  upsell_amount: number;
  total: number;
  status: string;
  ip_address: string | null;
  notes: string | null;
  sheets_sent: boolean;
  meta_capi_sent: boolean;
  tiktok_capi_sent: boolean;
  snap_capi_sent: boolean;
  created_at: string;
  updated_at: string;
  items: StoredOrderItem[];
  browser_event_id?: string;
  user_agent?: string;
};

export type StoredProduct = {
  id: number;
  slug: string;
  name_ar: string;
  name_en: string;
  tagline_ar?: string;
  description_ar?: string;
  image_url?: string;
  gallery?: string[];
  badge_ar?: string;
  price_1: number;
  price_2: number;
  price_3: number;
  is_upsell: boolean;
  upsell_price?: number;
  ingredients?: unknown[];
  problems_solutions?: unknown[];
  theme?: unknown;
  is_active: boolean;
  sort_order: number;
};

export type SiteSettings = {
  brand_ar: string;
  brand_en: string;
  logo_url: string;
  hero_title: string;
  hero_description: string;
  hero_image: string;
  announcement: string;
};

export type Database = {
  orders: StoredOrder[];
  products: StoredProduct[];
  site: SiteSettings;
  next_order_id: number;
  next_product_id: number;
};
