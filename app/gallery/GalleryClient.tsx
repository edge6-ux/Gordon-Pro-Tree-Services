"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { CTABanner } from "@/components/sections";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterCategory =
  | "All Work"
  | "Tree Removal"
  | "Tree Trimming"
  | "Land Clearing"
  | "Equipment & Crew"
  | "Results";

type ImageCategory = Exclude<FilterCategory, "All Work">;

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  category: ImageCategory;
  /** Intrinsic width used for aspect-ratio — approximate is fine */
  width: number;
  /** Intrinsic height used for aspect-ratio — approximate is fine */
  height: number;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const FILTERS: FilterCategory[] = [
  "All Work",
  "Tree Removal",
  "Tree Trimming",
  "Land Clearing",
  "Equipment & Crew",
  "Results",
];

const IMAGES: GalleryImage[] = [
  {
    src: "/images/gallery/operator2.webp",
    alt: "Gordon Pro climber with chainsaw in oak canopy",
    caption: "Aerial chainsaw work in oak canopy",
    category: "Tree Removal",
    width: 600,
    height: 800,
  },
  {
    src: "/images/gallery/crane2.webp",
    alt: "Gordon Pro crew member in boom lift at height near house",
    caption: "90ft boom lift operation near residential structure",
    category: "Equipment & Crew",
    width: 800,
    height: 533,
  },
  {
    src: "/images/gallery/operator5.webp",
    alt: "Gordon Pro climber ascending stripped pine trunk",
    caption: "Climbing stripped pine near building",
    category: "Tree Removal",
    width: 600,
    height: 800,
  },
  {
    src: "/images/gallery/crane3.webp",
    alt: "Full Gordon Pro crew with boom lift on pine removal",
    caption: "Full crew — sectional pine removal",
    category: "Equipment & Crew",
    width: 800,
    height: 533,
  },
  {
    src: "/images/gallery/cleanyard1.webp",
    alt: "Clean landscaped front yard after Gordon Pro tree service",
    caption: "Landscaped front yard — after removal",
    category: "Results",
    width: 800,
    height: 533,
  },
  {
    src: "/images/gallery/operator4.webp",
    alt: "Gordon Pro full crew on large tree near residential deck",
    caption: "Full crew on large residential removal",
    category: "Equipment & Crew",
    width: 800,
    height: 600,
  },
  {
    src: "/images/gallery/generic2.webp",
    alt: "Felled and sectioned tree in front yard with Gordon Pro crew",
    caption: "Tree sectioned and ready for haul-away",
    category: "Tree Removal",
    width: 800,
    height: 533,
  },
  {
    src: "/images/gallery/operator3.webp",
    alt: "Gordon Pro climber suspended in large tree with rigging ropes",
    caption: "Climber rigging large hardwood removal",
    category: "Tree Removal",
    width: 600,
    height: 800,
  },
  {
    src: "/images/gallery/crane1.webp",
    alt: "Red boom lift extended into winter tree canopy",
    caption: "Boom lift reaching into tall canopy",
    category: "Equipment & Crew",
    width: 600,
    height: 750,
  },
  {
    src: "/images/gallery/generic4.webp",
    alt: "Gordon Pro crew with mini excavator and wood chipper",
    caption: "Equipment lineup on residential job",
    category: "Equipment & Crew",
    width: 800,
    height: 533,
  },
  {
    src: "/images/gallery/operator1.webp",
    alt: "Gordon Pro climber in full rigging gear ascending trunk",
    caption: "Full rigging setup — trunk ascent",
    category: "Tree Removal",
    width: 600,
    height: 800,
  },
  {
    src: "/images/gallery/generic5.webp",
    alt: "Graded lot with Georgia red clay after land clearing",
    caption: "Land clearing and grading result",
    category: "Land Clearing",
    width: 800,
    height: 533,
  },
  {
    src: "/images/gallery/cleanyard2.webp",
    alt: "Fresh sod laid in backyard after tree removal and clearing",
    caption: "Fresh sod after clearing — backyard transformation",
    category: "Results",
    width: 800,
    height: 533,
  },
  {
    src: "/images/gallery/generic6.webp",
    alt: "Gordon Pro operator and track loader on tree removal job",
    caption: "Track loader on residential removal",
    category: "Equipment & Crew",
    width: 800,
    height: 533,
  },
  {
    src: "/images/gallery/generic1.webp",
    alt: "Gordon Pro equipment at residential job site with tall trees",
    caption: "Equipment staged for multi-tree job",
    category: "Tree Removal",
    width: 800,
    height: 533,
  },
  {
    src: "/images/gallery/generic3.webp",
    alt: "Clean stump area after Gordon Pro removal in suburban yard",
    caption: "Stump area after clean removal",
    category: "Results",
    width: 800,
    height: 600,
  },
];

// ─── Gallery client component ─────────────────────────────────────────────────

