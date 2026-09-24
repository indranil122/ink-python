/// <reference lib="webworker" />

import { pyodideIndexUrl, pyodideModuleUrl } from "./config";
import { pythonHarness } from "./harness";
import type { RunResult, WorkerRequest, WorkerResponse } from "./types";
import { normalizeTestResult } from "./types";

type PyodideInstance = {
  runPython: (code: string) => unknown;
  globals: { set: (key: string, value: string) => void };
};

const scope = self as unknown as DedicatedWorkerGlobalScope;

let runtime: PyodideInstance | null = null;
let loading: Promise<PyodideInstance> | null = null;

function post(message: WorkerResponse) {
  scope.postMessage(message);
}

function parseResult<T>(raw: unknown): T {
  if (typeof raw !== "string") {
    throw new Error("Unexpected runtime response");
  }

  return JSON.parse(raw) as T;
}

async function getRuntime(): Promise<PyodideInstance> {
  if (runtime) {
    return runtime;
  }

  if (!loading) {
    loading = (async () => {
      post({
        id: "boot",
        type: "load-progress",
        message: "Fetching Python runtime",
      });
      const pyodideModule = (await import(
        /* turbopackIgnore: true */ pyodideModuleUrl
      )) as {
        loadPyodide: (options: {
          indexURL: string;
        }) => Promise<PyodideInstance>;
      };
      post({
        id: "boot",
        type: "load-progress",
        message: "Starting interpreter",
      });
      const instance = await pyodideModule.loadPyodide({
        indexURL: pyodideIndexUrl,
      });
      instance.runPython(pythonHarness);
      return instance;
    })();
  }

  runtime = await loading;
  return runtime;
}

scope.addEventListener("message", (event: MessageEvent<WorkerRequest>) => {
  const request = event.data;

  void (async () => {
    try {
      const instance = await getRuntime();

      if (request.type === "preload") {
        post({ id: request.id, type: "ready" });
        return;
      }

      if (request.type === "run") {
        instance.globals.set("ink_source", request.code);
        const raw = instance.runPython("_ink_run_code(ink_source)");
        post({
          id: request.id,
          type: "run-result",
          result: parseResult<RunResult>(raw),
        });
        return;
      }

      instance.globals.set("ink_source", request.code);
      instance.globals.set("ink_tests", request.tests);
      const raw = instance.runPython("_ink_run_tests(ink_source, ink_tests)");
      post({
        id: request.id,
        type: "test-result",
        result: normalizeTestResult(parseResult(raw)),
      });
    } catch (error) {
      post({
        id: request.id,
        type: "load-error",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  })();
});
