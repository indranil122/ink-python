"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      }}
      className="border border-rule px-2 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-ink-60 uppercase transition-colors hover:border-ink hover:text-ink"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
