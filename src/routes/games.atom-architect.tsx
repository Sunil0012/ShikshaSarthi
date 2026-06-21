import { createFileRoute } from "@tanstack/react-router";
import { TimedQuiz } from "@/components/games/TimedQuiz";
import { ATOM_ARCHITECT } from "@/lib/games-data";

export const Route = createFileRoute("/games/atom-architect")({
  head: () => ({ meta: [{ title: "Atom Architect — Shiksha Saarthi" }, { name: "description", content: "Build molecules and master chemistry concepts." }] }),
  component: () => <TimedQuiz title="Atom Architect" subject="Chemistry" accent="bg-orange-600" bank={ATOM_ARCHITECT} questionTime={18} description="Atoms, bonds, periodic table — fire fast and chain combos for max XP." />,
});
