import fs from "node:fs";
import path from "node:path";
import { readAllExercises, readAllLessons } from "../../src/lib/content/read";

const lessons = readAllLessons();
const exercises = readAllExercises();

const trackSlugs = [...new Set(lessons.map((lesson) => lesson.track))];

const index = {
  generatedFrom: "content/tracks",
  tracks: trackSlugs.map((track) => ({
    slug: track,
    lessonCount: lessons.filter((lesson) => lesson.track === track).length,
    exerciseCount: exercises.filter((exercise) => exercise.track === track)
      .length,
    lessons: lessons
      .filter((lesson) => lesson.track === track)
      .sort((left, right) => left.order - right.order)
      .map((lesson) => ({
        slug: lesson.slug,
        title: lesson.title,
        order: lesson.order,
        summary: lesson.summary,
        xp: lesson.xp,
        minutes: lesson.minutes,
        tags: lesson.tags,
        headings: lesson.headings,
        sources: lesson.sources.map((source) => ({
          title: source.title,
          url: source.url,
          license: source.license,
        })),
      })),
    exercises: exercises
      .filter((exercise) => exercise.track === track)
      .sort((left, right) => left.order - right.order)
      .map((exercise) => ({
        slug: exercise.slug,
        title: exercise.title,
        order: exercise.order,
        summary: exercise.summary,
        xp: exercise.xp,
        difficulty: exercise.difficulty,
        functionName: exercise.functionName,
      })),
  })),
};

const target = path.join(process.cwd(), "public", "content-index.json");
fs.writeFileSync(target, `${JSON.stringify(index, null, 2)}\n`, "utf8");

console.log(
  `Wrote ${path.relative(process.cwd(), target)}: ${lessons.length} lesson(s), ${exercises.length} exercise(s).`,
);
