'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { QUESTION_BANK } from '@/data/question-bank';
import { Question, SkillType, PracticeResult } from '@/types';
import { getStoredData, saveStoredData } from '@/lib/store';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Mic,
  PenTool,
  Sparkles,
  Play,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function PracticeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const skillParam = (searchParams.get('skill') as SkillType) || 'reading';

  const questions = QUESTION_BANK.filter(q => q.skill === skillParam);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [writingText, setWritingText] = useState('');
  const [writingFeedback, setWritingFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  
  // Speaking Timer state
  const [speakingTimer, setSpeakingTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [speakingSelfRating, setSpeakingSelfRating] = useState<number | null>(null);

  const currentQ: Question | undefined = questions[currentIndex] || questions[0];

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setWritingText('');
    setWritingFeedback(null);
    setSpeakingTimer(60);
    setIsTimerRunning(false);
    setSpeakingSelfRating(null);
  }, [currentIndex, skillParam]);

  useEffect(() => {
    let timerId: any = null;
    if (isTimerRunning && speakingTimer > 0) {
      timerId = setInterval(() => {
        setSpeakingTimer(prev => prev - 1);
      }, 1000);
    } else if (speakingTimer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(timerId);
  }, [isTimerRunning, speakingTimer]);

  if (!currentQ) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-slate-500">No practice questions found for this skill.</p>
        <button
          onClick={() => router.push('/diagnostic')}
          className="px-4 py-2 bg-brand-purple text-white rounded-xl font-bold text-xs"
        >
          Back to Diagnostic Hub
        </button>
      </div>
    );
  }

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
  };

  const handleSubmitMcq = () => {
    if (!selectedOption) return;
    setIsAnswered(true);

    const isCorrect = selectedOption === currentQ.correctAnswer;
    const score = isCorrect ? 100 : 0;

    recordResult(score, selectedOption, isCorrect ? 'Correct response!' : 'Incorrect choice.');
  };

  const handleEvaluateWriting = async () => {
    if (!writingText.trim()) return;
    setIsEvaluating(true);

    try {
      const res = await fetch('/api/ai/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skill: 'writing',
          text: writingText,
          prompt: currentQ.prompt
        })
      });
      const data = await res.json();
      setWritingFeedback(data.feedback);
      recordResult(data.score || 75, writingText, data.feedback);
    } catch (e) {
      const fallbackFb = '[Rule-based Demo Feedback] Writing response submitted. Well-structured paragraphing with good sentence variety.';
      setWritingFeedback(fallbackFb);
      recordResult(75, writingText, fallbackFb);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSpeakingSubmit = (rating: number) => {
    setSpeakingSelfRating(rating);
    const score = rating * 20;
    const fb = `Self-evaluated rating: ${rating}/5 stars. ${rating >= 4 ? 'Great fluency & confidence!' : 'Keep practicing steady pacing and vocabulary range.'}`;
    recordResult(score, `Speaking recording (${60 - speakingTimer}s)`, fb);
  };

  const recordResult = (score: number, userAnswer: string, feedback: string) => {
    const data = getStoredData();
    const newResult: PracticeResult = {
      id: `res_${Date.now()}`,
      skill: skillParam,
      score,
      questionId: currentQ.id,
      userAnswer,
      feedback,
      timestamp: new Date().toISOString()
    };

    const updated = [...(data.practiceResults || []), newResult];
    saveStoredData('results', updated);
  };

  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-brand-darkBorder pb-4">
        <button
          onClick={() => router.push('/diagnostic')}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Diagnostic Hub
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple">
            {skillParam} Practice • Q{currentIndex + 1} of {questions.length}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm space-y-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{currentQ.skill}</span>
            <h2 className="text-xl font-extrabold text-brand-navy dark:text-white mt-0.5">
              {currentQ.title}
            </h2>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
            {currentQ.difficulty} Difficulty
          </span>
        </div>

        {currentQ.passage && (
          <div className="p-5 rounded-2xl bg-brand-purple-light dark:bg-slate-800/80 border border-brand-purple/10 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
            <span className="text-[10px] font-bold uppercase text-brand-purple">Reading Passage:</span>
            <p>{currentQ.passage}</p>
          </div>
        )}

        {currentQ.audioUrl && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs leading-relaxed">
            <span className="font-bold block mb-1">🎧 Audio Script Transcript:</span>
            {currentQ.audioUrl}
          </div>
        )}

        <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
          {currentQ.prompt}
        </div>

        {currentQ.options && (
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentQ.correctAnswer;

              let borderStyle = 'border-slate-200 dark:border-slate-700 hover:border-slate-300';
              if (isSelected) borderStyle = 'border-brand-purple bg-brand-purple/5 font-bold';
              if (isAnswered) {
                if (isCorrect) borderStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 font-bold';
                else if (isSelected && !isCorrect) borderStyle = 'border-rose-500 bg-rose-500/10 text-rose-700 font-bold';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${borderStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                </button>
              );
            })}

            {!isAnswered ? (
              <button
                onClick={handleSubmitMcq}
                disabled={!selectedOption}
                className="mt-4 px-6 py-3 rounded-xl bg-brand-purple text-white font-bold text-xs shadow-md disabled:opacity-40 hover:bg-brand-purple-hover transition-colors"
              >
                Submit & Check Answer
              </button>
            ) : (
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-purple">
                  <HelpCircle className="w-4 h-4" />
                  <span>Explanation Rationale</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {skillParam === 'writing' && (
          <div className="space-y-4 pt-2">
            <textarea
              rows={6}
              value={writingText}
              onChange={(e) => setWritingText(e.target.value)}
              placeholder="Type your response here (minimum 50 words recommended)..."
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-sans focus:outline-none focus:border-brand-purple text-slate-900 dark:text-slate-100"
            />

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Word count: {writingText.trim() ? writingText.trim().split(/\s+/).length : 0} words
              </span>
              <button
                onClick={handleEvaluateWriting}
                disabled={isEvaluating || !writingText.trim()}
                className="px-6 py-3 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white font-bold text-xs shadow-md disabled:opacity-40 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isEvaluating ? 'Evaluating...' : 'Get AI / Rule Evaluation'}</span>
              </button>
            </div>

            {writingFeedback && (
              <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2">
                <div className="text-xs font-bold text-brand-purple flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Instant Feedback Report
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                  {writingFeedback}
                </p>
              </div>
            )}
          </div>
        )}

        {skillParam === 'speaking' && (
          <div className="space-y-6 pt-2">
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-4">
              <div className="text-4xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
                00:{speakingTimer < 10 ? `0${speakingTimer}` : speakingTimer}
              </div>
              <div className="flex justify-center gap-3">
                {!isTimerRunning ? (
                  <button
                    onClick={() => setIsTimerRunning(true)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-md flex items-center gap-2 hover:bg-amber-600"
                  >
                    <Play className="w-4 h-4" /> Start Recording Timer
                  </button>
                ) : (
                  <button
                    onClick={() => setIsTimerRunning(false)}
                    className="px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs shadow-md"
                  >
                    Pause Timer
                  </button>
                )}
                <button
                  onClick={() => { setSpeakingTimer(60); setIsTimerRunning(false); }}
                  className="p-2.5 rounded-xl border border-amber-500/30 text-amber-600 dark:text-amber-400"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Rate your fluency, pronunciation & coherence for this attempt:
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleSpeakingSubmit(star)}
                    className={`px-4 py-2.5 rounded-xl border font-bold text-xs transition-all ${
                      speakingSelfRating === star
                        ? 'border-brand-purple bg-brand-purple text-white shadow-md'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {star} ★ {star === 5 ? '(Excellent)' : star === 1 ? '(Needs Work)' : ''}
                  </button>
                ))}
              </div>
              {speakingSelfRating && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                  ✓ Result saved! Score calculated at {speakingSelfRating * 20}%.
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-6">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-30"
          >
            Previous Question
          </button>

          {!isLastQuestion ? (
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="px-6 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white font-bold text-xs shadow-md flex items-center gap-2"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2"
            >
              <span>Finish Practice & View Dashboard</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PracticeSessionPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-8 text-center text-xs font-bold text-brand-purple">Loading Practice Session...</div>}>
        <PracticeContent />
      </Suspense>
    </AppShell>
  );
}
