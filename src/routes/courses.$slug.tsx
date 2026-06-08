import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CheckCircle2, Clock, Download, FileText, Layers, Play, Star, Trophy, Users, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { getCourse, lessonsFor } from "@/lib/lms-data";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.course.title} — Shiksha Saarthi` },
      { name: "description", content: loaderData.course.description },
    ] : [],
  }),
  component: CourseDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl">Course not found</h1>
      <Link to="/courses" className="mt-4 inline-block text-brand underline">Browse all courses</Link>
    </div>
  ),
});

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const modules = lessonsFor(course);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("enrollments").select("id").eq("user_id", user.id).eq("course_slug", course.slug).maybeSingle()
      .then(({ data }) => setEnrolled(!!data));
  }, [user, course.slug]);

  async function enroll() {
    if (!user) return navigate({ to: "/auth", search: { mode: "signup" } });
    setLoading(true);
    const { error } = await supabase.from("enrollments").insert({ user_id: user.id, course_slug: course.slug });
    setLoading(false);
    if (error && !error.message.includes("duplicate")) return toast.error(error.message);
    setEnrolled(true);
    toast.success("Enrolled! Let's get started.");
    navigate({ to: "/learn/$slug", params: { slug: course.slug } });
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link to="/courses" className="text-xs text-zinc-500 hover:text-ink">← All courses</Link>
      <div className={`mt-4 overflow-hidden rounded-3xl bg-gradient-to-br ${course.tone} p-10 ring-1 ring-black/[0.04]`}>
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-600">
          <span className="rounded-full bg-white px-3 py-1">Class {course.grade}</span>
          <span className="rounded-full bg-white px-3 py-1">{course.level}</span>
          <span className="rounded-full bg-white px-3 py-1 capitalize">{course.subject.replace("-", " ")}</span>
        </div>
        <h1 className="font-display mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight">{course.title}</h1>
        <p className="mt-4 max-w-2xl text-zinc-600">{course.description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-zinc-700">
          <Stat icon={<Star className="size-4 fill-amber-500 stroke-amber-500" />} label={`${course.rating.toFixed(1)} rating`} />
          <Stat icon={<Users className="size-4" />} label={`${course.enrolled} enrolled`} />
          <Stat icon={<Layers className="size-4" />} label={`${course.modules} modules`} />
          <Stat icon={<BookOpen className="size-4" />} label={`${course.lessons} lessons`} />
          <Stat icon={<Clock className="size-4" />} label={`${course.hours} hours`} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={enroll} disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white">
            {enrolled ? "Continue learning" : "Enroll free"} <ArrowRight className="size-4" />
          </button>
          <Link to="/learn/$slug" params={{ slug: course.slug }} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium ring-1 ring-black/[0.06]">
            <Play className="size-4" /> Preview lesson
          </Link>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-semibold">Course curriculum</h2>
          <p className="mt-1 text-sm text-zinc-500">{modules.length} modules · {course.lessons} lessons total</p>
          <div className="mt-6 space-y-3">
            {modules.map((m, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-black/[0.06] bg-white">
                <div className="flex items-center justify-between border-b border-black/[0.04] px-5 py-3">
                  <div className="text-sm font-semibold">{m.module}</div>
                  <div className="text-[11px] text-zinc-500">{m.lessons.length} lessons</div>
                </div>
                <ul className="divide-y divide-black/[0.04]">
                  {m.lessons.map((l) => (
                    <li key={l.number} className="flex items-center justify-between px-5 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <span className="grid size-6 place-items-center rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-600">{l.number}</span>
                        {l.done ? <CheckCircle2 className="size-4 text-brand" /> : <Play className="size-3.5 text-zinc-400" />}
                        <span className={l.done ? "text-zinc-500 line-through" : ""}>{l.title}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-zinc-500">
                        <span className="rounded-full bg-zinc-100 px-2 py-0.5">{l.type}</span>
                        <span>{l.duration}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="font-display mt-12 text-2xl font-semibold">What you'll learn</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {course.topics.map((t) => (
              <div key={t} className="flex items-start gap-2 rounded-lg border border-black/[0.05] bg-white px-4 py-3 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" /> {t}
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-black/[0.06] bg-white p-6">
            <div className="text-3xl font-display font-semibold">Free</div>
            <p className="mt-1 text-xs text-zinc-500">Full access · No credit card needed</p>
            <button onClick={enroll} disabled={loading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white">
              {enrolled ? "Continue" : "Enroll now"} <ArrowRight className="size-4" />
            </button>
            <ul className="mt-5 space-y-2.5 text-xs text-zinc-600">
              {[
                ["Video lessons by top teachers", <Play className="size-3.5 text-brand" key="p"/>],
                ["Downloadable PDF notes", <FileText className="size-3.5 text-brand" key="f"/>],
                ["Works offline", <Wifi className="size-3.5 text-brand" key="w"/>],
                ["XP, badges & streaks", <Trophy className="size-3.5 text-brand" key="t"/>],
                ["Available on phone & laptop", <Download className="size-3.5 text-brand" key="d"/>],
              ].map(([t, ic]) => (
                <li key={t as string} className="flex items-center gap-2">{ic}{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-black/[0.06] bg-gradient-to-br from-brand-muted to-white p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-brand">Live doubt clearing</div>
            <p className="mt-2 text-sm text-zinc-600">Stuck on a problem? Ask a tutor live, 7 days a week, 6 AM – 11 PM IST.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <span className="inline-flex items-center gap-1.5">{icon}{label}</span>;
}
