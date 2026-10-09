"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Mail,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // Mode: "login" | "forgot" | "reset"
  const [mode, setMode] = useState("login");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetData, setResetData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials.");
      }

      setFeedback({ type: "success", message: "Login successful! Redirecting to dashboard..." });
      setTimeout(() => {
        router.push("/admin/dashboard");
        router.refresh();
      }, 1000);
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password (request OTP)
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to dispatch reset code.");
      }

      setResetData((prev) => ({ ...prev, email: forgotEmail }));
      setMode("reset");
      setFeedback({ type: "success", message: data.message });
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Handle Reset Password (verify OTP & new pass)
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resetData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update password.");
      }

      setFeedback({ type: "success", message: "Password updated! You can now log in." });
      setMode("login");
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-8">
        {/* Brand header */}
        <div className="text-center space-y-3">
          <div className="relative w-44 h-12 mx-auto">
            <Image
              src="/assets/Logo.png"
              alt="Dees & Bees Global"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {mode === "login" && "Login"}
            {mode === "forgot" && "Reset Your Password"}
            {mode === "reset" && "Enter Verification Code"}
          </h2>
        
        </div>

        {/* Feedback Alert */}
        {feedback.message && (
          <div
            className={`p-4 rounded-xl flex items-start gap-3 text-sm ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <p className="font-medium">{feedback.message}</p>
          </div>
        )}

        {/* MODE 1: LOGIN */}
        {mode === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="email"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm bg-slate-50/50 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setFeedback({ type: "", message: "" });
                    setMode("forgot");
                  }}
                  className="text-xs text-amber-600 hover:text-amber-700 font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm bg-slate-50/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* MODE 2: FORGOT PASSWORD */}
        {mode === "forgot" && (
          <form onSubmit={handleForgotSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Registered Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm bg-slate-50/50 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Dispatching Code...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Send Reset Code</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setFeedback({ type: "", message: "" });
                setMode("login");
              }}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              Back to Login
            </button>
          </form>
        )}

        {/* MODE 3: RESET PASSWORD */}
        {mode === "reset" && (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                6-Digit OTP Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={resetData.otp}
                onChange={(e) => setResetData({ ...resetData, otp: e.target.value })}
                placeholder="123456"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-center font-mono tracking-widest text-lg bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showResetPassword ? "text" : "password"}
                  required
                  value={resetData.password}
                  onChange={(e) => setResetData({ ...resetData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowResetPassword(!showResetPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg focus:outline-none"
                  aria-label={showResetPassword ? "Hide password" : "Show password"}
                  title={showResetPassword ? "Hide password" : "Show password"}
                >
                  {showResetPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={resetData.confirmPassword}
                  onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg focus:outline-none"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  title={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Update Password & Log In</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setFeedback({ type: "", message: "" });
                setMode("login");
              }}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              Cancel and Return
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
