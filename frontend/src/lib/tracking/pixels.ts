"use client";

/**
 * Pixel tracking for Meta, TikTok, and Snapchat.
 * Events fire immediately so test tools and ad platforms receive them reliably.
 */

type WindowWithPixels = Window & {
  fbq?: (...args: unknown[]) => void;
  ttq?: { track: (...args: unknown[]) => void; identify: (...args: unknown[]) => void };
  snaptr?: (...args: unknown[]) => void;
};

export function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

interface TrackPayload {
  value?: number;
  currency?: string;
  contentIds?: string[];
  contentName?: string;
  eventId?: string;
  orderId?: string;
  numItems?: number;
}

// ──────────── Meta Pixel ────────────

export function metaViewContent(payload: TrackPayload = {}): void {
  const w = window as WindowWithPixels;
  if (!w.fbq) return;
  w.fbq("track", "ViewContent", {
    value: payload.value,
    currency: payload.currency || "SAR",
    content_ids: payload.contentIds,
    content_name: payload.contentName,
    content_type: "product",
  }, { eventID: payload.eventId || generateEventId() });
}

export function metaAddToCart(payload: TrackPayload): void {
  const w = window as WindowWithPixels;
  if (!w.fbq) return;
  w.fbq("track", "AddToCart", {
    value: payload.value,
    currency: payload.currency || "SAR",
    content_ids: payload.contentIds,
    content_type: "product",
  }, { eventID: payload.eventId || generateEventId() });
}

export function metaInitiateCheckout(payload: TrackPayload): void {
  const w = window as WindowWithPixels;
  if (!w.fbq) return;
  w.fbq("track", "InitiateCheckout", {
    value: payload.value,
    currency: payload.currency || "SAR",
    num_items: payload.numItems,
  }, { eventID: payload.eventId || generateEventId() });
}

export function metaPurchase(payload: TrackPayload): void {
  const w = window as WindowWithPixels;
  if (!w.fbq) return;
  w.fbq("track", "Purchase", {
    value: payload.value,
    currency: payload.currency || "SAR",
    content_ids: payload.contentIds,
    content_type: "product",
    num_items: payload.numItems,
  }, { eventID: payload.eventId || generateEventId() });
}

// ──────────── TikTok Pixel ────────────

export function tiktokViewContent(payload: TrackPayload = {}): void {
  const w = window as WindowWithPixels;
  if (!w.ttq) return;
  w.ttq.track("ViewContent", {
    event_id: payload.eventId,
    value: payload.value,
    currency: payload.currency || "SAR",
    content_id: payload.contentIds?.[0],
    content_name: payload.contentName,
  });
}

export function tiktokAddToCart(payload: TrackPayload): void {
  const w = window as WindowWithPixels;
  if (!w.ttq) return;
  w.ttq.track("AddToCart", {
    event_id: payload.eventId,
    value: payload.value,
    currency: payload.currency || "SAR",
    content_id: payload.contentIds?.[0],
    content_name: payload.contentName,
  });
}

export function tiktokInitiateCheckout(payload: TrackPayload): void {
  const w = window as WindowWithPixels;
  if (!w.ttq) return;
  w.ttq.track("InitiateCheckout", {
    event_id: payload.eventId,
    value: payload.value,
    currency: payload.currency || "SAR",
  });
}

export function tiktokPurchase(payload: TrackPayload): void {
  const w = window as WindowWithPixels;
  if (!w.ttq) return;
  w.ttq.track("PlaceAnOrder", {
    event_id: payload.eventId,
    value: payload.value,
    currency: payload.currency || "SAR",
    order_id: payload.orderId,
  });
}

// ──────────── Snapchat Pixel ────────────

export function snapAddToCart(payload: TrackPayload): void {
  const w = window as WindowWithPixels;
  if (!w.snaptr) return;
  w.snaptr("track", "ADD_CART", {
    price: payload.value,
    currency: payload.currency || "SAR",
    item_ids: payload.contentIds,
  });
}

export function snapPurchase(payload: TrackPayload): void {
  const w = window as WindowWithPixels;
  if (!w.snaptr) return;
  w.snaptr("track", "PURCHASE", {
    price: payload.value,
    currency: payload.currency || "SAR",
    transaction_id: payload.orderId,
    item_ids: payload.contentIds,
    number_items: payload.numItems,
  });
}

export function snapPageView(): void {
  const w = window as WindowWithPixels;
  if (!w.snaptr) return;
  w.snaptr("track", "PAGE_VIEW");
}

export function snapViewContent(payload: TrackPayload = {}): void {
  const w = window as WindowWithPixels;
  if (!w.snaptr) return;
  w.snaptr("track", "VIEW_CONTENT", {
    price: payload.value,
    currency: payload.currency || "SAR",
    item_ids: payload.contentIds,
    item_category: payload.contentName,
  });
}

export function snapInitiateCheckout(payload: TrackPayload): void {
  const w = window as WindowWithPixels;
  if (!w.snaptr) return;
  w.snaptr("track", "START_CHECKOUT", {
    price: payload.value,
    currency: payload.currency || "SAR",
    number_items: payload.numItems,
  });
}

// ──────────── Combined helpers ────────────

export function trackViewContent(productId: number, productName: string, price: number) {
  const eventId = generateEventId();
  const contentIds = [String(productId)];
  metaViewContent({ value: price, contentIds, contentName: productName, eventId });
  tiktokViewContent({ value: price, contentIds, contentName: productName, eventId });
  snapViewContent({ value: price, contentIds, contentName: productName });
}

export function trackAddToCart(productId: number, productName: string, price: number) {
  const eventId = generateEventId();
  metaAddToCart({ value: price, contentIds: [String(productId)], contentName: productName, eventId });
  tiktokAddToCart({ value: price, contentIds: [String(productId)], contentName: productName, eventId });
  snapAddToCart({ value: price, contentIds: [String(productId)] });
  return eventId;
}

export function trackInitiateCheckout(total: number, numItems: number) {
  const eventId = generateEventId();
  metaInitiateCheckout({ value: total, numItems, eventId });
  tiktokInitiateCheckout({ value: total, eventId });
  snapInitiateCheckout({ value: total, numItems });
  return eventId;
}

export function trackPurchase(orderId: string, total: number, productIds: string[], numItems: number) {
  const eventId = generateEventId();
  metaPurchase({ value: total, contentIds: productIds, numItems, orderId, eventId });
  tiktokPurchase({ value: total, orderId, eventId });
  snapPurchase({ value: total, orderId, contentIds: productIds, numItems });
  return eventId;
}
