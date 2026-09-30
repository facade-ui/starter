import type { ReactNode } from "react"

import type { HeadingLevel } from "@/lib/types"
import { cn, slugId } from "@/lib/utils"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"

export interface SectionHeaderProps {
  title: ReactNode
  /** Small label above the heading. */
  eyebrow?: ReactNode
  /** Text below the heading. */
  description?: ReactNode
  /** Heading level. Defaults to `2`. Does not affect `size`. */
  headingLevel?: HeadingLevel
  /** Visual size. Defaults to `md`. Does not affect `headingLevel`. */
  size?: "sm" | "md" | "lg" | "xl"
  align?: "start" | "center"
  /**
   * The heading's id, for the parent's `aria-labelledby`. Made from the title when
   * omitted. Pass one if two headings would get the same id.
   */
  titleId?: string
  /** Buttons or links shown beside or under the heading. */
  actions?: ReactNode
  className?: string
  children?: ReactNode
}

const headingSizes: Record<NonNullable<SectionHeaderProps["size"]>, string> = {
  sm: "text-2xl font-semibold tracking-tight sm:text-3xl",
  md: "text-display-sm font-semibold text-balance",
  lg: "text-display-md font-semibold text-balance",
  xl: "text-display-lg font-semibold text-balance",
}

const descriptionSizes: Record<NonNullable<SectionHeaderProps["size"]>, string> = {
  sm: "text-base",
  md: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl",
  xl: "text-lg sm:text-xl",
}

/** Derives the heading id the way `SectionHeader` does, for `aria-labelledby`. */
export function sectionTitleId(title: string, explicit?: string): string {
  return explicit ?? slugId(title)
}

export function SectionHeader({
  title,
  eyebrow,
  description,
  headingLevel = 2,
  size = "md",
  align = "start",
  titleId,
  actions,
  className,
  children,
}: SectionHeaderProps) {
  const resolvedId = titleId ?? (typeof title === "string" ? slugId(title) : undefined)

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        actions && "md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      )}
    >
      <div
        className={cn(
          "flex max-w-2xl flex-col gap-4",
          align === "center" && "items-center",
        )}
      >
        {eyebrow ? <Eyebrow tone="primary">{eyebrow}</Eyebrow> : null}
        <Heading level={headingLevel} id={resolvedId} className={cn(headingSizes[size])}>
          {title}
        </Heading>
        {description ? (
          <p className={cn("text-muted-foreground text-pretty", descriptionSizes[size])}>
            {description}
          </p>
        ) : null}
        {children}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
    </div>
  )
}
