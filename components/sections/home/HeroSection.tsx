import Image from "next/image";
import { Container, Button } from "@/components/ui";
import FadeIn from "@/components/ui/FadeIn";

const TRUST_BADGES = [
  "Licensed & Insured",
  "Free Estimates",
  "24/7 Emergency",
] as const;

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-accent shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen overflow-hidden flex flex-col">
      {/* ─── Background image + gradient overlay ───────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/gpthero2.jpg"
          alt="Gordon Pro Tree Service professional crew working in the North Georgia forest"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Bottom-heavy gradient so bottom-left text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />
        {/* Subtle left-side vignette for text legibility on desktop */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* ─── Main content ───────────────────────────────────────────────── */}
      {/* justify-center on mobile centers vertically; md:justify-end pins to bottom */}
      <div className="relative z-10 flex-1 flex flex-col justify-center md:justify-end">
        <Container className="py-14 md:pb-20 md:pt-0 w-full">
          <FadeIn>
            <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
              {/* Logo */}
              <div className="flex justify-center md:justify-start mb-6">
                <Image
                  src="/images/hero/gptslogo.png"
                  alt="Gordon Pro Tree Service"
                  width={150}
                  height={150}
                  priority
                  className="w-[120px] h-[120px] md:w-[150px] md:h-[150px]"
                  style={{ objectFit: "contain", mixBlendMode: "normal" }}
                />
              </div>

              {/* H1 */}
              <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white uppercase leading-tight mb-5 text-balance">
                North Georgia&apos;s Most Trusted Tree Service
              </h1>

              {/* Sub-headline */}
              <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
                Licensed, insured &amp; locally trusted. Serving Hall, Gwinnett,
                Forsyth &amp; surrounding counties since day one.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button variant="primary" href="/contact" size="lg">
                  Get a Free Quote
                </Button>
                <Button variant="ghost" asPhone size="lg" />
              </div>
            </div>
          </FadeIn>
        </Container>
      </div>

      {/* ─── Trust badge strip ──────────────────────────────────────────── */}
      <div className="relative z-10 bg-black/50 backdrop-blur-sm border-t border-white/10">
        <Container>
          <div className="py-4 flex flex-wrap justify-center md:justify-start items-center gap-x-8 gap-y-3">
            {TRUST_BADGES.map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-white text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
