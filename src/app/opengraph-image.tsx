import { ImageResponse } from "next/og";
import { getCurriculumSummary } from "@/lib/content/load";
import { tracks } from "@/lib/curriculum";

export const dynamic = "force-static";
export const alt = "Ink — Learn Python from zero to professional";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  const summary = getCurriculumSummary();

  return new ImageResponse(
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "56px 64px",
        border: "4px solid #0a0a0a",
        backgroundColor: "#ffffff",
        color: "#0a0a0a",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 26,
          letterSpacing: 4,
        }}
      >
        <span>INK / PYTHON</span>
        <span>FREE · NO ACCOUNT</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 940,
        }}
      >
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700 }}>
          Learn Python the way
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700 }}>
          working programmers do.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          fontSize: 26,
          letterSpacing: 2,
        }}
      >
        <div style={{ display: "flex" }}>
          {tracks.length} TRACKS · {summary.lessons} LESSONS ·{" "}
          {summary.exercises} EXERCISES
        </div>
        <div style={{ display: "flex", color: "#525252" }}>
          CPYTHON 3.14 RUNS IN YOUR BROWSER
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
