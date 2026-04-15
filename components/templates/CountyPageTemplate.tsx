import Link from "next/link";
import { Check, ShieldCheck, Award, Clock, Star } from "lucide-react";
import { Container, Button, FadeIn } from "@/components/ui";
import { CTABanner } from "@/components/sections";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface CountyPageTemplateProps {
  countyName: string;
  stateName: string;
  heroTagline: string;
  intro: string;
  cities: string[];
  services: string[];
  /** Used by page files for <head> metadata — not rendered in the template */
  metaTitle: string;
  /** Used by page files for <head> metadata — not rendered in the template */
  metaDescription: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const SNIPPET_REVIEWS = [
  {
    name: "Ali G.",
    label: "Tree Trimming — Gainesville, GA",
    body: "Two massive oak trees in my backyard were in desperate need of trimming and pruning. I received a quote on Monday and the crew was able to come out on Friday. The trees look great. The whole crew was professional, courteous and punctual. Very pleased with the service and crew from Gordon Pro Tree Service.",
  },
  {
    name: "Cindy L.",
    label: "Repeat Customer — North Georgia",
    body: "This is the second time I've used this company. Their crews are always professional, prompt and courteous. The price is always reasonable for the work performed. Highly recommend.",
  },
] as const;

const TRUST_ITEMS = [
  {
    Icon: ShieldCheck,
    label: "Licensed & Insured",
  },
  {
    Icon: Award,
    label: "Certified Arborists",
  },
  {
    Icon: Clock,
    label: "24/7 Emergency Response",
  },
] as const;

// ─── Template ─────────────────────────────────────────────────────────────────

export default function CountyPageTemplate({
  countyName,
  heroTagline,
  intro,
  cities,
  services,
}: CountyPageTemplateProps) {
  return (
    <>
      {/* ─── Section 1 — Hero ─────────────────────────────────────────────── */}
      <section className="py-20 bg-primary text-center">
        <Container size="md">
          <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
            Tree Service in {countyName}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-5 text-balance">
            {heroTagline}
          </h1>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Serving homeowners and businesses across {countyName}, Georgia —
            licensed, insured, and ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" href="/contact" size="lg">
              Get a Free Quote
            </Button>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 font-heading font-semibold uppercase tracking-wider rounded transition-all duration-200 px-8 py-4 text-lg bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary"
            >
              Call {PHONE_NUMBER}
            </a>
          </div>
        </Container>
      </section>

      {/* ─── Section 2 — Intro + Services ────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left — intro */}
            <FadeIn>
              <p className="text-xl text-neutral-mid leading-relaxed font-body">
                {intro}
              </p>
            </FadeIn>

            {/* Right — services checklist */}
            <FadeIn delay={150}>
              <p className="font-heading text-sm uppercase tracking-widest text-accent mb-5">
                Services We Offer
              </p>
              <ul className="space-y-4" aria-label={`Services in ${countyName}`}>
                {services.map((service) => (
                  <li key={service} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 text-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-neutral-mid font-body">{service}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ─── Section 3 — Cities Strip ─────────────────────────────────────── */}
      <section className="py-8" style={{ backgroundColor: "#F5F2ED" }}>
        <Container>
          <FadeIn>
            <p className="font-heading text-xs uppercase tracking-widest text-accent text-center mb-5">
              Areas We Cover in {countyName}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {cities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center px-5 py-2 rounded-full bg-primary text-white text-sm font-medium font-body"
                >
                  {city}
                </span>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ─── Section 4 — Why Gordon Pro (Trust Strip) ────────────────────── */}
      <section className="py-12 bg-white">
        <Container>
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
              {TRUST_ITEMS.map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon
                      className="w-6 h-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="font-heading text-sm font-semibold uppercase tracking-wide text-neutral-dark">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ─── Section 5 — Reviews Snippet ──────────────────────────────────── */}
      <section className="py-16 bg-primary">
        <Container>
          <FadeIn>
            <p className="font-heading text-sm uppercase tracking-widest text-accent text-center mb-3">
              What Customers Say
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase text-white text-center leading-tight mb-10 text-balance">
              Trusted Across North Georgia
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {SNIPPET_REVIEWS.map(({ name, label, body }, i) => (
              <FadeIn key={name} delay={i * 100}>
                <figure
                  className={[
                    "bg-[#2D5A40] rounded-xl p-6 flex flex-col h-full",
                    "border border-[rgba(255,255,255,0.08)]",
                    "hover:border-[rgba(200,146,42,0.4)] transition-[border-color] duration-300",
                  ].join(" ")}
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
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent font-heading font-semibold text-sm uppercase tracking-wider rounded hover:bg-accent hover:text-neutral-dark transition-colors duration-200"
              >
                See All Reviews
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ─── Section 6 — CTA Banner ───────────────────────────────────────── */}
      <CTABanner
        headline={`Need Tree Service in ${countyName}?`}
        subheadline="Free estimates. Same-day response for emergencies. Call or request online."
        variant="gold"
        quoteText="Request a Free Quote"
      />
    </>
  );
}
