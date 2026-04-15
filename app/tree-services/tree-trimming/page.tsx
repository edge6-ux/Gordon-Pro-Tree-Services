import type { Metadata } from "next";
import Image from "next/image";
import { Check, Leaf, ShieldCheck, Award, Home } from "lucide-react";
import { Container, Button, FadeIn } from "@/components/ui";
import { CTABanner } from "@/components/sections";
import { generatePageMetadata } from "@/lib/metadata";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Tree Trimming & Pruning in North Georgia | Gordon Pro Tree Service",
  description:
    "Expert tree trimming and pruning by certified arborists across North Georgia. Hall, Gwinnett, Forsyth and surrounding counties. Free estimates.",
  path: "/tree-services/tree-trimming",
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    Icon: Leaf,
    title: "Crown Thinning",
    desc: "Reduces wind resistance and improves sunlight and airflow through the canopy.",
  },
  {
    Icon: ShieldCheck,
    title: "Deadwood Removal",
    desc: "Dead limbs removed before they become a falling hazard to your property.",
  },
  {
    Icon: Award,
    title: "Certified Arborists",
    desc: "Every trimming job is guided by real arborist expertise — not guesswork.",
  },
  {
    Icon: Home,
    title: "Property Protection",
    desc: "Overhanging limbs trimmed back before they damage roofs, gutters, or structures.",
  },
] as const;

const BULLETS = [
  "Crown thinning and shaping",
  "Deadwood and hazard limb removal",
  "Canopy raising for clearance",
  "Vista pruning to improve views",
  "Storm damage cleanup trimming",
  "Residential and commercial properties",
  "Free estimates — call or request online",
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TreeTrimmingPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services/service7.jpg"
            alt="Arborist in bucket lift trimming tree with chainsaw"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 py-20 text-center" size="md">
          <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
            Tree Trimming &amp; Pruning
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-3 text-balance">
            Healthier Trees, Cleaner Property
          </h1>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Regular trimming keeps your trees healthy, your property safe, and
            your curb appeal strong. Our certified arborists know exactly what to
            cut — and what to leave alone.
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
                Why It Matters
              </p>
              <div className="space-y-4 text-neutral-mid leading-relaxed">
                <p>
                  Overgrown or messy trees can make your property look unkempt and
                  pose real safety risks. But proper tree trimming isn&apos;t just
                  about appearances — it&apos;s essential for tree health and
                  longevity.
                </p>
                <p>
                  Regular trimming helps trees grow stronger, prevents property
                  damage from falling branches, and enhances curb appeal. Improper
                  trimming, however, can weaken a tree or introduce disease — which
                  is why hiring a professional matters.
                </p>
                <p>
                  At Gordon Pro Tree Service, our trained arborists evaluate each
                  tree&apos;s structure to remove weak, dead, or overgrown limbs
                  while preserving its natural shape and long-term health.
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

      {/* ─── Trimming vs. Pruning ─────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F2ED" }}>
        <Container>
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark text-center leading-tight mb-10 text-balance">
              Trimming vs. Pruning — What&apos;s the Difference?
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <FadeIn>
              <div className="bg-primary rounded-xl p-8 h-full">
                <h3 className="font-heading text-xl font-bold uppercase text-white mb-4">
                  Tree Trimming
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Primarily done for aesthetics and to remove excess growth. Keeps
                  trees well-shaped, neat, and proportional to your property.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="bg-accent rounded-xl p-8 h-full">
                <h3 className="font-heading text-xl font-bold uppercase text-neutral-dark mb-4">
                  Tree Pruning
                </h3>
                <p className="text-neutral-dark/80 leading-relaxed">
                  Focuses on tree health. Involves precise cuts to remove diseased,
                  damaged, or structurally weak branches that threaten the
                  tree&apos;s longevity.
                </p>
              </div>
            </FadeIn>
          </div>
          <FadeIn>
            <p className="text-center text-neutral-mid leading-relaxed mb-10">
              At Gordon Pro Tree Service, we offer both — ensuring your trees get
              the right care at the right time.
            </p>
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
        headline="Time to Trim Your Trees?"
        subheadline="Our certified arborists are ready to help. Free estimates available."
        variant="green"
        quoteText="Get a Free Quote"
      />
    </>
  );
}
