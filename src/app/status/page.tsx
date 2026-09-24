import type { Metadata } from "next";
import { getAllExercises, getAllLessons } from "@/lib/content/load";
import { curriculumTotals, tracks } from "@/lib/curriculum";
import { sources } from "@/lib/sources";
import { pyodideVersion } from "@/lib/config";

export const metadata: Metadata = {
  title: "Status",
  description: "What is in this build.",
};

export default function StatusPage() {
  const lessons = getAllLessons();
  const exercises = getAllExercises();

  const rows = [
    { term: "Python runtime", detail: `3.14 (pyodide ${pyodideVersion})` },
    { term: "Tracks published", detail: tracks.length },
    { term: "Lessons published", detail: lessons.length },
    { term: "Exercises published", detail: exercises.length },
    {
      term: "Planned curriculum",
      detail: `${curriculumTotals.tracks} tracks · ${curriculumTotals.lessons} lessons · ${curriculumTotals.exercises} exercises`,
    },
    {
      term: "Words",
      detail: `${lessons.reduce((total, lesson) => total + lesson.wordCount, 0).toLocaleString()} words`,
    },
    { term: "Sources cited", detail: sources.length },
    { term: "Backend", detail: "none — static build" },
    { term: "Accounts", detail: "none — progress stays in this browser" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow">Status</p>
      <h1 className="mt-5 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
        What is in this build.
      </h1>
      <p className="measure mt-6 text-lg leading-relaxed text-ink-60">
        Everything below is baked into the static files you just downloaded.
        There is no server to call and nothing to sign in to.
      </p>
      <dl className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.term} className="bg-paper p-5">
            <dt className="eyebrow">{row.term}</dt>
            <dd className="tnum mt-2 font-mono text-lg font-medium">
              {row.detail}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
