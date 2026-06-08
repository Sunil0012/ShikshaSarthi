import { createFileRoute } from "@tanstack/react-router";
import { Crown, Flame, Trophy, TrendingUp } from "lucide-react";
import { LEADERBOARD } from "@/lib/lms-data";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Shiksha Saarthi" },
      { name: "description", content: "See the top learners this week. Earn XP through lessons, drills, and games to climb the Vanguard League." },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const top3 = LEADERBOARD.slice(0, 3);
  const rest = LEADERBOARD.slice(3);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-brand">
        <Trophy className="size-3.5" /> This week · Vanguard League
      </div>
      <h1 className="font-display mt-3 text-5xl font-semibold tracking-tight">Top learners</h1>
      <p className="mt-3 text-zinc-500">Earn XP from courses, drills, and games. Resets every Sunday.</p>

      <div className="mt-10 grid grid-cols-3 gap-4">
        {[top3[1], top3[0], top3[2]].map((p, i) => {
          const rank = [2, 1, 3][i];
          const heights = ["h-28", "h-40", "h-24"][i];
          return (
            <div key={p.name} className="flex flex-col items-center">
              <div className={`grid size-16 place-items-center rounded-full bg-gradient-to-br ${rank === 1 ? "from-amber-300 to-amber-500" : rank === 2 ? "from-zinc-300 to-zinc-400" : "from-orange-200 to-orange-400"} text-white font-display text-2xl shadow-lg`}>
                {p.name[0]}
              </div>
              <div className="mt-3 text-center">
                <div className="font-semibold">{p.name}</div>
                <div className="text-[11px] text-zinc-500">{p.spec}</div>
              </div>
              <div className={`mt-3 ${heights} w-full rounded-t-2xl bg-gradient-to-t ${rank === 1 ? "from-brand to-brand/60" : "from-zinc-200 to-zinc-100"} grid place-items-center p-4 ring-1 ring-black/[0.04]`}>
                {rank === 1 && <Crown className="absolute -mt-32 size-6 text-amber-500" />}
                <div className={rank === 1 ? "text-white" : "text-ink"}>
                  <div className="font-display text-2xl font-semibold">#{rank}</div>
                  <div className="text-xs">{p.xp.toLocaleString()} XP</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
        <div className="grid grid-cols-[40px_1fr_140px_100px_80px] gap-3 border-b border-black/[0.04] bg-zinc-50/50 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          <div>#</div><div>Student</div><div>Track</div><div className="text-right">XP</div><div className="text-right">Today</div>
        </div>
        {rest.map((p) => (
          <div key={p.name} className={`grid grid-cols-[40px_1fr_140px_100px_80px] items-center gap-3 px-5 py-3 text-sm ${p.you ? "bg-brand-muted/60" : ""}`}>
            <div className="font-display font-semibold text-zinc-400">{p.n}</div>
            <div className="flex items-center gap-3">
              <div className="grid size-8 place-items-center rounded-full bg-zinc-100 text-xs font-semibold">{p.name[0]}</div>
              <div>
                <div className="font-medium">{p.name} {p.you && <span className="ml-1 rounded-full bg-brand px-2 py-0.5 text-[10px] text-white">YOU</span>}</div>
                <div className="text-[11px] text-zinc-500">Class {p.grade}</div>
              </div>
            </div>
            <div className="truncate text-xs text-zinc-500">{p.spec}</div>
            <div className="text-right font-semibold">{p.xp.toLocaleString()}</div>
            <div className="flex items-center justify-end gap-1 text-right text-xs text-emerald-600">
              <TrendingUp className="size-3" /> {p.today}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          ["Daily streak", "127 days", <Flame className="size-5 text-orange-500" key="f" />],
          ["Total XP this season", "16,240", <Trophy className="size-5 text-amber-500" key="t" />],
          ["League rank", "#3 of 1,248", <Crown className="size-5 text-amber-500" key="c" />],
        ].map(([t, v, ic]) => (
          <div key={t as string} className="flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-5">
            {ic}
            <div>
              <div className="text-xs text-zinc-500">{t}</div>
              <div className="font-display text-2xl font-semibold">{v}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
