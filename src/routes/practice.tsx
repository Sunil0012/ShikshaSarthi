import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, Brain, Sparkles, Beaker, Puzzle, Languages } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice — Shiksha Saarthi" },
      { name: "description", content: "Sharpen your skills with subject-wise practice quizzes from Class 6 to 12." },
    ],
  }),
  component: Page,
});

const SUBJECTS = [
  { slug: "Mathematics", emoji: "📐", color: "from-blue-500/10 to-blue-500/0" },
  { slug: "Science", emoji: "🔬", color: "from-emerald-500/10 to-emerald-500/0" },
  { slug: "Physics", emoji: "⚛️", color: "from-violet-500/10 to-violet-500/0" },
  { slug: "Chemistry", emoji: "🧪", color: "from-orange-500/10 to-orange-500/0" },
  { slug: "Biology", emoji: "🧬", color: "from-pink-500/10 to-pink-500/0" },
  { slug: "English", emoji: "📚", color: "from-amber-500/10 to-amber-500/0" },
  { slug: "Social Studies", emoji: "🌍", color: "from-teal-500/10 to-teal-500/0" },
  { slug: "Computer Science", emoji: "💻", color: "from-indigo-500/10 to-indigo-500/0" },
];

const QUICK_LINKS = [
  { to: "/mat", label: "Mental Ability", icon: Brain },
  { to: "/experiments", label: "Virtual Labs", icon: Beaker },
  { to: "/puzzles", label: "Puzzles", icon: Puzzle },
  { to: "/vocabulary", label: "Vocabulary", icon: Languages },
];

function Page() {
  const isIndex = useRouterState({ select: (s) => s.location.pathname === "/practice" });
  if (!isIndex) return <Outlet />;

  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      const { data } = await (supabase as any).from("practice_questions").select("subject");
      const c: Record<string, number> = {};
      (data ?? []).forEach((r: any) => { c[r.subject] = (c[r.subject] ?? 0) + 1; });
      setCounts(c);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand">
        <Sparkles className="size-3" /> Daily practice
      </div>
      <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight">Practice makes brilliant.</h1>
      <p className="mt-3 max-w-2xl text-zinc-500">
        Choose a subject, pick your class, and take a timed quiz from our curated question bank. Track your accuracy and beat your best score.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SUBJECTS.map((s) => (
          <Link key={s.slug} to="/practice/$subject" params={{ subject: s.slug }}
            className={`group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-gradient-to-br ${s.color} p-6 transition hover:-translate-y-0.5 hover:shadow-md`}>
            <div className="text-4xl">{s.emoji}</div>
            <div className="font-display mt-4 text-xl font-semibold">{s.slug}</div>
            <div className="mt-1 text-xs text-zinc-500">{counts[s.slug] ?? 0} questions available</div>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
              Start practice →
            </div>
          </Link>
        ))}
      </div>

      <h2 className="font-display mt-16 text-2xl font-semibold">More ways to practice</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {QUICK_LINKS.map((l) => {
          const Icon = l.icon;
          return (
            <Link key={l.to} to={l.to}
              className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white p-4 transition hover:border-brand/40">
              <span className="grid size-9 place-items-center rounded-lg bg-brand-muted text-brand"><Icon className="size-4" /></span>
              <span className="text-sm font-medium">{l.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl border border-black/[0.06] bg-white p-6">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-0.5 size-5 text-brand" />
          <div>
            <h3 className="font-display text-lg font-semibold">Looking for a full course?</h3>
            <p className="mt-1 text-sm text-zinc-500">Practice gives you bite-sized reps. For structured learning, explore teacher-led courses.</p>
            <Link to="/courses" className="mt-3 inline-flex rounded-full bg-ink px-4 py-1.5 text-xs font-medium text-white">Browse courses</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
