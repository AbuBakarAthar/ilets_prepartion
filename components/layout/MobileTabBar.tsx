'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Award, Target, Calendar, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOBILE_ITEMS = [
  { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { name: 'IELTS Test', href: '/mock-test', icon: Award },
  { name: 'Practice', href: '/practice', icon: Target },
  { name: 'Planner', href: '/planner', icon: Calendar },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
];

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-brand-darkCard/95 backdrop-blur-md border-t border-slate-200 dark:border-brand-darkBorder px-2 py-2 flex items-center justify-around">
      {MOBILE_ITEMS.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all text-xs font-medium',
              isActive
                ? 'text-brand-purple dark:text-purple-400 font-bold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            )}
          >
            <Icon className={cn('w-5 h-5', isActive && 'text-brand-purple dark:text-purple-400')} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
