/**
 * Sample content for the landing page. Replace every value with your own; the
 * shapes come from the section props, so the compiler tells you what is missing.
 */

import {
  ChartNoAxesColumnIcon,
  GaugeIcon,
  LayersIcon,
  LockIcon,
  RocketIcon,
  WaypointsIcon,
} from "lucide-react"

import type { CtaItem } from "@/lib/types"
import type { FaqItem } from "@/components/sections/faq-accordion"
import type { FeatureItem } from "@/components/sections/feature-grid"
import type { FeatureRowItem } from "@/components/sections/feature-rows"
import type { NavItem } from "@/components/sections/nav-top"
import type { LogoItem } from "@/components/ui/logo-mark"

export const ACTIONS: CtaItem[] = [
  { label: "Start building", href: "#start" },
  { label: "Read the docs", href: "#docs" },
]

export const LOGOS: LogoItem[] = [
  { name: "Northwind" },
  { name: "Contoso" },
  { name: "Umbrella" },
  { name: "Globex" },
  { name: "Initech" },
]

export const FEATURES: FeatureItem[] = [
  {
    icon: LayersIcon,
    title: "Composable sections",
    description: "Typed data plus slots. Pass items and children, not forty props.",
    href: "#composable",
  },
  {
    icon: GaugeIcon,
    title: "Server components first",
    description: "Only the drawer and the motion wrappers are client components.",
    href: "#rsc",
  },
  {
    icon: LockIcon,
    title: "One primitive library",
    description: "Base UI throughout. No Radix, and never both in the same tree.",
    href: "#base-ui",
  },
  {
    icon: WaypointsIcon,
    title: "Framework neutral",
    description:
      "Nothing imports next/*. Hand it next/image and next/link if you want them.",
  },
  {
    icon: RocketIcon,
    title: "Motion, optional",
    description: "Every section is static first. The motion variant wraps it.",
  },
  {
    icon: ChartNoAxesColumnIcon,
    title: "Verified, not asserted",
    description: "Contrast, axe and a real shadcn install all run in CI.",
  },
]

/** Stands in for whatever the consumer passes into a `media` slot. */
const MediaPlaceholder = ({
  label,
  ratio = "aspect-[4/3]",
}: {
  label: string
  ratio?: string
}) => (
  <div
    className={`bg-muted text-muted-foreground flex w-full items-center justify-center rounded-xl border text-sm ${ratio}`}
  >
    {label}
  </div>
)

export const ROWS: FeatureRowItem[] = [
  {
    eyebrow: "Install",
    title: "One command per piece",
    description:
      "Add exactly the section you need. Its dependencies — npm packages and other registry items — come with it.",
    bullets: ["Resolved from the real import graph", "Pinned to tested version ranges"],
    media: <MediaPlaceholder label="Install flow" />,
    href: "#install",
    linkLabel: "See the install guide",
  },
  {
    eyebrow: "Own it",
    title: "The source lands in your repo",
    description:
      "No wrapper package sitting between you and the markup. Change a class, delete a prop, rename the file.",
    bullets: ["Readable, commented source", "Strict TypeScript throughout"],
    media: <MediaPlaceholder label="Your repository" />,
  },
]

export const FAQS: FaqItem[] = [
  {
    question: "Is Facade UI free?",
    answer: "Yes. MIT licensed, with no paid tier and nothing held back.",
  },
  {
    question: "Do I need Next.js?",
    answer:
      "No. Nothing in the registry imports from next/*. Sections take component types for images and links, so next/image and next/link are pluggable rather than assumed.",
  },
  {
    question: "Can I use it in an existing shadcn project?",
    answer:
      "That is the design. Sections only reference shadcn's own token names, so they inherit your theme the moment they land.",
  },
  {
    question: "What about Radix?",
    answer:
      "Facade UI uses Base UI for every interactive primitive. Mixing two primitive libraries in one tree doubles the bundle and the bugs, so the registry never does.",
  },
]

export const NAV_ITEMS: NavItem[] = [
  { label: "Product", href: "#product" },
  {
    label: "Solutions",
    children: [
      {
        label: "For startups",
        href: "#startups",
        description: "Ship a landing page this afternoon.",
      },
      {
        label: "For agencies",
        href: "#agencies",
        description: "One theme, many client sites.",
      },
      {
        label: "For platforms",
        href: "#platforms",
        description: "Docs, marketing and app in one system.",
      },
    ],
  },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
]

export const FOOTER_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Sections", href: "#sections" },
      { label: "Atoms", href: "#atoms" },
      { label: "Templates", href: "#templates" },
      { label: "Changelog", href: "#changelog", badge: undefined },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Installation", href: "#installation" },
      { label: "Theming", href: "#theming" },
      { label: "Accessibility", href: "#accessibility" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com", external: true },
      { label: "Discussions", href: "https://github.com", external: true },
    ],
  },
]

export { MediaPlaceholder }

// ------------------------------------------------------------------ phase 2

export const STATS = [
  { value: "99.98%", label: "Uptime", description: "Rolling 90 days" },
  { value: "1.2K", srValue: "1200", label: "Teams onboarded" },
  { value: "18ms", label: "Median response" },
  { value: "216", label: "Accessibility checks", description: "Per commit" },
]

export const QUOTES = [
  {
    id: "rosa",
    rating: 5 as const,
    quote:
      "We replaced three hand-rolled landing pages in an afternoon. The sections dropped straight into our existing theme.",
    author: { name: "Rosa Iqbal", title: "Head of Design, Northwind" },
  },
  {
    id: "tomas",
    quote:
      "The accessibility work is already done, which is the part we always ran out of time for.",
    author: { name: "Tomas Lindqvist", title: "Engineering lead, Contoso" },
  },
  {
    id: "amara",
    rating: 5 as const,
    quote:
      "Reading the source was the sell. It is the code I would have written on a good day, and now it is in our repo.",
    author: { name: "Amara Okonkwo", title: "Staff engineer, Globex" },
  },
  {
    id: "jonas",
    quote: "One primitive library, one token layer. Our bundle went down, not up.",
    author: { name: "Jonas Weber", title: "Frontend lead, Initech" },
  },
]

export const PLANS = [
  {
    name: "Starter",
    price: "$0",
    srPrice: "Free",
    period: "/month",
    description: "Everything you need to ship a landing page.",
    features: [
      { label: "All sections and atoms" },
      { label: "Three theme presets" },
      { label: "Priority support", included: false },
    ],
    cta: { label: "Start free", href: "#start" },
  },
  {
    featured: true,
    name: "Team",
    price: "$29",
    srPrice: "29 dollars",
    period: "/month",
    description: "For teams shipping more than one site.",
    features: [
      { label: "Everything in Starter" },
      { label: "Shared theme tokens", note: "Sync across projects" },
      { label: "Priority support" },
    ],
    cta: { label: "Start a trial", href: "#trial" },
    footnote: "No card required for 14 days.",
  },
  {
    name: "Enterprise",
    price: "Custom",
    srPrice: "Custom pricing",
    description: "Procurement, SSO and an accessibility statement.",
    features: [
      { label: "Everything in Team" },
      { label: "SSO and SCIM" },
      { label: "VPAT on request" },
    ],
    cta: { label: "Talk to us", href: "#contact" },
  },
]

