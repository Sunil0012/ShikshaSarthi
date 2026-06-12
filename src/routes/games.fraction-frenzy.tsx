import { createFileRoute } from "@tanstack/react-router";
import { TimedQuiz } from "@/components/games/TimedQuiz";
import { FRACTION_FRENZY } from "@/lib/games-data";

export const Route = createFileRoute("/games/fraction-frenzy")({
  head: () => ({ meta: [{ title: "Fraction Frenzy — Shiksha Saarthi" }, { name: "description", content: "Match fractions, decimals and percentages." }] }),
  component: () => <TimedQuiz title="Fraction Frenzy" subject="Mathematics" accent="bg-fuchsia-600" bank={FRACTION_FRENZY} questionTime={12} description="Race the clock through fraction & decimal conversions." />,
});
