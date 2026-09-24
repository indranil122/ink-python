import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import type { ZodType } from "zod";
import {
  exerciseFrontmatterSchema,
  lessonFrontmatterSchema,
  type Exercise,
  type Heading,
  type Lesson,
} from "./schema";

export const contentRoot = path.join(process.cwd(), "content", "tracks");
const wordsPerMinute = 220;

export class ContentError extends Error {}

function listDirectories(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function listFiles(directory: string, extension: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => entry.name)
    .sort();
}

export function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, "").replace(/^\d+-/, "");
}

function extractHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of body.split("\n")) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }

    if (inFence) {
      continue;
    }

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);

    if (!match) {
      continue;
    }

    const text = match[2].replace(/`/g, "");
    headings.push({
      depth: match[1].length as 2 | 3,
      text,
      id: slugger.slug(text),
    });
  }

  return headings;
}

function countWords(body: string): number {
  const prose = body.replace(/```[\s\S]*?```/g, " ").replace(/<[^>]+>/g, " ");
  return prose.split(/\s+/).filter(Boolean).length;
}

function parseFrontmatter<T>(
  raw: string,
  filePath: string,
  schema: ZodType<T>,
): { data: T; content: string } {
  const { data, content } = matter(raw);
  const result = schema.safeParse(data);

  if (!result.success) {
    const issues = result.error.issues
      .map(
        (issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`,
      )
      .join("; ");

    throw new ContentError(`${filePath} — ${issues}`);
  }

  return { data: result.data, content };
}

function readLessonFile(trackSlug: string, filename: string): Lesson {
  const filePath = path.join(contentRoot, trackSlug, "lessons", filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = parseFrontmatter(
    raw,
    filePath,
    lessonFrontmatterSchema,
  );
  const wordCount = countWords(content);

  return {
    ...data,
    track: trackSlug,
    slug: slugFromFilename(filename),
    body: content,
    headings: extractHeadings(content),
    wordCount,
    minutes: Math.max(1, Math.round(wordCount / wordsPerMinute)),
  };
}

function readRequiredFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    throw new ContentError(`${filePath} is missing or unreadable`);
  }
}

function readExerciseFolder(trackSlug: string, folder: string): Exercise {
  const directory = path.join(contentRoot, trackSlug, "exercises", folder);
  const promptPath = path.join(directory, "prompt.mdx");
  const starterPath = path.join(directory, "starter.py");
  const testsPath = path.join(directory, "tests.py");

  const raw = readRequiredFile(promptPath);
  const { data } = parseFrontmatter(raw, promptPath, exerciseFrontmatterSchema);

  return {
    ...data,
    track: trackSlug,
    slug: folder,
    prompt: matter(raw).content,
    starter: readRequiredFile(starterPath).replace(/\s*$/, "\n"),
    tests: readRequiredFile(testsPath).replace(/\s*$/, "\n"),
  };
}

export function readTrackSlugs(): string[] {
  return listDirectories(contentRoot).filter(
    (trackSlug) =>
      listFiles(path.join(contentRoot, trackSlug, "lessons"), ".mdx").length >
      0,
  );
}

export function readAllLessons(): Lesson[] {
  return readTrackSlugs().flatMap((trackSlug) =>
    listFiles(path.join(contentRoot, trackSlug, "lessons"), ".mdx").map(
      (filename) => readLessonFile(trackSlug, filename),
    ),
  );
}

export function readTrackLessons(trackSlug: string): Lesson[] {
  return readAllLessons()
    .filter((lesson) => lesson.track === trackSlug)
    .sort((left, right) => left.order - right.order);
}

export function readLesson(
  trackSlug: string,
  slug: string,
): Lesson | undefined {
  return readAllLessons().find(
    (lesson) => lesson.track === trackSlug && lesson.slug === slug,
  );
}

export function readAllExercises(): Exercise[] {
  return listDirectories(contentRoot).flatMap((trackSlug) =>
    listDirectories(path.join(contentRoot, trackSlug, "exercises")).map(
      (folder) => readExerciseFolder(trackSlug, folder),
    ),
  );
}

export function readTrackExercises(trackSlug: string): Exercise[] {
  return readAllExercises()
    .filter((exercise) => exercise.track === trackSlug)
    .sort((left, right) => left.order - right.order);
}

export function readExercise(
  trackSlug: string,
  slug: string,
): Exercise | undefined {
  return readAllExercises().find(
    (exercise) => exercise.track === trackSlug && exercise.slug === slug,
  );
}
