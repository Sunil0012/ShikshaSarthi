import { createFileRoute } from "@tanstack/react-router";
import { TimedQuiz } from "@/components/games/TimedQuiz";
import { HISTORY_DETECTIVE } from "@/lib/games-data";

export const Route = createFileRoute("/games/history-detective")({
  head: () => ({ meta: [{ title: "History Detective — Shiksha Saarthi" }, { name: "description", content: "Crack history's biggest mysteries." }] }),
  component: () => <TimedQuiz title="History Detective" subject="Social Studies" accent="bg-rose-600" bank={HISTORY_DETECTIVE} questionTime={20} description="Travel back through events, dynasties and revolutions." />,
});
