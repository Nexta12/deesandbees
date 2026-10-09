"use client";

import { useState } from "react";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
} from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit enquiry.");
      }

      setStatus({
        type: "success",
        message: data.message || "Thank you! Your enquiry has been received.",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Contact Form Card */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50">
        <div className="mb-8">
          <span className="text-amber-600 font-semibold text-xs tracking-wider uppercase">
            Start Your Application
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Send Us an Enquiry
          </h3>
          <p className="text-slate-600 text-sm mt-2">
            Have questions about admissions, universities, or student visas? Fill out the form below and an advisor will contact you within 24 hours.
          </p>
        </div>

        {status.message && (
          <div
            className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm ${
              status.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-medium">{status.message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm transition-all bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm transition-all bg-slate-50/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 800 000 0000"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm transition-all bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Your City / Location
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Lagos, Nigeria"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm transition-all bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Study Programme & Goals <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="More details..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm transition-all bg-slate-50/50 resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Enquiry</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Direct Contact Cards */}
      <div className="lg:col-span-5 space-y-6">
        {/* Call Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xl font-bold">Call an Advisor Directly</h4>
            <p className="text-slate-400 text-sm mt-1">
              Speak directly with an education counselor for urgent advisory and course guidance.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <a
              href="tel:+2347069223328"
              className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-amber-400">Nigeria Office</span>
                <span className="text-slate-300">+234 706 922 3328</span>
              </div>
              <Phone className="w-4 h-4 text-amber-400" />
            </a>

            <a
              href="tel:+447359641827"
              className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-amber-400">United Kingdom</span>
                <span className="text-slate-300">+44 735 964 1827</span>
              </div>
              <Phone className="w-4 h-4 text-amber-400" />
            </a>
          </div>
        </div>


        {/* Office Hours */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-sm">
            <div className="font-bold text-slate-900">Advisory Hours</div>
            <div className="text-slate-500">Monday – Friday: 9:00 AM – 5:00 PM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
