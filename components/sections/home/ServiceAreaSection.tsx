import Link from "next/link";
import { Container } from "@/components/ui";
import FadeIn from "@/components/ui/FadeIn";

const COUNTIES = [
  { label: "Hall County", href: "/areas/hall-county" },
  { label: "Gwinnett County", href: "/areas/gwinnett-county" },
  { label: "Forsyth County", href: "/areas/forsyth-county" },
  { label: "Barrow County", href: "/areas/barrow-county" },
  { label: "Jackson County", href: "/areas/jackson-county" },
  { label: "North Fulton County", href: "/areas/north-fulton-county" },
] as const;

export default function ServiceAreaSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            {/* Section label */}
            <p className="font-heading text-sm uppercase tracking-widest text-accent mb-3">
              Where We Work
            </p>

            {/* Headline */}
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark mb-5">
              Proudly Serving North Georgia
            </h2>

            {/* Body */}
            <p className="text-neutral-mid leading-relaxed mb-10 max-w-xl mx-auto">
              From Gainesville to Lawrenceville, we cover Hall, Gwinnett,
              Forsyth, Barrow, Jackson, and North Fulton counties — and
              everywhere in between.
            </p>

            {/* County pills */}
            <div className="flex flex-wrap justify-center gap-3" role="list" aria-label="Service counties">
              {COUNTIES.map((county, i) => (
                <FadeIn key={county.href} delay={i * 60}>
                  <Link
                    href={county.href}
                    role="listitem"
                    className="inline-block px-5 py-2.5 rounded-full bg-primary text-white text-sm font-heading font-medium uppercase tracking-wide hover:bg-accent hover:text-white transition-colors duration-200"
                  >
                    {county.label}
                  </Link>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
