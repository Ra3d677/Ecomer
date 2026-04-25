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
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuthStore();
  
  const redirectUrl = searchParams.get("redirect") || "/shop";

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        setUser({
          uid: data.user.id,
          email: data.user.email || "",
          displayName: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || "User",
          photoURL: null
        });
        router.push(redirectUrl);
      }
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px]">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-100 mb-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 text-sm mt-2">Please enter your details to sign in</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-xs mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-slate-700">Password</label>
              <Link href="/forgot-password" size="sm" className="text-xs font-bold text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link href="/register" className="font-bold text-slate-900 hover:underline">
          Create account
        </Link>
      </p>
    </div>
  );
}
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
