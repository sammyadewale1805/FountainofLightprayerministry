import type { ChurchEvent } from "@/data/events";

function toCalendarDate(dateStr: string, dayOffset = 0): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + dayOffset);
  return date.toISOString().slice(0, 10).replace(/-/g, "");
}

// Builds an all-day Google Calendar link. Times are shown in the event
// description rather than parsed into the calendar slot, since our event
// times are free-text ranges (e.g. "5:00 PM – 9:00 PM").
export function buildGoogleCalendarUrl(event: ChurchEvent): string {
  const start = toCalendarDate(event.date);
  const end = toCalendarDate(event.date, 1);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    details: `${event.description}\n\nTime: ${event.time}`,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
