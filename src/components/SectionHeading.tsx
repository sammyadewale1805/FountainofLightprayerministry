import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className={cn("index-mark mb-4", align === "center" && "justify-center")}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-[2.75rem]",
          light ? "text-cream" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed md:text-lg", light ? "text-cream/75" : "text-muted-foreground")}>
          {description}
        </p>
      )}
    </div>
  );
}
