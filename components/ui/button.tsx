import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
} from "@base-ui-components/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
    "rounded-md font-medium",
    "duration-facade-fast ease-facade-out transition-[color,background-color,border-color,box-shadow,opacity]",
    "focus-visible:ring-ring focus-visible:ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&_svg:not([class*='size-'])]:size-5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground border",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground hover:text-foreground/80 underline underline-offset-4",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        /** 44px — the WCAG 2.5.5 target minimum, and the floor for every control. */
        sm: "h-11 px-4 text-sm",
        md: "h-12 px-5 text-base",
        lg: "h-14 px-7 text-base sm:text-lg",
        icon: "size-11 p-0",
      },
      fullWidth: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", fullWidth: false },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export type ButtonProps = BaseButtonProps &
  ButtonVariantProps & {
    /** Shows a spinner, sets `aria-busy`, and stops the button from being activated. */
    loading?: boolean
    /** Status text for screen readers, announced with the spinner. */
    loadingLabel?: string
  }

export function Button({
  variant,
  size,
  fullWidth,
  loading = false,
  loadingLabel = "Loading",
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      {...props}
      disabled={disabled === true || loading}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
    >
      {loading ? (
        <>
          <Loader2Icon aria-hidden className="animate-spin" />
          <span className="sr-only">{loadingLabel}</span>
        </>
      ) : null}
      {children}
    </BaseButton>
  )
}
