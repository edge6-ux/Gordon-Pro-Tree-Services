import Link from "next/link";
import { Container } from "@/components/ui";
import FadeIn from "@/components/ui/FadeIn";
import type { ReactNode } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function TreeRemovalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Layered pine tree silhouette + trunk */}
      <path d="M12 2L7 10H10.5L7 17H11V22H13V17H17L13 10H16.5L12 2Z" />
      <line x1="4" y1="22" x2="20" y2="22" />
    </svg>
  );
}

function TrimmingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}

function StumpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Stump body */}
      <rect x="7" y="12" width="10" height="6" rx="1" />
      {/* Tree top stub */}
      <line x1="12" y1="12" x2="12" y2="7" />
      <polyline points="9,9.5 12,6 15,9.5" />
      {/* Ground line */}
      <line x1="3" y1="22" x2="21" y2="22" />
      {/* Roots */}
      <path d="M9 18L7 22M15 18L17 22" />
    </svg>
  );
}

function LandClearingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Landscape / terrain profile representing cleared land */}
      <path d="M2 21H22" />
      <path d="M2 21L6 14L10 18L15 9L19 15L22 12" />
    </svg>
  );
}

function EmergencyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Shield */}
      <path d="M12 2L4 6.5V12C4 16.5 7.6 20.47 12 22C16.4 20.47 20 16.5 20 12V6.5L12 2Z" />
      {/* Lightning bolt */}
      <polyline points="13,8.5 10,13.5 14,13.5 11,18.5" />
    </svg>
  );
}

function PlantingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Stem */}
      <line x1="12" y1="22" x2="12" y2="12" />
      {/* Leaf shape */}
      <path d="M12 12C12 12 8 9.5 8 6.5A4 4 0 0116 6.5C16 9.5 12 12 12 12Z" />
      {/* Small branch */}
      <path d="M12 17C12 17 9 15.5 7.5 17.5" />
      {/* Ground */}
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Service {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}

const SERVICES: Service[] = [
  {
    icon: <TreeRemovalIcon />,
    title: "Tree Removal",
    description: "Safe, efficient removal of hazardous or unwanted trees of any size.",
    href: "/tree-services/tree-removal",
  },
  {
    icon: <TrimmingIcon />,
    title: "Tree Trimming",
    description: "Shape, thin and prune for healthier trees and a cleaner property.",
    href: "/tree-services/tree-trimming",
  },
  {
    icon: <StumpIcon />,
    title: "Stump Removal",
    description: "Complete stump grinding so your yard is clean and hazard-free.",
    href: "/tree-services/stump-removal",
  },
  {
    icon: <LandClearingIcon />,
    title: "Land Clearing",
    description: "Full-scale clearing and grading for new builds and open land.",
    href: "/tree-services/land-clearing",
  },
  {
    icon: <EmergencyIcon />,
    title: "Emergency Service",
    description: "Storm damage? We respond fast — 24 hours a day, 7 days a week.",
    href: "/tree-services/emergency-tree-service",
  },
  {
    icon: <PlantingIcon />,
    title: "Tree Planting",
    description:
      "Expert species selection and planting to grow the right tree in the right place.",
    href: "/tree-services/tree-planting",
  },
];

// ─── Service card ─────────────────────────────────────────────────────────────

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <article className="h-full bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col">
        {/* Icon */}
        <div className="w-10 h-10 text-accent mb-5 transition-transform duration-300 group-hover:scale-110">
          {service.icon}
        </div>

        {/* Name */}
        <h3 className="font-heading text-lg font-bold uppercase text-primary mb-2">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-neutral-mid text-sm leading-relaxed flex-1 mb-5">
          {service.description}
        </p>

        {/* Arrow link */}
        <Link
          href={service.href}
          className="inline-flex items-center gap-1.5 font-heading text-sm uppercase tracking-wider text-accent font-semibold hover:gap-3 transition-all duration-200"
          aria-label={`Learn more about ${service.title}`}
        >
          Learn More
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </article>
    </FadeIn>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-neutral-light">
      <Container>
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <p className="font-heading text-sm uppercase tracking-widest text-accent mb-3">
              What We Do
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-neutral-dark">
              Expert Tree Services for Every Job
            </h2>
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.href} service={service} delay={i * 80} />
          ))}
        </div>
      </Container>
    </section>
  );
}
