import type { ElementType } from "react"

import type {
  ImageComponent,
  LinkComponent,
  ListSlotProps,
  SectionBaseProps,
} from "@/lib/types"
import { cn, slugId } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { LogoMark, type LogoItem } from "@/components/ui/logo-mark"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"

export interface LogoCloudProps extends SectionBaseProps, ListSlotProps {
  items: LogoItem[]
  /** Optional heading. Omit it for a plain strip under a hero. */
  title?: string
  eyebrow?: string
  description?: string
  image?: ImageComponent
  link?: LinkComponent
  /** Rendered logo height. */
  size?: "sm" | "md" | "lg"
  /** Show each company name as text beside its mark. */
  showNames?: boolean
  /** `row` wraps logos on a line. `grid` gives every logo equal width. */
  layout?: "row" | "grid"
  /** Shows logos in grey and faded until hover or focus. */
  muted?: boolean
}

export function LogoCloud({
  items,
  title,
  eyebrow,
  description,
  image,
  link,
  size = "md",
  showNames = false,
  layout = "row",
  muted = true,
  listAs,
  itemAs,
  headingLevel = 2,
  as,
  spacing = "sm",
  className,
  id,
}: LogoCloudProps) {
  const List = (listAs ?? "ul") as ElementType
  const Item = (itemAs ?? "li") as ElementType
  const titleId = title ? (id ? `${id}-title` : slugId(title)) : undefined

  return (
    <Section
      as={as ?? (title ? "section" : "div")}
      spacing={spacing}
      labelledBy={titleId}
      id={id}
      className={className}
    >
      <Container className="flex flex-col gap-10">
        {title ? (
          <SectionHeader
            align="center"
            size="sm"
            eyebrow={eyebrow}
            title={title}
            description={description}
            headingLevel={headingLevel}
            titleId={titleId}
          />
        ) : null}

        <List
          className={cn(
            layout === "row"
              ? "flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14"
              : "grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 lg:grid-cols-5",
          )}
        >
          {items.map((item) => (
            <Item key={item.name}>
              <LogoMark
                {...item}
                image={image}
                link={link}
                size={size}
                muted={muted}
                showName={showNames}
              />
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  )
}
