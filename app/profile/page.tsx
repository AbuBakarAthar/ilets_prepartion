'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { getStoredData, saveStoredData } from '@/lib/store';
import { User, Mail, GraduationCap, BookOpen, Globe, Calendar, Award, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setUserData(getStoredData());
  }, []);

  if (!userData) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredData('profile', userData.profile);
    saveStoredData('goal', userData.goal);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Student Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white">
            Academic & Target Details
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage your personal profile and target university goals.
          </p>
        </div>

        {isSaved && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-5">
            <h2 className="text-base font-extrabold text-brand-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Personal Background
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userData.profile?.name || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    profile: { ...userData.profile, name: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userData.profile?.email || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    profile: { ...userData.profile, email: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Highest Education Level
                </label>
                <input
                  type="text"
                  value={userData.profile?.educationLevel || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    profile: { ...userData.profile, educationLevel: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={userData.profile?.fieldOfStudy || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    profile: { ...userData.profile, fieldOfStudy: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Goal Settings Card */}
          <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-5">
            <h2 className="text-base font-extrabold text-brand-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Study Abroad Goals
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Country
                </label>
                <input
                  type="text"
                  value={userData.goal?.targetCountry || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    goal: { ...userData.goal, targetCountry: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Degree / Field
                </label>
                <input
                  type="text"
                  value={userData.goal?.targetDegree || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    goal: { ...userData.goal, targetDegree: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Exam Type
                </label>
                <input
                  type="text"
                  value={userData.goal?.examType || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    goal: { ...userData.goal, examType: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Score
                </label>
                <input
                  type="text"
                  value={userData.goal?.targetScore || ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    goal: { ...userData.goal, targetScore: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white font-bold text-xs shadow-md shadow-brand-purple/20 transition-all"
          >
            Save Profile Changes
          </button>
        </form>
      </div>
    </AppShell>
  );
}
