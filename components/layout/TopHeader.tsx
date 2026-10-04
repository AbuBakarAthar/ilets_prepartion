'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun, Flame, User, LogOut, Compass } from 'lucide-react';
import { getStoredData, clearAllStoredData } from '@/lib/store';
import { useRouter } from 'next/navigation';

export function TopHeader() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Check dark mode preference
    if (document.documentElement.classList.contains('dark')) {
      setDarkMode(true);
    }
    setUserData(getStoredData());
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  };

  const handleLogout = () => {
    clearAllStoredData();
    router.push('/login');
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-brand-darkBorder bg-white/80 dark:bg-brand-darkCard/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
      {/* Mobile Brand Title */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="w-8 h-8 rounded-lg bg-brand-purple text-white flex items-center justify-center">
          <Compass className="w-5 h-5" />
        </div>
        <span className="font-bold text-lg text-brand-navy dark:text-white">Wayfinder</span>
      </div>

      <div className="hidden md:block">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Target: {userData?.goal?.targetCountry || 'United Kingdom'} • {userData?.goal?.targetDegree || 'Postgraduate'}
        </h2>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-3">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs border border-amber-500/20">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          <span>{userData?.streak || 4} Day Streak</span>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 border-l border-slate-200 dark:border-brand-darkBorder pl-3">
          <Link
            href="/profile"
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-brand-purple/20 text-brand-purple dark:bg-purple-900/50 dark:text-purple-300 font-bold flex items-center justify-center text-sm">
              {userData?.profile?.name?.charAt(0) || 'H'}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-200">
              {userData?.profile?.name || 'Hamza'}
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
