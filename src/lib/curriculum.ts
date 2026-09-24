export type Track = {
  slug: string;
  order: number;
  title: string;
  blurb: string;
  lessons: number;
  exercises: number;
  xp: number;
};

export const tracks: Track[] = [
  {
    slug: "foundations",
    order: 1,
    title: "Foundations",
    blurb:
      "Syntax, values, control flow, and the habit of reading errors carefully.",
    lessons: 10,
    exercises: 18,
    xp: 650,
  },
  {
    slug: "data-structures",
    order: 2,
    title: "Data Structures",
    blurb: "Lists, tuples, dictionaries and sets, plus mutability and copying.",
    lessons: 9,
    exercises: 15,
    xp: 565,
  },
  {
    slug: "functions",
    order: 3,
    title: "Functions & Modules",
    blurb: "Parameters, scope, comprehensions, imports and reusable packages.",
    lessons: 9,
    exercises: 16,
    xp: 590,
  },
  {
    slug: "oop",
    order: 4,
    title: "Object-Oriented Python",
    blurb: "Classes, dunder methods, properties, dataclasses and iterators.",
    lessons: 9,
    exercises: 14,
    xp: 540,
  },
  {
    slug: "debugging",
    order: 5,
    title: "Errors, Debugging & Testing",
    blurb: "Tracebacks, exceptions, pytest and test-driven development.",
    lessons: 8,
    exercises: 12,
    xp: 480,
  },
  {
    slug: "files",
    order: 6,
    title: "Files, Serialization & Regex",
    blurb: "Paths, encodings, CSV, JSON and pattern matching with re.",
    lessons: 8,
    exercises: 14,
    xp: 530,
  },
  {
    slug: "stdlib",
    order: 7,
    title: "Stdlib & Tooling",
    blurb: "itertools, datetime, argparse, virtualenvs, logging, packaging.",
    lessons: 9,
    exercises: 14,
    xp: 540,
  },
  {
    slug: "concurrency",
    order: 8,
    title: "Concurrency & Async",
    blurb:
      "Threads, processes, asyncio and writing fast, non-blocking programs.",
    lessons: 7,
    exercises: 10,
    xp: 420,
  },
  {
    slug: "data",
    order: 9,
    title: "Data with NumPy & Pandas",
    blurb: "Arrays, DataFrames, cleaning, analysis and plotting.",
    lessons: 9,
    exercises: 14,
    xp: 540,
  },
  {
    slug: "web",
    order: 10,
    title: "Web & APIs",
    blurb: "HTTP, FastAPI, REST, databases and authentication basics.",
    lessons: 9,
    exercises: 12,
    xp: 490,
  },
  {
    slug: "projects",
    order: 11,
    title: "Capstone Projects",
    blurb: "Five portfolio-grade builds, from CLI tool to deployed API.",
    lessons: 8,
    exercises: 11,
    xp: 455,
  },
];

export const curriculumTotals = {
  tracks: tracks.length,
  lessons: tracks.reduce((total, track) => total + track.lessons, 0),
  exercises: tracks.reduce((total, track) => total + track.exercises, 0),
  xp: tracks.reduce((total, track) => total + track.xp, 0),
};
