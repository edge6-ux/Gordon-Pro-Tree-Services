import Image from "next/image";
import { Container, Button } from "@/components/ui";

interface HeroProps {
  headline?: string;
  subheadline?: string;
  /** Relative path from /public. When omitted, a solid primary background renders. */
  imageSrc?: string;
  imageAlt?: string;
}

export default function Hero({
  headline = "North Georgia's Trusted Tree Service Professionals",
  subheadline =
    "Licensed, insured, and dedicated to safe, expert tree care across North Georgia.",
  imageSrc,
  imageAlt = "Gordon Pro Tree Service crew at work",
}: HeroProps) {
  return (
    <section className="relative min-h-[580px] md:min-h-[680px] flex items-center bg-primary overflow-hidden">
      {/* Background image + overlay */}
      {imageSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
      )}

      {/* Decorative diagonal stripe */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-1/3 h-full bg-primary-light/20 -skew-x-12 translate-x-1/4 hidden md:block"
      />

      {/* Content */}
      <Container className="relative z-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main headline */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white uppercase leading-tight mb-6 text-balance">
            {headline}
          </h1>

          {/* Sub-headline */}
          <p className="text-neutral-light text-lg md:text-xl mb-8 max-w-xl leading-relaxed mx-auto">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" href="/contact#quote" size="lg">
              Get Free Quote
            </Button>
            <Button variant="ghost" asPhone size="lg" />
          </div>
        </div>
      </Container>
    </section>
  );
}
