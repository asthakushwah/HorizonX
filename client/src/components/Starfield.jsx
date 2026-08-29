import { useMemo } from "react";

// Renders a lightweight field of twinkling CSS-only stars.
// count controls density; kept low for performance.
export default function Starfield({ count = 80, className = "" }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
      })),
    [count]
  );

  return (
    <div className={`starfield ${className}`} aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
