"use client";

import { useState, useEffect } from "react";
import {
  Star,
  Quote,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  Loader2,
  Check,
  AlertCircle,
  X,
  MessageSquareHeart,
  Globe,
} from "lucide-react";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    country: "",
    rating: 5,
    message: "",
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.testimonials || []);
      }
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const showToast = (message, type = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create testimonial.");
      }

      setTestimonials((prev) => [data.testimonial, ...prev]);
      setIsAddModalOpen(false);
      setFormData({
        fullName: "",
        title: "",
        country: "",
        rating: 5,
        message: "",
      });
      showToast("Testimonial added successfully!");
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      fullName: item.fullName || "",
      title: item.title || "",
      country: item.country || "",
      rating: item.rating || 5,
      message: item.message || "",
    });
    setFormError("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    setFormLoading(true);
    setFormError("");

    try {
      const res = await fetch(`/api/testimonials/${editingItem._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update testimonial.");
      }

      setTestimonials((prev) =>
        prev.map((t) => (t._id === editingItem._id ? data.testimonial : t))
      );
      setEditingItem(null);
      showToast("Testimonial updated successfully!");
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    setFormLoading(true);

    try {
      const res = await fetch(`/api/testimonials/${deletingItem._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete testimonial.");
      }

      setTestimonials((prev) => prev.filter((t) => t._id !== deletingItem._id));
      setDeletingItem(null);
      showToast("Testimonial deleted successfully!");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        <p className="text-sm text-slate-500 font-medium">Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`fixed bottom-6 right-6 z-50 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border animate-in fade-in slide-in-from-bottom-2 ${
            feedback.type === "error"
              ? "bg-rose-900 border-rose-700"
              : "bg-slate-900 border-slate-700"
          }`}
        >
          {feedback.type === "error" ? (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          ) : (
            <Check className="w-4 h-4 text-emerald-400" />
          )}
          <span className="text-xs font-semibold">{feedback.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold uppercase tracking-wider">
              Homepage Social Proof
            </span>
            <span className="text-xs text-slate-400">
              Active: {testimonials.length}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Student Testimonials
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage student success stories displayed on the homepage.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchTestimonials}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => {
              setFormData({
                fullName: "",
                title: "",
                country: "",
                rating: 5,
                message: "",
              });
              setFormError("");
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
          >
            <div>
              {/* Rating stars & Action buttons */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingItem(t)}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="font-bold text-slate-900 text-base mb-1">
                {t.title || "Study Abroad Success"}
              </h4>

              <p className="text-slate-600 text-xs leading-relaxed line-clamp-4 italic bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2 mb-4">
                &ldquo;{t.message}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center uppercase shadow-sm">
                  {t.fullName ? t.fullName.charAt(0) : "S"}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">{t.fullName}</h5>
                  <p className="text-[11px] text-slate-400">{t.country || "International Student"}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 text-slate-500">
          <MessageSquareHeart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-800 text-base">No testimonials yet</h4>
          <p className="text-xs text-slate-500 mt-1">
            Click &ldquo;Add Testimonial&rdquo; above to create one.
          </p>
        </div>
      )}

      {/* MODAL 1: ADD TESTIMONIAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  Add Testimonial
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="e.g. Jessica John"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Headline / Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. Smooth Admission Process"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Country / Destination
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    placeholder="e.g. United Kingdom"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Rating (1 to 5 Stars)
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500 bg-white"
                >
                  <option value={5}>5 Stars (Excellent)</option>
                  <option value={4}>4 Stars (Very Good)</option>
                  <option value={3}>3 Stars (Good)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student Story / Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Share the student's review and experience with Dees & Bees..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-2"
                >
                  {formLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Testimonial</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT TESTIMONIAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Edit2 className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  Edit Testimonial
                </h3>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Headline / Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Country / Destination
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Rating (1 to 5 Stars)
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500 bg-white"
                >
                  <option value={5}>5 Stars (Excellent)</option>
                  <option value={4}>4 Stars (Very Good)</option>
                  <option value={3}>3 Stars (Good)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student Story / Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow flex items-center gap-2"
                >
                  {formLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DELETE CONFIRMATION */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                Delete Testimonial?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove the testimonial from{" "}
                <span className="font-bold text-slate-800">
                  {deletingItem.fullName}
                </span>
                ? It will be removed from the homepage.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={formLoading}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow flex items-center justify-center gap-2"
              >
                {formLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
