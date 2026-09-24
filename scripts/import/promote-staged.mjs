import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, "content", "tracks");
const stagedRoot = path.join(projectRoot, "content", "staged");

function trackHasLessons(track) {
  return fs.existsSync(path.join(contentRoot, track, "lessons"));
}

function moveDirectory(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.renameSync(from, to);
}

function highestOrder(directory) {
  if (!fs.existsSync(directory)) {
    return 0;
  }

  let highest = 0;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const prompt = path.join(directory, entry.name, "prompt.mdx");

    if (!fs.existsSync(prompt)) {
      continue;
    }

    const match = /^order:\s*(\d+)\s*$/m.exec(fs.readFileSync(prompt, "utf8"));

    if (match) {
      highest = Math.max(highest, Number(match[1]));
    }
  }

  return highest;
}

function renumber(directory) {
  const folders = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  folders.forEach((folder, index) => {
    const promptPath = path.join(directory, folder, "prompt.mdx");
    const contents = fs.readFileSync(promptPath, "utf8");
    fs.writeFileSync(
      promptPath,
      contents.replace(/^order:\s*\d+\s*$/m, `order: ${index + 1}`),
      "utf8",
    );
  });
}

if (!fs.existsSync(stagedRoot)) {
  console.log("Nothing staged.");
  process.exit(0);
}

let promoted = 0;

for (const track of fs.readdirSync(stagedRoot, { withFileTypes: true })) {
  if (!track.isDirectory()) {
    continue;
  }

  const trackSlug = track.name;
  const stagedExercises = path.join(stagedRoot, trackSlug, "exercises");

  if (!fs.existsSync(stagedExercises)) {
    continue;
  }

  if (!trackHasLessons(trackSlug)) {
    console.log(`Skipped ${trackSlug}: no lessons published yet.`);
    continue;
  }

  const target = path.join(contentRoot, trackSlug, "exercises");

  for (const folder of fs.readdirSync(stagedExercises, {
    withFileTypes: true,
  })) {
    if (!folder.isDirectory()) {
      continue;
    }

    moveDirectory(
      path.join(stagedExercises, folder.name),
      path.join(target, folder.name),
    );
    promoted += 1;
  }

  fs.rmSync(stagedExercises, { recursive: true, force: true });
  fs.rmSync(path.join(stagedRoot, trackSlug), { recursive: true, force: true });
  renumber(target);
  console.log(
    `Promoted ${trackSlug} (${highestOrder(target)} exercises now numbered).`,
  );
}

console.log(`Promoted ${promoted} exercise(s).`);
