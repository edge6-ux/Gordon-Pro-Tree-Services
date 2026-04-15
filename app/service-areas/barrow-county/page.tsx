import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import CountyPageTemplate from "@/components/templates/CountyPageTemplate";

export const metadata: Metadata = generatePageMetadata({
  title: "Tree Service in Barrow County, GA",
  description:
    "Licensed and insured tree service across Barrow County — Winder, Bethlehem, Auburn, and surrounding communities. Gordon Pro Tree Service responds fast and gets the job done right.",
  path: "/service-areas/barrow-county",
});

export default function BarrowCountyPage() {
  return (
    <CountyPageTemplate
      countyName="Barrow County"
      stateName="Georgia"
      heroTagline="Barrow County Tree Service — Licensed & Local"
      intro="Gordon Pro Tree Service covers all of Barrow County, bringing professional tree care to Winder, Bethlehem, and the growing communities in between. Whether it's a single hazardous tree or a full lot clearing job, we respond fast and get it done right."
      cities={[
        "Winder",
        "Bethlehem",
        "Auburn",
        "Statham",
        "Carl",
        "Braselton",
      ]}
      services={[
        "Tree Removal",
        "Tree Trimming & Pruning",
        "Stump Removal",
        "Emergency Tree Service",
        "Land Clearing",
      ]}
      metaTitle="Tree Service in Barrow County, GA"
      metaDescription="Licensed and insured tree service across Barrow County — Winder, Bethlehem, Auburn, and surrounding communities. Gordon Pro Tree Service responds fast and gets the job done right."
    />
  );
}
