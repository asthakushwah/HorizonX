import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import  SpaceBackground from "./spaceBackground";

const words = ["Explore", "space", "with"];

// Slant -> straighten animation
const wordVariants = {
  hidden: {
    opacity: 0,
    skewX: -25,
    skewY: -6,
    rotate: -8,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    skewX: 0,
    skewY: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

export default function Hero() {
  return (
      <><SpaceBackground /><section className="relative flex flex-col items-center justify-center text-center px-6 py-32 md:py-40 overflow-hidden">
      {/* Background - fully self-contained, sits behind everything */}


      {/* Foreground content - explicitly stacked above the background */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 rounded-full border border-white/15 text-xs tracking-[0.2em] text-white/60 uppercase mb-8"
        >
          Your window to the universe
        </motion.div>

        {/* Animated headline - each word slants in, then straightens */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight max-w-4xl"
          style={{ perspective: 800 }}
        >
          <span className="block">
            {words.map((word) => (
              <motion.span
                key={word}
                variants={wordVariants}
                className="inline-block mr-4 origin-bottom-left"
              >
                {word}
              </motion.span>
            ))}
          </span>

          <motion.span
            variants={wordVariants}
            className="block origin-bottom-left bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent"
          >
            HorizonX
          </motion.span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-8 max-w-2xl text-white/60 text-lg leading-relaxed"
        >
          An interactive NASA gallery. Roam the solar system, browse Mars
          rover photos, track near-Earth asteroids, and build your own
          cosmic collections.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-10 flex items-center gap-4"
        >
          <Link
            to="/solar-system"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform duration-300"
          >
            Start exploring <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/ai-assistant"
            className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors duration-300"
          >
            Ask the AI Assistant
          </Link>
        </motion.div>
      </div>
    </section><SpaceBackground /></>
  );
}