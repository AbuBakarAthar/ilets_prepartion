'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Globe, Target, Calendar, Clock, Award, BookOpen } from 'lucide-react';
import { getStoredData, saveStoredData } from '@/lib/store';
import { ExamType, GoalSetup } from '@/types';

export default function GoalSetupPage() {
  const router = useRouter();
  const [targetCountry, setTargetCountry] = useState('United Kingdom');
  const [targetDegree, setTargetDegree] = useState('MSc Data Science');
  const [targetIntake, setTargetIntake] = useState('Fall 2025');
  const [examType, setExamType] = useState<ExamType>('IELTS');
  const [examDate, setExamDate] = useState('2025-11-15');
  const [targetScore, setTargetScore] = useState('7.5');
  const [dailyStudyMinutes, setDailyStudyMinutes] = useState(45);

  useEffect(() => {
    const data = getStoredData();
    if (data.goal) {
      setTargetCountry(data.goal.targetCountry || 'United Kingdom');
      setTargetDegree(data.goal.targetDegree || 'MSc Data Science');
      setTargetIntake(data.goal.targetIntake || 'Fall 2025');
      setExamType(data.goal.examType || 'IELTS');
      setExamDate(data.goal.examDate || '2025-11-15');
      setTargetScore(data.goal.targetScore || '7.5');
      setDailyStudyMinutes(data.goal.dailyStudyMinutes || 45);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedGoal: GoalSetup = {
      targetCountry,
      targetDegree,
      targetIntake,
      examType,
      examDate,
      targetScore,
      dailyStudyMinutes
    };

    saveStoredData('goal', updatedGoal);
    router.push('/assessment');
  };

  return (
    <div className="min-h-screen bg-brand-purple-light dark:bg-brand-darkBg flex items-center justify-center p-4 py-8">
      <div className="max-w-2xl w-full bg-white dark:bg-brand-darkCard rounded-3xl p-8 border border-slate-200 dark:border-brand-darkBorder shadow-xl space-y-6">
        
        {/* Step Header */}
        <div className="space-y-2 text-center">
          <span className="px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider">
            Step 2 of 3: Target Goals
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white">
            Define your study abroad goals
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Tell us where you plan to apply and your target test dates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-brand-purple" /> Target Country
              </label>
              <select
                value={targetCountry}
                onChange={(e) => setTargetCountry(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-brand-purple text-slate-900 dark:text-slate-100 font-medium"
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="United States">United States</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="Malaysia">Malaysia</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-brand-purple" /> Degree / Field
              </label>
              <input
                type="text"
                required
                value={targetDegree}
                onChange={(e) => setTargetDegree(e.target.value)}
                placeholder="e.g. MSc Data Science"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-brand-purple text-slate-900 dark:text-slate-100 font-medium"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-purple" /> Target Intake
              </label>
              <select
                value={targetIntake}
                onChange={(e) => setTargetIntake(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-brand-purple text-slate-900 dark:text-slate-100 font-medium"
              >
                <option value="Fall 2025">Fall 2025 (Sep/Oct)</option>
                <option value="Spring 2026">Spring 2026 (Jan/Feb)</option>
                <option value="Fall 2026">Fall 2026</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-brand-purple" /> Target Exam
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value as ExamType)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-brand-purple text-slate-900 dark:text-slate-100 font-medium"
              >
                <option value="IELTS">IELTS Academic</option>
                <option value="TOEFL">TOEFL iBT</option>
                <option value="PTE">PTE Academic</option>
                <option value="OET">OET (Healthcare)</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-purple" /> Scheduled Exam Date
              </label>
              <input
                type="date"
                required
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-brand-purple text-slate-900 dark:text-slate-100 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-brand-purple" /> Target Score
              </label>
              <input
                type="text"
                required
                value={targetScore}
                onChange={(e) => setTargetScore(e.target.value)}
                placeholder="e.g. 7.5 Band or 100 TOEFL"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-brand-purple text-slate-900 dark:text-slate-100 font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-purple" /> Daily Study Commitment
              </label>
              <span className="text-xs font-bold text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded-full">
                {dailyStudyMinutes} Minutes / Day
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="120"
              step="15"
              value={dailyStudyMinutes}
              onChange={(e) => setDailyStudyMinutes(Number(e.target.value))}
              className="w-full accent-brand-purple"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>15 min (Light)</span>
              <span>45 min (Recommended)</span>
              <span>120 min (Intensive)</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white font-bold text-sm shadow-md shadow-brand-purple/20 flex items-center justify-center gap-2 transition-all mt-4"
          >
            <span>Proceed to Readiness Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
