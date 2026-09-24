"use client";

import { useEffect } from "react";

export default function PageError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <p className="eyebrow">Something broke</p>
      <h1 className="mt-5 text-[clamp(2rem,5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
        This page failed to render.
      </h1>
      <p className="mt-6 leading-relaxed text-ink-60">
        The Python runtime and your saved progress are safe. Try again, and if
        it keeps happening the content pipeline may have changed under a running
        build.
      </p>
      <button
        type="button"
        onClick={retry}
        className="mt-8 inline-flex h-11 items-center border border-ink bg-ink px-6 font-mono text-[0.6875rem] tracking-[0.14em] text-paper uppercase"
      >
        Try again
      </button>
    </div>
  );
}
