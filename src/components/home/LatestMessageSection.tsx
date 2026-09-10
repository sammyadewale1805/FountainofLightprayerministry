import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SERMONS } from "@/data/sermons";
import { getYouTubeThumbnail } from "@/lib/youtube";

export function LatestMessageSection() {
  const latest = SERMONS[0];
  const formattedDate = new Date(latest.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="section-space bg-sand">
      <div className="container-edit">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Watch" title="Latest Message" className="mb-0" />
          <Link
            href="/watch"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-ember"
          >
            Watch More Messages
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Link
          href="/watch"
          className="group grid overflow-hidden rounded-sm border border-border bg-background lg:grid-cols-2"
        >
          <div className="relative aspect-video overflow-hidden bg-ink lg:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getYouTubeThumbnail(latest.videoId, "maxres")}
              alt={latest.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors group-hover:bg-ink/30">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/95 text-ink shadow-lg">
                <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="index-mark mb-3">{latest.series}</p>
            <h3 className="font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">
              {latest.title}
            </h3>
            <p className="mt-4 text-muted-foreground">{latest.description}</p>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <div>
                <dt className="inline font-medium text-ink">Speaker: </dt>
                <dd className="inline">{latest.speaker}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-ink">Date: </dt>
                <dd className="inline">{formattedDate}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-ink">Duration: </dt>
                <dd className="inline">{latest.duration}</dd>
              </div>
            </dl>
          </div>
        </Link>
      </div>
    </section>
  );
}
