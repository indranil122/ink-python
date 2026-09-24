"use client";

import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
const cache = new Map<string, string | null>();
let listening = false;

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function ensureStorageListener() {
  if (listening || typeof window === "undefined") {
    return;
  }

  listening = true;
  window.addEventListener("storage", () => {
    cache.clear();
    notify();
  });
}

function read(key: string): string | null {
  if (cache.has(key)) {
    return cache.get(key) ?? null;
  }

  const value = window.localStorage.getItem(key);
  cache.set(key, value);
  return value;
}

function subscribe(listener: () => void) {
  ensureStorageListener();
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function readStoredValue(key: string, fallback: string): string {
  return read(key) ?? fallback;
}

export function getServerValue(fallback: string): string {
  return fallback;
}

export function writeStoredValue(key: string, value: string) {
  cache.set(key, value);
  window.localStorage.setItem(key, value);
  notify();
}

export function useStoredValue(key: string, fallback: string): string {
  return useSyncExternalStore(
    subscribe,
    () => readStoredValue(key, fallback),
    () => getServerValue(fallback),
  );
}
