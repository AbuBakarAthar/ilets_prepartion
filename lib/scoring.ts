import { AssessmentData, SkillScore, SkillType, PracticeResult } from '@/types';

export function calculateReadinessCategories(assessment: AssessmentData | null) {
  if (!assessment) {
    return [
      { category: 'English', score: 40, status: 'Needs Work' as const, details: 'Self-reported proficiency pending diagnostic verification.' },
      { category: 'Academic', score: 50, status: 'In Progress' as const, details: 'GPA documented, transcripts evaluation required.' },
      { category: 'Applications', score: 30, status: 'Needs Work' as const, details: 'Application research stage incomplete.' },
      { category: 'Documents', score: 20, status: 'Needs Work' as const, details: 'Key documents (SOP, LOR, CV) not yet finalized.' },
    ];
  }

  // 1. English
  let englishScore = 40;
  if (assessment.englishProficiency === 'intermediate') englishScore = 60;
  if (assessment.englishProficiency === 'advanced') englishScore = 80;
  if (assessment.englishProficiency === 'fluent') englishScore = 95;

  // 2. Academic
  let academicScore = 60;
  if (assessment.academicTranscriptsReady) academicScore += 25;
  if (parseFloat(assessment.academicGPA) >= 3.5) academicScore += 15;

  // 3. Applications
  let appScore = 20;
  if (assessment.applicationStage === 'researching') appScore = 45;
  if (assessment.applicationStage === 'preparing_docs') appScore = 75;
  if (assessment.applicationStage === 'submitted') appScore = 95;

  // 4. Documents
  const docs = assessment.documentsChecklist;
  const docCount = Object.values(docs).filter(Boolean).length;
  const docScore = Math.round((docCount / 5) * 100);

  const getStatus = (score: number) => {
    if (score < 45) return 'Needs Work' as const;
    if (score < 75) return 'In Progress' as const;
    if (score < 90) return 'Strong' as const;
    return 'Ready' as const;
  };

  return [
    {
      category: 'English' as const,
      score: englishScore,
      status: getStatus(englishScore),
      details: `${assessment.englishProficiency.toUpperCase()} self-reported proficiency level.`
    },
    {
      category: 'Academic' as const,
      score: academicScore,
      status: getStatus(academicScore),
      details: `GPA ${assessment.academicGPA || 'N/A'}. Transcripts ${assessment.academicTranscriptsReady ? 'verified' : 'pending'}.`
    },
    {
      category: 'Applications' as const,
      score: appScore,
      status: getStatus(appScore),
      details: `Current stage: ${assessment.applicationStage.replace('_', ' ')}.`
    },
    {
      category: 'Documents' as const,
      score: docScore,
      status: getStatus(docScore),
      details: `${docCount} of 5 essential application documents ready.`
    }
  ];
}

/**
 * Calculates IELTS Band Score estimate safely.
 * Safety Rule: IELTS band estimates must be labelled "unofficial practice estimate" and shown only after 3+ skills are tested.
 */
export function calculateBandEstimate(results: PracticeResult[]): {
  band: string | null;
  skillsTestedCount: number;
  label: string;
  isEligible: boolean;
} {
  const testedSkills = new Set(results.map(r => r.skill));
  const skillsTestedCount = testedSkills.size;

  if (skillsTestedCount < 3) {
    return {
      band: null,
      skillsTestedCount,
      label: 'Complete practice in at least 3 skills to unlock your band estimate.',
      isEligible: false
    };
  }

  // Calculate average percentage score across tested skills
  const skillAverages: Record<string, number> = {};
  testedSkills.forEach(skill => {
    const skillResults = results.filter(r => r.skill === skill);
    const avg = skillResults.reduce((acc, curr) => acc + curr.score, 0) / skillResults.length;
    skillAverages[skill] = avg;
  });

  const overallAvg = Object.values(skillAverages).reduce((a, b) => a + b, 0) / Object.values(skillAverages).length;

  // Map 0-100 percentage to IELTS Band 4.0 - 9.0
  let bandNumeric = 4.0 + (overallAvg / 100) * 5.0; // 4.0 to 9.0
  // Round to nearest 0.5
  bandNumeric = Math.round(bandNumeric * 2) / 2;
  const band = bandNumeric.toFixed(1);

  return {
    band,
    skillsTestedCount,
    label: 'unofficial practice estimate',
    isEligible: true
  };
}

export function computeSkillScores(results: PracticeResult[]): SkillScore[] {
  const allSkills: SkillType[] = ['reading', 'listening', 'writing', 'speaking', 'vocabulary', 'grammar'];

  return allSkills.map(skill => {
    const skillResults = results.filter(r => r.skill === skill);
    if (skillResults.length === 0) {
      return {
        skill,
        rawScore: 0,
        testedCount: 0
      };
    }

    const avgScore = Math.round(
      skillResults.reduce((acc, curr) => acc + curr.score, 0) / skillResults.length
    );
    const lastResult = skillResults[skillResults.length - 1];

    return {
      skill,
      rawScore: avgScore,
      testedCount: skillResults.length,
      lastTestedAt: lastResult?.timestamp
    };
  });
}
