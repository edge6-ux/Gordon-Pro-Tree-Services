import type { Metadata } from "next";
import Image from "next/image";
import { Check, Tractor, Map, Layers, TreePine } from "lucide-react";
import { Container, Button, FadeIn } from "@/components/ui";
import { CTABanner } from "@/components/sections";
import { generatePageMetadata } from "@/lib/metadata";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Land Clearing & Grading in North Georgia | Gordon Pro Tree Service",
  description:
    "Professional land clearing and grading for residential and commercial properties across North Georgia. Full equipment fleet. Free estimates.",
  path: "/tree-services/land-clearing",
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    Icon: Tractor,
    title: "Heavy Equipment",
    desc: "Full fleet including skid steers, track loaders, and boom lifts for any scale job.",
  },
  {
    Icon: Map,
    title: "Lot Clearing",
    desc: "Complete lot clearing for new home builds, commercial sites, and development projects.",
  },
  {
    Icon: Layers,
    title: "Grading & Site Prep",
    desc: "Land graded and prepped to spec — ready for your contractor or landscaper.",
  },
  {
    Icon: TreePine,
    title: "Selective Clearing",
    desc: "Want to keep some trees? We selectively clear while preserving what you want.",
  },
] as const;

const LAND_SERVICES = [
  {
    title: "Residential Lot Clearing",
    desc: "Full clearing for new home sites, additions, and major landscaping projects.",
  },
  {
    title: "Commercial Land Clearing",
    desc: "Large-scale clearing for commercial development, warehouses, and retail sites.",
  },
  {
    title: "Brush & Undergrowth Removal",
    desc: "Overgrown brush cleared and hauled — reclaim your property line.",
  },
  {
    title: "Stump Removal",
    desc: "All stumps ground below grade as part of the clearing process.",
  },
  {
    title: "Grading & Leveling",
    desc: "Land graded to drain properly and ready for your next phase.",
  },
  {
    title: "Debris Hauling",
    desc: "All cleared material hauled off-site — we leave a clean, open lot.",
  },
] as const;

const BULLETS = [
  "Residential and commercial land clearing",
  "Full equipment fleet — no job too large",
  "Trees, stumps, brush, and debris all handled",
  "Grading and site prep available",
  "Selective clearing to preserve existing trees",
  "Serving all of North Georgia",
  "Free estimates — call or request online",
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandClearingPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services/land-clearing.jpg"
            alt="Heavy equipment clearing forested land in North Georgia"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 py-20 text-center" size="md">
          <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
            Land Clearing &amp; Grading
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-3 text-balance">
            From Overgrown to Open in One Call
          </h1>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto leading-relaxed mb-8">
            From residential lots to large-scale commercial sites, Gordon Pro
            brings the equipment and expertise to clear, grade, and prep your
            land for whatever comes next.
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
                One Crew, Start to Finish
              </p>
              <div className="space-y-4 text-neutral-mid leading-relaxed">
                <p>
                  Whether you&apos;re preparing a lot for new construction,
                  clearing overgrown brush from a residential property, or need
                  full-scale grading for a commercial development — Gordon Pro Tree
                  Service has the equipment and the experience to get it done.
                </p>
                <p>
                  We serve North Georgia property owners with comprehensive land
                  clearing services, from selective brush removal to complete lot
                  clearing. Our team coordinates the entire process — trees,
                  stumps, brush, and grading — so you&apos;re working with one
                  trusted crew from start to finish.
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

      {/* ─── Services List ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F2ED" }}>
        <Container>
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark text-center leading-tight mb-10 text-balance">
              Land Clearing Services We Provide
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {LAND_SERVICES.map(({ title, desc }, i) => (
              <FadeIn key={title} delay={i * 60}>
                <div className="bg-white rounded-xl p-6 h-full">
                  <div className="flex items-start gap-3 mb-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                    <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-neutral-dark">
                      {title}
                    </h3>
                  </div>
                  <p className="text-neutral-mid text-sm leading-relaxed pl-8">{desc}</p>
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
        headline="Ready to Clear Your Land?"
        subheadline="One call, one crew, one clean site. Free estimates available."
        variant="green"
        quoteText="Get a Free Quote"
      />
    </>
  );
}
