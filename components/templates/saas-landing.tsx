import type { ReactNode } from "react"

import type { CtaItem, ImageComponent, LinkComponent } from "@/lib/types"
import { CtaBand } from "@/components/sections/cta-band"
import { FaqAccordion, type FaqItem } from "@/components/sections/faq-accordion"
import { FeatureGrid, type FeatureItem } from "@/components/sections/feature-grid"
import { FeatureRows, type FeatureRowItem } from "@/components/sections/feature-rows"
import { Footer, type FooterGroup, type FooterLink } from "@/components/sections/footer"
import { HeroSplit } from "@/components/sections/hero-split"
import { LogoCloud } from "@/components/sections/logo-cloud"
import { NavTop, type NavItem } from "@/components/sections/nav-top"
import { PricingTiers } from "@/components/sections/pricing-tiers"
import { Stats } from "@/components/sections/stats"
import { TestimonialsGrid } from "@/components/sections/testimonials-grid"
import type { LogoItem } from "@/components/ui/logo-mark"
import type { PricingTierItem } from "@/components/ui/pricing-tier"
import type { StatItem } from "@/components/ui/stat"
import type { TestimonialItem } from "@/components/ui/testimonial"

export interface SaasLandingContent {
  brand: ReactNode
  nav: NavItem[]
  navActions?: CtaItem[]

  hero: {
    eyebrow?: string
    title: string
    description: string
    actions: CtaItem[]
    note?: ReactNode
    media?: ReactNode
  }

  logos?: { title?: string; items: LogoItem[] }
  stats?: { title?: string; eyebrow?: string; items: StatItem[] }

  features: {
    eyebrow?: string
    title: string
    description?: string
    items: FeatureItem[]
  }

  rows?: {
    eyebrow?: string
    title?: string
    description?: string
    items: FeatureRowItem[]
  }

  testimonials?: {
    eyebrow?: string
    title: string
    description?: string
    items: TestimonialItem[]
  }

  pricing?: {
    eyebrow?: string
    title: string
    description?: string
    items: PricingTierItem[]
    note?: ReactNode
  }

  faq?: {
    eyebrow?: string
    title: string
    description?: string
    items: FaqItem[]
  }

  cta: {
    eyebrow?: string
    title: string
    description?: string
    actions: CtaItem[]
    note?: ReactNode
  }

  footer: {
    groups?: FooterGroup[]
    brand?: ReactNode
    copyright?: ReactNode
    legal?: FooterLink[]
  }
}

export interface SaasLandingProps {
  content: SaasLandingContent
  image?: ImageComponent
  link?: LinkComponent
  /** Marks the active nav item. */
  currentPath?: string
  /** Shown above the header. Usually a `Banner`. */
  banner?: ReactNode
}

export function SaasLanding({
  content,
  image,
  link,
  currentPath,
  banner,
}: SaasLandingProps) {
  const { hero, logos, stats, features, rows, testimonials, pricing, faq, cta, footer } =
    content

  return (
    <>
      {banner}

      <NavTop
        brand={content.brand}
        items={content.nav}
        actions={content.navActions}
        link={link}
        currentPath={currentPath}
      />

      <main id="main">
        {/* The only h1 on the page. */}
        <HeroSplit
          eyebrow={hero.eyebrow}
          title={hero.title}
          description={hero.description}
          actions={hero.actions}
          note={hero.note}
          media={hero.media}
          link={link}
          headingLevel={1}
          spacing="lg"
        />

        {logos ? (
          <LogoCloud
            title={logos.title}
            items={logos.items}
            image={image}
            link={link}
            headingLevel={2}
            spacing="sm"
          />
        ) : null}

        <FeatureGrid
          eyebrow={features.eyebrow}
          title={features.title}
          description={features.description}
          items={features.items}
          link={link}
          headingLevel={2}
          itemHeadingLevel={3}
          align="center"
        />

        {rows ? (
          <FeatureRows
            eyebrow={rows.eyebrow}
            title={rows.title}
            description={rows.description}
            items={rows.items}
            link={link}
            headingLevel={2}
            itemHeadingLevel={3}
            align="center"
          />
        ) : null}

        {stats ? (
          <Stats
            eyebrow={stats.eyebrow}
            title={stats.title}
            items={stats.items}
            headingLevel={2}
            className="border-y"
          />
        ) : null}

        {testimonials ? (
          <TestimonialsGrid
            eyebrow={testimonials.eyebrow}
            title={testimonials.title}
            description={testimonials.description}
            items={testimonials.items}
            image={image}
            headingLevel={2}
          />
        ) : null}

        {pricing ? (
          <PricingTiers
            eyebrow={pricing.eyebrow}
            title={pricing.title}
            description={pricing.description}
            items={pricing.items}
            note={pricing.note}
            link={link}
            headingLevel={2}
            tierHeadingLevel={3}
          />
        ) : null}

        {faq ? (
          <FaqAccordion
            eyebrow={faq.eyebrow}
            title={faq.title}
            description={faq.description}
            items={faq.items}
            headingLevel={2}
            itemHeadingLevel={3}
            align="center"
            schemaOrg
          />
        ) : null}

        <CtaBand
          eyebrow={cta.eyebrow}
          title={cta.title}
          description={cta.description}
          actions={cta.actions}
          note={cta.note}
          link={link}
          headingLevel={2}
          variant="primary"
        />
      </main>

      <Footer
        brand={footer.brand ?? content.brand}
        groups={footer.groups}
        copyright={footer.copyright}
        legal={footer.legal}
        link={link}
        headingLevel={2}
      />
    </>
  )
}
