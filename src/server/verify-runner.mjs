import process from "node:process";
import { loadPyodide } from "pyodide";

const resultMarker = "__INK_RESULT__";
const errorMarker = "__INK_ERROR__";

function emit(marker, payload) {
  process.stdout.write(`${marker}${JSON.stringify(payload)}\n`);
}

async function main() {
  const chunks = [];

  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }

  const input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  const runtime = await loadPyodide();

  runtime.runPython(input.harness);
  runtime.globals.set("ink_source", input.code);
  runtime.globals.set("ink_tests", input.tests);
  const raw = runtime.runPython("_ink_run_tests(ink_source, ink_tests)");
  emit(resultMarker, JSON.parse(raw));
}

main().then(
  () => {
    process.exit(0);
  },
  (error) => {
    emit(errorMarker, {
      message: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  },
);
