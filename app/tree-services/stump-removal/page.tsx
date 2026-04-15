import type { Metadata } from "next";
import Image from "next/image";
import { Check, AlertTriangle, Bug, Sprout, Maximize2 } from "lucide-react";
import { Container, Button, FadeIn } from "@/components/ui";
import { CTABanner } from "@/components/sections";
import { generatePageMetadata } from "@/lib/metadata";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Stump Removal & Grinding in North Georgia | Gordon Pro Tree Service",
  description:
    "Professional stump removal and grinding across North Georgia. Fast, clean, affordable. Hall, Gwinnett, Forsyth and surrounding counties.",
  path: "/tree-services/stump-removal",
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    Icon: AlertTriangle,
    title: "Safety First",
    desc: "Stumps are a serious tripping hazard — especially for children and lawn equipment.",
  },
  {
    Icon: Bug,
    title: "Pest Prevention",
    desc: "Decaying stumps attract termites, ants, and rodents that can spread to your home.",
  },
  {
    Icon: Sprout,
    title: "Stop Regrowth",
    desc: "Some stumps sprout new growth. We remove the problem completely.",
  },
  {
    Icon: Maximize2,
    title: "Reclaim Your Space",
    desc: "Remove a stump and gain usable yard space for landscaping, a patio, or new sod.",
  },
] as const;

const BULLETS = [
  "Stumps ground below grade — no more tripping",
  "Handles stumps of any size",
  "Pest and fungal harborage eliminated",
  "Debris cleaned up and hauled away",
  "Minimal disruption to surrounding landscape",
  "Can be paired with sod or landscaping service",
  "Free estimates — call or request online",
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StumpRemovalPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services/stump-removal.jpg"
            alt="Stump grinder removing tree stump in residential yard"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 py-20 text-center" size="md">
          <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
            Stump Removal &amp; Grinding
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-3 text-balance">
            Complete Removal. Clean Results.
          </h1>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Leftover stumps are a tripping hazard, a pest magnet, and an eyesore.
            We grind them below grade and haul away the debris — leaving your
            yard clean and hazard-free.
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

      {/* ─── Intro + Feature Cards ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <FadeIn>
              <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
                More Than an Eyesore
              </p>
              <div className="space-y-4 text-neutral-mid leading-relaxed">
                <p>
                  Tree stumps can be more than just an eyesore. They make your
                  outdoor space look neglected, create tripping hazards, attract
                  pests like termites and ants, and can even sprout new unwanted
                  growth over time.
                </p>
                <p>
                  At Gordon Pro Tree Service, we provide expert stump removal and
                  grinding in North Georgia, ensuring your yard stays safe, clean,
                  and ready to use. Our equipment handles stumps of any size with
                  minimal disruption to your surrounding landscaping.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FEATURES.map(({ Icon, title, desc }) => (
                  <div key={title} className="bg-neutral-light rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
                      <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-neutral-dark">
                        {title}
                      </h3>
                    </div>
                    <p className="text-neutral-mid text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ─── Methods ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F2ED" }}>
        <Container>
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark text-center leading-tight mb-10 text-balance">
              Our Stump Removal Methods
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <FadeIn>
              <div className="bg-white rounded-xl p-8 border-2 border-primary relative h-full">
                <span className="absolute top-4 right-4 bg-primary text-white text-xs font-heading font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                  Most Popular
                </span>
                <h3 className="font-heading text-xl font-bold uppercase text-neutral-dark mb-4 pr-28">
                  Stump Grinding
                </h3>
                <p className="text-neutral-mid leading-relaxed">
                  We grind the stump down below grade, leaving the root system to
                  decompose naturally. Fast, cost-effective, and clean — this is
                  the most popular option for most residential jobs.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="bg-white rounded-xl p-8 border border-gray-200 h-full">
                <h3 className="font-heading text-xl font-bold uppercase text-neutral-dark mb-4">
                  Full Stump Removal
                </h3>
                <p className="text-neutral-mid leading-relaxed">
                  For complete elimination, we remove the entire stump and root
                  system. Best for situations where you need a completely clean
                  slate — new construction, sod installation, or major landscaping
                  changes.
                </p>
              </div>
            </FadeIn>
          </div>
          <FadeIn>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-neutral-mid">{b}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </Container>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <CTABanner
        headline="Got a Stump That Needs to Go?"
        subheadline="We grind it down and clean it up. Free estimates available."
        variant="green"
        quoteText="Get a Free Quote"
      />
    </>
  );
}
