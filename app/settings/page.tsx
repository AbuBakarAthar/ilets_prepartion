'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { getStoredData, saveStoredData, clearAllStoredData } from '@/lib/store';
import { Settings, Clock, Moon, Trash2, LogOut, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const [dailyMinutes, setDailyMinutes] = useState(45);
  const [darkMode, setDarkMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const data = getStoredData();
    if (data.goal?.dailyStudyMinutes) {
      setDailyMinutes(data.goal.dailyStudyMinutes);
    }
    if (document.documentElement.classList.contains('dark')) {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  };

  const handleSaveDailyMinutes = () => {
    const data = getStoredData();
    const updatedGoal = { ...data.goal, dailyStudyMinutes: dailyMinutes };
    saveStoredData('goal', updatedGoal);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDeleteAllData = () => {
    clearAllStoredData();
    router.push('/');
  };

  const handleLogout = () => {
    clearAllStoredData();
    router.push('/login');
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>App Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white">
            Account & Preference Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Configure your daily study commitment, theme appearance, and data privacy options.
          </p>
        </div>

        {isSaved && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Study commitment saved! Planner will re-balance your daily tasks.</span>
          </div>
        )}

        {/* 1. Daily Minutes Commitment Setting */}
        <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-base font-extrabold text-brand-navy dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-purple" /> Daily Study Commitment
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adjust how many minutes your daily study planner allocates across weak skills.
              </p>
            </div>
            <span className="text-xs font-bold text-brand-purple bg-brand-purple/10 px-3 py-1 rounded-full">
              {dailyMinutes} Mins / Day
            </span>
          </div>

          <div className="space-y-3 pt-2">
            <input
              type="range"
              min="15"
              max="120"
              step="15"
              value={dailyMinutes}
              onChange={(e) => setDailyMinutes(Number(e.target.value))}
              className="w-full accent-brand-purple"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>15 min (Light)</span>
              <span>45 min (Standard)</span>
              <span>90 min (Intensive)</span>
              <span>120 min (Extreme)</span>
            </div>
          </div>

          <button
            onClick={handleSaveDailyMinutes}
            className="px-5 py-2.5 rounded-xl bg-brand-purple text-white font-bold text-xs hover:bg-brand-purple-hover transition-colors"
          >
            Save Target Commitment
          </button>
        </div>

        {/* 2. Theme & Visual Preferences */}
        <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-base font-extrabold text-brand-navy dark:text-white flex items-center gap-2">
              <Moon className="w-5 h-5 text-amber-500" /> Interface Theme Mode
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Toggle between high-contrast Light mode and WCAG AA Dark mode.
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-brand-purple transition-colors"
          >
            {darkMode ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
          </button>
        </div>

        {/* 3. Privacy, Data Reset & Danger Zone */}
        <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-rose-500/20 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-extrabold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" /> Data Privacy & Account Actions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              In accordance with safety guidelines, you can permanently erase all stored readiness profiles and test history.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white font-bold text-xs transition-colors flex items-center gap-2 border border-rose-500/20"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete All Data & Progress</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>

          {showDeleteConfirm && (
            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-3">
              <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400">
                ⚠️ Are you sure you want to permanently delete all your data?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                This action immediately purges your diagnostic scores, goal preferences, and study plan. It cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAllData}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700"
                >
                  Yes, Delete Everything Now
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </AppShell>
  );
}
