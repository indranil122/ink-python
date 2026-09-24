import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx";
import { ConsolePanel } from "@/components/python/console-panel";
import { ExerciseWorkbench } from "@/components/python/exercise-workbench";
import { PythonProvider } from "@/components/python/python-provider";
import {
  getAllExercises,
  getExercise,
  getTrackExercises,
} from "@/lib/content/load";
import { tracks } from "@/lib/curriculum";

type ExercisePageProps = PageProps<"/learn/[track]/exercises/[exercise]">;

export function generateStaticParams() {
  return getAllExercises().map((exercise) => ({
    track: exercise.track,
    exercise: exercise.slug,
  }));
}

export async function generateMetadata(
  props: ExercisePageProps,
): Promise<Metadata> {
  const { track, exercise: exerciseSlug } = await props.params;
  const exercise = getExercise(track, exerciseSlug);

  if (!exercise) {
    return { title: "Exercise not found" };
  }

  return {
    title: exercise.title,
    description: exercise.summary,
  };
}

export default async function ExercisePage(props: ExercisePageProps) {
  const { track: trackSlug, exercise: exerciseSlug } = await props.params;
  const exercise = getExercise(trackSlug, exerciseSlug);

  if (!exercise) {
    notFound();
  }

  const track = tracks.find((candidate) => candidate.slug === trackSlug);
  const siblings = getTrackExercises(trackSlug);
  const position = siblings.findIndex(
    (sibling) => sibling.slug === exercise.slug,
  );
  const next = siblings[position + 1];

  const { content } = await compileMDX({
    source: exercise.prompt,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: {
                className: "heading-anchor",
                ariaLabel: "Link to this section",
              },
              content: { type: "text", value: "#" },
            },
          ],
        ],
      },
    },
  });

  return (
    <PythonProvider>
      <div className="mx-auto max-w-6xl px-6 py-14">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-ink-40 uppercase"
        >
          <Link href="/learn" className="hover:text-ink">
            Curriculum
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/learn/${trackSlug}`} className="hover:text-ink">
            {track?.title ?? trackSlug}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink">
            Exercise {String(exercise.order).padStart(2, "0")}
          </span>
        </nav>

        <header className="mt-8 border-b border-rule pb-10">
          <p className="eyebrow">Exercise</p>
          <h1 className="mt-4 max-w-[22ch] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
            {exercise.title}
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed text-ink-60">
            {exercise.summary}
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { term: "Difficulty", detail: exercise.difficulty },
              { term: "Reward", detail: `${exercise.xp} XP` },
              { term: "Function", detail: exercise.functionName },
            ].map((item) => (
              <div key={item.term}>
                <dt className="eyebrow">{item.term}</dt>
                <dd className="tnum mt-1.5 font-mono text-sm">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-12 gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_28rem]">
          <div className="prose-ink min-w-0">{content}</div>

          <div className="mt-16 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <ExerciseWorkbench
                exerciseSlug={exercise.slug}
                track={trackSlug}
                starter={exercise.starter}
                tests={exercise.tests}
                xp={exercise.xp}
              />
              <p className="mt-4 text-sm leading-relaxed text-ink-60">
                Your draft is saved on this device. Press{" "}
                <span className="font-mono">Ctrl</span> +{" "}
                <span className="font-mono">Enter</span> to run the tests.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-16 border-t border-rule pt-8">
          <h2 className="eyebrow">Cited sources</h2>
          <ul className="mt-4 space-y-3">
            {exercise.sources.map((source) => (
              <li key={source.url} className="text-sm leading-relaxed">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {source.title}
                </a>
                <span className="text-ink-60"> — {source.author}</span>
                <a
                  href={source.licenseUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="ml-2 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-40 uppercase underline decoration-1 underline-offset-4 hover:text-ink"
                >
                  {source.license}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {next ? (
          <nav
            aria-label="Exercise navigation"
            className="mt-12 border-t border-rule pt-8"
          >
            <p className="eyebrow">Next exercise</p>
            <Link
              href={`/learn/${trackSlug}/exercises/${next.slug}`}
              className="mt-3 inline-block text-lg font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              {next.title}
            </Link>
          </nav>
        ) : null}
      </div>
      <ConsolePanel />
    </PythonProvider>
  );
}
