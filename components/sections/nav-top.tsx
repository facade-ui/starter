"use client"

/**
 * NavTop — the site header: wordmark, primary navigation, and actions.
 *
 * Two navigations, one source of data. Above `lg` the links render through Base
 * UI's NavigationMenu, which gives items with children a hoverable, keyboard-
 * operable dropdown. Below `lg` the same array renders inside a Base UI Dialog
 * drawer.
 *
 * a11y: the hard parts, and who handles them.
 *
 *  - Drawer: Base UI's Dialog provides the focus trap, Escape to close, scroll
 *    lock and focus restoration to the trigger. Writing those by hand is how
 *    mobile menus end up leaking focus to the page behind them.
 *  - Dropdowns: NavigationMenu supplies `aria-expanded` and arrow-key movement.
 *    A dropdown trigger is a `<button>`, never a link — it opens something, it
 *    does not navigate.
 *  - The current page is marked with `aria-current="page"` from `currentPath`,
 *    so it is announced rather than only highlighted.
 *  - Exactly one `<nav>` landmark is exposed at a time: the drawer's nav is
 *    inside a dialog that does not exist until opened, and the desktop nav is
 *    `hidden` below `lg`, which removes it from the accessibility tree.
 *  - The whole bar is 64px tall with 44px targets, so it stays usable on a phone.
 *
 * The drawer's links close it with a controlled `open` state rather than by
 * wrapping them in `Dialog.Close`. `Dialog.Close` is a button component, and
 * rendering it as an anchor makes Base UI warn and then either emit an invalid
 * `type="button"` on the anchor or, with `nativeButton={false}`, announce a
 * navigating control as a button. A real link with an `onClick` that closes is
 * both correct and simpler.
 *
 * This component is `"use client"` because the drawer holds open state. It is
 * the only section in the registry that does.
 *
 * Dependencies: @base-ui-components/react, lucide-react, react,
 * @/lib/types, @/lib/utils, @/components/ui/button,
 * @/components/ui/container.
 */

import { Dialog } from "@base-ui-components/react/dialog"
import { NavigationMenu } from "@base-ui-components/react/navigation-menu"
import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react"
import { useState, type ElementType, type ReactNode } from "react"

import type { CtaItem, LinkComponent } from "@/lib/types"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export interface NavChild {
  label: string
  href: string
  description?: string
  external?: boolean
}

export interface NavItem {
  label: string
  /** A plain link. Omit when the item only opens a dropdown. */
  href?: string
  /** Turns the item into a dropdown. */
  children?: NavChild[]
  external?: boolean
}

export interface NavTopProps {
  items: NavItem[]
  /** Wordmark or logo. Wrapped in a link to `homeHref`. */
  brand: ReactNode
  homeHref?: string
  /** Buttons on the right. They are repeated at the bottom of the drawer. */
  actions?: CtaItem[]
  link?: LinkComponent
  /** Marks the matching item with `aria-current="page"`. */
  currentPath?: string
  /** Keeps the header at the top of the viewport. */
  sticky?: boolean
  /** Label for the drawer trigger and dialog. */
  menuLabel?: string
  className?: string
  id?: string
}

const isActive = (href: string | undefined, currentPath: string | undefined): boolean =>
  Boolean(
    href &&
    currentPath &&
    (href === currentPath || (href !== "/" && currentPath.startsWith(href))),
  )

const triggerClass =
  "text-muted-foreground hover:text-foreground hover:bg-accent/60 focus-visible:ring-ring duration-facade-fast ease-facade-out inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none data-[popup-open]:text-foreground"

