import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff, Loader2, Plus, Save, Trash2, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/teacher/course/$id")({
  head: () => ({ meta: [{ title: "Edit Course" }] }),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<number>(0);
  const [tab, setTab] = useState<"lessons" | "modules" | "students" | "settings">("lessons");
  const [busy, setBusy] = useState(false);

  async function load() {
    const [c, l, e] = await Promise.all([
      supabase.from("teacher_courses").select("*").eq("id", id).maybeSingle(),
      supabase.from("teacher_lessons").select("*").eq("course_id", id).order("position"),
      supabase.from("course_enrollments").select("id, profiles:student_id(full_name, grade)").eq("course_id", id),
    ]);
    setCourse(c.data);
    setLessons(l.data ?? []);
    setEnrollments(e.data?.length ?? 0);
  }
  useEffect(() => { load(); }, [id]);

  if (!course) return <div className="grid min-h-[60vh] place-items-center"><Loader2 className="size-6 animate-spin text-zinc-400" /></div>;
  if (course.teacher_id !== user?.id) return <div className="p-12 text-center text-zinc-500">You don't have access to this course.</div>;

  async function togglePublish() {
    setBusy(true);
    const { error } = await supabase.from("teacher_courses").update({ published: !course.published }).eq("id", id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(course.published ? "Course unpublished" : "Course is now live!");
    load();
  }

  async function addLesson() {
    const { data, error } = await supabase.from("teacher_lessons").insert({
      course_id: id, title: "New lesson", content: "", position: lessons.length, duration_min: 10,
    }).select().single();
    if (error) return toast.error(error.message);
    setLessons([...lessons, data]);
  }

  async function deleteCourse() {
    if (!confirm("Delete this course and all its lessons? This cannot be undone.")) return;
    await supabase.from("teacher_courses").delete().eq("id", id);
    toast.success("Course deleted");
    navigate({ to: "/teacher/courses" });
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link to="/teacher/courses" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-ink">
        <ArrowLeft className="size-3" /> My courses
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <div className="text-5xl">{course.cover_emoji}</div>
          <div className="mt-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">{course.subject} · Class {course.grade}</div>
          <h1 className="font-display mt-1 text-4xl font-semibold tracking-tight">{course.title}</h1>
          {course.description && <p className="mt-2 max-w-2xl text-zinc-500">{course.description}</p>}
        </div>
        <button disabled={busy} onClick={togglePublish}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium ${course.published ? "bg-zinc-100 text-zinc-700" : "bg-brand text-white"}`}>
          {course.published ? <><EyeOff className="size-4" /> Unpublish</> : <><Eye className="size-4" /> Publish</>}
        </button>
      </div>

      {course.join_code && (
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-brand/20 bg-brand-muted/40 p-4">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand">Class join code</div>
          <div className="font-mono text-2xl font-bold tracking-widest text-ink">{course.join_code}</div>
          <button onClick={() => { navigator.clipboard.writeText(course.join_code); toast.success("Copied!"); }}
            className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink ring-1 ring-black/[0.06]">Copy</button>
          <span className="text-xs text-zinc-500">Share with students — they paste this on their dashboard to join.</span>
        </div>
      )}

      <div className="mt-8 flex gap-1 rounded-full bg-zinc-100 p-1 text-sm">
        {(["lessons", "modules", "students", "settings"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 rounded-full px-4 py-1.5 font-medium capitalize transition ${tab === t ? "bg-white text-ink shadow-sm" : "text-zinc-500"}`}>
            {t} {t === "students" && `(${enrollments})`} {t === "lessons" && `(${lessons.length})`}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "lessons" && <LessonsTab lessons={lessons} reload={load} addLesson={addLesson} courseId={id} />}
        {tab === "modules" && <ModulesTab courseId={id} />}
        {tab === "students" && <StudentsTab courseId={id} />}
        {tab === "settings" && <SettingsTab course={course} reload={load} onDelete={deleteCourse} />}
      </div>
    </div>
  );
}

