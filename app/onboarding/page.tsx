'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, UserCheck, GraduationCap, BookOpen } from 'lucide-react';
import { getStoredData, saveStoredData } from '@/lib/store';

export default function OnboardingPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [educationLevel, setEducationLevel] = useState('Bachelors Degree');
  const [fieldOfStudy, setFieldOfStudy] = useState('Computer Science & Tech');

  useEffect(() => {
    const data = getStoredData();
    if (data.profile?.name) setName(data.profile.name);
    if (data.profile?.educationLevel) setEducationLevel(data.profile.educationLevel);
    if (data.profile?.fieldOfStudy) setFieldOfStudy(data.profile.fieldOfStudy);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentData = getStoredData();
    const updatedProfile = {
      ...currentData.profile,
      name: name || 'Hamza Khan',
      educationLevel,
      fieldOfStudy
    };
    saveStoredData('profile', updatedProfile);
    router.push('/goal-setup');
  };

  return (
    <div className="min-h-screen bg-brand-purple-light dark:bg-brand-darkBg flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white dark:bg-brand-darkCard rounded-3xl p-8 border border-slate-200 dark:border-brand-darkBorder shadow-xl space-y-6">
        
        {/* Step Header */}
        <div className="space-y-2 text-center">
          <span className="px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider">
            Step 1 of 3: Student Profile
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white">
            Tell us about your background
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            We use this to tailor your readiness analysis and academic requirements.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-brand-purple" /> Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hamza Khan"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-brand-purple text-slate-900 dark:text-slate-100 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-brand-purple" /> Highest Level of Education Completed
            </label>
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-brand-purple text-slate-900 dark:text-slate-100 font-medium"
            >
              <option value="High School / A-Levels">High School / A-Levels / Intermediate</option>
              <option value="Bachelors Degree">Bachelors Degree (3 or 4 Years)</option>
              <option value="Masters Degree">Masters Degree</option>
              <option value="Other Certification">Other Diploma / Certification</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-purple" /> Major / Field of Study
            </label>
            <select
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-brand-purple text-slate-900 dark:text-slate-100 font-medium"
            >
              <option value="Computer Science & Tech">Computer Science & Information Technology</option>
              <option value="Engineering & Applied Sciences">Engineering & Applied Sciences</option>
              <option value="Business, Finance & MBA">Business, Finance & MBA</option>
              <option value="Healthcare, Medicine & Nursing">Healthcare, Medicine & Nursing</option>
              <option value="Social Sciences & Humanities">Social Sciences & Humanities</option>
              <option value="Biological & Life Sciences">Biological & Life Sciences</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white font-bold text-sm shadow-md shadow-brand-purple/20 flex items-center justify-center gap-2 transition-all mt-4"
          >
            <span>Save & Set Study Goals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
