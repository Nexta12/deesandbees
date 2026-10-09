"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, GraduationCap, Globe, CheckCircle } from "lucide-react";

const slides = [
  {
    id: 1,
    tagline: "International Education Agency",
    title: "Your Global Study Journey Starts Here",
    description:
      "Connect with premier universities in the United Kingdom, United States, Canada, Europe, and Australia.",
    primaryCta: { text: "Start Your Journey", href: "/contact" },
    secondaryCta: { text: "Explore Services", href: "/services" },
    image: "/assets/sliders/s1.jpg",
  },
  {
    id: 2,
    tagline: "Proven Admissions & Visa Success",
    title: "Turning Study Dreams Into Global Success",
    description:
      "From one-on-one academic counselling to visa compliance support — we make your study abroad process seamless and stress-free.",
    primaryCta: { text: "Explore Our Services", href: "/services" },
    secondaryCta: { text: "Talk to an Advisor", href: "/contact" },
    image: "/assets/sliders/s2.jpg",
  },
  {
    id: 3,
    tagline: "Limitless Academic Horizons",
    title: "Learn Without Limits, Grow Without Borders",
    description:
      "Join countless ambitious students achieving life-changing academic milestones through Dees & Bees Global Resources.",
    primaryCta: { text: "Discover Opportunities", href: "/about" },
    secondaryCta: { text: "Apply Today", href: "/contact" },
    image: "/assets/sliders/s3.jpg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[650px] md:h-[750px] w-full overflow-hidden bg-slate-950">
      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center scale-105 transition-transform duration-7000 ease-out"
              />
              {/* Rich gradient overlay for contrast and luxury look */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-900/40" />
            </div>

            {/* Slide Content */}
            <div className="absolute inset-0 flex items-center z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
                <div className="max-w-2xl space-y-6">
                  {/* Tagline */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs sm:text-sm font-semibold backdrop-blur-sm">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{slide.tagline}</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <Link
                      href={slide.primaryCta.href}
                      className="px-6 py-3.5 rounded-full font-bold text-sm sm:text-base bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2"
                    >
                      <span>{slide.primaryCta.text}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href={slide.secondaryCta.href}
                      className="px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all"
                    >
                      {slide.secondaryCta.text}
                    </Link>
                  </div>

                  {/* Quick trust metrics */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Certified Advisors</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-amber-400" />
                      <span>Top UK, US & Canada Unis</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Visa Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/60 hover:bg-amber-500 hover:text-slate-950 text-white backdrop-blur-md transition-all border border-white/10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/60 hover:bg-amber-500 hover:text-slate-950 text-white backdrop-blur-md transition-all border border-white/10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === current ? "w-8 h-2.5 bg-amber-400" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
