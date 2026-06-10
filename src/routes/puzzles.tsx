import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Grid3x3, Puzzle as PuzzleIcon, Shapes } from "lucide-react";

const ICONS: Record<string, any> = { Brain, Grid3x3, Shapes, PuzzleIcon };

export const Route = createFileRoute("/puzzles")({
  head: () => ({
    meta: [
      { title: "Puzzles — Shiksha Saarthi" },
      { name: "description", content: "Memory Match, Match the Pieces, Logic Grids and Shape Sort — revision that feels like play." },
    ],
  }),
  component: PuzzlesPage,
});

const ITEMS = [
  { slug: "memory-match", title: "Memory Match", desc: "Flip cards to find concept pairs — Hindi vocab, chem symbols, math constants.", to: "/games/memory-match", icon: Brain, status: "Playable" },
  { slug: "match-pieces", title: "Match the Pieces", desc: "Drag concept tiles to definitions. Great for revision before exams.", to: "/games/memory-match", icon: PuzzleIcon, status: "Beta" },
  { slug: "logic-grid", title: "Logic Grid", desc: "Classic logic puzzles — deduce the answer from clue sets.", to: "/games/memory-match", icon: Grid3x3, status: "Coming soon" },
  { slug: "shape-sort", title: "Shape Sort", desc: "Sort 3D nets and 2D shapes by geometric category.", to: "/games/memory-match", icon: Shapes, status: "Coming soon" },
];

function PuzzlesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="max-w-2xl">
        <h1 className="font-display text-5xl font-semibold tracking-tight">Puzzles</h1>
        <p className="mt-3 text-zinc-500">Play-based revision. Train your memory, pattern recognition, and recall. Earn XP for streaks.</p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, ...p }) => (
          <Link key={p.slug} to={p.to} className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="absolute -right-10 -top-10 size-32 rounded-full bg-brand/10 blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="grid size-11 place-items-center rounded-xl bg-ink text-white"><Icon className="size-5" /></div>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600">{p.status}</span>
              </div>
              <h3 className="font-display mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{p.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
