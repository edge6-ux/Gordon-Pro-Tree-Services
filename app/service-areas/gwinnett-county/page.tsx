import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import CountyPageTemplate from "@/components/templates/CountyPageTemplate";

export const metadata: Metadata = generatePageMetadata({
  title: "Tree Service in Gwinnett County, GA",
  description:
    "Professional tree removal, trimming, and emergency service across Gwinnett County — Lawrenceville, Suwanee, Duluth, Norcross, and surrounding areas. Licensed, insured, and locally trusted.",
  path: "/service-areas/gwinnett-county",
});

export default function GwinnettCountyPage() {
  return (
    <CountyPageTemplate
      countyName="Gwinnett County"
      stateName="Georgia"
      heroTagline="Professional Tree Service Across Gwinnett County"
      intro="From Lawrenceville to Suwanee, Gordon Pro Tree Service brings the same licensed, insured, certified crew to every Gwinnett County property. We know the mature tree canopy that defines neighborhoods like Peachtree Corners and Johns Creek — and we know how to work safely around homes, fences, and tight residential lots."
      cities={[
        "Lawrenceville",
        "Suwanee",
        "Duluth",
        "Norcross",
        "Snellville",
        "Lilburn",
        "Buford",
        "Peachtree Corners",
        "Sugar Hill",
      ]}
      services={[
        "Tree Removal",
        "Tree Trimming & Pruning",
        "Stump Removal",
        "Emergency Tree Service",
        "Land Clearing",
        "Tree Planting",
      ]}
      metaTitle="Tree Service in Gwinnett County, GA"
      metaDescription="Professional tree removal, trimming, and emergency service across Gwinnett County — Lawrenceville, Suwanee, Duluth, Norcross, and surrounding areas. Licensed, insured, and locally trusted."
    />
  );
}
