import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Heart, Sparkles, Timer, Trophy, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { QUIZ_BANK } from "@/lib/lms-data";

export const Route = createFileRoute("/games/quiz-arena")({
  head: () => ({
    meta: [
      { title: "Quiz Arena — Shiksha Saarthi" },
      { name: "description", content: "A timed, lives-based quiz battle with streak bonuses. Pick the right answer before time runs out." },
    ],
  }),
  component: QuizArena,
});

function shuffle<T>(arr: T[]) { return [...arr].sort(() => Math.random() - 0.5); }

function QuizArena() {
  const [bank] = useState(() => shuffle(QUIZ_BANK));
  const [i, setI] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [time, setTime] = useState(15);
  const q = bank[i];
  const finished = lives <= 0 || i >= bank.length;

  const xp = useMemo(() => score * 25, [score]);

  useEffect(() => {
    if (finished || picked !== null) return;
    if (time <= 0) { setLives((l) => l - 1); setStreak(0); setPicked(-1); return; }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [time, picked, finished]);

  function choose(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) {
      setScore((s) => s + 1 + Math.floor(streak / 2));
      setStreak((s) => s + 1);
    } else {
      setLives((l) => l - 1);
      setStreak(0);
    }
  }

  function next() {
    setI((x) => x + 1);
    setPicked(null);
    setTime(15);
  }

  function reset() {
    window.location.reload();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between">
        <Link to="/games" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-ink"><ArrowLeft className="size-3.5" /> Back to games</Link>
        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1"><Heart className="size-3.5 text-rose-500" /> {lives}</span>
          <span className="inline-flex items-center gap-1"><Sparkles className="size-3.5 text-brand" /> {xp} XP</span>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium">Streak ×{streak}</span>
        </div>
      </div>

      {!finished && (
        <>
          <div className="mt-6 flex items-center justify-between">
            <div className="text-xs text-zinc-500">Question {i + 1} / {bank.length}</div>
            <div className="inline-flex items-center gap-1 text-xs font-medium"><Timer className="size-3.5" /> {time}s</div>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-zinc-100">
            <div className="h-full bg-brand transition-all" style={{ width: `${(time / 15) * 100}%` }} />
          </div>

          <div className="mt-6 rounded-3xl border border-black/[0.06] bg-white p-7">
            <h2 className="font-display text-2xl font-semibold leading-snug">{q.q}</h2>
            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {q.choices.map((c, idx) => {
                const isAns = idx === q.answer;
                const isPicked = picked === idx;
                const reveal = picked !== null;
                const cls = reveal
                  ? isAns
                    ? "border-emerald-400/40 bg-emerald-50 text-emerald-900"
                    : isPicked
                      ? "border-rose-400/40 bg-rose-50 text-rose-900"
                      : "border-black/[0.06] bg-white text-zinc-500"
                  : "border-black/[0.08] bg-white hover:border-ink hover:bg-zinc-50";
                return (
                  <button key={idx} onClick={() => choose(idx)} className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${cls}`}>
                    <span>{c}</span>
                    {reveal && isAns && <Check className="size-4" />}
                    {reveal && isPicked && !isAns && <X className="size-4" />}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="mt-5 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
                <strong>Why:</strong> {q.explain}
              </div>
            )}
            {picked !== null && (
              <button onClick={next} className="mt-5 w-full rounded-full bg-ink px-4 py-3 text-sm font-medium text-white">Next →</button>
            )}
          </div>
        </>
      )}

      {finished && (
        <div className="mt-10 rounded-3xl border border-black/[0.06] bg-white p-8 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-brand-muted text-brand"><Trophy className="size-6" /></div>
          <h2 className="font-display mt-4 text-3xl font-semibold">Run complete</h2>
          <p className="mt-1 text-sm text-zinc-500">You scored <strong>{score}</strong> / {bank.length} and earned <strong>{xp} XP</strong>.</p>
          <div className="mt-5 flex justify-center gap-2">
            <button onClick={reset} className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-sm font-medium text-white">Play again</button>
            <Link to="/leaderboard" className="inline-flex h-10 items-center rounded-full ring-1 ring-black/[0.1] px-5 text-sm font-medium hover:bg-zinc-50">View leaderboard</Link>
          </div>
        </div>
      )}
    </div>
  );
}
