import { cva, type VariantProps } from "class-variance-authority"
import type { ElementType } from "react"

import type { IconComponent } from "@/lib/types"
import { cn } from "@/lib/utils"

export const featureIconVariants = cva(
  "inline-flex shrink-0 items-center justify-center",
  {
    variants: {
      variant: {
        soft: "bg-accent text-accent-foreground",
        solid: "bg-primary text-primary-foreground",
        outline: "border-border bg-background text-foreground border",
        plain: "text-primary",
      },
      size: {
        sm: "size-9 [&_svg]:size-4",
        md: "size-11 [&_svg]:size-5",
        lg: "size-14 [&_svg]:size-6",
      },
      shape: {
        rounded: "rounded-lg",
        circle: "rounded-full",
        square: "rounded-none",
      },
    },
    compoundVariants: [{ variant: "plain", class: "size-auto bg-transparent" }],
    defaultVariants: { variant: "soft", size: "md", shape: "rounded" },
  },
)

export interface FeatureIconProps extends VariantProps<typeof featureIconVariants> {
  icon: IconComponent
  className?: string
}

export function FeatureIcon({ icon, variant, size, shape, className }: FeatureIconProps) {
  const Icon = icon as ElementType

  return (
    <span className={cn(featureIconVariants({ variant, size, shape }), className)}>
      <Icon aria-hidden focusable="false" />
    </span>
  )
}
