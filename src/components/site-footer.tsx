import Link from "next/link";
import { tracks } from "@/lib/curriculum";

export function SiteFooter() {
  return (
    <footer data-chrome className="border-t border-rule">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold tracking-tight">Ink</p>
          <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-ink-60">
            A complete Python course built on open educational resources, with a
            real Python runtime in the browser.
          </p>
        </div>

        <div>
          <p className="eyebrow">Curriculum</p>
          <ul className="mt-4 space-y-2 text-sm">
            {tracks.slice(0, 5).map((track) => (
              <li key={track.slug}>
                <Link
                  href={`/learn#${track.slug}`}
                  className="text-ink-60 transition-colors hover:text-ink"
                >
                  {track.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/learn"
                className="text-ink-60 transition-colors hover:text-ink"
              >
                All tracks
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Practice</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href="/playground"
                className="text-ink-60 transition-colors hover:text-ink"
              >
                Playground
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className="text-ink-60 transition-colors hover:text-ink"
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="text-ink-60 transition-colors hover:text-ink"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Sources</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href="/credits"
                className="text-ink-60 transition-colors hover:text-ink"
              >
                Credits &amp; licenses
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-ink-60 transition-colors hover:text-ink"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-ink-60 transition-colors hover:text-ink"
              >
                Terms
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/indranil122/ink-python"
                target="_blank"
                rel="noreferrer noopener"
                className="text-ink-60 transition-colors hover:text-ink"
              >
                GitHub
              </a>
            </li>
            <li>
              <span className="text-ink-40">Non-commercial, open license</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-40 uppercase">
            © {new Date().getFullYear()} Ink — free to learn, forever
          </p>
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-40 uppercase">
            Python runs locally via Pyodide
          </p>
        </div>
      </div>
    </footer>
  );
}
