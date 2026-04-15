import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui";
import { CTABanner } from "@/components/sections";
import FadeIn from "@/components/ui/FadeIn";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ServicePageTemplateProps {
  title: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  intro: string;
  bullets: string[];
  /** Label for the quote CTA button. Defaults to "Get a Free Quote". */
  ctaText?: string;
}

// ─── Template ─────────────────────────────────────────────────────────────────

export default function ServicePageTemplate({
  title,
  subtitle,
  heroImage,
  heroAlt,
  intro,
  bullets,
  ctaText = "Get a Free Quote",
}: ServicePageTemplateProps) {
  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <Container className="relative z-10 py-20 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white uppercase leading-tight mb-4 text-balance">
            {title}
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-body max-w-xl mx-auto">
            {subtitle}
          </p>
        </Container>
      </section>

      {/* ─── Intro + bullets ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left: intro paragraph */}
            <FadeIn>
              <p className="text-lg text-neutral-mid leading-relaxed">{intro}</p>
            </FadeIn>

            {/* Right: bullet list */}
            <FadeIn delay={150}>
              <ul className="space-y-4" aria-label="Service highlights">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 text-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-neutral-mid">{bullet}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
      <CTABanner
        headline="Ready to Get Started?"
        subheadline="Free estimates. Fast response. No pressure."
        variant="green"
        quoteText={ctaText}
      />
    </>
  );
}
