import type { ReactNode } from "react";

type CardVariant = "default" | "elevated" | "bordered";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: "bg-white rounded-lg",
  elevated: "bg-white rounded-lg shadow-md",
  bordered: "bg-white rounded-lg border border-neutral-200",
};

export default function Card({
  children,
  className = "",
  variant = "default",
}: CardProps) {
  return (
    <div className={`${VARIANT_CLASSES[variant]} ${className}`}>
      {children}
    </div>
  );
}
