import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import CountyPageTemplate from "@/components/templates/CountyPageTemplate";

export const metadata: Metadata = generatePageMetadata({
  title: "Tree Service in North Fulton County, GA",
  description:
    "Professional tree removal, trimming, and emergency service for North Fulton County — Alpharetta, Roswell, Milton, Johns Creek, and surrounding areas. Certified arborists with the right equipment for any job.",
  path: "/service-areas/north-fulton-county",
});

export default function NorthFultonCountyPage() {
  return (
    <CountyPageTemplate
      countyName="North Fulton County"
      stateName="Georgia"
      heroTagline="Tree Service for North Fulton County Properties"
      intro="North Fulton County homeowners trust Gordon Pro Tree Service for safe, professional tree care. From Alpharetta to Roswell, we bring certified arborists and proper equipment to every job — including our lift machine for those hard-to-reach trees near homes and structures."
      cities={[
        "Alpharetta",
        "Roswell",
        "Milton",
        "Johns Creek",
        "Sandy Springs",
        "Mountain Park",
      ]}
      services={[
        "Tree Removal",
        "Tree Trimming & Pruning",
        "Stump Removal",
        "Emergency Tree Service",
        "Land Clearing",
        "Tree Planting",
      ]}
      metaTitle="Tree Service in North Fulton County, GA"
      metaDescription="Professional tree removal, trimming, and emergency service for North Fulton County — Alpharetta, Roswell, Milton, Johns Creek, and surrounding areas. Certified arborists with the right equipment for any job."
    />
  );
}
