import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import FAQAccordion from "@/components/FAQAccordion";
import TestimonialsSection from "@/components/TestimonialsSection";
import {
  GraduationCap,
  Compass,
  FileCheck2,
  Plane,
  Globe2,
  ShieldCheck,
  HeartHandshake,
  Lightbulb,
  ArrowRight,
  BookOpen,
  MapPin,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  const coreServices = [
    {
      icon: GraduationCap,
      title: "Student Recruitment & Admissions",
      desc: "Comprehensive guidance in choosing the ideal universities, preparing applications, and securing official offers.",
      href: "/services",
    },
    {
      icon: FileCheck2,
      title: "Visa Guidance & Compliance",
      desc: "Step-by-step visa application support, mock interview sessions, and strict compliance with UKVI and global regulations.",
      href: "/services",
    },
    {
      icon: Plane,
      title: "Pre-Departure & Settlement",
      desc: "Pre-departure briefings, accommodation search, airport reception guidance, and on-ground pastoral welfare checks.",
      href: "/services",
    },
    {
      icon: Globe2,
      title: "Global Institutional Collaboration",
      desc: "Forging strong direct partnerships with world-renowned universities and colleges across 5 continents.",
      href: "/services",
    },
  ];

  const destinations = [
    { name: "United Kingdom", flag: "🇬🇧", desc: "Top Russell Group universities & vibrant multicultural campuses." },
    { name: "Canada", flag: "🇨🇦", desc: "World-class education with progressive post-graduate work pathways." },
    { name: "United States", flag: "🇺🇸", desc: "Diverse academic majors and generous research opportunities." },
    { name: "Australia", flag: "🇦🇺", desc: "High quality of life, top global ranking universities and student support." },
    { name: "Europe", flag: "🇪🇺", desc: "Affordable tuition, rich historical culture, and English-taught programs." },
  ];

  const whyChooseUs = [
    {
      icon: ShieldCheck,
      title: "Trusted Guidance",
      desc: "Honest, transparent, and ethical advisory backed by accredited international education credentials.",
    },
    {
      icon: Lightbulb,
      title: "Innovation & Speed",
      desc: "Streamlined digital application tracking, timely document evaluations, and prompt admissions turnaround.",
    },
    {
      icon: HeartHandshake,
      title: "Student-Centered Care",
      desc: "Every recommendation puts the student's unique academic passions, budget, and long-term career first.",
    },
  ];

  return (
    <div>
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Who We Are / Brief Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image Box */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[420px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <Image
                  src="/assets/sliders/a1.jpg"
                  alt="Dees and Bees Education Counseling"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 text-slate-900 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                      ★
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Official Admissions Partner</h4>
                      <p className="text-xs text-slate-600">Connecting talent with global opportunities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Box */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <span>Who We Are</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Dees & Bees Global Resources
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Empowering minds and connecting futures — at <strong>Dees & Bees Global</strong>, we guide ambitious students toward world-class education opportunities across the UK, Europe, the US, Canada, and Australia.
              </p>

              <p className="text-slate-600 text-base leading-relaxed">
                With integrity, innovation, and personalized care, we simplify the path to global learning and lifelong success. From initial university shortlisting to pre-departure settlement, our dedicated counselors stand beside you at every milestone.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-sm text-slate-700 font-semibold">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>100% Free Initial Assessment</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-700 font-semibold">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>End-to-End Visa Interview Prep</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-700 font-semibold">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Direct University Placements</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-700 font-semibold">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Personalized Academic Pathway</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="px-6 py-3.5 rounded-full font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center gap-2 shadow-md"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-full font-semibold text-sm border border-slate-300 hover:border-amber-500 hover:text-amber-600 text-slate-700 transition-all"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Services Showcase */}
      <section className="py-24 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Dedicated Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Core Services
            </h2>
            <p className="text-slate-600 text-base">
              Tailored international educational services designed to navigate your entire study abroad journey smoothly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      <span>Learn Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Global Study Destinations */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              Global Reach
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Study In Top World Destinations
            </h2>
            <p className="text-slate-400 text-base">
              We partner directly with leading institutions across top educational destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {destinations.map((dest, i) => (
              <div
                key={i}
                className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-all hover:bg-slate-900 group"
              >
                <div className="text-4xl mb-4">{dest.flag}</div>
                <h3 className="font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {dest.name}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {dest.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">
              Our Value Proposition
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Students Choose Us
            </h2>
            <p className="text-slate-600 text-base">
              Experience the difference of working with education advisors who care deeply about your future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 hover:border-amber-400/50 hover:bg-white hover:shadow-xl transition-all duration-300 text-center space-y-4"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <TestimonialsSection />

      {/* 7. FAQs */}
      <FAQAccordion />

      {/* 8. Final Call to Action */}
      <section className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto">
            Ready to Begin Your Global Academic Journey?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join hundreds of successful international students already studying in the UK, Canada, US, Europe, and Australia with our expert guidance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full font-bold text-base bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xl shadow-amber-500/25 transition-all flex items-center gap-2"
            >
              <span>Submit Your Application Enquiry</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="https://wa.me/2347069223328?text=Hello%20Dees%20%26%20Bees%20team%2C%20I%20am%20ready%20to%20start%20my%20application."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-semibold text-base text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
