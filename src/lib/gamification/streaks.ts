export type StreakState = {
  count: number;
  longest: number;
  freezes: number;
  lastActivityDay: string | null;
};

export const initialStreakState: StreakState = {
  count: 0,
  longest: 0,
  freezes: 1,
  lastActivityDay: null,
};

const dayPattern = /^\d{4}-\d{2}-\d{2}$/;

export function isDayString(value: string): boolean {
  if (!dayPattern.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime());
}

export function toDayNumber(day: string): number {
  const [year, month, date] = day.split("-").map(Number);
  return Date.UTC(year, month - 1, date) / 86_400_000;
}

export function todayInTimezone(
  timezone: string,
  now: Date = new Date(),
): string {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);
  } catch {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);
  }
}

export function daysBetween(from: string, to: string): number {
  return toDayNumber(to) - toDayNumber(from);
}

export function recordActivity(state: StreakState, today: string): StreakState {
  if (state.lastActivityDay === null) {
    return {
      ...state,
      count: 1,
      longest: Math.max(state.longest, 1),
      lastActivityDay: today,
    };
  }

  if (state.lastActivityDay === today) {
    return state;
  }

  const gap = daysBetween(state.lastActivityDay, today);

  if (gap === 1) {
    const count = state.count + 1;
    return {
      ...state,
      count,
      longest: Math.max(state.longest, count),
      lastActivityDay: today,
    };
  }

  if (gap === 2 && state.freezes > 0) {
    const count = state.count + 1;
    return {
      ...state,
      count,
      longest: Math.max(state.longest, count),
      freezes: state.freezes - 1,
      lastActivityDay: today,
    };
  }

  return {
    ...state,
    count: 1,
    longest: Math.max(state.longest, 1),
    lastActivityDay: today,
  };
}

export function settleMissedDays(
  state: StreakState,
  today: string,
): StreakState {
  if (state.lastActivityDay === null || state.lastActivityDay === today) {
    return state;
  }

  const gap = daysBetween(state.lastActivityDay, today);

  if (gap <= 1) {
    return state;
  }

  if (gap === 2 && state.freezes > 0) {
    return { ...state, freezes: state.freezes - 1, lastActivityDay: null };
  }

  return { ...state, count: 0, lastActivityDay: null };
}
