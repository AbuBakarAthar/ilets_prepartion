'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { getStoredData, saveStoredData } from '@/lib/store';
import { AssessmentData } from '@/types';

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [englishProficiency, setEnglishProficiency] = useState<'beginner' | 'intermediate' | 'advanced' | 'fluent'>('intermediate');
  const [academicGPA, setAcademicGPA] = useState('3.4');
  const [transcriptsReady, setTranscriptsReady] = useState(true);
  const [applicationStage, setApplicationStage] = useState<'not_started' | 'researching' | 'preparing_docs' | 'submitted'>('researching');
  const [budgetStatus, setBudgetStatus] = useState<'self_funded' | 'need_scholarship' | 'partial_funding'>('need_scholarship');
  const [docs, setDocs] = useState({
    passport: true,
    transcripts: true,
    sop: false,
    lor: false,
    cv: true
  });

  useEffect(() => {
    const data = getStoredData();
    if (data.assessment) {
      setEnglishProficiency(data.assessment.englishProficiency || 'intermediate');
      setAcademicGPA(data.assessment.academicGPA || '3.4');
      setTranscriptsReady(Boolean(data.assessment.academicTranscriptsReady));
      setApplicationStage(data.assessment.applicationStage || 'researching');
      setBudgetStatus(data.assessment.budgetStatus || 'need_scholarship');
      if (data.assessment.documentsChecklist) {
        setDocs(data.assessment.documentsChecklist);
      }
    }
  }, []);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      const assessment: AssessmentData = {
        englishProficiency,
        academicGPA,
        academicTranscriptsReady: transcriptsReady,
        applicationStage,
        budgetStatus,
        documentsChecklist: docs
      };
      saveStoredData('assessment', assessment);
      router.push('/assessment/results');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const progressPercentage = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-brand-purple-light dark:bg-brand-darkBg flex items-center justify-center p-4 py-8">
      <div className="max-w-2xl w-full bg-white dark:bg-brand-darkCard rounded-3xl p-8 border border-slate-200 dark:border-brand-darkBorder shadow-xl space-y-6">
        
        {/* Progress Bar Header */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-brand-purple uppercase tracking-wider">
              Readiness Check • Step {step} of 5
            </span>
            <span className="text-slate-500">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-purple rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* STEP 1: English Status */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h2 className="text-xl font-bold text-brand-navy dark:text-white">
              1. How would you rate your current English proficiency?
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select your self-evaluated baseline. We will verify this with diagnostic test modules.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { id: 'beginner', label: 'Beginner (A1/A2)', desc: 'Basic everyday phrases' },
                { id: 'intermediate', label: 'Intermediate (B1/B2)', desc: 'Comfortable with standard conversations' },
                { id: 'advanced', label: 'Advanced (C1)', desc: 'Strong academic vocabulary & grammar' },
                { id: 'fluent', label: 'Fluent (C2)', desc: 'Near-native fluency' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setEnglishProficiency(opt.id as any)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    englishProficiency === opt.id
                      ? 'border-brand-purple bg-brand-purple/5 text-brand-purple font-bold shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-sm text-slate-800 dark:text-slate-100">{opt.label}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Academic Profile */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h2 className="text-xl font-bold text-brand-navy dark:text-white">
              2. Academic Transcript & GPA Details
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Provide your recent academic record for university eligibility screening.
            </p>
            
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Cumulative GPA / Percentage Score
                </label>
                <input
                  type="text"
                  value={academicGPA}
                  onChange={(e) => setAcademicGPA(e.target.value)}
                  placeholder="e.g. 3.4 / 4.0 or 82%"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-brand-purple font-medium"
                />
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    Are your official academic transcripts issued & ready?
                  </div>
                  <div className="text-[11px] text-slate-500">Official transcripts or degree completion certificate</div>
                </div>
                <input
                  type="checkbox"
                  checked={transcriptsReady}
                  onChange={(e) => setTranscriptsReady(e.target.checked)}
                  className="w-5 h-5 accent-brand-purple rounded"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Application Progress */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h2 className="text-xl font-bold text-brand-navy dark:text-white">
              3. Current Application Stage
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Where are you currently in the university selection and submission process?
            </p>

            <div className="space-y-3 pt-2">
              {[
                { id: 'not_started', label: 'Not Started Yet', desc: 'Just starting to explore study abroad options' },
                { id: 'researching', label: 'Researching Universities', desc: 'Shortlisting courses, requirements & deadlines' },
                { id: 'preparing_docs', label: 'Preparing Documents', desc: 'Drafting SOP, gathering LORs and transcripts' },
                { id: 'submitted', label: 'Applications Submitted', desc: 'Awaiting offer letters & visa interview' }
              ].map(stg => (
                <button
                  key={stg.id}
                  type="button"
                  onClick={() => setApplicationStage(stg.id as any)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    applicationStage === stg.id
                      ? 'border-brand-purple bg-brand-purple/5 font-bold shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-slate-800 dark:text-slate-100">{stg.label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{stg.desc}</div>
                  </div>
                  {applicationStage === stg.id && (
                    <div className="w-6 h-6 rounded-full bg-brand-purple text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Budget & Scholarship Interest */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h2 className="text-xl font-bold text-brand-navy dark:text-white">
              4. Budget & Funding Strategy
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              How do you plan to finance your tuition and living expenses abroad?
            </p>

            <div className="space-y-3 pt-2">
              {[
                { id: 'self_funded', label: 'Self-Funded / Family Savings', desc: 'Personal funds or bank statement ready for visa proof' },
                { id: 'need_scholarship', label: 'Seeking Full / Merit Scholarship', desc: 'Require scholarship support to cover major tuition costs' },
                { id: 'partial_funding', label: 'Partial Funding & Student Loan', desc: 'Combining partial bursaries with family funding or loans' }
              ].map(b => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBudgetStatus(b.id as any)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    budgetStatus === b.id
                      ? 'border-brand-purple bg-brand-purple/5 font-bold shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-slate-800 dark:text-slate-100">{b.label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{b.desc}</div>
                  </div>
                  {budgetStatus === b.id && (
                    <div className="w-6 h-6 rounded-full bg-brand-purple text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Document Checklist */}
        {step === 5 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h2 className="text-xl font-bold text-brand-navy dark:text-white">
              5. Application Document Checklist
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Check off the items you currently have drafted or ready.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { key: 'passport', label: 'Valid Passport (6+ months remaining)' },
                { key: 'transcripts', label: 'Academic Transcripts & Degree Certificate' },
                { key: 'sop', label: 'Statement of Purpose (SOP / Personal Statement)' },
                { key: 'lor', label: 'Letters of Recommendation (LORs from Professors/Employers)' },
                { key: 'cv', label: 'Academic / Professional CV (EuroPass / Harvard Format)' }
              ].map(item => (
                <label
                  key={item.key}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={(docs as any)[item.key]}
                    onChange={(e) => setDocs({ ...docs, [item.key]: e.target.checked })}
                    className="w-5 h-5 accent-brand-purple rounded"
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-30 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white font-bold text-xs shadow-md shadow-brand-purple/20 flex items-center gap-2 transition-all"
          >
            <span>{step === 5 ? 'Generate Readiness Results' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
