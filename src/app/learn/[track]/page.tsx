import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonClass } from "@/components/button";
import { getTrackExercises, getTrackLessons } from "@/lib/content/load";
import { tracks } from "@/lib/curriculum";

type TrackPageProps = PageProps<"/learn/[track]">;

export function generateStaticParams() {
  return tracks.map((track) => ({ track: track.slug }));
}

export async function generateMetadata(
  props: TrackPageProps,
): Promise<Metadata> {
  const { track: slug } = await props.params;
  const track = tracks.find((candidate) => candidate.slug === slug);

  if (!track) {
    return { title: "Track not found" };
  }

  return {
    title: track.title,
    description: track.blurb,
  };
}

export default async function TrackPage(props: TrackPageProps) {
  const { track: slug } = await props.params;
  const track = tracks.find((candidate) => candidate.slug === slug);

  if (!track) {
    notFound();
  }

  const position = tracks.findIndex((candidate) => candidate.slug === slug);
  const next = tracks[position + 1];
  const lessons = getTrackLessons(track.slug);
  const exercises = getTrackExercises(track.slug);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="eyebrow">
        Track {String(track.order).padStart(2, "0")} of {tracks.length}
      </p>
      <h1 className="mt-5 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
        {track.title}
      </h1>
      <p className="measure mt-6 text-lg leading-relaxed text-ink-60">
        {track.blurb}
      </p>

      <dl className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-6">
        {[
          { term: "Published lessons", detail: lessons.length },
          { term: "Published exercises", detail: exercises.length },
          {
            term: "Available XP",
            detail:
              lessons.reduce((total, lesson) => total + lesson.xp, 0) +
              exercises.reduce((total, exercise) => total + exercise.xp, 0),
          },
          { term: "Planned lessons", detail: track.lessons },
          { term: "Planned exercises", detail: track.exercises },
          { term: "Planned XP", detail: track.xp },
        ].map((stat) => (
          <div key={stat.term} className="bg-paper p-5">
            <dt className="eyebrow">{stat.term}</dt>
            <dd className="tnum mt-2 font-mono text-2xl font-medium">
              {stat.detail}
            </dd>
          </div>
        ))}
      </dl>

      {lessons.length > 0 ? (
        <section className="mt-16">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-2xl font-semibold tracking-tight">Lessons</h2>
            <p className="eyebrow">
              {lessons.length} published · {track.lessons - lessons.length} more
              planned
            </p>
          </div>

          <ol className="mt-6 border-t border-rule">
            {lessons.map((lesson) => (
              <li
                key={lesson.slug}
                className="grid gap-2 border-b border-rule py-5 md:grid-cols-[3rem_1fr_auto] md:items-baseline md:gap-6"
              >
                <span className="tnum font-mono text-xs text-ink-40">
                  {String(lesson.order).padStart(2, "0")}
                </span>
                <Link
                  href={`/learn/${track.slug}/${lesson.slug}`}
                  className="text-lg font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {lesson.title}
                </Link>
                <span className="tnum font-mono text-xs text-ink-40">
                  {lesson.minutes} min · {lesson.xp} XP
                </span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {exercises.length > 0 ? (
        <section className="mt-16">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-2xl font-semibold tracking-tight">Exercises</h2>
            <p className="eyebrow">
              {exercises.length} published ·{" "}
              {track.exercises - exercises.length} more planned
            </p>
          </div>

          <ul className="mt-6 border-t border-rule">
            {exercises.map((exercise) => (
              <li
                key={exercise.slug}
                className="grid gap-2 border-b border-rule py-5 md:grid-cols-[3rem_1fr_auto] md:items-baseline md:gap-6"
              >
                <span className="tnum font-mono text-xs text-ink-40">
                  {String(exercise.order).padStart(2, "0")}
                </span>
                <Link
                  href={`/learn/${track.slug}/exercises/${exercise.slug}`}
                  className="text-lg font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {exercise.title}
                </Link>
                <span className="tnum font-mono text-xs text-ink-40">
                  {exercise.difficulty} · {exercise.xp} XP
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {lessons.length === 0 && exercises.length === 0 ? (
        <div className="relative mt-12 overflow-hidden border border-rule p-10">
          <div className="hatch absolute inset-0" aria-hidden="true" />
          <div className="relative max-w-[52ch]">
            <p className="eyebrow">In authoring</p>
            <p className="mt-4 text-lg font-medium">
              This track is being written and checked line by line.
            </p>
            <p className="mt-3 leading-relaxed text-ink-60">
              Every lesson is authored against the sources listed on the credits
              page, with runnable examples and tests, before it is published
              here. The first track ships complete.
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/learn" className={buttonClass({ variant: "outline" })}>
          All tracks
        </Link>
        {next ? (
          <Link href={`/learn/${next.slug}`} className={buttonClass()}>
            Next: {next.title}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
