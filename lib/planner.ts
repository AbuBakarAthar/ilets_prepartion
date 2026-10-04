import { PlannerTask, SkillScore, SkillType } from '@/types';

export function generateDailyPlan(
  dailyTotalMinutes: number,
  skillScores: SkillScore[],
  existingTasks: PlannerTask[] = []
): PlannerTask[] {
  const today = new Date().toISOString().split('T')[0];
  
  // If today's tasks already exist, return them
  const existingToday = existingTasks.filter(t => t.date === today);
  if (existingToday.length > 0) {
    return existingToday;
  }

  // Rank skills from lowest to highest score
  const sortedSkills = [...skillScores].sort((a, b) => {
    // Untested skills first, then lowest rawScore
    if (a.testedCount === 0 && b.testedCount > 0) return -1;
    if (b.testedCount === 0 && a.testedCount > 0) return 1;
    return a.rawScore - b.rawScore;
  });

  // Pick top 2 to 3 target skills
  const targetSkills = sortedSkills.slice(0, Math.min(3, sortedSkills.length));
  
  // Distribute minutes (e.g. 50% for weakest, 30% for 2nd, 20% for 3rd)
  const taskDistribution = [0.5, 0.3, 0.2];
  
  const tasks: PlannerTask[] = targetSkills.map((skillItem, index) => {
    const share = taskDistribution[index] || 0.2;
    const durationMinutes = Math.max(10, Math.round(dailyTotalMinutes * share));
    const skillName = capitalize(skillItem.skill);
    
    let reason = `Recommended because ${skillName} is currently your lowest-scoring area (${skillItem.rawScore}%).`;
    if (skillItem.testedCount === 0) {
      reason = `Recommended because you have not completed a diagnostic for ${skillName} yet.`;
    }

    const taskTitleMap: Record<SkillType, string> = {
      reading: 'Skimming & Passage Analysis Practice',
      listening: 'Academic Audio & Note-taking Drills',
      writing: 'Essay Task Structure & Paragraph Drafting',
      speaking: 'Part 2 Cue Card Fluency Builder',
      grammar: 'Complex Sentence Structure Drills',
      vocabulary: 'Academic Collocations & Synonym Flashcards'
    };

    return {
      id: `task-${today}-${skillItem.skill}-${index}`,
      skill: skillItem.skill,
      title: taskTitleMap[skillItem.skill] || `${skillName} Skill Practice`,
      durationMinutes,
      reason,
      completed: false,
      date: today
    };
  });

  return tasks;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
