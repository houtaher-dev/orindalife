import { CreateOrderPayload, OrderResponse, Product } from "@/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://api.orendaa.shop";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let message = "حدث خطأ، يرجى المحاولة مرة أخرى";
    try {
      const err = await res.json();
      if (err.detail) {
        if (Array.isArray(err.detail)) {
          message = err.detail.map((e: { msg: string }) => e.msg).join(". ");
        } else {
          message = err.detail;
        }
      }
    } catch {}
    throw new Error(message);
  }

  return res.json();
}

export const api = {
  products: {
    list: () => apiFetch<Product[]>("/api/products/"),
    upsell: () => apiFetch<Product>("/api/products/upsell"),
    get: (slug: string) => apiFetch<Product>(`/api/products/${slug}`),
  },

  orders: {
    create: (payload: CreateOrderPayload) =>
      apiFetch<OrderResponse>("/api/orders/", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    decideUpsell: (orderId: number, accepted: boolean) =>
      apiFetch<OrderResponse>(`/api/orders/${orderId}/upsell`, {
        method: "POST",
        body: JSON.stringify({ accepted }),
      }),
  },
};
