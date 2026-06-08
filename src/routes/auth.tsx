import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const search = z.object({ mode: z.enum(["login", "signup"]).optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: search,
  head: () => ({ meta: [{ title: "Sign in — Shiksha Saarthi" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { mode: initial } = Route.useSearch();
  const [mode, setMode] = useState<"login" | "signup">(initial ?? "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("10");
  const [busy, setBusy] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate({ to: "/dashboard" });
  }, [user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: name, grade },
          },
        });
        if (error) throw error;
        toast.success("Account created! Check your email to verify.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/dashboard" });
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setBusy(true);
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/dashboard",
    });
    if (res.error) {
      toast.error("Google sign-in failed");
      setBusy(false);
    }
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
          Join 1.2 lakh students learning math, science, English, and more with adaptive courses,
          games, and offline practice.
        </p>
        <ul className="mt-8 space-y-3 text-sm text-zinc-600">
          {[
            "Adaptive practice tailored to your weak spots",
            "Offline-first — learn even without the internet",
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
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-full px-4 py-1.5 font-medium transition ${
                mode === m ? "bg-white text-ink shadow-sm" : "text-zinc-500"
              }`}
            >
              {m === "login" ? "Log in" : "Sign up"}
            </button>
          ))}
        </div>

        <button
          onClick={google}
          disabled={busy}
          className="mb-5 flex w-full items-center justify-center gap-2 rounded-md border border-black/[0.08] bg-white px-4 py-2.5 text-sm font-medium hover:bg-zinc-50 disabled:opacity-60"
        >
          <svg className="size-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.5c2-1.9 3.3-4.7 3.3-8z"/><path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.6H2.2v2.9C4 19.9 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.8 14.1c-.2-.7-.4-1.4-.4-2.1s.1-1.4.4-2.1V7H2.2C1.4 8.5 1 10.2 1 12s.4 3.5 1.2 5l3.6-2.9z"/><path fill="#EA4335" d="M12 5.3c1.6 0 3 .6 4.2 1.6l3.1-3.1C17.4 2 14.9 1 12 1 7.7 1 4 4.1 2.2 7l3.6 2.9C6.7 7.2 9.1 5.3 12 5.3z"/></svg>
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-zinc-400">
          <div className="h-px flex-1 bg-black/[0.06]" /> or {mode === "signup" ? "sign up" : "log in"} with email
          <div className="h-px flex-1 bg-black/[0.06]" />
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <Field label="Full name">
                <input value={name} onChange={(e) => setName(e.target.value)} required className="input" placeholder="Arjun Sharma" />
              </Field>
              <Field label="Class / Grade">
                <select value={grade} onChange={(e) => setGrade(e.target.value)} className="input">
                  {[6, 7, 8, 9, 10, 11, 12].map((g) => <option key={g} value={g}>Class {g}</option>)}
                </select>
              </Field>
            </>
          )}
          <Field label="Email">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" placeholder="you@example.com" />
          </Field>
          <Field label="Password">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="input" placeholder="••••••••" />
          </Field>
          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
          >
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
