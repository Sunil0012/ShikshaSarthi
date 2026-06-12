import { createFileRoute } from "@tanstack/react-router";
import { TimedQuiz } from "@/components/games/TimedQuiz";
import { BIO_BUILDER } from "@/lib/games-data";

export const Route = createFileRoute("/games/bio-builder")({
  head: () => ({ meta: [{ title: "Bio Builder — Shiksha Saarthi" }, { name: "description", content: "Construct cells, organs, and ecosystems." }] }),
  component: () => <TimedQuiz title="Bio Builder" subject="Biology" accent="bg-amber-600" bank={BIO_BUILDER} questionTime={18} description="Cells, organs, genetics, ecology — build your bio mastery." />,
});
