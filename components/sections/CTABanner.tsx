import { Container, Button } from "@/components/ui";

interface CTABannerProps {
  headline?: string;
  subheadline?: string;
  /** "green" renders on primary background; "gold" renders on accent background */
  variant?: "green" | "gold";
  className?: string;
  /** Override the quote button label. Defaults to "Get Free Quote". */
  quoteText?: string;
}

export default function CTABanner({
  headline = "Ready to Get Started?",
  subheadline =
    "Get a free estimate from North Georgia's trusted tree service professionals.",
  variant = "green",
  className = "",
  quoteText = "Get Free Quote",
}: CTABannerProps) {
  const isGreen = variant === "green";

  return (
    <section
      aria-label="Call to action"
      className={`py-14 md:py-16 ${isGreen ? "bg-primary" : "bg-accent"} ${className}`}
    >
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          {/* Headline + sub */}
          <div className="max-w-2xl">
            <h2
              className={`font-heading text-3xl md:text-4xl font-bold uppercase leading-tight text-balance ${
                isGreen ? "text-white" : "text-neutral-dark"
              }`}
            >
              {headline}
            </h2>
            <p
              className={`mt-3 text-base md:text-lg ${
                isGreen ? "text-neutral-light" : "text-neutral-dark/80"
              }`}
            >
              {subheadline}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            {/* Phone CTA */}
            <Button
              variant={isGreen ? "ghost" : "secondary"}
              asPhone
              size="md"
            />
            {/* Quote CTA */}
            <Button
              variant={isGreen ? "primary" : "ghost"}
              href="/contact#quote"
              size="md"
            >
              {quoteText}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
