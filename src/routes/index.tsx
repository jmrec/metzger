import { createFileRoute } from "@tanstack/react-router";

import { CallOrVisit } from "@/components/call-or-visit";
import { GetItSold } from "@/components/get-it-sold";
import { Hero } from "@/components/hero";
import { ListingsSearch } from "@/components/listings-search";
import { PhotoGallery } from "@/components/photo-gallery";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TopBar } from "@/components/top-bar";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <SiteHeader />
      <Hero />
      <GetItSold />
      <ListingsSearch />
      <PhotoGallery />
      <Services />
      <CallOrVisit />
      <SiteFooter />
    </div>
  );
}
