import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Award, BookOpen, Flame, GraduationCap, Plus, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Shiksha Saarthi" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user, role, loading } = useAuth();
  if (loading) return null;
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{role ?? "user"} dashboard</div>
          <h1 className="font-display mt-1 text-4xl font-semibold tracking-tight">
            Welcome back, {user?.email?.split("@")[0]}
          </h1>
        </div>
      </div>
      {role === "teacher" ? <TeacherView /> : role === "admin" ? <AdminView /> : <StudentView />}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, hint }: any) {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
      <div className="flex items-center gap-2 text-xs text-zinc-500"><Icon className="size-4 text-brand" />{label}</div>
      <div className="font-display mt-2 text-3xl font-semibold">{value}</div>
      {hint && <div className="mt-1 text-xs text-zinc-400">{hint}</div>}
    </div>
  );
}

function StudentView() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ enrolled: 0, completed: 0, xp: 0, streak: 0 });
  const [enrolls, setEnrolls] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [prof, en, lp] = await Promise.all([
        supabase.from("profiles").select("xp,streak").eq("id", user.id).maybeSingle(),
        supabase.from("course_enrollments").select("id, course:teacher_courses(id,title,subject,grade,cover_emoji)").eq("student_id", user.id),
        supabase.from("lesson_progress").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      ]);
      setStats({ enrolled: en.data?.length ?? 0, completed: lp.count ?? 0, xp: prof.data?.xp ?? 0, streak: prof.data?.streak ?? 0 });
      setEnrolls(en.data ?? []);
    })();
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={Flame} label="Day streak" value={stats.streak} hint="Keep it alive" />
        <StatCard icon={Sparkles} label="XP earned" value={stats.xp} hint="Across all activities" />
        <StatCard icon={BookOpen} label="Courses joined" value={stats.enrolled} />
        <StatCard icon={Award} label="Lessons done" value={stats.completed} />
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">Your courses</h2>
          <Link to="/student/browse" className="text-xs font-medium text-brand">Browse all →</Link>
        </div>
        {enrolls.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/[0.1] bg-white p-10 text-center">
            <p className="text-zinc-500">You haven't joined any teacher-led courses yet.</p>
            <Link to="/student/browse" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">
              Browse courses →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrolls.map((e) => e.course && (
              <Link key={e.id} to="/student/course/$id" params={{ id: e.course.id }}
                className="block rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="text-3xl">{e.course.cover_emoji}</div>
                <div className="mt-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">{e.course.subject} · Class {e.course.grade}</div>
                <div className="font-display mt-1 text-lg font-semibold">{e.course.title}</div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display mb-3 text-2xl font-semibold">Keep exploring</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { to: "/games", label: "Play games", icon: "🎮" },
            { to: "/mat", label: "Mental Ability", icon: "🧠" },
            { to: "/experiments", label: "Virtual Labs", icon: "🧪" },
            { to: "/vocabulary", label: "Vocabulary", icon: "📖" },
          ].map((x) => (
            <Link key={x.to} to={x.to} className="rounded-2xl border border-black/[0.06] bg-white p-4 transition hover:shadow-md">
              <div className="text-2xl">{x.icon}</div>
              <div className="mt-2 text-sm font-medium">{x.label}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function TeacherView() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ courses: 0, students: 0, published: 0 });
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const courses = await supabase.from("teacher_courses").select("id,title,subject,grade,published,cover_emoji,created_at").eq("teacher_id", user.id).order("created_at", { ascending: false });
      const courseIds = (courses.data ?? []).map((c) => c.id);
      const enr = courseIds.length ? await supabase.from("course_enrollments").select("id", { count: "exact", head: true }).in("course_id", courseIds) : { count: 0 };
      setStats({
        courses: courses.data?.length ?? 0,
        published: courses.data?.filter((c) => c.published).length ?? 0,
        students: enr.count ?? 0,
      });
      setRecent(courses.data ?? []);
    })();
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={BookOpen} label="Courses" value={stats.courses} />
        <StatCard icon={Sparkles} label="Published" value={stats.published} />
        <StatCard icon={Users} label="Enrolled students" value={stats.students} />
        <StatCard icon={TrendingUp} label="Avg. completion" value="68%" hint="across all lessons" />
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">My courses</h2>
          <Link to="/teacher/courses" className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-medium text-white">
            <Plus className="size-3.5" /> New course
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/[0.1] bg-white p-10 text-center">
            <p className="text-zinc-500">No courses yet. Create your first one.</p>
            <Link to="/teacher/courses" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">
              Create course
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((c) => (
              <Link key={c.id} to="/teacher/course/$id" params={{ id: c.id }}
                className="block rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="text-3xl">{c.cover_emoji}</div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${c.published ? "bg-brand-muted text-brand" : "bg-zinc-100 text-zinc-500"}`}>
                    {c.published ? "Live" : "Draft"}
                  </span>
                </div>
                <div className="mt-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">{c.subject} · Class {c.grade}</div>
                <div className="font-display mt-1 text-lg font-semibold">{c.title}</div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function AdminView() {
  const [stats, setStats] = useState({ users: 0, teachers: 0, students: 0, courses: 0 });
  useEffect(() => {
    (async () => {
      const [pr, ro, co] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("user_roles").select("role"),
        supabase.from("teacher_courses").select("id", { count: "exact", head: true }),
      ]);
      const roles = ro.data ?? [];
      setStats({
        users: pr.count ?? 0,
        teachers: roles.filter((r) => r.role === "teacher").length,
        students: roles.filter((r) => r.role === "student").length,
        courses: co.count ?? 0,
      });
    })();
  }, []);
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={Users} label="Total users" value={stats.users} />
        <StatCard icon={GraduationCap} label="Students" value={stats.students} />
        <StatCard icon={Users} label="Teachers" value={stats.teachers} />
        <StatCard icon={BookOpen} label="Courses" value={stats.courses} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link to="/admin" className="rounded-2xl border border-black/[0.06] bg-white p-6 transition hover:shadow-md">
          <ShieldCheck className="size-6 text-brand" />
          <div className="font-display mt-3 text-xl font-semibold">User & Role Management</div>
          <p className="mt-1 text-sm text-zinc-500">View all users, promote teachers, manage admins.</p>
        </Link>
        <Link to="/leaderboard" className="rounded-2xl border border-black/[0.06] bg-white p-6 transition hover:shadow-md">
          <TrendingUp className="size-6 text-brand" />
          <div className="font-display mt-3 text-xl font-semibold">Platform Leaderboard</div>
          <p className="mt-1 text-sm text-zinc-500">Top performers across all games and courses.</p>
        </Link>
      </div>
    </div>
  );
}
