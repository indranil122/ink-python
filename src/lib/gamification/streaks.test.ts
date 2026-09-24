import { describe, expect, it } from "vitest";
import {
  daysBetween,
  initialStreakState,
  isDayString,
  recordActivity,
  settleMissedDays,
  todayInTimezone,
} from "./streaks";

describe("day helpers", () => {
  it("validates day strings", () => {
    expect(isDayString("2026-09-24")).toBe(true);
    expect(isDayString("24-09-2026")).toBe(false);
    expect(isDayString("not-a-day")).toBe(false);
  });

  it("counts days across a month boundary", () => {
    expect(daysBetween("2026-09-30", "2026-10-01")).toBe(1);
    expect(daysBetween("2026-12-31", "2027-01-01")).toBe(1);
  });

  it("resolves today inside a timezone", () => {
    const instant = new Date("2026-09-24T02:00:00Z");
    expect(todayInTimezone("UTC", instant)).toBe("2026-09-24");
    expect(todayInTimezone("Asia/Kolkata", instant)).toBe("2026-09-24");
    expect(todayInTimezone("America/Los_Angeles", instant)).toBe("2026-09-23");
  });

  it("falls back to UTC for an invalid timezone", () => {
    const instant = new Date("2026-09-24T02:00:00Z");
    expect(todayInTimezone("Not/AZone", instant)).toBe("2026-09-24");
  });
});

describe("streaks", () => {
  it("starts on the first activity", () => {
    const next = recordActivity(initialStreakState, "2026-09-24");
    expect(next.count).toBe(1);
    expect(next.longest).toBe(1);
    expect(next.lastActivityDay).toBe("2026-09-24");
  });

  it("does not double count the same day", () => {
    const first = recordActivity(initialStreakState, "2026-09-24");
    const second = recordActivity(first, "2026-09-24");
    expect(second.count).toBe(1);
  });

  it("increments on consecutive days", () => {
    let state = recordActivity(initialStreakState, "2026-09-24");
    state = recordActivity(state, "2026-09-25");
    state = recordActivity(state, "2026-09-26");
    expect(state.count).toBe(3);
    expect(state.longest).toBe(3);
  });

  it("spends a freeze after one missed day", () => {
    let state = recordActivity(initialStreakState, "2026-09-24");
    state = recordActivity(state, "2026-09-26");
    expect(state.count).toBe(2);
    expect(state.freezes).toBe(0);
  });

  it("resets after two missed days", () => {
    let state = recordActivity(initialStreakState, "2026-09-24");
    state = { ...state, freezes: 0 };
    state = recordActivity(state, "2026-09-27");
    expect(state.count).toBe(1);
    expect(state.longest).toBe(1);
  });

  it("settles missed days without activity", () => {
    const state = recordActivity(initialStreakState, "2026-09-24");
    const settled = settleMissedDays(state, "2026-09-27");
    expect(settled.count).toBe(0);
    expect(settled.lastActivityDay).toBeNull();
  });

  it("keeps a streak that missed exactly one day with a freeze", () => {
    const state = recordActivity(initialStreakState, "2026-09-24");
    const settled = settleMissedDays(state, "2026-09-26");
    expect(settled.freezes).toBe(0);
    expect(settled.lastActivityDay).toBeNull();
  });
});
