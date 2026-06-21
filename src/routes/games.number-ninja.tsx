import { createFileRoute } from "@tanstack/react-router";
import { TimedQuiz } from "@/components/games/TimedQuiz";
import { NUMBER_NINJA } from "@/lib/games-data";

export const Route = createFileRoute("/games/number-ninja")({
  head: () => ({ meta: [{ title: "Number Ninja — Shiksha Saarthi" }, { name: "description", content: "Slice through math problems before the timer runs out." }] }),
  component: () => <TimedQuiz title="Number Ninja" subject="Mathematics" accent="bg-emerald-600" bank={NUMBER_NINJA} questionTime={12} description="Solve mental math drills under pressure — streaks multiply your score." />,
});
