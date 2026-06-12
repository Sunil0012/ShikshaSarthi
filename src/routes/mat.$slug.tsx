import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { TimedQuiz } from "@/components/games/TimedQuiz";
import { MAT_BANKS } from "@/lib/games-data";
import { MAT_TOPICS } from "@/lib/lms-data";

export const Route = createFileRoute("/mat/$slug")({
  loader: ({ params }) => {
    const topic = MAT_TOPICS.find((t) => t.slug === params.slug);
    const bank = MAT_BANKS[params.slug];
    if (!topic || !bank) throw notFound();
    return { topic, bank };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.topic.title ?? "Practice"} — MAT — Shiksha Saarthi` },
      { name: "description", content: `Practice ${loaderData?.topic.title} with adaptive questions and step-by-step explanations.` },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold">Topic not found</h1>
      <Link to="/mat" className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand"><ArrowLeft className="size-4" /> Back to MAT</Link>
    </div>
  ),
  errorComponent: () => <div className="px-6 py-12">Something went wrong loading this topic.</div>,
  component: MatTopicPage,
});

function MatTopicPage() {
  const { topic, bank } = Route.useLoaderData();
  return <TimedQuiz title={topic.title} subject={`MAT · ${topic.level}`} accent="bg-indigo-600" bank={bank} questionTime={25} description="Pattern, reasoning and aptitude — explanations after every answer." />;
}
