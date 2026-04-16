import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container, Button, FadeIn } from "@/components/ui";
import { CTABanner } from "@/components/sections";
import { generatePageMetadata } from "@/lib/metadata";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Service Areas in North Georgia | Gordon Pro Tree Service",
  description:
    "Gordon Pro Tree Service serves Hall, Gwinnett, Forsyth, Barrow, Jackson, and North Fulton counties. Local crews, fast response, free estimates.",
  path: "/service-areas",
});

const COUNTIES = [
  {
    name: "Hall County",
    cities: "Gainesville, Flowery Branch, Oakwood, Lula, Buford",
    href: "/service-areas/hall-county",
  },
  {
    name: "Gwinnett County",
    cities: "Lawrenceville, Duluth, Suwanee, Buford, Sugar Hill",
    href: "/service-areas/gwinnett-county",
  },
  {
    name: "Forsyth County",
    cities: "Cumming, Suwanee, Johns Creek, Alpharetta, Ball Ground",
    href: "/service-areas/forsyth-county",
  },
  {
    name: "Barrow County",
    cities: "Winder, Auburn, Statham, Bethlehem, Carl",
    href: "/service-areas/barrow-county",
  },
  {
    name: "Jackson County",
    cities: "Jefferson, Commerce, Braselton, Hoschton, Pendergrass",
    href: "/service-areas/jackson-county",
  },
  {
    name: "North Fulton County",
    cities: "Alpharetta, Roswell, Milton, Johns Creek, Sandy Springs",
    href: "/service-areas/north-fulton-county",
  },
] as const;

export default function ServiceAreasPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-primary py-20 md:py-28">
        <Container size="md">
          <FadeIn className="text-center">
            <p className="font-heading text-sm uppercase tracking-widest text-accent mb-4">
              Where We Work
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white leading-tight mb-4 text-balance">
              Serving North Georgia
            </h1>
            <p className="font-body text-white/80 text-lg max-w-xl mx-auto leading-relaxed mb-8">
              Based in Lula, GA, Gordon Pro serves homeowners and businesses
              across six counties in North Georgia. Local crews, fast response,
              and no long-distance fees.
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
          </FadeIn>
        </Container>
      </section>

      {/* ─── County Cards ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark text-center leading-tight mb-10 text-balance">
              Counties We Serve
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COUNTIES.map(({ name, cities, href }, i) => (
              <FadeIn key={name} delay={i * 80}>
                <Link
                  href={href}
                  className="group block bg-neutral-light rounded-xl p-6 h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
                    <h3 className="font-heading font-bold text-base uppercase tracking-wide text-primary group-hover:text-accent transition-colors">
                      {name}
                    </h3>
                  </div>
                  <p className="text-neutral-mid text-sm leading-relaxed">
                    {cities}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <CTABanner
        headline="Don't See Your Area?"
        subheadline="Give us a call — we may still be able to serve you. Free estimates available."
        variant="green"
        quoteText="Get a Free Quote"
      />
    </>
  );
}
