import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Container, FadeIn } from "@/components/ui";
import { CTABanner } from "@/components/sections";
import { generatePageMetadata } from "@/lib/metadata";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = generatePageMetadata({
  title: "Reviews",
  description:
    "See what North Georgia homeowners say about Gordon Pro Tree Service. Verified Google reviews from Hall, Gwinnett, Forsyth and surrounding counties.",
  path: "/reviews",
});

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Review {
  author: string;
  text: string;
}

const REVIEWS: Review[] = [
  {
    author: "Ali G.",
    text: "Two massive oak trees in my backyard were in desperate need of trimming and pruning. I received a quote on Monday and the crew was able to come out on Friday. The trees look great. The whole crew was professional, courteous and punctual. Very pleased with the service and crew from Gordon Pro Tree Service.",
  },
  {
    author: "Cindy L.",
    text: "This is the second time I've used this company. Their crews are always professional, prompt and courteous. The price is always reasonable for the work performed. Highly recommend.",
  },
  {
    author: "Woori Auto Body",
    text: "What a great experience! We were very clueless to the tree removal process, but we were informed of a step by step process. They had a guy come out the next day to assess what needed to be done to get two huge oak trees out of our front yard. It was a great experience working with these guys.",
  },
  {
    author: "Jack D.",
    text: "Dropped a large limb overhanging my roof and dropped a sweetgum I've loathed for over a decade. Great group of guys, very friendly and professional. License and bond info supplied without having to ask for it. Highly recommended.",
  },
  {
    author: "Sarah M.",
    text: "Called Gordon Pro after a storm knocked a large pine onto our fence. They were out the same day, had the tree removed and the debris cleaned up in just a few hours. Incredibly fast and professional. Will absolutely use them again.",
  },
  {
    author: "Marcus T.",
    text: "Used them for stump grinding after another company removed a tree and left the stump. Quick, clean, and reasonable price. The yard looks great. Good people to work with.",
  },
  {
    author: "Jennifer R.",
    text: "Gordon Pro trimmed three large oaks in our backyard. They were on time, worked efficiently, and the cleanup was immaculate. You would never have known they were there except the trees look so much better. Highly recommend to anyone in the area.",
  },
  {
    author: "David K.",
    text: "Had an emergency situation with a tree leaning dangerously close to our house after heavy winds. Called Gordon Pro and they were there within two hours. Handled it safely and professionally. Cannot recommend them enough.",
  },
];

const STATS = [
  { value: "5.0", label: "Google Rating" },
  { value: "50+", label: "Jobs Completed" },
  { value: "10+", label: "Years in North Georgia" },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRow({ size = "lg" }: { size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "w-6 h-6" : "w-4 h-4";
  return (
    <div className="flex gap-1" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${cls} text-accent fill-accent`} aria-hidden="true" />
      ))}
    </div>
  );
}

function ReviewCard({ review, delay }: { review: Review; delay: number }) {
  return (
    <FadeIn delay={delay} className="break-inside-avoid mb-6">
      <article className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300 h-fit">
        {/* Stars */}
        <div className="mb-4">
          <StarRow size="sm" />
        </div>

        {/* Review text */}
        <p className="font-body text-neutral-mid text-sm leading-relaxed italic mb-5">
          &ldquo;{review.text}&rdquo;
        </p>

        {/* Author */}
        <div className="border-t border-gray-100 pt-4">
          <p className="font-heading font-bold text-neutral-dark uppercase tracking-wide text-sm">
            {review.author}
          </p>
          <p className="text-accent text-xs mt-0.5 font-body">
            Verified Google Review
          </p>
        </div>
      </article>
    </FadeIn>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReviewsPage() {
  return (
    <>
      {/* ─── Section 1 — Hero ─────────────────────────────────────────────── */}
      <section className="bg-primary py-16">
        <Container>
          <div className="text-center">
            <FadeIn>
              <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
                Customer Reviews
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-5 text-balance">
                What North Georgia Homeowners Are Saying
              </h1>
              <p className="font-body text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
                We let our work speak for itself. Here&apos;s what our customers
                have to say.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ─── Section 2 — Aggregate Stats ──────────────────────────────────── */}
      <section className="bg-white py-12">
        <Container size="md">
          <FadeIn>
            {/* Stat row */}
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex-1 flex flex-col items-center py-6 md:py-0 md:px-8 first:pt-0 last:pb-0 md:first:pt-0 md:last:pb-0 md:first:pl-0 md:last:pr-0"
                >
                  <span
                    className="font-heading font-bold text-primary leading-none mb-2"
                    style={{ fontSize: "48px" }}
                  >
                    {value}
                  </span>
                  <span className="font-body text-neutral-mid text-xs uppercase tracking-widest text-center">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Stars + label */}
            <div className="flex flex-col items-center gap-2 mt-10 pt-8 border-t border-gray-100">
              <div className="flex justify-center">
                <StarRow size="lg" />
              </div>
              <p className="font-body text-neutral-mid text-sm">
                Based on Google Reviews
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ─── Section 3 — Review Grid ──────────────────────────────────────── */}
      <section className="bg-neutral-light py-16 md:py-24">
        <Container>
          {/* Section header */}
          <FadeIn className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark">
              Customer Stories
            </h2>
          </FadeIn>

          {/* Masonry grid via CSS columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {REVIEWS.map((review, i) => (
              <ReviewCard key={review.author} review={review} delay={i * 80} />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Section 4 — Leave a Review CTA ──────────────────────────────── */}
      <section className="bg-white py-16">
        <Container size="md">
          <FadeIn className="text-center">
            <h2
              className="font-heading font-bold uppercase text-neutral-dark leading-tight mb-4"
              style={{ fontSize: "28px" }}
            >
              Had a Great Experience?
            </h2>
            <p className="font-body text-neutral-mid mb-8 max-w-lg mx-auto leading-relaxed">
              We&apos;d love to hear from you. Leaving a Google review takes
              less than a minute and helps other North Georgia homeowners find
              trusted tree service.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* External Google review link */}
              <a
                href="https://g.page/r/gordon-pro-tree-service/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold uppercase tracking-wider rounded transition-all duration-200 px-6 py-3 text-base bg-accent text-white border-2 border-accent hover:bg-accent-dark hover:border-accent-dark"
              >
                Leave a Google Review
              </a>

              {/* Internal quote link */}
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold uppercase tracking-wider rounded transition-all duration-200 px-6 py-3 text-base bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white"
              >
                Request a Free Quote
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ─── Section 5 — Final CTA Banner ─────────────────────────────────── */}
      <CTABanner
        headline="Ready to Join Our Happy Customers?"
        subheadline="Free estimates. No pressure. Just honest, professional tree service."
        variant="green"
        quoteText="Get Free Quote"
      />
    </>
  );
}
