import Image from "next/image";
import { LEADERSHIP } from "@/data/leadership";

export function LeadershipGrid() {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {LEADERSHIP.map((leader) => (
        <div key={leader.slug}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
            <Image
              src={leader.photo}
              alt={leader.name}
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
              className="object-cover"
              style={{ objectPosition: leader.photoPosition ?? "center" }}
            />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold text-ink">{leader.name}</h3>
          <p className="text-sm font-medium text-ember">{leader.title}</p>
          <p className="text-xs text-muted-foreground">{leader.branch}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{leader.bio}</p>
        </div>
      ))}
    </div>
  );
}
