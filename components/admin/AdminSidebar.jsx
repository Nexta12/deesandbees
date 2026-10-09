"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  MessageSquareQuote,
  Globe,
  LogOut,
  ChevronRight,
  ShieldCheck,
  X,
} from "lucide-react";

export default function AdminSidebar({
  user,
  unreadCount = 0,
  onLogout,
  isOpenMobile,
  onCloseMobile,
  isCollapsed,
}) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "Messages",
      href: "/admin/messages",
      icon: MessageSquare,
      badge: unreadCount > 0 ? unreadCount : null,
      badgeColor: "bg-amber-500 text-slate-950",
    },
    {
      label: "Testimonials",
      href: "/admin/testimonials",
      icon: MessageSquareQuote,
      badge: null,
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: Users,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out
          ${
            isOpenMobile
              ? "translate-x-0 w-72"
              : "-translate-x-full lg:translate-x-0"
          }
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-800/80 bg-slate-950/40">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 overflow-hidden group"
          >
            <div className="relative w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-1 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="font-black text-slate-950 text-base tracking-tighter">
                D&B
              </span>
            </div>
            {!isCollapsed && (
              <div className="min-w-0 transition-opacity">
                <span className="block text-sm font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  Dees & Bees
                </span>
              </div>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
          {/* Main Menu */}
          <div>
            {!isCollapsed && (
              <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Menu
              </p>
            )}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    title={item.label}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                      isActive
                        ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 transition-colors ${
                        isActive
                          ? "text-slate-950"
                          : "text-slate-400 group-hover:text-amber-400"
                      }`}
                    />

                    {!isCollapsed && (
                      <span className="flex-1 truncate">{item.label}</span>
                    )}

                    {!isCollapsed && item.badge !== null && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                          isActive
                            ? "bg-slate-950 text-amber-400"
                            : item.badgeColor || "bg-amber-500 text-slate-950"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Card Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
          <div
            className={`flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800 ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 uppercase shadow">
                {user?.firstName?.[0] || user?.email?.[0] || "A"}
              </div>

              {!isCollapsed && (
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    {user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Administrator"}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {user?.email || ""}
                  </p>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button
                onClick={onLogout}
                title="Log Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
