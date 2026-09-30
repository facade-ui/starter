import type { ComponentPropsWithoutRef } from "react"

import type { HeadingLevel } from "@/lib/types"

export interface HeadingProps extends ComponentPropsWithoutRef<"h2"> {
  /** 1 to 6. Sets the heading level, not the visual size. */
  level: HeadingLevel
}

export function Heading({ level, children, ...props }: HeadingProps) {
  switch (level) {
    case 1:
      return <h1 {...props}>{children}</h1>
    case 2:
      return <h2 {...props}>{children}</h2>
    case 3:
      return <h3 {...props}>{children}</h3>
    case 4:
      return <h4 {...props}>{children}</h4>
    case 5:
      return <h5 {...props}>{children}</h5>
    case 6:
      return <h6 {...props}>{children}</h6>
  }
}
