import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHero } from "@/components/PageHero";
import { PlanVisitForm } from "@/components/connect/PlanVisitForm";
import { PrayerRequestForm } from "@/components/connect/PrayerRequestForm";
import { ContactForm } from "@/components/connect/ContactForm";
import { LOCATIONS, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Plan your visit, submit a prayer request, or get in touch with Fountain of Light Prayer Ministry International.",
  alternates: { canonical: "/connect" },
};

const CONNECT_NAV = [
  { href: "#plan-your-visit", label: "Plan Your Visit" },
  { href: "#prayer", label: "Prayer Request" },
  { href: "#contact", label: "Contact" },
];

export default function ConnectPage() {
  const hq = LOCATIONS.find((l) => l.isHQ) ?? LOCATIONS[0];

  return (
    <>
      <PageHero label="Connect" title="We'd love to hear from you." />

      <nav
        aria-label="On this page"
        className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur"
      >
        <div className="container-edit flex gap-8 overflow-x-auto py-4 text-sm font-medium text-muted-foreground">
          {CONNECT_NAV.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="plan-your-visit" className="section-space scroll-mt-32 bg-background">
        <div className="container-edit grid gap-14 lg:grid-cols-[1fr,1.2fr]">
          <div>
            <SectionHeading
              eyebrow="First Time Here?"
              title="Plan your visit"
              description="Tell us when you're coming and which branch, and our welcome team will make sure you feel at home from the moment you arrive."
            />
            <div className="mt-10 space-y-6">
              {LOCATIONS.map((loc) => (
                <div key={loc.id} className="rounded-sm border border-border p-5">
                  <p className="font-display text-lg font-semibold text-ink">
                    {loc.name} {loc.isHQ && <span className="ml-2 border border-ember px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ember">HQ</span>}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{loc.address}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {loc.services.map((s) => `${s.day} ${s.time}`).join(" · ")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {loc.prayerMeetings.map((p) => `${p.day} ${p.time}`).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-sm border border-border bg-sand p-8 md:p-10">
            <PlanVisitForm />
          </div>
        </div>
      </section>

      <section id="prayer" className="section-space scroll-mt-32 bg-ink">
        <div className="container-edit grid gap-14 lg:grid-cols-[1fr,1.2fr]">
          <SectionHeading
            eyebrow="Global Prayer Chain"
            title="Submit a prayer request"
            description="Your request will be prayed for by our intercessory teams across New York, Lagos, and Akure. You may submit anonymously if you prefer."
            light
          />
          <div className="rounded-sm border border-cream/10 bg-cream/[0.04] p-8 md:p-10">
            <PrayerRequestForm />
          </div>
        </div>
      </section>

      <section id="contact" className="section-space scroll-mt-32 bg-background">
        <div className="container-edit grid gap-14 lg:grid-cols-[1fr,1.2fr]">
          <div>
            <SectionHeading eyebrow="Get in Touch" title="Contact us" />
            <ul className="mt-10 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                <span className="text-muted-foreground">{hq.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-ember" />
                <span className="text-muted-foreground">{hq.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-ember" />
                <a href={`mailto:${SITE.email}`} className="text-muted-foreground hover:text-ink">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="rounded-sm border border-border bg-sand p-8 md:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
