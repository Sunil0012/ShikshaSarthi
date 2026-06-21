import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, ChartArea, Lock, MessageSquareHeart, ScrollText, Settings2, Shield, Users } from "lucide-react";

export const Route = createFileRoute("/for-schools")({
  head: () => ({
    meta: [
      { title: "For Schools — Shiksha Saarthi" },
      { name: "description", content: "Admin tools, custom feedback forms, multi-classroom analytics, and offline deployment for entire schools." },
    ],
  }),
  component: ForSchools,
});

const PILLARS = [
  { i: Users, t: "Multi-role management", d: "Onboard teachers, principals, and students under one umbrella with granular roles." },
  { i: ChartArea, t: "School-wide analytics", d: "Class, section, and subject-level mastery charts — exportable as PDF reports." },
  { i: ScrollText, t: "Custom feedback forms", d: "Build and publish feedback forms; analyze responses with sentiment summaries." },
  { i: Shield, t: "Offline deployment", d: "Local server install for low-bandwidth campuses — sync when the link returns." },
  { i: Settings2, t: "SSO + integrations", d: "Plug into your existing school MIS, Google Workspace, or Microsoft 365." },
  { i: MessageSquareHeart, t: "Parent reports", d: "Auto-generated monthly progress letters in English or Hindi." },
];

function ForSchools() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand"><Building2 className="size-3" /> Built for institutions</div>
        <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight md:text-6xl">One platform for your entire school.</h1>
        <p className="mt-4 text-lg text-zinc-500">Deploy across every grade. Track every classroom. Empower every teacher. Offline-first by design.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/auth" search={{ mode: "signup" }} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-medium text-white">Book a demo <ArrowRight className="size-4" /></Link>
          <Link to="/admin" className="inline-flex h-10 items-center rounded-full ring-1 ring-black/[0.1] px-5 text-sm font-medium hover:bg-zinc-50">Preview admin console</Link>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map(({ i: Icon, t, d }) => (
          <div key={t} className="rounded-2xl border border-black/[0.06] bg-white p-6 transition hover:shadow-md">
            <div className="grid size-10 place-items-center rounded-xl bg-ink text-white"><Icon className="size-5" /></div>
            <h3 className="font-display mt-4 text-lg font-semibold">{t}</h3>
            <p className="mt-1 text-sm text-zinc-500">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-ink p-10 text-white">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-widest text-zinc-400">Enterprise</div>
            <h2 className="font-display mt-2 text-3xl font-semibold">Built to scale across 100+ schools.</h2>
            <p className="mt-2 text-sm text-zinc-300">Used by educators in Tier-2 and Tier-3 cities across India. SOC-2 aligned data residency in Mumbai.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs"><Lock className="size-3.5" /> AES-256 encrypted · DPDP Act compliant</div>
        </div>
      </div>
    </div>
  );
}
