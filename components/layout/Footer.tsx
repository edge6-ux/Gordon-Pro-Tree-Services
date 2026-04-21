import Link from "next/link";
import { Container } from "@/components/ui";
import {
  PHONE_NUMBER,
  PHONE_HREF,
  EMAIL,
  ADDRESS_LINE1,
  ADDRESS_LINE2,
  HOURS_WEEKDAY,
  HOURS_EMERGENCY,
} from "@/lib/constants";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
  { label: "Get an Assessment", href: "https://project-q9cfi.vercel.app/submit" },
];

const SERVICE_LINKS = [
  { label: "Tree Removal", href: "/tree-services/tree-removal" },
  { label: "Tree Trimming & Pruning", href: "/tree-services/tree-trimming" },
  { label: "Stump Removal", href: "/tree-services/stump-removal" },
  { label: "Emergency Tree Service", href: "/tree-services/emergency-tree-service" },
  { label: "Tree Planting", href: "/tree-services/tree-planting" },
  { label: "Land Clearing", href: "/tree-services/land-clearing" },
];

const PAYMENT_METHODS = [
  "Visa",
  "Mastercard",
  "Amex",
  "Discover",
  "Cash",
  "Check",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* ─── Main columns ─────────────────────────────────────────────── */}
      <div className="py-14 md:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="font-heading text-base font-semibold uppercase tracking-widest text-accent mb-5">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-light text-sm hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-heading text-base font-semibold uppercase tracking-widest text-accent mb-5">
                Our Services
              </h3>
              <ul className="space-y-2.5">
                {SERVICE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-light text-sm hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-heading text-base font-semibold uppercase tracking-widest text-accent mb-5">
                Contact Us
              </h3>
              <address className="not-italic space-y-3 text-sm text-neutral-light">
                <p className="leading-relaxed">
                  {ADDRESS_LINE1}
                  <br />
                  {ADDRESS_LINE2}
                </p>
                <p>
                  <a
                    href={PHONE_HREF}
                    className="font-medium hover:text-accent transition-colors duration-200"
                  >
                    {PHONE_NUMBER}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="break-all hover:text-accent transition-colors duration-200"
                  >
                    {EMAIL}
                  </a>
                </p>

                <div className="pt-1 space-y-1 border-t border-primary-light">
                  <p className="font-heading text-xs uppercase tracking-widest text-white/70 pt-2">
                    Hours
                  </p>
                  <p>{HOURS_WEEKDAY}</p>
                  <p className="text-accent font-semibold">{HOURS_EMERGENCY}</p>
                </div>
              </address>
            </div>
          </div>
        </Container>
      </div>

      {/* ─── Bottom bar ───────────────────────────────────────────────── */}
      <div className="border-t border-primary-light">
        <Container>
          <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Payment method badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-neutral-light/60 mr-1">
                We Accept:
              </span>
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method}
                  className="inline-block bg-white/10 border border-white/20 text-neutral-light text-xs px-2.5 py-1 rounded"
                >
                  {method}
                </span>
              ))}
            </div>

            {/* Copyright */}
            <div className="flex flex-col items-center md:items-end gap-1.5 text-center md:text-right">
              <p className="text-xs text-neutral-light/40">
                &copy; {year} Gordon Pro Tree Service. All rights reserved.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
