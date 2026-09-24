import "server-only";

import { cache } from "react";
import type { Exercise, Lesson } from "./schema";
import { readAllExercises, readAllLessons, readTrackSlugs } from "./read";

export { ContentError } from "./read";

export const getTracksWithLessons = cache(readTrackSlugs);

export const getAllLessons = cache(readAllLessons);

export const getLesson = cache(
  (trackSlug: string, slug: string): Lesson | undefined =>
    getAllLessons().find(
      (lesson) => lesson.track === trackSlug && lesson.slug === slug,
    ),
);

export const getTrackLessons = cache((trackSlug: string): Lesson[] =>
  getAllLessons()
    .filter((lesson) => lesson.track === trackSlug)
    .sort((left, right) => left.order - right.order),
);

export const getAllExercises = cache(readAllExercises);

export const getExercise = cache(
  (trackSlug: string, slug: string): Exercise | undefined =>
    getAllExercises().find(
      (exercise) => exercise.track === trackSlug && exercise.slug === slug,
    ),
);

export const getTrackExercises = cache((trackSlug: string): Exercise[] =>
  getAllExercises()
    .filter((exercise) => exercise.track === trackSlug)
    .sort((left, right) => left.order - right.order),
);

export type TrackSummary = {
  lessons: number;
  exercises: number;
  xp: number;
};

export type CurriculumSummary = {
  lessons: number;
  exercises: number;
  xp: number;
  byTrack: Record<string, TrackSummary>;
};

export const getCurriculumSummary = cache((): CurriculumSummary => {
  const lessons = getAllLessons();
  const exercises = getAllExercises();
  const byTrack: Record<string, TrackSummary> = {};

  function entry(trackSlug: string): TrackSummary {
    byTrack[trackSlug] ??= { lessons: 0, exercises: 0, xp: 0 };
    return byTrack[trackSlug];
  }

  for (const lesson of lessons) {
    const track = entry(lesson.track);
    track.lessons += 1;
    track.xp += lesson.xp;
  }

  for (const exercise of exercises) {
    const track = entry(exercise.track);
    track.exercises += 1;
    track.xp += exercise.xp;
  }

  return {
    lessons: lessons.length,
    exercises: exercises.length,
    xp:
      lessons.reduce((total, lesson) => total + lesson.xp, 0) +
      exercises.reduce((total, exercise) => total + exercise.xp, 0),
    byTrack,
  };
});
