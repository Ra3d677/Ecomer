"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Mail, ArrowRight, ShieldCheck, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuthStore();
  
  const redirectUrl = searchParams.get("redirect") || "/shop";

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({
          uid: user.id,
          email: user.email || "",
          displayName: user.user_metadata?.full_name || user.email?.split('@')[0] || "User",
          photoURL: null
        });
        router.push(redirectUrl);
      }
    };
    checkUser();
  }, [router, setUser, redirectUrl]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + "/auth/callback",
        },
      });
      
      if (error) throw error;
      
      setStep("otp");
      setMessage("Verification code sent to your email.");
    } catch (err: any) {
      setError(err.message || "Failed to send verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup', 
      });
      
      if (error) {
        const { data: retryData, error: retryError } = await supabase.auth.verifyOtp({
          email,
          token: otp,
          type: 'signin',
        });
        
        if (retryError) throw retryError;
        
        if (retryData.user) {
          handleSuccess(retryData.user);
        }
      } else if (data.user) {
        handleSuccess(data.user);
      }
    } catch (err: any) {
      setError(err.message || "Invalid or expired verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = (user: any) => {
    setUser({
      uid: user.id,
      email: user.email || "",
      displayName: user.user_metadata?.full_name || user.email?.split('@')[0] || "User",
      photoURL: null
    });
    router.push(redirectUrl);
  };

  return (
    <div className="w-full max-w-[350px]">
      {/* Main Card */}
      <div className="border border-slate-200 rounded-lg p-8 shadow-sm mb-6">
        <h1 className="text-2xl font-medium mb-1">
          {step === "email" ? "Sign in" : "Verify Email"}
        </h1>
        <p className="text-[10px] text-slate-400 mb-4 font-mono uppercase tracking-widest">v2.0 - Amazon Style</p>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 flex items-start gap-2">
            <span className="text-red-700 text-xs">{error}</span>
          </div>
        )}

        {message && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 flex items-start gap-2">
            <span className="text-blue-700 text-xs">{message}</span>
          </div>
        )}

        {step === "email" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-900 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-slate-400 rounded-md shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-400 hover:bg-orange-500 text-slate-900 py-1.5 rounded-md text-sm border border-orange-500 shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Continue"}
            </button>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              By continuing, you agree to Multo's <Link href="/terms" className="text-blue-700 hover:underline hover:text-orange-600">Conditions of Use</Link> and <Link href="/privacy" className="text-blue-700 hover:underline hover:text-orange-600">Privacy Notice</Link>.
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-xs font-bold text-slate-900 mb-1">
                Enter verification code
              </label>
              <input
                id="otp"
                type="text"
                required
                placeholder="6-digit code"
                className="w-full px-3 py-2 border border-slate-400 rounded-md shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm tracking-widest text-center font-bold"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <p className="text-[11px] text-slate-500 mt-2">
                We've sent a code to <span className="font-bold">{email}</span>. 
                <button 
                  type="button" 
                  onClick={() => setStep("email")}
                  className="text-blue-700 hover:underline ml-1"
                >
                  Change
                </button>
              </p>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-400 hover:bg-orange-500 text-slate-900 py-1.5 rounded-md text-sm border border-orange-500 shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Code"}
            </button>
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full text-xs text-slate-600 hover:underline py-2"
            >
              Resend Code
            </button>
          </form>
        )}
      </div>

      {/* New to Amazon section */}
      {step === "email" && (
        <div className="flex flex-col items-center w-full">
          <div className="relative w-full flex items-center justify-center mb-4">
            <div className="absolute inset-0 border-t border-slate-200"></div>
            <span className="relative bg-white px-2 text-xs text-slate-500">New to Multo?</span>
          </div>
          <Link 
            href="/register" 
            className="w-full border border-slate-300 rounded-md py-1.5 text-center text-sm shadow-sm hover:bg-slate-50 transition-colors"
          >
            Create your Multo account
          </Link>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-12 px-4">
      {/* Amazon Style Logo */}
      <Link href="/shop" className="mb-8">
        <h1 className="text-3xl font-black tracking-tighter text-slate-900 flex items-center gap-1">
          MULTO<span className="text-orange-500 text-4xl">.</span>
        </h1>
      </Link>

      <Suspense fallback={<Loader2 className="w-10 h-10 animate-spin text-orange-500" />}>
        <LoginContent />
      </Suspense>

      {/* Simple Footer */}
      <div className="mt-auto py-8 w-full border-t border-slate-100 flex flex-col items-center gap-4 bg-slate-50">
        <div className="flex gap-6 text-[11px] text-blue-700">
          <Link href="/terms" className="hover:underline">Conditions of Use</Link>
          <Link href="/privacy" className="hover:underline">Privacy Notice</Link>
          <Link href="/help" className="hover:underline">Help</Link>
        </div>
        <p className="text-[11px] text-slate-500">
          © 2026, Multo.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
}
