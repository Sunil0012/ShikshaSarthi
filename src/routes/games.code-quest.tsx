import { createFileRoute } from "@tanstack/react-router";
import { TimedQuiz } from "@/components/games/TimedQuiz";
import { CODE_QUEST } from "@/lib/games-data";

export const Route = createFileRoute("/games/code-quest")({
  head: () => ({ meta: [{ title: "Code Quest — Shiksha Saarthi" }, { name: "description", content: "Battle bugs using Python knowledge." }] }),
  component: () => <TimedQuiz title="Code Quest" subject="Computer Science" accent="bg-zinc-800" bank={CODE_QUEST} questionTime={20} description="Predict outputs, pick syntax — defeat bugs and level up." />,
});
