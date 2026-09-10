import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHero } from "@/components/PageHero";
import { MINISTRIES } from "@/data/ministries";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Explore ministries at Fountain of Light Prayer Ministry International — for children, youth, young adults, men, women, and outreach.",
  alternates: { canonical: "/ministries" },
};

export default function MinistriesPage() {
  return (
    <>
      <PageHero
        label="Get Involved"
        title="Find your place in the family."
        description="Every age and stage has a home here — pick a ministry below to learn more or reach out."
      />

      <section className="section-space bg-background">
        <div className="container-edit grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {MINISTRIES.map((ministry, i) => (
            <div key={ministry.slug} className="flex flex-col bg-background p-8">
              <span className="font-display text-3xl text-ember/50">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-4 font-display text-xl font-semibold text-ink">{ministry.name}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{ministry.description}</p>

              <dl className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Age Group</dt>
                  <dd className="font-medium text-ink">{ministry.ageGroup}</dd>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <dt className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> Meets
                  </dt>
                  <dd className="font-medium text-ink">{ministry.meeting}</dd>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <dt className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" /> Leader
                  </dt>
                  <dd className="font-medium text-ink">{ministry.leader}</dd>
                </div>
              </dl>

              <Link
                href="/connect"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ember hover:text-ember/80"
              >
                Connect with this ministry
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space border-t-2 border-ink bg-sand">
        <div className="container-edit flex flex-wrap items-center justify-between gap-8">
          <SectionHeading
            eyebrow="Not sure where to start?"
            title="We'll help you find your place."
            description="Reach out and a member of our team will personally help you connect with the right ministry."
            className="mb-0"
          />
          <Link href="/connect" className="btn-stamp bg-ink px-8 py-3 text-sm text-cream hover:bg-ink/90">
            Get in Touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
