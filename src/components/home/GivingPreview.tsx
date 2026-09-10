import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GivingPreview() {
  return (
    <section className="section-space bg-ember text-cream">
      <div className="container-edit grid items-center gap-10 lg:grid-cols-[auto_1fr_auto]">
        <span className="font-display text-6xl leading-none text-ink/25 md:text-8xl">03</span>
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Make an Impact</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/90">
            Every gift helps us reach more people with the Gospel, support our branches, and care for
            our communities in New York, Lagos, and Akure. Giving is an act of worship — thank you for
            partnering with us.
          </p>
        </div>
        <Button asChild size="lg" className="btn-stamp btn-stamp-on-ember bg-cream text-ink hover:bg-cream/90">
          <Link href="/give">
            Give Online
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
