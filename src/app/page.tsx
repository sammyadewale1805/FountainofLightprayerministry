import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { LatestMessageSection } from "@/components/home/LatestMessageSection";
import { UpcomingEventsSection } from "@/components/home/UpcomingEventsSection";
import { MinistriesPreview } from "@/components/home/MinistriesPreview";
import { PlanVisitSection } from "@/components/home/PlanVisitSection";
import { GivingPreview } from "@/components/home/GivingPreview";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: `${SITE.name} | ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WelcomeSection />
      <LatestMessageSection />
      <UpcomingEventsSection />
      <MinistriesPreview />
      <PlanVisitSection />
      <GivingPreview />
      <FinalCTA />
    </>
  );
}
