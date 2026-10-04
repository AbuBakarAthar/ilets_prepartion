'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { getStoredData } from '@/lib/store';
import { calculateReadinessCategories, calculateBandEstimate } from '@/lib/scoring';
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Target, Stethoscope, Compass } from 'lucide-react';

export default function AssessmentResultsPage() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    setUserData(getStoredData());
  }, []);

  const categories = calculateReadinessCategories(userData?.assessment || null);
  const overallReadiness = Math.round(
    categories.reduce((acc, curr) => acc + curr.score, 0) / categories.length
  );
  const bandInfo = calculateBandEstimate(userData?.practiceResults || []);

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Readiness Matrix & Gap Analysis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white">
              Study Abroad Readiness Report
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Personalized breakdown based on your self-reported profile and diagnostic practice.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white font-bold text-xs shadow-md shadow-brand-purple/20 flex items-center justify-center gap-2 transition-all self-start md:self-auto"
          >
            <span>Go to Student Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Overall Readiness & Unofficial Band Banner */}
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7 bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Overall Readiness Index</span>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-5xl font-extrabold text-brand-purple">{overallReadiness}%</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {overallReadiness >= 75 ? 'Strong Candidate' : overallReadiness >= 50 ? 'Moderate Preparation' : 'Action Required'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                Self-reported profile score. High readiness in Academic transcripts; English diagnostic test recommended to elevate your baseline.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Goal: {userData?.goal?.targetCountry} ({userData?.goal?.targetDegree})</span>
              <span>Intake: {userData?.goal?.targetIntake}</span>
            </div>
          </div>

          <div className="md:col-span-5 bg-gradient-to-br from-brand-navy to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  IELTS Band Estimate
                </span>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>

              {bandInfo.isEligible ? (
                <div className="mt-4">
                  <div className="text-5xl font-extrabold text-white">{bandInfo.band}</div>
                  <p className="text-[11px] text-amber-300 font-semibold mt-2">
                    * {bandInfo.label} (Based on {bandInfo.skillsTestedCount} tested skills)
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  <div className="text-2xl font-bold text-slate-300">Locked</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {bandInfo.label}
                  </p>
                </div>
              )}
            </div>

            <Link
              href="/diagnostic"
              className="mt-6 w-full py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white text-center font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Stethoscope className="w-4 h-4" />
              <span>{bandInfo.isEligible ? 'Take Diagnostic to Refine' : 'Start Diagnostic to Unlock'}</span>
            </Link>
          </div>
        </div>

        {/* 4 Category Status Cards (English, Academic, Applications, Documents) */}
        <div>
          <h2 className="text-lg font-bold text-brand-navy dark:text-white mb-4">
            Category Readiness Breakdown
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">{cat.category}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        cat.status === 'Ready' || cat.status === 'Strong'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {cat.status}
                    </span>
                  </div>

                  <div className="text-2xl font-extrabold text-brand-navy dark:text-white">
                    {cat.score}%
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                    {cat.details}
                  </p>
                </div>

                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
                  <div
                    className="h-full bg-brand-purple rounded-full"
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Best Actions & Priority Checklist */}
        <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-4">
          <h3 className="text-base font-bold text-brand-navy dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-purple" /> Recommended Action Items
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-brand-purple/5 border border-brand-purple/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-brand-purple uppercase">Priority 1 • Language Diagnostic</div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                  Complete Writing & Speaking Practice Sessions
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Validate your self-reported proficiency to establish your verified score trend.
                </p>
              </div>
              <Link
                href="/practice"
                className="px-4 py-2 rounded-xl bg-brand-purple text-white font-bold text-xs shrink-0 hover:bg-brand-purple-hover transition-colors"
              >
                Start Practice
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">Priority 2 • Documentation</div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                  Finalize Statement of Purpose (SOP) & LORs
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  You checked 3 of 5 essential documents. Draft your personal statement.
                </p>
              </div>
              <Link
                href="/planner"
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs shrink-0 hover:bg-slate-300 transition-colors"
              >
                Add to Study Plan
              </Link>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
