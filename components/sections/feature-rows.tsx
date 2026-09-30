import { CheckIcon } from "lucide-react"
import type { ElementType, ReactNode } from "react"

import type {
  HeadingLevel,
  LinkComponent,
  ListSlotProps,
  SectionBaseProps,
} from "@/lib/types"
import { cn, slugId } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"

export interface FeatureRowItem {
  title: string
  description: string
  /** The row's media. Pass `<Image />`, a video, a diagram. */
  media?: ReactNode
  eyebrow?: string
  bullets?: string[]
  /** Optional inline link under the copy. */
  href?: string
  linkLabel?: string
  external?: boolean
  /** Stable key when two rows share a title. */
  id?: string
}

export interface FeatureRowsProps extends SectionBaseProps, ListSlotProps {
  items: FeatureRowItem[]
  title?: string
  eyebrow?: string
  description?: string
  link?: LinkComponent
  itemHeadingLevel?: HeadingLevel
  /** Which side the first row's media sits on at `lg` and up. */
  mediaFirst?: boolean
  align?: "start" | "center"
}

export function FeatureRows({
  items,
  title,
  eyebrow,
  description,
  link,
  itemHeadingLevel,
  mediaFirst = false,
  align = "start",
  listAs,
  itemAs,
  headingLevel = 2,
  as,
  spacing = "md",
  className,
  id,
}: FeatureRowsProps) {
  const List = (listAs ?? "ul") as ElementType
  const Item = (itemAs ?? "li") as ElementType
  const Link = (link ?? "a") as ElementType
  const titleId = title ? (id ? `${id}-title` : slugId(title)) : undefined
  const itemLevel = itemHeadingLevel ?? (Math.min(headingLevel + 1, 6) as HeadingLevel)

  return (
    <Section
      as={as ?? (title ? "section" : "div")}
      spacing={spacing}
      labelledBy={titleId}
      id={id}
      className={className}
    >
      <Container className="flex flex-col gap-16">
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

        <List className="flex flex-col gap-16 sm:gap-24">
          {items.map((item, index) => {
            // Visual alternation only; the DOM order below never changes.
            const mediaOnLeft = index % 2 === (mediaFirst ? 0 : 1)

            return (
              <Item
                key={item.id ?? item.title}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <div className={cn("flex flex-col gap-5", mediaOnLeft && "lg:order-2")}>
                  {item.eyebrow ? <Eyebrow tone="primary">{item.eyebrow}</Eyebrow> : null}

                  <Heading
                    level={itemLevel}
                    className="text-display-sm text-balance font-semibold"
                  >
                    {item.title}
                  </Heading>

                  <p className="text-muted-foreground text-pretty text-lg">
                    {item.description}
                  </p>

                  {item.bullets?.length ? (
                    <ul className="flex flex-col gap-2.5">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm">
                          <CheckIcon
                            aria-hidden
                            focusable="false"
                            className="text-primary mt-0.5 size-4 shrink-0"
                          />
                          <span className="text-pretty">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {item.href ? (
                    <Link
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "w-fit",
                      )}
                    >
                      {item.linkLabel ?? `More about ${item.title}`}
                      {item.external ? (
                        <span className="sr-only"> (opens in a new tab)</span>
                      ) : null}
                    </Link>
                  ) : null}
                </div>

                {item.media ? (
                  <div className={cn("min-w-0", mediaOnLeft && "lg:order-1")}>
                    {item.media}
                  </div>
                ) : null}
              </Item>
            )
          })}
        </List>
      </Container>
    </Section>
  )
}
