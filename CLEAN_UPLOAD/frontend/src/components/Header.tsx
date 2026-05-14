"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, ShieldCheck, Truck, Handshake, Leaf } from "lucide-react";
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

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = ANNOUNCEMENTS[announcementIndex].icon;

  return (
    <>
      {/* Main Header (White) - Sticky on top */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Right side: Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            {/* Logo Icon */}
            <div className="w-12 h-12 rounded-full border-2 border-[#134e4a] flex items-center justify-center bg-gradient-to-tr from-[#134e4a] to-[#0f3d3a] text-white shadow-sm relative overflow-hidden group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6" strokeWidth={1.5} />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#d4af37] rounded-full"></div>
            </div>
            {/* Logo Text */}
            <div className="flex flex-col items-start">
              <span className="font-black text-2xl text-gray-900 tracking-tight leading-none mb-1">أوريندا الحياة</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#d4af37] uppercase leading-none">Orenda Life</span>
            </div>
          </Link>

          {/* Middle: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-bold text-gray-800">
            <Link href="/" className="hover:text-[#134e4a] transition-colors">الرئيسية</Link>
            <Link href="/#products" className="hover:text-[#134e4a] transition-colors">المجموعة</Link>
            <Link href="/#about" className="hover:text-[#134e4a] transition-colors">عن أوريندا</Link>
            <Link href="/contact" className="hover:text-[#134e4a] transition-colors">تواصل معنا</Link>
          </nav>
          
          {/* Left side: Cart & Mobile Menu */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-800 hover:text-[#134e4a] transition-colors relative"
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={2} />
              {count > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#134e4a] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 -ml-2 text-gray-800 hover:text-[#134e4a] transition-colors">
              <Menu className="w-7 h-7" strokeWidth={2} />
            </button>
          </div>

        </div>
      </header>

      {/* Announcement Bar (Dark Green) - Non-sticky, scrolls away */}
      <div className="bg-[#134e4a] text-white overflow-hidden h-10 flex items-center justify-center relative z-40">
        <div 
          key={announcementIndex}
          className="flex items-center justify-center gap-2 text-sm font-medium animate-fade-up"
        >
          <span>{ANNOUNCEMENTS[announcementIndex].text}</span>
          <CurrentIcon className="w-4 h-4 text-white/90" />
        </div>
      </div>
    </>
  );
}
