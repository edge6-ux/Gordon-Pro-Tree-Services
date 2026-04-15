import type { Metadata } from "next";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Emergency Tree Service",
  description:
    "24/7 emergency tree service in North Georgia. Storm damage response, hazard removal, and insurance assistance. Call (770) 271-6072 any time.",
  path: "/tree-services/emergency-tree-service",
});

export default function EmergencyTreeServicePage() {
  return (
    <ServicePageTemplate
      title="Emergency Tree Service"
      subtitle="24/7 Response — We're Always On Call"
      heroImage="/images/services/emergency.jpg"
      heroAlt="Emergency tree removal after storm damage in North Georgia"
      intro="Storms don't wait for business hours and neither do we. When a tree comes down on your roof, blocks your driveway, or threatens your family's safety, Gordon Pro responds fast — any time, day or night."
      bullets={[
        "24-hour emergency response, 7 days a week",
        "Storm damage assessment and removal",
        "Works with your insurance company",
        "Hazard mitigation to secure your property",
        "Same trusted crew, any hour",
      ]}
      ctaText="Call Now — We Answer 24/7"
    />
  );
}
