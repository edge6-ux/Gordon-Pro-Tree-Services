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
        {/* Mobile: vertical shot */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/hero/gpthero2.jpg"
            alt="Gordon Pro Tree Service arborist climbing a tree in North Georgia"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* Desktop: wide angle shot */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/images/hero/newhero.webp"
            alt="Gordon Pro Tree Service arborist climbing a tree in North Georgia"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* ─── Top: h1 just below navbar (desktop) / centered with all content (mobile) ── */}
      <div className="relative z-10 flex flex-col justify-center flex-1 md:flex-none">
        <Container className="py-14 md:pt-16 md:pb-0 w-full">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              {/* Mobile-only logo */}
              <div className="flex justify-center mb-6 md:hidden">
                <Image
                  src="/images/hero/gptslogo.png"
                  alt="Gordon Pro Tree Service"
                  width={120}
                  height={120}
                  className="w-28 h-28 object-contain drop-shadow-lg"
                />
              </div>

              {/* H1 */}
              <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white uppercase leading-tight mb-10 text-balance">
                North Georgia&apos;s Most Trusted Tree Service
              </h1>

              {/* Sub-headline — visible on all screen sizes */}
              <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-xl mx-auto">
                Licensed, insured &amp; locally trusted. Serving Hall, Gwinnett,
                Forsyth &amp; surrounding counties since day one.
              </p>
              {/* Buttons — mobile only, desktop handled below */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:hidden">
                <Button variant="primary" href="https://project-q9cfi.vercel.app/submit" size="lg">
                  Get an Assessment
                </Button>
                <Button variant="ghost" asPhone size="lg" />
              </div>
            </div>
          </FadeIn>
        </Container>
      </div>

      {/* ─── Spacer (desktop only) ──────────────────────────────────────── */}
      <div className="hidden md:flex flex-1" />

      {/* ─── Bottom: buttons (desktop only) ────────────────────────────── */}
      <div className="relative z-10 hidden md:block">
        <Container className="pb-20 w-full">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" href="https://project-q9cfi.vercel.app/submit" size="lg">
                Get an Assessment
              </Button>
              <Button variant="ghost" asPhone size="lg" />
            </div>
          </div>
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