export default function GalleryClient() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All Work");
  const [gridVisible, setGridVisible] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // ─── Filtered image set ──────────────────────────────────────────────────
  const filtered =
    activeFilter === "All Work"
      ? IMAGES
      : IMAGES.filter((img) => img.category === activeFilter);

  // ─── Filter change with fade transition ──────────────────────────────────
  const handleFilterChange = useCallback(
    (filter: FilterCategory) => {
      if (filter === activeFilter) return;
      setGridVisible(false);
      setTimeout(() => {
        setActiveFilter(filter);
        setGridVisible(true);
      }, 150);
    },
    [activeFilter]
  );

  // ─── Lightbox navigation ─────────────────────────────────────────────────
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    );
  }, [filtered.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filtered.length
    );
  }, [filtered.length]);

  // ─── Keyboard navigation ─────────────────────────────────────────────────
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") goToPrev();
      else if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, goToPrev, goToNext]);

  // ─── Body scroll lock ────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const activeLightboxImage =
    lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      {/* ─── Section 1 — Hero ─────────────────────────────────────────────── */}
      <section className="py-16 bg-primary text-center">
        <Container size="md">
          <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
            Our Work
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-5 text-balance">
            See the Gordon Pro Difference
          </h1>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
            Real jobs. Real results. Every photo is from an actual Gordon Pro
            Tree Service project in North Georgia.
          </p>
        </Container>
      </section>

      {/* ─── Section 2 — Filter Bar ───────────────────────────────────────── */}
      <div className="sticky top-14 md:top-24 z-30 bg-white border-b border-gray-200 py-6">
        <Container>
          {/* Scrollable filter row */}
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap sm:justify-center">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => handleFilterChange(filter)}
                  className={`px-5 py-2 rounded-full border text-[14px] font-body transition-colors duration-150 whitespace-nowrap ${
                    activeFilter === filter
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary border-primary hover:bg-green-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Image count */}
          <p className="text-center text-sm text-neutral-mid font-body mt-4">
            Showing {filtered.length} photo
            {filtered.length !== 1 ? "s" : ""}
          </p>
        </Container>
      </div>

      {/* ─── Section 3 — Masonry Photo Grid ───────────────────────────────── */}
      <section className="py-12" style={{ backgroundColor: "#F5F2ED" }}>
        <Container>
          <div
            className="transition-opacity duration-150"
            style={{ opacity: gridVisible ? 1 : 0 }}
          >
            <div
              className={[
                "[column-count:1]",
                "md:[column-count:2]",
                "lg:[column-count:3]",
                "[column-gap:16px]",
              ].join(" ")}
            >
              {filtered.map((img, index) => (
                <div key={img.src} className="break-inside-avoid mb-4">
                  <div
                    className="group relative rounded-xl overflow-hidden cursor-pointer bg-white"
                    onClick={() => setLightboxIndex(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open photo: ${img.caption}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setLightboxIndex(index);
                      }
                    }}
                  >
                    {/* Photo */}
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      className="w-full h-auto block transition-transform duration-200 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Caption overlay — slides up on hover */}
                    <div
                      className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 px-4 py-3"
                      style={{ backgroundColor: "rgba(28,58,43,0.92)" }}
                      aria-hidden="true"
                    >
                      <span className="inline-block bg-accent text-white text-xs font-body rounded-full px-2.5 py-0.5 mb-1.5">
                        {img.category}
                      </span>
                      <p className="text-white text-[13px] font-body leading-snug">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Section 4 — CTA Strip ────────────────────────────────────────── */}
      <section className="py-12 bg-white">
        <Container size="md">
          <p className="font-body text-neutral-mid text-center mb-6 leading-relaxed">
            Have a project in mind? We&apos;d love to help. Request a free
            estimate and we&apos;ll get back to you same day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" href="/contact" size="md">
              Get a Free Quote
            </Button>
            <Button variant="secondary" asPhone size="md" />
          </div>
        </Container>
      </section>

      {/* ─── Section 5 — Final CTA Banner ─────────────────────────────────── */}
      <CTABanner
        headline="Ready to See These Results on Your Property?"
        subheadline="Free estimates. No pressure. Just honest, professional tree service."
        variant="green"
        quoteText="Get a Free Quote"
      />

      {/* ─── Lightbox ─────────────────────────────────────────────────────── */}
      {activeLightboxImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          onClick={closeLightbox}
        >
          {/* Animated image container — stopPropagation so clicking image doesn't close */}
          <div
            className="relative max-w-4xl w-full mx-4 flex flex-col items-center"
            style={{ animation: "lightbox-in 200ms ease forwards" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeLightboxImage.src}
              alt={activeLightboxImage.alt}
              width={activeLightboxImage.width * 2}
              height={activeLightboxImage.height * 2}
              className="max-w-full max-h-[85vh] w-auto object-contain rounded-lg"
              sizes="(max-width: 1280px) 100vw, 1024px"
              priority
            />
            <p className="text-white font-body text-sm mt-3 text-center px-4">
              {activeLightboxImage.caption}
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors p-1"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Previous */}
          {filtered.length > 1 && (
            <button
              type="button"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors p-1"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={48} />
            </button>
          )}

          {/* Next */}
          {filtered.length > 1 && (
            <button
              type="button"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors p-1"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next photo"
            >
              <ChevronRight size={48} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
