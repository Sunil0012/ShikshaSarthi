import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
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
  Github,
  Layers,
  LineChart,
  Lock,
  Play,
  Radio,
  Sparkles,
  Target,
  Trophy,
  Twitter,
  Users,
  Wifi,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vantage — The offline-first learning system for deep work" },
      {
        name: "description",
        content:
          "An advanced gamified LMS engineered for serious learners. Adaptive drills, XP, streaks, leaderboards, and a full curriculum that works offline.",
      },
      { property: "og:title", content: "Vantage — Offline-first learning OS" },
      {
        property: "og:description",
        content:
          "Master complex skills through surgical repetition. Works fully offline.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />
      <Hero />
      <Logos />
      <Bento />
      <Curriculum />
      <OfflineSection />
      <Leaderboard />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ------------------------------- Navigation ------------------------------- */

function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] bg-canvas/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2">
            <Logo />
            <span className="font-display text-xl font-semibold">Vantage</span>
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {["Curriculum", "Platform", "Enterprise", "Pricing", "Changelog"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-ink"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden h-8 px-3 text-sm font-medium text-zinc-600 transition-colors hover:text-ink md:inline-flex md:items-center">
            Log in
          </button>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-white ring-1 ring-ink transition-transform hover:scale-[1.02]">
            Start learning
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div className="grid size-7 place-items-center rounded-md bg-ink">
      <div className="size-2.5 rounded-[2px] bg-brand" />
    </div>
  );
}

/* ----------------------------------- Hero --------------------------------- */

