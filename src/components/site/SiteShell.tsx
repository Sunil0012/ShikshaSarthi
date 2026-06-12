import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Github, LogOut, Menu, Sparkles, Twitter, User, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

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
      {withWord && (
        <span className="font-display text-xl font-semibold tracking-tight">
          Shiksha <span className="text-brand">Saarthi</span>
        </span>
      )}
    </Link>
  );
}

const FOR_LINKS = [
  { to: "/for-students", label: "For Students", desc: "Adaptive courses, games, MAT" },
  { to: "/for-teachers", label: "For Teachers", desc: "Build courses, quizzes, analytics" },
  { to: "/for-schools", label: "For Schools", desc: "Multi-classroom admin tools" },
] as const;

const LEARN_LINKS = [
  { to: "/mat", label: "Mental Ability Tests" },
  { to: "/experiments", label: "Virtual Experiments" },
  { to: "/puzzles", label: "Puzzles" },
  { to: "/vocabulary", label: "Vocabulary" },
] as const;

function Nav() {
  const [open, setOpen] = useState(false);
  const [hoverMenu, setHoverMenu] = useState<"for" | "learn" | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const navLinks: { to: string; label: string }[] = [
    { to: "/courses", label: "Courses" },
    { to: "/games", label: "Games" },
  ];
  if (role === "teacher" || role === "admin") navLinks.push({ to: "/leaderboard", label: "Leaderboard" });
  if (user) navLinks.push({ to: "/dashboard", label: "Dashboard" });

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] bg-canvas/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Logo />
          <div className="hidden items-center gap-5 md:flex">
            <DropdownTrigger label="Learn" open={hoverMenu === "learn"} onEnter={() => setHoverMenu("learn")} onLeave={() => setHoverMenu(null)}>
              <div className="grid w-[260px] grid-cols-1 gap-0.5 p-2">
                {LEARN_LINKS.map((l) => (
                  <Link key={l.to} to={l.to} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-zinc-100" onClick={() => setHoverMenu(null)}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </DropdownTrigger>

            {navLinks.map((l) => {
              const active = pathname === l.to || pathname.startsWith(l.to + "/");
              return (
                <Link key={l.to} to={l.to} className={`text-sm font-medium transition-colors ${active ? "text-ink" : "text-zinc-500 hover:text-ink"}`}>
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {role && <span className="hidden rounded-full bg-brand-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand md:inline-flex">{role}</span>}
              <Link to="/dashboard" className="hidden h-8 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-zinc-600 transition-colors hover:text-ink md:inline-flex">
                <User className="size-3.5" />{user.email?.split("@")[0]}
              </Link>
              <button onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }} className="inline-flex h-8 items-center gap-1.5 rounded-full bg-ink px-3 text-sm font-medium text-white">
                <LogOut className="size-3.5" /> Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="hidden h-8 items-center px-3 text-sm font-medium text-zinc-600 transition-colors hover:text-ink md:inline-flex">Log in</Link>
              <Link to="/auth" search={{ mode: "signup" }} className="inline-flex h-8 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-white ring-1 ring-ink transition-transform hover:scale-[1.02]">
                Start free <ArrowRight className="size-3.5" />
              </Link>
            </>
          )}
          <button onClick={() => setOpen((v) => !v)} className="ml-1 grid size-8 place-items-center rounded-md ring-1 ring-black/[0.08] md:hidden" aria-label="Menu">
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-black/[0.06] bg-canvas/95 md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {[...FOR_LINKS, ...LEARN_LINKS, ...navLinks].map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">
                {l.label}
              </Link>
            ))}
            {!user && (
              <Link to="/auth" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">Log in</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function DropdownTrigger({ label, open, onEnter, onLeave, children }: { label: string; open: boolean; onEnter: () => void; onLeave: () => void; children: React.ReactNode }) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${open ? "text-ink" : "text-zinc-500 hover:text-ink"}`}>
        {label} <ChevronDown className="size-3" />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-2">
          <div className="rounded-xl border border-black/[0.06] bg-white shadow-lg">{children}</div>
        </div>
      )}
    </div>
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
              The brilliant learning platform for class 6 to 12 — courses, games, virtual labs, and adaptive practice.
            </p>
            <div className="flex gap-2">
              <a href="#" className="grid size-8 place-items-center rounded-md ring-1 ring-black/[0.08] hover:bg-zinc-50" aria-label="Twitter"><Twitter className="size-3.5 text-zinc-500" /></a>
              <a href="#" className="grid size-8 place-items-center rounded-md ring-1 ring-black/[0.08] hover:bg-zinc-50" aria-label="GitHub"><Github className="size-3.5 text-zinc-500" /></a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
            <FooterCol h="Learn" links={[
              { to: "/courses", label: "All courses" },
              { to: "/mat", label: "Mental Ability" },
              { to: "/experiments", label: "Virtual Labs" },
              { to: "/vocabulary", label: "Vocabulary" },
            ]}/>
            <FooterCol h="Play" links={[
              { to: "/games", label: "All games" },
              { to: "/games/memory-match", label: "Memory Match" },
              { to: "/games/quiz-arena", label: "Quiz Arena" },
              { to: "/puzzles", label: "Puzzles" },
            ]}/>
            <FooterCol h="Platform" links={[
              { to: "/for-students", label: "For Students" },
              { to: "/for-teachers", label: "For Teachers" },
              { to: "/for-schools", label: "For Schools" },
              { to: "/about", label: "About" },
            ]}/>
            <FooterCol h="Account" links={[
              { to: "/auth", label: "Log in" },
              { to: "/dashboard", label: "Dashboard" },
              { to: "/about", label: "Privacy" },
              { to: "/about", label: "Terms" },
            ]}/>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-black/[0.06] pt-8 md:flex-row">
          <span className="text-[11px] text-zinc-400">
            © 2026 Shiksha Saarthi Learning. Made with <Sparkles className="inline size-3 text-brand" /> for curious minds.
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400">
            <span className="size-1.5 rounded-full bg-brand" /> All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ h, links }: { h: string; links: { to: string; label: string }[] }) {
  return (
    <div className="space-y-3">
      <h5 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{h}</h5>
      <ul className="space-y-2">
        {links.map((l, i) => (
          <li key={i}>
            <Link to={l.to} className="text-sm text-zinc-600 transition-colors hover:text-ink">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
