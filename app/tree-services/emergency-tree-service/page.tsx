import type { Metadata } from "next";
import Image from "next/image";
import { Check, Clock, Zap, ShieldCheck, CheckCircle, Phone } from "lucide-react";
import { Container, Button, FadeIn } from "@/components/ui";
import { CTABanner } from "@/components/sections";
import { generatePageMetadata } from "@/lib/metadata";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Emergency Tree Service in North Georgia | Gordon Pro Tree Service",
  description:
    "24/7 emergency tree removal across North Georgia. Storm damage, fallen trees, hanging limbs. Fast response, full cleanup. Call (770) 271-6072.",
  path: "/tree-services/emergency-tree-service",
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    Icon: Clock,
    title: "24/7 Availability",
    desc: "We respond to emergencies around the clock — weekends, holidays, any time.",
  },
  {
    Icon: Zap,
    title: "Fast Response",
    desc: "We prioritize emergency calls and get crews on site as quickly as possible.",
  },
  {
    Icon: ShieldCheck,
    title: "Insurance Assistance",
    desc: "We work alongside your insurance company and can provide documentation for claims.",
  },
  {
    Icon: CheckCircle,
    title: "Full Cleanup",
    desc: "Emergency removal includes full debris cleanup — we don't leave a mess.",
  },
] as const;

const SITUATIONS = [
  {
    title: "Tree on Your Roof or Structure",
    desc: "Immediate danger to your home. Call us now — don't wait.",
  },
  {
    title: "Blocked Driveway or Road",
    desc: "A fallen tree blocking access is an emergency we handle fast.",
  },
  {
    title: "Hanging or Partially Fallen Limbs",
    desc: "Widow-makers don't need to fall all the way to be dangerous.",
  },
  {
    title: "Tree Leaning After a Storm",
    desc: "Post-storm lean means the root plate may have shifted. Don't ignore it — call immediately.",
  },
] as const;

const BULLETS = [
  "24/7 emergency response — no voicemail",
  "Storm damage assessment and removal",
  "Trees on roofs, fences, and driveways",
  "Hanging and partially fallen limbs",
  "Post-storm hazard mitigation",
  "Insurance documentation available",
  "Full cleanup included",
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EmergencyTreeServicePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services/emergency.jpg"
            alt="Storm damaged tree fallen on residential roof"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 py-20 text-center" size="md">
          <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
            Emergency Tree Service
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-3 text-balance">
            24/7 Response — We&apos;re Always On Call
          </h1>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Storms don&apos;t wait for business hours. When a tree comes down on
            your property, Gordon Pro responds fast — any time, day or night.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 font-heading font-semibold uppercase tracking-wider rounded transition-all duration-200 px-8 py-4 text-lg bg-accent text-white border-2 border-accent hover:bg-accent-dark hover:border-accent-dark"
            >
              Call Now — {PHONE_NUMBER}
            </a>
            <Button variant="ghost" href="/contact" size="lg">
              Request Service Online
            </Button>
          </div>
        </Container>
      </section>

      {/* ─── Intro + Feature Cards ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <FadeIn>
              <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
                We Answer When It Counts
              </p>
              <div className="space-y-4 text-neutral-mid leading-relaxed">
                <p>
                  When a storm rolls through North Georgia and a tree comes down
                  on your roof, your driveway, or your fence — you need a crew
                  that can be there fast. Gordon Pro Tree Service offers 24-hour
                  emergency tree removal, 7 days a week.
                </p>
                <p>
                  We respond to storm damage, fallen trees, hanging limbs, and
                  any situation where a tree poses an immediate threat to your
                  property or family&apos;s safety. Our team arrives with the
                  right equipment to secure the scene and get the tree removed
                  quickly and safely.
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

      {/* ─── When to Call ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F2ED" }}>
        <Container>
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark text-center leading-tight mb-10 text-balance">
              When to Call for Emergency Tree Service
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {SITUATIONS.map(({ title, desc }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div className="bg-white rounded-xl p-6 border-l-4 border-accent h-full">
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

      {/* ─── Prominent Call Box ───────────────────────────────────────────── */}
      <section className="py-16 bg-primary text-center">
        <Container size="sm">
          <FadeIn>
            <Phone
              className="w-12 h-12 text-accent mx-auto mb-5"
              aria-hidden="true"
            />
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-white mb-4">
              Emergency? Call Now.
            </h2>
            <a
              href={PHONE_HREF}
              className="font-heading text-4xl md:text-5xl font-bold text-accent hover:text-accent-dark transition-colors duration-200 block mb-4"
            >
              {PHONE_NUMBER}
            </a>
            <p className="font-body text-white/80 text-lg">
              Available 24 hours, 7 days a week
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <CTABanner
        headline="Tree Emergency in North Georgia?"
        subheadline="Don't wait. Call us now — we're available 24 hours a day."
        variant="green"
        quoteText="Request Service Online"
      />
    </>
  );
}
