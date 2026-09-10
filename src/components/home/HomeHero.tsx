"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOCATIONS } from "@/data/site";

import slide2 from "@/assets/PHOTO-2026-03-19-18-43-58.jpg";
import slide3 from "@/assets/flpmi5.jpg";
import slide4 from "@/assets/flpmi6.jpg";
import slide5 from "@/assets/flpmi-anniversary-group.jpg";
import slide6 from "@/assets/flpmi-anniversary-fellowship.jpg";
import slide7 from "@/assets/flpmi-anniversary-prayer.jpg";
import slide8 from "@/assets/worship-hands-raised.jpg";
import slide9 from "@/assets/worship-hymnal-night.jpg";

const KB_CSS = `
@keyframes kb-zoomIn { from { transform: scale(1.0); } to { transform: scale(1.14); } }
@keyframes kb-zoomOut { from { transform: scale(1.14); } to { transform: scale(1.0); } }
@keyframes kb-panRight { from { transform: scale(1.12) translateX(-3%); } to { transform: scale(1.12) translateX(3%); } }
@keyframes kb-panLeft { from { transform: scale(1.12) translateX(3%); } to { transform: scale(1.12) translateX(-3%); } }
.kb-zoomIn { animation: kb-zoomIn 9s ease-out forwards !important; }
.kb-zoomOut { animation: kb-zoomOut 9s ease-out forwards !important; }
.kb-panRight { animation: kb-panRight 9s ease-in-out forwards !important; }
.kb-panLeft { animation: kb-panLeft 9s ease-in-out forwards !important; }
@keyframes indicatorFill { from { height: 0%; } to { height: 100%; } }
`;

const DURATION = 9000;

const SLIDES = [
  { src: slide2.src, alt: "Fountain of Light crusade tent", anim: "kb-panRight", pos: "50% 50%" },
  { src: slide3.src, alt: "Pastor ministering the Word", anim: "kb-zoomOut", pos: "50% 15%" },
  { src: slide4.src, alt: "A member in prayer", anim: "kb-panLeft", pos: "50% 30%" },
  { src: slide5.src, alt: "Leadership and members at the ministry anniversary celebration", anim: "kb-zoomIn", pos: "50% 30%" },
  { src: slide6.src, alt: "Congregation gathered for the anniversary fellowship service", anim: "kb-panRight", pos: "50% 35%" },
  { src: slide7.src, alt: "Ministers in a moment of prayer at the anniversary service", anim: "kb-zoomOut", pos: "50% 20%" },
  { src: slide8.src, alt: "Hands raised in worship", anim: "kb-zoomIn", pos: "50% 40%" },
  { src: slide9.src, alt: "Worshipping with a hymnal in hand", anim: "kb-panLeft", pos: "50% 45%" },
];

export function HomeHero() {
  const hq = LOCATIONS.find((l) => l.isHQ) ?? LOCATIONS[0];
  const [current, setCurrent] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (document.getElementById("kb-styles")) return;
    const el = document.createElement("style");
    el.id = "kb-styles";
    el.textContent = KB_CSS;
    document.head.appendChild(el);
  }, []);

  const goTo = (idx: number) => {
    setPrevIdx(current);
    setCurrent(idx);
    const img = imgRefs.current[idx];
    if (img) {
      img.classList.remove(SLIDES[idx].anim);
      void img.offsetWidth;
      img.classList.add(SLIDES[idx].anim);
    }
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => advance(idx), DURATION);
  };

  const advance = (fromIdx: number) => goTo((fromIdx + 1) % SLIDES.length);

  useEffect(() => {
    const img = imgRefs.current[0];
    if (img) img.classList.add(SLIDES[0].anim);
    timerRef.current = setInterval(() => advance(0), DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          const wasActive = idx === prevIdx;
          return (
            <div
              key={idx}
              className="absolute inset-0"
              style={{
                opacity: isActive ? 1 : 0,
                transition: "opacity 1.2s ease",
                willChange: isActive || wasActive ? "opacity" : "auto",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={(el) => {
                  imgRefs.current[idx] = el;
                }}
                src={slide.src}
                alt={slide.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: slide.pos,
                  display: "block",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Legibility gradient — kept light so photos stay full color and visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" aria-hidden />

      {/* Slide indicators */}
      <div className="absolute right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 md:right-10">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className="relative h-9 w-[3px] overflow-hidden bg-cream/25"
          >
            {idx === current && (
              <span
                className="absolute bottom-0 left-0 w-full bg-ember"
                style={{ animation: `indicatorFill ${DURATION / 1000}s linear forwards` }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="container-edit relative z-10 pb-20 pt-40">
        <div className="max-w-2xl">
          <p className="index-mark text-ember-light">New York · Lagos · Akure</p>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.03] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            A place to belong.
            <br />A light to follow.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/80">
            Fountain of Light is a Christ-centered family gathered around prayer, the Word, and one
            another — across three cities, but one community.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button asChild size="lg" className="btn-stamp btn-stamp-light bg-ember text-cream hover:bg-ember/90">
              <Link href="/connect#plan-your-visit">
                Plan Your Visit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Link
              href="/watch"
              className="inline-flex items-center gap-2 border-b-2 border-cream/40 pb-1 text-sm font-semibold text-cream transition-colors hover:border-ember hover:text-ember-light"
            >
              <Play className="h-4 w-4" />
              Watch Latest Message
            </Link>
          </div>

          <div className="mt-12 inline-flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-cream/15 pt-6 text-sm text-cream/70">
            <span>
              <strong className="font-medium text-cream">Sunday Service</strong> · 10:00 AM EST / 9:00 AM WAT
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-cream/30 sm:inline-block" aria-hidden />
            <span>{hq.address}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
