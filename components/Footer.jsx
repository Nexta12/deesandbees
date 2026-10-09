"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  ExternalLink,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { useState, useEffect } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="relative w-48 h-14 bg-white/5 p-2 rounded-lg border border-white/10">
              <Image
                src="/assets/Logo.png"
                alt="Dees & Bees Global"
                fill
                className="object-contain p-1"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering students to achieve global academic excellence. Connecting ambitious learners
              with top universities across the UK, US, Canada, Europe, and Australia.
            </p>
          
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Contact Channels</span>
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-semibold min-w-10">NG:</span>
                <a href="tel:+2347069223328" className="hover:text-amber-400 transition-colors">
                  +234 706 922 3328
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-semibold min-w-10">UK:</span>
                <a href="tel:+447359641827" className="hover:text-amber-400 transition-colors">
                  +44 735 964 1827
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="mailto:info@deesandbeesglobal.com"
                  className="hover:text-amber-400 transition-colors truncate"
                >
                  info@deesandbeesglobal.com
                </a>
              </li>
            
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-amber-400" />
              <span>Quick Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
           
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>Contact Us</span>
                </Link>
              </li>
           
              <li>
                <a
                  href="https://mail.hostinger.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-400"
                >
                  <span>Staff Webmail</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Trust */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Operating Hours</span>
            </h4>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Monday – Friday</span>
                <span className="text-amber-400 font-semibold">9:00 AM – 5:00 PM</span>
              </div>
            
            </div>


          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Dees & Bees Global Resources. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-400 transition-colors">
              Privacy & Ethics
            </Link>
            <Link href="/services" className="hover:text-slate-400 transition-colors">
              Admissions Policy
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Support Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
