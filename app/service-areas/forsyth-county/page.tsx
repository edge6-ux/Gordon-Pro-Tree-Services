import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import CountyPageTemplate from "@/components/templates/CountyPageTemplate";

export const metadata: Metadata = generatePageMetadata({
  title: "Tree Service in Forsyth County, GA",
  description:
    "Gordon Pro Tree Service serves Forsyth County homeowners with professional tree removal, trimming, and emergency response. Certified arborists serving Cumming, Suwanee, Sugar Hill, and surrounding areas.",
  path: "/service-areas/forsyth-county",
});

export default function ForsythCountyPage() {
  return (
    <CountyPageTemplate
      countyName="Forsyth County"
      stateName="Georgia"
      heroTagline="Tree Service for Forsyth County Homeowners"
      intro="Forsyth County's rapid growth means more homes, more trees near structures, and more homeowners who need a tree service they can trust. Gordon Pro brings certified arborists and the right equipment to every Forsyth County job — from Cumming subdivisions to larger rural properties near the lake."
      cities={[
        "Cumming",
        "Suwanee",
        "Sugar Hill",
        "Gainesville",
        "Ball Ground",
        "Canton",
      ]}
      services={[
        "Tree Removal",
        "Tree Trimming & Pruning",
        "Stump Removal",
        "Emergency Tree Service",
        "Land Clearing & Grading",
      ]}
      metaTitle="Tree Service in Forsyth County, GA"
      metaDescription="Gordon Pro Tree Service serves Forsyth County homeowners with professional tree removal, trimming, and emergency response. Certified arborists serving Cumming, Suwanee, Sugar Hill, and surrounding areas."
    />
  );
}
