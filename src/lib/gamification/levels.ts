export const maxLevel = 50;

export function xpToReachLevel(level: number): number {
  if (level <= 1) {
    return 0;
  }

  return Math.round(100 * Math.pow(level - 1, 1.5));
}

export function levelForXp(xp: number): number {
  if (!Number.isFinite(xp) || xp <= 0) {
    return 1;
  }

  let level = 1;

  while (level < maxLevel && xpToReachLevel(level + 1) <= xp) {
    level += 1;
  }

  return level;
}

export type LevelProgress = {
  level: number;
  currentLevelXp: number;
  nextLevelXp: number | null;
  intoLevel: number;
  levelSpan: number;
  percent: number;
  isMaxLevel: boolean;
};

export function levelProgress(xp: number): LevelProgress {
  const level = levelForXp(xp);
  const currentLevelXp = xpToReachLevel(level);

  if (level >= maxLevel) {
    return {
      level,
      currentLevelXp,
      nextLevelXp: null,
      intoLevel: Math.max(0, Math.round(xp - currentLevelXp)),
      levelSpan: 0,
      percent: 100,
      isMaxLevel: true,
    };
  }

  const nextLevelXp = xpToReachLevel(level + 1);
  const levelSpan = nextLevelXp - currentLevelXp;
  const intoLevel = Math.max(0, Math.round(xp - currentLevelXp));

  return {
    level,
    currentLevelXp,
    nextLevelXp,
    intoLevel,
    levelSpan,
    percent: Math.min(100, Math.round((intoLevel / levelSpan) * 100)),
    isMaxLevel: false,
  };
}
