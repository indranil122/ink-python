import type { MetadataRoute } from "next";
import { getAllExercises, getAllLessons } from "@/lib/content/load";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lessons = getAllLessons();
  const exercises = getAllExercises();

  const staticRoutes = [
    "",
    "/learn",
    "/playground",
    "/leaderboard",
    "/credits",
    "/privacy",
    "/terms",
    "/status",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...lessons.map((lesson) => ({
      url: absoluteUrl(`/learn/${lesson.track}/${lesson.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...exercises.map((exercise) => ({
      url: absoluteUrl(`/learn/${exercise.track}/exercises/${exercise.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
