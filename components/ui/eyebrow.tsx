import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface EyebrowProps extends Omit<ComponentPropsWithoutRef<"p">, "children"> {
  as?: "p" | "span" | "div"
  /** `muted` is the default; `primary` leads with a tick in the brand colour. */
  tone?: "muted" | "primary" | "foreground"
  children?: ReactNode
}

const tones: Record<NonNullable<EyebrowProps["tone"]>, string> = {
  muted: "text-muted-foreground",
  // Inline, so the tick follows the text's alignment and its first line.
  primary:
    "text-foreground before:bg-primary before:mr-[0.75em] before:inline-block before:size-[0.6em] before:rounded-[0.125em] before:content-['']",
  foreground: "text-foreground",
}

export function Eyebrow({
  as = "p",
  tone = "muted",
  className,
  children,
  ...props
}: EyebrowProps) {
  const Component = as as ElementType

  return (
    <Component
      className={cn(
        "text-sm font-semibold uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
