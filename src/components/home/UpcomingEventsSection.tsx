import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { EVENTS } from "@/data/events";

export function UpcomingEventsSection() {
  const upcoming = [...EVENTS]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  return (
    <section className="section-space bg-background">
      <div className="container-edit">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="What's Happening" title="Upcoming Events" className="mb-0" />
          <Link href="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-ember">
            View All Events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {upcoming.map((event) => {
            return (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="group flex flex-col overflow-hidden rounded-sm border border-border bg-background transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink">{event.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                  <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-ember" />
                    {event.location} · {event.time}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
