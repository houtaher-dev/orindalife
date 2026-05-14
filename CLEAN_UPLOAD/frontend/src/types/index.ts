export interface Product {
  id: number;
  slug: string;
  name_ar: string;
  name_en: string;
  tagline_ar: string;
  description_ar: string;
  image_url: string;
  badge_ar?: string;
  price_1: number;
  price_2: number;
  price_3: number;
  is_upsell: boolean;
  upsell_price?: number;
  sort_order: number;
}

export interface CartItem {
  productId: number;
  productSlug: string;
  nameAr: string;
  imageUrl: string;
  quantity: 1 | 2 | 3;
  unitPrice: number;
  lineTotal: number;
}

export interface OrderItemPayload {
  product_id: number;
  product_slug: string;
  product_name_ar: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface CreateOrderPayload {
  customer_name: string;
  phone: string;
  items: OrderItemPayload[];
  subtotal: number;
  browser_event_id?: string;
  ip_address?: string;
  user_agent?: string;
}

export interface OrderResponse {
  id: number;
  order_number: string;
  customer_name: string;
  phone: string;
  subtotal: number;
  upsell_accepted: boolean;
  upsell_amount: number;
  total: number;
  status: string;
  items: OrderItemPayload[];
}

export interface UpsellProduct {
  id: number;
  slug: string;
  name_ar: string;
  tagline_ar: string;
  description_ar: string;
  image_url: string;
  upsell_price: number;
}

export type QuantityTier = 1 | 2 | 3;
