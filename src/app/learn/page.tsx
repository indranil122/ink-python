import type { Metadata } from "next";
import { InkPath, type PathTrack } from "@/components/progress/ink-path";
import { getAllLessons, getCurriculumSummary } from "@/lib/content/load";
import { tracks } from "@/lib/curriculum";

const summary = getCurriculumSummary();

export const metadata: Metadata = {
  title: "Learn",
  description: `The published Python curriculum: eleven ordered tracks, ${summary.lessons} lessons and ${summary.exercises} exercises, with more planned.`,
};

export default function LearnPage() {
  const lessons = getAllLessons();
  const pathTracks: PathTrack[] = tracks.map((track) => ({
    slug: track.slug,
    order: track.order,
    title: track.title,
    xp: summary.byTrack[track.slug]?.xp ?? 0,
    lessons: lessons
      .filter((lesson) => lesson.track === track.slug)
      .sort((left, right) => left.order - right.order)
      .map((lesson) => ({
        slug: lesson.slug,
        title: lesson.title,
        order: lesson.order,
        id: `${lesson.track}/${lesson.slug}`,
      })),
  }));

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="eyebrow">Curriculum</p>
      <h1 className="mt-5 max-w-[20ch] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
        The whole path, in order.
      </h1>
      <p className="measure mt-6 text-lg leading-relaxed text-ink-60">
        Work top to bottom or jump to what you need. Each track ends with a
        module project, and every lesson is readable without an account.
      </p>

      <dl className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-4">
        {[
          { term: "Tracks", detail: tracks.length },
          { term: "Published lessons", detail: summary.lessons },
          { term: "Published exercises", detail: summary.exercises },
          { term: "XP available now", detail: summary.xp.toLocaleString() },
        ].map((stat) => (
          <div key={stat.term} className="bg-paper p-5">
            <dt className="eyebrow">{stat.term}</dt>
            <dd className="tnum mt-2 font-mono text-2xl font-medium">
              {stat.detail}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-20">
        <InkPath tracks={pathTracks} />
      </div>
    </div>
  );
}
