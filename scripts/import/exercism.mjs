import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));

const repository = "https://github.com/exercism/python.git";
const defaultCache = path.join(process.cwd(), ".cache", "exercism-python");
const contentRoot = path.join(process.cwd(), "content", "tracks");
const stagedRoot = path.join(process.cwd(), "content", "staged");

const source = {
  title: "Exercism Python Track",
  author: "Exercism",
  url: "https://github.com/exercism/python",
  license: "MIT",
  licenseUrl: "https://opensource.org/license/mit",
};

const stdlibModules = new Set([
  "abc",
  "bisect",
  "collections",
  "copy",
  "csv",
  "datetime",
  "decimal",
  "enum",
  "fractions",
  "functools",
  "heapq",
  "io",
  "itertools",
  "json",
  "math",
  "operator",
  "os",
  "random",
  "re",
  "statistics",
  "string",
  "sys",
  "textwrap",
  "typing",
  "unittest",
  "pytest",
  "unicodedata",
]);

function parseArgs(argv) {
  const args = {
    track: "data-structures",
    dryRun: false,
    cache: defaultCache,
    allowPytest: false,
    limit: Number.POSITIVE_INFINITY,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--track") {
      args.track = argv[index + 1];
      index += 1;
    } else if (arg === "--limit") {
      args.limit = Number(argv[index + 1]);
      index += 1;
    } else if (arg === "--cache") {
      args.cache = path.resolve(argv[index + 1]);
      index += 1;
    } else if (arg === "--dry-run") {
      args.dryRun = true;
    } else if (arg === "--allow-pytest") {
      args.allowPytest = true;
    }
  }

  return args;
}

