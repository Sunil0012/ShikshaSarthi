import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowRight, GraduationCap, Loader2, ShieldCheck, Sparkles, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, type AppRole } from "@/hooks/use-auth";
import { toast } from "sonner";

const search = z.object({ mode: z.enum(["login", "signup"]).optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: search,
  head: () => ({ meta: [{ title: "Sign in — Shiksha Saarthi" }] }),
  component: AuthPage,
});

const ROLES: { key: AppRole; label: string; desc: string; icon: any }[] = [
  { key: "student", label: "Student", desc: "Learn, play games, take quizzes", icon: GraduationCap },
  { key: "teacher", label: "Teacher", desc: "Create courses & track students", icon: Users },
  { key: "admin", label: "Admin", desc: "Manage users & school analytics", icon: ShieldCheck },
];

function AuthPage() {
  const { mode: initial } = Route.useSearch();
  const [mode, setMode] = useState<"login" | "signup">(initial ?? "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("10");
  const [role, setRole] = useState<AppRole>("student");
  const [busy, setBusy] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (user) navigate({ to: "/dashboard" }); }, [user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin, data: { full_name: name, grade, role } },
        });
        if (error) throw error;
        toast.success("Account created — check your email to verify.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/dashboard" });
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong");
    } finally { setBusy(false); }
  }

  return (
    <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-12 md:grid-cols-2">
      <div className="hidden md:block">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand">
          <Sparkles className="size-3" /> Learn brilliantly
        </div>
        <h1 className="font-display mt-5 text-5xl font-semibold leading-[1.05] tracking-tight">
          Your journey from class 6 to board topper starts here.
        </h1>
        <p className="mt-4 max-w-md text-zinc-500">
          Join 1.2 lakh students and 4,800 teachers building courses, playing games, and tracking real growth.
        </p>
        <ul className="mt-8 space-y-3 text-sm text-zinc-600">
          {[
            "Adaptive practice tailored to your weak spots",
            "Teachers create unlimited custom courses",
            "Earn XP, badges, and climb the leaderboard",
            "Aligned with NCERT / CBSE / ICSE syllabus",
          ].map((x) => (
            <li key={x} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 rounded-full bg-brand" /> {x}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-sm">
        <div className="mb-6 flex gap-1 rounded-full bg-zinc-100 p-1 text-sm">
          {(["login", "signup"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 rounded-full px-4 py-1.5 font-medium transition ${mode === m ? "bg-white text-ink shadow-sm" : "text-zinc-500"}`}>
              {m === "login" ? "Log in" : "Sign up"}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <div>
                <span className="mb-2 block text-xs font-medium text-zinc-600">I am a…</span>
                <div className="grid grid-cols-3 gap-2">
                  {ROLES.map((r) => {
                    const Icon = r.icon;
                    const active = role === r.key;
                    return (
                      <button type="button" key={r.key} onClick={() => setRole(r.key)}
                        className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-center text-xs transition ${
                          active ? "border-brand bg-brand-muted text-ink" : "border-black/[0.08] hover:border-brand/40"
                        }`}>
                        <Icon className={`size-4 ${active ? "text-brand" : "text-zinc-500"}`} />
                        <span className="font-medium">{r.label}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-1.5 text-[11px] text-zinc-400">{ROLES.find((r) => r.key === role)?.desc}</p>
              </div>
              <Field label="Full name">
                <input value={name} onChange={(e) => setName(e.target.value)} required className="input" placeholder="Arjun Sharma" />
              </Field>
              {role === "student" && (
                <Field label="Class / Grade">
                  <select value={grade} onChange={(e) => setGrade(e.target.value)} className="input">
                    {[6, 7, 8, 9, 10, 11, 12].map((g) => <option key={g} value={g}>Class {g}</option>)}
                  </select>
                </Field>
              )}
            </>
          )}
          <Field label="Email">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" placeholder="you@example.com" />
          </Field>
          <Field label="Password">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="input" placeholder="••••••••" />
          </Field>
          <button type="submit" disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60">
            {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
            {mode === "signup" ? "Create account" : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-400">
          By continuing you agree to our <Link to="/about" className="underline">Terms</Link>.
        </p>
      </div>

      <style>{`.input { width:100%; border:1px solid rgb(0 0 0 / 0.1); border-radius:8px; padding:9px 12px; font-size:14px; background:white; outline:none; }
      .input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px color-mix(in oklab, var(--brand) 20%, transparent); }`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-zinc-600">{label}</span>
      {children}
    </label>
  );
}
