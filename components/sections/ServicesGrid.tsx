import Image from "next/image";
import Link from "next/link";
import {
  TreePine,
  Scissors,
  Circle,
  Tractor,
  AlertTriangle,
  Sprout,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui";
import FadeIn from "@/components/ui/FadeIn";

// ─── Types & data ─────────────────────────────────────────────────────────────

interface ServiceItem {
  title: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  description: string;
  href: string;
}

const SERVICES: ServiceItem[] = [
  {
    title: "Tree Removal",
    image: "/images/services/tree-removal.jpg",
    imageAlt: "Professional tree removal service in North Georgia",
    icon: TreePine,
    description: "Safe, efficient removal of hazardous or unwanted trees of any size.",
    href: "/tree-services/tree-removal",
  },
  {
    title: "Tree Trimming",
    image: "/images/services/tree-trimming.jpg",
    imageAlt: "Tree trimming and pruning service in North Georgia",
    icon: Scissors,
    description: "Shape, thin and prune for healthier trees and a cleaner property.",
    href: "/tree-services/tree-trimming",
  },
  {
    title: "Stump Removal",
    image: "/images/services/stump-removal.jpg",
    imageAlt: "Stump grinding and removal service in North Georgia",
    icon: Circle,
    description: "Complete stump grinding so your yard is clean and hazard-free.",
    href: "/tree-services/stump-removal",
  },
  {
    title: "Land Clearing",
    image: "/images/services/land-clearing.jpg",
    imageAlt: "Land clearing and grading in North Georgia",
    icon: Tractor,
    description: "Full-scale clearing and grading for new builds and open land.",
    href: "/tree-services/land-clearing",
  },
  {
    title: "Emergency Service",
    image: "/images/services/emergency.jpg",
    imageAlt: "24/7 emergency tree service in North Georgia",
    icon: AlertTriangle,
    description: "Storm damage? We respond fast — 24 hours a day, 7 days a week.",
    href: "/tree-services/emergency-tree-service",
  },
  {
    title: "Tree Planting",
    image: "/images/services/tree-planting.avif",
    imageAlt: "Expert tree planting service in North Georgia",
    icon: Sprout,
    description:
      "Expert species selection and planting for the right tree in the right place.",
    href: "/tree-services/tree-planting",
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function ServiceCard({ item, delay }: { item: ServiceItem; delay: number }) {
  const Icon = item.icon;

  return (
    <FadeIn delay={delay} className="h-full">
      <article className="h-full flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
        {/* 16:9 image */}
        <div className="relative aspect-video overflow-hidden shrink-0">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Gold accent bar */}
        <div className="h-[3px] bg-accent w-full shrink-0" />

        {/* Card body */}
        <div className="p-6 flex flex-col flex-1">
          {/* Icon + name */}
          <div className="flex items-center gap-2.5 mb-3">
            <Icon className="w-5 h-5 text-accent shrink-0" />
            <h3 className="font-heading text-lg font-bold uppercase text-primary leading-tight">
              {item.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-neutral-mid text-sm leading-relaxed flex-1 mb-5">
            {item.description}
          </p>

          {/* Arrow link */}
          <Link
            href={item.href}
            className="inline-flex items-center gap-1 font-heading text-sm uppercase tracking-wider text-neutral-mid font-semibold group-hover:text-accent transition-colors duration-200"
            aria-label={`Learn more about ${item.title}`}
          >
            Learn More
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </article>
    </FadeIn>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ServicesGrid() {
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
          {SERVICES.map((item, i) => (
            <ServiceCard key={item.href} item={item} delay={i * 80} />
          ))}
        </div>
      </Container>
    </section>
  );
}
