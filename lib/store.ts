'use client';

import { UserProfile, GoalSetup, AssessmentData, PracticeResult, PlannerTask } from '@/types';

const INITIAL_PROFILE: UserProfile = {
  id: 'usr_demo_123',
  name: 'Hamza Khan',
  email: 'hamza.khan@example.com',
  educationLevel: 'Bachelors in Computer Science',
  fieldOfStudy: 'Engineering & Technology',
  createdAt: new Date().toISOString()
};

const INITIAL_GOAL: GoalSetup = {
  targetCountry: 'United Kingdom',
  targetDegree: 'MSc Data Science',
  targetIntake: 'Fall 2025',
  examType: 'IELTS',
  examDate: '2025-11-15',
  targetScore: '7.5',
  dailyStudyMinutes: 45
};

const INITIAL_ASSESSMENT: AssessmentData = {
  englishProficiency: 'intermediate',
  academicGPA: '3.4',
  academicTranscriptsReady: true,
  applicationStage: 'researching',
  budgetStatus: 'need_scholarship',
  documentsChecklist: {
    passport: true,
    transcripts: true,
    sop: false,
    lor: false,
    cv: true
  }
};

const INITIAL_PRACTICE_RESULTS: PracticeResult[] = [
  {
    id: 'res-1',
    skill: 'reading',
    score: 75,
    questionId: 'rd-1',
    userAnswer: 'Strain on municipal infrastructure and resources',
    feedback: 'Excellent passage comprehension and key detail extraction.',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'res-2',
    skill: 'grammar',
    score: 66,
    questionId: 'gm-1',
    userAnswer: 'detected',
    feedback: 'Good understanding of third conditional inverted structures.',
    timestamp: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

export function getStoredData() {
  if (typeof window === 'undefined') {
    return {
      profile: INITIAL_PROFILE,
      goal: INITIAL_GOAL,
      assessment: INITIAL_ASSESSMENT,
      practiceResults: INITIAL_PRACTICE_RESULTS,
      plannerTasks: [] as PlannerTask[],
      streak: 4,
      weeklyMinutes: 135
    };
  }

  try {
    const p = localStorage.getItem('wayfinder_profile');
    const g = localStorage.getItem('wayfinder_goal');
    const a = localStorage.getItem('wayfinder_assessment');
    const r = localStorage.getItem('wayfinder_results');
    const t = localStorage.getItem('wayfinder_tasks');
    const s = localStorage.getItem('wayfinder_streak');
    const w = localStorage.getItem('wayfinder_weekly_min');

    return {
      profile: p ? JSON.parse(p) : INITIAL_PROFILE,
      goal: g ? JSON.parse(g) : INITIAL_GOAL,
      assessment: a ? JSON.parse(a) : INITIAL_ASSESSMENT,
      practiceResults: r ? JSON.parse(r) : INITIAL_PRACTICE_RESULTS,
      plannerTasks: t ? JSON.parse(t) : [],
      streak: s ? parseInt(s, 10) : 4,
      weeklyMinutes: w ? parseInt(w, 10) : 135
    };
  } catch (e) {
    return {
      profile: INITIAL_PROFILE,
      goal: INITIAL_GOAL,
      assessment: INITIAL_ASSESSMENT,
      practiceResults: INITIAL_PRACTICE_RESULTS,
      plannerTasks: [],
      streak: 4,
      weeklyMinutes: 135
    };
  }
}

export function saveStoredData(key: string, data: any) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`wayfinder_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export function clearAllStoredData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('wayfinder_profile');
  localStorage.removeItem('wayfinder_goal');
  localStorage.removeItem('wayfinder_assessment');
  localStorage.removeItem('wayfinder_results');
  localStorage.removeItem('wayfinder_tasks');
  localStorage.removeItem('wayfinder_streak');
  localStorage.removeItem('wayfinder_weekly_min');
}
