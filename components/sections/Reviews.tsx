"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Container } from "@/components/ui";

// ─── Data ─────────────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    name: "Marcus T.",
    label: "Tree Removal — Gainesville, GA",
    body: "Gordon Pro removed a massive oak that was leaning over our house after the last storm. They were on-site within hours, worked clean and fast, and the crew treated our yard like it was their own. Couldn't have asked for better.",
    delay: 0,
  },
  {
    name: "Linda K.",
    label: "Stump Grinding — Flowery Branch, GA",
    body: "I'd had an old stump in my backyard for years and couldn't get anyone to deal with it at a fair price. Gordon Pro came out, gave me a straight quote, and had it gone same-week. Professional from start to finish.",
    delay: 100,
  },
  {
    name: "James R.",
    label: "Tree Trimming — Dahlonega, GA",
    body: "Hired them to trim several large trees around our property. The crew was punctual, courteous, and incredibly skilled. They cleaned up everything before leaving. Will absolutely use them again next season.",
    delay: 200,
  },
  {
    name: "Angela M.",
    label: "Emergency Service — Cleveland, GA",
    body: "A tree fell across our driveway at 2am during a storm. Gordon Pro answered the phone on the first ring, showed up within the hour, and had us cleared out before sunrise. That kind of service is rare.",
    delay: 300,
  },
] as const;

const STATS = [
  { value: "★ 5.0", label: "Average Rating" },
  { value: "50+", label: "Jobs Completed" },
  { value: "10+", label: "Years Serving North GA" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function Reviews() {
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

  function cardStyle(delay: number): CSSProperties {
    if (!isMounted || reducedMotion) return {};
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
      willChange: "opacity, transform",
    };
  }

  return (
    <section className="py-16 md:py-24 bg-primary overflow-hidden">
      <Container>
        <div ref={sectionRef}>
          {/* ─── Header ─────────────────────────────────────────────────── */}
          <div className="mb-10 md:mb-14 text-left md:text-center">
            <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
              What Our Customers Say
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-white leading-tight text-balance">
              Don&apos;t Take Our Word For It
            </h2>
          </div>

          {/* ─── Aggregate stats bar ─────────────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-center mb-12 md:mb-16">
            {STATS.map(({ value, label }, i) => (
              <div key={label} className="flex items-center">
                <div className="px-6 py-4 text-center">
                  <p className="font-heading text-2xl font-bold text-accent">
                    {value}
                  </p>
                  <p className="text-sm text-white/70 mt-0.5">{label}</p>
                </div>
                {i < STATS.length - 1 && (
                  <div
                    className="h-10 w-px bg-white/15 hidden sm:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          {/* ─── Review cards grid ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map(({ name, label, body, delay }, i) => (
              <figure
                key={name}
                style={cardStyle(delay)}
                className={[
                  "bg-[#2D5A40] rounded-xl p-6 flex flex-col",
                  "border border-[rgba(255,255,255,0.08)]",
                  "hover:border-[rgba(200,146,42,0.4)]",
                  "transition-[border-color] duration-300",
                  i === 3 ? "lg:col-start-2" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {/* Stars */}
                <div
                  className="flex gap-1 mb-4"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={16}
                      className="text-accent fill-accent"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Review text */}
                <blockquote className="flex-1 mb-5">
                  <p className="text-white/85 italic leading-relaxed text-sm md:text-base">
                    &ldquo;{body}&rdquo;
                  </p>
                </blockquote>

                {/* Divider */}
                <div
                  className="w-8 h-px bg-accent/50 mb-4"
                  aria-hidden="true"
                />

                {/* Attribution */}
                <figcaption>
                  <strong className="block text-white font-semibold text-sm">
                    {name}
                  </strong>
                  <span className="block text-accent text-xs font-medium mt-0.5">
                    {label}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* ─── CTA ────────────────────────────────────────────────────── */}
          <div className="mt-12 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent font-heading font-semibold text-sm uppercase tracking-wider rounded hover:bg-accent hover:text-neutral-dark transition-colors duration-200"
            >
              See All Reviews
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
