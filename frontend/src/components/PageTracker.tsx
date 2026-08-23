"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type WindowWithPixels = Window & {
  fbq?: (...args: unknown[]) => void;
  ttq?: {
    page?: (...args: unknown[]) => void;
    track?: (...args: unknown[]) => void;
  };
  snaptr?: (...args: unknown[]) => void;
};

export function PageTracker() {
  const pathname = usePathname();
  const lastTracked = useRef("");

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    const w = window as WindowWithPixels;
    if (w.fbq) {
      w.fbq("track", "PageView");
    }
    if (w.ttq?.page) {
      w.ttq.page();
    }
    if (w.snaptr) {
      w.snaptr("track", "PAGE_VIEW");
      if (pathname.startsWith("/product/")) {
        w.snaptr("track", "VIEW_CONTENT");
      }
    }
  }, [pathname]);

  return null;
}
