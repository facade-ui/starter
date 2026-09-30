import type { ElementType } from "react"

import type { CtaItem, LinkComponent } from "@/lib/types"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export interface CtaGroupProps {
  items: CtaItem[]
  /** Your link component, such as `next/link`. Defaults to `"a"`. */
  link?: LinkComponent
  size?: "sm" | "md" | "lg"
  align?: "start" | "center" | "end"
  /** Stacks the buttons at full width on small screens. Common inside a hero. */
  stackOnMobile?: boolean
  className?: string
}

const alignment = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
} as const

export function CtaGroup({
  items,
  link,
  size = "md",
  align = "start",
  stackOnMobile = false,
  className,
}: CtaGroupProps) {
  if (items.length === 0) return null
  const Link = (link ?? "a") as ElementType

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3",
        alignment[align],
        stackOnMobile && "flex-col sm:flex-row",
        className,
      )}
    >
      {items.map((item, index) => {
        const variant = item.variant ?? (index === 0 ? "primary" : "outline")
        return (
          <Link
            key={`${item.href}-${item.label}`}
            href={item.href}
            aria-label={item["aria-label"]}
            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={cn(
              buttonVariants({ variant, size }),
              stackOnMobile && "w-full sm:w-auto",
            )}
          >
            {item.label}
            {item.external ? (
              <span className="sr-only"> (opens in a new tab)</span>
            ) : null}
          </Link>
        )
      })}
    </div>
  )
}
