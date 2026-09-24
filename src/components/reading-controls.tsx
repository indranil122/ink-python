"use client";

import { useSyncExternalStore } from "react";

const eventName = "ink:preferences";

type Scale = "sm" | "md" | "lg";

function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener("storage", callback);
  };
}

function getScaleSnapshot(): Scale {
  const value = document.documentElement.dataset.typeScale;
  return value === "sm" || value === "lg" ? value : "md";
}

function getFocusSnapshot(): string {
  return document.documentElement.dataset.focus ?? "off";
}

function getServerSnapshot(): string {
  return "md";
}

function applyPreference(key: "typeScale" | "focus", value: string) {
  document.documentElement.dataset[key] = value;
  window.localStorage.setItem(`ink:${key}`, value);
  window.dispatchEvent(new Event(eventName));
}

export function ReadingControls() {
  const scale = useSyncExternalStore(
    subscribe,
    getScaleSnapshot,
    getServerSnapshot,
  );
  const focus = useSyncExternalStore(subscribe, getFocusSnapshot, () => "off");

  const scales: { value: Scale; label: string }[] = [
    { value: "sm", label: "A−" },
    { value: "md", label: "A" },
    { value: "lg", label: "A+" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div
        role="group"
        aria-label="Text size"
        className="flex items-center border border-rule"
      >
        {scales.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => applyPreference("typeScale", option.value)}
            aria-pressed={scale === option.value}
            className="h-8 w-9 border-r border-rule font-mono text-xs last:border-r-0 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
          >
            {option.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => applyPreference("focus", focus === "on" ? "off" : "on")}
        aria-pressed={focus === "on"}
        className="h-8 border border-rule px-3 font-mono text-[0.6875rem] tracking-[0.14em] uppercase aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
      >
        {focus === "on" ? "Exit focus" : "Focus mode"}
      </button>
    </div>
  );
}
