import type { ReactNode } from "react";

type SectionBackground = "white" | "light" | "primary" | "dark";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: SectionBackground;
  /** Override the default py-16 md:py-24 spacing */
  noPadding?: boolean;
}

const BG_CLASSES: Record<SectionBackground, string> = {
  white: "bg-white",
  light: "bg-neutral-light",
  primary: "bg-primary",
  dark: "bg-neutral-dark",
};

export default function Section({
  children,
  className = "",
  id,
  background = "white",
  noPadding = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${BG_CLASSES[background]} ${noPadding ? "" : "py-16 md:py-24"} ${className}`}
    >
      {children}
    </section>
  );
}
