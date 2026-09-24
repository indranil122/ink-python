import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/button";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Ink stores progress locally and what network requests it makes.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-5 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
        Privacy policy
      </h1>
      <p className="measure mt-6 leading-relaxed text-ink-60">
        Effective date: 24 September 2026. Ink is a free, static educational
        site. This page is the same policy published in the repository&apos;s
        <code className="font-mono text-sm"> PRIVACY_POLICY.md</code> file.
      </p>

      <section className="mt-12 border-t border-rule pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">Summary</h2>
        <ul className="mt-5 list-disc space-y-3 pl-6 leading-relaxed text-ink-60">
          <li>
            There are no user accounts and no Ink database of personal data.
          </li>
          <li>
            Lesson progress, XP, streaks, badges, drafts and display preferences
            stay in your browser&apos;s{" "}
            <code className="font-mono text-sm">localStorage</code>.
          </li>
          <li>
            Ink itself does not use analytics, advertising, profiling or
            tracking cookies.
          </li>
          <li>
            Hosting providers and the pinned Pyodide CDN may receive standard
            technical request data under their own policies.
          </li>
        </ul>
      </section>

      <section className="mt-10 border-t border-rule pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Data stored on your device
        </h2>
        <p className="measure mt-4 leading-relaxed text-ink-60">
          Depending on the features you use, browser storage may include
          completed lessons and exercises, XP, level, streak, badge and activity
          data, exercise drafts, and reading or type-scale preferences. This
          data stays in the browser profile that created it and is not sent to
          an Ink server.
        </p>
        <p className="measure mt-4 leading-relaxed text-ink-60">
          You can clear site data at any time through your browser settings.
          Clearing it will remove locally saved progress and drafts.
        </p>
      </section>

      <section className="mt-10 border-t border-rule pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Network requests
        </h2>
        <p className="measure mt-4 leading-relaxed text-ink-60">
          Your browser may request static assets from the hosting provider, the
          pinned Pyodide runtime from jsDelivr, and any external links you open.
          Exercise code runs locally in your browser and is not uploaded to an
          Ink server.
        </p>
      </section>

      <section className="mt-10 border-t border-rule pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          What we do not collect
        </h2>
        <p className="measure mt-4 leading-relaxed text-ink-60">
          No names, emails or account credentials; no payment information; no
          advertising identifiers; no keystroke streams or files from your
          device beyond the code you type into the exercise editor.
        </p>
      </section>

      <section className="mt-10 border-t border-rule pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Children and contact
        </h2>
        <p className="measure mt-4 leading-relaxed text-ink-60">
          Because no personal data is submitted to Ink, no account or
          parental-consent workflow exists. Privacy questions can be sent to{" "}
          <a
            href="mailto:indranilchatterjee098@gmail.com"
            className="underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            indranilchatterjee098@gmail.com
          </a>{" "}
          or raised through the project&apos;s GitHub repository.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/terms" className={buttonClass({ variant: "outline" })}>
          Terms of use
        </Link>
        <Link href="/" className={buttonClass()}>
          Back to Ink
        </Link>
      </div>
    </div>
  );
}
