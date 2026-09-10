import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import tentPhoto from "@/assets/PHOTO-2026-03-19-18-43-58.jpg";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-36">
      <div className="absolute inset-0">
        <Image src={tentPhoto} alt="Fountain of Light crusade tent" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 z-[1] bg-ink/55" aria-hidden />
      <div className="container-edit relative z-[2] max-w-2xl">
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-cream md:text-5xl">
          We&apos;d love to worship with you.
        </h2>
        <p className="mt-5 max-w-xl text-lg text-cream/75">
          Sunday · 10:00 AM EST (New York) · 9:00 AM &amp; 7:00 AM WAT (Lagos &amp; Akure)
        </p>
        <Button asChild size="lg" className="btn-stamp btn-stamp-light mt-10 bg-ember px-10 text-cream hover:bg-ember/90">
          <Link href="/connect#plan-your-visit">
            Plan Your Visit
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
