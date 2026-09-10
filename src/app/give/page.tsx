import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { GivingExperience } from "@/components/give/GivingExperience";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Give online to Fountain of Light Prayer Ministry International — one-time or recurring, toward general offering, tithes, missions, or building projects.",
  alternates: { canonical: "/give" },
};

export default function GivePage() {
  return (
    <section className="section-space bg-sand">
      <div className="container-edit">
        <SectionHeading
          eyebrow="Give"
          title="Make an impact"
          description="Your generosity fuels everything from Sunday services to missions trips and community outreach across New York, Lagos, and Akure. Thank you for partnering with us."
          align="center"
          className="mx-auto"
        />
        <div className="mt-14">
          <GivingExperience />
        </div>
      </div>
    </section>
  );
}
