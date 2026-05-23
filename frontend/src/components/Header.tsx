"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, ShieldCheck, Truck, Handshake, Leaf } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

const ANNOUNCEMENTS = [
  {
    text: "علكات وقطرات مرخّصة من هيئة الغذاء والدواء (SFDA)",
    icon: ShieldCheck
  },
  {
    text: "الدفع عند الاستلام • شحن سريع لجميع مناطق قطر",
    icon: Truck
  },
  {
    text: "حلال 100% • ضمان 30 يوم (استرجاع كامل)",
    icon: Handshake
  }
];

export function Header() {
  const { getCartCount, setIsOpen } = useCartStore();
  const count = getCartCount();
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = ANNOUNCEMENTS[announcementIndex].icon;

  return (
    <>
      {/* Main Header (Dark) - Sticky on top */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#D4AF37]/10 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Right side: Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            {/* Logo Image */}
            <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform bg-white rounded-full p-1">
              <img src="/images/logo.webp" alt="Orenda Life Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
            </div>
            {/* Logo Text */}
            <div className="flex flex-col items-start">
              <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B8860B] tracking-tight leading-none mb-1">أوريندا الحياة</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase leading-none">Orenda Life</span>
            </div>
          </Link>

          {/* Middle: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-bold text-gray-300">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">الرئيسية</Link>
            <Link href="/#products" className="hover:text-[#D4AF37] transition-colors">المجموعة</Link>
            <Link href="/#about" className="hover:text-[#D4AF37] transition-colors">عن أوريندا</Link>
            <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">تواصل معنا</Link>
          </nav>
          
          {/* Left side: Cart & Mobile Menu */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-300 hover:text-[#D4AF37] transition-colors relative"
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={2} />
              {count > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0a0a0a] text-[10px] font-black rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 -ml-2 text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" strokeWidth={2} /> : <Menu className="w-7 h-7" strokeWidth={2} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#141414] border-t border-[#333333] py-4 px-4 shadow-lg absolute w-full left-0 top-[80px]">
            <nav className="flex flex-col gap-4 text-lg font-bold text-gray-300 text-center">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37] py-2 border-b border-[#333333]">الرئيسية</Link>
              <Link href="/#products" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37] py-2 border-b border-[#333333]">المجموعة</Link>
              <Link href="/#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37] py-2 border-b border-[#333333]">عن أوريندا</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37] py-2">تواصل معنا</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Announcement Bar (Dark/Gold) - Non-sticky, scrolls away */}
      <div className="bg-[#1a1a1a] text-[#F3E5AB] overflow-hidden h-10 flex items-center justify-center relative z-40 border-b border-[#D4AF37]/10">
        <div 
          key={announcementIndex}
          className="flex items-center justify-center gap-2 text-sm font-medium animate-fade-up"
        >
          <span>{ANNOUNCEMENTS[announcementIndex].text}</span>
          <CurrentIcon className="w-4 h-4 text-[#D4AF37]" />
        </div>
      </div>
    </>
  );
}
