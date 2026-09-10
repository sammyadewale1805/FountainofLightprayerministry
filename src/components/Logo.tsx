import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ministryLogo from "@/assets/ministry-logo.png";

export function Logo({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 font-display leading-none",
        className
      )}
      aria-label="Fountain of Light Prayer Ministry — Home"
    >
      <span
        className={cn(
          "relative flex h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 transition-colors",
          dark ? "ring-cream/25" : "ring-ink/15 group-hover:ring-ember"
        )}
      >
        <Image src={ministryLogo} alt="" fill sizes="44px" className="object-cover" />
      </span>
      <span className="flex flex-col">
        <span className={cn("text-base font-semibold tracking-tight", dark ? "text-cream" : "text-ink")}>
          Fountain of Light
        </span>
        <span className={cn("text-[10px] font-sans uppercase tracking-[0.16em]", dark ? "text-cream/60" : "text-muted-foreground")}>
          Prayer Ministry
        </span>
      </span>
    </Link>
  );
}
