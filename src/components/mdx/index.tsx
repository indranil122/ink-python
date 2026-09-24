import type { AnchorHTMLAttributes } from "react";
import { Callout } from "./callout";
import { CodeBlock } from "./code-block";

function ProseLink({
  href = "",
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...props}
    >
      {children}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

export const mdxComponents = {
  pre: CodeBlock,
  a: ProseLink,
  Callout,
};
