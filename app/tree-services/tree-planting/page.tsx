import type { Metadata } from "next";
import Image from "next/image";
import { Check, Map, Sprout, Droplets, TreePine, Leaf } from "lucide-react";
import { Container, Button, FadeIn } from "@/components/ui";
import { CTABanner } from "@/components/sections";
import { generatePageMetadata } from "@/lib/metadata";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Tree Planting Services in North Georgia | Gordon Pro Tree Service",
  description:
    "Professional tree planting and species selection for North Georgia homeowners. Residential and commercial. Hall, Gwinnett, Forsyth and surrounding counties.",
  path: "/tree-services/tree-planting",
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    Icon: Map,
    title: "Species Selection",
    desc: "We recommend trees suited to North Georgia's climate, soil, and your specific site conditions.",
  },
  {
    Icon: Sprout,
    title: "Proper Planting",
    desc: "Correct depth, root prep, and soil amendment — the foundation for a healthy tree.",
  },
  {
    Icon: Droplets,
    title: "Establishment Care",
    desc: "Guidance on watering, mulching, and early care so your tree gets off to the right start.",
  },
  {
    Icon: TreePine,
    title: "Long-Term Value",
    desc: "A well-placed tree adds shade, beauty, and real property value for decades.",
  },
] as const;

const SPECIES = [
  {
    name: "Willow Oak",
    desc: "Fast growing, tolerates wet soil, excellent shade tree.",
  },
  {
    name: "Crepe Myrtle",
    desc: "Low maintenance, stunning summer blooms, drought tolerant.",
  },
  {
    name: "Loblolly Pine",
    desc: "Fast growing evergreen, great for privacy screening.",
  },
  {
    name: "Red Maple",
    desc: "Brilliant fall color, adaptable to most North Georgia soils.",
  },
  {
    name: "Eastern Redbud",
    desc: "Beautiful spring blooms, compact size, great for smaller yards.",
  },
  {
    name: "Southern Magnolia",
    desc: "Classic Georgia tree — large, fragrant, evergreen.",
  },
] as const;

const BULLETS = [
  "Species selection consultation included",
  "Residential and commercial planting",
  "Proper depth and root preparation",
  "Soil amendment where needed",
  "Mulching and early care guidance",
  "Privacy screening and shade planning",
  "Free estimates — call or request online",
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TreePlantingPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services/tree-planting.avif"
            alt="Tree sapling being planted outdoors"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 py-20 text-center" size="md">
          <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
            Tree Planting
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-3 text-balance">
            The Right Tree in the Right Place
          </h1>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto leading-relaxed mb-8">
            A tree planted right is an investment that grows with your property
            for generations. Our team helps you choose the right species and
            plants it properly.
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
                Get It Right From the Start
              </p>
              <div className="space-y-4 text-neutral-mid leading-relaxed">
                <p>
                  Planting a tree is one of the most valuable things you can do
                  for your property and your community. But the wrong species in
                  the wrong location can become a liability — roots damaging
                  foundations, limbs overhanging structures, or a tree simply
                  failing to thrive in North Georgia&apos;s climate.
                </p>
                <p>
                  At Gordon Pro Tree Service, we help you get it right from the
                  start. We advise on species selection based on your soil, site
                  conditions, and long-term goals — then plant it correctly so it
                  establishes strong roots and thrives for decades.
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

      {/* ─── Popular Species ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F2ED" }}>
        <Container>
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark text-center leading-tight mb-10 text-balance">
              Popular Tree Species for North Georgia
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {SPECIES.map(({ name, desc }, i) => (
              <FadeIn key={name} delay={i * 60}>
                <div className="bg-white rounded-xl p-6 flex items-start gap-4 h-full">
                  <Leaf
                    className="w-5 h-5 text-accent shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-neutral-dark mb-1">
                      {name}
                    </h3>
                    <p className="text-neutral-mid text-sm leading-relaxed">{desc}</p>
                  </div>
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
        headline="Ready to Plant the Right Tree?"
        subheadline="Let us help you choose the right species and plant it properly. Free consultation available."
        variant="green"
        quoteText="Get a Free Quote"
      />
    </>
  );
}
