import type { ReactNode } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
}

const SIZE_CLASSES: Record<ContainerSize, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export default function Container({
  children,
  className = "",
  size = "xl",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 ${SIZE_CLASSES[size]} ${className}`}
    >
      {children}
    </div>
  );
}
