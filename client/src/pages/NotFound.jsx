import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";
import Button from "../components/Button";
import Starfield from "../components/Starfield";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-5 overflow-hidden">
      <Starfield count={100} />

      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6"
      >
        <Rocket className="w-14 h-14 text-hover" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display text-7xl sm:text-8xl font-bold text-gradient mb-4"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-white/50 max-w-md mb-8"
      >
        This coordinate doesn't exist in our star charts. The page you're
        looking for has drifted out of orbit.
      </motion.p>

      <Button as={Link} to="/" variant="primary">
        Return to base
      </Button>
    </div>
  );
}
