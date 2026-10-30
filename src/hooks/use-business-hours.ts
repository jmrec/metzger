import { useEffect, useState } from "react";

import { OFFICE_HOURS } from "@/lib/content";
import { formatMinuteOfDay, formatMinutesRemaining } from "@/lib/office-hours";

/** How often the open/closed state is recalculated while the page is open. */
const TICK_INTERVAL_MS = 30_000;
const SECONDS_PER_DAY = 24 * 60 * 60;

const clockFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: OFFICE_HOURS.timeZone,
  hourCycle: "h23",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const timeZoneFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: OFFICE_HOURS.timeZone,
  timeZoneName: "shortGeneric",
});

/** Seconds since midnight in the office's timezone, whatever the visitor's is. */
function secondsOfDayInOfficeTime(date: Date): number {
  let hour = 0;
  let minute = 0;
  let second = 0;

  for (const part of clockFormatter.formatToParts(date)) {
    if (part.type === "hour") hour = Number(part.value);
    if (part.type === "minute") minute = Number(part.value);
    if (part.type === "second") second = Number(part.value);
  }

  return hour * 3600 + minute * 60 + second;
}

const OPENS_AT_LABEL = formatMinuteOfDay(OFFICE_HOURS.opensAtMinutes);
const CLOSES_AT_LABEL = formatMinuteOfDay(OFFICE_HOURS.closesAtMinutes);
const TIME_ZONE_LABEL =
  timeZoneFormatter
    .formatToParts(new Date())
    .find((part) => part.type === "timeZoneName")?.value ?? "";

/** Appends the office timezone */
function withTimeZone(label: string): string {
  return TIME_ZONE_LABEL ? `${label} ${TIME_ZONE_LABEL}` : label;
}

const HOURS_LABEL = `${withTimeZone(`${OPENS_AT_LABEL} – ${CLOSES_AT_LABEL}`)}, every day`;

export type BusinessHours = {
  /** `false` until the first client tick, so server and first client render match. */
  isReady: boolean;
  isOpen: boolean;
  /** `Open now` / `Closed now`, or `Open daily` before hydration. */
  statusLabel: string;
  /** `Closes at 7:00 pm PT`, `Opens at 8:00 am PT`, `Opens tomorrow at 8:00 am PT`. */
  detailLabel: string;
  /** `Opens in 2 hr 15 min` while closed, `null` while open or before hydration. */
  opensInLabel: string | null;
  /** `8:00 am – 7:00 pm PT` */
  hoursLabel: string;
  opensAtLabel: string;
  closesAtLabel: string;
  /** `PT` */
  timeZoneLabel: string;
};

const PENDING: BusinessHours = {
  isReady: false,
  isOpen: false,
  statusLabel: "Open daily",
  detailLabel: HOURS_LABEL,
  opensInLabel: null,
  hoursLabel: HOURS_LABEL,
  opensAtLabel: OPENS_AT_LABEL,
  closesAtLabel: CLOSES_AT_LABEL,
  timeZoneLabel: TIME_ZONE_LABEL,
};

function computeHours(date: Date): BusinessHours {
  const { opensAtMinutes, closesAtMinutes } = OFFICE_HOURS;
  const secondsOfDay = secondsOfDayInOfficeTime(date);
  const minutes = Math.floor(secondsOfDay / 60);
  const opensAtSeconds = opensAtMinutes * 60;
  const isOpen = minutes >= opensAtMinutes && minutes < closesAtMinutes;

  let detailLabel = withTimeZone(`Closes at ${CLOSES_AT_LABEL}`);
  let opensInLabel: string | null = null;

  if (!isOpen) {
    const secondsUntilOpen =
      secondsOfDay < opensAtSeconds
        ? opensAtSeconds - secondsOfDay
        : SECONDS_PER_DAY - secondsOfDay + opensAtSeconds;

    detailLabel = withTimeZone(
      secondsOfDay < opensAtSeconds
        ? `Opens at ${OPENS_AT_LABEL}`
        : `Opens tomorrow at ${OPENS_AT_LABEL}`,
    );
    opensInLabel = `Opens in ${formatMinutesRemaining(secondsUntilOpen / 60)}`;
  }

  return {
    isReady: true,
    isOpen,
    statusLabel: isOpen ? "Open now" : "Closed now",
    detailLabel,
    opensInLabel,
    hoursLabel: HOURS_LABEL,
    opensAtLabel: OPENS_AT_LABEL,
    closesAtLabel: CLOSES_AT_LABEL,
    timeZoneLabel: TIME_ZONE_LABEL,
  };
}

/**
 * Live open/closed state for the office, recalculated on a timer.
 * Reads `OFFICE_HOURS` from `@/lib/content` so hours are edited in one place.
 */
export function useBusinessHours(): BusinessHours {
  const [hours, setHours] = useState<BusinessHours>(PENDING);

  useEffect(() => {
    const sync = () => {
      const next = computeHours(new Date());
      setHours((current) =>
        current.isReady &&
        current.isOpen === next.isOpen &&
        current.detailLabel === next.detailLabel &&
        current.opensInLabel === next.opensInLabel
          ? current
          : next,
      );
    };

    sync();
    const timer = window.setInterval(sync, TICK_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return hours;
}
