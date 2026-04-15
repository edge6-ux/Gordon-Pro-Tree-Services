import type { Metadata } from "next";

const SITE_NAME = "Gordon Pro Tree Service";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gordonprotree.com";
const DEFAULT_DESCRIPTION =
  "Professional tree removal, trimming, stump grinding, and emergency tree services in Gainesville, GA and North Georgia. Licensed, insured, and locally trusted. Free estimates.";
const DEFAULT_OG_IMAGE = "/images/hero/gptsgreen.png";

// ─── Default metadata (used in root layout) ─────────────────────────────────

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} | North Georgia`,
    template: `%s | ${SITE_NAME} | North Georgia`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | North Georgia`,
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | North Georgia`,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

// ─── Per-page metadata helper ────────────────────────────────────────────────

interface PageMetadataOptions {
  /** Page title — will be formatted as "[title] | Gordon Pro Tree Service | North Georgia" */
  title: string;
  description?: string;
  /** Relative path, e.g. "/services/tree-removal" */
  path?: string;
  /** Relative path to OG image, e.g. "/images/og-tree-removal.jpg" */
  ogImage?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonical = `${BASE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME} | North Georgia`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
