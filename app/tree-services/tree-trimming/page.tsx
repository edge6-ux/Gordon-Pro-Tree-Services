import type { Metadata } from "next";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Tree Trimming & Pruning",
  description:
    "Expert tree trimming and pruning in North Georgia. Certified arborists on every job. Crown thinning, shaping, and deadwood removal. Free estimates.",
  path: "/tree-services/tree-trimming",
});

export default function TreeTrimmingPage() {
  return (
    <ServicePageTemplate
      title="Tree Trimming & Pruning"
      subtitle="Healthier Trees, Cleaner Property"
      heroImage="/images/services/tree-trimming.jpg"
      heroAlt="Certified arborist trimming a tree in North Georgia"
      intro="Regular trimming isn't just cosmetic — it's essential for tree health, property safety, and keeping your home protected from overhanging limbs. Our certified arborists know exactly what to cut and what to leave."
      bullets={[
        "Certified arborists on every trimming job",
        "Crown thinning, shaping, and deadwood removal",
        "Reduces storm damage risk significantly",
        "Improves sunlight and airflow through the canopy",
        "Residential and commercial properties",
      ]}
      ctaText="Get a Free Quote"
    />
  );
}
