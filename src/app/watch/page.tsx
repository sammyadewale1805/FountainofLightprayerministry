import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Radio } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SermonLibrary } from "@/components/watch/SermonLibrary";
import { SERMONS, LIVE_STREAM } from "@/data/sermons";
import { getYouTubeThumbnail } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Watch",
  description:
    "Watch the latest messages from Fountain of Light Prayer Ministry International, explore our sermon library, or join us live.",
  alternates: { canonical: "/watch" },
};

export default function WatchPage() {
  const latest = SERMONS[0];

  return (
    <>
      <section className="bg-ink py-24">
        <div className="container-edit grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="index-mark text-ember-light">Watch</p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-cream md:text-5xl">
              {latest.title}
            </h1>
            <p className="mt-5 max-w-lg text-cream/75">{latest.description}</p>
            <p className="mt-6 text-sm text-cream/60">
              {latest.speaker} ·{" "}
              {new Date(latest.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${latest.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-video overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getYouTubeThumbnail(latest.videoId, "maxres")}
              alt={latest.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-[2] flex items-center justify-center bg-ink/25">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/95 text-ink shadow-lg">
                <ExternalLink className="h-6 w-6" />
              </span>
            </div>
          </a>
        </div>
      </section>

      <section className="section-space bg-background">
        <div className="container-edit">
          <SectionHeading
            eyebrow="Sermon Library"
            title="Explore past messages"
            description="Filter by speaker, series, or topic to find a message that speaks to where you are."
          />
          <div className="mt-10">
            <SermonLibrary />
          </div>
        </div>
      </section>

      <section className="section-space bg-sand">
        <div className="crop-frame container-edit grid items-center gap-10 border border-border bg-background p-10 md:grid-cols-2 md:p-14">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-ember" />
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                  LIVE_STREAM.isLive ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {LIVE_STREAM.isLive ? "Live Now" : "Offline"}
              </span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-semibold text-ink md:text-3xl">
              {LIVE_STREAM.isLive ? "We're live — join now" : "Join us for our next live service"}
            </h2>
            <Link
              href={LIVE_STREAM.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-stamp mt-6 bg-ink px-6 py-3 text-sm text-cream transition-colors hover:bg-ink/90"
            >
              Watch Live on YouTube
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
          <ul className="space-y-3 border-t border-border pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            {LIVE_STREAM.schedule.map((item) => (
              <li key={item.label} className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{item.label}</span>
                <span className="text-muted-foreground">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
