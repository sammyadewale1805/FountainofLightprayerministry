"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors ${
        scrolled ? "border-border bg-background/95 backdrop-blur" : "border-transparent bg-background"
      }`}
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="container-edit flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "border-ember text-ink"
                  : "border-transparent text-ink/70 hover:border-ink/30 hover:text-ink"
              }`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="btn-stamp bg-ink px-6 text-cream hover:bg-ink/90">
            <Link href="/connect#plan-your-visit">Plan Your Visit</Link>
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm border-l-0 bg-ink text-cream sm:max-w-sm">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="mt-8 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border-l-2 px-4 py-3 text-lg font-medium transition-colors ${
                    isActive(link.href)
                      ? "border-ember bg-cream/5 text-ember-light"
                      : "border-transparent text-cream/90 hover:border-cream/30 hover:bg-cream/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 border-t border-cream/10 pt-6">
              <Button asChild className="btn-stamp btn-stamp-light w-full bg-ember text-cream hover:bg-ember/90" size="lg">
                <Link href="/connect#plan-your-visit">Plan Your Visit</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
