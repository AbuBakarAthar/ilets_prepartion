'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Stethoscope,
  Target,
  Calendar,
  TrendingUp,
  ClipboardCheck,
  User,
  Settings,
  Compass,
  Sparkles,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'IELTS Full Mock Test', href: '/mock-test', icon: Award, badge: 'Full Test' },
  { name: 'Diagnostic Hub', href: '/diagnostic', icon: Stethoscope },
  { name: 'Practice Sessions', href: '/practice', icon: Target },
  { name: 'Study Planner', href: '/planner', icon: Calendar, badge: 'Daily' },
  { name: 'Readiness Report', href: '/assessment/results', icon: ClipboardCheck },
  { name: 'Progress & Stats', href: '/progress', icon: TrendingUp },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings }
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 dark:border-brand-darkBorder bg-white dark:bg-brand-darkCard shrink-0 min-h-screen">
      {/* Brand Logo */}
      <div className="p-6 border-b border-slate-100 dark:border-brand-darkBorder/50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-purple text-white flex items-center justify-center shadow-md shadow-brand-purple/20">
          <Compass className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight text-brand-navy dark:text-white flex items-center gap-1.5">
            Wayfinder
            <span className="px-1.5 py-0.5 text-[10px] bg-brand-purple/10 text-brand-purple rounded font-semibold">
              IELTS
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Study Abroad Coach</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-4 space-y-1">
        <p className="px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
          Navigation
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group',
                isActive
                  ? 'bg-brand-purple text-white shadow-sm shadow-brand-purple/30'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-brand-purple-light dark:hover:bg-slate-800 hover:text-brand-purple dark:hover:text-white'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'w-5 h-5 transition-transform group-hover:scale-110',
                    isActive ? 'text-white' : 'text-slate-400 dark:text-slate-400 group-hover:text-brand-purple dark:group-hover:text-white'
                  )}
                />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span
                  className={cn(
                    'text-[10px] px-2 py-0.5 rounded-full font-semibold',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-brand-purple/10 text-brand-purple dark:bg-purple-900/40 dark:text-purple-300'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Future Modules Preview Card */}
      <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-brand-purple-light to-purple-50 dark:from-slate-800 dark:to-slate-900 border border-brand-purple/10 dark:border-slate-700">
        <div className="flex items-center gap-2 text-brand-purple dark:text-purple-400 text-xs font-semibold mb-1">
          <Sparkles className="w-4 h-4" />
          <span>IELTS Band Predictor</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
          Covers Reading, Listening, Writing Tasks & Speaking Cue Cards!
        </p>
      </div>
    </aside>
  );
}
