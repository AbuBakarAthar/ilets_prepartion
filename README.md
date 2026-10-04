# Wayfinder | AI Study Abroad Readiness Coach

Wayfinder is a complete, production-quality MVP web application designed to guide international students (especially candidates in Pakistan & globally preparing for IELTS, TOEFL, PTE, or OET) through study abroad readiness assessment, gap analysis, personalized study planning, and skill practice.

---

## 🌟 Key Features

1. **Learnova & OET Inspired Landing Page**: High-converting hero section with pill badges, floating benefit cards, 6 popular categories, soft lavender course cards, dark navy stats band, honest-by-design section, FAQ accordion, and clean footer.
2. **5-Step Readiness Assessment Wizard**: Multi-step flow assessing English baseline, academic transcripts/GPA, application status, visa budget/funding strategy, and essential document checklist (SOP, LOR, CV).
3. **Readiness Matrix Report**: Category score breakdown (English, Academic, Applications, Documents) with prioritized recommendations.
4. **Honest IELTS Band Estimator**: Displays an explicit **"Unofficial Practice Estimate"** disclaimer. Requires at least 3 distinct skill tests before unlocking.
5. **Next Best Action Engine**: Automatically identifies the lowest-scoring or unmeasured skill and generates plain-language rationale with direct CTA.
6. **Dynamic Study Planner**: Splits target daily study minutes (15–120 mins) across weak skill areas with explicit "Why this was recommended" lines. Dynamically re-orders tasks as completed and updates streak & weekly study time.
7. **Diagnostic & Interactive Practice Engine**:
   - 14 diagnostic questions (3 Reading, 3 Listening, 3 Grammar, 3 Vocabulary, 2 Writing prompts, 2 Speaking prompts).
   - Instant explanation rationales for MCQs.
   - Writing task evaluator with AI / rule-based structural feedback.
   - Speaking task recorder timer with 5-star self-evaluation.
8. **Progress & Performance Analytics**: Score trend bar charts and weekly study time line charts powered by Recharts.
9. **Account Settings & Data Erasure**: Daily commitment slider, light/dark mode switch (WCAG AA compliant), and functional full data reset.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router) & TypeScript
- **Styling & UI**: Tailwind CSS, Lucide React, Framer Motion (subtle interactions), shadcn/ui design tokens
- **Data Visualization**: Recharts
- **Database & Auth**: Supabase (PostgreSQL + RLS) with automatic local storage fallback when environment variables are omitted
- **AI Server Endpoint**: `/app/api/ai/evaluate/route.ts` (Rule-based demo fallback when `OPENAI_API_KEY` or `GEMINI_API_KEY` is absent)

---

## ⚙️ Environment Variables Setup

Create a `.env.local` file in the project root to connect live Supabase and AI keys:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# AI Evaluation Engine Key
OPENAI_API_KEY=your-openai-api-key
# OR
GEMINI_API_KEY=your-gemini-api-key
```

### 🏷️ Demo Mode vs Connected Services

| Feature | Demo Mode (Missing Keys) | Connected Live Mode |
|---|---|---|
| **Data Persistence** | Reactive browser `localStorage` state | Supabase Auth + PostgreSQL RLS |
| **Writing & Speaking Evaluation** | Labeled `[Rule-based Demo Feedback]` | Server-side AI Evaluation Endpoint |
| **Status Indicator** | Explicit top banner: `Demo Mode Active` | Connected Live Mode |

---

## 🚀 Running locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

---

## 📂 Folder Structure

```
/app
  /api/ai/evaluate -> Server route for AI responses
  /assessment      -> 5-step readiness wizard & results matrix
  /dashboard       -> Student dashboard & Next Best Action card
  /diagnostic      -> Skill diagnostic hub
  /goal-setup      -> Country & exam goal definition
  /login           -> Sign in flow
  /onboarding      -> Student background setup
  /planner         -> Personal daily study planner
  /practice        -> Interactive practice session (Writing/Speaking/MCQ)
  /profile         -> User profile details
  /progress        -> Score history & Recharts analytics
  /settings        -> Daily minutes target, theme, data reset
  /signup          -> Sign up flow
/components
  /layout          -> AppShell, DesktopSidebar, MobileTabBar, TopHeader, DemoBanner
/data              -> Question bank (Reading, Listening, Grammar, Vocabulary, Writing, Speaking)
/lib               -> Scoring engine, planner algorithm, next best action rules, store state
/services          -> Supabase client & AI routes
/types             -> TypeScript domain interfaces
```
