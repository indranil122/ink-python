import type { ReactNode } from "react";
import { isValidElement } from "react";
import { codeToHtml } from "shiki";
import { CopyButton } from "@/components/python/copy-button";
import { RunButton } from "@/components/python/run-button";
import { inkTheme } from "@/lib/mdx/theme";

type Extracted = { code: string; language: string };

export function extractCode(children: ReactNode): Extracted {
  let code = "";
  let language = "text";

  const visit = (node: ReactNode) => {
    if (node === null || node === undefined || typeof node === "boolean") {
      return;
    }

    if (typeof node === "string" || typeof node === "number") {
      code += String(node);
      return;
    }

    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }

    if (isValidElement(node)) {
      const props = node.props as { className?: string; children?: ReactNode };
      const match = /language-([\w-]+)/.exec(props.className ?? "");

      if (match) {
        language = match[1];
      }

      visit(props.children);
    }
  };

  visit(children);

  return { code: code.replace(/\n$/, ""), language };
}

export async function CodeBlock({ children }: { children?: ReactNode }) {
  const { code, language } = extractCode(children);

  if (code.trim().length === 0) {
    return null;
  }

  const html = await codeToHtml(code, {
    lang: language === "py" ? "python" : language,
    theme: inkTheme,
    colorReplacements: {
      "#ffffff": "transparent",
      "#0a0a0a": "var(--ink)",
    },
  });

  const runnable = language === "python" || language === "py";

  return (
    <div className="code-frame" data-language={language} data-code={code}>
      <div className="code-frame-bar">
        <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-40 uppercase">
          {runnable ? "python" : language}
        </span>
        <span className="flex items-center gap-2">
          {runnable ? <RunButton code={code} /> : null}
          <CopyButton text={code} />
        </span>
      </div>
      <div
        className="code-frame-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
