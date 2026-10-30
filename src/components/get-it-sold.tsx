import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IMAGES } from "@/lib/content";

const highlights = [
  {
    title: "Top Residential Sales Last 5 Years",
    stat: "$28.5M closed in 2021",
    body: "We helped nearly 90 clients in 2021, and closed 28.5 million in sales! Our team works hard everyday to grow and learn, so that we may continue to excel in our market. Our clients deserve our best, & we want to make sure our best is better every year.",
    image: IMAGES.highlights.sales,
  },
  {
    title: "Don't Just List it...",
    stat: "Every avenue, every buyer",
    body: "Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips of every possible buyer, getting you top dollar for your home.",
    image: IMAGES.highlights.sold,
  },
  {
    title: "Guide to Buyers",
    stat: "Nearly 30 years in Pahrump",
    body: "Nobody knows the market like we do. Enjoy having a pro at your service. Market analysis, upgrades lists, contractors on speed dial, & more!",
    image: IMAGES.highlights.buyers,
  },
];

export function GetItSold() {
  return (
    <section className="bg-muted px-4 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="mt-3 text-4xl font-black uppercase tracking-tight md:text-5xl">
          Get it sold
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <Card
              key={item.title}
              className="gap-5 overflow-hidden rounded-none border-border bg-card py-0 shadow-none transition-all duration-200 hover:scale-103 hover:shadow-2xl"
            >
              <img
                src={item.image}
                alt=""
                className="aspect-3/2 w-full object-cover"
              />
              <CardHeader>
                <Badge
                  variant="secondary"
                  className="w-fit rounded-none text-[10px] font-semibold uppercase tracking-widest"
                >
                  {item.stat}
                </Badge>
                <CardTitle className="text-lg font-bold uppercase">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
