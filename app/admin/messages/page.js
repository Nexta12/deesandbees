"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ShieldAlert,
  RefreshCw,
  Loader2,
  Filter,
  Check,
  X,
} from "lucide-react";

export default function MessagesManagementPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // "all" | "unread" | "reviewed"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        const list = data.data || [];
        setContacts(list);
        if (selectedContact) {
          const updated = list.find((c) => c._id === selectedContact._id);
          if (updated) setSelectedContact(updated);
        }
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const markAsSeen = async (id, seenState = true) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSeen: seenState }),
      });
      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c._id === id ? { ...c, isSeen: seenState } : c))
        );
        if (selectedContact?._id === id) {
          setSelectedContact((prev) => ({ ...prev, isSeen: seenState }));
        }
        showFeedback(seenState ? "Marked as reviewed" : "Marked as unread");
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (!confirm("Are you sure you want to delete this enquiry? This action cannot be undone.")) {
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
        if (selectedContact?._id === id) {
          setSelectedContact(null);
        }
        showFeedback("Enquiry deleted successfully");
      }
    } catch (err) {
      console.error("Failed to delete contact:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const filteredContacts = contacts.filter((c) => {
    let matchesStatus = true;
    if (filter === "unread") matchesStatus = !c.isSeen;
    if (filter === "reviewed") matchesStatus = c.isSeen;

    const term = searchTerm.toLowerCase();
    const matchesSearch =
      c.fullName.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      (c.phone && c.phone.toLowerCase().includes(term)) ||
      (c.address && c.address.toLowerCase().includes(term)) ||
      c.message.toLowerCase().includes(term);

    return matchesStatus && matchesSearch;
  });

  const unreadCount = contacts.filter((c) => !c.isSeen).length;
  const reviewedCount = contacts.length - unreadCount;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        <p className="text-sm text-slate-500 font-medium">Loading messages & enquiries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedback && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">{feedback}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
         
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Messages
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Review admissions requests, student consultations, and study abroad queries.
          </p>
        </div>

        <button
          onClick={fetchContacts}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors self-start md:self-auto"
        >
          <RefreshCw className="w-4 h-4 text-slate-500" />
          <span>Refresh Inbox</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === "all"
                ? "bg-slate-900 text-white shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Messages ({contacts.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              filter === "unread"
                ? "bg-amber-500 text-slate-950 shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Unread ({unreadCount})</span>
          </button>
          <button
            onClick={() => setFilter("reviewed")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              filter === "reviewed"
                ? "bg-emerald-600 text-white shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Reviewed ({reviewedCount})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student, email, city..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Two Column Layout: Inbox List and Message Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List Column */}
        <div
          className={`${
            selectedContact ? "lg:col-span-6" : "lg:col-span-12"
          } space-y-3`}
        >
          {filteredContacts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 text-slate-500">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="font-bold text-slate-800 text-base">No messages found</h4>
              <p className="text-xs text-slate-500 mt-1">
                {searchTerm
                  ? "Try adjusting your search criteria."
                  : "No enquiries matching the selected filter."}
              </p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => {
                  setSelectedContact(contact);
                  if (!contact.isSeen) markAsSeen(contact._id, true);
                }}
                className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all hover:shadow-md ${
                  selectedContact?._id === contact._id
                    ? "border-amber-500 ring-2 ring-amber-500/10 shadow-sm bg-amber-50/20"
                    : "border-slate-200/80"
                } ${!contact.isSeen ? "border-l-4 border-l-amber-500" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-black text-xs flex items-center justify-center shrink-0 uppercase">
                      {contact.fullName?.[0] || "S"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">
                          {contact.fullName}
                        </h4>
                        {!contact.isSeen ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase">
                            New
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                            Reviewed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{contact.email}</p>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400 shrink-0">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mt-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {contact.message}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 truncate">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{contact.phone || "No Phone"}</span>
                  </span>
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{contact.address || "Unspecified"}</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Details Preview Pane */}
        {selectedContact && (
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm sticky top-28 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-base flex items-center justify-center uppercase shadow">
                  {selectedContact.fullName?.[0] || "S"}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    {selectedContact.fullName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Received on {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => deleteContact(selectedContact._id)}
                  disabled={actionLoading}
                  className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                  title="Delete Enquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold"
                  title="Close preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Student Info Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Email Address:</span>
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="font-semibold text-amber-600 hover:underline break-all"
                >
                  {selectedContact.email}
                </a>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Phone Number:</span>
                <a
                  href={`tel:${selectedContact.phone}`}
                  className="font-semibold text-slate-800 hover:underline"
                >
                  {selectedContact.phone || "N/A"}
                </a>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2">
                <span className="text-slate-400 block mb-1">City / Country of Residence:</span>
                <span className="font-semibold text-slate-800">
                  {selectedContact.address || "Not specified"}
                </span>
              </div>
            </div>

            {/* Full Enquiry Message */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Student Enquiry & Goals:
              </h4>
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedContact.message}
              </div>
            </div>

            {/* Status Toggle & Quick Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => markAsSeen(selectedContact._id, !selectedContact.isSeen)}
                disabled={actionLoading}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                {selectedContact.isSeen ? (
                  <>
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    <span>Mark as Unread</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Mark as Reviewed</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${selectedContact.email}?subject=Study Abroad Admissions Guidance - Dees %26 Bees Global&body=Hello ${encodeURIComponent(
                  selectedContact.fullName
                )},%0D%0A%0D%0AThank you for contacting Dees and Bees Global Resources regarding your study abroad plans.`}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Reply by Email</span>
              </a>

              {selectedContact.phone && (
                <a
                  href={`https://wa.me/${selectedContact.phone.replace(
                    /[^\d]/g,
                    ""
                  )}?text=Hello%20${encodeURIComponent(
                    selectedContact.fullName
                  )}%2C%20this%20is%20Dees%20%26%20Bees%20Global%20regarding%20your%20study%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