function ModulesTab({ courseId }: { courseId: string }) {
  const [mods, setMods] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  async function load() {
    const { data } = await (supabase as any).from("teacher_modules").select("*").eq("course_id", courseId).order("position");
    setMods(data ?? []);
  }
  useEffect(() => { load(); }, [courseId]);
  async function add() {
    if (!title.trim()) return;
    await (supabase as any).from("teacher_modules").insert({ course_id: courseId, title, position: mods.length });
    setTitle(""); load();
  }
  async function rename(id: string, t: string) {
    await (supabase as any).from("teacher_modules").update({ title: t }).eq("id", id);
    load();
  }
  async function del(id: string) {
    if (!confirm("Delete this module? Lessons will stay but be unassigned.")) return;
    await (supabase as any).from("teacher_modules").delete().eq("id", id);
    load();
  }
  return (
    <div>
      <p className="mb-3 text-sm text-zinc-500">Modules group your lessons into chapters (e.g. "Unit 1 — Algebra basics").</p>
      <div className="space-y-2">
        {mods.map((m, i) => (
          <div key={m.id} className="flex items-center gap-2 rounded-xl border border-black/[0.06] bg-white p-3">
            <span className="grid size-7 place-items-center rounded-full bg-brand-muted text-xs font-semibold text-brand">{i + 1}</span>
            <input defaultValue={m.title} onBlur={(e) => e.target.value !== m.title && rename(m.id, e.target.value)}
              className="flex-1 bg-transparent text-sm font-medium outline-none" />
            <button onClick={() => del(m.id)} className="grid size-7 place-items-center rounded-md text-zinc-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="size-3.5" /></button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New module title" className="flex-1 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-sm outline-none" />
        <button onClick={add} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">
          <Plus className="size-4" /> Add module
        </button>
      </div>
    </div>
  );
}

function LessonsTab({ lessons, reload, addLesson, courseId }: any) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      <div className="space-y-2">
        {lessons.map((l: any, i: number) => (
          <LessonEditor key={l.id} lesson={l} index={i} reload={reload} open={open === l.id} onOpen={() => setOpen(open === l.id ? null : l.id)} courseId={courseId} />
        ))}
      </div>
      <button onClick={addLesson} className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">
        <Plus className="size-4" /> Add lesson
      </button>
    </div>
  );
}

function LessonEditor({ lesson, index, reload, open, onOpen }: any) {
  const [l, setL] = useState(lesson);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [savingQ, setSavingQ] = useState(false);

  useEffect(() => { if (open) loadQuizzes(); }, [open]);
  async function loadQuizzes() {
    const { data } = await supabase.from("teacher_quizzes").select("*").eq("lesson_id", lesson.id).order("position");
    setQuizzes(data ?? []);
  }
  async function save() {
    const { error } = await supabase.from("teacher_lessons").update({ title: l.title, content: l.content, video_url: l.video_url, duration_min: l.duration_min }).eq("id", lesson.id);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    reload();
  }
  async function remove() {
    if (!confirm("Delete this lesson?")) return;
    await supabase.from("teacher_lessons").delete().eq("id", lesson.id);
    reload();
  }
  async function addQuiz() {
    setSavingQ(true);
    await supabase.from("teacher_quizzes").insert({ lesson_id: lesson.id, question: "New question?", options: ["A", "B", "C", "D"], correct_index: 0, position: quizzes.length });
    setSavingQ(false);
    loadQuizzes();
  }
  async function updateQuiz(q: any, patch: Partial<{ question: string; options: string[]; correct_index: number; explanation: string | null }>) {
    await supabase.from("teacher_quizzes").update(patch as any).eq("id", q.id);
    loadQuizzes();
  }
  async function deleteQuiz(qid: string) {
    await supabase.from("teacher_quizzes").delete().eq("id", qid);
    loadQuizzes();
  }

  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white">
      <button onClick={onOpen} className="flex w-full items-center justify-between p-4 text-left">
        <div className="flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-full bg-brand-muted text-xs font-semibold text-brand">{index + 1}</span>
          <span className="font-medium">{l.title || "Untitled lesson"}</span>
        </div>
        <span className="text-xs text-zinc-400">{l.duration_min} min</span>
      </button>
      {open && (
        <div className="space-y-4 border-t border-black/[0.06] p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label><span className="mb-1 block text-xs text-zinc-600">Title</span>
              <input value={l.title} onChange={(e) => setL({ ...l, title: e.target.value })} className="input" /></label>
            <label><span className="mb-1 block text-xs text-zinc-600">Duration (min)</span>
              <input type="number" value={l.duration_min || 0} onChange={(e) => setL({ ...l, duration_min: Number(e.target.value) })} className="input" /></label>
            <label className="md:col-span-2"><span className="mb-1 block text-xs text-zinc-600">Video URL (YouTube/Vimeo embed)</span>
              <input value={l.video_url ?? ""} onChange={(e) => setL({ ...l, video_url: e.target.value })} className="input" placeholder="https://youtube.com/embed/..." /></label>
            <label className="md:col-span-2"><span className="mb-1 block text-xs text-zinc-600">Lesson content (markdown / notes)</span>
              <textarea value={l.content ?? ""} onChange={(e) => setL({ ...l, content: e.target.value })} rows={6} className="input font-mono text-xs" /></label>
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white">
              <Save className="size-4" /> Save
            </button>
            <button onClick={remove} className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600">
              <Trash2 className="size-4" /> Delete
            </button>
          </div>

          <div className="rounded-xl bg-zinc-50 p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Quiz questions ({quizzes.length})</h4>
              <button onClick={addQuiz} disabled={savingQ} className="text-xs font-medium text-brand">+ Add question</button>
            </div>
            <div className="mt-3 space-y-3">
              {quizzes.map((q, qi) => (
                <QuizEditor key={q.id} q={q} index={qi} onChange={(patch: any) => updateQuiz(q, patch)} onDelete={() => deleteQuiz(q.id)} />
              ))}
            </div>
          </div>
        </div>
      )}
      <style>{`.input { width:100%; border:1px solid rgb(0 0 0 / 0.1); border-radius:8px; padding:8px 12px; font-size:14px; background:white; outline:none; }
      .input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px color-mix(in oklab, var(--brand) 20%, transparent); }`}</style>
    </div>
  );
}

