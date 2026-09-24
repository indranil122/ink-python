import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/button";

export const metadata: Metadata = {
  title: "Playground",
  description: "A free-form Python workspace that runs in your browser.",
};

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow">Playground</p>
      <h1 className="mt-5 max-w-[18ch] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
        A Python workspace with nothing to install.
      </h1>
      <p className="measure mt-6 text-lg leading-relaxed text-ink-60">
        The editor, console and test runner are being wired to the Pyodide
        runtime now. When it lands, every lesson, every exercise and this page
        will run Python 3.14 in a background worker in your browser.
      </p>

      <div className="mt-12 grid gap-px border border-rule bg-rule lg:grid-cols-2">
        <div className="relative min-h-72 overflow-hidden bg-paper p-6">
          <div className="hatch absolute inset-0" aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow">editor.py</p>
            <p className="mt-4 font-mono text-sm leading-relaxed text-ink-60">
              print(&quot;ready&quot;)
            </p>
          </div>
        </div>
        <div className="min-h-72 bg-paper p-6">
          <p className="eyebrow">console</p>
          <p className="mt-4 font-mono text-sm text-ink-40">
            Runtime not attached yet.
          </p>
          <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-ink-60">
            Runs are isolated: one worker per execution, a five second limit,
            and a hard stop if your code loops forever.
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/learn/foundations" className={buttonClass()}>
          Read Track 1 instead
        </Link>
        <Link href="/learn" className={buttonClass({ variant: "outline" })}>
          Back to curriculum
        </Link>
      </div>
    </div>
  );
}
