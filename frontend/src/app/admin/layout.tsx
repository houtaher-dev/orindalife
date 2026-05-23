import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Orendalife",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" dir="ltr" style={{ direction: "ltr", textAlign: "left" }}>
      {children}
    </div>
  );
}
