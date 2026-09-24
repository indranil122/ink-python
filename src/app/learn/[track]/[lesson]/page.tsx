import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx";
import { ConsolePanel } from "@/components/python/console-panel";
import { PythonProvider } from "@/components/python/python-provider";
import { CompleteLessonButton } from "@/components/progress/complete-lesson-button";
import { ReadingControls } from "@/components/reading-controls";
import { getAllLessons, getLesson, getTrackLessons } from "@/lib/content/load";
import { tracks } from "@/lib/curriculum";

type LessonPageProps = PageProps<"/learn/[track]/[lesson]">;

export function generateStaticParams() {
  return getAllLessons().map((lesson) => ({
    track: lesson.track,
    lesson: lesson.slug,
  }));
}

export async function generateMetadata(
  props: LessonPageProps,
): Promise<Metadata> {
  const { track, lesson: lessonSlug } = await props.params;
  const lesson = getLesson(track, lessonSlug);

  if (!lesson) {
    return { title: "Lesson not found" };
  }

  return {
    title: lesson.title,
    description: lesson.summary,
  };
}

export default async function LessonPage(props: LessonPageProps) {
  const { track: trackSlug, lesson: lessonSlug } = await props.params;
  const lesson = getLesson(trackSlug, lessonSlug);

  if (!lesson) {
    notFound();
  }

  const track = tracks.find((candidate) => candidate.slug === trackSlug);
  const siblings = getTrackLessons(trackSlug);
  const position = siblings.findIndex(
    (sibling) => sibling.slug === lesson.slug,
  );
  const previous = siblings[position - 1];
  const next = siblings[position + 1];

  const { content } = await compileMDX({
    source: lesson.body,
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
            Lesson {String(lesson.order).padStart(2, "0")}
          </span>
        </nav>

        <header className="mt-8 border-b border-rule pb-10">
          <p className="eyebrow">
            Lesson {String(lesson.order).padStart(2, "0")}
          </p>
          <h1 className="mt-4 max-w-[22ch] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
            {lesson.title}
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed text-ink-60">
            {lesson.summary}
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { term: "Reading time", detail: `${lesson.minutes} min` },
              { term: "Length", detail: `${lesson.wordCount} words` },
              { term: "Reward", detail: `${lesson.xp} XP` },
            ].map((item) => (
              <div key={item.term}>
                <dt className="eyebrow">{item.term}</dt>
                <dd className="tnum mt-1.5 font-mono text-sm">{item.detail}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <CompleteLessonButton
              lessonId={`${lesson.track}/${lesson.slug}`}
              xp={lesson.xp}
            />
          </div>
        </header>

        {lesson.objectives.length > 0 ? (
          <section className="mt-10 border border-rule p-6">
            <h2 className="eyebrow">In this lesson</h2>
            <ul className="mt-4 space-y-2 text-[0.9375rem] leading-relaxed text-ink-80">
              {lesson.objectives.map((objective) => (
                <li key={objective} className="flex gap-3">
                  <span aria-hidden="true" className="text-ink-40">
                    —
                  </span>
                  {objective}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-12 gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem]">
          <article className="prose-ink min-w-0">{content}</article>

          <aside className="mt-16 lg:mt-0">
            <div className="lg:sticky lg:top-24 lg:border-l lg:border-rule lg:pl-6">
              {lesson.headings.length > 0 ? (
                <nav aria-label="On this page">
                  <p className="eyebrow">On this page</p>
                  <ul className="mt-3">
                    {lesson.headings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className="toc-link"
                          data-depth={heading.depth}
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}

              <div className="mt-8 border-t border-rule pt-6">
                <p className="eyebrow">Reading</p>
                <div className="mt-3">
                  <ReadingControls />
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-16 border-t border-rule pt-8">
          <h2 className="eyebrow">Cited sources</h2>
          <ul className="mt-4 space-y-3">
            {lesson.sources.map((source) => (
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
          <p className="mt-6 max-w-[60ch] text-sm leading-relaxed text-ink-60">
            This lesson was written for this course. Where wording or structure
            follows an existing source, that source is named above and reused
            under its license.
          </p>
        </section>

        <nav
          aria-label="Lesson navigation"
          className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2"
        >
          <div className="bg-paper p-6">
            {previous ? (
              <>
                <p className="eyebrow">Previous</p>
                <Link
                  href={`/learn/${trackSlug}/${previous.slug}`}
                  className="mt-3 block text-lg font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {previous.title}
                </Link>
              </>
            ) : (
              <p className="text-sm text-ink-40">Start of the track</p>
            )}
          </div>
          <div className="bg-paper p-6 sm:text-right">
            {next ? (
              <>
                <p className="eyebrow">Next</p>
                <Link
                  href={`/learn/${trackSlug}/${next.slug}`}
                  className="mt-3 block text-lg font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {next.title}
                </Link>
              </>
            ) : (
              <p className="text-sm text-ink-40">End of the track</p>
            )}
          </div>
        </nav>
      </div>
      <ConsolePanel />
    </PythonProvider>
  );
}
