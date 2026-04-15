import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import GalleryClient from "./GalleryClient";

// ─── Page metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = generatePageMetadata({
  title: "Gallery",
  description:
    "Real photos from Gordon Pro Tree Service jobs across North Georgia. Tree removal, trimming, land clearing, equipment and results.",
  path: "/gallery",
});

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  return <GalleryClient />;
}
