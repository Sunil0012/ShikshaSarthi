import { createFileRoute } from "@tanstack/react-router";
import { Building2, ChartArea, GraduationCap, Presentation, ScrollText } from "lucide-react";

export const Route = createFileRoute("/_authenticated/school-admin")({
  component: SchoolAdminDash,
});

function SchoolAdminDash() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-zinc-500">School admin console</div>
          <h1 className="font-display mt-1 text-4xl font-semibold tracking-tight">Vidya Bharati Public School</h1>
          <p className="mt-1 text-sm text-zinc-500">42 teachers · 1,284 students · 38 classes · 7 streams</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"><Building2 className="size-3" /> All systems operational</div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { i: GraduationCap, l: "Students", v: "1,284", c: "+62 this term" },
          { i: Presentation, l: "Teachers", v: "42", c: "3 onboarding" },
          { i: ChartArea, l: "School avg", v: "76%", c: "+5% YoY" },
          { i: ScrollText, l: "Active feedback forms", v: "9", c: "82% response" },
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
          <h2 className="font-display text-lg font-semibold">Class-wise mastery (this month)</h2>
          <div className="mt-5 space-y-3">
            {[
              ["Class 12 — Science", 81],
              ["Class 11 — Science", 75],
              ["Class 10 — All sections", 78],
              ["Class 9 — All sections", 71],
              ["Class 8 — All sections", 74],
              ["Class 7 — All sections", 79],
              ["Class 6 — All sections", 82],
            ].map(([n, p]) => (
              <div key={n as string}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{n}</span>
                  <span className="text-xs text-zinc-500">{p}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-100">
                  <div className="h-full bg-brand" style={{ width: `${p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-black/[0.06]">
            <h3 className="font-display text-base font-semibold">Top teachers (week)</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ["Mrs. Iyer", "Math · Class 10", "94% avg"],
                ["Mr. Banerjee", "Physics · Class 12", "89% avg"],
                ["Ms. Kapoor", "English · Class 9", "87% avg"],
              ].map(([n, s, p]) => (
                <li key={n} className="flex items-center justify-between rounded-xl ring-1 ring-black/[0.06] px-3 py-2">
                  <div><div className="font-medium">{n}</div><div className="text-[11px] text-zinc-500">{s}</div></div>
                  <span className="text-xs font-semibold">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-ink p-6 text-white">
            <div className="text-[10px] uppercase tracking-widest text-zinc-400">Feedback</div>
            <div className="font-display mt-1 text-xl font-semibold">Mid-term form is live</div>
            <p className="mt-1 text-xs text-zinc-300">812 of 1,284 students responded (63%). Closes in 3 days.</p>
            <button className="mt-4 inline-flex h-8 items-center rounded-full bg-white px-3 text-xs font-medium text-ink">View responses</button>
          </div>
        </div>
      </div>
    </div>
  );
}
