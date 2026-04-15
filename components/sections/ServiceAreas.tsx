"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";
import { Container } from "@/components/ui";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PILLS = [
  { label: "Hall County", href: "/service-areas/hall-county" },
  { label: "Gwinnett County", href: "/service-areas/gwinnett-county" },
  { label: "Forsyth County", href: "/service-areas/forsyth-county" },
  { label: "Barrow County", href: "/service-areas/barrow-county" },
  { label: "Jackson County", href: "/service-areas/jackson-county" },
  { label: "North Fulton County", href: "/service-areas/north-fulton-county" },
  { label: "Gainesville, GA", href: "/service-areas/hall-county" },
  { label: "Lawrenceville, GA", href: "/service-areas/gwinnett-county" },
  { label: "Buford, GA", href: "/service-areas/gwinnett-county" },
  { label: "Suwanee, GA", href: "/service-areas/gwinnett-county" },
] as const;

const MAPS_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212400.0!2d-83.8!3d34.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885f40def4b21d2f%3A0x69a5aa9dd0f52bd6!2sGainesville%2C%20GA!5e0!3m2!1sen!2sus!4v1";

// ─── Component ────────────────────────────────────────────────────────────────

export default function ServiceAreas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    setIsMounted(true);

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function pillStyle(index: number): CSSProperties {
    if (!isMounted || reducedMotion) return {};
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(12px)",
      transition: `opacity 500ms ease ${index * 60}ms, transform 500ms ease ${index * 60}ms`,
      willChange: "opacity, transform",
    };
  }

  const mapFadeStyle: CSSProperties =
    !isMounted || reducedMotion
      ? {}
      : {
          opacity: isVisible ? 1 : 0,
          transition: "opacity 600ms ease 300ms",
          willChange: "opacity",
        };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <Container>
        <div ref={sectionRef}>
          {/* ─── Header ─────────────────────────────────────────────────── */}
          <div className="mb-10 md:mb-12 text-left md:text-center">
            <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
              Where We Work
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark leading-tight mb-5 text-balance">
              Proudly Serving North Georgia
            </h2>
            <p className="text-neutral-mid leading-relaxed max-w-prose md:mx-auto">
              From Gainesville to Lawrenceville, our crews cover Hall, Gwinnett,
              Forsyth, Barrow, Jackson, and North Fulton counties — and
              everywhere in between. If you&apos;re in North Georgia, we can be
              there.
            </p>
          </div>

          {/* ─── County pills ─────────────────────────────────────────── */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {PILLS.map(({ label, href }, i) => (
              <Link
                key={`${label}-${href}`}
                href={href}
                style={pillStyle(i)}
                className="inline-flex items-center px-5 py-2 rounded-full bg-primary text-white text-sm font-medium font-body hover:bg-accent transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* ─── Trust strip ──────────────────────────────────────────── */}
          <div className="flex justify-center mb-0">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-0 bg-gray-50 border border-gray-100 rounded-2xl py-3 px-6">
              {/* Location */}
              <span className="inline-flex items-center gap-2 text-sm text-neutral-mid font-body">
                <MapPin
                  size={14}
                  className="text-accent shrink-0"
                  aria-hidden="true"
                />
                Based in Lula, GA
              </span>

              <div
                className="hidden md:block w-px h-4 bg-gray-300 mx-4"
                aria-hidden="true"
              />

              {/* Hours */}
              <span className="inline-flex items-center gap-2 text-sm text-neutral-mid font-body">
                <Clock
                  size={14}
                  className="text-accent shrink-0"
                  aria-hidden="true"
                />
                Mon–Fri 8am–5pm &nbsp;&bull;&nbsp; 24/7 Emergency
              </span>

              <div
                className="hidden md:block w-px h-4 bg-gray-300 mx-4"
                aria-hidden="true"
              />

              {/* Phone */}
              <a
                href="tel:+17702716072"
                className="inline-flex items-center gap-2 text-sm text-neutral-mid font-body hover:text-primary transition-colors duration-200"
              >
                <Phone
                  size={14}
                  className="text-accent shrink-0"
                  aria-hidden="true"
                />
                (770) 271-6072
              </a>
            </div>
          </div>

          {/* ─── Map embed ────────────────────────────────────────────── */}
          <div style={mapFadeStyle} className="mt-12">
            <iframe
              src={MAPS_SRC}
              title="Gordon Pro Tree Service coverage area — North Georgia"
              className="w-full h-[280px] md:h-[400px] rounded-2xl border border-gray-200"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Map showing Gordon Pro Tree Service coverage area in North Georgia"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
