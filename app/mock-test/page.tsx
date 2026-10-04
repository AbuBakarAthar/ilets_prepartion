'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { FULL_IELTS_MOCK_TEST } from '@/data/question-bank';
import { Question, PracticeResult } from '@/types';
import { getStoredData, saveStoredData } from '@/lib/store';
import {
  Award,
  Clock,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  ArrowRight,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function MockTestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionId = searchParams.get('section') || 'all';

  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [currentQIdx, setCurrentQIdx] = useState(0);

  const activeSection = FULL_IELTS_MOCK_TEST[activeSectionIdx] || FULL_IELTS_MOCK_TEST[0];
  const currentQ: Question = activeSection.questions[currentQIdx] || activeSection.questions[0];

  // User responses state for mock test
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, string>>({});
  const [writingAnswers, setWritingAnswers] = useState<Record<string, string>>({});
  const [speakingRatings, setSpeakingRatings] = useState<Record<string, number>>({});
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(activeSection.timeAllowedMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(activeSection.timeAllowedMinutes * 60);
    setIsTimerRunning(true);
    setCurrentQIdx(0);
  }, [activeSectionIdx]);

  useEffect(() => {
    let timer: any = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const handleSelectMcq = (opt: string) => {
    setMcqAnswers(prev => ({ ...prev, [currentQ.id]: opt }));
  };

  const handleWritingText = (val: string) => {
    setWritingAnswers(prev => ({ ...prev, [currentQ.id]: val }));
  };

  const handleSpeakingRating = (stars: number) => {
    setSpeakingRatings(prev => ({ ...prev, [currentQ.id]: stars }));
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextQuestion = () => {
    if (currentQIdx < activeSection.questions.length - 1) {
      setCurrentQIdx(prev => prev + 1);
    } else if (activeSectionIdx < FULL_IELTS_MOCK_TEST.length - 1) {
      setActiveSectionIdx(prev => prev + 1);
    } else {
      finishMockTest();
    }
  };

  const finishMockTest = () => {
    const data = getStoredData();
    const mockResults: PracticeResult[] = [];

    // Calculate score for each section
    FULL_IELTS_MOCK_TEST.forEach(section => {
      section.questions.forEach(q => {
        let score = 70;
        let userAnswer = 'Completed';

        if (q.options) {
          userAnswer = mcqAnswers[q.id] || 'Not Answered';
          score = userAnswer === q.correctAnswer ? 100 : 0;
        } else if (q.skill === 'writing') {
          userAnswer = writingAnswers[q.id] || 'Empty draft';
          const words = userAnswer.trim().split(/\s+/).filter(Boolean).length;
          score = words > 150 ? 85 : words > 50 ? 70 : 45;
        } else if (q.skill === 'speaking') {
          const stars = speakingRatings[q.id] || 3;
          score = stars * 20;
          userAnswer = `Self-evaluated: ${stars}/5 Stars`;
        }

        mockResults.push({
          id: `res_mock_${Date.now()}_${q.id}`,
          skill: q.skill,
          score,
          questionId: q.id,
          userAnswer,
          feedback: `IELTS Full Mock Test Response (${section.title})`,
          timestamp: new Date().toISOString()
        });
      });
    });

    const existingResults = data.practiceResults || [];
    saveStoredData('results', [...existingResults, ...mockResults]);
    router.push('/mock-test/results');
  };

  const iconMap: Record<string, React.ElementType> = {
    reading: BookOpen,
    listening: Headphones,
    writing: PenTool,
    speaking: Mic
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-brand-darkBorder pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Full IELTS Timed Practice Test</span>
          </div>
          <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">
            {activeSection.title}
          </h1>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          {FULL_IELTS_MOCK_TEST.map((sec, idx) => {
            const Icon = iconMap[sec.part] || BookOpen;
            const isActive = idx === activeSectionIdx;

            return (
              <button
                key={sec.id}
                onClick={() => setActiveSectionIdx(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-brand-purple text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="capitalize">{sec.part}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timer & Question Progress Bar */}
      <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-4 border border-slate-200 dark:border-brand-darkBorder shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Section Timer</div>
            <div className="text-lg font-extrabold text-brand-navy dark:text-white font-mono">
              {formatTimer(timeLeft)}
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-brand-purple">
            Question {currentQIdx + 1} of {activeSection.questions.length}
          </span>
          <div className="text-[11px] text-slate-400">
            Section {activeSectionIdx + 1} of 4 ({activeSection.part.toUpperCase()})
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-6">
        
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {currentQ.difficulty} Difficulty • IELTS Standard
          </span>
          <h2 className="text-xl font-extrabold text-brand-navy dark:text-white mt-1">
            {currentQ.title}
          </h2>
        </div>

        {/* Reading Passage */}
        {currentQ.passage && (
          <div className="p-5 rounded-2xl bg-brand-purple-light dark:bg-slate-800/80 border border-brand-purple/10 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 max-h-60 overflow-y-auto">
            <span className="text-[10px] font-bold uppercase text-brand-purple">Reading Passage Text:</span>
            <p>{currentQ.passage}</p>
          </div>
        )}

        {/* Listening Audio Script */}
        {currentQ.audioUrl && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs leading-relaxed">
            <span className="font-bold block mb-1">🎧 Listening Script Transcript:</span>
            {currentQ.audioUrl}
          </div>
        )}

        {/* Question Prompt */}
        <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
          {currentQ.prompt}
        </div>

        {/* 1. MCQ OPTIONS */}
        {currentQ.options && (
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = mcqAnswers[currentQ.id] === opt;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectMcq(opt)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-brand-purple bg-brand-purple/10 text-brand-purple font-bold shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0" />}
                </button>
              );
            })}
          </div>
        )}

        {/* 2. WRITING ESSAY / TASK */}
        {currentQ.skill === 'writing' && (
          <div className="space-y-3 pt-2">
            <textarea
              rows={8}
              value={writingAnswers[currentQ.id] || ''}
              onChange={(e) => handleWritingText(e.target.value)}
              placeholder="Type your IELTS Task response here (Minimum recommended: Task 1 = 150 words, Task 2 = 250 words)..."
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:border-brand-purple text-slate-900 dark:text-slate-100"
            />
            <div className="flex justify-between text-xs text-slate-400 font-semibold">
              <span>Word Count: {(writingAnswers[currentQ.id] || '').trim().split(/\s+/).filter(Boolean).length} words</span>
              <span>Evaluated on Task Response, Coherence, Lexical Resource & Grammar</span>
            </div>
          </div>
        )}

        {/* 3. SPEAKING RATING */}
        {currentQ.skill === 'speaking' && (
          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Rate your fluency, pronunciation & coherence for this speaking attempt (1 to 5 stars):
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleSpeakingRating(star)}
                  className={`px-4 py-2.5 rounded-xl border font-bold text-xs transition-all ${
                    speakingRatings[currentQ.id] === star
                      ? 'border-brand-purple bg-brand-purple text-white shadow-md'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {star} ★ {star === 5 ? '(Band 8-9)' : star === 1 ? '(Band 4-5)' : ''}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
          <button
            type="button"
            onClick={() => setCurrentQIdx(prev => Math.max(0, prev - 1))}
            disabled={currentQIdx === 0}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-30"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNextQuestion}
            className="px-6 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all"
          >
            <span>
              {currentQIdx < activeSection.questions.length - 1
                ? 'Next Question'
                : activeSectionIdx < FULL_IELTS_MOCK_TEST.length - 1
                ? 'Proceed to Next IELTS Section'
                : 'Submit & Generate Official Scorecard'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default function IELTSMockTestPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-8 text-center text-xs font-bold text-brand-purple">Loading IELTS Mock Test Simulator...</div>}>
        <MockTestContent />
      </Suspense>
    </AppShell>
  );
}
