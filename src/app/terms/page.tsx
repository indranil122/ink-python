import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/button";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of use for the Ink site, source code and course materials.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-5 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
        Terms of use
      </h1>
      <p className="measure mt-6 leading-relaxed text-ink-60">
        Effective date: 24 September 2026. These terms govern your use of Ink,
        the source code in this repository and the course materials made
        available through them. This page mirrors the repository&apos;s{" "}
        <code className="font-mono text-sm">TERMS.md</code> file.
      </p>

      <section className="mt-12 border-t border-rule pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">The service</h2>
        <p className="measure mt-4 leading-relaxed text-ink-60">
          Ink is a free, non-commercial, static Python course providing lessons,
          exercises, an in-browser Python runtime and local progress tracking.
          There is no account system, paid tier, warranty of availability or
          service level commitment.
        </p>
      </section>

      <section className="mt-10 border-t border-rule pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Educational purpose
        </h2>
        <p className="measure mt-4 leading-relaxed text-ink-60">
          The content is general education, not professional, academic, legal or
          technical advice. Practice current language and security documentation
          before applying concepts in production systems.
        </p>
      </section>

      <section className="mt-10 border-t border-rule pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">Licences</h2>
        <p className="measure mt-4 leading-relaxed text-ink-60">
          Software is licensed under the{" "}
          <a
            href="https://github.com/indranil122/ink-python/blob/main/LICENSE"
            className="underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            MIT License
          </a>
          . Original course content is licensed under{" "}
          <a
            href="https://github.com/indranil122/ink-python/blob/main/CONTENT-LICENSE.md"
            className="underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            CC BY-NC-SA 4.0
          </a>
          . Third-party material remains under its original licence and is
          credited on the credits page and in{" "}
          <code className="font-mono text-sm">THIRD_PARTY_NOTICES.md</code>.
        </p>
      </section>

      <section className="mt-10 border-t border-rule pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Acceptable use
        </h2>
        <p className="measure mt-4 leading-relaxed text-ink-60">
          Use Ink for personal, classroom and other lawful non-commercial
          learning purposes. Do not disrupt the service, remove attribution,
          submit malicious code, or relicense third-party material. Code you
          type into the exercise editor remains yours; it is executed and stored
          locally and is not transferred to Ink.
        </p>
      </section>

      <section className="mt-10 border-t border-rule pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          No warranty and limitation of liability
        </h2>
        <p className="measure mt-4 leading-relaxed text-ink-60">
          The site, source code and content are provided &quot;as is&quot;
          without warranty of any kind. To the maximum extent permitted by law,
          maintainers and contributors are not liable for damages arising from
          your use of the site, content or repository.
        </p>
      </section>

      <section className="mt-10 border-t border-rule pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">Changes</h2>
        <p className="measure mt-4 leading-relaxed text-ink-60">
          These terms may be updated by changing the repository file and the
          effective date. Continued use after a change means you accept the
          revised terms. Security issues must follow the repository&apos;s
          security policy.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/privacy" className={buttonClass({ variant: "outline" })}>
          Privacy policy
        </Link>
        <Link href="/" className={buttonClass()}>
          Back to Ink
        </Link>
      </div>
    </div>
  );
}
