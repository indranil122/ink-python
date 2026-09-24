"use client";

import { useSyncExternalStore } from "react";
import { earnedBadges, type BadgeStats } from "@/lib/gamification/badges";
import { levelForXp } from "@/lib/gamification/levels";
import { exerciseAward, streakAward } from "@/lib/gamification/xp";
import {
  recordActivity,
  settleMissedDays,
  todayInTimezone,
} from "@/lib/gamification/streaks";

export type DayActivity = {
  lessons: number;
  exercises: number;
  xp: number;
};

export type Progress = {
  xp: number;
  streak: number;
  longestStreak: number;
  freezes: number;
  day: string | null;
  timezone: string;
  completedLessons: string[];
  completedExercises: string[];
  verifiedExercises: string[];
  activity: Record<string, DayActivity>;
};

export const emptyProgress: Progress = {
  xp: 0,
  streak: 0,
  longestStreak: 0,
  freezes: 1,
  day: null,
  timezone: "UTC",
  completedLessons: [],
  completedExercises: [],
  verifiedExercises: [],
  activity: {},
};

const storageKey = "ink:progress:v1";
const listeners = new Set<() => void>();
let cache: Progress | null = null;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function read(): Progress {
  if (cache) {
    return cache;
  }

  let stored: Partial<Progress> = {};

  try {
    const raw = window.localStorage.getItem(storageKey);
    stored = raw ? (JSON.parse(raw) as Partial<Progress>) : {};
  } catch {
    stored = {};
  }

  cache = { ...emptyProgress, ...stored };
  return cache;
}

function serverSnapshot(): Progress {
  return emptyProgress;
}

function write(next: Progress) {
  cache = next;
  window.localStorage.setItem(storageKey, JSON.stringify(next));
  for (const listener of listeners) {
    listener();
  }
}

function localTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

function bumpActivity(
  activity: Record<string, DayActivity>,
  day: string,
  change: Partial<DayActivity>,
): Record<string, DayActivity> {
  const current = activity[day] ?? { lessons: 0, exercises: 0, xp: 0 };

  return {
    ...activity,
    [day]: {
      lessons: current.lessons + (change.lessons ?? 0),
      exercises: current.exercises + (change.exercises ?? 0),
      xp: current.xp + (change.xp ?? 0),
    },
  };
}

function advanceDay(progress: Progress, today: string) {
  const timezone =
    progress.timezone === "UTC" ? localTimezone() : progress.timezone;
  const settled = settleMissedDays(
    {
      count: progress.streak,
      longest: progress.longestStreak,
      freezes: progress.freezes,
      lastActivityDay: progress.day,
    },
    today,
  );
  const next = recordActivity(settled, today);
  const firstActivityToday = progress.day !== today;

  return {
    timezone,
    streak: next.count,
    longestStreak: next.longest,
    freezes: next.freezes,
    day: next.lastActivityDay,
    streakXp: firstActivityToday ? streakAward(next.count) : 0,
  };
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, read, serverSnapshot);
}

export function completeLesson(lessonId: string, xp: number) {
  const progress = read();

  if (progress.completedLessons.includes(lessonId)) {
    return;
  }

  const today = todayInTimezone(
    progress.timezone === "UTC" ? localTimezone() : progress.timezone,
  );
  const day = advanceDay(progress, today);
  const gained = xp + day.streakXp;

  write({
    ...progress,
    ...day,
    xp: progress.xp + gained,
    completedLessons: [...progress.completedLessons, lessonId],
    activity: bumpActivity(progress.activity, today, {
      lessons: 1,
      xp: gained,
    }),
  });
}

export function completeExercise(
  exerciseId: string,
  options: { noHints: boolean; verified?: boolean },
) {
  const progress = read();

  if (progress.completedExercises.includes(exerciseId)) {
    if (options.verified && !progress.verifiedExercises.includes(exerciseId)) {
      write({
        ...progress,
        verifiedExercises: [...progress.verifiedExercises, exerciseId],
      });
    }
    return;
  }

  const today = todayInTimezone(
    progress.timezone === "UTC" ? localTimezone() : progress.timezone,
  );
  const day = advanceDay(progress, today);
  const award = exerciseAward({ noHints: options.noHints });
  const gained = award + day.streakXp;

  write({
    ...progress,
    ...day,
    xp: progress.xp + gained,
    completedExercises: [...progress.completedExercises, exerciseId],
    verifiedExercises: options.verified
      ? [...progress.verifiedExercises, exerciseId]
      : progress.verifiedExercises,
    activity: bumpActivity(progress.activity, today, {
      exercises: 1,
      xp: gained,
    }),
  });
}

export function markExerciseVerified(exerciseId: string) {
  const progress = read();

  if (progress.verifiedExercises.includes(exerciseId)) {
    return;
  }

  write({
    ...progress,
    verifiedExercises: [...progress.verifiedExercises, exerciseId],
  });
}

export function resetProgress() {
  write({ ...emptyProgress, timezone: localTimezone() });
}

export function progressStats(progress: Progress): BadgeStats {
  const today = todayInTimezone(progress.timezone);
  const todayEntry = progress.activity[today] ?? {
    lessons: 0,
    exercises: 0,
    xp: 0,
  };

  return {
    xp: progress.xp,
    streak: progress.streak,
    lessonsCompleted: progress.completedLessons.length,
    exercisesSolved: progress.completedExercises.length,
    exercisesSolvedToday: todayEntry.exercises,
    exercisesSolvedFirstTry: progress.verifiedExercises.length,
    exercisesSolvedNoHints: progress.completedExercises.length,
    modulesCompleted: 0,
    tracksStarted: new Set(
      progress.completedLessons.map((id) => id.split("/")[0]),
    ).size,
    dataExercisesSolved: 0,
    asyncExercisesSolved: 0,
    capstonesCompleted: 0,
  };
}

export function progressLevel(progress: Progress): number {
  return levelForXp(progress.xp);
}

export function progressBadges(progress: Progress) {
  return earnedBadges(progressStats(progress));
}

export function activeDays(progress: Progress): string[] {
  return Object.entries(progress.activity)
    .filter(([, entry]) => entry.lessons + entry.exercises > 0)
    .map(([day]) => day)
    .sort();
}
