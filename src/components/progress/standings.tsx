"use client";

import Link from "next/link";
import { levelProgress } from "@/lib/gamification/levels";
import { activeDays, useProgress } from "@/lib/progress/local";

export function Standings() {
  const progress = useProgress();
  const level = levelProgress(progress.xp);
  const days = activeDays(progress).length;

  const facts = [
    { term: "Level", detail: level.level },
    { term: "XP", detail: progress.xp.toLocaleString() },
    { term: "Lessons", detail: progress.completedLessons.length },
    { term: "Exercises", detail: progress.completedExercises.length },
    { term: "Streak", detail: `${progress.streak} day` },
    { term: "Longest", detail: `${progress.longestStreak} day` },
    { term: "Active days", detail: days },
    { term: "Freezes left", detail: progress.freezes },
  ];

  return (
    <div>
      <section className="border border-rule">
        <div className="grid grid-cols-[3rem_1fr_6rem] gap-4 border-b border-ink px-5 py-3">
          <span className="eyebrow">#</span>
          <span className="eyebrow">Learner</span>
          <span className="eyebrow text-right">XP</span>
        </div>
        <div className="grid grid-cols-[3rem_1fr_6rem] items-baseline gap-4 px-5 py-4">
          <span className="tnum font-mono text-xs text-ink-40">1</span>
          <span>
            You, on this device
            <span className="mt-1 block font-mono text-[0.6875rem] tracking-[0.12em] text-ink-40 uppercase">
              Level {level.level} · {progress.streak} day streak
            </span>
          </span>
          <span className="tnum font-mono text-sm">
            {progress.xp.toLocaleString()}
          </span>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Your record</h2>
        <dl className="mt-6 grid gap-px border border-rule bg-rule sm:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.term} className="bg-paper p-5">
              <dt className="eyebrow">{fact.term}</dt>
              <dd className="tnum mt-2 font-mono text-xl font-medium">
                {fact.detail}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-10 max-w-[60ch] leading-relaxed text-ink-60">
        This deployment is frontend only, so there is no shared database to rank
        against. Everything above is stored in this browser, and it stays here
        until you clear it. A global leaderboard would need an account system
        and a server to verify submissions.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/learn"
          className="inline-flex h-11 items-center border border-ink bg-ink px-6 font-mono text-[0.6875rem] tracking-[0.14em] text-paper uppercase"
        >
          Earn more XP
        </Link>
        <Link
          href="/profile"
          className="inline-flex h-11 items-center border border-ink px-6 font-mono text-[0.6875rem] tracking-[0.14em] uppercase"
        >
          Full profile
        </Link>
      </div>
    </div>
  );
}
