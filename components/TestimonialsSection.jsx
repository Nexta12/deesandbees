"use client";

import { useState, useEffect } from "react";
import { Star, Quote, GraduationCap } from "lucide-react";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.testimonials) {
          setTestimonials(data.testimonials);
        }
      })
      .catch((err) => console.error("Error loading testimonials:", err));
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Students Say
          </h2>
          <p className="text-slate-600 text-base">
            Read firsthand accounts from ambitious students who achieved their dream of studying in world-leading universities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={t._id || index}
              className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-amber-200 mb-2" />

                <h4 className="font-bold text-slate-900 text-base mb-2">
                  {t.title || "Study Abroad Success"}
                </h4>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.message}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-sm shadow-sm">
                  {t.fullName ? t.fullName.charAt(0) : "S"}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">{t.fullName}</h5>
                  <p className="text-xs text-slate-500">{t.country || "International Student"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
