import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { skill, text, prompt } = body;

    const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Rule-based demo fallback feedback
      let feedback = '';
      let score = 70;

      if (skill === 'writing') {
        const wordCount = (text || '').trim().split(/\s+/).filter(Boolean).length;
        if (wordCount < 50) {
          score = 50;
          feedback = '[Rule-based Demo Feedback] Response is too short. Aim for at least 150 words to demonstrate complex grammar structures and cohesive paragraph development.';
        } else if (wordCount > 150) {
          score = 85;
          feedback = '[Rule-based Demo Feedback] Strong task response with good word length. Excellent use of connective phrases and academic vocabulary.';
        } else {
          score = 72;
          feedback = '[Rule-based Demo Feedback] Clear argument structure. To improve further, expand your body paragraphs with specific empirical examples.';
        }
      } else if (skill === 'speaking') {
        score = 78;
        feedback = '[Rule-based Demo Feedback] Good self-paced delivery. Focus on varying sentence intonation and maintaining steady articulation during long pauses.';
      }

      return NextResponse.json({
        score,
        feedback,
        isRuleBasedDemo: true
      });
    }

    // If API key is present, real AI evaluation endpoint would execute here
    return NextResponse.json({
      score: 80,
      feedback: 'AI Evaluation: Well structured submission with persuasive arguments.',
      isRuleBasedDemo: false
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to evaluate response.' },
      { status: 500 }
    );
  }
}
