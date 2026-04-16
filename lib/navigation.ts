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
    href: "/tree-services",
    dropdown: [
      { label: "Tree Removal", href: "/tree-services/tree-removal" },
      { label: "Tree Trimming & Pruning", href: "/tree-services/tree-trimming" },
      { label: "Stump Removal", href: "/tree-services/stump-removal" },
      { label: "Emergency Tree Service", href: "/tree-services/emergency-tree-service" },
      { label: "Tree Planting", href: "/tree-services/tree-planting" },
      { label: "Land Clearing", href: "/tree-services/land-clearing" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Gallery", href: "/gallery" },
  {
    label: "Areas We Serve",
    href: "/service-areas",
    dropdown: [
      { label: "Hall County", href: "/service-areas/hall-county" },
      { label: "Gwinnett County", href: "/service-areas/gwinnett-county" },
      { label: "Forsyth County", href: "/service-areas/forsyth-county" },
      { label: "Barrow County", href: "/service-areas/barrow-county" },
      { label: "Jackson County", href: "/service-areas/jackson-county" },
      { label: "North Fulton County", href: "/service-areas/north-fulton-county" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
