import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Crown, Loader2, ShieldCheck, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/leaderboard")({
  ssr: false,
  head: () => ({ meta: [{ title: "Leaderboard — Teacher view" }] }),
  component: Page,
});

function Page() {
  const { role, loading: authLoading } = useAuth();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "teacher" && role !== "admin") return;
    (async () => {
      // Aggregate XP from profiles + game_scores
      const [pr, gs] = await Promise.all([
        supabase.from("profiles").select("id, full_name, grade, xp, streak"),
        supabase.from("game_scores").select("user_id, score"),
      ]);
      const gameTotals: Record<string, number> = {};
      (gs.data ?? []).forEach((g: any) => { gameTotals[g.user_id] = (gameTotals[g.user_id] ?? 0) + g.score; });
      const merged = (pr.data ?? []).map((p: any) => ({ ...p, totalXp: (p.xp ?? 0) + (gameTotals[p.id] ?? 0) }))
        .sort((a, b) => b.totalXp - a.totalXp).slice(0, 50);
      setRows(merged);
      setLoading(false);
    })();
  }, [role]);

  if (authLoading) return null;
  if (role !== "teacher" && role !== "admin") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <ShieldCheck className="mx-auto size-10 text-zinc-300" />
        <h1 className="font-display mt-4 text-3xl font-semibold">Teachers only</h1>
        <p className="mt-2 text-zinc-500">The leaderboard is available to teachers and admins. Switch your account or ask your teacher.</p>
        <Link to="/dashboard" className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">Back to dashboard</Link>
      </div>
    );
  }

  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-brand">
        <Trophy className="size-3.5" /> Live · Class performance
      </div>
      <h1 className="font-display mt-3 text-5xl font-semibold tracking-tight">Top learners</h1>
      <p className="mt-3 text-zinc-500">Aggregated XP from courses, drills, and games across all your students.</p>

      {loading ? <div className="mt-10"><Loader2 className="size-6 animate-spin text-zinc-400" /></div> : rows.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-black/[0.1] bg-white p-12 text-center text-zinc-500">No data yet — encourage your students to start learning.</div>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[top3[1], top3[0], top3[2]].filter(Boolean).map((p, i) => {
              const rank = [2, 1, 3][i];
              const heights = ["h-28", "h-40", "h-24"][i];
              return (
                <div key={p.id} className="flex flex-col items-center">
                  <div className={`grid size-16 place-items-center rounded-full bg-gradient-to-br ${rank === 1 ? "from-amber-300 to-amber-500" : rank === 2 ? "from-zinc-300 to-zinc-400" : "from-orange-200 to-orange-400"} text-white font-display text-2xl shadow-lg`}>
                    {(p.full_name ?? "?")[0]}
                  </div>
                  <div className="mt-3 text-center">
                    <div className="font-semibold">{p.full_name ?? "Student"}</div>
                    <div className="text-[11px] text-zinc-500">Class {p.grade ?? "—"}</div>
                  </div>
                  <div className={`relative mt-3 ${heights} w-full rounded-t-2xl bg-gradient-to-t ${rank === 1 ? "from-brand to-brand/60" : "from-zinc-200 to-zinc-100"} grid place-items-center p-4 ring-1 ring-black/[0.04]`}>
                    {rank === 1 && <Crown className="absolute -top-7 size-6 text-amber-500" />}
                    <div className={rank === 1 ? "text-white" : "text-ink"}>
                      <div className="font-display text-2xl font-semibold">#{rank}</div>
                      <div className="text-xs">{p.totalXp.toLocaleString()} XP</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
            <div className="grid grid-cols-[40px_1fr_120px_100px_80px] gap-3 border-b border-black/[0.04] bg-zinc-50/50 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <div>#</div><div>Student</div><div>Grade</div><div className="text-right">XP</div><div className="text-right">Streak</div>
            </div>
            {rest.map((p, i) => (
              <div key={p.id} className="grid grid-cols-[40px_1fr_120px_100px_80px] items-center gap-3 border-b border-black/[0.04] px-5 py-3 text-sm last:border-0">
                <div className="font-display font-semibold text-zinc-400">{i + 4}</div>
                <div className="flex items-center gap-3">
                  <div className="grid size-8 place-items-center rounded-full bg-zinc-100 text-xs font-semibold">{(p.full_name ?? "?")[0]}</div>
                  <div className="font-medium">{p.full_name ?? "—"}</div>
                </div>
                <div className="text-xs text-zinc-500">Class {p.grade ?? "—"}</div>
                <div className="text-right font-semibold">{p.totalXp.toLocaleString()}</div>
                <div className="text-right text-xs text-orange-600">🔥 {p.streak ?? 0}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
