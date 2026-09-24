import type { Metadata } from "next";
import { Standings } from "@/components/progress/standings";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Your level, XP and streak, stored on this device.",
};

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="eyebrow">Standings</p>
      <h1 className="mt-5 max-w-[18ch] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
        One learner, ranked locally.
      </h1>
      <p className="measure mt-6 text-lg leading-relaxed text-ink-60">
        There is no account and no server on this deployment, so the table holds
        your own record rather than a global ranking.
      </p>
      <div className="mt-14">
        <Standings />
      </div>
    </div>
  );
}
