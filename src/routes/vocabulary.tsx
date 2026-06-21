import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { BookA, Flame } from "lucide-react";
import { VOCAB_CHAPTERS } from "@/lib/lms-data";

export const Route = createFileRoute("/vocabulary")({
  head: () => ({
    meta: [
      { title: "Vocabulary Builder — Shiksha Saarthi" },
      { name: "description", content: "Daily word streaks, idioms, academic word list, and chapter-aligned vocabulary for class 6 to 12." },
    ],
  }),
  component: VocabPage,
});

function VocabPage() {
  const isIndex = useRouterState({ select: (s) => s.location.pathname === "/vocabulary" });
  if (!isIndex) return <Outlet />;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand"><BookA className="size-3" /> Daily streak</div>
          <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight">Vocabulary builder</h1>
          <p className="mt-3 text-zinc-500">5 new words a day, with mnemonics, audio, and spaced repetition. Words you actually remember.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/[0.06] text-xs"><Flame className="size-4 text-amber-500" /> <span className="font-semibold">Today's set ready</span> · 5 words · 4 min</div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VOCAB_CHAPTERS.map((v) => (
          <Link key={v.slug} to={`/vocabulary/${v.slug}` as any} className="group block rounded-2xl border border-black/[0.06] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Class {v.grade}</div>
            <h3 className="font-display mt-2 text-xl font-semibold">{v.title}</h3>
            <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
              <span>{v.words} words</span>
              <span className="inline-flex items-center text-brand opacity-0 transition group-hover:opacity-100">Open chapter →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
