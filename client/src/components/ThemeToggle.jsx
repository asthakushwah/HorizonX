import { useState } from "react";
import { Moon, Stars } from "lucide-react";

// HorizonX is dark-only by design, but this toggle switches between a
// "Deep Space" (default) and "Nebula" ambient accent for personalization.
export default function ThemeToggle() {
  const [nebula, setNebula] = useState(false);

  return (
    <button
      onClick={() => setNebula((n) => !n)}
      className="p-2.5 rounded-full border border-border hover:border-hover text-white/60 hover:text-hover transition-colors"
      aria-label="Toggle ambient theme"
      title={nebula ? "Nebula mode" : "Deep Space mode"}
    >
      {nebula ? <Stars className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
