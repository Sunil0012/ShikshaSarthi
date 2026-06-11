import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Loader2, Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/teacher/courses")({
  head: () => ({ meta: [{ title: "My Courses — Teacher" }] }),
  component: Page,
});

const SUBJECTS = ["Mathematics", "Science", "Physics", "Chemistry", "Biology", "English", "Hindi", "Social Studies", "Computer Science", "Economics"];
const EMOJIS = ["📚", "🔬", "📐", "🧪", "🧬", "🌍", "💻", "🎨", "📊", "⚡", "🧠", "🚀"];

function Page() {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", subject: "Mathematics", grade: 10, description: "", cover_emoji: "📚" });

  useEffect(() => {
    if (role && role !== "teacher" && role !== "admin") navigate({ to: "/dashboard" });
  }, [role, navigate]);

  async function load() {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase.from("teacher_courses").select("*").eq("teacher_id", user.id).order("created_at", { ascending: false });
    setCourses(data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, [user]);

  async function createCourse() {
    if (!user || !form.title.trim()) return;
    const { data, error } = await supabase.from("teacher_courses").insert({ ...form, teacher_id: user.id }).select().single();
    if (error) return toast.error(error.message);
    toast.success("Course created!");
    setCreating(false);
    setForm({ title: "", subject: "Mathematics", grade: 10, description: "", cover_emoji: "📚" });
    navigate({ to: "/teacher/course/$id", params: { id: data.id } });
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Teacher</div>
          <h1 className="font-display mt-1 text-4xl font-semibold tracking-tight">My Courses</h1>
        </div>
        <button onClick={() => setCreating(true)} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">
          <Plus className="size-4" /> New course
        </button>
      </div>

      {creating && (
        <div className="mt-6 rounded-2xl border border-black/[0.06] bg-white p-6">
          <h3 className="font-display text-xl font-semibold">Create a new course</h3>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-600">Title</span>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" placeholder="Algebra Foundations" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-600">Subject</span>
              <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input">
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-600">Grade</span>
              <select value={form.grade} onChange={(e) => setForm({ ...form, grade: Number(e.target.value) })} className="input">
                {[6, 7, 8, 9, 10, 11, 12].map((g) => <option key={g} value={g}>Class {g}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-zinc-600">Cover emoji</span>
              <div className="flex flex-wrap gap-1.5">
                {EMOJIS.map((em) => (
                  <button key={em} type="button" onClick={() => setForm({ ...form, cover_emoji: em })}
                    className={`grid size-9 place-items-center rounded-lg text-xl ${form.cover_emoji === em ? "bg-brand-muted ring-2 ring-brand" : "bg-zinc-100"}`}>
                    {em}
                  </button>
                ))}
              </div>
            </label>
            <label className="block md:col-span-2">
              <span className="mb-1 block text-xs text-zinc-600">Description</span>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="input" placeholder="What will students learn?" />
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={createCourse} className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white">
              Create & add lessons <ArrowRight className="size-4" />
            </button>
            <button onClick={() => setCreating(false)} className="rounded-full px-4 py-2 text-sm text-zinc-500">Cancel</button>
          </div>
        </div>
      )}

      <div className="mt-8">
        {loading ? <Loader2 className="size-5 animate-spin text-zinc-400" /> : courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/[0.1] bg-white p-12 text-center">
            <BookOpen className="mx-auto size-8 text-zinc-300" />
            <p className="mt-3 text-zinc-500">You haven't created any courses yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
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
                {c.description && <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{c.description}</p>}
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`.input { width:100%; border:1px solid rgb(0 0 0 / 0.1); border-radius:8px; padding:9px 12px; font-size:14px; background:white; outline:none; }
      .input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px color-mix(in oklab, var(--brand) 20%, transparent); }`}</style>
    </div>
  );
}
