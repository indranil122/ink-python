import type { ReactNode } from "react";

const kinds = {
  try: { label: "Try it" },
  watch: { label: "Watch out" },
  recap: { label: "Recap" },
  note: { label: "Note" },
} as const;

export type CalloutKind = keyof typeof kinds;

export function Callout({
  kind = "note",
  title,
  children,
}: {
  kind?: CalloutKind;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="callout" data-kind={kind}>
      <p className="callout-label">{title ?? kinds[kind].label}</p>
      <div className="callout-body">{children}</div>
    </aside>
  );
}
