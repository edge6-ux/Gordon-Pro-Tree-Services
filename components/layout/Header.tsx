"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container, Button } from "@/components/ui";
import MobileNav from "./MobileNav";
import { NAV_ITEMS, type NavItem } from "@/lib/navigation";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";

// ─── Desktop dropdown ─────────────────────────────────────────────────────────

function DropdownMenu({
  items,
}: {
  items: NonNullable<NavItem["dropdown"]>;
}) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 min-w-[220px] z-50">
      <div className="bg-white rounded-lg shadow-xl border border-neutral-100 overflow-hidden py-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-5 py-3 text-sm font-body text-neutral-mid hover:bg-neutral-light hover:text-primary transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Desktop nav link ─────────────────────────────────────────────────────────

function DesktopNavLink({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) {
  const activeClass = isActive ? "text-accent" : "text-white hover:text-accent";

  if (item.dropdown?.length) {
    return (
      <div className="relative group">
        <Link
          href={item.href}
          className={`flex items-center gap-1 font-heading text-sm uppercase tracking-wider font-medium py-1 transition-colors ${activeClass}`}
        >
          {item.label}
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180"
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
        </Link>
        {/* Invisible bridge so mouse can reach dropdown without gap */}
        <div className="absolute top-full left-0 h-3 w-full hidden group-hover:block" />
        <div className="hidden group-hover:block">
          <DropdownMenu items={item.dropdown} />
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={`font-heading text-sm uppercase tracking-wider font-medium py-1 transition-colors ${activeClass}`}
    >
      {item.label}
    </Link>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ─── Top utility bar ──────────────────────────────────────────── */}
      <div className="hidden md:block bg-neutral-dark text-neutral-light/80 text-xs">
        <Container>
          <div className="flex items-center justify-between py-2">
            <span>
              {/* Weekday hours */}
              Mon–Fri 8am–5pm&ensp;|&ensp;
              <span className="text-accent font-medium">Emergency: 24/7</span>
            </span>
            <a
              href={PHONE_HREF}
              className="font-semibold text-accent hover:text-accent-dark transition-colors"
            >
              {PHONE_NUMBER}
            </a>
          </div>
        </Container>
      </div>

      {/* ─── Main header ──────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 bg-primary transition-all duration-300 ${
          isScrolled ? "shadow-lg bg-primary/95 backdrop-blur-sm" : ""
        }`}
      >
        <Container size="lg">
          <div className="flex items-center justify-between h-14 md:h-16 gap-6">
            {/* Logo emblem */}
            <Link href="/" className="shrink-0" aria-label="Gordon Pro Tree Service — Home">
              <Image
                src="/images/hero/gptslogo.png"
                alt="Gordon Pro Tree Service logo"
                width={48}
                height={48}
                className="h-10 md:h-11 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop navigation */}
            <nav
              className="hidden lg:flex items-center gap-5 xl:gap-6"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) => (
                <DesktopNavLink
                  key={item.href}
                  item={item}
                  isActive={
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href)
                  }
                />
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block shrink-0">
              <Button variant="primary" href="/contact#quote" size="sm">
                Free Quote
              </Button>
            </div>

            {/* Mobile: phone + hamburger */}
            <div className="flex items-center gap-3 lg:hidden">
              <a
                href={PHONE_HREF}
                aria-label={`Call us at ${PHONE_NUMBER}`}
                className="text-accent hover:text-accent-dark transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </a>
              <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isMobileOpen}
                aria-controls="mobile-nav"
                className="text-white p-1 -mr-1 hover:text-accent transition-colors"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile nav drawer */}
      <MobileNav isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