function ensureCheckout(cache) {
  if (fs.existsSync(path.join(cache, "exercises", "practice"))) {
    return cache;
  }

  fs.mkdirSync(path.dirname(cache), { recursive: true });
  execFileSync("git", ["clone", "--depth", "1", repository, cache], {
    stdio: "inherit",
  });

  return cache;
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function stripComments(markdown) {
  return markdown
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^#\s.*$/gm, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

function summaryFromInstructions(markdown) {
  const body = stripComments(markdown);
  const paragraph = body
    .split(/\n\s*\n/)
    .map((part) => part.replace(/\s+/g, " ").trim())
    .find((part) => part.length > 30);

  const clean = (paragraph ?? body)
    .replace(/[{}<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return clean.length > 170 ? `${clean.slice(0, 167)}…` : clean;
}

function cleanStarter(sourceText) {
  return sourceText
    .split("\n")
    .filter(
      (line) => !/^#\s*(Introduction|Your task|Replace this|Note:)/i.test(line),
    )
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trimStart();
}

function detectEntryPoint(tests) {
  const localDefinitions = new Set();

  for (const match of tests.matchAll(
    /^[ \t]*(?:def|class)\s+([A-Za-z_][A-Za-z0-9_]*)/gm,
  )) {
    localDefinitions.add(match[1]);
  }

  const fromImport =
    /^[ \t]*from[ \t]+([A-Za-z_][A-Za-z0-9_]*)[ \t]+import[ \t]+(?:\(([^)]*)\)|([^\r\n(]+))/gm;

  for (const match of tests.matchAll(fromImport)) {
    const moduleName = match[1];

    if (stdlibModules.has(moduleName)) {
      continue;
    }

    const raw = match[2] ?? match[3] ?? "";
    const names = raw
      .replace(/\r/g, "")
      .split(",")
      .map((entry) => entry.trim().split(/\s+as\s+/)[0])
      .filter(
        (entry) =>
          /^[A-Za-z_][A-Za-z0-9_]*$/.test(entry) &&
          !localDefinitions.has(entry),
      );

    if (names.length > 0) {
      return { module: moduleName, functionName: names[0] };
    }
  }

  const importedModules = new Set();

  for (const match of tests.matchAll(
    /^[ \t]*import[ \t]+([A-Za-z_][A-Za-z0-9_]*)/gm,
  )) {
    if (!stdlibModules.has(match[1])) {
      importedModules.add(match[1]);
    }
  }

  const qualified = /\b([a-z_][A-Za-z0-9_]*)\.([A-Za-z_][A-Za-z0-9_]*)\s*\(/g;

  for (const match of tests.matchAll(qualified)) {
    if (importedModules.has(match[1]) && !localDefinitions.has(match[2])) {
      return { module: match[1], functionName: match[2] };
    }
  }

  return null;
}

function needsPytest(tests) {
  return /(^|\s)(import\s+pytest|pytest\.|@pytest)/.test(tests);
}

function needsDataFiles(tests, starter) {
  const dataReference = /["'][^"'\n]*\.(txt|csv|json|tsv)["']/;

  return dataReference.test(tests) || dataReference.test(starter);
}

function buildPrompt({ slug, summary, order, track, functionName }) {
  return `---
title: "${titleFromSlug(slug)}"
track: ${track}
order: ${order}
summary: "${summary.replace(/"/g, "'")}"
xp: 25
difficulty: medium
functionName: "${functionName}"
sources:
  - title: "${source.title}"
    author: "${source.author}"
    url: "${source.url}"
    license: "${source.license}"
    licenseUrl: "${source.licenseUrl}"
---

${summary}

<Callout kind="note" title="Adapted from Exercism">
  This exercise was adapted from the Exercism Python track, released under the
  MIT License. The upstream version, with its full instructions, hints and
  community discussions, is at
  [exercism.org/tracks/python/exercises/${slug}](https://exercism.org/tracks/python/exercises/${slug}).
  The test suite is the upstream one, run by this site's Python runtime.
</Callout>
`;
}

function highestExistingOrder(target) {
  if (!fs.existsSync(target)) {
    return 0;
  }

  let highest = 0;

  for (const folder of fs.readdirSync(target, { withFileTypes: true })) {
    if (!folder.isDirectory()) {
      continue;
    }

    const promptPath = path.join(target, folder.name, "prompt.mdx");

    if (!fs.existsSync(promptPath)) {
      continue;
    }

    const match = /^order:\s*(\d+)\s*$/m.exec(
      fs.readFileSync(promptPath, "utf8"),
    );

    if (match) {
      highest = Math.max(highest, Number(match[1]));
    }
  }

  return highest;
}

function alreadyImportedEverywhere(slug) {
  if (!fs.existsSync(contentRoot)) {
    return false;
  }

  for (const track of fs.readdirSync(contentRoot, { withFileTypes: true })) {
    if (!track.isDirectory()) {
      continue;
    }

    if (
      fs.existsSync(
        path.join(contentRoot, track.name, "exercises", slug, "prompt.mdx"),
      )
    ) {
      return true;
    }
  }

  return false;
}

function loadMap(track) {
  const mapPath = path.join(scriptDirectory, "track-map.json");

  if (!fs.existsSync(mapPath)) {
    return null;
  }

  const map = JSON.parse(fs.readFileSync(mapPath, "utf8"));
  return map[track] ?? null;
}

function findStarterFile(directory, slug) {
  const preferred = path.join(directory, `${slug}.py`);

  if (fs.existsSync(preferred)) {
    return preferred;
  }

  const candidates = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith(".py") &&
        !entry.name.endsWith("_test.py"),
    )
    .map((entry) => entry.name);

  return candidates.length === 1 ? path.join(directory, candidates[0]) : null;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const checkout = ensureCheckout(args.cache);
  const config = JSON.parse(
    fs.readFileSync(path.join(checkout, "config.json"), "utf8"),
  );
  const practice = config.exercises?.practice ?? [];
  const allSlugs = practice.map((entry) =>
    typeof entry === "string" ? entry : entry.slug,
  );
  const mapped = loadMap(args.track);
  const wanted = mapped
    ? allSlugs.filter((slug) => mapped.includes(slug))
    : allSlugs;
  const hasLessons = fs.existsSync(
    path.join(contentRoot, args.track, "lessons"),
  );
  const target = hasLessons
    ? path.join(contentRoot, args.track, "exercises")
    : path.join(stagedRoot, args.track, "exercises");
  const imported = [];
  const skipped = [];
  let order = highestExistingOrder(target);

  for (const slug of wanted) {
    if (!slug) {
      continue;
    }

    const directory = path.join(checkout, "exercises", "practice", slug);
    const instructionsPath = path.join(directory, ".docs", "instructions.md");
    const testsPath = path.join(directory, `${slug}_test.py`);
    const starterPath = findStarterFile(directory, slug);

    if (
      !fs.existsSync(instructionsPath) ||
      !fs.existsSync(testsPath) ||
      !starterPath
    ) {
      skipped.push({ slug, reason: "missing upstream files" });
      continue;
    }

    if (fs.existsSync(path.join(target, slug))) {
      skipped.push({ slug, reason: "already in this track" });
      continue;
    }

    if (alreadyImportedEverywhere(slug)) {
      skipped.push({ slug, reason: "already in another track" });
      continue;
    }

    const tests = fs.readFileSync(testsPath, "utf8");

    if (needsPytest(tests) && !args.allowPytest) {
      skipped.push({ slug, reason: "needs pytest" });
      continue;
    }

    const starter = cleanStarter(fs.readFileSync(starterPath, "utf8"));

    if (needsDataFiles(tests, starter)) {
      skipped.push({ slug, reason: "needs upstream data files" });
      continue;
    }

    const entryPoint = detectEntryPoint(tests);

    if (!entryPoint) {
      skipped.push({ slug, reason: "no entry point detected" });
      continue;
    }

    if (imported.length >= args.limit) {
      break;
    }

    order += 1;

    const prompt = buildPrompt({
      slug,
      summary: summaryFromInstructions(
        fs.readFileSync(instructionsPath, "utf8"),
      ),
      order,
      track: args.track,
      functionName: entryPoint.functionName,
    });

    if (!args.dryRun) {
      const destination = path.join(target, slug);
      fs.mkdirSync(destination, { recursive: true });
      fs.writeFileSync(path.join(destination, "prompt.mdx"), prompt, "utf8");
      fs.writeFileSync(
        path.join(destination, "starter.py"),
        `${cleanStarter(fs.readFileSync(starterPath, "utf8")).trimEnd()}\n`,
        "utf8",
      );
      fs.writeFileSync(
        path.join(destination, "tests.py"),
        tests.replace(/\s*$/, "\n"),
        "utf8",
      );
    }

    imported.push({ slug, functionName: entryPoint.functionName, order });
  }

  console.log(
    `${args.dryRun ? "Dry run: " : ""}scanned ${wanted.length} candidate exercise(s) for track ${args.track}.`,
  );
  console.log(
    hasLessons
      ? `Writing to content/tracks/${args.track}/exercises`
      : `Track has no lessons yet — staging in content/staged/${args.track}/exercises`,
  );
  console.log(`Imported ${imported.length}:`);
  for (const item of imported) {
    console.log(`  ${item.order}. ${item.slug} -> ${item.functionName}`);
  }
  console.log(`Skipped ${skipped.length}:`);
  for (const item of skipped) {
    console.log(`  - ${item.slug}: ${item.reason}`);
  }
}

main();
