export interface NavDropdownItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Tree Services",
    href: "/services",
    dropdown: [
      { label: "Tree Removal", href: "/services/tree-removal" },
      { label: "Tree Trimming & Pruning", href: "/services/tree-trimming" },
      { label: "Stump Grinding", href: "/services/stump-grinding" },
      { label: "Emergency Tree Service", href: "/services/emergency" },
      { label: "Tree Health & Care", href: "/services/tree-health" },
      { label: "Land Clearing", href: "/services/land-clearing" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Gallery", href: "/gallery" },
  {
    label: "Areas We Serve",
    href: "/areas",
    dropdown: [
      { label: "Gainesville, GA", href: "/areas/gainesville" },
      { label: "Lula, GA", href: "/areas/lula" },
      { label: "Braselton, GA", href: "/areas/braselton" },
      { label: "Dahlonega, GA", href: "/areas/dahlonega" },
      { label: "Dawsonville, GA", href: "/areas/dawsonville" },
      { label: "Cumming, GA", href: "/areas/cumming" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
