const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.orendaa.shop";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

export function setToken(token: string) {
  localStorage.setItem("admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("admin_token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    clearToken();
    if (typeof window !== "undefined") window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Error ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function login(username: string, password: string) {
  const data = await apiFetch<{ access_token: string }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  setToken(data.access_token);
  return data;
}

export interface DashboardMetrics {
  total_clicks: number;
  unique_visitors: number;
  total_orders: number;
  confirmed_orders: number;
  cancelled_orders: number;
  conversion_rate: number;
  total_revenue: number;
  average_order_value: number;
  orders_today: number;
  revenue_today: number;
  clicks_today: number;
}

export interface DailyStats {
  date: string;
  clicks: number;
  orders: number;
  revenue: number;
  conversion_rate: number;
}

export interface TopProduct {
  product_name: string;
  product_slug: string;
  quantity_sold: number;
  revenue: number;
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_slug: string;
  product_name_ar: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface OrderDetail {
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
  created_at: string | null;
  updated_at: string | null;
  items: OrderItem[];
}

export interface OrdersListResponse {
  orders: OrderDetail[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export function getDashboard(dateFrom?: string, dateTo?: string) {
  const params = new URLSearchParams();
  if (dateFrom) params.set("date_from", dateFrom);
  if (dateTo) params.set("date_to", dateTo);
  const qs = params.toString();
  return apiFetch<DashboardMetrics>(`/api/admin/dashboard${qs ? `?${qs}` : ""}`);
}

export function getDailyStats(dateFrom?: string, dateTo?: string) {
  const params = new URLSearchParams();
  if (dateFrom) params.set("date_from", dateFrom);
  if (dateTo) params.set("date_to", dateTo);
  const qs = params.toString();
  return apiFetch<DailyStats[]>(`/api/admin/dashboard/daily${qs ? `?${qs}` : ""}`);
}

export function getTopProducts(dateFrom?: string, dateTo?: string) {
  const params = new URLSearchParams();
  if (dateFrom) params.set("date_from", dateFrom);
  if (dateTo) params.set("date_to", dateTo);
  const qs = params.toString();
  return apiFetch<TopProduct[]>(`/api/admin/dashboard/top-products${qs ? `?${qs}` : ""}`);
}

export function getOrders(opts: {
  page?: number;
  per_page?: number;
  status?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
} = {}) {
  const params = new URLSearchParams();
  if (opts.page) params.set("page", String(opts.page));
  if (opts.per_page) params.set("per_page", String(opts.per_page));
  if (opts.status) params.set("status", opts.status);
  if (opts.search) params.set("search", opts.search);
  if (opts.date_from) params.set("date_from", opts.date_from);
  if (opts.date_to) params.set("date_to", opts.date_to);
  const qs = params.toString();
  return apiFetch<OrdersListResponse>(`/api/admin/orders${qs ? `?${qs}` : ""}`);
}

export function getOrder(id: number) {
  return apiFetch<OrderDetail>(`/api/admin/orders/${id}`);
}

export interface Product {
  id: number;
  slug: string;
  name_ar: string;
  name_en: string;
  tagline_ar?: string;
  description_ar?: string;
  image_url?: string;
  badge_ar?: string;
  price_1: number;
  price_2: number;
  price_3: number;
  is_upsell: boolean;
  upsell_price?: number;
  ingredients?: any[];
  problems_solutions?: any[];
  theme?: any;
  is_active: boolean;
  sort_order: number;
}

export function getProducts() {
  return apiFetch<Product[]>("/api/admin/products");
}

export function createProduct(data: Partial<Product>) {
  return apiFetch<Product>("/api/admin/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateProduct(id: number, data: Partial<Product>) {
  return apiFetch<Product>(`/api/admin/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteProduct(id: number) {
  return apiFetch<{ status: string }>(`/api/admin/products/${id}`, {
    method: "DELETE",
  });
}

export function updateOrderStatus(id: number, status: string) {
  return apiFetch<OrderDetail>(`/api/admin/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function updateOrderNotes(id: number, notes: string) {
  return apiFetch<OrderDetail>(`/api/admin/orders/${id}/notes`, {
    method: "PATCH",
    body: JSON.stringify({ notes }),
  });
}
