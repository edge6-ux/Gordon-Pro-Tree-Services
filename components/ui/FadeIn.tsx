"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Extra delay in ms before the transition starts */
  delay?: number;
  /** How far (px) the element travels upward as it fades in */
  yOffset?: number;
}

/**
 * Wraps children in a fade-in-up animation triggered by IntersectionObserver.
 * Renders normally during SSR so content is never invisible without JavaScript.
 */
export default function FadeIn({
  children,
  className = "",
  delay = 0,
  yOffset = 28,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
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
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={
        isMounted
          ? {
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : `translateY(${yOffset}px)`,
              transition: `opacity 650ms ease ${delay}ms, transform 650ms ease ${delay}ms`,
              willChange: "opacity, transform",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
