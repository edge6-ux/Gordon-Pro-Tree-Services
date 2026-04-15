import type { Metadata } from "next";
import Image from "next/image";
import { Check, ShieldCheck, Zap, Truck, Star } from "lucide-react";
import { Container, Button, FadeIn } from "@/components/ui";
import { CTABanner } from "@/components/sections";
import { generatePageMetadata } from "@/lib/metadata";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Tree Removal in North Georgia | Gordon Pro Tree Service",
  description:
    "Professional tree removal across Hall, Gwinnett, Forsyth and surrounding North Georgia counties. Licensed, insured, 24/7 emergency response. Free estimates.",
  path: "/tree-services/tree-removal",
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    Icon: ShieldCheck,
    title: "Licensed & Insured",
    desc: "Full coverage on every job. You're protected from first call to final cleanup.",
  },
  {
    Icon: Zap,
    title: "Emergency Response",
    desc: "Storm damage doesn't wait. We offer 24/7 emergency tree removal across North Georgia.",
  },
  {
    Icon: Truck,
    title: "Lift Machine Access",
    desc: "One of the few North Georgia companies with a lift machine for hard-to-reach trees.",
  },
  {
    Icon: Star,
    title: "Certified Arborists",
    desc: "Real expertise on every job — not just someone with a chainsaw.",
  },
] as const;

const STEPS = [
  {
    num: "01",
    title: "On-Site Evaluation",
    desc: "We inspect the tree and surrounding area and plan a safe, efficient removal.",
  },
  {
    num: "02",
    title: "Skilled Crew & Equipment",
    desc: "Our team uses cranes, saws, and rigging systems to remove trees safely.",
  },
  {
    num: "03",
    title: "Clean Removal",
    desc: "We remove all debris and leave your yard clean and clear — every time.",
  },
  {
    num: "04",
    title: "Final Walk-Through",
    desc: "We walk the property with you before we pack up. Your satisfaction is the finish line.",
  },
] as const;

const BULLETS = [
  "Residential & commercial tree removal",
  "Emergency 24/7 response",
  "Storm damage cleanup",
  "Lot clearing for new construction",
  "Hazardous tree removal near structures",
  "Full debris cleanup and haul-away included",
  "Free estimates — call or request online",
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TreeRemovalPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services/tree-removal.jpg"
            alt="Professional tree removal with chainsaw in North Georgia"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 py-20 text-center" size="md">
          <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
            Tree Removal
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-3 text-balance">
            Safe, Efficient &amp; Fully Insured
          </h1>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto leading-relaxed mb-8">
            From storm-felled trees to planned removals, Gordon Pro handles trees
            of every size — safely, efficiently, and with minimal impact to your
            property.
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
                Our Approach
              </p>
              <div className="space-y-4 text-neutral-mid leading-relaxed">
                <p>
                  Although trees are beautiful, sometimes they pose a real threat
                  to your home, your family, or your property value. Storm damage,
                  disease, and trees growing too close to structures are all serious
                  concerns that shouldn&apos;t be ignored.
                </p>
                <p>
                  At Gordon Pro Tree Service, we use expert techniques and
                  top-of-the-line equipment to handle any tree removal — no matter
                  the size, type, or location. Our team follows strict safety
                  protocols and uses advanced rigging and machinery to bring trees
                  down cleanly, with minimal risk to everything around them.
                </p>
                <p>
                  We serve homeowners and businesses across all of North Georgia.
                  Whether it&apos;s a tight backyard space or a large commercial
                  lot, we handle it with care and precision.
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

      {/* ─── What to Expect ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F2ED" }}>
        <Container>
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark text-center leading-tight mb-12 text-balance">
              What to Expect From Our Tree Removal Service
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
            {STEPS.map(({ num, title, desc }, i) => (
              <FadeIn key={num} delay={i * 80}>
                <div>
                  <p className="font-heading text-5xl font-bold text-accent/30 leading-none mb-3">
                    {num}
                  </p>
                  <h3 className="font-heading font-semibold text-base uppercase tracking-wide text-neutral-dark mb-2">
                    {title}
                  </h3>
                  <p className="text-neutral-mid text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
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
        headline="Need a Tree Removed?"
        subheadline="Free estimate. Fast response. No pressure."
        variant="green"
        quoteText="Request a Free Quote"
      />
    </>
  );
}
