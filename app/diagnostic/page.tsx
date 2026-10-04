'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { getStoredData } from '@/lib/store';
import { computeSkillScores } from '@/lib/scoring';
import { QUESTION_BANK } from '@/data/question-bank';
import { SkillType } from '@/types';
import {
  Stethoscope,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Award,
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function DiagnosticHubPage() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    setUserData(getStoredData());
  }, []);

  const skillScores = computeSkillScores(userData?.practiceResults || []);

  const skills: { id: SkillType; name: string; desc: string; icon: React.ElementType; color: string }[] = [
    {
      id: 'reading',
      name: 'Reading Passages',
      desc: 'Academic skimming, detail extraction & True/False/Not Given questions.',
      icon: BookOpen,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200 dark:bg-indigo-950/50 dark:border-indigo-800'
    },
    {
      id: 'listening',
      name: 'Listening Audio Drills',
      desc: 'Campus conversations, lecture comprehension & note completion.',
      icon: Headphones,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-800'
    },
    {
      id: 'grammar',
      name: 'Grammar Precision',
      desc: 'Conditional structures, relative clauses & subject-verb agreement.',
      icon: Layers,
      color: 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800'
    },
    {
      id: 'vocabulary',
      name: 'Academic Vocabulary',
      desc: 'High-level collocations, formal synonyms & nuanced terminology.',
      icon: Award,
      color: 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-950/50 dark:border-purple-800'
    },
    {
      id: 'writing',
      name: 'Writing Task Evaluator',
      desc: 'Task 1 & Task 2 essay prompts with instant structural AI/rule feedback.',
      icon: PenTool,
      color: 'text-pink-600 bg-pink-50 border-pink-200 dark:bg-pink-950/50 dark:border-pink-800'
    },
    {
      id: 'speaking',
      name: 'Speaking Timer & Cue Cards',
      desc: 'Timed 60-120 second recording practice with self-evaluation criteria.',
      icon: Mic,
      color: 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/50 dark:border-amber-800'
    }
  ];

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>English Proficiency Diagnostic Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white">
            Select a Skill to Diagnose
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Complete practice modules to measure your proficiency and unlock your official band score estimate.
          </p>
        </div>

        {/* Skill Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => {
            const Icon = skill.icon;
            const scoreObj = skillScores.find(s => s.skill === skill.id);
            const questionCount = QUESTION_BANK.filter(q => q.skill === skill.id).length;

            return (
              <div
                key={skill.id}
                className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 border border-slate-200 dark:border-brand-darkBorder shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${skill.color} border flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {questionCount} Prompts Available
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-brand-navy dark:text-white">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">Diagnostic Baseline:</span>
                    <span className="font-extrabold text-brand-purple">
                      {scoreObj && scoreObj.testedCount > 0 ? `${scoreObj.rawScore}%` : 'Not Measured'}
                    </span>
                  </div>

                  <Link
                    href={`/practice?skill=${skill.id}`}
                    className="w-full py-3 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white font-bold text-xs shadow-md shadow-brand-purple/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Start {skill.name} Diagnostic</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
