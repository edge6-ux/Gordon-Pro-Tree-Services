import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
}

// Placeholder tree icon shown when no image is provided
function PlaceholderIcon() {
  return (
    <svg
      className="w-16 h-16 text-accent/40"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 2L8 8H4l8 8-3 5h6l-3-5 8-8h-4L12 2z"
      />
    </svg>
  );
}

export default function ServiceCard({
  title,
  description,
  href,
  imageSrc,
  imageAlt = "",
}: ServiceCardProps) {
  return (
    <article className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Image / color block */}
      <div className="relative h-48 overflow-hidden bg-primary-light flex items-center justify-center">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <PlaceholderIcon />
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-heading text-xl font-bold uppercase text-primary mb-3 group-hover:text-primary-light transition-colors">
          {title}
        </h3>
        <p className="text-neutral-mid text-sm leading-relaxed mb-5 flex-1">
          {description}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 font-heading text-sm uppercase tracking-wider text-accent font-semibold hover:gap-3 transition-all duration-200"
          aria-label={`Learn more about ${title}`}
        >
          Learn More
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
