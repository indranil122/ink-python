"use client";

import { useState } from "react";
import { usePython, type ConsoleEntry } from "./python-provider";

function StatusMark({ ok }: { ok: boolean }) {
  if (ok) {
    return (
      <span
        aria-hidden="true"
        className="mt-1 inline-block size-3 shrink-0 bg-ink text-center font-mono text-[0.5625rem] leading-3 text-paper"
      >
        ✓
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="relative mt-1 inline-block size-3 shrink-0 border border-ink"
    >
      <span className="hatch absolute inset-0" />
    </span>
  );
}

function Entry({ entry }: { entry: ConsoleEntry }) {
  return (
    <li className="border-t border-rule px-4 py-3">
      <div className="flex items-start gap-3">
        <StatusMark ok={entry.ok} />
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[0.625rem] tracking-[0.14em] text-ink-40 uppercase">
            {entry.tests.length > 0
              ? `${entry.passed}/${entry.total} tests passed`
              : entry.ok
                ? "Ran successfully"
                : "Stopped"}
          </p>

          {entry.output ? (
            <pre className="mt-2 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre-wrap">
              {entry.output.trimEnd()}
            </pre>
          ) : null}

          {entry.error ? (
            <pre className="mt-2 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre-wrap text-ink-60">
              {entry.error.trimEnd()}
            </pre>
          ) : null}

          {entry.tests.length > 0 ? (
            <ul className="mt-3 space-y-1.5">
              {entry.tests.map((test) => (
                <li key={test.name} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className={
                      test.passed
                        ? "mt-1 inline-block size-2 shrink-0 bg-ink"
                        : "relative mt-1 inline-block size-2 shrink-0 border border-ink"
                    }
                  >
                    {test.passed ? null : (
                      <span className="hatch absolute inset-0" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="font-mono text-xs">{test.name}</span>
                    {test.message || test.source ? (
                      <span className="block font-mono text-xs text-ink-60">
                        {test.source ? (
                          <span className="block">{test.source}</span>
                        ) : null}
                        {test.message ? (
                          <span className="block">{test.message}</span>
                        ) : null}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export function ConsolePanel() {
  const { entries, clearEntries, status, statusMessage } = usePython();
  const [collapsed, setCollapsed] = useState(false);

  const idle = entries.length === 0 && status !== "loading";

  if (idle && collapsed) {
    return null;
  }

  return (
    <section
      aria-label="Python console"
      className="fixed right-0 bottom-0 left-0 z-30 border-t border-ink bg-paper sm:right-4 sm:bottom-4 sm:left-auto sm:w-[27rem] sm:border"
    >
      <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-2.5">
        <p className="font-mono text-[0.625rem] tracking-[0.14em] text-ink-60 uppercase">
          {status === "loading"
            ? statusMessage
            : status === "running"
              ? "Running"
              : "Python 3.14 · in browser"}
        </p>
        <div className="flex items-center gap-3">
          {entries.length > 0 ? (
            <button
              type="button"
              onClick={clearEntries}
              className="font-mono text-[0.625rem] tracking-[0.14em] text-ink-40 uppercase hover:text-ink"
            >
              Clear
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            aria-expanded={!collapsed}
            className="font-mono text-[0.625rem] tracking-[0.14em] text-ink-40 uppercase hover:text-ink"
          >
            {collapsed ? "Show" : "Hide"}
          </button>
        </div>
      </div>

      {collapsed ? null : (
        <div className="max-h-[55vh] overflow-y-auto">
          {entries.length === 0 ? (
            <p className="px-4 py-6 text-sm leading-relaxed text-ink-60">
              Press <span className="font-mono">Run</span> on any Python block
              to execute it here. The first run downloads the interpreter once,
              then works offline.
            </p>
          ) : (
            <ul>
              {entries.map((entry) => (
                <Entry key={entry.id} entry={entry} />
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
