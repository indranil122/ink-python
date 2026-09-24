import type { ThemeRegistration } from "shiki";

export const inkTheme = {
  name: "ink",
  type: "light",
  colors: {
    "editor.background": "#ffffff",
    "editor.foreground": "#0a0a0a",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "8a8a8a", fontStyle: "italic" },
    },
    {
      scope: ["string", "constant.other.symbol", "meta.embedded"],
      settings: { foreground: "525252" },
    },
    {
      scope: [
        "keyword",
        "storage",
        "storage.type",
        "keyword.control",
        "keyword.operator",
        "punctuation.separator",
      ],
      settings: { foreground: "0a0a0a", fontStyle: "bold" },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: { foreground: "0a0a0a", fontStyle: "bold" },
    },
    {
      scope: ["variable.language", "variable.parameter", "support.type"],
      settings: { foreground: "0a0a0a", fontStyle: "italic" },
    },
    {
      scope: ["constant.numeric", "constant.language"],
      settings: { foreground: "0a0a0a" },
    },
    {
      scope: ["punctuation", "meta.brace", "meta.delimiter"],
      settings: { foreground: "8a8a8a" },
    },
    {
      scope: ["entity.name.tag", "entity.name.class", "support.class"],
      settings: { foreground: "0a0a0a", fontStyle: "bold" },
    },
  ],
} satisfies ThemeRegistration;
