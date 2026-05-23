"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.orendaa.shop";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem("_otrack_sid");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("_otrack_sid", sid);
  }
  return sid;
}

export function PageTracker() {
  const pathname = usePathname();
  const lastTracked = useRef("");

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    const sessionId = getSessionId();

    fetch(`${API_BASE}/api/track/pageview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page_url: pathname,
        referrer: document.referrer || null,
        session_id: sessionId,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
