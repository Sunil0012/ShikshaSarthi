import { createFileRoute } from "@tanstack/react-router";
import { TimedQuiz } from "@/components/games/TimedQuiz";
import { PHYSICS_PLAYGROUND } from "@/lib/games-data";

export const Route = createFileRoute("/games/physics-playground")({
  head: () => ({ meta: [{ title: "Physics Playground — Shiksha Saarthi" }, { name: "description", content: "Apply motion, force and energy concepts." }] }),
  component: () => <TimedQuiz title="Physics Playground" subject="Physics" accent="bg-sky-600" bank={PHYSICS_PLAYGROUND} questionTime={20} description="Real-world physics puzzles — mechanics, waves, electricity." />,
});
