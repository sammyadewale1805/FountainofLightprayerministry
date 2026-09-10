import type { Metadata } from "next";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${SITE.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="section-space bg-background">
      <div className="container-edit max-w-3xl">
        <h1 className="font-display text-4xl font-semibold text-ink">Terms of Use</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

        <div className="prose prose-neutral mt-10 max-w-none space-y-6 text-muted-foreground">
          <p>
            By using {SITE.url.replace("https://", "")}, you agree to these terms. This website is
            provided by {SITE.name} to share information about our ministry, sermons, events, and
            giving.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">Use of Content</h2>
          <p>
            Sermon content, photos, and other media on this site are the property of {SITE.name}.
            You're welcome to share links to our content; please contact us before republishing
            substantial portions elsewhere.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">Online Giving</h2>
          <p>
            Donations made through this site are processed by third-party payment providers.
            Contributions are generally non-refundable except where required by law — contact us if
            you believe a transaction was made in error.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
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
