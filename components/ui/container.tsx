import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

import { cn } from "@/lib/utils"

export type ContainerElement = "div" | "section" | "header" | "footer" | "nav" | "main"

export interface ContainerProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> {
  as?: ContainerElement
  /** `lg` uses `--facade-container-max`. `sm` and `md` are narrower, for text. */
  size?: "sm" | "md" | "lg" | "full"
  /** Set `false` to remove the side padding, for example for a full-width child. */
  gutter?: boolean
  children?: ReactNode
}

const sizes: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-facade",
  full: "max-w-none",
}

export function Container({
  as = "div",
  size = "lg",
  gutter = true,
  className,
  children,
  ...props
}: ContainerProps) {
  const Component = as as ElementType

  return (
    <Component
      className={cn(
        "mx-auto w-full",
        sizes[size],
        gutter && "px-gutter sm:px-8",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
