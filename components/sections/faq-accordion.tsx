import { Accordion } from "@base-ui-components/react/accordion"
import { ChevronDownIcon } from "lucide-react"
import type { ElementType, ReactNode } from "react"

import type { HeadingLevel, ListSlotProps, SectionBaseProps } from "@/lib/types"
import { cn, slugId } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"

export interface FaqItem {
  question: string
  /** Rich content is fine; only string answers reach the structured data. */
  answer: ReactNode
  /** Plain-text answer for `schemaOrg`, when `answer` contains markup. */
  plainAnswer?: string
  /** Stable value. Defaults to a slug of the question. */
  value?: string
}

export interface FaqAccordionProps extends SectionBaseProps, ListSlotProps {
  items: FaqItem[]
  title?: string
  eyebrow?: string
  description?: string
  /** Questions that start open, by `value` (or question slug). */
  defaultOpen?: string[]
  /** Allow several answers open at once. Default `false`. */
  multiple?: boolean
  itemHeadingLevel?: HeadingLevel
  /** Lets browser find-in-page reach closed answers. Default `true`. */
  hiddenUntilFound?: boolean
  align?: "start" | "center"
  /** Adds FAQPage JSON-LD for the items with plain-text answers. */
  schemaOrg?: boolean
}

const valueOf = (item: FaqItem): string => item.value ?? slugId(item.question, "faq")

export function FaqAccordion({
  items,
  title,
  eyebrow,
  description,
  defaultOpen = [],
  multiple = false,
  itemHeadingLevel,
  hiddenUntilFound = true,
  align = "start",
  schemaOrg = false,
  listAs,
  itemAs,
  headingLevel = 2,
  as,
  spacing = "md",
  className,
  id,
}: FaqAccordionProps) {
  const Wrapper = (listAs ?? "div") as ElementType
  const Item = (itemAs ?? "div") as ElementType
  const titleId = title ? (id ? `${id}-title` : slugId(title)) : undefined
  const itemLevel = itemHeadingLevel ?? (Math.min(headingLevel + 1, 6) as HeadingLevel)

  const structured = schemaOrg
    ? items
        .map((item) => ({
          question: item.question,
          text:
            item.plainAnswer ??
            (typeof item.answer === "string" ? item.answer : undefined),
        }))
        .filter((entry): entry is { question: string; text: string } =>
          Boolean(entry.text),
        )
    : []

  return (
    <Section
      as={as ?? (title ? "section" : "div")}
      spacing={spacing}
      labelledBy={titleId}
      id={id}
      className={className}
    >
      <Container size="md" className="flex flex-col gap-12">
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

        <Accordion.Root
          multiple={multiple}
          defaultValue={defaultOpen}
          hiddenUntilFound={hiddenUntilFound}
          render={<Wrapper />}
          className="divide-border border-border flex flex-col divide-y border-y"
        >
          {items.map((item) => (
            <Accordion.Item key={valueOf(item)} value={valueOf(item)} render={<Item />}>
              <Accordion.Header render={<Heading level={itemLevel} />}>
                <Accordion.Trigger
                  className={cn(
                    "text-foreground group flex w-full items-center justify-between gap-4",
                    "min-h-14 py-5 text-left text-base font-medium sm:text-lg",
                    "duration-facade-fast ease-facade-out hover:text-foreground/80 cursor-pointer transition-colors",
                    "focus-visible:ring-ring rounded-sm outline-none focus-visible:ring-2",
                  )}
                >
                  <span className="text-pretty">{item.question}</span>
                  <ChevronDownIcon
                    aria-hidden
                    focusable="false"
                    className="text-muted-foreground duration-facade-base ease-facade-out size-5 shrink-0 transition-transform group-data-[panel-open]:rotate-180"
                  />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Panel
                className={cn(
                  "h-[var(--accordion-panel-height)] overflow-hidden",
                  "duration-facade-base ease-facade-out transition-[height]",
                  "data-[ending-style]:h-0 data-[starting-style]:h-0",
                )}
              >
                <div className="text-muted-foreground text-pretty pb-6 text-base">
                  {item.answer}
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        {structured.length > 0 ? (
          <script
            type="application/ld+json"
            // Values come from the page's own content, not from user input.
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: structured.map((entry) => ({
                  "@type": "Question",
                  name: entry.question,
                  acceptedAnswer: { "@type": "Answer", text: entry.text },
                })),
              }),
            }}
          />
        ) : null}
      </Container>
    </Section>
  )
}
