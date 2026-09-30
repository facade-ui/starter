import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

import type { SectionBaseProps } from "@/lib/types"
import { cn } from "@/lib/utils"

export interface SectionProps
  extends
    Omit<ComponentPropsWithoutRef<"section">, "children">,
    Pick<SectionBaseProps, "as" | "spacing"> {
  /** Id of the heading that names this section. Omit only when `as="div"`. */
  labelledBy?: string
  children?: ReactNode
}

const spacings = {
  none: "",
  sm: "py-section-sm",
  md: "py-section",
  lg: "py-section-lg",
} as const

export function Section({
  as = "section",
  spacing = "md",
  labelledBy,
  className,
  children,
  ...props
}: SectionProps) {
  const Component = as as ElementType
  const nameable = as === "section" || as === "article" || as === "aside"

  return (
    <Component
      aria-labelledby={nameable ? labelledBy : undefined}
      className={cn("relative w-full", spacings[spacing], className)}
      {...props}
    >
      {children}
    </Component>
  )
}
