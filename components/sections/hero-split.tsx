import type { ElementType, ReactNode } from "react"

import type {
  CtaItem,
  HeadingLevel,
  LinkComponent,
  StackSlotProps,
} from "@/lib/types"
import { cn, slugId } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { CtaGroup } from "@/components/ui/cta-group"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"

export interface HeroSplitProps extends StackSlotProps {
  title: string
  description?: string
  eyebrow?: ReactNode
  actions?: CtaItem[]
  link?: LinkComponent
  note?: ReactNode
  banner?: ReactNode
  /** The right-hand column. Pass `<Image />`, a video, or anything else. */
  media?: ReactNode
  /** Extra content under the buttons, such as a logo strip or a stat row. */
  children?: ReactNode
  /** Puts the media on the left from `lg` up. Does not change DOM order. */
  reverse?: boolean
  headingLevel?: HeadingLevel
  size?: "md" | "lg"
  as?: "section" | "div"
  spacing?: "sm" | "md" | "lg" | "none"
  className?: string
  id?: string
}

const titleSizes = { md: "text-display-sm", lg: "text-display-md" } as const

export function HeroSplit({
  title,
  description,
  eyebrow,
  actions,
  link,
  note,
  banner,
  media,
  children,
  reverse = false,
  stackAs,
  blockAs,
  headingLevel = 1,
  size = "lg",
  as = "div",
  spacing = "lg",
  className,
  id,
}: HeroSplitProps) {
  const Stack = (stackAs ?? "div") as ElementType
  const Block = (blockAs ?? "div") as ElementType
  const titleId = id ? `${id}-title` : slugId(title)

  return (
    <Section
      as={as}
      spacing={spacing}
      labelledBy={as === "section" ? titleId : undefined}
      id={id}
      className={className}
    >
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Stack className={cn("flex flex-col gap-6", reverse && "lg:order-2")}>
          {banner ? <Block>{banner}</Block> : null}
          {eyebrow ? (
            <Block>
              <Eyebrow tone="primary">{eyebrow}</Eyebrow>
            </Block>
          ) : null}

          <Block>
            <Heading
              level={headingLevel}
              id={titleId}
              className={cn("text-balance font-semibold", titleSizes[size])}
            >
              {title}
            </Heading>
          </Block>

          {description ? (
            <Block>
              <p className="text-muted-foreground text-pretty text-lg">{description}</p>
            </Block>
          ) : null}

          {actions?.length ? (
            <Block>
              <CtaGroup items={actions} link={link} size="lg" stackOnMobile />
            </Block>
          ) : null}

          {note ? (
            <Block>
              <p className="text-muted-foreground text-pretty text-sm">{note}</p>
            </Block>
          ) : null}

          {children ? <Block>{children}</Block> : null}
        </Stack>

        {media ? (
          <div className={cn("min-w-0", reverse && "lg:order-1")}>{media}</div>
        ) : null}
      </Container>
    </Section>
  )
}
