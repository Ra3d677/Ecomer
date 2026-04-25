"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, Mail, User, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: window.location.origin + "/auth/callback",
        },
      });
      
      if (error) throw error;
      
      if (data.user) {
        setSuccess(true);
        // If auto-confirm is off, they need to check email. 
        // If auto-confirm is on, they might be logged in already.
      }
    } catch (err: any) {
      setError(err.message || "Failed to create an account.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-[450px] text-center bg-white border border-slate-200 p-10 rounded-2xl shadow-xl shadow-slate-100">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Check your email</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            We've sent a confirmation link to <span className="font-bold text-slate-900">{email}</span>. 
            Please click the link to activate your account.
          </p>
          <Link 
            href="/login" 
            className="inline-block bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-12 px-4 pb-12">
      <Link href="/shop" className="mb-10">
        <h1 className="text-3xl font-black tracking-tighter text-slate-900">
          MULTO<span className="text-blue-600">.</span>
        </h1>
      </Link>

      <div className="w-full max-w-[450px]">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-100 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
            <p className="text-slate-500 text-sm mt-2">Join our premium community today</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-xs mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-start gap-2 py-2">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <p className="text-xs text-slate-500 leading-relaxed">
                By creating an account, I agree to the <Link href="/terms" className="text-blue-600 font-semibold">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 font-semibold">Privacy Policy</Link>.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-slate-900 hover:underline">
            Sign In
          </Link>
        </p>
      </div>

      <div className="mt-auto pt-12 flex items-center justify-center gap-6 text-[11px] text-slate-400 font-medium">
        <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Secure Payment</span>
        <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Verified Privacy</span>
        <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> 24/7 Support</span>
      </div>
    </div>
  );
}
