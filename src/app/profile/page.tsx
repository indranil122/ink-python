import type { Metadata } from "next";
import { ProfilePanel } from "@/components/progress/profile-panel";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Your level, streak, badges and activity, stored on this device.",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="eyebrow">Profile</p>
      <h1 className="mt-5 max-w-[18ch] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
        Your record, on this device.
      </h1>
      <p className="measure mt-6 text-lg leading-relaxed text-ink-60">
        Progress is stored in this browser. Signing in will carry it across
        devices and add a place on the leaderboard.
      </p>
      <div className="mt-14">
        <ProfilePanel />
      </div>
    </div>
  );
}
