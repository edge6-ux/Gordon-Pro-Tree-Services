import Link from "next/link";
import { Container } from "@/components/ui";
import FadeIn from "@/components/ui/FadeIn";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Review {
  author: string;
  rating: number;
  text: string;
  /** If true, the card is hidden on mobile screens */
  hiddenOnMobile?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const REVIEWS: Review[] = [
  {
    author: "Ali G.",
    rating: 5,
    text: "Two massive oak trees in desperate need of trimming. Received a quote Monday, crew came Friday. Professional, courteous and punctual. Very pleased.",
  },
  {
    author: "Cindy L.",
    rating: 5,
    text: "Second time using this company. Always professional, prompt and courteous. Price is always reasonable for the work performed. Highly recommend.",
  },
  {
    author: "Woori Auto Body",
    rating: 5,
    text: "Very clueless to the process but they informed us step by step. Had a guy out the next day. Great experience working with these guys.",
  },
  {
    author: "Jack D.",
    rating: 5,
    text: "Great group of guys, very friendly and professional. License and bond info supplied without having to ask. Highly recommended.",
    hiddenOnMobile: true,
  },
];

// ─── Star rating ──────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-accent" : "text-white/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Review card ──────────────────────────────────────────────────────────────

function ReviewCard({ review, delay }: { review: Review; delay: number }) {
  return (
    <FadeIn
      delay={delay}
      className={review.hiddenOnMobile ? "hidden sm:block" : undefined}
    >
      <figure className="bg-primary-light rounded-lg p-6 flex flex-col gap-4 h-full border border-white/10">
        {/* Stars */}
        <Stars rating={review.rating} />

        {/* Quote */}
        <blockquote className="text-white/80 text-sm leading-relaxed flex-1">
          &ldquo;{review.text}&rdquo;
        </blockquote>

        {/* Author */}
        <figcaption className="border-t border-white/20 pt-4">
          <p className="font-heading font-semibold text-white uppercase tracking-wide text-sm">
            {review.author}
          </p>
          <p className="text-xs text-white/50 mt-0.5">Google Review</p>
        </figcaption>
      </figure>
    </FadeIn>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ReviewsSection() {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <Container>
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <p className="font-heading text-sm uppercase tracking-widest text-accent mb-3">
              What Our Customers Say
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-white">
              Don&apos;t Take Our Word For It
            </h2>
          </div>
        </FadeIn>

        {/* Grid — 4th card hidden on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.author} review={review} delay={i * 80} />
          ))}
        </div>

        {/* CTA */}
        <FadeIn className="mt-12 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center justify-center gap-2 font-heading font-semibold uppercase tracking-wider rounded px-6 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200"
          >
            See All Reviews
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
