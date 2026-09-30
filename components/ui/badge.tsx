import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { cn } from "@/lib/utils"

export const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border font-medium",
    "[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground border-transparent",
        primary: "bg-primary text-primary-foreground border-transparent",
        outline: "border-border bg-background text-foreground",
        muted: "bg-muted text-muted-foreground border-transparent",
        destructive: "bg-destructive text-destructive-foreground border-transparent",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
)

export interface BadgeProps
  extends ComponentPropsWithoutRef<"span">, VariantProps<typeof badgeVariants> {
  /**
   * A prefix only screen readers announce, for badges whose meaning is not in the visible
   * text.
   */
  srLabel?: string
  children?: ReactNode
}

export function Badge({
  variant,
  size,
  srLabel,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {srLabel ? <span className="sr-only">{srLabel}</span> : null}
      {children}
    </span>
  )
}
