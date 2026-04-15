import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import CountyPageTemplate from "@/components/templates/CountyPageTemplate";

export const metadata: Metadata = generatePageMetadata({
  title: "Tree Service in Hall County, GA",
  description:
    "Gordon Pro Tree Service is based in Hall County — licensed, insured, and ready for tree removal, trimming, stump grinding, and emergency service across Gainesville, Flowery Branch, Oakwood, and beyond.",
  path: "/service-areas/hall-county",
});

export default function HallCountyPage() {
  return (
    <CountyPageTemplate
      countyName="Hall County"
      stateName="Georgia"
      heroTagline="Hall County's Trusted Tree Service"
      intro="Gordon Pro Tree Service is based right here in Hall County — Lula, GA to be exact. When you call us, you're getting a local crew that knows the terrain, the tree species, and the neighborhoods. From Gainesville to Oakwood, we've worked on properties all across the county and we treat every job like it's in our own backyard — because it is."
      cities={[
        "Gainesville",
        "Flowery Branch",
        "Oakwood",
        "Buford",
        "Lula",
        "Clermont",
        "Gillsville",
        "Murrayville",
      ]}
      services={[
        "Tree Removal",
        "Tree Trimming & Pruning",
        "Stump Removal",
        "Land Clearing & Grading",
        "Emergency Tree Service",
        "Tree Planting",
      ]}
      metaTitle="Tree Service in Hall County, GA"
      metaDescription="Gordon Pro Tree Service is based in Hall County — licensed, insured, and ready for tree removal, trimming, stump grinding, and emergency service across Gainesville, Flowery Branch, Oakwood, and beyond."
    />
  );
}
