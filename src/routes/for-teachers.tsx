import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, ClipboardList, FileText, MessageSquare, Presentation, ShieldCheck, Users2, Wand2 } from "lucide-react";

export const Route = createFileRoute("/for-teachers")({
  head: () => ({
    meta: [
      { title: "For Teachers — Shiksha Saarthi" },
      { name: "description", content: "Create quizzes, assign practice, give feedback, and watch every student's growth in real-time analytics." },
    ],
  }),
  component: ForTeachers,
});

const TOOLS = [
  { i: Wand2, t: "AI-assisted quiz creator", d: "Drop a chapter PDF, get 25 MCQs with answer keys and difficulty tags in 30 seconds." },
  { i: ClipboardList, t: "Class management", d: "Create sections, invite students with a code, group by stream or homework batch." },
  { i: BarChart3, t: "Per-student analytics", d: "Question-wise mastery, time-on-task, and weak-topic heatmaps for every learner." },
  { i: FileText, t: "Past-paper engine", d: "Auto-generate practice from 10 years of CBSE/ICSE PYQs, segmented by chapter." },
  { i: MessageSquare, t: "Two-way feedback", d: "Send written, audio, or rubric feedback to students directly inside reports." },
  { i: ShieldCheck, t: "Timed assessments", d: "Lock screens, auto-submit, plagiarism flags — assessments that hold up." },
];

function ForTeachers() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid items-end gap-10 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand"><Presentation className="size-3" /> Built for educators</div>
          <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight md:text-6xl">Teach what matters. We'll handle the grading.</h1>
          <p className="mt-4 text-lg text-zinc-500">Quizzes auto-grade. Reports auto-generate. You get the time back to teach.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/auth" search={{ mode: "signup" }} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-medium text-white">Start teaching free <ArrowRight className="size-4" /></Link>
            <Link to="/teacher/courses" className="inline-flex h-10 items-center rounded-full ring-1 ring-black/[0.1] px-5 text-sm font-medium hover:bg-zinc-50">Preview teacher dashboard</Link>
          </div>
        </div>
        <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-medium">Class 10 · Section B</span>
            <span className="text-zinc-500">42 students · 7 active</span>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ["Chemical Reactions — Quiz 04", "84% avg", "92%"],
              ["Trigonometry — Drill", "71% avg", "88%"],
              ["Life Processes — Mock", "78% avg", "76%"],
            ].map(([n, a, c]) => (
              <div key={n} className="flex items-center justify-between rounded-xl ring-1 ring-black/[0.06] px-4 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{n}</div>
                  <div className="text-[11px] text-zinc-500">{a} · completion {c}</div>
                </div>
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-zinc-100">
                  <div className="h-full bg-brand" style={{ width: c }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs text-zinc-500"><Users2 className="size-3.5" /> Reports update live as students submit</div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map(({ i: Icon, t, d }) => (
          <div key={t} className="rounded-2xl border border-black/[0.06] bg-white p-6 transition hover:shadow-md">
            <div className="grid size-10 place-items-center rounded-xl bg-ink text-white"><Icon className="size-5" /></div>
            <h3 className="font-display mt-4 text-lg font-semibold">{t}</h3>
            <p className="mt-1 text-sm text-zinc-500">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
