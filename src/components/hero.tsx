import { Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IMAGES, PHONE, PHONE_HREF } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={IMAGES.hero}
        alt="Pahrump landscape"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-media-scrim" />
      <div className="relative mx-auto flex min-h-[75vh] max-w-6xl flex-col items-center justify-center gap-4 px-6 py-24 text-center text-media-foreground">
        <Badge
          variant="outline"
          className="rounded-none border-media-line text-[10px] font-semibold uppercase tracking-[0.3em] text-media-muted"
        >
          The Ridge Realty Group
        </Badge>
        <h1 className="text-5xl font-black uppercase tracking-tight md:text-7xl">
          Pahrump Realtor
        </h1>
        <p className="text-sm uppercase tracking-[0.3em] md:text-base">
          Realtor for nearly 3 decades
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-none bg-media-surface px-8 text-sm font-semibold uppercase tracking-widest text-media-surface-foreground hover:bg-media-surface-hover"
          >
            <a href={PHONE_HREF}>
              <Phone />
              {PHONE}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-none border-media-line-strong bg-transparent px-8 text-sm font-semibold uppercase tracking-widest text-media-foreground hover:bg-media-surface hover:text-media-surface-foreground dark:border-media-line-strong dark:bg-transparent dark:hover:bg-media-surface dark:hover:text-media-surface-foreground"
          >
            <a href="#listings">Browse listings</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
