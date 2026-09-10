import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import pastorPhoto from "@/assets/flpmi1.jpg";
import { SectionHeading } from "@/components/SectionHeading";

export function WelcomeSection() {
  return (
    <section className="section-space bg-background">
      <div className="container-edit grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Welcome Home"
            title="There is a place for you here."
            description="Whether you grew up in church or have never set foot in one, you'll find a genuine welcome at Fountain of Light. We're a family made up of longtime members, new believers, and people still asking questions — and there's room for all of it."
          />
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            For over {new Date().getFullYear() - 1998} years, we've grown from a single prayer
            gathering into a global ministry — but our heart hasn't changed: prayer that transforms,
            teaching that's honest, and community that shows up.
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-ember decoration-2 underline-offset-4"
          >
            Discover Our Story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="crop-frame relative aspect-[4/5] w-full overflow-hidden bg-sand md:max-w-md md:justify-self-end">
          <Image
            src={pastorPhoto}
            alt="Pastor ministering at Fountain of Light Prayer Ministry"
            fill
            sizes="(min-width: 1024px) 24rem, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
