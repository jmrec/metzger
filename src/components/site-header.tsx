import { Menu, Phone } from "lucide-react";
import { type MouseEvent, useCallback } from "react";

import { TextSizeToggle } from "@/components/text-size-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  HOME_HREF,
  NAV_LINKS,
  PHONE,
  PHONE_HREF,
  SITE_LOGO,
} from "@/lib/content";
import { cn } from "@/lib/utils";

/** Sheet exit animation (`duration-300`) runs before it releases body scroll. */
const SHEET_UNLOCK_MS = 350;

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SiteHeader() {
  const scrollToTarget = useCallback((href: string) => {
    const behavior: ScrollBehavior = reducedMotion() ? "auto" : "smooth";
    const target =
      href === HOME_HREF || href === "#"
        ? null
        : document.getElementById(href.slice(1));

    if (!target) {
      window.scrollTo({ top: 0, behavior });
      return;
    }

    target.scrollIntoView({ behavior, block: "start" });
  }, []);

  const handleNavClick = useCallback(
    (
      event: MouseEvent<HTMLAnchorElement>,
      href: string,
      afterSheetClose = false,
    ) => {
      const isAnchor = href.startsWith("#");
      const path = window.location.pathname.replace(/\/$/, "");
      const homePath = HOME_HREF.replace(/\/$/, "");

      // Route links (e.g. "Home") only intercept on the page they point at.
      if (!isAnchor && (href !== HOME_HREF || path !== homePath)) {
        return;
      }
      if (isAnchor && !document.getElementById(href.slice(1))) return;

      event.preventDefault();

      const scroll = () => {
        scrollToTarget(href);
        if (isAnchor) window.history.replaceState(null, "", href);
      };

      // The sheet traps body scroll until its exit animation completes.
      if (afterSheetClose) {
        window.setTimeout(scroll, SHEET_UNLOCK_MS);
      } else {
        scroll();
      }
    },
    [scrollToTarget],
  );

  return (
    <header className="site-header sticky top-0 z-40 border-b border-border bg-background/95 px-4 py-4 backdrop-blur md:px-10">
      <div className="mx-auto @container flex max-w-6xl items-center justify-between gap-4">
        <a href={HOME_HREF} className="flex shrink-0 items-center">
          <img
            src={SITE_LOGO}
            alt="Marci Metzger — The Ridge Realty Group"
            className="site-logo h-16 w-auto object-contain sm:h-20"
          />
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 @nav:flex"
        >
          {NAV_LINKS.map((link) => (
            <Button
              key={link.label}
              asChild
              variant="ghost"
              className="rounded-none text-sm font-semibold uppercase tracking-wider"
            >
              <a
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
              >
                {link.label}
              </a>
            </Button>
          ))}
          <Button
            asChild
            className="ml-2 rounded-none uppercase tracking-wider"
          >
            <a href={PHONE_HREF}>
              <Phone />
              {PHONE}
            </a>
          </Button>
        </nav>

        <div className="flex items-center gap-1">
          <TextSizeToggle />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-none @nav:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 gap-0 p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle className="text-sm font-black uppercase tracking-[0.2em]">
                  Menu
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation and contact options.
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col p-2">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <a
                      href={link.href}
                      onClick={(event) =>
                        handleNavClick(event, link.href, true)
                      }
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "justify-start rounded-none text-sm font-semibold uppercase tracking-wider",
                      )}
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto border-t p-4">
                <Button asChild className="w-full rounded-none">
                  <a href={PHONE_HREF}>
                    <Phone />
                    {PHONE}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
