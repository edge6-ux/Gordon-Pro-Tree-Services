import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import CountyPageTemplate from "@/components/templates/CountyPageTemplate";

export const metadata: Metadata = generatePageMetadata({
  title: "Tree Service in Jackson County, GA",
  description:
    "Gordon Pro Tree Service serves all of Jackson County — Jefferson, Commerce, Hoschton, and surrounding areas. Professional tree removal, trimming, and emergency response from a licensed, insured crew.",
  path: "/service-areas/jackson-county",
});

export default function JacksonCountyPage() {
  return (
    <CountyPageTemplate
      countyName="Jackson County"
      stateName="Georgia"
      heroTagline="Jackson County's Professional Tree Service Team"
      intro="From Jefferson to Commerce, Gordon Pro Tree Service serves all of Jackson County with the same professional, licensed crew. We're familiar with the large hardwoods and pines that dominate North Georgia properties and we have the equipment to handle them safely."
      cities={[
        "Jefferson",
        "Commerce",
        "Braselton",
        "Hoschton",
        "Pendergrass",
        "Nicholson",
        "Arcade",
      ]}
      services={[
        "Tree Removal",
        "Tree Trimming & Pruning",
        "Stump Removal",
        "Emergency Tree Service",
        "Land Clearing & Grading",
      ]}
      metaTitle="Tree Service in Jackson County, GA"
      metaDescription="Gordon Pro Tree Service serves all of Jackson County — Jefferson, Commerce, Hoschton, and surrounding areas. Professional tree removal, trimming, and emergency response from a licensed, insured crew."
    />
  );
}
