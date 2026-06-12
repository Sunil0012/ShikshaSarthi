import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, FlaskConical, Play, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { EXPERIMENT_DETAILS } from "@/lib/games-data";
import { EXPERIMENTS } from "@/lib/lms-data";
import { TimedQuiz } from "@/components/games/TimedQuiz";

export const Route = createFileRoute("/experiments/$slug")({
  loader: ({ params }) => {
    const exp = EXPERIMENTS.find((e) => e.slug === params.slug);
    const detail = EXPERIMENT_DETAILS[params.slug];
    if (!exp || !detail) throw notFound();
    return { exp, detail };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.exp.title ?? "Lab"} — Virtual Experiments — Shiksha Saarthi` },
      { name: "description", content: loaderData?.exp.desc ?? "Run virtual lab experiments online." },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold">Experiment not found</h1>
      <Link to="/experiments" className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand"><ArrowLeft className="size-4" /> Back to labs</Link>
    </div>
  ),
  errorComponent: () => <div className="px-6 py-12">Something went wrong loading this experiment.</div>,
  component: ExperimentPage,
});

function ExperimentPage() {
  const { exp, detail } = Route.useLoaderData();
  const initial = useMemo(() => Object.fromEntries(detail.variables.map((v) => [v.name, v.init])), [detail]);
  const [vars, setVars] = useState<Record<string, number>>(initial);
  const [showQuiz, setShowQuiz] = useState(false);

  const results = detail.formula(vars);

  if (showQuiz) {
    return <TimedQuiz title={`${exp.title} — Lab Quiz`} subject={`${exp.subject} Lab`} accent="bg-emerald-600" bank={detail.quiz} questionTime={25} description="Test what you observed." />;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link to="/experiments" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-ink"><ArrowLeft className="size-3.5" /> Back to labs</Link>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-muted px-3 py-1 text-[11px] font-medium text-brand"><FlaskConical className="size-3" /> {exp.subject} · Class {exp.grade}</span>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">{exp.title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-zinc-500">{exp.desc}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-black/[0.06] bg-white p-6">
          <h3 className="font-display text-lg font-semibold">Controls</h3>
          <div className="mt-5 space-y-5">
            {detail.variables.map((v) => (
              <div key={v.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <label className="font-medium">{v.name} {v.unit && <span className="text-zinc-400">({v.unit})</span>}</label>
                  <span className="font-display text-base">{vars[v.name]} <span className="text-xs text-zinc-400">{v.unit}</span></span>
                </div>
                <input type="range" min={v.min} max={v.max} step={v.step} value={vars[v.name]} onChange={(e) => setVars((p) => ({ ...p, [v.name]: Number(e.target.value) }))} className="w-full accent-ink" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-black/[0.06] bg-gradient-to-br from-brand-muted via-white to-white p-6">
          <h3 className="font-display text-lg font-semibold">Live observation</h3>
          <div className="mt-5 space-y-3">
            {results.map((r) => (
              <div key={r.label} className="rounded-xl bg-white p-4 ring-1 ring-black/[0.04]">
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{r.label}</div>
                <div className="font-display mt-1 text-2xl font-semibold">{r.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 inline-flex items-start gap-2 rounded-xl bg-white/70 p-3 text-xs text-zinc-700 ring-1 ring-black/[0.04]">
            <Sparkles className="size-3.5 shrink-0 text-brand" />
            <span>{detail.observation}</span>
          </div>
          <button onClick={() => setShowQuiz(true)} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white"><Play className="size-3.5" /> Take the lab quiz</button>
        </div>
      </div>
    </div>
  );
}
