import type { ElementType } from "react"

import type { ImageComponent, LinkComponent } from "@/lib/types"
import { cn } from "@/lib/utils"

export interface LogoItem {
  /** Company name. Always exposed to assistive tech. */
  name: string
  src?: string
  width?: number
  height?: number
  /** Links the logo. Omit for a non-interactive wall. */
  href?: string
}

export interface LogoMarkProps extends LogoItem {
  /** Your image component, such as `next/image`. Defaults to `"img"`. */
  image?: ImageComponent
  /** Your link component, such as `next/link`. Defaults to `"a"`. */
  link?: LinkComponent
  /** Height in px. The width keeps the logo's proportions. */
  size?: "sm" | "md" | "lg"
  /** Shows the logo in grey until hover or focus. Default `true`. */
  muted?: boolean
  /** Shows the name as visible text instead of hiding it. */
  showName?: boolean
  className?: string
}

const heights = { sm: "h-6", md: "h-8", lg: "h-10" } as const

export function LogoMark({
  name,
  src,
  href,
  width,
  height,
  image,
  link,
  size = "md",
  muted = true,
  showName = false,
  className,
}: LogoMarkProps) {
  const Image = (image ?? "img") as ElementType
  const Link = (link ?? "a") as ElementType

  // Only ever applied to the image. Text keeps its full contrast.
  const imageTreatment = cn(
    "w-auto object-contain",
    heights[size],
    muted &&
      "duration-facade-base ease-facade-out opacity-70 grayscale transition-[opacity,filter] group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0",
  )

  const content = src ? (
    <>
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={imageTreatment}
      />
      <span
        className={showName ? "text-muted-foreground text-sm font-medium" : "sr-only"}
      >
        {name}
      </span>
    </>
  ) : (
    <span
      className={cn(
        "text-muted-foreground text-lg font-semibold tracking-tight",
        heights[size],
        "flex items-center",
      )}
    >
      {name}
    </span>
  )

  const shared = cn("group inline-flex items-center gap-2", className)

  if (!href) {
    return <span className={shared}>{content}</span>
  }

  return (
    <Link
      href={href}
      className={cn(
        shared,
        "focus-visible:ring-ring focus-visible:ring-offset-background rounded-md outline-none focus-visible:ring-2 focus-visible:ring-offset-4",
      )}
    >
      {content}
    </Link>
  )
}
