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

export interface CtaBandProps extends StackSlotProps {
  title: string
  description?: string
  eyebrow?: ReactNode
  actions?: CtaItem[]
  link?: LinkComponent
  note?: ReactNode
  /**
   * `muted` and `card` sit inside the container. `primary` uses the primary colour as the
   * background.
   */
  variant?: "muted" | "card" | "primary" | "plain"
  /** `center` stacks everything; `split` puts the buttons beside the copy. */
  layout?: "center" | "split"
  headingLevel?: HeadingLevel
  as?: "section" | "div"
  spacing?: "sm" | "md" | "lg" | "none"
  className?: string
  id?: string
}

const surfaces = {
  muted: "bg-muted text-foreground",
  card: "bg-card text-card-foreground border",
  primary: "bg-primary text-primary-foreground",
  plain: "",
} as const

export function CtaBand({
  title,
  description,
  eyebrow,
  actions,
  link,
  note,
  variant = "muted",
  layout = "center",
  stackAs,
  blockAs,
  headingLevel = 2,
  as = "section",
  spacing = "md",
  className,
  id,
}: CtaBandProps) {
  const Stack = (stackAs ?? "div") as ElementType
  const Block = (blockAs ?? "div") as ElementType
  const titleId = id ? `${id}-title` : slugId(title)
  const inverted = variant === "primary"
  const centered = layout === "center"

  return (
    <Section
      as={as}
      spacing={spacing}
      labelledBy={as === "section" ? titleId : undefined}
      id={id}
      className={className}
    >
      <Container>
        <div
          className={cn(
            "rounded-2xl px-6 py-14 sm:px-12",
            surfaces[variant],
            variant === "plain" && "px-0 py-0",
          )}
        >
          <Stack
            className={cn(
              "flex flex-col gap-6",
              centered
                ? "items-center text-center"
                : "lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:text-left",
            )}
          >
            <Block
              className={cn(
                "flex flex-col gap-4",
                centered ? "items-center" : "max-w-2xl",
              )}
            >
              {eyebrow ? (
                <Eyebrow
                  tone={inverted ? "foreground" : "primary"}
                  className={inverted ? "text-primary-foreground" : undefined}
                >
                  {eyebrow}
                </Eyebrow>
              ) : null}

              <Heading
                level={headingLevel}
                id={titleId}
                className="text-display-sm text-balance font-semibold"
              >
                {title}
              </Heading>

              {description ? (
                <p
                  className={cn(
                    "text-pretty text-lg",
                    // Full strength: a bright primary and its label can be
                    // as close as 4.5:1, which leaves no room to fade.
                    inverted ? "text-primary-foreground" : "text-muted-foreground",
                    centered && "max-w-2xl",
                  )}
                >
                  {description}
                </p>
              ) : null}
            </Block>

            {actions?.length ? (
              <Block
                className={cn(
                  "flex flex-col gap-3",
                  centered && "w-full items-center sm:w-auto",
                )}
              >
                <CtaGroup
                  items={
                    inverted
                      ? actions.map((action, index) => ({
                          ...action,
                          // Primary and ghost both vanish on an inverted band;
                          // these variants bring their own surface.
                          variant:
                            action.variant ?? (index === 0 ? "secondary" : "outline"),
                        }))
                      : actions
                  }
                  link={link}
                  size="lg"
                  align={centered ? "center" : "start"}
                  stackOnMobile
                />
                {note ? (
                  <p
                    className={cn(
                      "text-pretty text-sm",
                      inverted ? "text-primary-foreground" : "text-muted-foreground",
                      centered && "text-center",
                    )}
                  >
                    {note}
                  </p>
                ) : null}
              </Block>
            ) : null}
          </Stack>
        </div>
      </Container>
    </Section>
  )
}