function QuizEditor({ q, index, onChange, onDelete }: any) {
  const [local, setLocal] = useState(q);
  useEffect(() => setLocal(q), [q.id]);
  const opts: string[] = Array.isArray(local.options) ? local.options : ["", "", "", ""];

  return (
    <div className="rounded-lg bg-white p-3 ring-1 ring-black/[0.05]">
      <div className="flex items-start gap-2">
        <span className="mt-2 text-[10px] font-bold text-zinc-400">Q{index + 1}</span>
        <input value={local.question} onChange={(e) => { const v = { ...local, question: e.target.value }; setLocal(v); onChange({ question: v.question }); }}
          className="input flex-1" placeholder="Question text" />
        <button onClick={onDelete} className="grid size-8 place-items-center rounded-md text-zinc-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="size-3.5" /></button>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-1.5 md:grid-cols-2">
        {opts.map((o, i) => (
          <label key={i} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${local.correct_index === i ? "bg-brand-muted ring-1 ring-brand" : "bg-zinc-50"}`}>
            <input type="radio" checked={local.correct_index === i} onChange={() => { setLocal({ ...local, correct_index: i }); onChange({ correct_index: i }); }} />
            <input value={o} onChange={(e) => { const no = [...opts]; no[i] = e.target.value; const v = { ...local, options: no }; setLocal(v); onChange({ options: no }); }}
              className="flex-1 bg-transparent outline-none" placeholder={`Option ${String.fromCharCode(65 + i)}`} />
          </label>
        ))}
      </div>
    </div>
  );
}

function StudentsTab({ courseId }: any) {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("course_enrollments").select("id, created_at, student:profiles!student_id(full_name, grade)").eq("course_id", courseId)
      .then(({ data }) => setRows(data ?? []));
  }, [courseId]);
  if (rows.length === 0) return <div className="rounded-2xl border border-dashed border-black/[0.1] bg-white p-12 text-center"><Users className="mx-auto size-8 text-zinc-300" /><p className="mt-3 text-zinc-500">No students enrolled yet. Publish the course so students can join.</p></div>;
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white">
      {rows.map((r) => (
        <div key={r.id} className="flex items-center justify-between border-b border-black/[0.04] px-5 py-3 last:border-0">
          <div><div className="font-medium">{r.student?.full_name ?? "Student"}</div><div className="text-xs text-zinc-500">Class {r.student?.grade ?? "—"}</div></div>
          <div className="text-xs text-zinc-400">Joined {new Date(r.created_at).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );
}

function SettingsTab({ course, reload, onDelete }: any) {
  const [c, setC] = useState(course);
  async function save() {
    const { error } = await supabase.from("teacher_courses").update({ title: c.title, description: c.description, subject: c.subject, grade: c.grade, cover_emoji: c.cover_emoji }).eq("id", course.id);
    if (error) return toast.error(error.message);
    toast.success("Saved"); reload();
  }
  return (
    <div className="space-y-4 rounded-2xl border border-black/[0.06] bg-white p-6">
      <label className="block"><span className="mb-1 block text-xs text-zinc-600">Title</span><input value={c.title} onChange={(e) => setC({ ...c, title: e.target.value })} className="input" /></label>
      <label className="block"><span className="mb-1 block text-xs text-zinc-600">Description</span><textarea value={c.description ?? ""} onChange={(e) => setC({ ...c, description: e.target.value })} rows={3} className="input" /></label>
      <div className="flex gap-2">
        <button onClick={save} className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white">Save</button>
        <button onClick={onDelete} className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600"><Trash2 className="size-4" /> Delete course</button>
      </div>
      <style>{`.input { width:100%; border:1px solid rgb(0 0 0 / 0.1); border-radius:8px; padding:9px 12px; font-size:14px; background:white; outline:none; }`}</style>
    </div>
  );
}
