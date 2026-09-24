import type { MetadataRoute } from "next";
import { getAllExercises, getAllLessons } from "@/lib/content/load";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

function pageUrl(pathname: string): string {
  if (pathname === "") {
    return absoluteUrl("/");
  }

  return absoluteUrl(`${pathname}/`);
}

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
      url: pageUrl(route),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...lessons.map((lesson) => ({
      url: pageUrl(`/learn/${lesson.track}/${lesson.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...exercises.map((exercise) => ({
      url: pageUrl(`/learn/${exercise.track}/exercises/${exercise.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
