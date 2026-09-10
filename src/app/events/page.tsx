import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHero } from "@/components/PageHero";
import { EVENTS } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description: "See upcoming events at Fountain of Light Prayer Ministry International.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  const sorted = [...EVENTS].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const featured = sorted.find((e) => e.featured) ?? sorted[0];
  const rest = sorted.filter((e) => e.slug !== featured.slug);

  return (
    <>
      <PageHero label="Events" title="What's happening at Fountain of Light" />

      <section className="section-space bg-background">
        <div className="container-edit">
          <SectionHeading eyebrow="Featured" title={featured.title} className="mb-8" />
          <Link
            href={`/events/${featured.slug}`}
            className="group grid overflow-hidden border border-border bg-background lg:grid-cols-2"
          >
            <div className="relative aspect-video overflow-hidden bg-sand lg:aspect-auto">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">{featured.title}</h3>
              <p className="mt-4 text-muted-foreground">{featured.description}</p>
              <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-ember" />
                {featured.location} · {featured.time}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                View Details <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((event) => {
              return (
                <Link
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  className="group flex flex-col overflow-hidden border border-border bg-background transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold leading-snug text-ink">{event.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
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
    </>
  );
}
