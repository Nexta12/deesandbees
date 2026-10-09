"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  Menu,
  X,
  ExternalLink,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  MessageCircle,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check user auth session
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar for contact & webmail */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="tel:+2347069223328"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>NG: +234 706 922 3328</span>
            </a>
            <a
              href="tel:+447359641827"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>UK: +44 735 964 1827</span>
            </a>
            <a
              href="mailto:info@deesandbeesglobal.com"
              className="hidden md:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>info@deesandbeesglobal.com</span>
            </a>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a
              href="https://wa.me/2347069223328?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20studying%20abroad."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 text-slate-900 border-b border-slate-100"
            : "bg-white/90 backdrop-blur-sm py-4 text-slate-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-44 h-12">
              <Image
                src="/assets/Logo.png"
                alt="Dees & Bees Global Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 hover:text-amber-600 ${
                    isActive ? "text-amber-600 font-bold" : "text-slate-700"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-600" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-amber-600 transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

          
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium ${
                    isActive
                      ? "bg-amber-50 text-amber-600 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-slate-800 bg-slate-50"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-600" />
                    <span>Admin Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-rose-600 hover:bg-rose-50 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
