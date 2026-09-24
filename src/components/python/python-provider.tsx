"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { executionTimeoutMs, loadTimeoutMs } from "@/lib/pyodide/config";
import type {
  RunResult,
  TestCaseResult,
  TestResult,
  WorkerRequest,
  WorkerResponse,
} from "@/lib/pyodide/types";

type RunnerStatus = "idle" | "loading" | "ready" | "running";

export type ConsoleEntry = {
  id: string;
  code: string;
  output: string;
  error: string;
  ok: boolean;
  timedOut: boolean;
  tests: TestCaseResult[];
  passed: number;
  total: number;
  at: number;
};

type PythonContextValue = {
  status: RunnerStatus;
  statusMessage: string;
  entries: ConsoleEntry[];
  clearEntries: () => void;
  preload: () => void;
  run: (code: string) => Promise<RunResult>;
  runTests: (code: string, tests: string) => Promise<TestResult>;
};

const PythonContext = createContext<PythonContextValue | null>(null);

const maxEntries = 12;

type PendingRequest = {
  settle: (response: WorkerResponse) => void;
  fail: (message: string) => void;
  timer: ReturnType<typeof setTimeout>;
};

export function PythonProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<RunnerStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [entries, setEntries] = useState<ConsoleEntry[]>([]);

  const workerRef = useRef<Worker | null>(null);
  const readyRef = useRef(false);
  const loadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const readyStateRef = useRef<{
    promise: Promise<void>;
    resolve: () => void;
    reject: (message: string) => void;
  } | null>(null);
  const pendingRef = useRef(new Map<string, PendingRequest>());
  const counterRef = useRef(0);

  const nextId = useCallback(() => {
    counterRef.current += 1;
    return `request-${counterRef.current}`;
  }, []);

  const stopWorker = useCallback((message: string) => {
    workerRef.current?.terminate();
    workerRef.current = null;
    readyRef.current = false;

    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current);
      loadTimerRef.current = null;
    }

    const readyState = readyStateRef.current;
    readyStateRef.current = null;
    readyState?.reject(message);

    for (const pending of pendingRef.current.values()) {
      clearTimeout(pending.timer);
      pending.fail(message);
    }

    pendingRef.current.clear();
    setStatus("idle");
    setStatusMessage(message);
  }, []);

  const ensureReady = useCallback((): Promise<void> => {
    if (readyRef.current && workerRef.current) {
      return Promise.resolve();
    }

    if (readyStateRef.current) {
      return readyStateRef.current.promise;
    }

    setStatus("loading");
    setStatusMessage("Fetching Python runtime");

    let resolveReady: () => void = () => undefined;
    let rejectReady: (message: string) => void = () => undefined;
    const readyPromise = new Promise<void>((resolve, reject) => {
      resolveReady = resolve;
      rejectReady = (message: string) => reject(new Error(message));
    });

    readyStateRef.current = {
      promise: readyPromise,
      resolve: resolveReady,
      reject: rejectReady,
    };

    const worker = new Worker(
      new URL("../../lib/pyodide/worker.ts", import.meta.url),
      { type: "module" },
    );
    workerRef.current = worker;

    loadTimerRef.current = setTimeout(() => {
      stopWorker("The Python runtime took too long to load.");
    }, loadTimeoutMs);

    worker.addEventListener(
      "message",
      (event: MessageEvent<WorkerResponse>) => {
        const response = event.data;

        if (response.type === "load-progress") {
          setStatusMessage(response.message);
          return;
        }

        if (response.type === "ready") {
          readyRef.current = true;
          setStatus("ready");
          setStatusMessage("Python ready");

          if (loadTimerRef.current) {
            clearTimeout(loadTimerRef.current);
            loadTimerRef.current = null;
          }

          readyStateRef.current?.resolve();
          readyStateRef.current = null;
          return;
        }

        if (response.type === "load-error") {
          stopWorker(response.message);
          return;
        }

        const pending = pendingRef.current.get(response.id);

        if (!pending) {
          return;
        }

        pendingRef.current.delete(response.id);
        clearTimeout(pending.timer);
        pending.settle(response);
      },
    );

    worker.addEventListener("error", () => {
      stopWorker("The Python runtime could not be started.");
    });

    worker.postMessage({
      id: nextId(),
      type: "preload",
    } satisfies WorkerRequest);

    return readyPromise;
  }, [nextId, stopWorker]);

  const execute = useCallback(
    async (request: WorkerRequest, timedOutResult: RunResult | TestResult) => {
      await ensureReady();

      return new Promise<RunResult | TestResult>((resolve, reject) => {
        const worker = workerRef.current;

        if (!worker) {
          reject(new Error("The Python runtime is not available."));
          return;
        }

        const timer = setTimeout(() => {
          stopWorker(
            "That run was stopped after five seconds. Check for a loop with no exit.",
          );
        }, executionTimeoutMs);

        pendingRef.current.set(request.id, {
          settle: (response) => {
            if (response.type === "run-result") {
              resolve(response.result);
              return;
            }

            if (response.type === "test-result") {
              resolve(response.result);
              return;
            }

            reject(new Error("Unexpected runtime response"));
          },
          fail: (message) => {
            resolve({
              ...timedOutResult,
              ok: false,
              error: message,
            });
          },
          timer,
        });

        setStatus("running");
        worker.postMessage(request);
      });
    },
    [ensureReady, stopWorker],
  );

  const pushEntry = useCallback((entry: ConsoleEntry) => {
    setEntries((current) => [entry, ...current].slice(0, maxEntries));
    setStatus("ready");
  }, []);

  const run = useCallback(
    async (code: string) => {
      const id = nextId();
      const result = (await execute(
        { id, type: "run", code },
        { output: "", error: "", ok: false, timedOut: true },
      )) as RunResult;

      pushEntry({
        id,
        code,
        output: result.output,
        error: result.error,
        ok: result.ok,
        timedOut: result.timedOut,
        tests: [],
        passed: 0,
        total: 0,
        at: Date.now(),
      });

      return result;
    },
    [execute, nextId, pushEntry],
  );

  const runTests = useCallback(
    async (code: string, tests: string) => {
      const id = nextId();
      const result = (await execute(
        { id, type: "test", code, tests },
        {
          output: "",
          error: "",
          ok: false,
          timedOut: true,
          tests: [],
          passed: 0,
          total: 0,
          status: "ok",
        },
      )) as TestResult;

      pushEntry({
        id,
        code,
        output: result.output,
        error: result.error,
        ok: result.ok && result.passed === result.total && result.total > 0,
        timedOut: result.timedOut,
        tests: result.tests ?? [],
        passed: result.passed ?? 0,
        total: result.total ?? 0,
        at: Date.now(),
      });

      return result;
    },
    [execute, nextId, pushEntry],
  );

  const preload = useCallback(() => {
    void ensureReady().catch(() => undefined);
  }, [ensureReady]);

  const clearEntries = useCallback(() => setEntries([]), []);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const value = useMemo<PythonContextValue>(
    () => ({
      status,
      statusMessage,
      entries,
      clearEntries,
      preload,
      run,
      runTests,
    }),
    [clearEntries, entries, preload, run, runTests, status, statusMessage],
  );

  return (
    <PythonContext.Provider value={value}>{children}</PythonContext.Provider>
  );
}

export function usePython(): PythonContextValue {
  const context = useContext(PythonContext);

  if (!context) {
    throw new Error("usePython must be used inside a PythonProvider");
  }

  return context;
}
