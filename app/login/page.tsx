'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, ArrowRight, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getStoredData } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        router.push('/dashboard');
      }, 800);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-brand-purple-light dark:bg-brand-darkBg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-brand-darkCard rounded-3xl p-8 border border-slate-200 dark:border-brand-darkBorder shadow-xl space-y-6">
        
        {/* Brand Logo Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-brand-purple text-white flex items-center justify-center shadow-md shadow-brand-purple/20">
              <Compass className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-brand-navy dark:text-white">Wayfinder</span>
          </Link>
          <h1 className="text-2xl font-bold text-brand-navy dark:text-white">Welcome back</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Sign in to your study abroad readiness dashboard</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Login successful! Opening your dashboard...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-brand-purple dark:focus:border-brand-purple text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-brand-purple dark:focus:border-brand-purple text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white font-bold text-sm shadow-md shadow-brand-purple/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Quick Demo Access Button */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <Link
            href="/dashboard"
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            Instant Demo Sign In (Skip Credentials)
          </Link>
        </div>

        <div className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link href="/signup" className="text-brand-purple font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
