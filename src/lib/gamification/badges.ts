export type BadgeStats = {
  xp: number;
  streak: number;
  lessonsCompleted: number;
  exercisesSolved: number;
  exercisesSolvedToday: number;
  exercisesSolvedFirstTry: number;
  exercisesSolvedNoHints: number;
  modulesCompleted: number;
  tracksStarted: number;
  dataExercisesSolved: number;
  asyncExercisesSolved: number;
  capstonesCompleted: number;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  goal: string;
  progress: (stats: BadgeStats) => { current: number; target: number } | null;
  earned: (stats: BadgeStats) => boolean;
};

function counter(
  name: string,
  description: string,
  target: number,
  read: (stats: BadgeStats) => number,
): Badge {
  return {
    id: name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    name,
    description,
    goal: `${target}`,
    progress: (stats) => ({ current: Math.min(read(stats), target), target }),
    earned: (stats) => read(stats) >= target,
  };
}

export const badges: Badge[] = [
  counter(
    "First Light",
    "Complete your first lesson.",
    1,
    (stats) => stats.lessonsCompleted,
  ),
  counter("Seven", "Keep a seven day streak.", 7, (stats) => stats.streak),
  counter("Thirty", "Keep a thirty day streak.", 30, (stats) => stats.streak),
  counter("Century", "Earn one hundred XP.", 100, (stats) => stats.xp),
  counter(
    "Module Master",
    "Finish every lesson in a track.",
    1,
    (stats) => stats.modulesCompleted,
  ),
  counter(
    "Cartographer",
    "Finish all eleven tracks.",
    11,
    (stats) => stats.modulesCompleted,
  ),
  counter(
    "Bug Squasher",
    "Pass ten exercises on the first try.",
    10,
    (stats) => stats.exercisesSolvedFirstTry,
  ),
  counter(
    "No Hints",
    "Solve twenty five exercises unaided.",
    25,
    (stats) => stats.exercisesSolvedNoHints,
  ),
  counter(
    "Speedrunner",
    "Solve ten exercises in one day.",
    10,
    (stats) => stats.exercisesSolvedToday,
  ),
  counter(
    "Polyglot",
    "Solve ten exercises.",
    10,
    (stats) => stats.exercisesSolved,
  ),
  counter(
    "Data Touched",
    "Solve an exercise in the data track.",
    1,
    (stats) => stats.dataExercisesSolved,
  ),
  counter(
    "Async Native",
    "Solve an exercise in the async track.",
    1,
    (stats) => stats.asyncExercisesSolved,
  ),
  counter(
    "Capstone",
    "Ship a capstone project.",
    1,
    (stats) => stats.capstonesCompleted,
  ),
];

export function earnedBadges(stats: BadgeStats): Badge[] {
  return badges.filter((badge) => badge.earned(stats));
}

export function badgeWithId(id: string): Badge | undefined {
  return badges.find((badge) => badge.id === id);
}
