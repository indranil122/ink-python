"use client";

import { levelProgress } from "@/lib/gamification/levels";
import { badges } from "@/lib/gamification/badges";
import { activeDays, progressStats, useProgress } from "@/lib/progress/local";

function ActivityGrid({ days }: { days: string[] }) {
  const active = new Set(days);
  const columns: { day: string; active: boolean }[] = [];

  for (let offset = 83; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    const day = date.toISOString().slice(0, 10);
    columns.push({ day, active: active.has(day) });
  }

  return (
    <div
      role="img"
      aria-label={`${days.length} active days in the last twelve weeks`}
      className="grid grid-flow-col grid-rows-7 gap-1"
    >
      {columns.map((column) => (
        <span
          key={column.day}
          title={column.day}
          className={
            column.active
              ? "size-3 bg-ink"
              : "size-3 border border-rule bg-paper"
          }
        />
      ))}
    </div>
  );
}

export function ProfilePanel() {
  const progress = useProgress();
  const level = levelProgress(progress.xp);
  const stats = progressStats(progress);
  const earned = new Set(
    badges.filter((badge) => badge.earned(stats)).map((badge) => badge.id),
  );

  return (
    <div className="space-y-16">
      <section className="grid gap-px border border-rule bg-rule sm:grid-cols-4">
        {[
          { term: "Level", detail: level.level },
          {
            term: "XP",
            detail: progress.xp.toLocaleString(),
          },
          {
            term: "Next level",
            detail:
              level.nextLevelXp === null
                ? "max"
                : `${level.nextLevelXp - progress.xp} XP`,
          },
          { term: "Streak", detail: `${progress.streak} day` },
        ].map((item) => (
          <div key={item.term} className="bg-paper p-5">
            <p className="eyebrow">{item.term}</p>
            <p className="tnum mt-2 font-mono text-2xl font-medium">
              {item.detail}
            </p>
          </div>
        ))}
      </section>

      <section>
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Level progress
          </h2>
          <p className="eyebrow">
            {level.percent}% of level {level.level}
          </p>
        </div>
        <div aria-hidden="true" className="mt-4 h-2 w-full bg-wash">
          <div className="h-2 bg-ink" style={{ width: `${level.percent}%` }} />
        </div>
        <p className="tnum mt-3 font-mono text-xs text-ink-60">
          {level.intoLevel} / {level.levelSpan} XP into level {level.level}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Activity</h2>
        <p className="mt-2 text-sm text-ink-60">
          Last twelve weeks, stored on this device.
        </p>
        <div className="mt-6 overflow-x-auto pb-2">
          <ActivityGrid days={activeDays(progress)} />
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">Badges</h2>
          <p className="eyebrow">
            {earned.size} of {badges.length}
          </p>
        </div>
        <ul className="mt-6 grid gap-px border border-rule bg-rule sm:grid-cols-2">
          {badges.map((badge) => {
            const isEarned = earned.has(badge.id);
            const progressForBadge = badge.progress(stats);

            return (
              <li key={badge.id} className="bg-paper p-5">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={
                      isEarned
                        ? "mt-0.5 inline-block size-4 shrink-0 bg-ink"
                        : "relative mt-0.5 inline-block size-4 shrink-0 border border-ink"
                    }
                  >
                    {isEarned ? null : (
                      <span className="hatch absolute inset-0" />
                    )}
                  </span>
                  <div>
                    <p className="font-medium">
                      <span className="sr-only">
                        {isEarned ? "Earned: " : "Locked: "}
                      </span>
                      {badge.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-60">
                      {badge.description}
                    </p>
                    {progressForBadge && !isEarned ? (
                      <p className="tnum mt-2 font-mono text-xs text-ink-40">
                        {progressForBadge.current} / {progressForBadge.target}
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Record</h2>
        <dl className="mt-6 grid gap-px border border-rule bg-rule sm:grid-cols-4">
          {[
            { term: "Lessons", detail: progress.completedLessons.length },
            { term: "Exercises", detail: progress.completedExercises.length },
            {
              term: "Server verified",
              detail: progress.verifiedExercises.length,
            },
            { term: "Longest streak", detail: `${progress.longestStreak} day` },
          ].map((item) => (
            <div key={item.term} className="bg-paper p-5">
              <dt className="eyebrow">{item.term}</dt>
              <dd className="tnum mt-2 font-mono text-xl font-medium">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
