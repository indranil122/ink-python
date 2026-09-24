export const xpAwards = {
  lesson: 10,
  exercise: 25,
  noHintsBonus: 15,
  moduleComplete: 100,
  streakDay: 5,
  streakDayMax: 50,
} as const;

export type XpKind =
  "lesson" | "exercise" | "no_hints_bonus" | "module_complete" | "streak_day";

export type XpEventInput = {
  userId: string;
  kind: XpKind;
  amount: number;
  referenceId: string;
  idempotencyKey: string;
};

export function streakAward(streakDay: number): number {
  if (streakDay < 1) {
    return 0;
  }

  return Math.min(xpAwards.streakDay * streakDay, xpAwards.streakDayMax);
}

export function exerciseAward(options: { noHints: boolean }): number {
  return options.noHints
    ? xpAwards.exercise + xpAwards.noHintsBonus
    : xpAwards.exercise;
}
