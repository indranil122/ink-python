import "server-only";

import { spawn } from "node:child_process";
import path from "node:path";
import { pythonHarness } from "@/lib/pyodide/harness";
import { normalizeTestResult, type TestResult } from "@/lib/pyodide/types";

export const loadBudgetMs = 15_000;
export const executionBudgetMs = 5_000;

const resultMarker = "__INK_RESULT__";
const errorMarker = "__INK_ERROR__";

function timeoutResult(message: string): TestResult {
  return {
    output: "",
    error: message,
    ok: false,
    timedOut: true,
    tests: [],
    passed: 0,
    total: 0,
    status: "ok",
  };
}

export async function verifyOnServer(
  code: string,
  tests: string,
): Promise<TestResult> {
  return new Promise<TestResult>((resolve, reject) => {
    const scriptPath = path.join(process.cwd(), "src/server/verify-runner.mjs");
    const child = spawn(process.execPath, [scriptPath], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    let settled = false;

    const timer = setTimeout(
      () =>
        finish(() =>
          resolve(
            timeoutResult("Server verification timed out and was stopped."),
          ),
        ),
      loadBudgetMs + executionBudgetMs,
    );

    function finish(action: () => void) {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      child.kill();
      action();
    }

    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString("utf8");
    });

    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString("utf8");
    });

    child.on("error", (error) => finish(() => reject(error)));

    child.on("close", () => {
      const resultLine = stdout
        .split("\n")
        .find((line) => line.startsWith(resultMarker));
      const errorLine = stdout
        .split("\n")
        .find((line) => line.startsWith(errorMarker));

      if (resultLine) {
        const payload = resultLine.slice(resultMarker.length);
        finish(() => resolve(normalizeTestResult(JSON.parse(payload))));
        return;
      }

      if (errorLine) {
        const payload = errorLine.slice(errorMarker.length) as string;
        const parsed = JSON.parse(payload) as { message: string };
        finish(() => reject(new Error(parsed.message)));
        return;
      }

      const detail = stderr.trim().split("\n").slice(-3).join(" ");
      finish(() =>
        reject(new Error(detail || "Verification runtime produced no result")),
      );
    });

    child.stdin.end(
      JSON.stringify({
        harness: pythonHarness,
        code,
        tests,
      }),
    );
  });
}
