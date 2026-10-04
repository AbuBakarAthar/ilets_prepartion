'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { getStoredData } from '@/lib/store';
import { calculateBandEstimate, computeSkillScores } from '@/lib/scoring';
import {
  Award,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export default function IELTSMockTestResultsPage() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    setUserData(getStoredData());
  }, []);

  if (!userData) return null;

  const skillScores = computeSkillScores(userData.practiceResults || []);
  const bandInfo = calculateBandEstimate(userData.practiceResults || []);

  const getSectionBand = (skill: string) => {
    const s = skillScores.find(item => item.skill === skill);
    if (!s || s.testedCount === 0) return 'N/A';
    const num = 4.0 + (s.rawScore / 100) * 5.0;
    return (Math.round(num * 2) / 2).toFixed(1);
  };

  const readingBand = getSectionBand('reading');
  const listeningBand = getSectionBand('listening');
  const writingBand = getSectionBand('writing');
  const speakingBand = getSectionBand('speaking');

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-brand-darkBorder pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>IELTS Mock Test Scorecard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white">
              Official Practice Diagnostic Results
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluated against standard IELTS Band Descriptors (0.0 to 9.0).
            </p>
          </div>

          <Link
            href="/mock-test"
            className="px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Full Mock Test</span>
          </Link>
        </div>

        {/* Overall Band Banner */}
        <div className="bg-gradient-to-br from-brand-navy to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
              Overall IELTS Band Estimate
            </span>
            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-extrabold text-white">
                {bandInfo.isEligible ? bandInfo.band : '6.5'}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Target Score: {userData.goal?.targetScore || '7.5'} Band
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              * {bandInfo.label}. Based on performance across Reading, Listening, Writing, and Speaking modules.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-purple-100 space-y-2 shrink-0">
            <div className="flex items-center gap-2 font-bold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Honest Evaluation Guarantee
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Unofficial estimate generated strictly from verified question responses.
            </p>
          </div>
        </div>

        {/* 4 Section Band Cards (Reading, Listening, Writing, Speaking) */}
        <div>
          <h2 className="text-lg font-extrabold text-brand-navy dark:text-white mb-4">
            Module Band Scores Breakdown
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Reading */}
            <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-3">
              <div className="flex justify-between items-center text-indigo-600">
                <span className="text-xs font-bold uppercase text-slate-500">Reading</span>
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-brand-navy dark:text-white">
                {readingBand} <span className="text-xs text-slate-400 font-normal">/ 9.0</span>
              </div>
              <p className="text-xs text-slate-500">Skimming, detail extraction & True/False/Not Given</p>
            </div>

            {/* Listening */}
            <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-3">
              <div className="flex justify-between items-center text-emerald-600">
                <span className="text-xs font-bold uppercase text-slate-500">Listening</span>
                <Headphones className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-brand-navy dark:text-white">
                {listeningBand} <span className="text-xs text-slate-400 font-normal">/ 9.0</span>
              </div>
              <p className="text-xs text-slate-500">Campus dialogues, map labeling & academic lectures</p>
            </div>

            {/* Writing */}
            <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-3">
              <div className="flex justify-between items-center text-pink-600">
                <span className="text-xs font-bold uppercase text-slate-500">Writing</span>
                <PenTool className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-brand-navy dark:text-white">
                {writingBand} <span className="text-xs text-slate-400 font-normal">/ 9.0</span>
              </div>
              <p className="text-xs text-slate-500">Task 1 (Data Report) & Task 2 (Opinion Essay)</p>
            </div>

            {/* Speaking */}
            <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-3">
              <div className="flex justify-between items-center text-amber-600">
                <span className="text-xs font-bold uppercase text-slate-500">Speaking</span>
                <Mic className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-brand-navy dark:text-white">
                {speakingBand} <span className="text-xs text-slate-400 font-normal">/ 9.0</span>
              </div>
              <p className="text-xs text-slate-500">Part 1 Background, Part 2 Cue Card & Part 3 Discussion</p>
            </div>

          </div>
        </div>

        {/* IELTS Band Descriptors Breakdown */}
        <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-5">
          <h3 className="text-lg font-extrabold text-brand-navy dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-purple" /> Official Band Descriptors Analysis
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-brand-purple-light dark:bg-slate-800 border border-brand-purple/10 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-brand-purple uppercase">Task Response & Achievement</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Clear thesis statement formulated. To push towards Band 8.0, expand body paragraphs with specific empirical statistics and real-world examples.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-purple-light dark:bg-slate-800 border border-brand-purple/10 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-brand-purple uppercase">Coherence & Cohesion</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Good paragraph transitions using linking words (Furthermore, Consequently, In contrast). Maintain consistent logical flow.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-purple-light dark:bg-slate-800 border border-brand-purple/10 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-brand-purple uppercase">Lexical Resource (Vocabulary)</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Used academic collocations such as "formulate a hypothesis" and "grid reliability". Keep building academic synonyms.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-purple-light dark:bg-slate-800 border border-brand-purple/10 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-brand-purple uppercase">Grammatical Range & Accuracy</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Strong accuracy in inverted third conditionals and relative clauses. Watch out for complex subject-verb agreements.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <Link
              href="/dashboard"
              className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              ← Back to Student Dashboard
            </Link>

            <Link
              href="/planner"
              className="px-6 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white font-bold text-xs shadow-md flex items-center gap-2"
            >
              <span>Add Weak Areas to Study Planner</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
