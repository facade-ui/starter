import type { ElementType } from "react"

import type { ImageComponent, ListSlotProps, SectionBaseProps } from "@/lib/types"
import { cn, slugId } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Testimonial, type TestimonialItem } from "@/components/ui/testimonial"

export interface TestimonialsGridProps extends SectionBaseProps, ListSlotProps {
  items: TestimonialItem[]
  title?: string
  eyebrow?: string
  description?: string
  image?: ImageComponent
  /**
   * `masonry` lets columns have uneven heights, so quotes of different lengths leave no
   * gaps.
   */
  columns?: 2 | 3 | "masonry"
  variant?: "card" | "plain"
  align?: "start" | "center"
}

export function TestimonialsGrid({
  items,
  title,
  eyebrow,
  description,
  image,
  columns = 3,
  variant = "card",
  align = "center",
  listAs,
  itemAs,
  headingLevel = 2,
  as,
  spacing = "md",
  className,
  id,
}: TestimonialsGridProps) {
  const List = (listAs ?? "ul") as ElementType
  const Item = (itemAs ?? "li") as ElementType
  const titleId = title ? (id ? `${id}-title` : slugId(title)) : undefined
  const masonry = columns === "masonry"

  return (
    <Section
      as={as ?? (title ? "section" : "div")}
      spacing={spacing}
      labelledBy={titleId}
      id={id}
      className={className}
    >
      <Container className="flex flex-col gap-14">
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
            masonry
              ? "gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid"
              : "grid gap-6",
            !masonry && columns === 2 && "sm:grid-cols-2",
            !masonry && columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {items.map((item, index) => (
            <Item key={item.id ?? `${item.author.name}-${index}`}>
              <Testimonial {...item} image={image} variant={variant} />
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  )
}
