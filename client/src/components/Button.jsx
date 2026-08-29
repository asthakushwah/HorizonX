import { motion } from "framer-motion";
import { classNames } from "../utils/helpers";

// Shared button component. `variant` controls visual style:
// primary (solid white), secondary (outlined), ghost (text-only).
export default function Button({
  children,
  variant = "primary",
  className = "",
  as: Component = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl2 font-medium text-sm transition-all duration-300";

  const variants = {
    primary: "bg-white text-black hover:bg-hover hover:text-white",
    secondary:
      "border border-border text-white hover:border-hover hover:text-hover bg-transparent",
    ghost: "text-white/70 hover:text-white bg-transparent",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Component
        className={classNames(base, variants[variant], className)}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
}
