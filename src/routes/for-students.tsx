import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, BrainCircuit, FlaskConical, Gamepad2, Headphones, Puzzle, Trophy, Video } from "lucide-react";

export const Route = createFileRoute("/for-students")({
  head: () => ({
    meta: [
      { title: "For Students — Shiksha Saarthi" },
      { name: "description", content: "Learn fast with adaptive quizzes, virtual labs, audio drills, video quizzes, and educational games — for class 6 to 12." },
    ],
  }),
  component: ForStudents,
});

const FEATURES = [
  { i: BookOpen, t: "Adaptive courses", d: "Every lesson re-orders itself to your weak topics — no two students see the same path." },
  { i: BrainCircuit, t: "Mental ability tests", d: "MAT drills with reasoning, series, syllogisms — animated explanations after every answer." },
  { i: Headphones, t: "Audio quizzes", d: "Listen & answer for English, Hindi, and chemistry naming. Works fully offline." },
  { i: Video, t: "Video quizzes", d: "Watch a 90s clip, answer in 10. Concepts stick because you respond, not skim." },
  { i: FlaskConical, t: "Virtual experiments", d: "Run Ohm's Law, pendulum, electrolysis — full lab simulations from your laptop." },
  { i: Puzzle, t: "Puzzles & memory", d: "Memory Match, Match-the-Pieces, logic grids — revision that feels like play." },
  { i: Gamepad2, t: "Mini-games", d: "Number Ninja, Grammar Galaxy, Code Quest. XP and badges for every win." },
  { i: Trophy, t: "Leagues & streaks", d: "Weekly Vanguard League, daily streak shield, and badges your friends can see." },
];

function ForStudents() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand">Built for class 6 – 12</div>
        <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight md:text-6xl">Everything you need to top your class — and enjoy it.</h1>
        <p className="mt-4 text-lg text-zinc-500">Courses, games, virtual labs, MAT, audio, and video quizzes. One platform, every subject, online or offline.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/auth" search={{ mode: "signup" }} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-medium text-white">Create free account <ArrowRight className="size-4" /></Link>
          <Link to="/courses" className="inline-flex h-10 items-center rounded-full ring-1 ring-black/[0.1] px-5 text-sm font-medium hover:bg-zinc-50">Browse 28 courses</Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ i: Icon, t, d }) => (
          <div key={t} className="group rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="grid size-10 place-items-center rounded-xl bg-ink text-white"><Icon className="size-5" /></div>
            <h3 className="font-display mt-4 text-lg font-semibold">{t}</h3>
            <p className="mt-1 text-sm text-zinc-500">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 rounded-3xl border border-black/[0.06] bg-gradient-to-br from-brand-muted via-white to-white p-10 md:grid-cols-3">
        {[["3.4×","faster concept retention"],["+22%","average test improvement"],["87%","return next day"]].map(([n,t])=>(
          <div key={n}><div className="font-display text-5xl font-semibold text-brand">{n}</div><p className="mt-1 text-sm text-zinc-600">{t}</p></div>
        ))}
      </div>
    </div>
  );
}
