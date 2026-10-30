import "temporal-polyfill/global";

import {
  type CalendarEvent,
  createViewDay,
  createViewWeek,
} from "@schedule-x/calendar";
import { ScheduleXCalendar, useNextCalendarApp } from "@schedule-x/react";
import { CalendarDays, Phone } from "lucide-react";
import { useMemo } from "react";
import { Temporal } from "temporal-polyfill";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBusinessHours } from "@/hooks/use-business-hours";
import { OFFICE_HOURS, PHONE, PHONE_HREF } from "@/lib/content";
import { cn } from "@/lib/utils";

import "@schedule-x/theme-default/dist/index.css";

const WEEKS_BEFORE_TODAY = 26;
const WEEKS_AFTER_TODAY = 52;

const OPENS_AT = toClockTime(OFFICE_HOURS.opensAtMinutes);
const CLOSES_AT = toClockTime(OFFICE_HOURS.closesAtMinutes);

function toClockTime(minutes: number): string {
  const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");

  return `${hours}:${mins}:00`;
}

function buildOfficeHourEvents(): CalendarEvent[] {
  const zone = `[${OFFICE_HOURS.timeZone}]`;
  const firstDay = Temporal.Now.plainDateISO(OFFICE_HOURS.timeZone).subtract({
    days: WEEKS_BEFORE_TODAY * 7,
  });
  const totalDays = (WEEKS_BEFORE_TODAY + WEEKS_AFTER_TODAY) * 7;
  const events: CalendarEvent[] = [];

  for (let offset = 0; offset <= totalDays; offset += 1) {
    const date = firstDay.add({ days: offset }).toString();

    events.push({
      id: `office-hours-${date}`,
      title: "Office hours",
      calendarId: "office",
      start: Temporal.ZonedDateTime.from(`${date}T${OPENS_AT}${zone}`),
      end: Temporal.ZonedDateTime.from(`${date}T${CLOSES_AT}${zone}`),
    });
  }

  return events;
}

/** Mounted only while the dialog is open, so Schedule-X initialises on open. */
function OfficeHoursCalendar() {
  const events = useMemo(() => buildOfficeHourEvents(), []);

  const calendar = useNextCalendarApp({
    views: [createViewWeek(), createViewDay()],
    defaultView: "week",
    events,
    timezone: OFFICE_HOURS.timeZone,
    locale: "en-US",
    firstDayOfWeek: 7,
    dayBoundaries: { start: "08:00", end: "19:00" },
    weekOptions: {
      gridHeight: 420,
      gridStep: 60,
      timeAxisFormatOptions: { hour: "numeric", hour12: true },
    },
    calendars: {
      office: {
        colorName: "office",
        lightColors: {
          main: "#0f766e",
          container: "#e3f3ee",
          onContainer: "#123f36",
        },
        darkColors: {
          main: "#5eead4",
          container: "#13332c",
          onContainer: "#d1fae5",
        },
      },
    },
  });

  return (
    <div className="office-hours-calendar h-[min(62dvh,34rem)] w-full px-4 py-4 sm:px-6">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export function OfficeHoursDialog() {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-5 w-full rounded-none text-xs font-semibold uppercase tracking-widest"
        >
          <CalendarDays aria-hidden="true" />
          View weekly hours
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-none border-border bg-card p-0 sm:max-w-4xl">
        <DialogHeader className="border-b border-border px-5 py-4 pr-14 sm:px-6">
          <DialogTitle className="flex flex-wrap items-center gap-3 text-lg font-bold uppercase">
            Office Hours
            <span
              className={cn(
                "flex items-center gap-1.5 text-[10px] font-semibold tracking-widest",
                isReady && isOpen ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span
                aria-hidden="true"
                className={cn("size-2 rounded-full", dotTone)}
              />
              {isReady ? statusLabel : "Open daily"}
            </span>
          </DialogTitle>
          <DialogDescription>
            {hoursLabel}. {opensInLabel ?? detailLabel}.
          </DialogDescription>
        </DialogHeader>

        <OfficeHoursCalendar />

        <DialogFooter className="flex-col items-stretch gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Appointments outside office hours available upon request.
          </p>
          <Button
            asChild
            className="rounded-none text-xs font-semibold uppercase tracking-widest"
          >
            <a href={PHONE_HREF}>
              <Phone />
              Call {PHONE}
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
