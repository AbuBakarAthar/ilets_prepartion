'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { getStoredData, saveStoredData } from '@/lib/store';
import { computeSkillScores, calculateBandEstimate } from '@/lib/scoring';
import { determineNextBestAction } from '@/lib/next-best-action';
import { generateDailyPlan } from '@/lib/planner';
import {
  Flame,
  Clock,
  Calendar,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Play,
  Stethoscope,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Award,
  Layers,
  ShieldCheck
} from 'lucide-react';

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const data = getStoredData();
    setUserData(data);

    const skillScores = computeSkillScores(data.practiceResults || []);
    const dailyPlan = generateDailyPlan(
      data.goal?.dailyStudyMinutes || 45,
      skillScores,
      data.plannerTasks || []
    );

    setTasks(dailyPlan);
    saveStoredData('tasks', dailyPlan);
  }, []);

  if (!userData) return null;

  const skillScores = computeSkillScores(userData.practiceResults || []);
  const nextBestAction = determineNextBestAction(skillScores);
  const bandInfo = calculateBandEstimate(userData.practiceResults || []);

  const examDate = userData.goal?.examDate ? new Date(userData.goal.examDate) : new Date();
  const diffTime = examDate.getTime() - new Date().getTime();
  const daysToExam = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const handleToggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });

    setTasks(updatedTasks);
    saveStoredData('tasks', updatedTasks);

    const completedCount = updatedTasks.filter(t => t.completed).length;
    if (completedCount > 0) {
      saveStoredData('streak', (userData.streak || 4) + 1);
      saveStoredData('weekly_min', (userData.weeklyMinutes || 135) + 20);
    }
  };

  const skillIconMap: Record<string, React.ElementType> = {
    reading: BookOpen,
    listening: Headphones,
    writing: PenTool,
    speaking: Mic,
    grammar: Layers,
    vocabulary: Award
  };

  return (
    <AppShell>
      <div className="space-y-8">
        
        {/* Welcome & Days to Exam Banner */}
        <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-purple/10 text-brand-purple">
                Target Exam: {userData.goal?.examType || 'IELTS Academic'}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Score Goal: {userData.goal?.targetScore || '7.5'} Band
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white">
              Welcome back, {userData.profile?.name || 'Hamza'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Preparing for IELTS & Study Abroad Applications for {userData.goal?.targetDegree || 'MSc Data Science'} in {userData.goal?.targetCountry || 'United Kingdom'}.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-brand-purple-light dark:bg-slate-800 p-4 rounded-2xl border border-brand-purple/10 dark:border-slate-700 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-brand-purple text-white flex items-center justify-center font-extrabold text-xl shadow-md">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-brand-navy dark:text-white">{daysToExam} Days</div>
              <div className="text-[11px] text-slate-500 font-semibold">Until Exam Date ({userData.goal?.examDate})</div>
            </div>
          </div>
        </div>

        {/* IELTS FULL MOCK TEST FEATURE BANNER */}
        <div className="bg-gradient-to-br from-indigo-950 via-brand-navy to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-500/20 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-400/30">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Full-Length IELTS Practice Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Take Full IELTS Timed Mock Test
            </h2>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
              Complete authentic timed practice sets for all 4 parts: **Reading Passages**, **Listening Scenarios**, **Writing Task 1 & 2**, and **Speaking Cue Cards**. Get an official practice band estimate (0.0 to 9.0).
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/mock-test"
                className="px-6 py-3 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white font-bold text-sm shadow-md flex items-center gap-2 transition-transform transform hover:-translate-y-0.5"
              >
                <span>Start Full IELTS Mock Test</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/mock-test/results"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center gap-2 transition-colors"
              >
                <span>View Mock Scorecard</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">
              IELTS Section Breakdown
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-200">
                <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Reading</span>
                <span className="font-bold text-amber-400">60 mins • 4 Passages</span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="flex items-center gap-1.5"><Headphones className="w-3.5 h-3.5 text-emerald-400" /> Listening</span>
                <span className="font-bold text-amber-400">30 mins • 4 Sections</span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="flex items-center gap-1.5"><PenTool className="w-3.5 h-3.5 text-pink-400" /> Writing</span>
                <span className="font-bold text-amber-400">60 mins • Task 1 & 2</span>
              </div>
              <div className="flex justify-between items-center text-slate-200">
                <span className="flex items-center gap-1.5"><Mic className="w-3.5 h-3.5 text-amber-400" /> Speaking</span>
                <span className="font-bold text-amber-400">14 mins • Part 1, 2 & 3</span>
              </div>
            </div>
          </div>
        </div>

        {/* PROMINENT NEXT BEST ACTION CARD */}
        <div className="bg-gradient-to-r from-brand-purple to-indigo-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Recommended Next Best Action</span>
            </div>

            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-white/10 rounded-full border border-white/20">
              Priority: {nextBestAction.priorityLevel.toUpperCase()}
            </span>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {nextBestAction.title}
            </h2>
            <p className="text-sm text-purple-100 leading-relaxed">
              {nextBestAction.rationale}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href={nextBestAction.targetUrl}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-brand-purple font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>{nextBestAction.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <span className="text-xs text-purple-200 italic">
              * Based on real performance data & diagnostic coverage
            </span>
          </div>
        </div>

        {/* 2-Column Section: Today's Plan & Stats */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Today's Personalized Study Plan */}
          <div className="lg:col-span-7 bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-brand-navy dark:text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-purple" /> Today's Personalized Study Plan
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Allocating {userData.goal?.dailyStudyMinutes || 45} mins across your weakest skill areas.
                </p>
              </div>
              <Link href="/planner" className="text-xs font-bold text-brand-purple hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    task.completed
                      ? 'bg-emerald-500/5 border-emerald-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-brand-purple uppercase">{task.skill}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                          {task.durationMinutes} mins
                        </span>
                      </div>
                      <h4 className={`text-sm font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                        {task.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        Why recommended: {task.reason}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs shrink-0 transition-colors ${
                        task.completed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-brand-purple text-white hover:bg-brand-purple-hover'
                      }`}
                    >
                      {task.completed ? 'Completed ✓' : 'Start Task'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Metrics & Band Estimate */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-2">
                <div className="flex items-center justify-between text-amber-500">
                  <span className="text-xs font-bold uppercase text-slate-400">Current Streak</span>
                  <Flame className="w-5 h-5 fill-amber-500" />
                </div>
                <div className="text-3xl font-extrabold text-brand-navy dark:text-white">
                  {userData.streak || 4} Days
                </div>
                <p className="text-[11px] text-slate-500">Consistent daily practice</p>
              </div>

              <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-2">
                <div className="flex items-center justify-between text-brand-purple">
                  <span className="text-xs font-bold uppercase text-slate-400">Weekly Study</span>
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-3xl font-extrabold text-brand-navy dark:text-white">
                  {userData.weeklyMinutes || 135} Mins
                </div>
                <p className="text-[11px] text-slate-500">Goal: 210 mins / week</p>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-slate-400">IELTS Band Status</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-purple/10 text-brand-purple">
                  {bandInfo.skillsTestedCount} / 6 Parts Tested
                </span>
              </div>

              {bandInfo.isEligible ? (
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-3xl font-extrabold text-brand-purple">{bandInfo.band} Band</div>
                    <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">{bandInfo.label}</div>
                  </div>
                  <Link href="/progress" className="text-xs font-bold text-brand-purple hover:underline">
                    View Progress
                  </Link>
                </div>
              ) : (
                <div className="text-xs text-slate-500 space-y-2">
                  <p>{bandInfo.label}</p>
                  <Link
                    href="/diagnostic"
                    className="inline-block text-xs font-bold text-brand-purple hover:underline"
                  >
                    Take IELTS Diagnostic Modules →
                  </Link>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* IELTS All 4 Parts Practice Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-extrabold text-brand-navy dark:text-white">
              IELTS All 4 Parts Diagnostic Grid
            </h3>
            <Link href="/diagnostic" className="text-xs font-bold text-brand-purple hover:underline">
              Open Diagnostic Hub
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {skillScores.map((scoreObj) => {
              const Icon = skillIconMap[scoreObj.skill] || Target;
              return (
                <Link
                  key={scoreObj.skill}
                  href={`/practice?skill=${scoreObj.skill}`}
                  className="bg-white dark:bg-brand-darkCard rounded-2xl p-4 border border-slate-200 dark:border-brand-darkBorder shadow-sm hover:border-brand-purple/50 transition-all space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 capitalize">
                      {scoreObj.skill}
                    </h4>
                    <div className="text-xl font-extrabold text-brand-navy dark:text-white mt-1">
                      {scoreObj.testedCount > 0 ? `${scoreObj.rawScore}%` : 'Untested'}
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-purple rounded-full"
                      style={{ width: `${scoreObj.testedCount > 0 ? scoreObj.rawScore : 0}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </AppShell>
  );
}
