import { SkillScore, NextBestAction, SkillType } from '@/types';

export function determineNextBestAction(skillScores: SkillScore[]): NextBestAction {
  // 1. First priority: Skills that have 0 tests recorded (unmeasured)
  const unmeasured = skillScores.filter(s => s.testedCount === 0);
  
  if (unmeasured.length > 0) {
    const target = unmeasured[0];
    return buildActionObject(
      target.skill,
      `Complete Diagnostic for ${capitalize(target.skill)}`,
      `You have not yet completed a diagnostic for ${capitalize(target.skill)}. Measuring this skill will help unlock your personalized study recommendations and unofficial band score.`,
      'high'
    );
  }

  // 2. Second priority: Lowest scoring measured skill
  const sorted = [...skillScores].sort((a, b) => a.rawScore - b.rawScore);
  const lowest = sorted[0];

  let priority: 'high' | 'medium' | 'low' = 'medium';
  if (lowest.rawScore < 60) priority = 'high';
  else if (lowest.rawScore > 80) priority = 'low';

  return buildActionObject(
    lowest.skill,
    `Targeted Practice: ${capitalize(lowest.skill)} Improvement`,
    `Your current performance in ${capitalize(lowest.skill)} is ${lowest.rawScore}%. Focused practice here will deliver the highest boost to your overall readiness.`,
    priority
  );
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function buildActionObject(
  skill: SkillType,
  title: string,
  rationale: string,
  priorityLevel: 'high' | 'medium' | 'low'
): NextBestAction {
  return {
    skill,
    title,
    rationale,
    ctaText: `Start ${capitalize(skill)} Practice`,
    targetUrl: `/practice?skill=${skill}`,
    priorityLevel
  };
}
