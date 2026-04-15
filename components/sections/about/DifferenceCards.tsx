"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Shield, Award, Zap, Truck } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CARDS = [
  {
    Icon: Shield,
    title: "Licensed & Insured",
    desc: "Fully licensed, bonded and insured on every job. You're protected from first call to final cleanup.",
  },
  {
    Icon: Award,
    title: "Certified Arborists",
    desc: "Our team includes certified arborists who bring real expertise to every assessment and removal.",
  },
  {
    Icon: Zap,
    title: "24/7 Emergency Response",
    desc: "Storm damage doesn't wait for business hours. Neither do we. Call any time, we'll be there.",
  },
  {
    Icon: Truck,
    title: "Lift Machine Access",
    desc: "One of the few North Georgia tree services with a lift machine — for safer access on hard-to-reach jobs.",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function DifferenceCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    setIsMounted(true);

    const el = ref.current;
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
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {CARDS.map(({ Icon, title, desc }, i) => (
        <div
          key={title}
          style={cardStyle(i * 100)}
          className="bg-white border border-gray-100 rounded-xl p-6"
        >
          <Icon
            size={28}
            className="text-accent mb-4 shrink-0"
            aria-hidden="true"
          />
          <h3 className="font-heading text-lg font-bold uppercase text-neutral-dark mb-2">
            {title}
          </h3>
          <p className="font-body text-neutral-mid text-sm leading-relaxed">
            {desc}
          </p>
        </div>
      ))}
    </div>
  );
}
