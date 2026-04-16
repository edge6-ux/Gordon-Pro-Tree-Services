import type { Metadata } from "next";
import HeroSection from "@/components/sections/home/HeroSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Reviews from "@/components/sections/Reviews";
import ServiceAreas from "@/components/sections/ServiceAreas";
import { CTABanner } from "@/components/sections";

// ─── Page metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    // Bypass the layout template for the homepage
    absolute: "Gordon Pro Tree Service | Expert Tree Care in North Georgia",
  },
  description:
    "Professional tree removal, trimming, stump grinding & emergency tree services in Gainesville, GA. Licensed, insured &amp; locally trusted. Free estimates. Call (770) 271-6072.",
  openGraph: {
    title: "Gordon Pro Tree Service | Expert Tree Care in North Georgia",
    description:
      "Professional tree removal, trimming, stump grinding & emergency tree services in Gainesville, GA. Licensed, insured &amp; locally trusted. Free estimates.",
    url: "https://gordonprotree.com",
    images: [{ url: "/images/hero/newhero.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero/newhero.webp"],
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <HeroSection />

      {/* 2 — Services grid */}
      <ServicesGrid />

      {/* 3 — Why choose us */}
      <WhyChooseUs />

      {/* 4 — Customer reviews */}
      <Reviews />

      {/* 5 — Service areas */}
      <ServiceAreas />

      {/* 6 — Final CTA banner */}
      <CTABanner
        headline="Ready to Get Started?"
        subheadline="Free estimates. Fast response. No pressure."
        variant="gold"
        quoteText="Request a Free Quote"
      />
    </>
  );
}
