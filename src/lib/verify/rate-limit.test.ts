import { describe, expect, it } from "vitest";
import { checkRateLimit, clientKey } from "./rate-limit";

describe("rate limiting", () => {
  it("allows requests under the limit", () => {
    const now = 1_000_000;
    expect(checkRateLimit("a", 3, 60_000, now).allowed).toBe(true);
    expect(checkRateLimit("a", 3, 60_000, now).allowed).toBe(true);
    const third = checkRateLimit("a", 3, 60_000, now);
    expect(third.allowed).toBe(true);
    expect(third.remaining).toBe(0);
  });

  it("blocks once the limit is passed", () => {
    const now = 2_000_000;
    checkRateLimit("b", 1, 60_000, now);
    const blocked = checkRateLimit("b", 1, 60_000, now);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("resets after the window", () => {
    const now = 3_000_000;
    checkRateLimit("c", 1, 1_000, now);
    expect(checkRateLimit("c", 1, 1_000, now + 1_500).allowed).toBe(true);
  });

  it("keeps separate buckets per key", () => {
    const now = 4_000_000;
    checkRateLimit("d", 1, 60_000, now);
    expect(checkRateLimit("e", 1, 60_000, now).allowed).toBe(true);
  });
});

describe("client keys", () => {
  it("prefers the forwarded address", () => {
    const request = new Request("https://example.test", {
      headers: { "x-forwarded-for": "203.0.113.5, 10.0.0.1" },
    });
    expect(clientKey(request)).toBe("203.0.113.5");
  });

  it("falls back to a placeholder", () => {
    expect(clientKey(new Request("https://example.test"))).toBe("unknown");
  });
});
