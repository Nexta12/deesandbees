"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayoutClient({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const fetchSessionAndStats = useCallback(async () => {
    try {
      const meRes = await fetch("/api/auth/me");
      if (!meRes.ok) {
        router.push("/login");
        return;
      }
      const meData = await meRes.json();
      if (!meData.authenticated) {
        router.push("/login");
        return;
      }
      setUser(meData.user);

      // Load unread contacts count for notifications and sidebar badge
      const contactRes = await fetch("/api/contact");
      if (contactRes.ok) {
        const contactData = await contactRes.json();
        const list = contactData.data || [];
        const unread = list.filter((c) => !c.isSeen).length;
        setUnreadCount(unread);
        setRecentEnquiries(list.slice(0, 5));
      }
    } catch (err) {
      console.error("AdminLayoutClient session check error:", err);
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    fetchSessionAndStats();
  }, [fetchSessionAndStats, pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Dedicated Admin Sidebar */}
      <AdminSidebar
        user={user}
        unreadCount={unreadCount}
        onLogout={handleLogout}
        isOpenMobile={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        isCollapsed={isCollapsed}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* Dedicated Admin Header */}
        <AdminHeader
          user={user}
          unreadCount={unreadCount}
          recentEnquiries={recentEnquiries}
          onLogout={handleLogout}
          onToggleMobileSidebar={() => setIsMobileOpen((prev) => !prev)}
          onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
          isCollapsed={isCollapsed}
        />

        {/* Admin Page Content - always rendered without being dropped */}
        <main className="flex-1 bg-slate-100 text-slate-900 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
