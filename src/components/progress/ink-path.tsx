"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress/local";

export type PathLesson = {
  slug: string;
  title: string;
  order: number;
  id: string;
};

export type PathTrack = {
  slug: string;
  order: number;
  title: string;
  xp: number;
  lessons: PathLesson[];
};

export function InkPath({ tracks }: { tracks: PathTrack[] }) {
  const progress = useProgress();

  return (
    <div className="space-y-16">
      {tracks.map((track) => {
        const completed = track.lessons.filter((lesson) =>
          progress.completedLessons.includes(lesson.id),
        ).length;

        return (
          <section key={track.slug} id={track.slug}>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink pb-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                <span className="tnum mr-3 font-mono text-sm text-ink-40">
                  {String(track.order).padStart(2, "0")}
                </span>
                {track.title}
              </h2>
              <p className="tnum font-mono text-xs text-ink-40">
                {completed} / {track.lessons.length || "—"} published lessons ·{" "}
                {track.xp} XP available
              </p>
            </div>

            {track.lessons.length === 0 ? (
              <p className="mt-5 max-w-[60ch] leading-relaxed text-ink-60">
                This track is being written and checked line by line. Every
                lesson is authored against the sources on the credits page, with
                runnable examples and tests, before it is published.
              </p>
            ) : (
              <ol className="mt-6">
                {track.lessons.map((lesson, index) => {
                  const isDone = progress.completedLessons.includes(lesson.id);
                  const isNext = !isDone && index === completed;

                  return (
                    <li key={lesson.id} className="relative pl-10">
                      <span
                        aria-hidden="true"
                        className="absolute top-6 bottom-0 left-[0.3125rem] w-px bg-rule"
                      />
                      <span
                        aria-hidden="true"
                        className={`absolute top-5 left-0 size-[0.8125rem] ${
                          isDone
                            ? "bg-ink"
                            : isNext
                              ? "border border-ink bg-paper"
                              : "relative border border-rule bg-paper"
                        }`}
                      >
                        {isNext || isDone ? null : (
                          <span className="hatch absolute inset-0" />
                        )}
                      </span>
                      <Link
                        href={`/learn/${track.slug}/${lesson.slug}`}
                        className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule py-4 pl-0 transition-colors hover:bg-wash"
                      >
                        <span className="font-medium">
                          <span className="tnum mr-3 font-mono text-xs text-ink-40">
                            {String(lesson.order).padStart(2, "0")}
                          </span>
                          {lesson.title}
                        </span>
                        <span className="tnum font-mono text-xs text-ink-40">
                          {isDone ? "Completed" : "Not started"}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
        );
      })}
    </div>
  );
}
