import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 text-[clamp(2rem,5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
        That page does not exist.
      </h1>
      <p className="mt-6 leading-relaxed text-ink-60">
        The link may be from an older build, or the lesson has not been
        published yet.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/learn"
          className="inline-flex h-11 items-center border border-ink bg-ink px-6 font-mono text-[0.6875rem] tracking-[0.14em] text-paper uppercase"
        >
          Back to the curriculum
        </Link>
        <Link
          href="/credits"
          className="inline-flex h-11 items-center border border-ink px-6 font-mono text-[0.6875rem] tracking-[0.14em] uppercase"
        >
          Sources
        </Link>
      </div>
    </div>
  );
}
