import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, Check, Loader2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/student/browse")({
  head: () => ({ meta: [{ title: "Browse Courses" }] }),
  component: Page,
});

function Page() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolled, setEnrolled] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [grade, setGrade] = useState<string>("all");

  async function load() {
    if (!user) return;
    setLoading(true);
    const [c, e] = await Promise.all([
      supabase.from("teacher_courses").select("*, teacher:profiles!teacher_id(full_name)").eq("published", true).order("created_at", { ascending: false }),
      supabase.from("course_enrollments").select("course_id").eq("student_id", user.id),
    ]);
    setCourses(c.data ?? []);
    setEnrolled(new Set((e.data ?? []).map((x) => x.course_id)));
    setLoading(false);
  }
  useEffect(() => { load(); }, [user]);

  async function enroll(courseId: string) {
    if (!user) return;
    const { error } = await supabase.from("course_enrollments").insert({ course_id: courseId, student_id: user.id });
    if (error) return toast.error(error.message);
    toast.success("Enrolled!");
    setEnrolled(new Set([...enrolled, courseId]));
  }

  const filtered = courses.filter((c) =>
    (grade === "all" || String(c.grade) === grade) &&
    (q === "" || c.title.toLowerCase().includes(q.toLowerCase()) || c.subject.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Student</div>
      <h1 className="font-display mt-1 text-4xl font-semibold tracking-tight">Browse teacher-led courses</h1>
      <p className="mt-2 text-zinc-500">Discover courses created by Shiksha Saarthi teachers and join the ones you love.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 size-4 text-zinc-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title or subject" className="w-full rounded-full border border-black/[0.08] bg-white py-2 pl-9 pr-4 text-sm outline-none" />
        </div>
        <select value={grade} onChange={(e) => setGrade(e.target.value)} className="rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm">
          <option value="all">All grades</option>
          {[6, 7, 8, 9, 10, 11, 12].map((g) => <option key={g} value={g}>Class {g}</option>)}
        </select>
      </div>

      <div className="mt-8">
        {loading ? <Loader2 className="size-5 animate-spin text-zinc-400" /> : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/[0.1] bg-white p-12 text-center">
            <BookOpen className="mx-auto size-8 text-zinc-300" />
            <p className="mt-3 text-zinc-500">No courses match your filters yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => {
              const isE = enrolled.has(c.id);
              return (
                <div key={c.id} className="flex flex-col rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:shadow-md">
                  <div className="text-3xl">{c.cover_emoji}</div>
                  <div className="mt-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">{c.subject} · Class {c.grade}</div>
                  <div className="font-display mt-1 text-lg font-semibold">{c.title}</div>
                  <div className="mt-1 text-xs text-zinc-500">By {c.teacher?.full_name ?? "Teacher"}</div>
                  {c.description && <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{c.description}</p>}
                  <div className="mt-auto pt-4">
                    {isE ? (
                      <Link to="/student/course/$id" params={{ id: c.id }}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white">
                        <Check className="size-4" /> Continue learning
                      </Link>
                    ) : (
                      <button onClick={() => enroll(c.id)}
                        className="w-full rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">
                        Enroll free
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
