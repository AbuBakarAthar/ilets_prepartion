'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { getStoredData } from '@/lib/store';
import { computeSkillScores, calculateBandEstimate } from '@/lib/scoring';
import { TrendingUp, Clock, Award, ShieldCheck, Calendar, Activity } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';

export default function ProgressPage() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    setUserData(getStoredData());
  }, []);

  if (!userData) return null;

  const skillScores = computeSkillScores(userData.practiceResults || []);
  const bandInfo = calculateBandEstimate(userData.practiceResults || []);

  // Format Recharts data for skill performance
  const chartSkillData = skillScores.map(s => ({
    name: s.skill.charAt(0).toUpperCase() + s.skill.slice(1),
    Score: s.testedCount > 0 ? s.rawScore : 0,
  }));

  // Weekly study minutes trends
  const weeklyStudyData = [
    { day: 'Mon', minutes: 30 },
    { day: 'Tue', minutes: 45 },
    { day: 'Wed', minutes: 60 },
    { day: 'Thu', minutes: 20 },
    { day: 'Fri', minutes: 45 },
    { day: 'Sat', minutes: 90 },
    { day: 'Sun', minutes: 45 },
  ];

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Analytics & Score History</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white">
            Progress & Performance Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Track your study minutes, score trends, and verified diagnostic growth over time.
          </p>
        </div>

        {/* Top Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Minutes Studied</span>
            <div className="text-4xl font-extrabold text-brand-navy dark:text-white">
              {userData.weeklyMinutes || 135} Mins
            </div>
            <p className="text-xs text-slate-500">Across practice & diagnostic sessions</p>
          </div>

          <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Official Estimate Status</span>
            <div className="text-4xl font-extrabold text-brand-purple">
              {bandInfo.isEligible ? `${bandInfo.band} Band` : 'Locked'}
            </div>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">{bandInfo.label}</p>
          </div>

          <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Practice Sessions</span>
            <div className="text-4xl font-extrabold text-brand-navy dark:text-white">
              {userData.practiceResults?.length || 0} Tests
            </div>
            <p className="text-xs text-slate-500">Completed diagnostic entries</p>
          </div>
        </div>

        {/* Recharts Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Skill Performance Comparison Bar Chart */}
          <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-extrabold text-brand-navy dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-brand-purple" /> Skill Performance (% Raw Score)
              </h3>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartSkillData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F1035',
                      color: '#fff',
                      borderRadius: '12px',
                      border: 'none',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="Score" fill="#6C4CF1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Study Time Line Chart */}
          <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-extrabold text-brand-navy dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" /> Weekly Study Activity (Minutes)
              </h3>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyStudyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F1035',
                      color: '#fff',
                      borderRadius: '12px',
                      border: 'none',
                      fontSize: '12px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="minutes"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: '#10B981', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Practice History Table */}
        <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-brand-navy dark:text-white">
            Recent Practice Log Entries
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                <tr>
                  <th className="py-3 px-4">Skill</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">User Answer</th>
                  <th className="py-3 px-4">Feedback / Explanation</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                {userData.practiceResults?.map((res: any) => (
                  <tr key={res.id}>
                    <td className="py-3.5 px-4 uppercase font-bold text-brand-purple">{res.skill}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{res.score}%</td>
                    <td className="py-3.5 px-4 max-w-xs truncate">{res.userAnswer}</td>
                    <td className="py-3.5 px-4 max-w-sm truncate">{res.feedback || 'Completed'}</td>
                    <td className="py-3.5 px-4 text-slate-400">{new Date(res.timestamp).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
