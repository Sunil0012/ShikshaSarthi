import { createFileRoute, Link } from "@tanstack/react-router";
import { Atom, Brain, Code2, Compass, Gamepad2, Leaf, Magnet, PieChart, Rocket, Sword, Swords, Trophy, Users } from "lucide-react";
import { GAMES } from "@/lib/lms-data";

const ICONS: Record<string, any> = { Sword, Swords, Brain, Atom, Rocket, Magnet, Compass, Code2, Leaf, PieChart };

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Educational Games — Shiksha Saarthi" },
      { name: "description", content: "Learn through play. Mini-games for math, science, English, coding, and more — designed by teachers, loved by students." },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand">
            <Gamepad2 className="size-3" /> Learn by playing
          </div>
          <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight">Educational games</h1>
          <p className="mt-3 max-w-2xl text-zinc-500">
            Curiosity-driven mini-games that reinforce concepts. Earn XP, unlock badges, and challenge friends.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 ring-1 ring-black/[0.06]">
          <Trophy className="size-4 text-amber-500" />
          <div className="text-xs">
            <div className="font-semibold">Weekly tournament</div>
            <div className="text-zinc-500">Prizes worth ₹10,000 every Sunday</div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((g) => {
          const Icon = ICONS[g.icon] ?? Gamepad2;
          const playable = (g as any).playable;
          const to = playable ? `/games/${g.slug}` : "/auth";
          return (
            <div key={g.slug} className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-brand/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-xl bg-ink text-white"><Icon className="size-5" /></div>
                  {playable && <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Playable now</span>}
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold">{g.title}</h3>
                <p className="mt-1 text-xs text-brand font-medium uppercase tracking-wider">{g.subject}</p>
                <p className="mt-3 text-sm text-zinc-500">{g.desc}</p>
                <div className="mt-5 flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="inline-flex items-center gap-1"><Users className="size-3" /> {g.players} playing</span>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium">Class {g.grade}</span>
                </div>
                {playable ? (
                  <Link to={to as any} className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-white opacity-90 transition group-hover:opacity-100">Play now</Link>
                ) : (
                  <Link to="/auth" search={{ mode: "signup" }} className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-white opacity-90 transition group-hover:opacity-100">Sign in to play</Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 rounded-3xl border border-black/[0.06] bg-gradient-to-br from-brand-muted via-white to-white p-10">
        <h2 className="font-display text-3xl font-semibold tracking-tight">Why learning through games works</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            ["3.4×", "faster concept retention vs passive video"],
            ["87%", "of students return next day after playing"],
            ["+22%", "average improvement on chapter tests"],
          ].map(([n, t]) => (
            <div key={n}>
              <div className="font-display text-5xl font-semibold text-brand">{n}</div>
              <p className="mt-1 text-sm text-zinc-600">{t}</p>
            </div>
          ))}
        </div>
        <Link to="/courses" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white">
          Explore courses
        </Link>
      </div>
    </div>
  );
}
