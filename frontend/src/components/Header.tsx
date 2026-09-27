"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, ShieldCheck, Truck, Handshake, Leaf } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

const ANNOUNCEMENTS = [
  {
    text: "معدات صيد احترافية بجودة عالية",
    icon: ShieldCheck
  },
  {
    text: "الدفع عند الاستلام • شحن سريع لجميع مناطق السعودية",
    icon: Truck
  },
  {
    text: "ضمان الجودة • خدمة عملاء متميزة",
    icon: Handshake
  }
];

export function Header() {
  const { getCartCount, setIsOpen } = useCartStore();
  const count = getCartCount();
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandAr, setBrandAr] = useState("حِداق الخليج");
  const [brandEn, setBrandEn] = useState("Hadaq Al Khaleej");
  const [logoUrl, setLogoUrl] = useState("/images/logo.png");
  const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS);

  useEffect(() => {
    fetch("/api/site")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        if (data.brand_ar) setBrandAr(data.brand_ar);
        if (data.brand_en) setBrandEn(data.brand_en);
        if (data.logo_url) setLogoUrl(data.logo_url);
        if (data.announcement) {
          setAnnouncements([
            { text: data.announcement, icon: ShieldCheck },
            ...ANNOUNCEMENTS.slice(1),
          ]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const CurrentIcon = announcements[announcementIndex]?.icon || ShieldCheck;
  const enLines = brandEn.split(/\s+/);
  const enLine1 = enLines.slice(0, Math.ceil(enLines.length / 2)).join(" ");
  const enLine2 = enLines.slice(Math.ceil(enLines.length / 2)).join(" ");

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#0B1B3D]/95 backdrop-blur-md border-b border-[#FF6B35]/20 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src={logoUrl} alt={brandAr} className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,107,53,0.3)]" />
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-black text-lg md:text-xl text-white tracking-tight leading-none mb-1">{brandAr}</span>
              <span className="font-black text-[13px] md:text-[15px] text-[#FF6B35] leading-[1.1] tracking-wide">
                {enLine1}{enLine2 ? <><br />{enLine2}</> : null}
              </span>
            </div>
          </Link>

          {/* Middle: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-bold text-gray-300">
            <Link href="/" className="hover:text-[#FF6B35] transition-colors">الرئيسية</Link>
            <Link href="/#products" className="hover:text-[#FF6B35] transition-colors">المعدات</Link>
            <Link href="/#about" className="hover:text-[#FF6B35] transition-colors">من نحن</Link>
            <Link href="/contact" className="hover:text-[#FF6B35] transition-colors">تواصل معنا</Link>
          </nav>
          
          {/* Left side: Cart & Mobile Menu */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-300 hover:text-[#FF6B35] transition-colors relative"
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={2} />
              {count > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#FF6B35] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 -ml-2 text-gray-300 hover:text-[#FF6B35] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" strokeWidth={2} /> : <Menu className="w-7 h-7" strokeWidth={2} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0B1B3D] border-t border-[#1A365D] py-4 px-4 shadow-lg absolute w-full left-0 top-[80px]">
            <nav className="flex flex-col gap-4 text-lg font-bold text-gray-300 text-center">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF6B35] py-2 border-b border-[#1A365D]">الرئيسية</Link>
              <Link href="/#products" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF6B35] py-2 border-b border-[#1A365D]">المعدات</Link>
              <Link href="/#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF6B35] py-2 border-b border-[#1A365D]">من نحن</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF6B35] py-2">تواصل معنا</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Announcement Bar (Dark/Gold) - Non-sticky, scrolls away */}
      <div className="bg-[#1A365D] text-white overflow-hidden h-12 md:h-14 flex items-center justify-center relative z-40 border-b border-[#FF6B35]/20">
        <div 
          key={announcementIndex}
          className="flex items-center justify-center gap-2 text-sm md:text-base font-medium animate-fade-up"
        >
          <span>{announcements[announcementIndex]?.text}</span>
          <CurrentIcon className="w-4 h-4 text-[#FF6B35]" />
        </div>
      </div>
    </>
  );
}
