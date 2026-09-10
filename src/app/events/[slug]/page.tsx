import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarPlus, Clock, MapPin, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EVENTS } from "@/data/events";
import { buildGoogleCalendarUrl } from "@/lib/calendar";
import { SITE } from "@/data/site";

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const event = EVENTS.find((e) => e.slug === params.slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.description,
    alternates: { canonical: `/events/${event.slug}` },
  };
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = EVENTS.find((e) => e.slug === params.slug);
  if (!event) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    location: {
      "@type": "Place",
      name: event.location,
      address: event.location,
    },
    description: event.description,
    organizer: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Image src={event.image} alt={event.title} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-ink/45" aria-hidden />
        <div className="container-edit relative z-[2] pb-14 pt-24">
          <h1 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-cream md:text-5xl">
            {event.title}
          </h1>
        </div>
      </section>

      <section className="section-space bg-background">
        <div className="container-edit grid gap-14 lg:grid-cols-[2fr,1fr]">
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">{event.details}</p>
          </div>

          <aside className="crop-frame h-fit border border-border bg-sand p-8">
            <dl className="space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                <div>
                  <dt className="font-medium text-ink">Time</dt>
                  <dd className="text-muted-foreground">{event.time}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                <div>
                  <dt className="font-medium text-ink">Location</dt>
                  <dd className="text-muted-foreground">{event.location}</dd>
                </div>
              </div>
              {event.zoomMeetingId && (
                <div className="flex items-start gap-3">
                  <Video className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                  <div>
                    <dt className="font-medium text-ink">Zoom Meeting ID</dt>
                    <dd className="text-muted-foreground">{event.zoomMeetingId}</dd>
                    {event.zoomPassword && (
                      <dd className="text-muted-foreground">Password: {event.zoomPassword}</dd>
                    )}
                  </div>
                </div>
              )}
            </dl>

            <div className="mt-8 flex flex-col gap-3">
              {event.zoomUrl ? (
                <Button asChild size="lg" className="btn-stamp w-full bg-ink text-cream hover:bg-ink/90">
                  <a href={event.zoomUrl} target="_blank" rel="noopener noreferrer">
                    <Video className="mr-2 h-4 w-4" />
                    Join Zoom Meeting
                  </a>
                </Button>
              ) : (
                <Button asChild size="lg" className="btn-stamp w-full bg-ink text-cream hover:bg-ink/90">
                  <Link href="/connect">Register / Contact Us</Link>
                </Button>
              )}
              <Button asChild variant="outline" size="lg" className="w-full border-2 border-ink">
                <a href={buildGoogleCalendarUrl(event)} target="_blank" rel="noopener noreferrer">
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Add to Calendar
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
