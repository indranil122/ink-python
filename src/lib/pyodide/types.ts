export type RunResult = {
  output: string;
  error: string;
  ok: boolean;
  timedOut: boolean;
};

export type TestCaseResult = {
  name: string;
  passed: boolean;
  message: string;
  source: string;
};

export type TestResult = RunResult & {
  tests: TestCaseResult[];
  passed: number;
  total: number;
  status: "ok" | "solution_error" | "tests_error";
};

export type WorkerRequest =
  | { id: string; type: "preload" }
  | { id: string; type: "run"; code: string }
  | { id: string; type: "test"; code: string; tests: string };

export type RawTestPayload = {
  status?: string;
  output?: string;
  error?: string;
  tests?: TestCaseResult[];
};

export function normalizeTestResult(
  raw: unknown,
  timedOut = false,
): TestResult {
  const payload = (raw ?? {}) as RawTestPayload;
  const tests = Array.isArray(payload.tests) ? payload.tests : [];
  const passed = tests.filter((test) => test.passed).length;
  const total = tests.length;
  const status = (payload.status ?? "ok") as TestResult["status"];

  return {
    output: payload.output ?? "",
    error: payload.error ?? "",
    tests,
    passed,
    total,
    status,
    ok: !timedOut && status === "ok" && total > 0 && passed === total,
    timedOut,
  };
}

export type WorkerResponse =
  | { id: string; type: "load-progress"; message: string }
  | { id: string; type: "ready" }
  | { id: string; type: "load-error"; message: string }
  | { id: string; type: "run-result"; result: RunResult }
  | { id: string; type: "test-result"; result: TestResult };
