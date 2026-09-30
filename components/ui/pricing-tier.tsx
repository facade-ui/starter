import { CheckIcon, XIcon } from "lucide-react"
import type { ElementType, ReactNode } from "react"

import type { CtaItem, HeadingLevel, LinkComponent } from "@/lib/types"
import { cn, slugId } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"

export interface PricingFeature {
  label: string
  /** Default `true`. `false` renders a struck row with hidden "Not included". */
  included?: boolean
  /** Extra detail shown under the feature. */
  note?: string
}

export interface PricingTierItem {
  name: string
  /** Display form, e.g. `"$29"`. */
  price: string
  /** Spoken form, e.g. `"29 dollars"`. Strongly recommended. */
  srPrice?: string
  /** Billing cadence, e.g. `"/month"`. */
  period?: string
  description?: string
  features: PricingFeature[]
  cta: CtaItem
  /** Marks this tier as the recommended one. */
  featured?: boolean
  /** Text for the featured flag. Defaults to `"Most popular"`. */
  featuredLabel?: string
  /** Small print under the CTA. */
  footnote?: string
}

export interface PricingTierProps extends PricingTierItem {
  link?: LinkComponent
  /** Heading level of the plan name. Defaults to `3`, below a section `<h2>`. */
  headingLevel?: HeadingLevel
  as?: "li" | "div"
  className?: string
  children?: ReactNode
}

export function PricingTier({
  name,
  price,
  srPrice,
  period,
  description,
  features,
  cta,
  featured = false,
  featuredLabel = "Most popular",
  footnote,
  link,
  headingLevel = 3,
  as = "li",
  className,
  children,
}: PricingTierProps) {
  const Link = (link ?? "a") as ElementType
  const Root = as as ElementType
  const flagId = featured ? `${slugId(name, "tier")}-flag` : undefined

  return (
    <Root
      className={cn(
        "bg-card text-card-foreground relative flex h-full flex-col gap-6 rounded-xl border p-6 sm:p-8",
        featured && "border-primary ring-primary shadow-lg ring-1",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <Heading level={headingLevel} className="text-foreground text-lg font-semibold">
            {name}
          </Heading>
          {featured ? (
            <Badge id={flagId} variant="primary" size="sm">
              {featuredLabel}
            </Badge>
          ) : null}
        </div>
        {description ? (
          <p className="text-muted-foreground text-pretty text-sm">{description}</p>
        ) : null}
      </div>

      <p className="flex items-baseline gap-1">
        <span
          aria-hidden
          className="text-foreground text-display-sm font-semibold tracking-tight"
        >
          {price}
        </span>
        {period ? (
          <span aria-hidden className="text-muted-foreground text-sm">
            {period}
          </span>
        ) : null}
        <span className="sr-only">
          {srPrice ?? price}
          {period ? ` ${period.replace(/^\//, "per ")}` : ""}
        </span>
      </p>

      <ul className="flex flex-1 flex-col gap-3">
        {features.map((feature) => {
          const included = feature.included ?? true
          const Icon = included ? CheckIcon : XIcon
          return (
            <li key={feature.label} className="flex items-start gap-3 text-sm">
              <Icon
                aria-hidden
                focusable="false"
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  included ? "text-primary" : "text-muted-foreground",
                )}
              />
              <span
                className={cn(
                  "flex flex-col gap-0.5",
                  !included && "text-muted-foreground",
                )}
              >
                <span className={cn(!included && "line-through")}>
                  <span className="sr-only">
                    {included ? "Included: " : "Not included: "}
                  </span>
                  {feature.label}
                </span>
                {feature.note ? (
                  <span className="text-muted-foreground text-xs">{feature.note}</span>
                ) : null}
              </span>
            </li>
          )
        })}
      </ul>

      {children}

      <div className="flex flex-col gap-2">
        <Link
          href={cta.href}
          aria-describedby={flagId}
          aria-label={cta["aria-label"] ?? `${cta.label} — ${name}`}
          {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={cn(
            buttonVariants({
              variant: cta.variant ?? (featured ? "primary" : "outline"),
              size: "md",
              fullWidth: true,
            }),
          )}
        >
          {cta.label}
        </Link>
        {footnote ? (
          <p className="text-muted-foreground text-pretty text-center text-xs">
            {footnote}
          </p>
        ) : null}
      </div>
    </Root>
  )
}
