import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IMAGES } from "@/lib/content";

const services = [
  {
    title: "Real Estate Done Right",
    body: "Nervous about your property adventure? Don't be. Whether you're getting ready to buy or sell your residence, looking at investment properties, or just curious about the markets, our team ensures you get the best experience possible!",
    image: IMAGES.services.realEstate,
  },
  {
    title: "Commercial & Residential",
    body: "Large or small, condo or mansion, we can find it and get it at the price that's right. Fixer-uppers? Luxury? We can help with all of it! We live, work, and play in this community. Happy to help you find where to put your hard-earned dollars.",
    image: IMAGES.services.commercial,
  },
  {
    title: "Rely on Expertise",
    body: "If you have questions about affordability, credit, and loan options, trust us to connect you with the right people to get the answers you need in a timely fashion. We make sure you feel confident and educated every step of the way.",
    image: IMAGES.services.expertise,
  },
];

export function Services() {
  return (
    <section id="services" className="px-4 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="mt-3 text-4xl font-black uppercase tracking-tight md:text-5xl">
          Our Services
        </h2>

        <div className="mt-12 space-y-16">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`grid items-center gap-8 md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>img]:order-2" : ""
              }`}
            >
              <img
                src={service.image}
                alt=""
                className="aspect-square w-full max-w-md object-cover"
              />
              <Card className="rounded-none border-border bg-card shadow-none">
                <CardHeader>
                  <Badge
                    variant="outline"
                    className="w-fit rounded-none text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
                  >
                    {String(i + 1)}
                  </Badge>
                  <CardTitle className="text-2xl font-bold uppercase">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="leading-relaxed text-muted-foreground">
                    {service.body}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
