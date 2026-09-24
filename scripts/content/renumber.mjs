import fs from "node:fs";
import path from "node:path";

const contentRoot = path.join(process.cwd(), "content", "tracks");
const stagedRoot = path.join(process.cwd(), "content", "staged");

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

  return folders.length;
}

function renumberLessons(directory) {
  const files = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name)
    .sort();

  files.forEach((file, index) => {
    const filePath = path.join(directory, file);
    const contents = fs.readFileSync(filePath, "utf8");
    fs.writeFileSync(
      filePath,
      contents.replace(/^order:\s*\d+\s*$/m, `order: ${index + 1}`),
      "utf8",
    );
  });

  return files.length;
}

let changed = 0;

for (const root of [contentRoot, stagedRoot]) {
  if (!fs.existsSync(root)) {
    continue;
  }

  for (const track of fs.readdirSync(root, { withFileTypes: true })) {
    if (!track.isDirectory()) {
      continue;
    }

    const lessons = path.join(root, track.name, "lessons");

    if (fs.existsSync(lessons)) {
      const lessonCount = renumberLessons(lessons);
      console.log(
        `Lessons ${root === contentRoot ? "track" : "staged"}/${track.name}: ${lessonCount}.`,
      );
    }

    const exercises = path.join(root, track.name, "exercises");

    if (!fs.existsSync(exercises)) {
      continue;
    }

    const count = renumber(exercises);

    if (count > 0) {
      console.log(
        `Renumbered ${root === contentRoot ? "track" : "staged"}/${track.name}: ${count} exercises.`,
      );
      changed += 1;
    }
  }
}

console.log(`Updated ${changed} exercise group(s).`);
