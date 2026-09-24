import {
  readAllExercises,
  readAllLessons,
  readTrackExercises,
} from "../../src/lib/content/read";

const problems: string[] = [];

function checkOrdering(
  label: string,
  items: { order: number; title: string }[],
) {
  const orders = items.map((item) => item.order);
  const unique = new Set(orders);

  if (unique.size !== orders.length) {
    problems.push(`${label}: duplicate order values (${orders.join(", ")})`);
  }

  const expected = items.map((_, index) => index + 1);

  if (orders.join(",") !== expected.join(",")) {
    problems.push(
      `${label}: order must run 1..${items.length}, found ${orders.join(", ")}`,
    );
  }
}

function checkExercises(track: string, slug: string) {
  const exercise = readAllExercises().find(
    (candidate) => candidate.track === track && candidate.slug === slug,
  );

  if (!exercise) {
    return;
  }

  const where = `${track}/${slug}`;

  if (
    !exercise.starter.includes(`def ${exercise.functionName}`) &&
    !exercise.starter.includes(`class ${exercise.functionName}`)
  ) {
    problems.push(
      `${where}: starter.py does not define \`def ${exercise.functionName}\` or \`class ${exercise.functionName}\``,
    );
  }

  if (
    !exercise.tests.includes("def test_") &&
    !exercise.tests.includes("class ")
  ) {
    problems.push(
      `${where}: tests.py defines no test_ functions or test classes`,
    );
  }

  if (
    !exercise.tests.includes(`${exercise.functionName}(`) &&
    !exercise.tests.includes(`${exercise.functionName}.`)
  ) {
    problems.push(
      `${where}: tests.py never references ${exercise.functionName}`,
    );
  }
}

let lessons;
let exercises;

try {
  lessons = readAllLessons();
  exercises = readAllExercises();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

const trackSlugs = [...new Set(lessons.map((lesson) => lesson.track))];

for (const track of trackSlugs) {
  checkOrdering(
    `track ${track} lessons`,
    lessons.filter((lesson) => lesson.track === track),
  );
  checkOrdering(`track ${track} exercises`, readTrackExercises(track));

  for (const exercise of readTrackExercises(track)) {
    checkExercises(track, exercise.slug);
  }
}

const missingExerciseTrack = exercises.filter(
  (exercise) => !trackSlugs.includes(exercise.track),
);

if (missingExerciseTrack.length > 0) {
  problems.push(
    `exercises reference tracks with no lessons: ${missingExerciseTrack
      .map((exercise) => exercise.track)
      .join(", ")}`,
  );
}

if (problems.length > 0) {
  console.error("Content validation failed:");
  for (const problem of problems) {
    console.error(`  - ${problem}`);
  }
  process.exit(1);
}

const totalWords = lessons.reduce(
  (total, lesson) => total + lesson.wordCount,
  0,
);

console.log(
  `Content OK: ${trackSlugs.length} track(s), ${lessons.length} lesson(s), ${exercises.length} exercise(s), ${totalWords} words.`,
);
