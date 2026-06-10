import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw, Sparkles, Timer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MEMORY_DECK } from "@/lib/lms-data";

export const Route = createFileRoute("/games/memory-match")({
  head: () => ({
    meta: [
      { title: "Memory Match — Shiksha Saarthi" },
      { name: "description", content: "Flip and match concept cards. A playable memory game from Shiksha Saarthi." },
    ],
  }),
  component: MemoryMatch,
});

type Card = { uid: string; pairId: string; face: string; flipped: boolean; matched: boolean };

function buildDeck(): Card[] {
  const cards: Card[] = [];
  MEMORY_DECK.forEach((p) => {
    cards.push({ uid: `${p.id}-a`, pairId: p.id, face: p.label, flipped: false, matched: false });
    cards.push({ uid: `${p.id}-b`, pairId: p.id, face: p.match, flipped: false, matched: false });
  });
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>(() => buildDeck());
  const [flipped, setFlipped] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);

  const matchedCount = useMemo(() => cards.filter((c) => c.matched).length, [cards]);
  const won = matchedCount === cards.length;

  useEffect(() => {
    if (!started || won) return;
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [started, won]);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped;
    const ca = cards.find((c) => c.uid === a)!;
    const cb = cards.find((c) => c.uid === b)!;
    setMoves((m) => m + 1);
    if (ca.pairId === cb.pairId) {
      setTimeout(() => {
        setCards((cs) => cs.map((c) => (c.uid === a || c.uid === b ? { ...c, matched: true } : c)));
        setFlipped([]);
      }, 350);
    } else {
      setTimeout(() => {
        setCards((cs) => cs.map((c) => (c.uid === a || c.uid === b ? { ...c, flipped: false } : c)));
        setFlipped([]);
      }, 800);
    }
  }, [flipped, cards]);

  function onFlip(uid: string) {
    if (!started) setStarted(true);
    if (flipped.length === 2) return;
    const c = cards.find((x) => x.uid === uid);
    if (!c || c.flipped || c.matched) return;
    setCards((cs) => cs.map((x) => (x.uid === uid ? { ...x, flipped: true } : x)));
    setFlipped((f) => [...f, uid]);
  }

  function reset() {
    setCards(buildDeck());
    setFlipped([]);
    setMoves(0);
    setElapsed(0);
    setStarted(false);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between">
        <Link to="/games" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-ink"><ArrowLeft className="size-3.5" /> Back to games</Link>
        <button onClick={reset} className="inline-flex h-8 items-center gap-1.5 rounded-full ring-1 ring-black/[0.1] px-3 text-xs font-medium hover:bg-zinc-50"><RotateCcw className="size-3.5" /> Reset</button>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand"><Sparkles className="size-3" /> Cognition · Class 6-12</div>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">Memory Match</h1>
          <p className="mt-1 text-sm text-zinc-500">Match the concept with its symbol, formula, or value. Fewer moves = more XP.</p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl bg-white px-5 py-3 ring-1 ring-black/[0.06]">
          <div className="text-center"><div className="font-display text-2xl font-semibold">{moves}</div><div className="text-[10px] uppercase tracking-widest text-zinc-500">Moves</div></div>
          <div className="text-center"><div className="font-display text-2xl font-semibold">{matchedCount / 2}/{cards.length / 2}</div><div className="text-[10px] uppercase tracking-widest text-zinc-500">Pairs</div></div>
          <div className="text-center"><div className="inline-flex items-center gap-1 font-display text-2xl font-semibold"><Timer className="size-4 text-zinc-400" />{Math.floor(elapsed / 60)}:{(elapsed % 60).toString().padStart(2, "0")}</div><div className="text-[10px] uppercase tracking-widest text-zinc-500">Time</div></div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-4">
        {cards.map((c) => {
          const open = c.flipped || c.matched;
          return (
            <button
              key={c.uid}
              onClick={() => onFlip(c.uid)}
              className={`relative aspect-[3/4] rounded-2xl border transition-all duration-300 ${
                open
                  ? c.matched
                    ? "border-brand/30 bg-brand-muted text-ink"
                    : "border-black/[0.08] bg-white text-ink"
                  : "border-black/[0.06] bg-ink text-white hover:scale-[1.02]"
              }`}
            >
              <span className={`absolute inset-0 grid place-items-center px-2 text-center text-sm font-medium ${open ? "opacity-100" : "opacity-0"}`}>{c.face}</span>
              <span className={`absolute inset-0 grid place-items-center transition-opacity ${open ? "opacity-0" : "opacity-100"}`}>
                <span className="font-display text-2xl text-white/80">?</span>
              </span>
            </button>
          );
        })}
      </div>

      {won && (
        <div className="mt-8 rounded-3xl border border-brand/20 bg-brand-muted p-6">
          <h2 className="font-display text-2xl font-semibold">🎉 Cleared in {moves} moves and {Math.floor(elapsed / 60)}:{(elapsed % 60).toString().padStart(2, "0")}.</h2>
          <p className="mt-1 text-sm text-zinc-600">You earned <strong>{Math.max(80, 400 - moves * 8)} XP</strong>. Want to push for a faster time?</p>
          <div className="mt-4 flex gap-2">
            <button onClick={reset} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-white">Play again</button>
            <Link to="/games" className="inline-flex h-9 items-center rounded-full ring-1 ring-black/[0.1] px-4 text-sm font-medium hover:bg-white">More games</Link>
          </div>
        </div>
      )}
    </div>
  );
}
