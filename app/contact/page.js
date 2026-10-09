import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Dees & Bees Global",
  description:
    "Reach out to Dees & Bees Global Resources for expert international study counseling, admissions guidance, and visa support.",
};

export default function ContactPage() {
  return (
    <div>
      {/* 1. Header Banner */}
      <section className="relative py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/sliders/b5.jpg"
            alt="Contact Dees and Bees"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <span>Connect With Our Team</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Contact Dees & Bees Global
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Your journey matters to us. Reach out for expert advice, support, or partnership opportunities — we’re always ready to guide you toward your academic goals.
          </p>
        </div>
      </section>

      {/* 2. Interactive Contact Form & Details Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
