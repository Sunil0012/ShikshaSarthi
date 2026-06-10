import { createFileRoute, Link } from "@tanstack/react-router";
import { FlaskConical, Play, Timer } from "lucide-react";
import { EXPERIMENTS } from "@/lib/lms-data";

export const Route = createFileRoute("/experiments")({
  head: () => ({
    meta: [
      { title: "Virtual Experiments — Shiksha Saarthi" },
      { name: "description", content: "Run physics, chemistry, and biology lab experiments online with full simulations." },
    ],
  }),
  component: ExpPage,
});

function ExpPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand"><FlaskConical className="size-3" /> Lab simulator</div>
        <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight">Virtual experiments</h1>
        <p className="mt-3 text-zinc-500">Every CBSE board lab — fully simulated. Change variables, observe outcomes, plot graphs, and take the lab quiz at the end.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {EXPERIMENTS.map((e) => (
          <Link key={e.slug} to="/auth" search={{ mode: "signup" }} className="group relative block overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-6 transition hover:shadow-lg">
            <div className="absolute -right-12 -top-12 size-40 rounded-full bg-brand/10 blur-2xl" />
            <div className="relative">
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand">{e.subject} · Class {e.grade}</div>
              <h3 className="font-display mt-2 text-xl font-semibold">{e.title}</h3>
              <p className="mt-2 text-sm text-zinc-500">{e.desc}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs text-zinc-500"><Timer className="size-3" /> {e.duration}</span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-ink"><Play className="size-3" /> Launch lab</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
