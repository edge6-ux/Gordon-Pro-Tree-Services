import type { Metadata } from "next";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Tree Removal",
  description:
    "Professional tree removal in Gainesville, GA and North Georgia. Licensed, insured, and fully equipped for trees of any size. Free estimates.",
  path: "/tree-services/tree-removal",
});

export default function TreeRemovalPage() {
  return (
    <ServicePageTemplate
      title="Tree Removal"
      subtitle="Safe, Efficient & Fully Insured"
      heroImage="/images/services/tree-removal.jpg"
      heroAlt="Gordon Pro Tree Service crew removing a large tree in North Georgia"
      intro="Whether it's a hazardous tree threatening your home or a cleared lot for a new build, Gordon Pro Tree Service handles removals of every size — safely, efficiently, and with minimal impact to your property."
      bullets={[
        "Licensed, bonded & fully insured on every job",
        "Lift machine access for hard-to-reach trees",
        "Low-impact removal — we protect your lawn and landscaping",
        "Full debris cleanup and haul-away included",
        "Free estimates — call or request online",
      ]}
      ctaText="Get a Free Quote"
    />
  );
}
