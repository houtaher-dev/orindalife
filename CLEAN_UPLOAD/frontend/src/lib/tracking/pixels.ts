"use client";

/**
 * Orenda Web Pixel Tracking
 * All pixel fires are deferred via requestIdleCallback for performance.
 * Event IDs are generated per-session for Meta/TikTok/Snap CAPI deduplication.
 */

type WindowWithPixels = Window & {
  fbq?: (...args: unknown[]) => void;
  ttq?: { track: (...args: unknown[]) => void; identify: (...args: unknown[]) => void };
  snaptr?: (...args: unknown[]) => void;
};

function defer(fn: () => void): void {
  if (typeof window === "undefined") return;
  if ("requestIdleCallback" in window) {
    requestIdleCallback(fn, { timeout: 3000 });
  } else {
    setTimeout(fn, 300);
  }
}

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
  defer(() => {
    const w = window as WindowWithPixels;
    if (!w.fbq) return;
    w.fbq("track", "ViewContent", {
      value: payload.value,
      currency: payload.currency || "QAR",
      content_ids: payload.contentIds,
      content_name: payload.contentName,
      content_type: "product",
    }, { eventID: payload.eventId || generateEventId() });
  });
}

export function metaAddToCart(payload: TrackPayload): void {
  defer(() => {
    const w = window as WindowWithPixels;
    if (!w.fbq) return;
    w.fbq("track", "AddToCart", {
      value: payload.value,
      currency: payload.currency || "QAR",
      content_ids: payload.contentIds,
      content_type: "product",
    }, { eventID: payload.eventId || generateEventId() });
  });
}

export function metaInitiateCheckout(payload: TrackPayload): void {
  defer(() => {
    const w = window as WindowWithPixels;
    if (!w.fbq) return;
    w.fbq("track", "InitiateCheckout", {
      value: payload.value,
      currency: payload.currency || "QAR",
      num_items: payload.numItems,
    }, { eventID: payload.eventId || generateEventId() });
  });
}

export function metaPurchase(payload: TrackPayload): void {
  defer(() => {
    const w = window as WindowWithPixels;
    if (!w.fbq) return;
    w.fbq("track", "Purchase", {
      value: payload.value,
      currency: payload.currency || "QAR",
      content_ids: payload.contentIds,
      content_type: "product",
      num_items: payload.numItems,
    }, { eventID: payload.eventId || generateEventId() });
  });
}

// ──────────── TikTok Pixel ────────────

export function tiktokAddToCart(payload: TrackPayload): void {
  defer(() => {
    const w = window as WindowWithPixels;
    if (!w.ttq) return;
    w.ttq.track("AddToCart", {
      event_id: payload.eventId,
      value: payload.value,
      currency: payload.currency || "QAR",
      content_id: payload.contentIds?.[0],
      content_name: payload.contentName,
    });
  });
}

export function tiktokInitiateCheckout(payload: TrackPayload): void {
  defer(() => {
    const w = window as WindowWithPixels;
    if (!w.ttq) return;
    w.ttq.track("InitiateCheckout", {
      event_id: payload.eventId,
      value: payload.value,
      currency: payload.currency || "QAR",
    });
  });
}

export function tiktokPurchase(payload: TrackPayload): void {
  defer(() => {
    const w = window as WindowWithPixels;
    if (!w.ttq) return;
    w.ttq.track("PlaceAnOrder", {
      event_id: payload.eventId,
      value: payload.value,
      currency: payload.currency || "QAR",
      order_id: payload.orderId,
    });
  });
}

// ──────────── Snapchat Pixel ────────────

export function snapAddToCart(payload: TrackPayload): void {
  defer(() => {
    const w = window as WindowWithPixels;
    if (!w.snaptr) return;
    w.snaptr("track", "ADD_CART", {
      price: payload.value,
      currency: payload.currency || "QAR",
      item_ids: payload.contentIds,
    });
  });
}

export function snapPurchase(payload: TrackPayload): void {
  defer(() => {
    const w = window as WindowWithPixels;
    if (!w.snaptr) return;
    w.snaptr("track", "PURCHASE", {
      price: payload.value,
      currency: payload.currency || "QAR",
      transaction_id: payload.orderId,
    });
  });
}

// ──────────── Combined helpers ────────────

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
  return eventId;
}

export function trackPurchase(orderId: string, total: number, productIds: string[], numItems: number) {
  const eventId = generateEventId();
  metaPurchase({ value: total, contentIds: productIds, numItems, orderId, eventId });
  tiktokPurchase({ value: total, orderId, eventId });
  snapPurchase({ value: total, orderId });
  return eventId;
}
