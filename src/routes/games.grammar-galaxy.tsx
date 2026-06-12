import { createFileRoute } from "@tanstack/react-router";
import { TimedQuiz } from "@/components/games/TimedQuiz";
import { GRAMMAR_GALAXY } from "@/lib/games-data";

export const Route = createFileRoute("/games/grammar-galaxy")({
  head: () => ({ meta: [{ title: "Grammar Galaxy — Shiksha Saarthi" }, { name: "description", content: "Pilot through grammar challenges." }] }),
  component: () => <TimedQuiz title="Grammar Galaxy" subject="English" accent="bg-violet-600" bank={GRAMMAR_GALAXY} questionTime={20} description="Spot errors, pick prepositions and tenses to power your spaceship." />,
});
