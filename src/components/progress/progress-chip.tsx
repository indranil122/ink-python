"use client";

import { levelProgress } from "@/lib/gamification/levels";
import { useProgress } from "@/lib/progress/local";
import Link from "next/link";

export function ProgressChip() {
  const progress = useProgress();
  const level = levelProgress(progress.xp);

  if (progress.xp === 0 && progress.completedLessons.length === 0) {
    return null;
  }

  return (
    <Link
      href="/profile"
      className="hidden items-center gap-3 border border-rule px-3 py-1.5 transition-colors hover:border-ink sm:flex"
    >
      <span className="tnum font-mono text-xs">Lv {level.level}</span>
      <span aria-hidden="true" className="h-3 w-16 bg-wash">
        <span
          className="block h-3 bg-ink"
          style={{ width: `${level.percent}%` }}
        />
      </span>
      <span className="tnum font-mono text-xs text-ink-60">
        {progress.xp} XP
      </span>
    </Link>
  );
}
