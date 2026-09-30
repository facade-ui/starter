"use client"

/**
 * The landing page: one Facade UI template with the site's content.
 *
 * `"use client"` because the content carries icon components and the header is
 * a client component; icons cannot cross a server-to-client boundary as props.
 */

import Image from "next/image"
import Link from "next/link"

import { SaasLanding } from "@/components/templates/saas-landing"
import {
  ACTIONS,
  FAQS,
  FEATURES,
  FOOTER_GROUPS,
  LOGOS,
  MediaPlaceholder,
  NAV_ITEMS,
  PLANS,
  QUOTES,
  ROWS,
  STATS,
} from "@/content/sample"

export default function Page() {
  return (
    <SaasLanding
      image={Image}
      link={Link}
      currentPath="/"
      content={{
        brand: "Acme",
        nav: NAV_ITEMS,
        navActions: [
          { label: "Sign in", href: "#sign-in", variant: "ghost" },
          { label: "Start free", href: "#start" },
        ],
        hero: {
          eyebrow: "New: version 2.0",
          title: "The fastest way to ship your product",
          description:
            "Replace this with what your product does and who it is for. Keep it to two sentences.",
          actions: ACTIONS,
          note: "Free to start. No credit card required.",
          media: <MediaPlaceholder label="Product screenshot" />,
        },
        logos: { title: "Trusted by teams everywhere", items: LOGOS },
        features: {
          eyebrow: "Features",
          title: "Everything you need to launch",
          description: "Three to six features, each with one line of copy.",
          items: FEATURES,
        },
        rows: { eyebrow: "How it works", title: "From sign-up to first result", items: ROWS },
        stats: { eyebrow: "By the numbers", title: "Proof, not promises", items: STATS },
        testimonials: { eyebrow: "Customers", title: "What teams say", items: QUOTES.slice(0, 3) },
        pricing: {
          eyebrow: "Pricing",
          title: "Simple pricing",
          items: PLANS,
          note: "All prices exclude VAT.",
        },
        faq: { eyebrow: "FAQ", title: "Questions, answered", items: FAQS },
        cta: {
          title: "Ready when you are",
          description: "Start free today, and upgrade when your team grows.",
          actions: [{ label: "Get started", href: "#start" }],
        },
        footer: {
          groups: FOOTER_GROUPS,
          copyright: "© 2026 Acme, Inc.",
          legal: [
            { label: "Privacy", href: "#privacy" },
            { label: "Terms", href: "#terms" },
          ],
        },
      }}
    />
  )
}
