import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Turns heading text into a stable DOM id for `aria-labelledby`.
 *
 * Sections are server components, so `useId()` is unavailable — and a hydration-
 * stable id derived from content is preferable anyway. Pass an explicit `id` to
 * a section when two headings on one page would otherwise slugify identically.
 */
export function slugId(text: string, prefix = "facade"): string {
  const slug = text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
  return slug ? `${prefix}-${slug}` : `${prefix}-section`
}
