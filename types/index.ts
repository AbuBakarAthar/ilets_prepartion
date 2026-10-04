export type ExamType = 'IELTS' | 'TOEFL' | 'PTE' | 'OET';
export type SkillType = 'reading' | 'listening' | 'writing' | 'speaking' | 'vocabulary' | 'grammar';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  educationLevel: string;
  fieldOfStudy: string;
  createdAt: string;
}

export interface GoalSetup {
  targetCountry: string;
  targetDegree: string;
  targetIntake: string;
  examType: ExamType;
  examDate: string;
  targetScore: string;
  dailyStudyMinutes: number;
}

export interface AssessmentData {
  englishProficiency: 'beginner' | 'intermediate' | 'advanced' | 'fluent';
  academicGPA: string;
  academicTranscriptsReady: boolean;
  applicationStage: 'not_started' | 'researching' | 'preparing_docs' | 'submitted';
  budgetStatus: 'self_funded' | 'need_scholarship' | 'partial_funding';
  documentsChecklist: {
    passport: boolean;
    transcripts: boolean;
    sop: boolean;
    lor: boolean;
    cv: boolean;
  };
}

export interface SkillScore {
  skill: SkillType;
  rawScore: number; // 0 - 100
  bandEstimate?: string; // e.g. "6.5"
  testedCount: number;
  lastTestedAt?: string;
}

export interface PracticeResult {
  id: string;
  skill: SkillType;
  score: number; // 0-100
  questionId: string;
  userAnswer: string;
  feedback?: string;
  bandEstimate?: string;
  timestamp: string;
}

export interface PlannerTask {
  id: string;
  skill: SkillType;
  title: string;
  durationMinutes: number;
  reason: string;
  completed: boolean;
  date: string;
}

export interface NextBestAction {
  skill: SkillType;
  title: string;
  rationale: string;
  ctaText: string;
  targetUrl: string;
  priorityLevel: 'high' | 'medium' | 'low';
}

export interface ReadinessCategoryScore {
  category: 'English' | 'Academic' | 'Applications' | 'Documents';
  score: number; // 0 - 100
  status: 'Needs Work' | 'In Progress' | 'Strong' | 'Ready';
  details: string;
}

export interface Question {
  id: string;
  skill: SkillType;
  title: string;
  prompt: string;
  passage?: string; // for Reading
  audioUrl?: string; // for Listening audio or text transcript representation
  options?: string[]; // for MCQs
  correctAnswer?: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
