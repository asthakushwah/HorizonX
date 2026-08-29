import { classNames } from "../utils/helpers";

export function Skeleton({ className = "" }) {
  return (
    <div
      className={classNames(
        "animate-pulse bg-card border border-border rounded-xl2",
        className
      )}
    />
  );
}

export function SkeletonGrid({ count = 8, className = "aspect-square" }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className={className} />
      ))}
    </div>
  );
}
