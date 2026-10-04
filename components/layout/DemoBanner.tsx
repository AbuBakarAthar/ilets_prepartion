'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { isSupabaseConfigured } from '@/services/supabase';

export function DemoBanner() {
  const hasAIKey = false; // Evaluated server-side or fallback demo
  const isDemo = !isSupabaseConfigured || !hasAIKey;

  if (!isDemo) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-900 dark:text-amber-300 px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong>Demo Mode Active:</strong> Supabase & AI keys not detected. Running with client local storage and rule-based feedback.
          </span>
        </div>
        <span className="hidden md:inline-block px-2 py-0.5 bg-amber-500/20 rounded text-xs font-mono">
          Mock Services Active
        </span>
      </div>
    </div>
  );
}
