import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { LOCATIONS } from "@/data/site";

const EXPECTATIONS = [
  {
    title: "Service Times",
    description: "Sunday services run about 2 hours, with worship, teaching, and prayer ministry.",
  },
  {
    title: "Parking",
    description: "Each branch has parking or nearby street parking — arrive 15 minutes early for a seat.",
  },
  {
    title: "Children's Ministry",
    description: "Age-appropriate classes run during the main service, so the whole family can worship.",
  },
  {
    title: "What to Expect",
    description: "Come as you are. Expect warm greeters, contemporary worship, and a practical message.",
  },
];

export function PlanVisitSection() {
  const hq = LOCATIONS.find((l) => l.isHQ) ?? LOCATIONS[0];

  return (
    <section id="plan-your-visit" className="section-space scroll-mt-20 border-y-2 border-ink bg-sand">
      <div className="container-edit grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <SectionHeading
            eyebrow="First Time Here?"
            title="Planning your first visit"
            description="We know visiting somewhere new can feel like a big step. Here's everything you need to know before you walk through our doors."
          />
          <div className="mt-10 flex items-start gap-3 border-t border-ink/15 pt-6">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
            <p className="text-sm text-ink">
              Nearest branch: <strong className="font-semibold">{hq.name}</strong> — {hq.address}
            </p>
          </div>
          <Button asChild size="lg" className="btn-stamp mt-6 bg-ink text-cream hover:bg-ink/90">
            <Link href="/connect#plan-your-visit-form">
              Plan Your Visit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <dl className="divide-y divide-ink/15 border-y border-ink/15 lg:border-y-0">
          {EXPECTATIONS.map((item, i) => (
            <div key={item.title} className="grid grid-cols-[3rem_1fr] gap-6 py-6 first:pt-0 lg:first:pt-6">
              <dt className="font-display text-2xl text-ember/60">{String(i + 1).padStart(2, "0")}</dt>
              <dd>
                <p className="font-display text-lg font-semibold text-ink">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
