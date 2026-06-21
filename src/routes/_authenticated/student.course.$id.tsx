import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Loader2, Play, Sparkles, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/student/course/$id")({
  head: () => ({ meta: [{ title: "Course" }] }),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [quizState, setQuizState] = useState<{ answers: Record<string, number>; submitted: boolean }>({ answers: {}, submitted: false });

  async function load() {
    const [c, l, p] = await Promise.all([
      supabase.from("teacher_courses").select("*, teacher:profiles!teacher_id(full_name)").eq("id", id).maybeSingle(),
      supabase.from("teacher_lessons").select("*").eq("course_id", id).order("position"),
      user ? supabase.from("lesson_progress").select("lesson_id").eq("user_id", user.id).eq("course_slug", id) : Promise.resolve({ data: [] }),
    ]);
    setCourse(c.data);
    setLessons(l.data ?? []);
    setDone(new Set((p.data ?? []).map((x: any) => x.lesson_id)));
    if (l.data?.[0] && !activeId) setActiveId(l.data[0].id);
  }
  useEffect(() => { load(); }, [id, user]);

  useEffect(() => {
    if (!activeId) return;
    supabase.from("teacher_quizzes").select("*").eq("lesson_id", activeId).order("position")
      .then(({ data }) => setQuizzes(data ?? []));
    setQuizState({ answers: {}, submitted: false });
  }, [activeId]);

  if (!course) return <div className="grid min-h-[60vh] place-items-center"><Loader2 className="size-6 animate-spin text-zinc-400" /></div>;
  const active = lessons.find((l) => l.id === activeId);
  const activeIdx = lessons.findIndex((l) => l.id === activeId);

  async function markDone() {
    if (!user || !active) return;
    const { error } = await supabase.from("lesson_progress").insert({ user_id: user.id, course_slug: id, lesson_id: active.id });
    if (error && !error.message.includes("duplicate")) return toast.error(error.message);
    setDone(new Set([...done, active.id]));
    toast.success("+25 XP · Lesson complete");
    if (activeIdx < lessons.length - 1) setActiveId(lessons[activeIdx + 1].id);
  }

  async function submitQuiz() {
    if (!user || !active) return;
    let correct = 0;
    quizzes.forEach((q) => { if (quizState.answers[q.id] === q.correct_index) correct++; });
    await supabase.from("quiz_attempts").insert({ student_id: user.id, lesson_id: active.id, score: correct, total: quizzes.length });
    setQuizState((s) => ({ ...s, submitted: true }));
    toast.success(`You scored ${correct}/${quizzes.length}`);
  }

  const pct = lessons.length ? Math.round((done.size / lessons.length) * 100) : 0;

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[320px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
        <Link to="/student/browse" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-ink">
          <ArrowLeft className="size-3" /> Browse
        </Link>
        <div className="mt-3 text-3xl">{course.cover_emoji}</div>
        <div className="font-display mt-2 text-lg font-semibold leading-tight">{course.title}</div>
        <div className="mt-1 text-xs text-zinc-500">By {course.teacher?.full_name ?? "Teacher"}</div>
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] text-zinc-500"><span>{done.size}/{lessons.length} done</span><span>{pct}%</span></div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-200"><div className="h-full bg-brand" style={{ width: `${pct}%` }} /></div>
        </div>
        <ul className="mt-6 space-y-0.5">
          {lessons.map((l, i) => {
            const d = done.has(l.id), a = l.id === activeId;
            return (
              <li key={l.id}>
                <button onClick={() => setActiveId(l.id)}
                  className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-xs transition ${a ? "bg-ink text-white" : "hover:bg-zinc-100"}`}>
                  {d ? <CheckCircle2 className="size-3.5 text-brand" /> : <Circle className="size-3.5 text-zinc-300" />}
                  <span className="flex-1 truncate">{i + 1}. {l.title}</span>
                  <span className={`text-[10px] ${a ? "text-white/60" : "text-zinc-400"}`}>{l.duration_min}m</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <main>
        {!active ? <p className="text-zinc-500">This course has no lessons yet.</p> : (
          <>
            <h1 className="font-display text-3xl font-semibold tracking-tight">{active.title}</h1>
            <div className="mt-2 text-xs text-zinc-500">Lesson {activeIdx + 1} of {lessons.length} · {active.duration_min} min</div>

            {active.video_url ? (
              <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-black">
                <iframe src={active.video_url} className="size-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            ) : (
              <div className="mt-6 grid aspect-video w-full place-items-center rounded-2xl bg-gradient-to-br from-zinc-900 to-ink text-white/80">
                <div className="text-center"><div className="mx-auto grid size-16 place-items-center rounded-full bg-white/10"><Play className="size-7 fill-white" /></div><p className="mt-3 text-sm">Lesson content</p></div>
              </div>
            )}

            {active.content && (
              <div className="mt-6 rounded-2xl border border-black/[0.06] bg-white p-6">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-brand">
                  <Sparkles className="size-3.5" /> Notes
                </div>
                <div className="prose mt-3 whitespace-pre-wrap text-sm text-zinc-700">{active.content}</div>
              </div>
            )}

            {quizzes.length > 0 && (
              <div className="mt-6 rounded-2xl border border-black/[0.06] bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold">Quick check</h3>
                  <span className="text-xs text-zinc-500">{quizzes.length} question{quizzes.length > 1 ? "s" : ""}</span>
                </div>
                <div className="mt-4 space-y-5">
                  {quizzes.map((q, qi) => (
                    <div key={q.id}>
                      <div className="text-sm font-medium">Q{qi + 1}. {q.question}</div>
                      <div className="mt-2 grid grid-cols-1 gap-1.5 md:grid-cols-2">
                        {(q.options as string[]).map((o, oi) => {
                          const sel = quizState.answers[q.id] === oi;
                          const correct = quizState.submitted && oi === q.correct_index;
                          const wrong = quizState.submitted && sel && oi !== q.correct_index;
                          return (
                            <button key={oi} disabled={quizState.submitted}
                              onClick={() => setQuizState((s) => ({ ...s, answers: { ...s.answers, [q.id]: oi } }))}
                              className={`rounded-md px-3 py-2 text-left text-sm transition ${
                                correct ? "bg-brand/15 text-brand ring-1 ring-brand" :
                                wrong ? "bg-rose-50 text-rose-700 ring-1 ring-rose-300" :
                                sel ? "bg-brand-muted ring-1 ring-brand" : "bg-zinc-50 hover:bg-zinc-100"
                              }`}>
                              <span className="mr-2 font-mono text-xs text-zinc-400">{String.fromCharCode(65 + oi)}</span>{o}
                            </button>
                          );
                        })}
                      </div>
                      {quizState.submitted && q.explanation && <p className="mt-1.5 text-xs text-zinc-500">💡 {q.explanation}</p>}
                    </div>
                  ))}
                </div>
                {!quizState.submitted && (
                  <button onClick={submitQuiz} disabled={Object.keys(quizState.answers).length !== quizzes.length}
                    className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2 text-sm font-medium text-white disabled:opacity-40">
                    <Trophy className="size-4" /> Submit quiz
                  </button>
                )}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <button disabled={activeIdx === 0} onClick={() => setActiveId(lessons[activeIdx - 1].id)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-black/[0.06] disabled:opacity-40">
                <ArrowLeft className="size-4" /> Previous
              </button>
              <div className="flex gap-2">
                <button onClick={markDone} className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white">
                  <CheckCircle2 className="size-4" /> Mark complete
                </button>
                <button disabled={activeIdx === lessons.length - 1} onClick={() => setActiveId(lessons[activeIdx + 1].id)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white disabled:opacity-40">
                  Next <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
