"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Star } from "lucide-react";
import { Container } from "@/components/ui";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BULLETS = [
  {
    label: "Certified Arborists",
    desc: "on every job, no exceptions",
  },
  {
    label: "Low-impact removal",
    desc: "minimal damage to your lawn",
  },
  {
    label: "Lift machine access",
    desc: "we reach what others can't",
  },
  {
    label: "Licensed, bonded & insured",
    desc: "full coverage, every time",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect reduced-motion preference before anything else
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /** Returns inline styles for slide-in animation, skipped when not mounted
   *  or when the user prefers reduced motion. */
  function slideStyle(direction: "left" | "right"): CSSProperties {
    if (!isMounted || reducedMotion) return {};
    const offset = direction === "left" ? "-24px" : "24px";
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateX(0)" : `translateX(${offset})`,
      transition: "opacity 700ms ease, transform 700ms ease",
      willChange: "opacity, transform",
    };
  }

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <Container>
        <div
          ref={sectionRef}
          className="grid md:grid-cols-2 gap-10 md:gap-14 items-stretch"
        >
          {/* ─── Left column: image ─────────────────────────────────────── */}
          <div
            style={slideStyle("left")}
            className="relative h-[400px] md:h-full md:min-h-[540px] rounded-xl overflow-hidden group"
          >
            <Image
              src="/images/hero/gpthero.jpg"
              alt="Gordon Pro Tree Service arborist with rigging gear on the job"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Hover green overlay */}
            <div className="absolute inset-0 bg-green-900/0 group-hover:bg-green-900/20 transition-colors duration-500" />
          </div>

          {/* ─── Right column: text ─────────────────────────────────────── */}
          <div
            style={slideStyle("right")}
            className="flex flex-col justify-center py-2 md:py-6"
          >
            {/* Section label */}
            <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
              Why Gordon Pro
            </p>

            {/* Headline */}
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark leading-tight mb-5 text-balance">
              Veteran-Owned. Certified. Here When It Counts.
            </h2>

            {/* Body copy */}
            <p className="text-neutral-mid leading-relaxed mb-8 max-w-lg">
              When you invite a crew onto your property, you need to know
              they&apos;ll show up on time, treat your home with respect, and
              get the job done right — the first time. At Gordon Pro Tree
              Service, that&apos;s not a promise. It&apos;s our standard.
            </p>

            {/* Trust bullet points */}
            <ul
              className="space-y-4 mb-8"
              aria-label="Reasons to choose Gordon Pro"
            >
              {BULLETS.map(({ label, desc }) => (
                <li key={label} className="flex items-start gap-3">
                  <Check
                    size={18}
                    className="text-accent shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-neutral-mid">
                    <strong className="text-neutral-dark font-semibold">
                      {label}
                    </strong>{" "}
                    — {desc}
                  </span>
                </li>
              ))}
            </ul>

            {/* Divider + text link */}
            <div>
              {/* 40px green rule */}
              <div className="w-10 h-0.5 bg-primary mb-5" aria-hidden="true" />
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 font-body font-medium text-primary hover:text-accent transition-colors duration-200"
              >
                Meet the team →
              </Link>
            </div>

            {/* Veteran badge — subtle, bottom of column */}
            <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center gap-2">
              <Star
                size={15}
                className="text-accent fill-accent shrink-0"
                aria-hidden="true"
              />
              <span className="text-sm text-neutral-mid font-medium">
                Veteran Owned &amp; Operated
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
