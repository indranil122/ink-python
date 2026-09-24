import { describe, expect, it } from "vitest";
import { normalizeTestResult } from "./types";

const passingTest = {
  name: "test_one",
  passed: true,
  message: "",
  source: "",
};

const failingTest = {
  name: "test_two",
  passed: false,
  message: "AssertionError",
  source: "assert greet('Ada') == 'Hello, Ada!'",
};

describe("normalizeTestResult", () => {
  it("counts passes and totals from the test list", () => {
    const result = normalizeTestResult({
      status: "ok",
      output: "",
      error: "",
      tests: [passingTest, passingTest, failingTest],
    });

    expect(result.total).toBe(3);
    expect(result.passed).toBe(2);
    expect(result.ok).toBe(false);
  });

  it("marks a clean run as passing", () => {
    const result = normalizeTestResult({
      status: "ok",
      tests: [passingTest, passingTest],
    });

    expect(result.ok).toBe(true);
    expect(result.timedOut).toBe(false);
  });

  it("never passes an empty run", () => {
    expect(normalizeTestResult({ status: "ok", tests: [] }).ok).toBe(false);
    expect(normalizeTestResult({}).ok).toBe(false);
    expect(normalizeTestResult(null).ok).toBe(false);
  });

  it("never passes a solution that failed to execute", () => {
    const result = normalizeTestResult({
      status: "solution_error",
      error: "NameError",
      tests: [],
    });

    expect(result.ok).toBe(false);
    expect(result.status).toBe("solution_error");
  });

  it("never passes a timed out run", () => {
    const result = normalizeTestResult(
      { status: "ok", tests: [passingTest] },
      true,
    );

    expect(result.ok).toBe(false);
    expect(result.timedOut).toBe(true);
  });

  it("defaults missing fields", () => {
    const result = normalizeTestResult({ tests: undefined });
    expect(result.output).toBe("");
    expect(result.error).toBe("");
    expect(result.tests).toEqual([]);
  });
});
