import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, BookPlus, ClipboardList, FileText, MessageSquare, Plus, Users2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/teacher")({
  component: TeacherDash,
});

function TeacherDash() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-zinc-500">Teacher console</div>
          <h1 className="font-display mt-1 text-4xl font-semibold tracking-tight">Good morning, teacher</h1>
          <p className="mt-1 text-sm text-zinc-500">3 classes · 124 active students · 7 pending reviews</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex h-9 items-center gap-1.5 rounded-full ring-1 ring-black/[0.1] px-4 text-sm font-medium hover:bg-zinc-50"><Plus className="size-3.5" /> New class</button>
          <button className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-white"><BookPlus className="size-3.5" /> Create quiz</button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { i: Users2, l: "Active students", v: "124", c: "+8 this week" },
          { i: ClipboardList, l: "Quizzes published", v: "37", c: "12 this month" },
          { i: BarChart3, l: "Class avg score", v: "78%", c: "+4% vs last term" },
          { i: MessageSquare, l: "Feedback sent", v: "212", c: "94% response" },
        ].map(({ i: Icon, l, v, c }) => (
          <div key={l} className="rounded-2xl bg-white p-5 ring-1 ring-black/[0.06]">
            <div className="flex items-center justify-between text-xs text-zinc-500">{l}<Icon className="size-4" /></div>
            <div className="font-display mt-2 text-3xl font-semibold">{v}</div>
            <div className="mt-1 text-[11px] text-emerald-600">{c}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-black/[0.06] lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent quiz performance</h2>
            <Link to="/dashboard" className="text-xs text-brand">View all</Link>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ["Chemical Reactions — Quiz 04", "Class 10 · 42 submitted", 84],
              ["Trigonometry Drill", "Class 10 · 38 submitted", 71],
              ["Life Processes — Mock", "Class 10 · 40 submitted", 78],
              ["French Revolution — MCQ", "Class 9 · 44 submitted", 62],
              ["Algebra Sprint", "Class 8 · 36 submitted", 88],
            ].map(([n, s, p]) => (
              <div key={n as string} className="flex items-center justify-between rounded-xl ring-1 ring-black/[0.06] px-4 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{n}</div>
                  <div className="text-[11px] text-zinc-500">{s}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-zinc-100">
                    <div className="h-full bg-brand" style={{ width: `${p}%` }} />
                  </div>
                  <div className="text-xs font-semibold">{p}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-black/[0.06]">
            <h3 className="font-display text-base font-semibold">Quick tools</h3>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { i: BookPlus, t: "New quiz" },
                { i: FileText, t: "PYQ bank" },
                { i: Users2, t: "Manage class" },
                { i: BarChart3, t: "Analytics" },
              ].map(({ i: Icon, t }) => (
                <button key={t} className="flex flex-col items-start gap-2 rounded-xl ring-1 ring-black/[0.06] p-3 text-left hover:bg-zinc-50">
                  <Icon className="size-4" />
                  <span className="text-xs font-medium">{t}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-ink p-6 text-white">
            <div className="text-[10px] uppercase tracking-widest text-zinc-400">Today</div>
            <div className="font-display mt-1 text-xl font-semibold">7 reviews pending</div>
            <p className="mt-1 text-xs text-zinc-300">Subjective answers waiting for your rubric. Avg time: 90 sec each.</p>
            <button className="mt-4 inline-flex h-8 items-center rounded-full bg-white px-3 text-xs font-medium text-ink">Open review queue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
