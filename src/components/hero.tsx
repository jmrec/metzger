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
      <div className="absolute inset-0 bg-linear-to-t from-media-scrim via-transparent to-transparent" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 text-media-foreground md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-28">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Badge
            variant="outline"
            className="rounded-none border-media-line-strong bg-media-scrim text-xs font-semibold uppercase tracking-[0.18em] text-media-foreground"
          >
            The Ridge Realty Group
          </Badge>
          <h1 className="mt-5 text-5xl font-black uppercase tracking-tight md:text-7xl">
            Pahrump Realtor
          </h1>
          <p className="mt-4 text-2xl font-bold uppercase tracking-[0.12em] md:text-3xl">
            Marci Metzger
          </p>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-media-foreground md:text-base">
            Realtor for nearly 3 decades
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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

        <div className="order-last lg:order-0">
          <img
            src={IMAGES.marci}
            alt="Marci Metzger, Pahrump Realtor"
            fetchPriority="high"
            className="mx-auto aspect-4/5 w-full max-w-xs border border-media-line object-cover object-top sm:max-w-sm lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