export function NavTop({
  items,
  brand,
  homeHref = "/",
  actions = [],
  link,
  currentPath,
  sticky = true,
  menuLabel = "Menu",
  className,
  id,
}: NavTopProps) {
  const Link = (link ?? "a") as ElementType
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  const externalProps = (external?: boolean) =>
    external ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <header
      id={id}
      className={cn(
        "border-border bg-background/85 z-40 border-b backdrop-blur-md",
        sticky && "sticky top-0",
        className,
      )}
    >
      <Container className="flex h-16 items-center gap-3">
        <Link
          href={homeHref}
          className="focus-visible:ring-ring mr-2 inline-flex items-center rounded-md text-base font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2"
        >
          {brand}
        </Link>

        {/* Desktop. `hidden` keeps it out of the accessibility tree below lg. */}
        <NavigationMenu.Root
          aria-label="Main"
          className="hidden min-w-0 lg:flex lg:items-center"
        >
          {/*
            Base UI 1.0.0-rc.0 puts `aria-orientation="horizontal"` on the list.
            ARIA does not allow that attribute on `role="list"`, and axe flags it
            as a critical violation. Passing it explicitly as undefined drops the
            attribute; the arrow-key behaviour it described is handled by Base
            UI's composite regardless. Revisit when upstream fixes it.
          */}
          <NavigationMenu.List
            aria-orientation={undefined}
            className="flex items-center gap-1"
          >
            {items.map((item) =>
              item.children?.length ? (
                <NavigationMenu.Item key={item.label}>
                  <NavigationMenu.Trigger className={triggerClass}>
                    {item.label}
                    <NavigationMenu.Icon>
                      <ChevronDownIcon
                        aria-hidden
                        focusable="false"
                        className="duration-facade-fast ease-facade-out size-4 transition-transform data-[popup-open]:rotate-180"
                      />
                    </NavigationMenu.Icon>
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content className="w-[min(28rem,90vw)] p-2">
                    <ul className="flex flex-col gap-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenu.Link
                            render={
                              <Link
                                href={child.href}
                                {...externalProps(child.external)}
                              />
                            }
                            active={isActive(child.href, currentPath)}
                            aria-current={
                              isActive(child.href, currentPath) ? "page" : undefined
                            }
                            className="hover:bg-accent focus-visible:ring-ring flex flex-col gap-0.5 rounded-md p-3 transition-colors focus-visible:outline-none focus-visible:ring-2"
                          >
                            <span className="text-foreground text-sm font-medium">
                              {child.label}
                              {child.external ? (
                                <span className="sr-only"> (opens in a new tab)</span>
                              ) : null}
                            </span>
                            {child.description ? (
                              <span className="text-muted-foreground text-pretty text-sm">
                                {child.description}
                              </span>
                            ) : null}
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              ) : (
                <NavigationMenu.Item key={item.label}>
                  <NavigationMenu.Link
                    render={
                      <Link href={item.href ?? "#"} {...externalProps(item.external)} />
                    }
                    active={isActive(item.href, currentPath)}
                    aria-current={isActive(item.href, currentPath) ? "page" : undefined}
                    className={cn(
                      triggerClass,
                      isActive(item.href, currentPath) && "text-foreground",
                    )}
                  >
                    {item.label}
                    {item.external ? (
                      <span className="sr-only"> (opens in a new tab)</span>
                    ) : null}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ),
            )}
          </NavigationMenu.List>

          <NavigationMenu.Portal>
            <NavigationMenu.Positioner
              sideOffset={10}
              collisionPadding={16}
              className="z-50"
            >
              <NavigationMenu.Popup className="bg-popover text-popover-foreground duration-facade-base ease-facade-out origin-[var(--transform-origin)] rounded-xl border shadow-lg transition-[opacity,transform] data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
                <NavigationMenu.Viewport />
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Root>

        <div className="ml-auto flex items-center gap-2">
          {actions.length > 0 ? (
            <div className="hidden items-center gap-2 sm:flex">
              {actions.map((action, index) => (
                <Link
                  key={action.href}
                  href={action.href}
                  {...externalProps(action.external)}
                  className={buttonVariants({
                    variant:
                      action.variant ??
                      (index === actions.length - 1 ? "primary" : "ghost"),
                    size: "sm",
                  })}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}

          {/* Mobile drawer. */}
          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            {/*
              Styled with `buttonVariants` rather than `render={<Button />}`.
              Base UI inspects the element handed to `render` to decide whether
              it is a native button, and cannot see through a wrapper component
              — so the Button form logs a warning on every mount even though the
              DOM ends up correct. Base UI already renders a real <button> here.
            */}
            <Dialog.Trigger
              aria-label={menuLabel}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "lg:hidden",
              )}
            >
              <MenuIcon aria-hidden focusable="false" />
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Backdrop className="duration-facade-base fixed inset-0 z-50 bg-black/50 transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
              <Dialog.Popup className="bg-background duration-facade-base ease-facade-out fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col gap-6 overflow-y-auto border-l p-6 transition-transform data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full">
                <div className="flex items-center justify-between gap-4">
                  <Dialog.Title className="text-base font-semibold">
                    {menuLabel}
                  </Dialog.Title>
                  <Dialog.Close
                    aria-label="Close menu"
                    className={buttonVariants({ variant: "ghost", size: "icon" })}
                  >
                    <XIcon aria-hidden focusable="false" />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">
                  Site navigation and account actions.
                </Dialog.Description>

                <nav aria-label="Main" className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.label} className="flex flex-col gap-1">
                      {item.href ? (
                        <Link
                          href={item.href}
                          {...externalProps(item.external)}
                          aria-current={
                            isActive(item.href, currentPath) ? "page" : undefined
                          }
                          onClick={closeMenu}
                          className={cn(
                            "focus-visible:ring-ring flex min-h-11 items-center rounded-md text-base font-medium focus-visible:outline-none focus-visible:ring-2",
                            isActive(item.href, currentPath)
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <p className="text-foreground text-sm font-semibold">
                          {item.label}
                        </p>
                      )}

                      {item.children?.length ? (
                        <ul className="border-border flex flex-col border-l pl-4">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                {...externalProps(child.external)}
                                aria-current={
                                  isActive(child.href, currentPath) ? "page" : undefined
                                }
                                onClick={closeMenu}
                                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring flex min-h-11 items-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </nav>

                {actions.length > 0 ? (
                  <div className="mt-auto flex flex-col gap-2 pt-4">
                    {actions.map((action, index) => (
                      <Link
                        key={action.href}
                        href={action.href}
                        {...externalProps(action.external)}
                        onClick={closeMenu}
                        className={buttonVariants({
                          variant:
                            action.variant ??
                            (index === actions.length - 1 ? "primary" : "outline"),
                          size: "md",
                          fullWidth: true,
                        })}
                      >
                        {action.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </Container>
    </header>
  )
}
