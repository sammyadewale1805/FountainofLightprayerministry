import { cn } from "@/lib/utils";

export function PageHero({
  label,
  title,
  description,
  className,
}: {
  label: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <section className={cn("border-b-2 border-ember bg-ink py-20 md:py-28", className)}>
      <div className="container-edit">
        <div className="crop-frame max-w-3xl border border-cream/15 p-8 md:p-12">
          <p className="index-mark text-ember-light">{label}</p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-cream md:text-6xl">
            {title}
          </h1>
          {description && <p className="mt-5 max-w-xl text-cream/70">{description}</p>}
        </div>
      </div>
    </section>
  );
}
