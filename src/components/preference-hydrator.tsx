"use client";

import { useEffect } from "react";

export function PreferenceHydrator() {
  useEffect(() => {
    const scale = window.localStorage.getItem("ink:typeScale");
    const focus = window.localStorage.getItem("ink:focus");

    if (scale === "sm" || scale === "lg" || scale === "md") {
      document.documentElement.dataset.typeScale = scale;
    }

    document.documentElement.dataset.focus = focus === "on" ? "on" : "off";
    window.dispatchEvent(new Event("ink:preferences"));
  }, []);

  return null;
}
