import fs from "node:fs";
import path from "node:path";

const roots = [
  path.join(process.cwd(), "content", "tracks"),
  path.join(process.cwd(), "content", "staged"),
];

const suspects = [];

for (const root of roots) {
  if (!fs.existsSync(root)) {
    continue;
  }

  for (const track of fs.readdirSync(root, { withFileTypes: true })) {
    if (!track.isDirectory()) {
      continue;
    }

    const exercises = path.join(root, track.name, "exercises");

    if (!fs.existsSync(exercises)) {
      continue;
    }

    for (const folder of fs.readdirSync(exercises, { withFileTypes: true })) {
      if (!folder.isDirectory()) {
        continue;
      }

      const directory = path.join(exercises, folder.name);
      const promptPath = path.join(directory, "prompt.mdx");
      const testsPath = path.join(directory, "tests.py");
      const starterPath = path.join(directory, "starter.py");

      if (
        !fs.existsSync(promptPath) ||
        !fs.existsSync(testsPath) ||
        !fs.existsSync(starterPath)
      ) {
        continue;
      }

      const prompt = fs.readFileSync(promptPath, "utf8");
      const tests = fs.readFileSync(testsPath, "utf8");
      const starter = fs.readFileSync(starterPath, "utf8");
      const match = /^functionName:\s*"([^"]+)"\s*$/m.exec(prompt);

      if (!match) {
        continue;
      }

      const name = match[1];
      const isTestHelper = new RegExp(`self\\.${name}\\s*\\(`).test(tests);
      const inStarter =
        starter.includes(`def ${name}`) || starter.includes(`class ${name}`);

      if (!inStarter || isTestHelper) {
        suspects.push({
          where: path.relative(process.cwd(), directory),
          name,
          inStarter,
          isTestHelper,
        });
      }
    }
  }
}

for (const suspect of suspects) {
  console.log(
    `${suspect.where}: functionName=${suspect.name} inStarter=${suspect.inStarter} testHelper=${suspect.isTestHelper}`,
  );
}

console.log(`${suspects.length} suspect exercise(s).`);
