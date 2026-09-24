import fs from "node:fs";

const tests = fs.readFileSync(
  ".cache/exercism-python/exercises/practice/gigasecond/gigasecond_test.py",
  "utf8",
);

const stdlibModules = new Set(["unittest", "datetime"]);
const localDefinitions = new Set();

for (const match of tests.matchAll(
  /^[ \t]*(?:def|class)\s+([A-Za-z_][A-Za-z0-9_]*)/gm,
)) {
  localDefinitions.add(match[1]);
}

console.log("local definitions:", [...localDefinitions].join(", "));

const fromImport =
  /^[ \t]*from\s+([A-Za-z_][A-Za-z0-9_]*)\s+import\s+\(?([^)]*)\)?/gm;

for (const match of tests.matchAll(fromImport)) {
  console.log(
    "from-import:",
    JSON.stringify(match[1]),
    JSON.stringify(match[2]),
  );
  if (stdlibModules.has(match[1])) {
    console.log("  -> stdlib, skipped");
  }
}
