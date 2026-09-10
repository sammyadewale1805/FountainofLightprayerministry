import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { MINISTRIES } from "@/data/ministries";

export function MinistriesPreview() {
  return (
    <section className="section-space bg-ink">
      <div className="container-edit">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Get Involved" title="Ministries" light className="mb-0" />
          <Link
            href="/ministries"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cream hover:text-ember-light"
          >
            Explore Ministries
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ol className="border-t border-cream/15">
          {MINISTRIES.map((ministry, i) => (
            <li key={ministry.slug} className="group border-b border-cream/15">
              <Link
                href="/ministries"
                className="grid grid-cols-[3rem_1fr] items-center gap-6 py-6 transition-colors sm:grid-cols-[4rem_1fr_auto] md:py-8"
              >
                <span className="font-display text-2xl text-cream/30 transition-colors group-hover:text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-cream transition-colors group-hover:text-ember-light md:text-2xl">
                    {ministry.name}
                  </h3>
                  <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-cream/55">{ministry.description}</p>
                </div>
                <div className="col-span-2 mt-2 flex items-center justify-between sm:col-span-1 sm:mt-0 sm:flex-col sm:items-end sm:gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-cream/40">
                    {ministry.ageGroup}
                  </span>
                  <ArrowRight className="h-4 w-4 text-cream/40 transition-transform group-hover:translate-x-1 group-hover:text-ember" />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
