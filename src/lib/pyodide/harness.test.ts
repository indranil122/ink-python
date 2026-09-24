import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { pythonHarness } from "./harness";

const candidates = ["python", "python3", "py"];

function findPython(): string | null {
  for (const candidate of candidates) {
    const probe = spawnSync(candidate, ["--version"], { encoding: "utf8" });

    if (probe.status === 0) {
      return candidate;
    }
  }

  return null;
}

const python = findPython();

function runHarness(snippet: string): string {
  const file = path.join(os.tmpdir(), "ink-harness-run.py");
  fs.writeFileSync(file, pythonHarness, "utf8");

  const driver = [
    "import json, sys",
    "namespace = {}",
    "exec(compile(open(sys.argv[1], encoding='utf-8').read(), 'harness', 'exec'), namespace)",
    "print(namespace['_ink_run_code'](sys.argv[2]))",
  ].join("; ");

  try {
    const result = spawnSync(python as string, ["-c", driver, file, snippet], {
      encoding: "utf8",
    });

    return result.stdout.trim();
  } finally {
    fs.rmSync(file, { force: true });
  }
}

describe("python harness", () => {
  it("exposes the entry points the runners call", () => {
    expect(pythonHarness).toContain("def _ink_run_code(");
    expect(pythonHarness).toContain("def _ink_run_tests(");
  });

  it("contains no escaped newlines that survive string interpolation", () => {
    expect(pythonHarness).not.toContain("\\\\n");
  });

  it.skipIf(!python)("compiles as valid Python", () => {
    const file = path.join(os.tmpdir(), "ink-harness-check.py");
    fs.writeFileSync(file, pythonHarness, "utf8");

    const checker = [
      "import py_compile, sys",
      "py_compile.compile(sys.argv[1], cfile=sys.argv[2], doraise=True)",
    ].join("; ");

    try {
      const result = spawnSync(
        python as string,
        ["-c", checker, file, `${file}.pyc`],
        { encoding: "utf8" },
      );

      expect(result.stderr).toBe("");
      expect(result.status).toBe(0);
    } finally {
      fs.rmSync(file, { force: true });
      fs.rmSync(`${file}.pyc`, { force: true });
    }
  });

  it.skipIf(!python)("captures output and reports errors", () => {
    expect(JSON.parse(runHarness("print(1 + 1)"))).toMatchObject({
      output: "2\n",
      ok: true,
    });
    expect(JSON.parse(runHarness("1 / 0")).ok).toBe(false);
  });
});
