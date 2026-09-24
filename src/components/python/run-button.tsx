"use client";

import { useState } from "react";
import { usePython } from "./python-provider";

export function RunButton({ code }: { code: string }) {
  const { run, status, preload } = usePython();
  const [busy, setBusy] = useState(false);

  const loading = status === "loading";

  return (
    <button
      type="button"
      onPointerEnter={preload}
      onFocus={preload}
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          await run(code);
        } finally {
          setBusy(false);
        }
      }}
      className="border border-ink bg-ink px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-paper uppercase transition-colors hover:bg-ink-80 disabled:cursor-progress disabled:opacity-70"
    >
      {busy ? (loading ? "Loading" : "Running") : "Run"}
    </button>
  );
}
