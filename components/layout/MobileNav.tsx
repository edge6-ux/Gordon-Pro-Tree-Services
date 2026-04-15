"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_ITEMS, type NavItem } from "@/lib/navigation";
import { Button } from "@/components/ui";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileNavItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDropdown = item.dropdown && item.dropdown.length > 0;

  if (hasDropdown) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          className="w-full flex items-center justify-between py-3.5 px-5 font-heading text-sm uppercase tracking-wider text-white hover:bg-primary-light transition-colors"
        >
          {item.label}
          <svg
            className={`w-4 h-4 text-accent transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isExpanded && (
          <div className="bg-primary-light border-t border-primary/30">
            {item.dropdown!.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                onClick={onClose}
                className="block py-3 pl-9 pr-5 text-sm text-neutral-light hover:text-accent transition-colors"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="block py-3.5 px-5 font-heading text-sm uppercase tracking-wider text-white hover:bg-primary-light hover:text-accent transition-colors"
    >
      {item.label}
    </Link>
  );
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[90vw] bg-primary flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-primary-light shrink-0">
          <Link href="/" onClick={onClose} className="flex flex-col">
            <span className="font-heading font-bold text-white uppercase text-xl leading-none tracking-wider">
              Gordon Pro
            </span>
            <span className="font-heading text-accent uppercase text-xs tracking-widest leading-tight mt-0.5">
              Tree Service
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="text-white p-2 -mr-2 hover:text-accent transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Nav items — scrollable */}
        <nav className="flex-1 overflow-y-auto py-2" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <MobileNavItem key={item.href} item={item} onClose={onClose} />
          ))}
        </nav>

        {/* Bottom CTA strip */}
        <div className="shrink-0 p-4 border-t border-primary-light space-y-3">
          <Button variant="primary" href="/contact#quote" className="w-full">
            Get Free Quote
          </Button>
          <Button variant="ghost" asPhone className="w-full" />
        </div>
      </div>
    </>
  );
}
