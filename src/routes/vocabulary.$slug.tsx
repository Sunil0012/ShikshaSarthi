import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookA, Sparkles } from "lucide-react";
import { useState } from "react";
import { VOCAB_DECKS } from "@/lib/games-data";
import { VOCAB_CHAPTERS } from "@/lib/lms-data";

export const Route = createFileRoute("/vocabulary/$slug")({
  loader: ({ params }) => {
    const ch = VOCAB_CHAPTERS.find((v) => v.slug === params.slug);
    const deck = VOCAB_DECKS[params.slug];
    if (!ch || !deck) throw notFound();
    return { chapter: ch, deck };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.chapter.title ?? "Vocabulary"} — Shiksha Saarthi` },
      { name: "description", content: `Learn ${loaderData?.chapter.title} vocabulary with examples and quizzes.` },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold">Chapter not found</h1>
      <Link to="/vocabulary" className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand"><ArrowLeft className="size-4" /> Back to vocabulary</Link>
    </div>
  ),
  errorComponent: () => <div className="px-6 py-12">Something went wrong loading this chapter.</div>,
  component: VocabPage,
});

function VocabPage() {
  const { chapter, deck } = Route.useLoaderData();
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const [learned, setLearned] = useState<Set<number>>(new Set());

  const card = deck[i];
  const progress = Math.round((learned.size / deck.length) * 100);

  function next() { setShow(false); setI((x) => (x + 1) % deck.length); }
  function prev() { setShow(false); setI((x) => (x - 1 + deck.length) % deck.length); }
  function mark() {
    setLearned((s) => new Set(s).add(i));
    next();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link to="/vocabulary" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-ink"><ArrowLeft className="size-3.5" /> Back to chapters</Link>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-muted px-3 py-1 text-[11px] font-medium text-brand"><BookA className="size-3" /> Class {chapter.grade}</span>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">{chapter.title}</h1>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Mastered</div>
          <div className="font-display text-2xl font-semibold">{learned.size}/{deck.length}</div>
          <div className="mt-1 h-1 w-32 overflow-hidden rounded-full bg-zinc-100"><div className="h-full bg-brand" style={{ width: `${progress}%` }} /></div>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-2 text-[11px] text-zinc-500">Word {i + 1} / {deck.length}</div>
        <div className="rounded-3xl border border-black/[0.06] bg-white p-10 text-center shadow-sm">
          <div className="font-display text-5xl font-semibold tracking-tight">{card.word}</div>
          {show ? (
            <div className="mt-6 space-y-4 text-left">
              <div className="rounded-xl bg-brand-muted px-5 py-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand">Meaning</div>
                <div className="mt-1 text-base font-medium text-ink">{card.meaning}</div>
              </div>
              <div className="rounded-xl bg-zinc-50 px-5 py-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Example</div>
                <div className="mt-1 italic text-zinc-700">"{card.example}"</div>
              </div>
            </div>
          ) : (
            <button onClick={() => setShow(true)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-white"><Sparkles className="size-3.5" /> Reveal meaning</button>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button onClick={prev} className="inline-flex items-center gap-1.5 rounded-full ring-1 ring-black/[0.1] px-4 py-2 text-sm font-medium hover:bg-zinc-50"><ArrowLeft className="size-4" /> Previous</button>
          {show ? (
            <button onClick={mark} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white">Got it · next <ArrowRight className="size-4" /></button>
          ) : (
            <button onClick={next} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2 text-sm font-medium text-white">Skip <ArrowRight className="size-4" /></button>
          )}
        </div>
      </div>
    </div>
  );
}
