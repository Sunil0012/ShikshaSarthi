import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Sparkles, Target, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Shiksha Saarthi" },
      { name: "description", content: "Our mission is to make world-class learning accessible to every Indian student, online or offline." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand">
        <Heart className="size-3" /> Our mission
      </div>
      <h1 className="font-display mt-5 text-5xl font-semibold tracking-tight">
        Make brilliant learning <span className="text-brand">accessible to every Indian student</span>.
      </h1>
      <p className="mt-5 max-w-3xl text-lg text-zinc-500">
        Shiksha Saarthi was built by teachers, engineers, and learning scientists who believe that
        every child — in a tier-1 metro or a remote village — deserves the same quality of education.
        That's why everything we build works offline, in 8 Indian languages, on the cheapest Android phone.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          ["1.2L+", "Students learning", <Users className="size-5 text-brand" key="u" />],
          ["180+", "Teachers & creators", <Sparkles className="size-5 text-brand" key="s" />],
          ["8", "Indian languages", <Target className="size-5 text-brand" key="t" />],
        ].map(([n, l, ic]) => (
          <div key={n as string} className="rounded-2xl border border-black/[0.06] bg-white p-6">
            {ic}
            <div className="font-display mt-4 text-4xl font-semibold">{n}</div>
            <div className="mt-1 text-sm text-zinc-500">{l}</div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="font-display text-3xl font-semibold tracking-tight">What we believe</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            ["Practice beats passive watching.", "Every lesson is paired with an adaptive drill so concepts stick."],
            ["Offline-first is non-negotiable.", "Learning shouldn't stop when the internet does. Everything works offline."],
            ["Games are serious learning tools.", "When kids enjoy practice, they come back. We design for delight."],
            ["Teachers are the heart of education.", "We don't replace teachers — we give them superpowers."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-black/[0.06] bg-white p-6">
              <div className="font-display text-xl font-semibold">{t}</div>
              <p className="mt-2 text-sm text-zinc-500">{d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-3xl bg-ink p-10 text-white">
        <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight">
          Join 1.2 lakh students learning brilliantly.
        </h2>
        <p className="mt-3 max-w-xl text-sm text-white/70">
          Free forever. No credit card. Start your first lesson in under 30 seconds.
        </p>
        <Link to="/auth" search={{ mode: "signup" }} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink">
          Create your free account
        </Link>
      </div>
    </div>
  );
}
