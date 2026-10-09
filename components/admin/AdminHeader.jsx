"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  ExternalLink,
  ChevronDown,
  User as UserIcon,
  LogOut,
  Mail,
  Shield,
  Search,
  Sparkles,
  Users,
  MessageSquare,
} from "lucide-react";

export default function AdminHeader({
  user,
  unreadCount = 0,
  recentEnquiries = [],
  onLogout,
  onToggleMobileSidebar,
  onToggleCollapse,
  isCollapsed,
}) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    if (pathname.includes("/admin/dashboard")) return "Dashboard";
    if (pathname.includes("/admin/messages")) return "Messages";
    if (pathname.includes("/admin/testimonials")) return "Testimonials";
    if (pathname.includes("/admin/users")) return "Users";
    return "Admin";
  };

  return (
    <header className="sticky top-0 z-30 h-20 bg-slate-900 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-sm">
      {/* Left: Sidebar Toggle & Page Title */}
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Toggle Mobile Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb & Section Name */}
        <div>
         
          <h1 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Right: Status Pill, Notifications & User Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
       

        {/* View Live Website Button */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
        </Link>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Notifications</h4>
                  <p className="text-xs text-slate-400">
                    {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
                  </p>
                </div>
                <Link
                  href="/admin/messages"
                  onClick={() => setNotifOpen(false)}
                  className="text-xs text-amber-400 hover:underline font-semibold"
                >
                  View All
                </Link>
              </div>

              <div className="max-h-64 overflow-y-auto divide-y divide-slate-800/60">
                {recentEnquiries && recentEnquiries.length > 0 ? (
                  recentEnquiries.slice(0, 4).map((enq) => (
                    <Link
                      key={enq._id}
                      href="/admin/messages"
                      onClick={() => setNotifOpen(false)}
                      className="block p-3 hover:bg-slate-800/60 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                        <span className="truncate max-w-[180px]">{enq.fullName}</span>
                        {!enq.isSeen && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-400">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-1">
                        {enq.message}
                      </p>
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        {new Date(enq.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No new enquiries at this time
                  </div>
                )}
              </div>

              <div className="px-4 pt-2 border-t border-slate-800">
                <Link
                  href="/admin/messages"
                  onClick={() => setNotifOpen(false)}
                  className="block text-center text-xs font-bold text-amber-400 py-1 hover:underline"
                >
                  Manage all enquiries &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 transition-all text-left"
            aria-label="User menu"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 uppercase shadow">
              {user?.firstName?.[0] || user?.email?.[0] || "A"}
            </div>
            <div className="hidden sm:block">
              <span className="block text-xs font-bold text-white leading-tight">
                {user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Admin"}
              </span>
              <span className="block text-[10px] text-amber-400 font-semibold uppercase tracking-wider leading-none">
                {user?.role || "Admin"}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3 border-b border-slate-800">
                <p className="text-xs text-slate-400">Signed in as</p>
                <p className="text-sm font-bold text-white truncate mt-0.5">
                  {user?.email || ""}
                </p>
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-extrabold uppercase">
                  {user?.role || "admin"} Access
                </span>
              </div>

              <div className="py-1">
                <Link
                  href="/admin/users"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Manage Users</span>
                </Link>

                <Link
                  href="/admin/messages"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>Messages & Enquiries</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-800">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
