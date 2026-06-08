import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Shiksha Saarthi" },
      { name: "description", content: "Simple, affordable plans for students of class 6 to 12. Start free, upgrade for live doubts and 1-on-1 mentoring." },
    ],
  }),
  component: PricingPage,
});

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    sub: "Forever free",
    cta: "Start learning",
    features: ["All recorded courses", "Adaptive practice drills", "Basic offline downloads (500 MB)", "Daily streaks & XP", "Community Q&A"],
  },
  {
    name: "Sarthi+",
    price: "₹299",
    sub: "per month",
    cta: "Upgrade to Sarthi+",
    popular: true,
    features: ["Everything in Free", "Unlimited offline downloads", "Live doubt-clearing (6 AM – 11 PM)", "Mock tests & PYQ archive", "Weekly tournaments", "Personalized study plan"],
  },
  {
    name: "Sarthi Pro",
    price: "₹999",
    sub: "per month",
    cta: "Talk to a mentor",
    features: ["Everything in Sarthi+", "1-on-1 mentor (4 sessions/mo)", "Parent dashboard & reports", "JEE / NEET foundation modules", "Priority doubt resolution", "Olympiad masterclasses"],
  },
];

function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand">
          <Sparkles className="size-3" /> Built for Indian students
        </div>
        <h1 className="font-display mt-5 text-5xl font-semibold tracking-tight">Simple, honest pricing</h1>
        <p className="mt-3 text-zinc-500">No hidden fees. Cancel anytime. 7-day free trial on paid plans.</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PLANS.map((p) => (
          <div key={p.name} className={`relative rounded-3xl border p-8 ${p.popular ? "border-brand bg-gradient-to-br from-brand-muted to-white shadow-lg" : "border-black/[0.06] bg-white"}`}>
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                Most popular
              </div>
            )}
            <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-5xl font-semibold">{p.price}</span>
              <span className="text-sm text-zinc-500">/ {p.sub}</span>
            </div>
            <Link to="/auth" search={{ mode: "signup" }} className={`mt-6 block rounded-full px-4 py-2.5 text-center text-sm font-medium ${p.popular ? "bg-ink text-white" : "bg-zinc-100 text-ink hover:bg-zinc-200"}`}>
              {p.cta}
            </Link>
            <ul className="mt-7 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" /> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="font-display text-center text-3xl font-semibold tracking-tight">Frequently asked questions</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            ["Is there really a free plan?", "Yes — full access to recorded lessons, drills, XP, and streaks. Forever. No card needed."],
            ["Can I use it offline?", "Absolutely. Free gets 500 MB local cache, paid plans get unlimited downloads on phone and laptop."],
            ["Is the content aligned with my board?", "Yes — NCERT, CBSE, ICSE, and most state boards (Maharashtra, Tamil Nadu, Karnataka, UP) are supported."],
            ["Do you offer parent visibility?", "On Sarthi Pro, parents get weekly reports, study time, and topic-level performance."],
            ["What about JEE / NEET?", "Class 11 & 12 courses include foundation tracks. Sarthi Pro adds full JEE Mains / NEET masterclasses."],
            ["Can I cancel anytime?", "Yes. Cancel from your dashboard — no questions asked, no calls required."],
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-black/[0.06] bg-white p-6">
              <div className="font-semibold">{q}</div>
              <p className="mt-2 text-sm text-zinc-500">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