function Hero() {
  return (
    <section className="px-6 pt-32 pb-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <div className="animate-reveal mb-8 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-muted px-3 py-1">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand">
            Offline Sync · v4.2 Live
          </span>
        </div>

        <h1 className="animate-reveal font-display max-w-[20ch] text-balance text-5xl font-semibold leading-[0.95] md:text-7xl lg:text-[88px] [animation-delay:80ms]">
          Master complex skills through surgical repetition.
        </h1>

        <p className="animate-reveal mt-8 max-w-[52ch] text-pretty text-lg text-zinc-500 [animation-delay:160ms]">
          The high-performance learning system designed for deep work. Build neural pathways with
          adaptive drills, gamified progression, and a full curriculum — even when you're
          disconnected from the grid.
        </p>

        <div className="animate-reveal mt-10 flex flex-wrap items-center justify-center gap-3 [animation-delay:220ms]">
          <button className="inline-flex h-11 items-center gap-2 rounded-md bg-ink px-6 text-sm font-medium text-white ring-1 ring-ink transition-transform hover:scale-[1.02]">
            Create your roadmap
            <ArrowRight className="size-4" />
          </button>
          <button className="inline-flex h-11 items-center gap-2 rounded-md bg-white px-6 text-sm font-medium text-ink ring-1 ring-black/[0.08] transition-colors hover:bg-zinc-50">
            <Play className="size-3.5" />
            Watch 90s demo
          </button>
        </div>

        <div className="animate-reveal mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400 [animation-delay:280ms]">
          <span className="inline-flex items-center gap-1.5">
            <Check className="size-3.5 text-brand" /> Free for individuals
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="size-3.5 text-brand" /> No credit card
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
      {/* Floating widgets */}
      <FloatingBadge />
      <FloatingStreak />

      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.06]">
        {/* Window chrome */}
        <div className="flex h-10 items-center justify-between border-b border-black/[0.05] px-4">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-zinc-200" />
            <div className="size-2.5 rounded-full bg-zinc-200" />
            <div className="size-2.5 rounded-full bg-zinc-200" />
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-zinc-50 px-3 py-1 text-[11px] font-medium text-zinc-400 ring-1 ring-black/[0.04]">
            <Lock className="size-3" />
            app.vantage.io / quantum-101 / m4
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-brand">
            <CloudOff className="size-3.5" />
            Offline
          </div>
        </div>

        <div className="flex h-[540px]">
          {/* Sidebar */}
          <aside className="w-60 shrink-0 border-r border-black/[0.05] bg-zinc-50/60 p-4">
            <div className="mb-4 flex items-center gap-2 rounded-md bg-white p-2 ring-1 ring-black/[0.04]">
              <div className="size-6 rounded-full bg-gradient-to-br from-brand to-azure" />
              <div className="flex-1">
                <div className="text-[11px] font-semibold leading-tight">Alex Rivera</div>
                <div className="text-[10px] text-zinc-400">Lvl 24 · Engineer</div>
              </div>
            </div>
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
              Roadmap
            </div>
            <ul className="space-y-0.5">
              {[
                { label: "Linear Algebra", done: true },
                { label: "Probability", done: true },
                { label: "Quantum Computing", active: true },
                { label: "Cryptography", done: false },
                { label: "Compiler Design", done: false },
                { label: "Distributed Systems", done: false },
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
              <div className="mt-2 text-[10px] text-zinc-400">12.4 GB · ready offline</div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 overflow-hidden p-8 text-left">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-widest text-zinc-400">
                  Module 4 · Superposition
                </div>
                <h3 className="font-display text-2xl font-semibold">Quantum Computing 101</h3>
              </div>
              <div className="flex items-center gap-3">
                <Stat label="Streak" value="24d" tone="ember" icon={Flame} />
                <Stat label="XP today" value="+420" tone="brand" icon={Zap} />
                <Stat label="Focus" value="97%" tone="azure" icon={Target} />
              </div>
            </div>

            {/* Mock lesson content */}
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3 rounded-xl bg-gradient-to-br from-zinc-50 to-white p-5 ring-1 ring-black/[0.05]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    Live drill · Qubit gates
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
                  <code className="font-mono text-zinc-500">|ψ⟩ = α|0⟩ + β|1⟩</code>
                  <div className="flex gap-1.5">
                    <Pill>H</Pill>
                    <Pill>X</Pill>
                    <Pill active>CNOT</Pill>
                    <Pill>Z</Pill>
                  </div>
                </div>
              </div>

              <div className="col-span-2 space-y-4">
                <div className="rounded-xl bg-ink p-5 text-white">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                    Next review
                  </div>
                  <div className="font-display text-2xl font-medium">in 4h 22m</div>
                  <div className="mt-1 text-[11px] text-white/50">
                    Spaced for 92% retention
                  </div>
                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="shimmer-overlay h-full w-2/3 rounded-full bg-brand" />
                  </div>
                </div>
                <div className="rounded-xl bg-white p-4 ring-1 ring-black/[0.05]">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    Lesson 4.3 · Entanglement
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
      className={`grid h-6 w-7 place-items-center rounded font-mono text-[10px] ring-1 ${
        active ? "bg-ink text-white ring-ink" : "bg-white text-zinc-600 ring-black/10"
      }`}
    >
      {children}
    </span>
  );
}

function FloatingStreak() {
  return (
    <div className="absolute -left-4 top-24 z-10 hidden w-56 rotate-[-3deg] rounded-xl bg-white p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.06] md:block">
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
    <div className="absolute -right-2 top-40 z-10 hidden w-52 rotate-[3deg] rounded-xl bg-ink p-4 text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] md:block">
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
        <div className="font-display text-sm font-semibold">Deep Work Initiate</div>
        <div className="mt-0.5 text-[10px] text-white/50">Top 4% globally</div>
      </div>
    </div>
  );
}

/* --------------------------------- Logos ---------------------------------- */

function Logos() {
  const items = [
    "MERIDIAN",
    "Helix Labs",
    "QUANTA",
    "Orbital",
    "Northstar",
    "Aperture",
    "Voltage",
    "Kestrel",
  ];
  return (
    <section className="border-y border-black/[0.05] bg-white py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
          Trusted by engineering teams at
        </p>
        <div className="relative overflow-hidden">
          <div className="flex gap-16 [animation:ticker_40s_linear_infinite]">
            {[...items, ...items].map((l, i) => (
              <span
                key={i}
                className="font-display shrink-0 text-2xl font-semibold tracking-tight text-zinc-300"
              >
                {l}
              </span>
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
          title="Engineered for compounding skill."
          sub="Six interlocking systems that turn time spent learning into measurable, retained ability."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6">
          {/* Adaptive AI - wide */}
          <Card className="md:col-span-4">
            <CardHeader
              tone="brand"
              icon={BrainCircuit}
              title="Adaptive engine"
              desc="A reinforcement loop that profiles your weak spots after every drill and rebuilds tomorrow's plan around them."
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
              <span className="font-display font-semibold text-brand">+34% vs baseline</span>
            </div>
          </Card>

          {/* Streaks */}
          <Card className="md:col-span-2">
            <CardHeader
              tone="ember"
              icon={Flame}
              title="Momentum engine"
              desc="Spaced repetition timed to keep streaks alive without burnout."
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
              <span className="font-display font-semibold text-ember">24-day streak</span> ·
              optimal review in 4h
            </div>
          </Card>

          {/* Offline */}
          <Card className="md:col-span-2">
            <CardHeader
              tone="azure"
              icon={CloudOff}
              title="Offline native"
              desc="Full lessons, drills, and labs run on-device. Sync on reconnect."
            />
            <div className="mt-6 rounded-lg bg-ink p-4 text-white">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                Local node
              </div>
              <div className="font-display text-xl font-medium">12.4 GB cached</div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[78%] rounded-full bg-azure" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-white/50">
                <span>78% of roadmap</span>
                <span className="inline-flex items-center gap-1">
                  <Wifi className="size-3" /> standby
                </span>
              </div>
            </div>
          </Card>

          {/* Games */}
          <Card className="md:col-span-2">
            <CardHeader
              tone="brand"
              icon={Gamepad2}
              title="Educational games"
              desc="Concept-native mini-games that teach by play, not by quiz fatigue."
            />
            <div className="mt-6 grid grid-cols-3 gap-2">
              {["Logic Grid", "Sort Race", "Bit Maze"].map((g, i) => (
                <div
                  key={g}
                  className="aspect-square rounded-lg bg-gradient-to-br from-zinc-50 to-white p-2 text-center ring-1 ring-black/[0.05]"
                >
                  <div
                    className={`mx-auto mb-2 mt-2 size-6 rounded ${
                      ["bg-brand", "bg-ember", "bg-azure"][i]
                    }`}
                  />
                  <div className="text-[10px] font-semibold">{g}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Leaderboard preview */}
          <Card className="md:col-span-2">
            <CardHeader
              tone="ember"
              icon={Trophy}
              title="Vanguard league"
              desc="Climb global ranks weekly. Top 1% unlocks beta curricula."
            />
            <div className="mt-6 space-y-2">
              {[
                { n: "01", name: "M. Aurelius", xp: "12.4k", you: false },
                { n: "02", name: "You", xp: "11.2k", you: true },
                { n: "03", name: "A. Lovelace", xp: "9.8k", you: false },
              ].map((r) => (
                <div
                  key={r.n}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[11px] ${
                    r.you ? "bg-brand-muted ring-1 ring-brand/15" : "bg-zinc-50"
                  }`}
                >
                  <span className="font-mono text-zinc-400">{r.n}</span>
                  <div className="size-5 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500" />
                  <span className="flex-1 font-medium">{r.name}</span>
                  <span className="font-display font-semibold">{r.xp}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Analytics */}
          <Card className="md:col-span-6">
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
              <div className="flex-1">
                <CardHeader
                  tone="brand"
                  icon={LineChart}
                  title="Telemetry, not vanity metrics"
                  desc="See the actual decay curves of every concept you've learned. Decide what to revisit, not what to memorize."
                />
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Per-concept retention curves with confidence intervals",
                    "Cognitive load heatmaps for each session",
                    "Exportable proofs of mastery (verifiable, signed)",
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
                    Retention · last 30 days
                  </span>
                  <span className="font-display text-sm font-semibold text-brand">92%</span>
                </div>
                <RetentionChart />
                <div className="mt-4 flex items-center gap-4 text-[10px] text-zinc-400">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="block size-2 rounded-full bg-brand" /> Vantage
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="block size-2 rounded-full bg-zinc-300" /> Industry avg
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

/* ------------------------------ Section header ---------------------------- */

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
      {sub && (
        <p className="mt-4 text-pretty text-base text-zinc-500 md:text-lg">{sub}</p>
      )}
    </div>
  );
}

/* -------------------------------- Curriculum ------------------------------ */

function Curriculum() {
  const tracks = [
    {
      title: "Distributed Systems",
      cat: "Engineering",
      modules: 28,
      hours: 64,
      level: "Advanced",
      tone: "from-emerald-50 to-white",
    },
    {
      title: "Cryptography & Zero-Knowledge",
      cat: "Theory",
      modules: 22,
      hours: 48,
      level: "Advanced",
      tone: "from-blue-50 to-white",
    },
    {
      title: "Compiler Construction",
      cat: "Engineering",
      modules: 34,
      hours: 80,
      level: "Expert",
      tone: "from-orange-50 to-white",
    },
    {
      title: "Probabilistic Reasoning",
      cat: "Mathematics",
      modules: 18,
      hours: 36,
      level: "Intermediate",
      tone: "from-violet-50 to-white",
    },
    {
      title: "Modern Operating Systems",
      cat: "Engineering",
      modules: 26,
      hours: 58,
      level: "Advanced",
      tone: "from-rose-50 to-white",
    },
    {
      title: "Information Theory",
      cat: "Theory",
      modules: 16,
      hours: 32,
      level: "Intermediate",
      tone: "from-amber-50 to-white",
    },
  ];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              <span className="block h-px w-6 bg-zinc-300" />
              Curriculum
            </div>
            <h2 className="font-display text-balance text-4xl font-semibold leading-tight md:text-5xl">
              Tracks built by working engineers, not committees.
            </h2>
          </div>
          <button className="inline-flex h-9 items-center gap-2 rounded-md bg-white px-4 text-sm font-medium ring-1 ring-black/[0.08] hover:bg-zinc-50">
            Browse 142 tracks
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t) => (
            <a
              key={t.title}
              href="#"
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-black/[0.05] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)]"
            >
              <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${t.tone}`} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                    {t.cat}
                  </span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-zinc-500 ring-1 ring-black/[0.06]">
                    {t.level}
                  </span>
                </div>
                <h3 className="font-display mt-12 text-xl font-medium">{t.title}</h3>
                <div className="mt-6 flex items-center justify-between border-t border-black/[0.05] pt-4 text-[11px] text-zinc-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Layers className="size-3.5" /> {t.modules} modules
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen className="size-3.5" /> {t.hours} hrs
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-ink opacity-0 transition-opacity group-hover:opacity-100">
                    Enter <ChevronRight className="size-3" />
                  </span>
                </div>
              </div>
            </a>
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
              Offline architecture
            </span>
          </div>
          <h2 className="font-display text-balance text-4xl font-semibold leading-tight md:text-5xl">
            Learn at 40,000 feet. Sync at the gate.
          </h2>
          <p className="mt-5 max-w-[48ch] text-pretty text-lg text-white/60">
            Every lesson, drill, lab, and quiz runs on a local node powered by an embedded
            spaced-repetition scheduler. The network is an enhancement, not a requirement.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6">
            <Metric label="Local cache" value="12.4 GB" />
            <Metric label="Sync latency" value="< 200ms" />
            <Metric label="Offline drills" value="2,400+" />
            <Metric label="Conflict resolution" value="CRDT" />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-5 text-sm font-medium text-ink hover:bg-zinc-100">
              <Download className="size-4" /> Download desktop app
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-md bg-transparent px-5 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/5">
              Read the architecture
              <ArrowUpRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Visual: sync diagram */}
        <div className="relative">
          <div className="relative rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 ring-1 ring-white/10">
            <div className="absolute -right-10 -top-10 size-48 rounded-full bg-brand/30 blur-3xl" />
            <div className="relative space-y-4">
              {/* device row */}
              <div className="flex items-center justify-between rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-brand/15">
                    <Cpu className="size-4 text-brand" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Local node</div>
                    <div className="text-[11px] text-white/50">macbook-air · 12.4 GB synced</div>
                  </div>
                </div>
                <span className="rounded-full bg-brand/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand">
                  Online
                </span>
              </div>

              {/* sync line */}
              <div className="relative ml-10 h-12 w-px bg-gradient-to-b from-brand/60 to-white/10">
                <div className="absolute -left-1.5 top-1/2 size-3 -translate-y-1/2 animate-pulse-soft rounded-full bg-brand" />
              </div>

              <div className="flex items-center justify-between rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-white/10">
                    <Cloud className="size-4 text-white/70" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Vantage cloud</div>
                    <div className="text-[11px] text-white/50">42 ops queued · CRDT merge</div>
                  </div>
                </div>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/60">
                  Standby
                </span>
              </div>

              {/* terminal */}
              <div className="rounded-xl bg-black/60 p-4 font-mono text-[11px] leading-relaxed text-white/70 ring-1 ring-white/10">
                <div>
                  <span className="text-brand">$</span> vantage sync --offline
                </div>
                <div className="text-white/40">→ scheduling 18 reviews</div>
                <div className="text-white/40">→ caching drills.quantum.m4</div>
                <div>
                  <span className="text-brand">✓</span> 12.4 GB ready · airplane mode safe
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

function Leaderboard() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              <span className="block h-px w-6 bg-zinc-300" />
              Social
            </div>
            <h2 className="font-display text-balance text-4xl font-semibold leading-tight md:text-5xl">
              The Vanguard League.
            </h2>
            <p className="mt-4 max-w-[48ch] text-pretty text-zinc-500">
              Compete with the top 1% of learners globally. Win exclusive badges and early access
              to beta curricula.
            </p>
          </div>
          <button className="inline-flex h-9 items-center gap-2 rounded-md bg-zinc-100 px-4 text-sm font-medium ring-1 ring-black/[0.06] hover:bg-zinc-200/60">
            View all ranks <ArrowRight className="size-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-3 ring-1 ring-black/[0.05]">
            {[
              { n: "01", name: "Marcus Aurelius", spec: "Philosophy Specialization", xp: "12,450", you: false, today: "+450" },
              { n: "02", name: "You", spec: "Full-Stack Engineering", xp: "11,200", you: true, today: "STREAK ACTIVE" },
              { n: "03", name: "Ada Lovelace", spec: "Algorithm Design", xp: "9,800", you: false, today: "+220" },
              { n: "04", name: "Linus Torvalds", spec: "Operating Systems", xp: "9,540", you: false, today: "+180" },
              { n: "05", name: "Grace Hopper", spec: "Compiler Theory", xp: "9,210", you: false, today: "+95" },
              { n: "06", name: "Donald Knuth", spec: "Algorithm Analysis", xp: "8,920", you: false, today: "+340" },
              { n: "07", name: "Margaret Hamilton", spec: "Spacecraft Systems", xp: "8,610", you: false, today: "—" },
            ].map((r) => (
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
                  className="size-9 shrink-0 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 ring-1 ring-black/5"
                  style={{
                    background: `linear-gradient(135deg, hsl(${r.name.length * 24} 60% 70%), hsl(${
                      r.name.length * 24 + 60
                    } 50% 50%))`,
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="truncate text-[11px] text-zinc-400">{r.spec}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-sm font-semibold">{r.xp} XP</div>
                  <div
                    className={`text-[10px] font-bold uppercase ${
                      r.you ? "text-brand" : "text-zinc-400"
                    }`}
                  >
                    {r.today}
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
                  Locked achievement
                </span>
                <h3 className="font-display mt-5 text-3xl font-medium">The Deep Work Seal</h3>
                <p className="mt-3 max-w-[38ch] text-sm text-white/60">
                  Maintain a focus score of 95% or higher for 10 consecutive offline sessions to
                  unlock this rare seal.
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
                  <span className="text-white/50">Progress</span>
                  <span className="font-display font-semibold text-brand">6 / 10 sessions</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="shimmer-overlay h-full w-[60%] rounded-full bg-brand" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Pricing -------------------------------- */

function Pricing() {
  const tiers = [
    {
      name: "Solo",
      price: "Free",
      sub: "Forever",
      desc: "Everything you need to build a serious daily practice.",
      features: ["3 active tracks", "Offline drills", "Global leaderboard", "Community"],
      cta: "Start free",
      featured: false,
    },
    {
      name: "Vanguard",
      price: "$18",
      sub: "/ month",
      desc: "Unlimited curriculum, adaptive engine, and verified mastery proofs.",
      features: [
        "Unlimited tracks",
        "Adaptive AI engine",
        "Offline cache (50 GB)",
        "Mastery certificates",
        "Priority support",
      ],
      cta: "Start 14-day trial",
      featured: true,
    },
    {
      name: "Teams",
      price: "$42",
      sub: "/ seat / mo",
      desc: "Cohorts, dashboards, and SSO for learning organizations.",
      features: ["Cohort dashboards", "SSO + SCIM", "Private tracks", "Org analytics"],
      cta: "Talk to sales",
      featured: false,
    },
  ];

  return (
    <section className="bg-zinc-100/70 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Pricing"
          title="Pay for the system. The skill is yours."
          sub="No hidden module fees. No certificate paywalls. Cancel any time."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl p-7 ring-1 ${
                t.featured
                  ? "bg-ink text-white ring-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)]"
                  : "bg-white ring-black/[0.06]"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-2.5 left-7 rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                  Most chosen
                </span>
              )}
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-medium">{t.name}</span>
                {t.featured && <Sparkles className="size-4 text-brand" />}
              </div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold">{t.price}</span>
                <span className={`text-sm ${t.featured ? "text-white/50" : "text-zinc-400"}`}>
                  {t.sub}
                </span>
              </div>
              <p
                className={`mt-3 max-w-[34ch] text-sm ${
                  t.featured ? "text-white/60" : "text-zinc-500"
                }`}
              >
                {t.desc}
              </p>
              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={`mt-0.5 size-4 shrink-0 ${t.featured ? "text-brand" : "text-brand"}`}
                    />
                    <span className={t.featured ? "text-white/80" : "text-zinc-700"}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 inline-flex h-10 items-center justify-center rounded-md text-sm font-medium ring-1 transition-transform hover:scale-[1.02] ${
                  t.featured
                    ? "bg-brand text-white ring-brand"
                    : "bg-white text-ink ring-black/[0.08] hover:bg-zinc-50"
                }`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
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
              12,402 learners building today
            </span>
          </div>
          <h2 className="font-display text-balance text-4xl font-semibold leading-tight md:text-6xl">
            Stop consuming content.
            <br />
            Start compounding ability.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button className="inline-flex h-11 items-center gap-2 rounded-md bg-brand px-6 text-sm font-medium text-white ring-1 ring-brand hover:bg-brand/90">
              Create your roadmap <ArrowRight className="size-4" />
            </button>
            <button className="inline-flex h-11 items-center gap-2 rounded-md bg-white/5 px-6 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/10">
              Book a walkthrough
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer ---------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-black/[0.06] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-xs space-y-5">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-display text-xl font-semibold">Vantage</span>
            </div>
            <p className="text-sm text-zinc-500">
              Architecting the future of technical education through rigorous design and
              engineering.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                className="grid size-8 place-items-center rounded-md ring-1 ring-black/[0.08] hover:bg-zinc-50"
              >
                <Twitter className="size-3.5 text-zinc-500" />
              </a>
              <a
                href="#"
                className="grid size-8 place-items-center rounded-md ring-1 ring-black/[0.08] hover:bg-zinc-50"
              >
                <Github className="size-3.5 text-zinc-500" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
            {[
              {
                h: "Curriculum",
                l: ["Engineering", "Theory", "Mathematics", "Design"],
              },
              {
                h: "Platform",
                l: ["Offline Sync", "Adaptive Engine", "Analytics", "API"],
              },
              { h: "Company", l: ["About", "Careers", "Press", "Contact"] },
              { h: "Legal", l: ["Privacy", "Terms", "Security", "DPA"] },
            ].map((c) => (
              <div key={c.h} className="space-y-3">
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {c.h}
                </h5>
                <ul className="space-y-2">
                  {c.l.map((i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-sm text-zinc-600 transition-colors hover:text-ink"
                      >
                        {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-black/[0.06] pt-8 md:flex-row">
          <span className="text-[11px] text-zinc-400">
            © 2026 Vantage Learning Systems. All rights reserved.
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400">
            <span className="size-1.5 rounded-full bg-brand" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
