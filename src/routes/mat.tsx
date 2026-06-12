import { createFileRoute, Link } from "@tanstack/react-router";
import { BrainCircuit, Sparkles, Timer } from "lucide-react";
import { MAT_TOPICS } from "@/lib/lms-data";

export const Route = createFileRoute("/mat")({
  head: () => ({
    meta: [
      { title: "Mental Ability Tests — Shiksha Saarthi" },
      { name: "description", content: "Adaptive MAT practice covering series, analogies, coding, syllogisms, and more — with animated explanations." },
    ],
  }),
  component: MatPage,
});

function MatPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand"><BrainCircuit className="size-3" /> Reasoning · Aptitude</div>
          <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight">Mental Ability Tests</h1>
          <p className="mt-3 max-w-2xl text-zinc-500">Build reasoning, pattern recognition, and logical thinking with adaptive drills. Every question comes with an animated, step-by-step explanation in English or Hindi.</p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/[0.06] text-xs">
          <Sparkles className="size-4 text-brand" /><div><div className="font-semibold">Animated explanations</div><div className="text-zinc-500">Visual pattern reveals after every attempt</div></div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MAT_TOPICS.map((t) => (
          <Link key={t.slug} to={`/mat/${t.slug}` as any} className="group block rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t.level}</div>
            <h3 className="font-display mt-2 text-lg font-semibold">{t.title}</h3>
            <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
              <span>{t.questions} questions</span>
              <span className="inline-flex items-center gap-1"><Timer className="size-3" /> ~{Math.ceil(t.questions * 0.6)} min</span>
            </div>
            <div className="mt-4 inline-flex items-center text-xs font-medium text-brand opacity-0 transition group-hover:opacity-100">Start practice →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
