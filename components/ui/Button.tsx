import Link from "next/link";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render as a Next.js Link */
  href?: string;
  /** Render as a tel: anchor with the business phone number */
  asPhone?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white border-2 border-accent hover:bg-accent-dark hover:border-accent-dark",
  secondary:
    "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white",
  ghost:
    "bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 font-heading font-semibold uppercase tracking-wider rounded transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

export default function Button({
  variant = "primary",
  size = "md",
  href,
  asPhone = false,
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if (asPhone) {
    return (
      <a href={PHONE_HREF} className={classes}>
        Call {PHONE_NUMBER}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
