import { describe, expect, it } from "vitest";
import { badges, earnedBadges, type BadgeStats } from "./badges";
import { exerciseAward, streakAward, xpAwards } from "./xp";

const emptyStats: BadgeStats = {
  xp: 0,
  streak: 0,
  lessonsCompleted: 0,
  exercisesSolved: 0,
  exercisesSolvedToday: 0,
  exercisesSolvedFirstTry: 0,
  exercisesSolvedNoHints: 0,
  modulesCompleted: 0,
  tracksStarted: 0,
  dataExercisesSolved: 0,
  asyncExercisesSolved: 0,
  capstonesCompleted: 0,
};

describe("xp awards", () => {
  it("matches the published values", () => {
    expect(xpAwards.lesson).toBe(10);
    expect(xpAwards.exercise).toBe(25);
    expect(xpAwards.noHintsBonus).toBe(15);
    expect(xpAwards.moduleComplete).toBe(100);
  });

  it("adds the no hints bonus", () => {
    expect(exerciseAward({ noHints: false })).toBe(25);
    expect(exerciseAward({ noHints: true })).toBe(40);
  });

  it("grows the streak award and caps it", () => {
    expect(streakAward(1)).toBe(5);
    expect(streakAward(6)).toBe(30);
    expect(streakAward(20)).toBe(xpAwards.streakDayMax);
  });
});

describe("badges", () => {
  it("has unique slugs", () => {
    const ids = badges.map((badge) => badge.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("awards nothing to a new learner", () => {
    expect(earnedBadges(emptyStats)).toHaveLength(0);
  });

  it("awards the first badge after one lesson", () => {
    const earned = earnedBadges({ ...emptyStats, lessonsCompleted: 1 });
    expect(earned.map((badge) => badge.id)).toEqual(["first-light"]);
  });

  it("awards several badges for a strong profile", () => {
    const earned = earnedBadges({
      ...emptyStats,
      xp: 400,
      streak: 7,
      lessonsCompleted: 12,
      exercisesSolved: 20,
      exercisesSolvedFirstTry: 12,
      exercisesSolvedNoHints: 25,
      modulesCompleted: 1,
      dataExercisesSolved: 1,
    }).map((badge) => badge.id);

    expect(earned).toContain("first-light");
    expect(earned).toContain("seven");
    expect(earned).toContain("century");
    expect(earned).toContain("module-master");
    expect(earned).toContain("bug-squasher");
    expect(earned).toContain("no-hints");
    expect(earned).toContain("polyglot");
    expect(earned).toContain("data-touched");
    expect(earned).not.toContain("thirty");
  });

  it("reports progress towards an unfinished badge", () => {
    const speedrunner = badges.find((badge) => badge.id === "speedrunner");
    const progress = speedrunner?.progress({
      ...emptyStats,
      exercisesSolvedToday: 4,
    });
    expect(progress).toEqual({ current: 4, target: 10 });
  });
});
