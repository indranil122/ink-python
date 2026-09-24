"use client";

import { useState } from "react";
import { serverVerificationEnabled } from "@/lib/config";
import { useStoredValue, writeStoredValue } from "@/lib/storage";
import type { TestResult } from "@/lib/pyodide/types";
import {
  completeExercise,
  markExerciseVerified,
  useProgress,
} from "@/lib/progress/local";
import { usePython } from "./python-provider";

type Props = {
  exerciseSlug: string;
  track: string;
  starter: string;
  tests: string;
  xp: number;
};

function TestRow({
  name,
  passed,
  message,
  source,
}: {
  name: string;
  passed: boolean;
  message: string;
  source: string;
}) {
  return (
    <li className="flex items-start gap-3 border-t border-rule py-2.5">
      <span
        aria-hidden="true"
        className={
          passed
            ? "mt-1 inline-block size-3 shrink-0 bg-ink"
            : "relative mt-1 inline-block size-3 shrink-0 border border-ink"
        }
      >
        {passed ? null : <span className="hatch absolute inset-0" />}
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[0.8125rem]">
          <span className="sr-only">{passed ? "Passed: " : "Failed: "}</span>
          {name}
        </span>
        {message || source ? (
          <span className="mt-1 block font-mono text-xs text-ink-60">
            {source ? <span className="block">{source}</span> : null}
            {message ? <span className="block">{message}</span> : null}
          </span>
        ) : null}
      </span>
    </li>
  );
}

export function ExerciseWorkbench({
  exerciseSlug,
  track,
  starter,
  tests,
  xp,
}: Props) {
  const draftKey = `ink:draft:${exerciseSlug}`;
  const recordId = `${track}/${exerciseSlug.replace(/^.*\//, "")}`;
  const code = useStoredValue(draftKey, starter);
  const { runTests, status } = usePython();
  const progress = useProgress();
  const [result, setResult] = useState<TestResult | null>(null);
  const [running, setRunning] = useState(false);
  const [showTests, setShowTests] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null);

  const allPassed =
    result !== null &&
    result.total > 0 &&
    result.passed === result.total &&
    result.ok;

  const recorded = progress.completedExercises.includes(recordId);
  const verified = progress.verifiedExercises.includes(recordId);

  const run = async () => {
    setRunning(true);
    try {
      const outcome = await runTests(code, tests);
      setResult(outcome);
    } finally {
      setRunning(false);
    }
  };

  const verify = async () => {
    setVerifying(true);
    setVerifyMessage(null);

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track, exercise: exerciseSlug, code }),
      });
      const payload = (await response.json()) as {
        verified?: boolean;
        passed?: boolean;
        error?: string;
      };

      if (response.ok && payload.verified) {
        markExerciseVerified(recordId);
        setVerifyMessage(
          payload.passed
            ? "Server confirmed every test."
            : "Server re-ran your code; some tests still fail.",
        );
        return;
      }

      setVerifyMessage(payload.error ?? "Server verification unavailable.");
    } catch {
      setVerifyMessage("Server verification unavailable.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <section aria-label="Exercise editor" className="border border-ink">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-4 py-2.5">
        <p className="font-mono text-[0.625rem] tracking-[0.14em] text-ink-60 uppercase">
          solution.py
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowTests((value) => !value)}
            aria-expanded={showTests}
            className="border border-rule px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-ink-60 uppercase transition-colors hover:border-ink hover:text-ink"
          >
            {showTests ? "Hide tests" : "Show tests"}
          </button>
          <button
            type="button"
            onClick={() => {
              writeStoredValue(draftKey, starter);
              setResult(null);
            }}
            className="border border-rule px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-ink-60 uppercase transition-colors hover:border-ink hover:text-ink"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="border border-ink bg-ink px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-paper uppercase transition-colors hover:bg-ink-80 disabled:cursor-progress disabled:opacity-70"
          >
            {running
              ? status === "loading"
                ? "Loading"
                : "Running"
              : "Run tests"}
          </button>
        </div>
      </div>

      <label className="sr-only" htmlFor={`editor-${exerciseSlug}`}>
        Your Python solution
      </label>
      <textarea
        id={`editor-${exerciseSlug}`}
        value={code}
        onChange={(event) => writeStoredValue(draftKey, event.target.value)}
        onKeyDown={(event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
            event.preventDefault();
            void run();
          }
        }}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        className="editor"
      />

      {showTests ? (
        <div className="border-t border-rule">
          <p className="px-4 py-2.5 font-mono text-[0.625rem] tracking-[0.14em] text-ink-40 uppercase">
            tests.py
          </p>
          <pre className="overflow-x-auto border-t border-rule px-4 py-4 font-mono text-[0.8125rem] leading-relaxed text-ink-80">
            {tests}
          </pre>
        </div>
      ) : null}

      {result ? (
        <div className="border-t border-ink">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <p className="font-mono text-[0.625rem] tracking-[0.14em] uppercase">
              {allPassed
                ? "All tests passed"
                : `${result.passed} of ${result.total} passed`}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {allPassed ? (
                <button
                  type="button"
                  onClick={() =>
                    completeExercise(recordId, { noHints: !showTests })
                  }
                  disabled={recorded}
                  aria-pressed={recorded}
                  className="border border-ink px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.14em] uppercase transition-colors hover:not-disabled:bg-wash aria-pressed:bg-ink aria-pressed:text-paper"
                >
                  {recorded ? "Recorded" : `Record · +${xp} XP`}
                </button>
              ) : null}
              {allPassed && serverVerificationEnabled ? (
                <button
                  type="button"
                  onClick={verify}
                  disabled={verifying || verified}
                  aria-pressed={verified}
                  className="border border-rule px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-ink-60 uppercase transition-colors hover:not-disabled:border-ink hover:not-disabled:text-ink disabled:opacity-60 aria-pressed:border-ink aria-pressed:text-ink"
                >
                  {verifying
                    ? "Verifying"
                    : verified
                      ? "Server verified"
                      : "Verify on server"}
                </button>
              ) : null}
            </div>
          </div>

          {allPassed && !serverVerificationEnabled ? (
            <p className="border-t border-rule px-4 py-2.5 font-mono text-xs text-ink-60">
              Checked by the Python runtime in this browser.
            </p>
          ) : null}

          {verifyMessage ? (
            <p className="border-t border-rule px-4 py-2.5 font-mono text-xs text-ink-60">
              {verifyMessage}
            </p>
          ) : null}

          {result.error ? (
            <pre className="overflow-x-auto border-t border-rule px-4 py-4 font-mono text-xs leading-relaxed text-ink-60">
              {result.error.trimEnd()}
            </pre>
          ) : null}

          {result.tests.length > 0 ? (
            <ul className="border-t border-rule px-4 pb-3">
              {result.tests.map((test) => (
                <TestRow
                  key={test.name}
                  name={test.name}
                  passed={test.passed}
                  message={test.message}
                  source={test.source}
                />
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
