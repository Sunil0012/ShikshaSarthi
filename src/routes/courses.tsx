import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { BookOpen, Clock, Search, Sparkles, Star, Users } from "lucide-react";
import { COURSES, GRADES, SUBJECTS } from "@/lib/lms-data";

const search = z.object({
  grade: z.coerce.number().optional(),
  subject: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/courses")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Courses — Shiksha Saarthi" },
      { name: "description", content: "Browse 28+ NCERT/CBSE/ICSE-aligned courses for class 6 to 12, across math, science, English, social studies and more." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const sp = Route.useSearch();
  const nav = Route.useNavigate();
  const [q, setQ] = useState(sp.q ?? "");

  const filtered = COURSES.filter((c) => {
    if (sp.grade && c.grade !== sp.grade) return false;
    if (sp.subject && c.subject !== sp.subject) return false;
    if (q && !`${c.title} ${c.description}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex items-center gap-3">
        <Sparkles className="size-4 text-brand" />
        <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">Catalog</span>
      </div>
      <h1 className="font-display text-5xl font-semibold tracking-tight">All courses</h1>
      <p className="mt-3 max-w-2xl text-zinc-500">
        Pick your class and subject. Every course is aligned to NCERT and includes adaptive practice,
        offline downloads, and instant doubt resolution.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4">
        <div className="flex flex-1 items-center gap-2 rounded-md bg-zinc-50 px-3 py-2 ring-1 ring-inset ring-black/[0.04]">
          <Search className="size-4 text-zinc-400" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); nav({ search: (s: any) => ({ ...s, q: e.target.value || undefined }) }); }}
            placeholder="Search courses (e.g. quadratic, photosynthesis)"
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
          />
        </div>
        <Select label="Grade" value={sp.grade?.toString() ?? ""} options={[["", "All"], ...GRADES.map((g) => [g.toString(), `Class ${g}`])]}
          onChange={(v) => nav({ search: (s: any) => ({ ...s, grade: v ? Number(v) : undefined }) })} />
        <Select label="Subject" value={sp.subject ?? ""} options={[["", "All"], ...SUBJECTS.map((s) => [s.slug, s.name])]}
          onChange={(v) => nav({ search: (s: any) => ({ ...s, subject: v || undefined }) })} />
      </div>

      <div className="mt-3 text-xs text-zinc-500">{filtered.length} courses</div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link key={c.slug} to="/courses/$slug" params={{ slug: c.slug }} className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${c.tone}`} />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-700 ring-1 ring-black/[0.05]">
                  Class {c.grade} · {c.level}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600">
                  <Star className="size-3 fill-amber-500 stroke-amber-500" /> {c.rating.toFixed(1)}
                </span>
              </div>
              <h3 className="font-display mt-4 text-xl font-semibold leading-tight">{c.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-zinc-500">{c.description}</p>
              <div className="mt-5 flex items-center gap-4 text-[11px] text-zinc-500">
                <span className="inline-flex items-center gap-1"><BookOpen className="size-3" /> {c.modules} modules</span>
                <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {c.hours}h</span>
                <span className="inline-flex items-center gap-1"><Users className="size-3" /> {c.enrolled}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: (readonly [string, string] | string[])[]; onChange: (v: string) => void }) {
  return (
    <label className="flex items-center gap-2 rounded-md bg-zinc-50 px-3 py-2 text-sm ring-1 ring-inset ring-black/[0.04]">
      <span className="text-xs font-medium text-zinc-500">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent text-sm outline-none">
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}
