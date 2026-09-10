import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS, LOCATIONS, SITE } from "@/data/site";

const SOCIAL = [
  { icon: Youtube, href: SITE.social.youtube, label: "YouTube" },
  { icon: Facebook, href: SITE.social.facebook, label: "Facebook" },
  { icon: Instagram, href: SITE.social.instagram, label: "Instagram" },
  { icon: Twitter, href: SITE.social.twitter, label: "Twitter" },
];

export function Footer() {
  const hq = LOCATIONS.find((l) => l.isHQ) ?? LOCATIONS[0];

  return (
    <footer className="border-t border-cream/10 bg-ink text-cream">
      <div className="container-edit py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">{SITE.description}</p>
            <div className="mt-6 flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition-colors hover:border-ember hover:text-ember"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/50">Explore</h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream/80 transition-colors hover:text-ember-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/50">Service Times</h3>
            <ul className="mt-5 space-y-4">
              {LOCATIONS.map((loc) => (
                <li key={loc.id} className="text-sm text-cream/80">
                  <p className="font-medium text-cream">{loc.name}</p>
                  {loc.services.map((s) => (
                    <p key={s.day} className="text-cream/60">
                      {s.day}: {s.time}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/50">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm text-cream/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                <span>{hq.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-ember" />
                <span>{hq.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-ember" />
                <a href={`mailto:${SITE.email}`} className="hover:text-ember-light">
                  {SITE.email}
                </a>
              </li>
            </ul>
            <Link
              href="/give"
              className="btn-stamp btn-stamp-light mt-6 bg-ember px-5 py-2.5 text-sm text-cream transition-colors hover:bg-ember/90"
            >
              Give Online
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-edit flex flex-col items-center justify-between gap-4 py-6 text-xs text-cream/50 md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-cream/80">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cream/80">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
