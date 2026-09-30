import type { ElementType, ReactNode } from "react"

/** `<h1>` is reserved for the page; sections start at `<h2>`. */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

/** Maps a heading level to its tag. Use the `Heading` atom to render one. */
export type HeadingTag = `h${HeadingLevel}`

/**
 * The image props that sections pass to your image component. All are valid DOM
 * attributes, so the default `"img"` element works, and they also match `next/image`.
 */
export interface FacadeImageProps {
  src: string
  /** Required. Pass `""` only for decorative images. */
  alt: string
  width?: number
  height?: number
  className?: string
  sizes?: string
  loading?: "eager" | "lazy"
  decoding?: "async" | "auto" | "sync"
  fetchPriority?: "high" | "low" | "auto"
}

/** Drop-in for `next/image`, or the default `"img"`. */
export type ImageComponent = ElementType<FacadeImageProps>

/** The link props that sections pass to your link component. */
export interface FacadeLinkProps {
  href: string
  children?: ReactNode
  className?: string
  target?: string
  rel?: string
  "aria-current"?: "page" | "step" | "location" | "date" | "time" | "true" | "false"
  "aria-label"?: string
}

/** Drop-in for `next/link`, or the default `"a"`. */
export type LinkComponent = ElementType<FacadeLinkProps>

/**
 * Any icon component. Structural rather than nominal, so `lucide-react`,
 * `@heroicons/react`, a local SVG component, or anything else that accepts
 * SVG props can be passed without the registry depending on that library.
 *
 * One React Server Components caveat, which bites in exactly one place: an icon
 * component cannot be passed as a prop *across* a server-to-client boundary.
 * Most icon libraries, `lucide-react` included, do not mark their modules
 * `"use client"`, so the reference is a plain function that React refuses to
 * serialise. Static sections are server components and render icons in the same
 * tree, so they are unaffected. A `-motion` variant *is* a client component, so
 * whatever renders it must be a client component too. Adding `"use client"` to
 * the file that passes the icons is the whole fix.
 */
export type IconComponent = ElementType<{
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
  strokeWidth?: number | string
  focusable?: boolean | "true" | "false"
}>

/** A call to action rendered by `CtaGroup` and by most sections' `actions` slot. */
export interface CtaItem {
  label: string
  href: string
  /** Defaults to `primary` for the first action and `outline` for the rest. */
  variant?: "primary" | "secondary" | "outline" | "ghost"
  /** Set for links that leave the site; adds `rel="noopener noreferrer"`. */
  external?: boolean
  "aria-label"?: string
}

/**
 * Lets you replace the elements a section uses for its list.
 *
 * By default a section renders `ul` and `li`. The `-motion` variant passes `Stagger` and
 * `StaggerItem` instead, so items animate one by one while the static file imports
 * nothing from `motion`.
 */
export interface ListSlotProps {
  /** Wraps the list. Defaults to `"ul"`. */
  listAs?: ElementType
  /** Wraps each item. Defaults to `"li"`. */
  itemAs?: ElementType
}

/**
 * The same as `ListSlotProps`, for sections made of stacked blocks instead of a list,
 * such as heroes and CTA bands.
 *
 * By default a section renders `div`s. The `-motion` variant passes `Stagger` and
 * `StaggerItem`, so the eyebrow, headline, text and buttons appear in sequence.
 */
export interface StackSlotProps {
  /** Wraps the content stack. Defaults to `"div"`. */
  stackAs?: ElementType
  /** Wraps each block in the stack. Defaults to `"div"`. */
  blockAs?: ElementType
}

/** Props shared by every section. */
export interface SectionBaseProps {
  /** Heading level for the section's own title. Defaults to `2`. */
  headingLevel?: HeadingLevel
  /**
   * Root element. Defaults to `"section"`. Use `"div"` when it is already inside a
   * `<section>`.
   */
  as?: "section" | "div" | "article" | "aside"
  className?: string
  /** Vertical spacing. Uses the `--facade-section-y*` tokens. */
  spacing?: "sm" | "md" | "lg" | "none"
  id?: string
}
