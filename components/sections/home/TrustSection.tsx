import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

const TRUST_POINTS = [
  "Certified Arborists on every job",
  "Low-impact removal — minimal damage to your yard",
  "Lift machine access for hard-to-reach trees",
  "Licensed, bonded & fully insured",
] as const;

function GoldCheck() {
  return (
    <svg
      className="w-5 h-5 text-accent shrink-0 mt-0.5"
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

export default function TrustSection() {
  return (
    <section className="overflow-hidden">
      <div className="md:flex">
        {/* ─── Left: full-bleed image ─────────────────────────────────── */}
        <div className="relative h-72 md:h-auto md:w-1/2 min-h-0 md:min-h-[600px] group overflow-hidden">
          <Image
            src="/images/hero/gpthero.jpg"
            alt="Gordon Pro Tree Service crew on the job"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle green tint on hover */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/25 transition-colors duration-500" />
        </div>

        {/* ─── Right: text content ────────────────────────────────────── */}
        <div className="md:w-1/2 bg-neutral-light flex items-center">
          <div className="px-6 sm:px-10 lg:px-16 xl:px-20 py-16 md:py-24 max-w-xl">
            <FadeIn>
              {/* Section label */}
              <p className="font-heading text-sm uppercase tracking-widest text-accent mb-3">
                Why Gordon Pro
              </p>

              {/* Headline */}
              <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark leading-tight mb-6 text-balance">
                Certified. Professional. Here When It Counts.
              </h2>

              {/* Body */}
              <p className="text-neutral-mid leading-relaxed mb-8">
                When you invite a crew onto your property, you need to know
                they&apos;ll show up on time, treat your home with respect, and
                get the job done right — the first time. At Gordon Pro Tree
                Service, that&apos;s not a promise, it&apos;s our standard.
              </p>

              {/* Trust bullet list */}
              <ul className="space-y-4 mb-10" aria-label="Why choose Gordon Pro">
                {TRUST_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <GoldCheck />
                    <span className="text-neutral-mid">{point}</span>
                  </li>
                ))}
              </ul>

              {/* CTA link */}
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-heading text-sm uppercase tracking-wider text-primary font-semibold border-b-2 border-accent pb-0.5 hover:text-accent transition-colors duration-200"
              >
                Learn more about our team
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
