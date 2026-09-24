import Link from "next/link";
import { buttonClass } from "@/components/button";
import { getCurriculumSummary } from "@/lib/content/load";
import { tracks } from "@/lib/curriculum";
import { sources } from "@/lib/sources";

const specimen = `def fib(n: int) -> list[int]:
    a, b = 0, 1
    out = []
    while len(out) < n:
        out.append(a)
        a, b = b, a + b
    return out


print(fib(10))`;

const specimenOutput = "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]";

const steps = [
  {
    label: "Read",
    body: "Editorial lessons with bold lead-ins, worked examples before rules, and a recap box at the end of every section. Written to be read, not skimmed.",
  },
  {
    label: "Run",
    body: "Every Python block carries a Run button. A real CPython 3.14 runtime executes in your browser, so nothing installs, nothing uploads, and it works offline.",
  },
  {
    label: "Prove",
    body: "Exercises ship with an in-browser test suite. Pass it in your browser and the same checks run against your locally saved result before XP is awarded.",
  },
];

const progress = [
  { value: "10 / 25 / 100", label: "XP for lessons, exercises and modules" },
  { value: "100·n^1.5", label: "Level curve, fifty levels deep" },
  { value: "12", label: "Badges, from First Light to Capstone" },
  { value: "Daily", label: "Streaks with a grace day" },
];

export default function Home() {
  const summary = getCurriculumSummary();

  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <p className="eyebrow">Python · zero to professional</p>
            <h1 className="mt-6 text-[clamp(2.75rem,7vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.02em]">
              Learn Python the way working programmers do.
            </h1>
            <p className="measure mt-8 text-lg leading-relaxed text-ink-60">
              {summary.lessons} published lessons, {summary.exercises}{" "}
              exercises, and a real Python interpreter running inside this page.
              Read the lesson, edit the code, run it, and prove every answer
              with tests.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/learn" className={buttonClass({ size: "lg" })}>
                Start Track 1
              </Link>
              <Link
                href="/playground"
                className={buttonClass({ variant: "outline", size: "lg" })}
              >
                Open the playground
              </Link>
            </div>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-rule pt-6">
              {[
                { term: "Tracks", detail: tracks.length },
                {
                  term: "Exercises",
                  detail: summary.exercises,
                },
                {
                  term: "XP available now",
                  detail: summary.xp.toLocaleString(),
                },
              ].map((stat) => (
                <div key={stat.term}>
                  <dt className="eyebrow">{stat.term}</dt>
                  <dd className="tnum mt-2 font-mono text-2xl font-medium">
                    {stat.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="self-center border border-ink">
            <div className="flex items-center justify-between border-b border-rule px-4 py-3">
              <span className="eyebrow">lesson 04 · functions</span>
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-40 uppercase">
                run →
              </span>
            </div>
            <pre className="overflow-x-auto px-4 py-5 font-mono text-[0.8125rem] leading-relaxed">
              <code>{specimen}</code>
            </pre>
            <div className="border-t border-rule px-4 py-3 font-mono text-[0.8125rem] text-ink-60">
              {specimenOutput}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">The path</p>
              <h2 className="mt-4 max-w-[18ch] text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
                Eleven tracks, in order, from first script to deployed API.
              </h2>
            </div>
            <Link
              href="/learn"
              className={buttonClass({ variant: "outline", size: "sm" })}
            >
              See the full curriculum
            </Link>
          </div>

          <ol className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {tracks.map((track) => (
              <li key={track.slug} className="bg-paper p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="tnum font-mono text-xs text-ink-40">
                    {String(track.order).padStart(2, "0")}
                  </span>
                  <span className="tnum font-mono text-xs text-ink-40">
                    {summary.byTrack[track.slug]?.xp ?? 0} XP published
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  {track.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-60">
                  {track.blurb}
                </p>
                <p className="tnum mt-5 font-mono text-xs text-ink-40">
                  {summary.byTrack[track.slug]?.lessons ?? 0} published lessons
                  · {summary.byTrack[track.slug]?.exercises ?? 0} published
                  exercises
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="eyebrow">How it works</p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.label}>
                <p className="tnum font-mono text-xs text-ink-40">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                  {step.label}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-60">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-wash">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow">Progress you can see</p>
              <h2 className="mt-4 max-w-[16ch] text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
                A quiet scoreboard for serious study.
              </h2>
              <p className="measure mt-6 leading-relaxed text-ink-60">
                Progress is recorded without a streak-shaming mechanic and
                without colour. Level, badges and rank are rendered in
                typography, hairlines and motion, and every point is earned by
                code tested in your browser before your progress updates.
              </p>
              <Link
                href="/leaderboard"
                className={buttonClass({
                  variant: "outline",
                  size: "sm",
                  className: "mt-8",
                })}
              >
                View the leaderboard
              </Link>
            </div>

            <dl className="grid gap-px self-start border border-rule bg-rule sm:grid-cols-2">
              {progress.map((item) => (
                <div key={item.label} className="bg-paper p-6">
                  <dd className="tnum font-mono text-xl font-medium">
                    {item.value}
                  </dd>
                  <dt className="mt-3 text-sm leading-relaxed text-ink-60">
                    {item.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Built on open work</p>
              <h2 className="mt-4 max-w-[20ch] text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
                Every lesson cites the work it came from.
              </h2>
            </div>
            <Link
              href="/credits"
              className={buttonClass({ variant: "outline", size: "sm" })}
            >
              All credits &amp; licenses
            </Link>
          </div>

          <ul className="mt-12 border-t border-rule">
            {sources.slice(0, 6).map((source) => (
              <li
                key={source.id}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule py-4"
              >
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {source.title}
                </a>
                <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-40 uppercase">
                  {source.license}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-paper/60 uppercase">
              Free · no account needed to read
            </p>
            <h2 className="mt-5 max-w-[16ch] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
              Start with the first lesson. Keep going until it is a job.
            </h2>
          </div>
          <Link
            href="/learn"
            className={buttonClass({
              variant: "outline",
              size: "lg",
              className:
                "border-paper bg-paper text-ink hover:bg-transparent hover:text-paper",
            })}
          >
            Begin Track 1
          </Link>
        </div>
      </section>
    </>
  );
}
