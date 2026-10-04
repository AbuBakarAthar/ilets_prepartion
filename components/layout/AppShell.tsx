'use client';

import React from 'react';
import { DemoBanner } from './DemoBanner';
import { DesktopSidebar } from './DesktopSidebar';
import { TopHeader } from './TopHeader';
import { MobileTabBar } from './MobileTabBar';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-purple-light dark:bg-brand-darkBg text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <DemoBanner />
      <div className="flex flex-1">
        <DesktopSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopHeader />
          <main className="flex-1 p-4 sm:p-6 md:p-8 mb-16 md:mb-0 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
}
