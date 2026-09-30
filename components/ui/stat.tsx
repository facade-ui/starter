import type { ElementType, ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface StatItem {
  /** The figure, including its unit or symbol. */
  value: string
  label: string
  /** Optional sentence of context below the label. */
  description?: string
  /** Spoken form, when `value` is an abbreviation ("1.2K" -> "1200"). */
  srValue?: string
}

export interface StatProps extends StatItem {
  /** The group wrapper. Defaults to `"div"`, the only element a `<dl>` allows. */
  as?: ElementType
  size?: "sm" | "md" | "lg"
  align?: "start" | "center"
  className?: string
  children?: ReactNode
}

const valueSizes = {
  sm: "text-3xl",
  md: "text-display-sm",
  lg: "text-display-md",
} as const

export function Stat({
  value,
  label,
  description,
  srValue,
  as,
  size = "md",
  align = "start",
  className,
  children,
}: StatProps) {
  const Root = (as ?? "div") as ElementType

  return (
    <Root
      className={cn(
        "flex flex-col-reverse gap-2",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <dt className="text-muted-foreground text-sm font-medium">
        {label}
        {description ? (
          <span className="text-muted-foreground mt-1 block text-pretty text-sm font-normal">
            {description}
          </span>
        ) : null}
      </dt>
      <dd
        className={cn("text-foreground font-semibold tracking-tight", valueSizes[size])}
      >
        {srValue ? (
          <>
            <span aria-hidden>{value}</span>
            <span className="sr-only">{srValue}</span>
          </>
        ) : (
          value
        )}
        {children}
      </dd>
    </Root>
  )
}
