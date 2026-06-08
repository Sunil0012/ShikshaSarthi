import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, FileText, Play, Sparkles } from "lucide-react";
import { getCourse, lessonsFor } from "@/lib/lms-data";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/learn/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `Learn — ${loaderData.course.title}` }] : [] }),
  component: LearnPage,
});

function LearnPage() {
  const { course } = Route.useLoaderData();
  const { user } = useAuth();
  const modules = lessonsFor(course);
  const flat = modules.flatMap((m) => m.lessons.map((l) => ({ ...l, module: m.module })));
  const [activeId, setActiveId] = useState(flat[0].number);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    supabase.from("lesson_progress").select("lesson_id").eq("user_id", user.id).eq("course_slug", course.slug)
      .then(({ data }) => setCompleted(new Set((data ?? []).map((r) => r.lesson_id))));
  }, [user, course.slug]);

  const active = flat.find((l) => l.number === activeId)!;
  const activeIdx = flat.findIndex((l) => l.number === activeId);

  async function markDone() {
    if (!user) return;
    const { error } = await supabase.from("lesson_progress").insert({ user_id: user.id, course_slug: course.slug, lesson_id: active.number });
    if (error && !error.message.includes("duplicate")) return toast.error(error.message);
    setCompleted((s) => new Set(s).add(active.number));
    toast.success(`+25 XP · Lesson complete`);
    if (activeIdx < flat.length - 1) setActiveId(flat[activeIdx + 1].number);
  }

  const progressPct = Math.round((completed.size / flat.length) * 100);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[320px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
        <Link to="/courses/$slug" params={{ slug: course.slug }} className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-ink">
          <ArrowLeft className="size-3" /> Back to course
        </Link>
        <div className="font-display mt-3 text-lg font-semibold leading-tight">{course.title}</div>
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] text-zinc-500">
            <span>{completed.size} / {flat.length} done</span>
            <span>{progressPct}%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-200">
            <div className="h-full bg-brand transition-all" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {modules.map((m, mi) => (
            <div key={mi}>
              <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">{m.module}</div>
              <ul className="space-y-0.5">
                {m.lessons.map((l) => {
                  const done = completed.has(l.number);
                  const isActive = l.number === activeId;
                  return (
                    <li key={l.number}>
                      <button
                        onClick={() => setActiveId(l.number)}
                        className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-xs transition ${
                          isActive ? "bg-ink text-white" : "hover:bg-zinc-100"
                        }`}
                      >
                        {done ? <CheckCircle2 className="size-3.5 text-brand" /> : <Circle className="size-3.5 text-zinc-300" />}
                        <span className={`flex-1 truncate ${done && !isActive ? "text-zinc-400 line-through" : ""}`}>{l.title}</span>
                        <span className={`text-[10px] ${isActive ? "text-white/60" : "text-zinc-400"}`}>{l.duration}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      <main>
        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{active.module}</div>
        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight">{active.title}</h1>
        <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500">
          <span className="rounded-full bg-zinc-100 px-2.5 py-1">{active.type}</span>
          <span>{active.duration}</span>
        </div>

        <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-ink ring-1 ring-black/10">
          <div className="flex h-full flex-col items-center justify-center text-white/80">
            <div className="grid size-16 place-items-center rounded-full bg-white/10 backdrop-blur">
              <Play className="size-7 fill-white" />
            </div>
            <p className="mt-4 text-sm">Lesson {active.number} preview</p>
            <p className="text-xs text-white/40">High-quality video plays here</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-black/[0.06] bg-white p-6">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-brand">
            <Sparkles className="size-3.5" /> Lesson notes
          </div>
          <h3 className="font-display mt-3 text-xl font-semibold">Key concept</h3>
          <p className="mt-2 text-sm text-zinc-600">
            This lesson walks you through <strong>{active.title.toLowerCase()}</strong> with worked examples,
            visual intuition, and an interactive drill at the end. Take your time — pause anywhere and revisit.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            <li className="flex gap-2"><FileText className="size-4 shrink-0 text-brand" /> Definition and core formula</li>
            <li className="flex gap-2"><FileText className="size-4 shrink-0 text-brand" /> Three worked-out examples</li>
            <li className="flex gap-2"><FileText className="size-4 shrink-0 text-brand" /> Common mistakes & how to avoid them</li>
            <li className="flex gap-2"><FileText className="size-4 shrink-0 text-brand" /> Quick 5-question drill</li>
          </ul>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            disabled={activeIdx === 0}
            onClick={() => setActiveId(flat[activeIdx - 1].number)}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-black/[0.06] disabled:opacity-40"
          >
            <ArrowLeft className="size-4" /> Previous
          </button>
          <div className="flex items-center gap-2">
            <button onClick={markDone} className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white">
              <CheckCircle2 className="size-4" /> Mark complete
            </button>
            <button
              disabled={activeIdx === flat.length - 1}
              onClick={() => setActiveId(flat[activeIdx + 1].number)}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              Next <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
