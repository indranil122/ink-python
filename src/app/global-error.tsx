"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          color: "#0a0a0a",
          fontFamily: "Georgia, 'Times New Roman', Times, serif",
        }}
      >
        <main
          style={{
            width: "min(42rem, calc(100% - 3rem))",
            padding: "4rem 0",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#525252",
            }}
          >
            Something broke
          </p>
          <h1
            style={{
              margin: "1.25rem 0 0",
              fontSize: "clamp(2.25rem, 8vw, 4rem)",
              lineHeight: 1.02,
              fontWeight: 650,
              letterSpacing: "-0.02em",
            }}
          >
            Ink could not render this page.
          </h1>
          <p
            style={{
              margin: "1.5rem 0 0",
              maxWidth: "42rem",
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "#525252",
            }}
          >
            Your locally saved progress has not been cleared. Try the page
            again, or return to the curriculum from the navigation after it
            loads.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "2rem",
              minHeight: "2.75rem",
              padding: "0 1.5rem",
              border: "1px solid #0a0a0a",
              backgroundColor: "#0a0a0a",
              color: "#ffffff",
              cursor: "pointer",
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
