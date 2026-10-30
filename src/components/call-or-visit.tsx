import { Navigation, Timer } from "lucide-react";
import { useState } from "react";

import { OfficeHoursDialog } from "@/components/office-hours";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useBusinessHours } from "@/hooks/use-business-hours";
import {
  ADDRESS,
  BUSINESS_NAME,
  DIRECTIONS_HREF,
  IMAGES,
  MAP_EMBED_HREF,
  PHONE,
  PHONE_HREF,
} from "@/lib/content";
import { cn } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type FormValues = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_FORM: FormValues = { name: "", email: "", message: "" };

function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);

  const update =
    (key: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setValues((current) => ({ ...current, [key]: value }));
      setErrors((current) => ({ ...current, [key]: undefined }));
    };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      next.email = "Enter a valid email address, like you@example.com.";
    }
    if (values.message.trim().length < 10) {
      next.message = "Add a little more detail (at least 10 characters).";
    }

    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setSentTo(values.name.trim().split(" ")[0]);
    setValues(EMPTY_FORM);
  };

  if (sentTo) {
    return (
      <Card
        role="status"
        aria-live="polite"
        className="rounded-none border-border bg-card shadow-none"
      >
        <CardHeader>
          <CardTitle className="text-lg font-bold uppercase">
            Thanks, {sentTo}!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          Your message has been delivered — if it is time-sensitive, call{" "}
          <a
            href={PHONE_HREF}
            className="font-semibold text-foreground underline"
          >
            {PHONE}
          </a>{" "}
          and you will reach Marci directly.
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            onClick={() => setSentTo(null)}
            className="rounded-none text-sm font-semibold uppercase tracking-widest"
          >
            Write another
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label
            htmlFor="contact-name"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Name
          </Label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            value={values.name}
            onChange={update("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className="h-10 rounded-none border-input bg-background"
          />
          {errors.name ? (
            <p id="contact-name-error" className="text-xs text-destructive">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label
            htmlFor="contact-email"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Email
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            value={values.email}
            onChange={update("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className="h-10 rounded-none border-input bg-background"
          />
          {errors.email ? (
            <p id="contact-email-error" className="text-xs text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label
          htmlFor="contact-message"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Message
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Tell Marci what you are looking for"
          value={values.message}
          onChange={update("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          className="min-h-28 rounded-none border-input bg-background"
        />
        {errors.message ? (
          <p id="contact-message-error" className="text-xs text-destructive">
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-none text-sm font-semibold uppercase tracking-widest sm:w-auto"
      >
        Send
      </Button>
    </form>
  );
}

const badges = [
  {
    src: IMAGES.badges.equalHousing,
    alt: "Equal Housing",
    className: "size-16 object-contain",
  },
  {
    src: IMAGES.badges.equalHousingAlt,
    alt: "Equal Housing Opportunity",
    className: "size-16 object-contain bg-white",
  },
  {
    src: IMAGES.badges.realtor,
    alt: "Realtor",
    className: "h-16 w-auto object-contain",
  },
  {
    src: IMAGES.badges.chamber,
    alt: "Chamber of Commerce",
    className: "h-16 w-auto object-contain",
  },
];

export function CallOrVisit() {
  const {
    isReady,
    isOpen,
    statusLabel,
    detailLabel,
    opensInLabel,
    hoursLabel,
  } = useBusinessHours();

  const dotTone = !isReady
    ? "bg-muted-foreground/40"
    : isOpen
      ? "bg-emerald-500"
      : "bg-red-500";

  return (
    <section id="contact" className="bg-muted py-20">
      <div className="px-4 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="mt-3 text-4xl font-black uppercase tracking-tight md:text-5xl">
            Call or Visit
          </h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr]">
            <Card className="rounded-none border-border bg-card shadow-none">
              <CardHeader>
                <CardTitle className="text-lg font-bold uppercase">
                  Send Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>

            <Card className="rounded-none border-border bg-card shadow-none">
              <CardHeader>
                <CardTitle className="text-lg font-bold uppercase">
                  {BUSINESS_NAME}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {ADDRESS}
                </p>
                <Button
                  asChild
                  variant="link"
                  className="mt-3 h-auto justify-start px-0 text-sm font-semibold text-foreground"
                >
                  <a href={PHONE_HREF}>{PHONE}</a>
                </Button>

                <Separator className="my-5" />

                <div className="flex flex-wrap items-center gap-4">
                  {badges.map((badge) => (
                    <img
                      key={badge.alt}
                      src={badge.src}
                      alt={badge.alt}
                      className={badge.className}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-none border-border bg-card shadow-none">
              <CardHeader>
                <CardTitle className="text-lg font-bold uppercase">
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={cn(
                    "flex items-center gap-2 text-sm",
                    isReady && isOpen
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn("size-2 rounded-full", dotTone)}
                  />
                  {statusLabel}
                </p>
                <p className="mt-2 text-sm font-semibold">{hoursLabel}</p>
                <Separator className="my-5" />
                <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {isReady ? `${opensInLabel}.` : `Open daily ${hoursLabel}`}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Appointments outside office hours available upon request. Just
                  call!
                </p>
                <OfficeHoursDialog />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Full-bleed map band: the pin marks the suite on Pahrump Valley Hwy. */}
      <div className="relative mt-16 h-80 border-y border-border md:h-104">
        <iframe
          title={`Map showing ${BUSINESS_NAME} at ${ADDRESS}`}
          src={MAP_EMBED_HREF}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="size-full border-0 dark:brightness-90"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 px-4 md:px-10">
          <div className="mx-auto flex max-w-6xl justify-start pt-4">
            <Button
              asChild
              size="lg"
              className="pointer-events-auto rounded-none text-xs font-semibold uppercase tracking-widest shadow-none"
            >
              <a
                href={DIRECTIONS_HREF}
                target="_blank"
                rel="noreferrer"
                aria-label={`Get directions to ${BUSINESS_NAME} (opens in a new tab)`}
              >
                <Navigation />
                Get Directions
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
