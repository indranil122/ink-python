import { describe, expect, it } from "vitest";
import { curriculumTotals, tracks } from "./curriculum";

describe("curriculum", () => {
  it("has unique slugs in contiguous order", () => {
    const slugs = tracks.map((track) => track.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(tracks.map((track) => track.order)).toEqual(
      tracks.map((_, index) => index + 1),
    );
  });

  it("derives totals from the track list", () => {
    expect(curriculumTotals).toEqual({
      tracks: tracks.length,
      lessons: tracks.reduce((total, track) => total + track.lessons, 0),
      exercises: tracks.reduce((total, track) => total + track.exercises, 0),
      xp: tracks.reduce((total, track) => total + track.xp, 0),
    });
  });

  it("matches the planned curriculum figures", () => {
    expect(curriculumTotals).toEqual({
      tracks: 11,
      lessons: 95,
      exercises: 150,
      xp: 5800,
    });
  });
});
