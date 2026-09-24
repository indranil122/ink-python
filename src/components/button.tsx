import type { ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center gap-2 border font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase transition-colors duration-150";

const variants = {
  solid: "border-ink bg-ink text-paper hover:bg-ink-80",
  outline: "border-ink bg-paper text-ink hover:bg-wash",
  ghost: "border-transparent bg-paper text-ink-60 hover:bg-wash hover:text-ink",
} as const;

const sizes = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
  lg: "h-13 px-8",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export function buttonClass({
  variant = "solid",
  size = "md",
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

export function Button({
  variant,
  size,
  className,
  ...props
}: { variant?: Variant; size?: Size } & ComponentProps<"button">) {
  return (
    <button className={buttonClass({ variant, size, className })} {...props} />
  );
}
