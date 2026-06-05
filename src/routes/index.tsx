import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Atom,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleDot,
  Cloud,
  CloudOff,
  Cpu,
  Download,
  Flame,
  Gamepad2,
  GraduationCap,
  Layers,
  LineChart,
  Lock,
  Play,
  Radio,
  Sparkles,
  Target,
  Trophy,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import { SUBJECTS, GRADES, COURSES, LEADERBOARD } from "@/lib/lms-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumio — Brilliant learning for class 6 to 12" },
      {
        name: "description",
        content:
          "A gamified, offline-first learning platform for students of class 6 to 12. Adaptive practice, real teachers, educational games, XP, streaks, and board-exam preparation.",
      },
      { property: "og:title", content: "Lumio — Learn brilliantly. Class 6 to 12." },
      {
        property: "og:description",
        content:
          "Adaptive courses, mini-games, leaderboards, and offline drills — built for Indian students from class 6 to 12.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <>
      <Hero />
      <GradePicker />
      <Bento />
      <SubjectStrip />
      <PopularCourses />
      <OfflineSection />
      <LeaderboardPreview />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

/* ----------------------------------- Hero --------------------------------- */

function Hero() {
  return (
    <section className="px-6 pt-20 pb-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <div className="animate-reveal mb-8 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-muted px-3 py-1">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand">
            New · 2026 syllabus live
          </span>
        </div>

        <h1 className="animate-reveal font-display max-w-[20ch] text-balance text-5xl font-semibold leading-[0.95] md:text-7xl lg:text-[88px] [animation-delay:80ms]">
          Learn brilliantly. From class 6 to 12.
        </h1>

        <p className="animate-reveal mt-8 max-w-[54ch] text-pretty text-lg text-zinc-500 [animation-delay:160ms]">
          A gamified learning OS for school students. Adaptive practice for every subject, mini-games
          that make tough concepts click, board-exam prep — and it all works offline.
        </p>

        <div className="animate-reveal mt-10 flex flex-wrap items-center justify-center gap-3 [animation-delay:220ms]">
          <Link
            to="/signup"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-ink px-6 text-sm font-medium text-white ring-1 ring-ink transition-transform hover:scale-[1.02]"
          >
            Start learning free
            <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/courses"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-white px-6 text-sm font-medium text-ink ring-1 ring-black/[0.08] transition-colors hover:bg-zinc-50"
          >
            <Play className="size-3.5" />
            Browse 28 courses
          </Link>
        </div>

        <div className="animate-reveal mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400 [animation-delay:280ms]">
          <span className="inline-flex items-center gap-1.5">
            <Check className="size-3.5 text-brand" /> Free forever for students
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="size-3.5 text-brand" /> CBSE + ICSE aligned
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="size-3.5 text-brand" /> Works in airplane mode
          </span>
        </div>

        <DashboardMock />
      </div>
    </section>
  );
}

function DashboardMock() {
  return (
    <div className="animate-reveal relative mt-20 w-full max-w-6xl [animation-delay:380ms]">
      <FloatingBadge />
      <FloatingStreak />

      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.06]">
        <div className="flex h-10 items-center justify-between border-b border-black/[0.05] px-4">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-zinc-200" />
            <div className="size-2.5 rounded-full bg-zinc-200" />
            <div className="size-2.5 rounded-full bg-zinc-200" />
          </div>
          <div className="hidden items-center gap-1.5 rounded-md bg-zinc-50 px-3 py-1 text-[11px] font-medium text-zinc-400 ring-1 ring-black/[0.04] sm:flex">
            <Lock className="size-3" />
            lumio.app / class-10 / science / m4
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-brand">
            <CloudOff className="size-3.5" />
            Offline
          </div>
        </div>

        <div className="flex h-[540px]">
          <aside className="hidden w-60 shrink-0 border-r border-black/[0.05] bg-zinc-50/60 p-4 md:block">
            <div className="mb-4 flex items-center gap-2 rounded-md bg-white p-2 ring-1 ring-black/[0.04]">
              <div className="size-6 rounded-full bg-gradient-to-br from-brand to-azure" />
              <div className="flex-1">
                <div className="text-[11px] font-semibold leading-tight">Aanya · Class 10</div>
                <div className="text-[10px] text-zinc-400">Lvl 18 · Board Prep</div>
              </div>
            </div>
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
              My subjects
            </div>
            <ul className="space-y-0.5">
              {[
                { label: "Mathematics", done: true },
                { label: "Science", active: true },
                { label: "Social Studies", done: false },
                { label: "English", done: false },
                { label: "Hindi", done: false },
                { label: "Computer", done: false },
              ].map((m) => (
                <li
                  key={m.label}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${
                    m.active
                      ? "bg-ink font-medium text-white"
                      : "text-zinc-600 hover:bg-white"
                  }`}
                >
                  {m.done ? (
                    <Check className="size-3 text-brand" />
                  ) : m.active ? (
                    <CircleDot className="size-3 text-brand" />
                  ) : (
                    <div className="size-3 rounded-full ring-1 ring-zinc-300" />
                  )}
                  {m.label}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg bg-white p-3 ring-1 ring-black/[0.04]">
              <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-widest text-zinc-400">
                <span>Local cache</span>
                <span className="text-brand">84%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-zinc-100">
                <div className="h-full w-[84%] rounded-full bg-brand" />
              </div>
              <div className="mt-2 text-[10px] text-zinc-400">2.4 GB · ready offline</div>
            </div>
          </aside>

          <main className="flex-1 overflow-hidden p-5 text-left sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-widest text-zinc-400">
                  Module 4 · Electricity
                </div>
                <h3 className="font-display text-2xl font-semibold">Science — Class 10</h3>
              </div>
              <div className="hidden items-center gap-3 lg:flex">
                <Stat label="Streak" value="24d" tone="ember" icon={Flame} />
                <Stat label="XP today" value="+420" tone="brand" icon={Zap} />
                <Stat label="Focus" value="97%" tone="azure" icon={Target} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
              <div className="sm:col-span-3 rounded-xl bg-gradient-to-br from-zinc-50 to-white p-5 ring-1 ring-black/[0.05]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    Live drill · Ohm's Law
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-brand">
                    <Radio className="size-3" /> Adaptive
                  </span>
                </div>
                <div className="grid h-44 grid-cols-12 grid-rows-6 gap-1">
                  {Array.from({ length: 72 }).map((_, i) => {
                    const lit = [4, 5, 16, 17, 18, 28, 29, 30, 31, 41, 42, 43, 54, 55, 67].includes(
                      i,
                    );
                    return (
                      <div
                        key={i}
                        className={`rounded-[2px] ${
                          lit ? "bg-brand" : i % 7 === 0 ? "bg-zinc-200" : "bg-zinc-100"
                        }`}
                      />
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px]">
                  <code className="font-mono text-zinc-500">V = I × R</code>
                  <div className="flex gap-1.5">
                    <Pill>2Ω</Pill>
                    <Pill>5Ω</Pill>
                    <Pill active>10Ω</Pill>
                    <Pill>20Ω</Pill>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2 space-y-4">
                <div className="rounded-xl bg-ink p-5 text-white">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                    Board exam in
                  </div>
                  <div className="font-display text-2xl font-medium">82 days</div>
                  <div className="mt-1 text-[11px] text-white/50">
                    On track · 92% syllabus done
                  </div>
                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="shimmer-overlay h-full w-[92%] rounded-full bg-brand" />
                  </div>
                </div>
                <div className="rounded-xl bg-white p-4 ring-1 ring-black/[0.05]">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    Lesson 4.3 · Magnetic Effects
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-full rounded bg-zinc-100" />
                    <div className="h-2 w-[80%] rounded bg-zinc-100" />
                    <div className="h-2 w-[65%] rounded bg-zinc-100" />
                  </div>
                  <button className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-brand">
                    Resume <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
  icon: Icon,
}: {
  label: string;
  value: string;
  tone: "brand" | "ember" | "azure";
  icon: React.ComponentType<{ className?: string }>;
}) {
  const toneMap = {
    brand: "bg-brand-muted text-brand",
    ember: "bg-orange-50 text-ember",
    azure: "bg-blue-50 text-azure",
  } as const;
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-black/[0.04]">
      <div className={`grid size-6 place-items-center rounded-md ${toneMap[tone]}`}>
        <Icon className="size-3.5" />
      </div>
      <div className="leading-tight">
        <div className="text-[9px] font-semibold uppercase tracking-widest text-zinc-400">
          {label}
        </div>
        <div className="font-display text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}

function Pill({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`grid h-6 min-w-7 place-items-center rounded px-1.5 font-mono text-[10px] ring-1 ${
        active ? "bg-ink text-white ring-ink" : "bg-white text-zinc-600 ring-black/10"
      }`}
    >
      {children}
    </span>
  );
}

function FloatingStreak() {
  return (
    <div className="absolute -left-4 top-24 z-10 hidden w-56 rotate-[-3deg] rounded-xl bg-white p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.06] lg:block">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
          Weekly streak
        </span>
        <Flame className="size-3.5 text-ember" />
      </div>
      <div className="flex items-end gap-1">
        {[12, 22, 32, 40, 18, 28, 44].map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`w-full rounded-t ${i === 3 || i === 6 ? "bg-ember" : "bg-zinc-200"}`}
              style={{ height: `${h}px` }}
            />
            <span className="text-[9px] text-zinc-400">{"MTWTFSS"[i]}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px]">
        <span className="text-zinc-500">This week</span>
        <span className="font-display font-semibold text-ember">+1,840 XP</span>
      </div>
    </div>
  );
}

function FloatingBadge() {
  return (
    <div className="absolute -right-2 top-40 z-10 hidden w-52 rotate-[3deg] rounded-xl bg-ink p-4 text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] lg:block">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
          Badge unlocked
        </span>
        <Sparkles className="size-3.5 text-brand" />
      </div>
      <div className="mb-3 flex justify-center py-2">
        <div className="relative grid size-16 place-items-center rounded-full bg-brand/15 ring-1 ring-brand/30">
          <div className="absolute inset-0 rounded-full bg-brand/20 blur-md" />
          <Award className="relative size-7 text-brand" />
        </div>
      </div>
      <div className="text-center">
        <div className="font-display text-sm font-semibold">Algebra Ace</div>
        <div className="mt-0.5 text-[10px] text-white/50">Top 4% in class 10</div>
      </div>
    </div>
  );
}

/* ------------------------------ Grade picker ------------------------------ */

function GradePicker() {
  return (
    <section className="border-y border-black/[0.05] bg-white py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Pick your class
            </div>
            <div className="font-display mt-1 text-2xl font-medium">
              Where are you studying right now?
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {GRADES.map((g) => (
              <Link
                key={g}
                to="/courses"
                search={{ grade: g }}
                className="group inline-flex h-10 items-center gap-1.5 rounded-full bg-zinc-100 px-4 text-sm font-semibold text-ink ring-1 ring-black/[0.05] transition-all hover:bg-ink hover:text-white"
              >
                <GraduationCap className="size-3.5 opacity-60 group-hover:opacity-100" />
                Class {g}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Bento features ----------------------------- */

function Bento() {
  return (
    <section className="bg-zinc-100/70 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="The platform"
          title="Built so that learning sticks."
          sub="Six interlocking systems that turn time spent studying into real, measured ability — not just notes you forget."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6">
          <Card className="md:col-span-4">
            <CardHeader
              tone="brand"
              icon={BrainCircuit}
              title="Adaptive practice"
              desc="The engine learns where you struggle in maths, science, or grammar — then rebuilds tomorrow's plan around those exact gaps."
            />
            <div className="mt-6 grid grid-cols-7 items-end gap-2 rounded-lg bg-zinc-50 p-4 ring-1 ring-black/[0.04]">
              {[24, 38, 52, 30, 68, 44, 80].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-full origin-bottom rounded-t ${
                      i === 6 ? "bg-brand" : i === 4 ? "bg-brand/60" : "bg-zinc-200"
                    }`}
                    style={{ height: `${h}px`, animation: `bar-grow 0.8s ease-out ${i * 60}ms both` }}
                  />
                  <span className="text-[9px] text-zinc-400">D{i + 1}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px]">
              <span className="text-zinc-500">Retention forecast</span>
              <span className="font-display font-semibold text-brand">+34% vs textbook</span>
            </div>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader
              tone="ember"
              icon={Flame}
              title="Daily streaks"
              desc="Small daily practice beats night-before cramming. Streaks keep you in the chair."
            />
            <div className="mt-6 flex h-24 items-end gap-1.5 rounded-lg bg-zinc-50 p-2 ring-1 ring-black/[0.04]">
              {[20, 30, 42, 60, 30, 46, 72].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${i === 3 || i === 6 ? "bg-ember" : "bg-zinc-200"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-3 text-[11px] text-zinc-500">
              <span className="font-display font-semibold text-ember">24-day streak</span> · keep
              going!
            </div>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader
              tone="azure"
              icon={CloudOff}
              title="Works offline"
              desc="Patchy WiFi? No problem. Download lessons and drills, study anywhere."
            />
            <div className="mt-6 rounded-lg bg-ink p-4 text-white">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                On this device
              </div>
              <div className="font-display text-xl font-medium">2.4 GB cached</div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[78%] rounded-full bg-azure" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-white/50">
                <span>78% of subjects</span>
                <span className="inline-flex items-center gap-1">
                  <Wifi className="size-3" /> standby
                </span>
              </div>
            </div>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader
              tone="brand"
              icon={Gamepad2}
              title="Mini-games"
              desc="Concept-native games — slice equations, build atoms, debug code. Learn by playing."
            />
            <div className="mt-6 grid grid-cols-3 gap-2">
              {["Number Ninja", "Atom Lab", "Code Quest"].map((g, i) => (
                <Link
                  to="/games"
                  key={g}
                  className="aspect-square rounded-lg bg-gradient-to-br from-zinc-50 to-white p-2 text-center ring-1 ring-black/[0.05] hover:ring-brand/30"
                >
                  <div
                    className={`mx-auto mb-2 mt-2 size-6 rounded ${
                      ["bg-brand", "bg-ember", "bg-azure"][i]
                    }`}
                  />
                  <div className="text-[10px] font-semibold">{g}</div>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader
              tone="ember"
              icon={Trophy}
              title="Class leaderboard"
              desc="Climb your school and global ranks weekly. Top 1% unlocks elite badges."
            />
            <div className="mt-6 space-y-2">
              {LEADERBOARD.slice(0, 3).map((r) => (
                <div
                  key={r.n}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[11px] ${
                    r.you ? "bg-brand-muted ring-1 ring-brand/15" : "bg-zinc-50"
                  }`}
                >
                  <span className="font-mono text-zinc-400">{r.n}</span>
                  <div className="size-5 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500" />
                  <span className="flex-1 truncate font-medium">{r.name}</span>
                  <span className="font-display font-semibold">{(r.xp / 1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="md:col-span-6">
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
              <div className="flex-1">
                <CardHeader
                  tone="brand"
                  icon={LineChart}
                  title="Reports your parents will actually understand"
                  desc="Weekly progress emails, real mastery scores, and decay curves for every topic — not vanity metrics."
                />
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Per-topic mastery with confidence intervals",
                    "Weekly parent summary by email or WhatsApp",
                    "Verified board-exam readiness score",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-600">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 rounded-xl bg-gradient-to-br from-zinc-50 to-white p-6 ring-1 ring-black/[0.05]">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    Mastery · last 30 days
                  </span>
                  <span className="font-display text-sm font-semibold text-brand">92%</span>
                </div>
                <RetentionChart />
                <div className="mt-4 flex items-center gap-4 text-[10px] text-zinc-400">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="block size-2 rounded-full bg-brand" /> Lumio
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="block size-2 rounded-full bg-zinc-300" /> Class average
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function RetentionChart() {
  return (
    <svg viewBox="0 0 320 120" className="h-32 w-full">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.68 0.16 162)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="oklch(0.68 0.16 162)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 30, 60, 90, 120].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="#0001" strokeDasharray="2 4" />
      ))}
      <path
        d="M0,90 C30,80 60,86 90,70 C120,54 150,60 180,40 C210,22 240,28 270,18 C290,12 310,10 320,8 L320,120 L0,120 Z"
        fill="url(#g)"
      />
      <path
        d="M0,90 C30,80 60,86 90,70 C120,54 150,60 180,40 C210,22 240,28 270,18 C290,12 310,10 320,8"
        fill="none"
        stroke="oklch(0.68 0.16 162)"
        strokeWidth="2"
      />
      <path
        d="M0,100 C40,98 80,102 120,96 C160,90 200,92 240,86 C280,82 310,80 320,80"
        fill="none"
        stroke="#d4d4d8"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group rounded-2xl bg-white p-6 ring-1 ring-black/[0.05] transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.2)] ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({
  icon: Icon,
  title,
  desc,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  tone: "brand" | "ember" | "azure";
}) {
  const toneMap = {
    brand: "bg-brand-muted text-brand",
    ember: "bg-orange-50 text-ember",
    azure: "bg-blue-50 text-azure",
  } as const;
  return (
    <>
      <div className={`mb-5 inline-grid size-9 place-items-center rounded-lg ${toneMap[tone]}`}>
        <Icon className="size-4" />
      </div>
      <h3 className="font-display text-xl font-medium">{title}</h3>
      <p className="mt-1.5 max-w-[42ch] text-sm text-zinc-500">{desc}</p>
    </>
  );
}

/* ----------------------------- Subject strip ------------------------------ */

function SubjectStrip() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Subjects"
          title="Every subject your school teaches — and a few they don't."
        />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {SUBJECTS.map((s) => (
            <Link
              key={s.slug}
              to="/courses"
              className="group flex flex-col items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-black/[0.05] transition-all hover:-translate-y-0.5 hover:ring-brand/30"
            >
              <SubjectIcon name={s.icon} tone={s.tone} />
              <div className="text-sm font-semibold">{s.name}</div>
              <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 group-hover:text-brand">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SubjectIcon({
  name,
  tone,
}: {
  name: string;
  tone: "brand" | "ember" | "azure" | "violet" | "rose" | "amber";
}) {
  const toneMap: Record<string, string> = {
    brand: "bg-brand-muted text-brand",
    ember: "bg-orange-50 text-ember",
    azure: "bg-blue-50 text-azure",
    violet: "bg-violet-50 text-violet-600",
    rose: "bg-rose-50 text-rose-600",
    amber: "bg-amber-50 text-amber-600",
  };
  return (
    <div className={`grid size-9 place-items-center rounded-lg ${toneMap[tone]}`}>
      <span className="text-sm font-semibold">{name[0]}</span>
    </div>
  );
}

/* ---------------------------- Popular courses ---------------------------- */

function PopularCourses() {
  const picks = COURSES.slice(0, 6);
  return (
    <section className="bg-zinc-100/70 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              <span className="block h-px w-6 bg-zinc-300" />
              Popular right now
            </div>
            <h2 className="font-display text-balance text-4xl font-semibold leading-tight md:text-5xl">
              Courses students love.
            </h2>
          </div>
          <Link
            to="/courses"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-white px-4 text-sm font-medium ring-1 ring-black/[0.08] hover:bg-zinc-50"
          >
            Browse all 28 courses
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {picks.map((c) => (
            <Link
              key={c.slug}
              to="/courses/$slug"
              params={{ slug: c.slug }}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-black/[0.05] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)]"
            >
              <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${c.tone}`} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    Class {c.grade} · {c.subject.replace("-", " ")}
                  </span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-zinc-500 ring-1 ring-black/[0.06]">
                    {c.level}
                  </span>
                </div>
                <h3 className="font-display mt-12 text-xl font-medium">{c.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{c.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-black/[0.05] pt-4 text-[11px] text-zinc-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Layers className="size-3.5" /> {c.modules} modules
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen className="size-3.5" /> {c.hours} hrs
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-ink opacity-0 transition-opacity group-hover:opacity-100">
                    Enter <ChevronRight className="size-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Offline -------------------------------- */

function OfflineSection() {
  return (
    <section className="bg-ink px-6 py-24 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
            <CloudOff className="size-3.5 text-brand" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand">
              Offline first
            </span>
          </div>
          <h2 className="font-display text-balance text-4xl font-semibold leading-tight md:text-5xl">
            Study on the bus. Study at the dhaba. Study anywhere.
          </h2>
          <p className="mt-5 max-w-[48ch] text-pretty text-lg text-white/60">
            Every lesson, drill, and quiz runs right on your device. The internet is only needed to
            sync your XP — perfect for spotty WiFi and metro commutes.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6">
            <Metric label="Offline lessons" value="3,200+" />
            <Metric label="Sync latency" value="< 200ms" />
            <Metric label="Offline drills" value="12,400+" />
            <Metric label="Free storage tier" value="2 GB" />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-5 text-sm font-medium text-ink hover:bg-zinc-100"
            >
              <Download className="size-4" /> Get the app
            </Link>
            <Link
              to="/about"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-transparent px-5 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/5"
            >
              How offline works
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 ring-1 ring-white/10">
            <div className="absolute -right-10 -top-10 size-48 rounded-full bg-brand/30 blur-3xl" />
            <div className="relative space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-brand/15">
                    <Cpu className="size-4 text-brand" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Your phone</div>
                    <div className="text-[11px] text-white/50">redmi-note · 2.4 GB synced</div>
                  </div>
                </div>
                <span className="rounded-full bg-brand/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand">
                  Online
                </span>
              </div>

              <div className="relative ml-10 h-12 w-px bg-gradient-to-b from-brand/60 to-white/10">
                <div className="absolute -left-1.5 top-1/2 size-3 -translate-y-1/2 animate-pulse-soft rounded-full bg-brand" />
              </div>

              <div className="flex items-center justify-between rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-white/10">
                    <Cloud className="size-4 text-white/70" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Lumio cloud</div>
                    <div className="text-[11px] text-white/50">42 ops queued · auto-merge</div>
                  </div>
                </div>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/60">
                  Standby
                </span>
              </div>

              <div className="rounded-xl bg-black/60 p-4 font-mono text-[11px] leading-relaxed text-white/70 ring-1 ring-white/10">
                <div>
                  <span className="text-brand">$</span> lumio sync --offline
                </div>
                <div className="text-white/40">→ scheduling 18 reviews</div>
                <div className="text-white/40">→ caching science.class-10.m4</div>
                <div>
                  <span className="text-brand">✓</span> 2.4 GB ready · airplane mode safe
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
        {label}
      </div>
      <div className="font-display mt-1 text-2xl font-medium">{value}</div>
    </div>
  );
}

/* ------------------------------- Leaderboard ------------------------------ */

function LeaderboardPreview() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              <span className="block h-px w-6 bg-zinc-300" />
              The Vanguard League
            </div>
            <h2 className="font-display text-balance text-4xl font-semibold leading-tight md:text-5xl">
              Climb the ranks. Earn the badges.
            </h2>
            <p className="mt-4 max-w-[48ch] text-pretty text-zinc-500">
              Compete with students from your class, your school, and the entire country. Top 1%
              unlocks exclusive olympiad practice and beta features.
            </p>
          </div>
          <Link
            to="/leaderboard"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-zinc-100 px-4 text-sm font-medium ring-1 ring-black/[0.06] hover:bg-zinc-200/60"
          >
            View full leaderboard <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-3 ring-1 ring-black/[0.05]">
            {LEADERBOARD.slice(0, 7).map((r) => (
              <div
                key={r.n}
                className={`flex items-center gap-4 rounded-xl p-3 transition-colors ${
                  r.you ? "bg-brand-muted/60 ring-1 ring-brand/15" : "hover:bg-zinc-50"
                }`}
              >
                <span
                  className={`w-5 text-center font-mono text-[11px] ${
                    r.you ? "text-brand" : "text-zinc-400"
                  }`}
                >
                  {r.n}
                </span>
                <div
                  className="size-9 shrink-0 rounded-full ring-1 ring-black/5"
                  style={{
                    background: `linear-gradient(135deg, hsl(${r.name.length * 24} 60% 70%), hsl(${
                      r.name.length * 24 + 60
                    } 50% 50%))`,
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="truncate text-[11px] text-zinc-400">
                    Class {r.grade} · {r.spec}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-sm font-semibold">
                    {r.xp.toLocaleString()} XP
                  </div>
                  <div
                    className={`text-[10px] font-bold uppercase ${
                      r.you ? "text-brand" : "text-zinc-400"
                    }`}
                  >
                    +{r.today} today
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-ink p-8 text-white">
            <div className="absolute -bottom-20 -right-20 size-64 rounded-full bg-brand/20 blur-[100px]" />
            <div className="relative flex h-full flex-col">
              <div>
                <span className="inline-block rounded bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                  Locked badge
                </span>
                <h3 className="font-display mt-5 text-3xl font-medium">Board Topper Seal</h3>
                <p className="mt-3 max-w-[38ch] text-sm text-white/60">
                  Score 95% or higher on 5 consecutive board mock tests to unlock this rare seal —
                  awarded to the top 0.4% of class 10 and 12 students.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-4 gap-3">
                {[
                  { icon: Award, on: true },
                  { icon: Sparkles, on: false },
                  { icon: Trophy, on: false },
                  { icon: Lock, on: false },
                ].map((b, i) => (
                  <div
                    key={i}
                    className={`grid aspect-square place-items-center rounded-xl border ${
                      b.on
                        ? "border-brand/40 bg-brand/10"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <b.icon className={`size-5 ${b.on ? "text-brand" : "text-white/30"}`} />
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <div className="mb-2 flex items-center justify-between text-[11px]">
                  <span className="text-white/50">Your progress</span>
                  <span className="font-display font-semibold text-brand">2 / 5 mocks</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="shimmer-overlay h-full w-[40%] rounded-full bg-brand" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Testimonials ------------------------------ */

function Testimonials() {
  const items = [
    {
      q: "I went from 64% to 91% in Maths in a single term. The adaptive drills are the secret.",
      name: "Aanya, Class 10",
      city: "Pune",
    },
    {
      q: "My son actually opens the app on his own now. He used to fight us about homework.",
      name: "Mrs. Reddy, parent",
      city: "Bengaluru",
    },
    {
      q: "Cracked NEET prep alongside my class 12 boards. Lumio's chemistry track was a lifesaver.",
      name: "Vihaan, Class 12",
      city: "Delhi",
    },
    {
      q: "Offline mode is unreal — I study during my school bus rides without burning data.",
      name: "Saanvi, Class 9",
      city: "Jaipur",
    },
  ];
  return (
    <section className="bg-zinc-100/70 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Loved by students"
          title="Real students. Real scores."
          sub="Lumio is used by over 1.2 lakh students across India — from class 6 fundamentals to class 12 board crunch."
        />
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-6 ring-1 ring-black/[0.05]"
            >
              <Sparkles className="mb-4 size-4 text-brand" />
              <p className="font-display text-pretty text-lg leading-snug">
                "{t.q}"
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-black/[0.05] pt-4">
                <div
                  className="size-8 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, hsl(${i * 80} 60% 70%), hsl(${
                      i * 80 + 60
                    } 50% 50%))`,
                  }}
                />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-[11px] text-zinc-400">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Section header ----------------------------- */

function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
        <span className="block h-px w-6 bg-zinc-300" />
        {eyebrow}
        <span className="block h-px w-6 bg-zinc-300" />
      </div>
      <h2 className="font-display text-balance text-4xl font-semibold leading-tight md:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-pretty text-base text-zinc-500 md:text-lg">{sub}</p>}
    </div>
  );
}

/* --------------------------------- CTA ------------------------------------ */

function FinalCTA() {
  return (
    <section className="px-6 py-32">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-ink p-12 text-center text-white md:p-20">
        <div className="absolute -left-20 -top-20 size-80 rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 size-80 rounded-full bg-azure/20 blur-[120px]" />
        <div className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
            <Users className="size-3.5 text-brand" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70">
              1.2 lakh+ students learning today
            </span>
          </div>
          <h2 className="font-display text-balance text-4xl font-semibold leading-tight md:text-6xl">
            Your best class is one
            <br />
            study session away.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/signup"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-brand px-6 text-sm font-medium text-white ring-1 ring-brand hover:bg-brand/90"
            >
              Start learning free <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/courses"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-white/5 px-6 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/10"
            >
              Browse the syllabus
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Keep imports referenced
void Atom;
