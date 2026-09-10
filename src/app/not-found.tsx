import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ink">
      <div className="container-edit">
        <div className="crop-frame max-w-md border border-cream/15 p-10">
          <p className="index-mark text-ember-light">Error 404</p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-cream">
            This page has wandered off.
          </h1>
          <p className="mt-4 text-cream/70">Let&apos;s get you back to somewhere familiar.</p>
          <Button asChild size="lg" className="btn-stamp btn-stamp-light mt-8 bg-ember text-cream hover:bg-ember/90">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
