type ReviewPlatform = "google" | "facebook" | "yelp";

interface ReviewCardProps {
  author: string;
  location?: string;
  rating?: number;
  text: string;
  date?: string;
  platform?: ReviewPlatform;
}

const PLATFORM_LABELS: Record<ReviewPlatform, string> = {
  google: "Google Review",
  facebook: "Facebook Review",
  yelp: "Yelp Review",
};

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={`Rated ${rating} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-accent" : "text-neutral-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({
  author,
  location,
  rating = 5,
  text,
  date,
  platform = "google",
}: ReviewCardProps) {
  return (
    <figure className="bg-white rounded-lg shadow-md border border-neutral-100 p-6 flex flex-col gap-4">
      {/* Stars + platform label */}
      <div className="flex items-center justify-between">
        <StarRating rating={rating} />
        <span className="text-xs text-neutral-mid/60 font-medium uppercase tracking-wide">
          {PLATFORM_LABELS[platform]}
        </span>
      </div>

      {/* Review text */}
      <blockquote className="text-neutral-mid text-sm leading-relaxed flex-1">
        &ldquo;{text}&rdquo;
      </blockquote>

      {/* Author byline */}
      <figcaption className="border-t border-neutral-100 pt-4 flex items-end justify-between gap-2">
        <div>
          <p className="font-heading font-semibold text-primary text-sm uppercase tracking-wide">
            {author}
          </p>
          {location && (
            <p className="text-xs text-neutral-mid/60 mt-0.5">{location}</p>
          )}
        </div>
        {date && (
          <time
            className="text-xs text-neutral-mid/50 shrink-0"
            dateTime={date}
          >
            {date}
          </time>
        )}
      </figcaption>
    </figure>
  );
}
