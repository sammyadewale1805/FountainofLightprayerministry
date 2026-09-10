import type { Metadata } from "next";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name}.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="section-space bg-background">
      <div className="container-edit max-w-3xl">
        <h1 className="font-display text-4xl font-semibold text-ink">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

        <div className="prose prose-neutral mt-10 max-w-none space-y-6 text-muted-foreground">
          <p>
            {SITE.name} ("we," "our," or "us") respects your privacy. This policy explains what
            information we collect through {SITE.url.replace("https://", "")}, how we use it, and the
            choices you have.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">Information We Collect</h2>
          <p>
            We collect information you provide directly — such as your name, email, and message
            content — when you submit a prayer request, plan a visit, contact us, or give online.
            Giving transactions are processed securely by our payment providers; we do not store your
            card details.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">How We Use It</h2>
          <p>
            We use the information you provide to respond to your request, follow up about your
            visit, pray for your submitted requests, and process donations. We do not sell your
            information to third parties.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">Contact Us</h2>
          <p>
            Questions about this policy can be sent to{" "}
            <a href={`mailto:${SITE.email}`} className="text-ember">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
