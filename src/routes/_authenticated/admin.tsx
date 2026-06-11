import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, type AppRole } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin" }] }),
  component: Page,
});

function Page() {
  const { role } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const [p, r] = await Promise.all([
      supabase.from("profiles").select("id, full_name, grade, xp, streak, created_at").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    const byUser: Record<string, AppRole[]> = {};
    (r.data ?? []).forEach((x: any) => { (byUser[x.user_id] ??= []).push(x.role); });
    setUsers((p.data ?? []).map((u: any) => ({ ...u, roles: byUser[u.id] ?? [] })));
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  if (role !== "admin") return <div className="p-12 text-center text-zinc-500"><ShieldCheck className="mx-auto mb-3 size-8" />This area is for admins only.</div>;

  async function setUserRole(userId: string, newRole: AppRole) {
    await supabase.from("user_roles").delete().eq("user_id", userId);
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: newRole });
    if (error) return toast.error(error.message);
    toast.success(`Updated to ${newRole}`);
    load();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Admin</div>
      <h1 className="font-display mt-1 text-4xl font-semibold tracking-tight">User & Role Management</h1>
      <p className="mt-2 text-zinc-500">View every user on the platform and assign their role.</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
        <div className="grid grid-cols-[1fr_80px_80px_80px_200px] items-center gap-4 border-b border-black/[0.06] px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          <div>User</div><div>Grade</div><div>XP</div><div>Streak</div><div>Role</div>
        </div>
        {loading ? <div className="p-8"><Loader2 className="size-5 animate-spin text-zinc-400" /></div> : users.map((u) => {
          const current: AppRole = u.roles.includes("admin") ? "admin" : u.roles.includes("teacher") ? "teacher" : "student";
          return (
            <div key={u.id} className="grid grid-cols-[1fr_80px_80px_80px_200px] items-center gap-4 border-b border-black/[0.04] px-5 py-3 text-sm last:border-0">
              <div><div className="font-medium">{u.full_name ?? "—"}</div><div className="text-xs text-zinc-400 font-mono">{u.id.slice(0, 8)}</div></div>
              <div className="text-zinc-600">{u.grade ?? "—"}</div>
              <div className="text-zinc-600">{u.xp}</div>
              <div className="text-zinc-600">{u.streak}</div>
              <select value={current} onChange={(e) => setUserRole(u.id, e.target.value as AppRole)}
                className="rounded-md border border-black/[0.1] bg-white px-2 py-1 text-xs">
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          );
        })}
        {!loading && users.length === 0 && <div className="p-12 text-center text-zinc-500"><Users className="mx-auto mb-3 size-8" />No users yet.</div>}
      </div>
    </div>
  );
}
