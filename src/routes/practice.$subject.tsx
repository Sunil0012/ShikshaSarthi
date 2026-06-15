import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, RotateCcw, Trophy, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/practice/$subject")({
  head: ({ params }) => ({ meta: [{ title: `${params.subject} Practice — Shiksha Saarthi` }] }),
  component: Page,
});

type Q = { id: string; question: string; options: string[]; correct_index: number; explanation: string | null; grade: number; difficulty: string };

function Page() {
  const { subject } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [grade, setGrade] = useState<number | null>(null);
  const [all, setAll] = useState<Q[]>([]);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await (supabase as any)
        .from("practice_questions").select("*").eq("subject", subject);
      setAll((data ?? []) as Q[]);
      setLoading(false);
    })();
  }, [subject]);

  const questions = useMemo(() => {
    if (grade === null) return [];
    return all.filter((q) => q.grade === grade).sort(() => Math.random() - 0.5).slice(0, 10);
  }, [all, grade]);

  const grades = useMemo(() => Array.from(new Set(all.map((q) => q.grade))).sort(), [all]);

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === questions[idx].correct_index) setScore((s) => s + 1);
  }

  async function next() {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      setPicked(null);
    } else {
      setDone(true);
      if (user && grade !== null) {
        await (supabase as any).from("practice_attempts").insert({
          student_id: user.id, subject, grade, score: score + (picked === questions[idx].correct_index ? 0 : 0), total: questions.length,
        });
      }
    }
  }

  function reset() { setGrade(null); setIdx(0); setPicked(null); setScore(0); setDone(false); }

  if (loading) return <div className="grid min-h-[60vh] place-items-center"><Loader2 className="size-6 animate-spin text-zinc-400" /></div>;

  if (grade === null) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link to="/practice" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-ink">
          <ArrowLeft className="size-3" /> Back to subjects
        </Link>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight">{subject} Practice</h1>
        <p className="mt-2 text-zinc-500">Pick your class to start a 10-question quiz.</p>
        {grades.length === 0 ? (
          <p className="mt-8 rounded-xl bg-zinc-50 p-6 text-sm text-zinc-500">No questions yet for {subject}. Check back soon!</p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {grades.map((g) => (
              <button key={g} onClick={() => setGrade(g)}
                className="rounded-2xl border border-black/[0.06] bg-white p-6 text-left transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Class</div>
                <div className="font-display mt-1 text-3xl font-semibold">{g}</div>
                <div className="mt-2 text-xs text-zinc-500">{all.filter((q) => q.grade === g).length} questions</div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <Trophy className="mx-auto size-12 text-brand" />
        <h2 className="font-display mt-4 text-4xl font-semibold">{pct}% — Nice work!</h2>
        <p className="mt-2 text-zinc-500">You scored {score} of {questions.length} in {subject} (Class {grade}).</p>
        <div className="mt-8 flex justify-center gap-3">
          <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white">
            <RotateCcw className="size-4" /> Try again
          </button>
          <button onClick={() => navigate({ to: "/practice" })} className="rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-700">More subjects</button>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  if (!q) return <div className="p-12 text-center text-zinc-500">No questions available.</div>;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between text-xs">
        <button onClick={reset} className="inline-flex items-center gap-1 text-zinc-500 hover:text-ink"><ArrowLeft className="size-3" /> Change class</button>
        <span className="text-zinc-500">Question <span className="font-semibold text-ink">{idx + 1}</span> / {questions.length} · Score {score}</span>
      </div>
      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-zinc-100">
        <div className="h-full bg-brand transition-all" style={{ width: `${((idx) / questions.length) * 100}%` }} />
      </div>

      <div className="mt-8 rounded-2xl border border-black/[0.06] bg-white p-8">
        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{subject} · Class {q.grade} · {q.difficulty}</div>
        <h2 className="font-display mt-3 text-2xl font-semibold leading-snug">{q.question}</h2>
        <div className="mt-6 space-y-2">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correct_index;
            const isPicked = i === picked;
            const show = picked !== null;
            return (
              <button key={i} onClick={() => pick(i)} disabled={picked !== null}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                  show && isCorrect ? "border-emerald-500 bg-emerald-50" :
                  show && isPicked && !isCorrect ? "border-rose-500 bg-rose-50" :
                  "border-black/[0.08] hover:border-brand/40"
                }`}>
                <span>{opt}</span>
                {show && isCorrect && <Check className="size-4 text-emerald-600" />}
                {show && isPicked && !isCorrect && <X className="size-4 text-rose-600" />}
              </button>
            );
          })}
        </div>
        {picked !== null && q.explanation && (
          <div className="mt-5 rounded-xl bg-brand-muted/50 p-4 text-sm text-ink">
            <span className="font-semibold">Why: </span>{q.explanation}
          </div>
        )}
        {picked !== null && (
          <button onClick={next} className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white">
            {idx + 1 < questions.length ? <>Next <ArrowRight className="size-4" /></> : <>Finish <Trophy className="size-4" /></>}
          </button>
        )}
      </div>
    </div>
  );
}
