import type { Metadata } from "next";
import { PreferenceHydrator } from "@/components/preference-hydrator";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCurriculumSummary } from "@/lib/content/load";
import { jetbrainsMono, newsreader } from "@/lib/fonts";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const summary = getCurriculumSummary();
const description = `A complete, gamified Python course: ${summary.lessons} lessons, ${summary.exercises} exercises and a real Python runtime in your browser. Built on open educational resources.`;

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ink",
  description,
  url: siteUrl,
  inLanguage: "en",
  isAccessibleForFree: true,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Ink",
  title: {
    default: "Ink — Learn Python from zero to professional",
    template: "%s — Ink",
  },
  description,
  keywords: [
    "learn python",
    "python course",
    "interactive python",
    "pyodide",
    "browser python",
    "python exercises",
    "open education",
    "gamified learning",
  ],
  authors: [{ name: "Indranil Chatterjee" }],
  category: "education",
  openGraph: {
    type: "website",
    siteName: "Ink",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-50 focus:border focus:border-ink focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-[0.14em] focus:uppercase"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <PreferenceHydrator />
      </body>
    </html>
  );
}
