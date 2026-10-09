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
  ArrowLeft,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // Mode: "login" | "forgot" | "otp" | "newPassword"
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
  const [resending, setResending] = useState(false);
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
        throw new Error(data.error || data.message || "Invalid credentials.");
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

  // Step 1: Request OTP to email
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
        throw new Error(data.error || data.message || "Failed to dispatch reset code.");
      }

      setResetData((prev) => ({ ...prev, email: forgotEmail, otp: "" }));
      setMode("otp");
      setFeedback({ type: "success", message: data.message || "A 6-digit verification code has been dispatched." });
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    if (!resetData.otp || resetData.otp.trim().length < 6) {
      setFeedback({ type: "error", message: "Please enter the full 6-digit code." });
      return;
    }

    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetData.email, otp: resetData.otp }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || "Invalid verification code.");
      }

      setFeedback({ type: "success", message: "Code confirmed! Please create your new password." });
      setMode("newPassword");
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setResending(true);
    setFeedback({ type: "", message: "" });

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetData.email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to resend code.");
      }

      setFeedback({ type: "success", message: "A new verification code has been sent to your email." });
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setResending(false);
    }
  };

  // Step 3: Set New Password
  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (resetData.password !== resetData.confirmPassword) {
      setFeedback({ type: "error", message: "Passwords do not match." });
      return;
    }

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
        throw new Error(data.error || data.message || "Failed to update password.");
      }

      setFeedback({ type: "success", message: "Password updated successfully! You can now log in." });
      setLoginData((prev) => ({ ...prev, email: resetData.email, password: "" }));
      setMode("login");
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md mb-3 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1.5 px-3 rounded-xl hover:bg-slate-200/60"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to website</span>
        </Link>
      </div>

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
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {mode === "login" && "Login"}
              {mode === "forgot" && "Reset Your Password"}
              {mode === "otp" && "Enter Verification Code"}
              {mode === "newPassword" && "Create New Password"}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {mode === "login" && "Access your administrative dashboard"}
              {mode === "forgot" && "Enter your email to receive a 6-digit reset code"}
              {mode === "otp" && `Code sent to ${resetData.email || "your email"}`}
              {mode === "newPassword" && "Choose a strong password for your account"}
            </p>
          </div>
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
            <p className="font-medium text-xs sm:text-sm">{feedback.message}</p>
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
                  placeholder="admin@deesandbeesglobal.com"
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
                    setForgotEmail(loginData.email);
                    setMode("forgot");
                  }}
                  className="text-xs text-amber-600 hover:text-amber-700 font-semibold cursor-pointer"
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg focus:outline-none cursor-pointer"
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

        {/* MODE 2: FORGOT PASSWORD (Enter Email) */}
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
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
            >
              Back to Login
            </button>
          </form>
        )}

        {/* MODE 3: ENTER & VERIFY OTP */}
        {mode === "otp" && (
          <form onSubmit={handleVerifyOtpSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 text-center">
                6-Digit Verification Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                autoFocus
                value={resetData.otp}
                onChange={(e) => setResetData({ ...resetData, otp: e.target.value.replace(/\D/g, "") })}
                placeholder="123456"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none text-center font-mono tracking-widest text-2xl font-bold bg-slate-50/50"
              />
              <p className="text-[11px] text-slate-400 text-center mt-2">
                Check your inbox and spam folder for the one-time code.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || resetData.otp.length !== 6}
              className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Code</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resending}
                className="text-amber-600 hover:text-amber-700 font-semibold cursor-pointer disabled:opacity-50"
              >
                {resending ? "Sending..." : "Resend Code"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFeedback({ type: "", message: "" });
                  setMode("forgot");
                }}
                className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
              >
                Change Email
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setFeedback({ type: "", message: "" });
                setMode("login");
              }}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer pt-1"
            >
              Cancel and Return to Login
            </button>
          </form>
        )}

        {/* MODE 4: RESET PASSWORD (Revealed ONLY after successful OTP verification) */}
        {mode === "newPassword" && (
          <form onSubmit={handleResetSubmit} className="space-y-4">
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg focus:outline-none cursor-pointer"
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg focus:outline-none cursor-pointer"
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
                  <span>Save Password & Log In</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setFeedback({ type: "", message: "" });
                setMode("login");
              }}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer pt-1"
            >
              Cancel and Return to Login
            </button>
          </form>
        )}
      </div>

      <p className="text-[11px] text-slate-400 mt-6 text-center">
        © 2026 Dees & Bees Global • Authorized Access Only
      </p>
    </div>
  );
}
