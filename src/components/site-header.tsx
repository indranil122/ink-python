import Link from "next/link";
import { ProgressChip } from "@/components/progress/progress-chip";

const navItems = [
  { href: "/learn", label: "Learn" },
  { href: "/playground", label: "Playground" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/credits", label: "Credits" },
];

export function SiteHeader() {
  return (
    <header
      data-chrome
      className="sticky top-0 z-40 border-b border-rule bg-paper"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-baseline gap-2 text-xl font-semibold tracking-tight"
        >
          Ink
          <span className="font-mono text-[0.625rem] font-medium tracking-[0.18em] text-ink-60 uppercase">
            Python
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-5 sm:gap-7">
          <ProgressChip />
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-60 uppercase transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
