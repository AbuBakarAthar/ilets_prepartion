'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Play,
  CheckCircle2,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Award,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Globe,
  TrendingUp,
  Clock,
  Layers,
  Star,
  Users,
  Check
} from 'lucide-react';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories = [
    { name: 'Reading Passages', count: '45+ Practice Texts', bg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300', icon: BookOpen },
    { name: 'Listening Audio', count: '30+ Campus Scenarios', bg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300', icon: Headphones },
    { name: 'Writing Evaluation', count: 'AI Task 1 & 2 Scoring', bg: 'bg-pink-50 text-pink-600 dark:bg-pink-950 dark:text-pink-300', icon: PenTool },
    { name: 'Speaking Timer', count: 'Cue Cards & Part 1-3', bg: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300', icon: Mic },
    { name: 'Grammar Drills', count: '100+ Diagnostic Tests', bg: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300', icon: Layers },
    { name: 'Vocabulary Vault', count: 'Academic Collocations', bg: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300', icon: Award },
  ];

  const featuredModules = [
    {
      title: 'IELTS Academic & General Prep',
      coach: 'Dr. Sarah Mitchell, Oxford Alum',
      rating: '4.9',
      reviews: '1,240',
      tag: 'Most Popular',
      bgGrad: 'from-purple-500 to-indigo-600',
      icon: BookOpen
    },
    {
      title: 'Statement of Purpose (SOP) Blueprint',
      coach: 'Prof. Tariq Mahmood, Admissions Specialist',
      rating: '4.8',
      reviews: '980',
      tag: 'Application Essential',
      bgGrad: 'from-emerald-500 to-teal-600',
      icon: PenTool
    },
    {
      title: 'Speaking Interview & Fluency Mastery',
      coach: 'Emma Watson, Senior Examiner',
      rating: '5.0',
      reviews: '2,150',
      tag: 'Interactive Timer',
      bgGrad: 'from-amber-500 to-orange-600',
      icon: Mic
    }
  ];

  const faqs = [
    {
      q: 'How does Wayfinder estimate my IELTS band score?',
      a: 'Wayfinder calculates an unofficial practice estimate based on your performance across at least 3 distinct skill diagnostics. We never guarantee official scores or test results.'
    },
    {
      q: 'Can I use Wayfinder for target countries other than the UK?',
      a: 'Yes! While Pakistan and the UK are primary prep targets, Wayfinder supports student applications to Canada, USA, Australia, Germany, Malaysia, and global universities.'
    },
    {
      q: 'What makes Wayfinder different from standard test prep platforms?',
      a: 'We combine language skill diagnostics with holistic application readiness—evaluating your academic GPA, transcript state, SOP documentation, and visa budget in one single Next Best Action engine.'
    },
    {
      q: 'Is my personal information secure?',
      a: 'Absolutely. Wayfinder uses strict Row Level Security (RLS) and client storage policies. You can reset or permanently delete all your data at any time from Settings.'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-purple-light dark:bg-brand-darkBg text-slate-900 dark:text-slate-100 font-sans">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-brand-darkCard/90 backdrop-blur-md border-b border-slate-200/80 dark:border-brand-darkBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-purple text-white flex items-center justify-center shadow-lg shadow-brand-purple/30">
              <Compass className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-brand-navy dark:text-white">
              Wayfinder<span className="text-brand-purple">.</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#how-it-works" className="hover:text-brand-purple transition-colors">How It Works</a>
            <a href="#skills" className="hover:text-brand-purple transition-colors">Skills Hub</a>
            <a href="#honest-design" className="hover:text-brand-purple transition-colors">Honesty First</a>
            <a href="#faq" className="hover:text-brand-purple transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-purple hover:bg-brand-purple-hover text-white shadow-md shadow-brand-purple/25 transition-all transform hover:-translate-y-0.5"
            >
              Start Free Assessment
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section (Learnova + OET Inspired) */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple dark:bg-purple-950/60 dark:text-purple-300 text-xs font-bold uppercase tracking-wider border border-brand-purple/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Study Abroad Coach</span>
              </div>

              {/* Two-Tone Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy dark:text-white tracking-tight leading-[1.15]">
                Know your readiness. <br className="hidden sm:inline" />
                <span className="text-brand-purple underline decoration-purple-300 decoration-wavy decoration-2">
                  Practise what matters.
                </span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Empowering international students preparing for IELTS, TOEFL, PTE & OET. Turn self-reported application gaps into actionable daily practice tasks.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-purple hover:bg-brand-purple-hover text-white font-bold text-base shadow-lg shadow-brand-purple/30 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Start Free Assessment</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-brand-darkCard hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-base border border-slate-200 dark:border-brand-darkBorder shadow-sm flex items-center justify-center gap-3 transition-all"
                >
                  <Play className="w-4 h-4 text-brand-purple fill-brand-purple" />
                  <span>Explore Demo</span>
                </Link>
              </div>

              {/* Floating Skill Chips (OET Style) */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-semibold">
                <span className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> Reading
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-emerald-500" /> Listening
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-pink-500" /> Writing
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-amber-500" /> Speaking
                </span>
              </div>
            </div>

            {/* Right Hero Feature Graphic & Floating Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl p-6 bg-gradient-to-tr from-brand-purple/20 via-purple-100 to-indigo-100 dark:from-purple-950/40 dark:via-slate-800 dark:to-slate-900 border border-brand-purple/20 shadow-2xl">
                
                {/* Dashboard Screen Mockup */}
                <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 shadow-lg border border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-purple/10 text-brand-purple font-bold flex items-center justify-center text-sm">
                        HK
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">Hamza Khan</h4>
                        <p className="text-[10px] text-slate-400">Target: UK MSc Data Science</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-600 font-bold rounded-full">
                      4 Day Streak 🔥
                    </span>
                  </div>

                  {/* Next Best Action Card Preview */}
                  <div className="p-3.5 rounded-xl bg-brand-purple/5 border border-brand-purple/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-brand-purple tracking-wider">
                        Next Best Action
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-rose-500/10 text-rose-600 font-semibold rounded">
                        High Priority
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-brand-navy dark:text-white">
                      Complete Writing Diagnostic
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      Your writing score is unmeasured. Completing this unlocks your unofficial band estimate.
                    </p>
                  </div>

                  {/* Readiness Progress Bars */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-slate-600 dark:text-slate-300">Overall Readiness</span>
                      <span className="text-brand-purple font-bold">68%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-purple rounded-full w-[68%]" />
                    </div>
                  </div>
                </div>

                {/* Floating 4 Benefits Card (Learnova Style) */}
                <div className="mt-4 bg-white/95 dark:bg-brand-darkCard/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h6 className="text-[11px] font-bold text-slate-800 dark:text-slate-100">Honest Analysis</h6>
                      <p className="text-[9px] text-slate-400">No fake guarantees</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h6 className="text-[11px] font-bold text-slate-800 dark:text-slate-100">Dynamic Planner</h6>
                      <p className="text-[9px] text-slate-400">Splits study time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h6 className="text-[11px] font-bold text-slate-800 dark:text-slate-100">Band Estimates</h6>
                      <p className="text-[9px] text-slate-400">Requires 3+ skills</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h6 className="text-[11px] font-bold text-slate-800 dark:text-slate-100">Instant Feedback</h6>
                      <p className="text-[9px] text-slate-400">Detailed explanations</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Categories Strip (Learnova Style) */}
      <section className="py-12 bg-white dark:bg-brand-darkCard border-y border-slate-200/80 dark:border-brand-darkBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">Exploration Hub</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white mt-1">
              Popular Prep Categories
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  href="/diagnostic"
                  className="p-4 rounded-2xl bg-brand-purple-light dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:shadow-md hover:border-brand-purple/30 transition-all text-center group"
                >
                  <div className={`w-12 h-12 rounded-xl mx-auto ${cat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200">{cat.name}</h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{cat.count}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section (3 Steps) */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">Methodology</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy dark:text-white">
            Your 3-Step Journey to Admission Readiness
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            From initial gap analysis to targeted daily practice, Wayfinder keeps you on track.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm relative space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-purple text-white font-extrabold text-xl flex items-center justify-center">
              1
            </div>
            <h3 className="text-xl font-bold text-brand-navy dark:text-white">Readiness Assessment</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Complete a 5-minute self-reported check on your English level, academic GPA, document status (SOP, LORs), and visa budget.
            </p>
          </div>

          <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm relative space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-purple text-white font-extrabold text-xl flex items-center justify-center">
              2
            </div>
            <h3 className="text-xl font-bold text-brand-navy dark:text-white">Diagnostic & Gap Analysis</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Test your Reading, Listening, Grammar, Vocabulary, Writing, and Speaking with realistic exam questions and instant feedback.
            </p>
          </div>

          <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-8 border border-slate-200 dark:border-brand-darkBorder shadow-sm relative space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-purple text-white font-extrabold text-xl flex items-center justify-center">
              3
            </div>
            <h3 className="text-xl font-bold text-brand-navy dark:text-white">Next Best Action Planner</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Follow your personalized daily plan that splits study minutes based on your weakest skills, dynamically re-ordering as you progress.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses / Prep Modules (Learnova Soft Lavender Card Section) */}
      <section id="skills" className="py-20 bg-brand-purple/5 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-brand-darkBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">Targeted Modules</span>
              <h2 className="text-3xl font-extrabold text-brand-navy dark:text-white mt-1">
                Curated Practice Sessions
              </h2>
            </div>
            <Link
              href="/diagnostic"
              className="mt-4 md:mt-0 text-sm font-bold text-brand-purple hover:underline flex items-center gap-1"
            >
              Explore All 6 Skill Modules <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredModules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-brand-darkCard rounded-2xl border border-slate-200 dark:border-brand-darkBorder overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className={`h-40 bg-gradient-to-r ${mod.bgGrad} p-6 flex flex-col justify-between text-white relative`}>
                    <span className="self-start px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold">
                      {mod.tag}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg leading-snug">{mod.title}</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Instructor: {mod.coach}</p>
                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500" />
                        <span>{mod.rating}</span>
                        <span className="text-slate-400 font-normal">({mod.reviews})</span>
                      </div>
                      <Link
                        href="/practice"
                        className="px-4 py-2 rounded-xl bg-brand-purple/10 text-brand-purple hover:bg-brand-purple hover:text-white font-bold text-xs transition-colors"
                      >
                        Start Session
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dark Navy Stats Band (Learnova Style) */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 mx-auto flex items-center justify-center text-brand-purple">
                <Users className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">12,500+</h3>
              <p className="text-xs text-purple-200">Active Applicants Coached</p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 mx-auto flex items-center justify-center text-brand-purple">
                <BookOpen className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">500+</h3>
              <p className="text-xs text-purple-200">Exam Diagnostic Questions</p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 mx-auto flex items-center justify-center text-brand-purple">
                <TrendingUp className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">88%</h3>
              <p className="text-xs text-purple-200">Study Consistency Boost</p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 mx-auto flex items-center justify-center text-brand-purple">
                <Globe className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">15+</h3>
              <p className="text-xs text-purple-200">Target Study Destinations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Honest-by-Design Section */}
      <section id="honest-design" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-brand-darkCard rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-brand-darkBorder shadow-sm grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Safety & Transparency First</span>
            </div>
            <h2 className="text-3xl font-extrabold text-brand-navy dark:text-white">
              Honest by Design. No Fake Guarantees.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Wayfinder rejects deceptive marketing claims. We will never display fabricated "99.8% visa success probabilities" or guaranteed admissions. Your readiness score is strictly computed from self-reported data and verified diagnostic results.
            </p>

            <ul className="space-y-2 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>IELTS band score predictions display explicit "Unofficial Practice Estimate" disclaimers.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Band estimates unlock only after completing tests in at least 3 distinct skills.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Clear labeling of unconfigured server AI endpoints as Rule-Based Demo feedback.</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center font-extrabold">
                W
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-navy dark:text-white">Student Safeguard Commitment</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Ethical AI Guidance</p>
              </div>
            </div>
            <p className="text-xs italic text-slate-600 dark:text-slate-300 leading-relaxed">
              "We believe students deserve honest feedback on their test performance and application readiness—not false promises."
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">Got Questions?</span>
          <h2 className="text-3xl font-extrabold text-brand-navy dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-brand-darkCard rounded-2xl border border-slate-200 dark:border-brand-darkBorder overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm text-brand-navy dark:text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-brand-purple' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-navy text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-xl">
              <Compass className="w-5 h-5 text-brand-purple" />
              <span>Wayfinder</span>
            </div>
            <p className="text-xs leading-relaxed">
              AI Study Abroad Readiness Coach. Empowering international students preparing for IELTS, TOEFL & study abroad applications.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Pages</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><Link href="/diagnostic" className="hover:text-white">Diagnostic Hub</Link></li>
              <li><Link href="/practice" className="hover:text-white">Practice Session</Link></li>
              <li><Link href="/planner" className="hover:text-white">Study Planner</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Assessments</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/assessment" className="hover:text-white">Readiness Flow</Link></li>
              <li><Link href="/assessment/results" className="hover:text-white">Results & Matrix</Link></li>
              <li><Link href="/progress" className="hover:text-white">Score History</Link></li>
              <li><Link href="/settings" className="hover:text-white">Account Settings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Ethics & Legal</h4>
            <p className="text-[11px] leading-relaxed mb-2">
              Wayfinder provides practice estimates only and is not affiliated with IDP, British Council, ETS, or PTE.
            </p>
            <p className="text-[10px] text-slate-500">© 2026 Wayfinder AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
