import type { Metadata } from "next";
import { sources } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "Sources, authors and licenses behind every lesson and exercise on this site.",
};

export default function CreditsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="eyebrow">Credits</p>
      <h1 className="mt-5 max-w-[18ch] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
        Sources, authors, licenses.
      </h1>
      <div className="prose-ink mt-8">
        <p>
          This course is assembled from openly licensed teaching material. Every
          lesson and exercise on the site names the work it drew on, and
          adaptations are published under the terms of the original license.
        </p>
        <p>
          The site is free and non-commercial. No account is required to read or
          run anything, and nothing is sold.
        </p>
      </div>

      <ul className="mt-16 border-t border-rule">
        {sources.map((source) => (
          <li key={source.id} className="border-b border-rule py-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-lg font-medium underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                {source.title}
              </a>
              <a
                href={source.licenseUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-60 uppercase underline decoration-1 underline-offset-4 hover:text-ink hover:decoration-2"
              >
                {source.license}
              </a>
            </div>
            <p className="mt-2 text-sm text-ink-60">{source.author}</p>
            <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-ink-60">
              {source.usage}
            </p>
          </li>
        ))}
      </ul>

      <div className="prose-ink mt-16">
        <h2>How we handle licenses</h2>
        <ul>
          <li>
            Permissive work (MIT, Apache 2.0, PSF) is reused and adapted with
            the copyright notice kept intact.
          </li>
          <li>
            Creative Commons work is adapted only under its exact license, with
            attribution on the page and share-alike terms honoured where
            required.
          </li>
          <li>
            Non-commercial licenses are respected in full: the site charges
            nothing and carries no advertising.
          </li>
          <li>
            Where an exercise exists in several sources, we write the clearest
            version ourselves and cite every work consulted.
          </li>
        </ul>
      </div>
    </div>
  );
}
