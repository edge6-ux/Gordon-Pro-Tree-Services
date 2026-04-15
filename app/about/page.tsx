import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { Container, FadeIn } from "@/components/ui";
import { CTABanner } from "@/components/sections";
import { generatePageMetadata } from "@/lib/metadata";
import DifferenceCards from "@/components/sections/about/DifferenceCards";

// ─── Page metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Learn about Gordon Pro Tree Service — serving North Georgia homeowners and businesses with professional tree care, honest pricing, and a crew that treats your property like their own.",
  path: "/about",
});

// ─── Static data ──────────────────────────────────────────────────────────────

const COUNTIES = [
  "Hall",
  "Gwinnett",
  "Forsyth",
  "Barrow",
  "Jackson",
  "North Fulton",
] as const;

const PROMISE_BULLETS = [
  "Full debris cleanup and haul-away on every job",
  "Stump grinding below grade — no leftover hazards",
  "Walk-through with homeowner before we leave",
  "Property treated with care from start to finish",
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ─── Section 1 — Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/about/about-hero.jpg"
          alt="Gordon Pro Tree Service crane removing large tree from residential yard"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

        <Container className="relative z-10 text-center px-4">
          <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
            Our Story
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-6 text-balance">
            Built on Hard Work, Trust &amp; a Job Done Right
          </h1>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
            Gordon Pro Tree Service has been serving North Georgia homeowners
            and businesses with honest, professional tree care — the kind where
            we treat your property like our own.
          </p>
        </Container>
      </section>

      {/* ─── Section 2 — Our Story ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left — text */}
            <FadeIn>
              <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
                Who We Are
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark leading-tight mb-6 text-balance">
                North Georgia&apos;s Tree Service, Done Right
              </h2>
              <div className="space-y-4 text-neutral-mid leading-relaxed">
                <p>
                  Gordon Pro Tree Service was built on a simple belief — that
                  every customer deserves a crew that shows up on time,
                  communicates clearly, and leaves your property cleaner than
                  they found it. That belief drives everything we do.
                </p>
                <p>
                  We serve homeowners and businesses across Hall, Gwinnett,
                  Forsyth, Barrow, Jackson, and North Fulton counties. From
                  routine trimming to full-scale emergency removals, our team
                  brings the equipment, the expertise, and the work ethic to
                  get it done right — every time.
                </p>
                <p>
                  We&apos;re one of the few tree services in North Georgia with
                  access to a lift machine for hard-to-reach trees. That means
                  fewer limitations, safer removals, and better results for
                  your property.
                </p>
              </div>
            </FadeIn>

            {/* Right — image */}
            <FadeIn
              delay={150}
              className="relative h-[400px] md:h-full md:min-h-[480px] rounded-xl overflow-hidden"
            >
              <Image
                src="/images/about/inspection.jpg"
                alt="Arborist measuring and inspecting tree trunk"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ─── Section 3 — Pull Quote ───────────────────────────────────────── */}
      <section className="py-16 bg-primary">
        <Container size="md">
          <FadeIn className="text-center">
            {/* Opening quotation mark */}
            <p
              className="font-heading text-accent leading-none select-none"
              style={{ fontSize: "80px", lineHeight: 1 }}
              aria-hidden="true"
            >
              &ldquo;
            </p>
            <blockquote className="font-heading text-white text-2xl md:text-3xl italic leading-snug -mt-4">
              We treat your property like our own — because our reputation
              depends on it.
            </blockquote>
            <p className="font-body text-accent text-sm mt-6 tracking-wide">
              — Gordon Pro Tree Service
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ─── Section 4 — What Sets Us Apart ──────────────────────────────── */}
      <section
        className="py-16 md:py-24 overflow-hidden"
        style={{ backgroundColor: "#F5F2ED" }}
      >
        <Container>
          <FadeIn className="text-center mb-12">
            <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
              What Sets Us Apart
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark leading-tight text-balance">
              The Gordon Pro Difference
            </h2>
          </FadeIn>

          <DifferenceCards />
        </Container>
      </section>

      {/* ─── Section 5 — Our Promise / Clean Yard ────────────────────────── */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left — image */}
            <FadeIn className="relative h-[400px] md:h-full md:min-h-[480px] rounded-xl overflow-hidden">
              <Image
                src="/images/about/cleanyard2.jpg"
                alt="Clean residential yard after professional tree removal"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </FadeIn>

            {/* Right — text */}
            <FadeIn delay={150}>
              <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
                Our Promise
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark leading-tight mb-6 text-balance">
                We Don&apos;t Leave Until the Job Is Done Right
              </h2>
              <p className="text-neutral-mid leading-relaxed mb-8">
                Every job ends the same way — with a thorough cleanup, a
                walk-through with the homeowner, and a yard that looks better
                than when we arrived. We haul away all debris, grind down
                stumps below grade, and make sure you&apos;re completely
                satisfied before we pack up.
              </p>
              <ul className="space-y-4" aria-label="Our promise to you">
                {PROMISE_BULLETS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="text-accent shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-neutral-mid">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ─── Section 6 — Service Area Strip ──────────────────────────────── */}
      <section className="py-8 bg-primary">
        <FadeIn>
          <Container className="text-center">
            <p className="font-heading text-xs uppercase tracking-widest text-accent mb-3">
              Proudly Serving
            </p>
            <p className="font-body text-white leading-relaxed text-[15px]">
              {COUNTIES.map((county, i) => (
                <span key={county}>
                  {county}
                  {i < COUNTIES.length - 1 && (
                    <span className="text-accent mx-2" aria-hidden="true">
                      &middot;
                    </span>
                  )}
                </span>
              ))}
            </p>
          </Container>
        </FadeIn>
      </section>

      {/* ─── Section 7 — Final CTA ────────────────────────────────────────── */}
      <CTABanner
        headline="Let's Talk About Your Tree"
        subheadline="Free estimates, fast response, no pressure. Call or request a quote online."
        variant="gold"
        quoteText="Request a Free Quote"
      />
    </>
  );
}
