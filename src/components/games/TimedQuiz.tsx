import { Link } from "@tanstack/react-router";
import { ArrowLeft, Award, CheckCircle2, Heart, RotateCcw, Timer, XCircle, Zap } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Q } from "@/lib/games-data";

type Props = {
  title: string;
  subject: string;
  accent: string; // tailwind bg class for header chip
  bank: Q[];
  questionTime?: number; // seconds per question
  totalLives?: number;
  description?: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function TimedQuiz({ title, subject, accent, bank, questionTime = 15, totalLives = 3, description }: Props) {
  const [deck, setDeck] = useState<Q[]>(() => shuffle(bank));
  const [i, setI] = useState(0);
  const [lives, setLives] = useState(totalLives);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [time, setTime] = useState(questionTime);
  const [done, setDone] = useState(false);
  const lockRef = useRef(false);

  const current = deck[i];
  const best = useMemo(() => Number(typeof window !== "undefined" ? localStorage.getItem(`best:${title}`) ?? "0" : "0"), [title]);

  const next = useCallback(() => {
    lockRef.current = false;
    setPicked(null);
    setTime(questionTime);
    if (i + 1 >= deck.length || lives <= 0) {
      setDone(true);
      if (typeof window !== "undefined" && score > best) localStorage.setItem(`best:${title}`, String(score));
    } else {
      setI((x) => x + 1);
    }
  }, [i, deck.length, lives, questionTime, score, best, title]);

  function pick(idx: number) {
    if (lockRef.current || done) return;
    lockRef.current = true;
    setPicked(idx);
    const correct = idx === current.answer;
    if (correct) {
      const bonus = Math.max(5, time * 5) + streak * 10;
      setScore((s) => s + bonus);
      setStreak((s) => s + 1);
    } else {
      setLives((l) => l - 1);
      setStreak(0);
    }
    setTimeout(next, 1400);
  }

  useEffect(() => {
    if (done) return;
    if (time <= 0) {
      if (!lockRef.current) {
        lockRef.current = true;
        setLives((l) => l - 1);
        setStreak(0);
        setPicked(-1);
        setTimeout(next, 1100);
      }
      return;
    }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [time, done, next]);

  useEffect(() => {
    if (lives <= 0 && !done) {
      setDone(true);
      if (typeof window !== "undefined" && score > best) localStorage.setItem(`best:${title}`, String(score));
    }
  }, [lives, done, score, best, title]);

  function reset() {
    setDeck(shuffle(bank));
    setI(0); setLives(totalLives); setScore(0); setStreak(0);
    setPicked(null); setTime(questionTime); setDone(false);
    lockRef.current = false;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <Link to="/games" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-ink"><ArrowLeft className="size-3.5" /> Back to games</Link>
        <button onClick={reset} className="inline-flex h-8 items-center gap-1.5 rounded-full ring-1 ring-black/[0.1] px-3 text-xs font-medium hover:bg-zinc-50"><RotateCcw className="size-3.5" /> Restart</button>
      </div>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white ${accent}`}>{subject}</span>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="mt-1 text-sm text-zinc-500">{description}</p>}
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/[0.06] text-xs">
          <Stat icon={<Heart className="size-3.5 text-rose-500" />} label="Lives" value={`${lives}`} />
          <Stat icon={<Zap className="size-3.5 text-amber-500" />} label="Streak" value={`${streak}`} />
          <Stat icon={<Award className="size-3.5 text-emerald-500" />} label="Score" value={`${score}`} />
        </div>
      </div>

      {done ? (
        <div className="mt-10 rounded-3xl border border-black/[0.06] bg-white p-8 text-center">
          <h2 className="font-display text-3xl font-semibold">{lives > 0 ? "🎉 Round complete!" : "Game over"}</h2>
          <p className="mt-2 text-zinc-500">Final score · <span className="font-display text-2xl text-ink">{score}</span></p>
          {score >= best && best > 0 && <p className="mt-1 text-sm text-emerald-600">New personal best!</p>}
          <div className="mt-6 flex justify-center gap-2">
            <button onClick={reset} className="inline-flex h-9 items-center rounded-full bg-ink px-5 text-sm font-medium text-white">Play again</button>
            <Link to="/games" className="inline-flex h-9 items-center rounded-full ring-1 ring-black/[0.1] px-5 text-sm font-medium hover:bg-zinc-50">More games</Link>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Question {i + 1} / {deck.length}</span>
            <span className="inline-flex items-center gap-1"><Timer className="size-3" /> {time}s</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-100">
            <div className="h-full bg-brand transition-all" style={{ width: `${(time / questionTime) * 100}%` }} />
          </div>
          <div className="mt-6 rounded-3xl border border-black/[0.06] bg-white p-6">
            <div className="font-display text-xl font-semibold">{current.q}</div>
            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {current.choices.map((c, idx) => {
                const isAnswer = idx === current.answer;
                const isPicked = picked === idx;
                const reveal = picked !== null;
                const cls = reveal
                  ? isAnswer
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                    : isPicked
                      ? "border-rose-500 bg-rose-50 text-rose-800"
                      : "border-black/[0.06] text-zinc-500"
                  : "border-black/[0.08] hover:border-ink hover:bg-zinc-50";
                return (
                  <button key={idx} onClick={() => pick(idx)} disabled={picked !== null} className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${cls}`}>
                    <span>{c}</span>
                    {reveal && isAnswer && <CheckCircle2 className="size-4" />}
                    {reveal && isPicked && !isAnswer && <XCircle className="size-4" />}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="mt-4 rounded-xl bg-zinc-50 px-4 py-3 text-xs text-zinc-700"><strong>Explanation:</strong> {current.explain}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-1 font-display text-lg font-semibold">{icon}{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-zinc-500">{label}</div>
    </div>
  );
}
