import type { ElementType } from "react"

import type { ListSlotProps, SectionBaseProps } from "@/lib/types"
import { cn, slugId } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Stat, type StatItem } from "@/components/ui/stat"

export interface StatsProps extends SectionBaseProps, ListSlotProps {
  items: StatItem[]
  title?: string
  eyebrow?: string
  description?: string
  size?: "sm" | "md" | "lg"
  align?: "start" | "center"
  /** `plain` has no background. `card` gives each number a border and background. */
  variant?: "plain" | "card" | "divided"
}

export function Stats({
  items,
  title,
  eyebrow,
  description,
  size = "md",
  align = "center",
  variant = "plain",
  listAs,
  itemAs,
  headingLevel = 2,
  as,
  spacing = "md",
  className,
  id,
}: StatsProps) {
  // The list slot must render a <dl>, not a <ul> — see the header.
  const List = (listAs ?? "dl") as ElementType
  const titleId = title ? (id ? `${id}-title` : slugId(title)) : undefined

  const columns =
    items.length <= 2
      ? "sm:grid-cols-2"
      : items.length === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2 lg:grid-cols-4"

  return (
    <Section
      as={as ?? (title ? "section" : "div")}
      spacing={spacing}
      labelledBy={titleId}
      id={id}
      className={className}
    >
      <Container className="flex flex-col gap-12">
        {title ? (
          <SectionHeader
            align={align}
            eyebrow={eyebrow}
            title={title}
            description={description}
            headingLevel={headingLevel}
            titleId={titleId}
          />
        ) : null}

        <List
          className={cn(
            "grid gap-8",
            columns,
            variant === "divided" && "sm:divide-border sm:gap-0 sm:divide-x",
          )}
        >
          {/*
            `itemAs` becomes Stat's *own* wrapper rather than an element around
            it. A <dl> permits at most one level of div between itself and a
            dt/dd pair, so wrapping would produce invalid markup — which is
            exactly what the axe run caught when it did.
          */}
          {items.map((item) => (
            <Stat
              key={item.label}
              {...item}
              as={itemAs}
              size={size}
              align={align}
              className={cn(
                variant === "card" &&
                  "bg-card text-card-foreground rounded-xl border p-6",
                variant === "divided" && "sm:px-8",
              )}
            />
          ))}
        </List>
      </Container>
    </Section>
  )
}
