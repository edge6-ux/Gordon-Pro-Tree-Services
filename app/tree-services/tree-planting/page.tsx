import type { Metadata } from "next";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Tree Planting",
  description:
    "Expert tree planting in North Georgia. Species selection for local climate, proper planting, and initial care guidance. Free consultation.",
  path: "/tree-services/tree-planting",
});

export default function TreePlantingPage() {
  return (
    <ServicePageTemplate
      title="Tree Planting"
      subtitle="The Right Tree in the Right Place"
      heroImage="/images/services/tree-planting.avif"
      heroAlt="Tree planting service in North Georgia"
      intro="Planting a tree is an investment in your property and your community. Our team helps you choose the right species for North Georgia's soil and climate, then plants it properly so it thrives for generations."
      bullets={[
        "Species selection for North Georgia climate",
        "Proper planting depth and root preparation",
        "Soil amendment and initial care guidance",
        "Residential and commercial planting",
        "Free consultation on species selection",
      ]}
      ctaText="Get a Free Consultation"
    />
  );
}
