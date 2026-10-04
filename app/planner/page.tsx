'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { getStoredData, saveStoredData } from '@/lib/store';
import { generateDailyPlan } from '@/lib/planner';
import { computeSkillScores } from '@/lib/scoring';
import { Calendar, Clock, CheckCircle2, Play, Sparkles, HelpCircle } from 'lucide-react';

export default function PlannerPage() {
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

  const completedCount = tasks.filter(t => t.completed).length;
  const totalMinutes = tasks.reduce((sum, t) => sum + t.durationMinutes, 0);

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Personal Study Planner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white">
              Today's Recommended Study Plan
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Splitting your daily {userData.goal?.dailyStudyMinutes || 45} study minutes based on weak skill gaps.
            </p>
          </div>

          <div className="px-4 py-2 bg-white dark:bg-brand-darkCard rounded-2xl border border-slate-200 dark:border-brand-darkBorder text-xs font-bold flex items-center gap-4 shrink-0">
            <div>
              <span className="text-slate-400 block">Progress</span>
              <span className="text-brand-purple">{completedCount} of {tasks.length} Done</span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <span className="text-slate-400 block">Target Time</span>
              <span className="text-slate-800 dark:text-slate-100">{totalMinutes} Mins</span>
            </div>
          </div>
        </div>

        {/* Task Cards List */}
        <div className="space-y-4">
          {tasks.map((task, idx) => (
            <div
              key={task.id}
              className={`bg-white dark:bg-brand-darkCard rounded-3xl p-6 border transition-all ${
                task.completed
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-slate-200 dark:border-brand-darkBorder shadow-sm'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-purple/10 text-brand-purple font-bold text-xs uppercase">
                      Task {idx + 1} • {task.skill}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {task.durationMinutes} minutes
                    </span>
                  </div>

                  <h3 className={`text-base font-bold ${task.completed ? 'line-through text-slate-400' : 'text-brand-navy dark:text-white'}`}>
                    {task.title}
                  </h3>

                  {/* "Why this was recommended" line */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                    <span><strong>Why this was recommended:</strong> {task.reason}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/practice?skill=${task.skill}`}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 text-brand-purple fill-brand-purple" />
                    <span>Start Practice</span>
                  </Link>

                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 ${
                      task.completed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-brand-purple text-white hover:bg-brand-purple-hover shadow-md shadow-brand-purple/20'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{task.completed ? 'Marked Complete' : 'Mark Done'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
