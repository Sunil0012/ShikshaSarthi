import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  Github,
  Menu,
  Sparkles,
  Twitter,
  X,
} from "lucide-react";
import { useState } from "react";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />
      <main className="pt-14">{children}</main>
      <Footer />
    </div>
  );
}

export function Logo({ withWord = true }: { withWord?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="grid size-7 place-items-center rounded-md bg-ink">
        <div className="size-2.5 rounded-[2px] bg-brand" />
      </div>
      {withWord && <span className="font-display text-xl font-semibold">Shiksha Saarthi</span>}
    </Link>
  );
}

const NAV_LINKS = [
  { to: "/courses", label: "Courses" },
  { to: "/games", label: "Games" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/pricing", label: "Pricing" },
] as const;

function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] bg-canvas/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.to || pathname.startsWith(l.to + "/");
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-sm font-medium transition-colors ${
                    active ? "text-ink" : "text-zinc-500 hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden h-8 items-center px-3 text-sm font-medium text-zinc-600 transition-colors hover:text-ink md:inline-flex"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-white ring-1 ring-ink transition-transform hover:scale-[1.02]"
          >
            Start free
            <ArrowRight className="size-3.5" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-1 grid size-8 place-items-center rounded-md ring-1 ring-black/[0.08] md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-black/[0.06] bg-canvas/95 md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/[0.06] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-xs space-y-5">
            <Logo />
            <p className="text-sm text-zinc-500">
              The brilliant learning platform for students of class 6 to 12 — courses, games,
              and adaptive practice that work even offline.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                className="grid size-8 place-items-center rounded-md ring-1 ring-black/[0.08] hover:bg-zinc-50"
                aria-label="Twitter"
              >
                <Twitter className="size-3.5 text-zinc-500" />
              </a>
              <a
                href="#"
                className="grid size-8 place-items-center rounded-md ring-1 ring-black/[0.08] hover:bg-zinc-50"
                aria-label="GitHub"
              >
                <Github className="size-3.5 text-zinc-500" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
            <FooterCol
              h="Learn"
              links={[
                { to: "/courses?grade=6", label: "Class 6" },
                { to: "/courses?grade=8", label: "Class 8" },
                { to: "/courses?grade=10", label: "Class 10 (Board)" },
                { to: "/courses?grade=12", label: "Class 12 (Board)" },
              ]}
            />
            <FooterCol
              h="Platform"
              links={[
                { to: "/games", label: "Educational Games" },
                { to: "/leaderboard", label: "Leaderboard" },
                { to: "/dashboard", label: "Dashboard" },
                { to: "/pricing", label: "Pricing" },
              ]}
            />
            <FooterCol
              h="Company"
              links={[
                { to: "/about", label: "About" },
                { to: "/about", label: "Careers" },
                { to: "/about", label: "Press" },
                { to: "/about", label: "Contact" },
              ]}
            />
            <FooterCol
              h="Legal"
              links={[
                { to: "/about", label: "Privacy" },
                { to: "/about", label: "Terms" },
                { to: "/about", label: "Security" },
                { to: "/about", label: "DPA" },
              ]}
            />
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-black/[0.06] pt-8 md:flex-row">
          <span className="text-[11px] text-zinc-400">
            © 2026 Shiksha Saarthi Learning. Made with <Sparkles className="inline size-3 text-brand" /> for
            curious minds.
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400">
            <span className="size-1.5 rounded-full bg-brand" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  h,
  links,
}: {
  h: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div className="space-y-3">
      <h5 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{h}</h5>
      <ul className="space-y-2">
        {links.map((l, i) => (
          <li key={i}>
            <Link
              to={l.to}
              className="text-sm text-zinc-600 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
