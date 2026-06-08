import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Calendar, Flame, Play, Target, Trophy, TrendingUp } from "lucide-react";
import { COURSES, getCourse } from "@/lib/lms-data";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Shiksha Saarthi" }] }),
  component: Dashboard,
});

type Profile = { full_name: string | null; grade: number | null; xp: number; streak: number; avatar_url: string | null };

function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [enrollments, setEnrollments] = useState<string[]>([]);
  const [progressCount, setProgressCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: p }, { data: e }, { count }] = await Promise.all([
        supabase.from("profiles").select("full_name,grade,xp,streak,avatar_url").eq("id", user.id).maybeSingle(),
        supabase.from("enrollments").select("course_slug").eq("user_id", user.id),
        supabase.from("lesson_progress").select("*", { count: "exact", head: true }).eq("user_id", user.id),
      ]);
      setProfile(p as Profile | null);
      setEnrollments((e ?? []).map((r) => r.course_slug));
      setProgressCount(count ?? 0);
    })();
  }, [user]);

  const enrolledCourses = enrollments.map((s) => getCourse(s)).filter(Boolean) as typeof COURSES;
  const recommended = COURSES.filter((c) => !enrollments.includes(c.slug) && (!profile?.grade || c.grade === profile.grade)).slice(0, 3);
  const name = profile?.full_name || user?.email?.split("@")[0] || "learner";

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">Dashboard</div>
          <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">
            Welcome back, <span className="text-brand">{name}</span> 👋
          </h1>
          <p className="mt-2 text-zinc-500">
            {profile?.grade ? `Class ${profile.grade} · ` : ""}Keep your streak going — your future self will thank you.
          </p>
        </div>
        <Link to="/courses" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white">
          Browse courses <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Metric icon={<Flame className="size-5 text-orange-500" />} label="Day streak" value={String(profile?.streak ?? 0)} />
        <Metric icon={<Trophy className="size-5 text-amber-500" />} label="Total XP" value={(profile?.xp ?? 0).toLocaleString()} />
        <Metric icon={<BookOpen className="size-5 text-brand" />} label="Enrolled courses" value={String(enrollments.length)} />
        <Metric icon={<Target className="size-5 text-violet-500" />} label="Lessons completed" value={String(progressCount)} />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-semibold">Continue learning</h2>
          {enrolledCourses.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-black/[0.1] bg-white p-10 text-center">
              <p className="text-zinc-500">You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">
                Find your first course
              </Link>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {enrolledCourses.map((c) => (
                <Link key={c.slug} to="/learn/$slug" params={{ slug: c.slug }} className={`flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-black/[0.06] bg-gradient-to-r ${c.tone} p-5 transition hover:shadow-md`}>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Class {c.grade} · {c.level}</div>
                    <div className="font-display mt-1 truncate text-lg font-semibold">{c.title}</div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                      <div className="h-1.5 w-40 overflow-hidden rounded-full bg-zinc-200">
                        <div className="h-full bg-brand" style={{ width: "32%" }} />
                      </div>
                      32% complete
                    </div>
                  </div>
                  <div className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-white">
                    <Play className="size-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          <h2 className="font-display mt-12 text-2xl font-semibold">Recommended for you</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {recommended.map((c) => (
              <Link key={c.slug} to="/courses/$slug" params={{ slug: c.slug }} className="rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Class {c.grade} · {c.level}</div>
                <div className="font-display mt-2 text-lg font-semibold">{c.title}</div>
                <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{c.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-black/[0.06] bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Today's plan</div>
              <Calendar className="size-4 text-zinc-400" />
            </div>
            <ul className="mt-4 space-y-3">
              {[
                ["Math · Quadratic equations", "20 min"],
                ["Science drill · Acids & bases", "10 min"],
                ["English · Reading comprehension", "15 min"],
              ].map(([t, d]) => (
                <li key={t} className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3 text-sm">
                  <span>{t}</span><span className="text-xs text-zinc-500">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-black/[0.06] bg-gradient-to-br from-brand-muted to-white p-6">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-brand">
              <TrendingUp className="size-3.5" /> This week
            </div>
            <p className="mt-2 text-sm text-zinc-700">
              You're <strong>+18%</strong> ahead of last week. Keep this pace and you'll finish the syllabus 2 weeks early.
            </p>
            <Link to="/leaderboard" className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brand">
              See leaderboard <ArrowRight className="size-3" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{label}</span>
      </div>
      <div className="font-display mt-3 text-3xl font-semibold">{value}</div>
    </div>
  );
}
