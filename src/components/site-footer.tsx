import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BUSINESS_NAME, SOCIAL_LINKS } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center text-xs text-muted-foreground">
        <nav
          aria-label="Social"
          className="flex flex-wrap justify-center gap-1"
        >
          {SOCIAL_LINKS.map((link) => (
            <Button
              key={link.label}
              asChild
              variant="link"
              size="sm"
              className="h-auto px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </Button>
          ))}
        </nav>
        <Separator className="max-w-xs" />
        <p className="uppercase tracking-widest">{BUSINESS_NAME}</p>
        <p>Copyright © 2026 Marci Metzger — All rights reserved</p>
      </div>
    </footer>
  );
}
