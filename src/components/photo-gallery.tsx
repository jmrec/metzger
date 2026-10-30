import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { IMAGES } from "@/lib/content";
import { cn } from "@/lib/utils";

const photos = IMAGES.gallery;

const pad = (n: number) => String(n).padStart(2, "0");

export function PhotoGallery() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section id="gallery" className="bg-muted px-4 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="mt-3 text-4xl font-black uppercase tracking-tight md:text-5xl">
          Photo Gallery
        </h2>

        <div className="mt-10">
          <div>
            <Carousel
              setApi={setApi}
              opts={{ loop: true }}
              aria-label="Photo gallery"
            >
              <CarouselContent>
                {photos.map((src, i) => (
                  <CarouselItem key={src}>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setLightboxOpen(true)}
                      aria-label={`Open photo ${i + 1} of ${photos.length} full screen`}
                      className="h-auto w-full cursor-zoom-in rounded-none p-0 hover:bg-transparent"
                    >
                      <img
                        src={src}
                        alt={`Pahrump home ${i + 1}`}
                        loading={i === 0 ? "eager" : "lazy"}
                        className="h-[min(70vh,42rem)] w-full bg-muted object-cover"
                      />
                    </Button>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="left-3 rounded-none border-0 bg-background/90 text-foreground shadow-none hover:bg-background disabled:opacity-0" />
              <CarouselNext className="right-3 rounded-none border-0 bg-background/90 text-foreground shadow-none hover:bg-background disabled:opacity-0" />
            </Carousel>

            <div className="mt-4 flex items-end justify-between gap-6">
              <div className="flex gap-2 overflow-x-auto">
                {photos.map((src, i) => (
                  <Button
                    key={src}
                    type="button"
                    variant="ghost"
                    size="icon-lg"
                    onClick={() => api?.scrollTo(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    aria-current={i === current}
                    className={cn(
                      "size-20 shrink-0 overflow-hidden rounded-none p-0 transition-opacity hover:bg-transparent",
                      i === current
                        ? "opacity-100 ring-2 ring-foreground"
                        : "opacity-40 hover:opacity-70",
                    )}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </Button>
                ))}
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <p className="text-xs uppercase tracking-[0.3em] tabular-nums text-muted-foreground">
                  {pad(current + 1)} / {pad(photos.length)}
                </p>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="View gallery fullscreen"
                  title="View gallery fullscreen"
                  className="rounded-none border-input bg-background text-foreground shadow-none hover:bg-muted"
                >
                  <Maximize />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="inset-0 flex h-dvh max-h-dvh w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 bg-overlay p-0 text-overlay-foreground shadow-none sm:max-w-none">
            <DialogTitle className="sr-only">Photo gallery</DialogTitle>
            <DialogDescription className="sr-only">
              Photo {current + 1} of {photos.length}. Use the arrow buttons to
              move between photos.
            </DialogDescription>

            <div className="relative min-h-0 flex-1 bg-overlay-image">
              <img
                src={photos[current]}
                alt={`Pahrump home ${current + 1}`}
                className="absolute inset-0 size-full object-contain"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                onClick={() => api?.scrollPrev()}
                aria-label="Previous photo"
                className="absolute top-1/2 left-3 -translate-y-1/2 rounded-none bg-overlay/60 text-overlay-foreground backdrop-blur-sm hover:bg-overlay-hover hover:text-overlay-foreground"
              >
                <ChevronLeft />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                onClick={() => api?.scrollNext()}
                aria-label="Next photo"
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-none bg-overlay/60 text-overlay-foreground backdrop-blur-sm hover:bg-overlay-hover hover:text-overlay-foreground"
              >
                <ChevronRight />
              </Button>
            </div>

            <div className="flex shrink-0 items-center justify-center gap-4 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.3em] tabular-nums text-overlay-muted">
                {pad(current + 1)} / {pad(photos.length)}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
