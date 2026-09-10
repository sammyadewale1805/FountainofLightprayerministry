import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHero } from "@/components/PageHero";
import { LeadershipGrid } from "@/components/about/LeadershipGrid";
import { BELIEFS } from "@/data/beliefs";
import { SITE } from "@/data/site";
import storyPhoto from "@/assets/flpmi5.jpg";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Fountain of Light Prayer Ministry International's story, mission, vision, beliefs, and leadership across New York, Lagos, and Akure.",
  alternates: { canonical: "/about" },
};

const ABOUT_NAV = [
  { href: "#story", label: "Our Story" },
  { href: "#mission", label: "Mission & Vision" },
  { href: "#beliefs", label: "Beliefs" },
  { href: "#leadership", label: "Leadership" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero label="About Us" title="One family, three cities, one mission." />

      <nav
        aria-label="On this page"
        className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur"
      >
        <div className="container-edit flex gap-8 overflow-x-auto py-4 text-sm font-medium text-muted-foreground">
          {ABOUT_NAV.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="story" className="section-space scroll-mt-32 bg-background">
        <div className="container-edit grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="crop-frame relative aspect-[4/5] overflow-hidden bg-sand">
            <Image
              src={storyPhoto}
              alt="Leadership ministering at Fountain of Light Prayer Ministry"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading eyebrow="Our Story" title="How we began" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Fountain of Light Prayer Ministry International began as a small prayer gathering in
                Akure, Nigeria, out of a conviction that God still moves powerfully in response to
                persistent, united prayer.
              </p>
              <p>
                What started around a handful of believers grew into a congregation, then a
                headquarters — and eventually branches in Ikorodu, Lagos, and Brooklyn, New York, as
                members carried the same conviction with them wherever life took them.
              </p>
              <p>
                Today, {SITE.name} is a global family across three cities, still gathered around the
                same things that started it all: prayer, the Word, and each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="section-space scroll-mt-32 border-y-2 border-ink bg-sand">
        <div className="container-edit grid divide-y divide-ink/15 md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="pb-10 pr-0 md:pb-0 md:pr-12">
            <p className="index-mark mb-4">Our Mission</p>
            <p className="font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">
              To lead people into a transforming relationship with Jesus Christ through prayer, the
              Word, and genuine community.
            </p>
          </div>
          <div className="pt-10 pl-0 md:pl-12 md:pt-0">
            <p className="index-mark mb-4">Our Vision</p>
            <p className="font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">
              A global network of prayer-saturated communities raising disciples who carry God&apos;s
              light into every sphere of society.
            </p>
          </div>
        </div>
      </section>

      <section id="beliefs" className="section-space scroll-mt-32 bg-background">
        <div className="container-edit">
          <SectionHeading
            eyebrow="What We Believe"
            title="Our core beliefs"
            description="These convictions shape everything we teach and practice as a church family."
          />
          <ol className="mt-14 divide-y divide-border border-y border-border">
            {BELIEFS.map((belief, i) => (
              <li key={belief.title} className="grid gap-2 py-7 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-8">
                <span className="font-display text-2xl text-ember/60">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{belief.title}</h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {belief.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="leadership" className="section-space scroll-mt-32 bg-sand">
        <div className="container-edit">
          <SectionHeading
            eyebrow="Leadership"
            title="Meet our pastors"
            description="Shepherding our global family across Akure, Lagos, and New York."
          />
          <div className="mt-14">
            <LeadershipGrid />
          </div>
        </div>
      </section>
    </>
  );
}
