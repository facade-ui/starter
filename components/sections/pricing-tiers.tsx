import type { ElementType, ReactNode } from "react"

import type {
  HeadingLevel,
  LinkComponent,
  ListSlotProps,
  SectionBaseProps,
} from "@/lib/types"
import { cn, slugId } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { PricingTier, type PricingTierItem } from "@/components/ui/pricing-tier"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"

export interface PricingTiersProps extends SectionBaseProps, ListSlotProps {
  items: PricingTierItem[]
  title?: string
  eyebrow?: string
  description?: string
  link?: LinkComponent
  /** A billing-period switch, rendered above the plans. */
  toggle?: ReactNode
  /** Small print under the plans. */
  note?: ReactNode
  tierHeadingLevel?: HeadingLevel
  align?: "start" | "center"
}

export function PricingTiers({
  items,
  title,
  eyebrow,
  description,
  link,
  toggle,
  note,
  tierHeadingLevel,
  align = "center",
  listAs,
  itemAs,
  headingLevel = 2,
  as,
  spacing = "md",
  className,
  id,
}: PricingTiersProps) {
  const List = (listAs ?? "ul") as ElementType
  const Item = (itemAs ?? "li") as ElementType
  const titleId = title ? (id ? `${id}-title` : slugId(title)) : undefined
  const tierLevel = tierHeadingLevel ?? (Math.min(headingLevel + 1, 6) as HeadingLevel)

  const columns =
    items.length <= 2
      ? "sm:grid-cols-2"
      : items.length === 3
        ? "lg:grid-cols-3"
        : "sm:grid-cols-2 xl:grid-cols-4"

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

        {toggle ? (
          <div
            className={cn(
              "flex",
              align === "center" ? "justify-center" : "justify-start",
            )}
          >
            {toggle}
          </div>
        ) : null}

        <List className={cn("grid items-stretch gap-6", columns)}>
          {items.map((item) => (
            // The `li` stretches and the card fills it. Deliberately not
            // `display: contents` on the `li`, which has a history of dropping
            // list semantics in the accessibility tree.
            <Item key={item.name} className="flex">
              <PricingTier
                {...item}
                as="div"
                link={link}
                headingLevel={tierLevel}
                className="w-full"
              />
            </Item>
          ))}
        </List>

        {note ? (
          <p
            className={cn(
              "text-muted-foreground text-pretty text-sm",
              align === "center" && "text-center",
            )}
          >
            {note}
          </p>
        ) : null}
      </Container>
    </Section>
  )
}
