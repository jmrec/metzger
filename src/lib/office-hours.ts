const LABEL_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

/** Formats a minute-of-day as copy-ready text, e.g. `7:00 pm`. */
export function formatMinuteOfDay(minutes: number): string {
  const date = new Date(
    Date.UTC(2000, 0, 1, Math.floor(minutes / 60), minutes % 60),
  );

  return LABEL_FORMATTER.format(date).toLowerCase();
}

/**
 * Formats a remaining duration, e.g. `2 hr 15 min`, `45 min`, `less than a
 * minute`. Rounds up, so a countdown never reads `0 min` a second early.
 */
export function formatMinutesRemaining(totalMinutes: number): string {
  const minutes = Math.ceil(totalMinutes);
  if (minutes <= 0) return "less than a minute";

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours} hr`;

  return `${hours} hr ${rest} min`;
}
