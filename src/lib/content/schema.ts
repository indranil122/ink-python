import { z } from "zod";

const urlString = z.string().refine(
  (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  { message: "Must be an absolute URL" },
);

export const sourceSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  url: urlString,
  license: z.string().min(1),
  licenseUrl: urlString,
});

export type Source = z.infer<typeof sourceSchema>;

export const lessonFrontmatterSchema = z.object({
  title: z.string().min(1),
  track: z.string().min(1),
  order: z.number().int().positive(),
  summary: z.string().min(1),
  xp: z.number().int().nonnegative().default(10),
  tags: z.array(z.string().min(1)).default([]),
  objectives: z.array(z.string().min(1)).default([]),
  sources: z.array(sourceSchema).min(1),
});

export type LessonFrontmatter = z.infer<typeof lessonFrontmatterSchema>;

export const exerciseFrontmatterSchema = z.object({
  title: z.string().min(1),
  track: z.string().min(1),
  order: z.number().int().positive(),
  summary: z.string().min(1),
  xp: z.number().int().nonnegative().default(25),
  difficulty: z.enum(["easy", "medium", "hard"]),
  functionName: z.string().regex(/^[A-Za-z_][A-Za-z0-9_]*$/),
  sources: z.array(sourceSchema).min(1),
});

export type ExerciseFrontmatter = z.infer<typeof exerciseFrontmatterSchema>;

export type Heading = {
  depth: 2 | 3;
  text: string;
  id: string;
};

export type Lesson = LessonFrontmatter & {
  slug: string;
  body: string;
  headings: Heading[];
  wordCount: number;
  minutes: number;
};

export type Exercise = ExerciseFrontmatter & {
  slug: string;
  prompt: string;
  starter: string;
  tests: string;
};
