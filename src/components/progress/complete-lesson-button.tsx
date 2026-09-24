"use client";

import { completeLesson, useProgress } from "@/lib/progress/local";

export function CompleteLessonButton({
  lessonId,
  xp,
}: {
  lessonId: string;
  xp: number;
}) {
  const progress = useProgress();
  const done = progress.completedLessons.includes(lessonId);

  return (
    <button
      type="button"
      onClick={() => completeLesson(lessonId, xp)}
      disabled={done}
      aria-pressed={done}
      className="inline-flex h-11 items-center border border-ink px-6 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors hover:not-disabled:bg-wash aria-pressed:bg-ink aria-pressed:text-paper"
    >
      {done ? "Completed" : `Mark complete · +${xp} XP`}
    </button>
  );
}
