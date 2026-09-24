import { describe, expect, it } from "vitest";
import { levelForXp, levelProgress, maxLevel, xpToReachLevel } from "./levels";

describe("level curve", () => {
  it("starts at level one with no XP", () => {
    expect(levelForXp(0)).toBe(1);
    expect(xpToReachLevel(1)).toBe(0);
  });

  it("reaches level two at one hundred XP", () => {
    expect(levelForXp(99)).toBe(1);
    expect(levelForXp(100)).toBe(2);
    expect(xpToReachLevel(2)).toBe(100);
  });

  it("is monotonic", () => {
    let previous = 0;
    for (let xp = 0; xp <= 6000; xp += 25) {
      const level = levelForXp(xp);
      expect(level).toBeGreaterThanOrEqual(previous);
      previous = level;
    }
  });

  it("never exceeds the maximum level", () => {
    expect(levelForXp(10_000_000)).toBe(maxLevel);
  });

  it("round trips every level boundary", () => {
    for (let level = 1; level <= maxLevel; level += 1) {
      expect(levelForXp(xpToReachLevel(level))).toBe(level);
    }
  });

  it("treats invalid input as level one", () => {
    expect(levelForXp(-50)).toBe(1);
    expect(levelForXp(Number.NaN)).toBe(1);
  });
});

describe("level progress", () => {
  it("reports the span to the next level", () => {
    const progress = levelProgress(100);
    expect(progress.level).toBe(2);
    expect(progress.currentLevelXp).toBe(100);
    expect(progress.nextLevelXp).toBe(xpToReachLevel(3));
    expect(progress.intoLevel).toBe(0);
    expect(progress.percent).toBe(0);
    expect(progress.isMaxLevel).toBe(false);
  });

  it("fills within a level", () => {
    const start = xpToReachLevel(3);
    const end = xpToReachLevel(4);
    const middle = levelProgress(Math.round((start + end) / 2));
    expect(middle.level).toBe(3);
    expect(middle.percent).toBeGreaterThan(40);
    expect(middle.percent).toBeLessThan(60);
  });

  it("caps at one hundred percent on the final level", () => {
    const max = levelProgress(xpToReachLevel(maxLevel));
    expect(max.isMaxLevel).toBe(true);
    expect(max.percent).toBe(100);
    expect(max.nextLevelXp).toBeNull();
  });
});
