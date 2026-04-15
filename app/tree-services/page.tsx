import type { Metadata } from "next";
import { ShieldCheck, Award, Clock, Truck, Star } from "lucide-react";
import { Container, Button, FadeIn } from "@/components/ui";
import { CTABanner } from "@/components/sections";
import ServicesGrid from "@/components/sections/ServicesGrid";
import { generatePageMetadata } from "@/lib/metadata";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Tree Services in North Georgia | Gordon Pro Tree Service",
  description:
    "Tree removal, trimming, stump grinding, land clearing, emergency response, and tree planting across North Georgia. Hall, Gwinnett, Forsyth and surrounding counties.",
  path: "/tree-services",
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRUST = [
  {
    Icon: ShieldCheck,
    title: "Licensed & Insured",
    desc: "Fully covered so you're never liable for accidents on your property.",
  },
  {
    Icon: Award,
    title: "Certified Arborists",
    desc: "ISA-trained professionals who know how trees grow — and how to protect them.",
  },
  {
    Icon: Clock,
    title: "24/7 Emergency",
    desc: "Storm damage doesn't wait. Neither do we. On call around the clock.",
  },
  {
    Icon: Truck,
    title: "Lift Machine Access",
    desc: "Full equipment fleet including aerial lifts for large and complex jobs.",
  },
] as const;

const REVIEWS = [
  {
    name: "Ali G.",
    text: "Gordon Pro showed up fast after a storm took down a big oak in my backyard. Professional crew, clean site when they left. Highly recommend.",
    stars: 5,
  },
  {
    name: "Cindy L.",
    text: "Best experience I've had with a tree company. They trimmed three large trees and cleaned everything up perfectly. Will definitely use again.",
    stars: 5,
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TreeServicesPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-primary py-20 md:py-28">
        <Container size="md">
          <FadeIn className="text-center">
            <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
              What We Do
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-4 text-balance">
              Expert Tree Services for North Georgia
            </h1>
            <p className="font-body text-white/80 text-lg max-w-xl mx-auto leading-relaxed mb-8">
              From emergency storm response to routine trimming, Gordon Pro
              serves Hall, Gwinnett, Forsyth, and surrounding counties with
              professional tree care you can count on.
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
          </FadeIn>
        </Container>
      </section>

      {/* ─── Services Grid ────────────────────────────────────────────────── */}
      <ServicesGrid />

      {/* ─── Trust Strip ──────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-white border-t border-neutral-200">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST.map(({ Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-light flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-neutral-dark">
                    {title}
                  </h3>
                  <p className="text-neutral-mid text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Reviews Snippet ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-primary">
        <Container>
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-white text-center leading-tight mb-10 text-balance">
              What Our Customers Say
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {REVIEWS.map(({ name, text, stars }, i) => (
              <FadeIn key={name} delay={i * 100}>
                <div
                  className="rounded-xl p-8 h-full"
                  style={{ backgroundColor: "#2D5A40" }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: stars }).map((_, s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 text-accent fill-accent"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-white/90 leading-relaxed mb-5 italic">
                    &ldquo;{text}&rdquo;
                  </p>
                  <p className="font-heading font-semibold text-sm uppercase tracking-wide text-accent">
                    — {name}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="text-center">
              <Button variant="ghost" href="/reviews" size="md">
                Read More Reviews
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <CTABanner
        headline="Not Sure Which Service You Need?"
        subheadline="Give us a call or request a free estimate — we'll assess your trees and recommend the right approach."
        variant="gold"
        quoteText="Request a Quote"
      />
    </>
  );
}
