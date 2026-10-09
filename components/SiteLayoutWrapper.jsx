"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[104px]">{children}</main>
      <Footer />
    </>
  );
}
