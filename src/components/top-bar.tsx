import { Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBusinessHours } from "@/hooks/use-business-hours";
import { PHONE, PHONE_HREF } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TopBar() {
  const { isReady, isOpen, statusLabel, detailLabel, hoursLabel } =
    useBusinessHours();

  // Neutral while the status is unknown (server render), then green / red.
  const dotTone = !isReady
    ? "bg-primary-foreground/40"
    : isOpen
      ? "bg-emerald-400"
      : "bg-red-400";

  return (
    <div className="bg-primary px-4 py-2 text-primary-foreground md:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
        <Button
          asChild
          variant="ghost"
          size="xs"
          className="h-auto px-0 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-transparent hover:text-primary-foreground/80"
        >
          <a href={PHONE_HREF}>
            <Phone />
            Call now: {PHONE}
          </a>
        </Button>
        <Badge
          variant="default"
          className={cn(
            "h-auto rounded-none text-center text-[10px] font-semibold uppercase tracking-widest whitespace-normal sm:whitespace-nowrap",
            isReady && isOpen
              ? "text-primary-foreground"
              : "text-primary-foreground/70",
          )}
        >
          <span
            aria-hidden="true"
            className={cn("size-1.5 rounded-full", dotTone)}
          />
          {isReady
            ? `${statusLabel} · ${detailLabel}`
            : `${statusLabel} ${hoursLabel}`}
        </Badge>
      </div>
    </div>
  );
}
