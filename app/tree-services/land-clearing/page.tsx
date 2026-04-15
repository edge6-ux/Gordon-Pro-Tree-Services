import type { Metadata } from "next";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Land Clearing & Grading",
  description:
    "Full land clearing and grading in North Georgia. Residential and commercial lot clearing, brush removal, and site prep. Free estimates.",
  path: "/tree-services/land-clearing",
});

export default function LandClearingPage() {
  return (
    <ServicePageTemplate
      title="Land Clearing & Grading"
      subtitle="From Overgrown to Open in One Call"
      heroImage="/images/services/land-clearing.jpg"
      heroAlt="Land clearing equipment working on a North Georgia property"
      intro="From residential lots to large-scale commercial sites, Gordon Pro handles full land clearing, brush removal, and grading. We bring the equipment and the expertise to turn raw land into a clean, level site ready for your next project."
      bullets={[
        "Full lot clearing for new construction",
        "Brush and undergrowth removal",
        "Grading and site prep services",
        "Large equipment for large-scale jobs",
        "North Georgia's terrain specialists",
      ]}
      ctaText="Get a Free Quote"
    />
  );
}
