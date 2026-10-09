"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  ShieldAlert,
  CheckCircle,
  RefreshCw,
  ArrowRight,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  ShieldCheck,
  UserPlus,
  Loader2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [contacts, setContacts] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Enquiries
      const contactRes = await fetch("/api/contact");
      if (contactRes.ok) {
        const contactData = await contactRes.json();
        setContacts(contactData.data || []);
      }

      // 2. Fetch User Count
      const userRes = await fetch("/api/users");
      if (userRes.ok) {
        const userData = await userRes.json();
        setUserCount(userData.total || 0);
      }
    } catch (err) {
      console.error("Dashboard load failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const unreadCount = contacts.filter((c) => !c.isSeen).length;
  const recentContacts = contacts.slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        <p className="text-sm text-slate-500 font-medium">Refreshing dashboard metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
             Overview
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage student study abroad enquiries and administrative accounts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <span>Refresh</span>
          </button>
          <Link
            href="/admin/messages"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>View Enquiries</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Manage Users</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Enquiries */}
        <Link
          href="/admin/messages"
          className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Enquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-900 mt-3">{contacts.length}</h3>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
            <span>Open messages menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </p>
        </Link>

        {/* Unread Messages */}
        <Link
          href="/admin/messages"
          className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-300 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Pending / Unread
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-amber-600 mt-3">{unreadCount}</h3>
          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1 font-semibold">
            <span>Requires response</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </p>
        </Link>

        {/* Reviewed Applications */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Reviewed
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-emerald-600 mt-3">
            {contacts.length - unreadCount}
          </h3>
          <p className="text-xs text-slate-500 mt-2">Processed submissions</p>
        </div>

        {/* System Users */}
        <Link
          href="/admin/users"
          className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Admin Users
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-900 mt-3">{userCount}</h3>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 group-hover:text-purple-600 transition-colors">
            <span>Manage team roles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </p>
        </Link>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Messages Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-7 text-white flex flex-col justify-between shadow-lg shadow-slate-900/10">
          <div>
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <MessageSquare className="w-5 h-5" />
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-xs font-bold text-slate-300 border border-slate-700">
                {unreadCount} Unread
              </span>
            </div>
            <h3 className="text-xl font-bold mt-4">Messages & Enquiries Menu</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Review incoming student contact queries, examine student study goals, filter by unread status, and directly reply via WhatsApp or Email.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-700/60">
            <Link
              href="/admin/messages"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 group"
            >
              <span>Go to Messages Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* User Management Card */}
        <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <Users className="w-5 h-5" />
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                Team Access
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-4">
              User Management Menu
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Create and manage administrative and staff accounts with customized access roles: Admin, Editor, or User. Control login credentials securely.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-amber-600 group"
            >
              <span>Go to User Management</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Enquiries Preview Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Student Enquiries</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest inquiries received from international students
            </p>
          </div>
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700"
          >
            <span>View All ({contacts.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentContacts.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <MessageSquare className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold">No enquiries submitted yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentContacts.map((contact) => (
              <div
                key={contact._id}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 -mx-4 px-4 rounded-xl transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 uppercase">
                    {contact.fullName?.[0] || "S"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{contact.fullName}</h4>
                      {!contact.isSeen && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{contact.email}</p>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1 max-w-xl">
                      {contact.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 self-end md:self-center">
                  <span className="text-[11px] text-slate-400">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    href="/admin/messages"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
