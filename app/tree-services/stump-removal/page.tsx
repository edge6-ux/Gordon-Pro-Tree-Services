import type { Metadata } from "next";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Stump Removal",
  description:
    "Complete stump grinding in North Georgia. We grind stumps below grade so your yard is clean, safe, and ready to use. Free estimates.",
  path: "/tree-services/stump-removal",
});

export default function StumpRemovalPage() {
  return (
    <ServicePageTemplate
      title="Stump Removal"
      subtitle="Complete Grinding, Clean Results"
      heroImage="/images/services/stump-removal.jpg"
      heroAlt="Stump grinding equipment removing a tree stump in North Georgia"
      intro="Leftover stumps are more than an eyesore — they're a tripping hazard, a pest magnet, and they take up valuable yard space. We grind stumps completely below grade so your yard is clean, safe, and ready to use."
      bullets={[
        "Ground below grade — no more tripping hazard",
        "Eliminates pest and fungal harborage",
        "Reclaim your yard space immediately",
        "Works on stumps of any size",
        "Debris cleaned up and hauled away",
      ]}
      ctaText="Get a Free Quote"
    />
  );
}
