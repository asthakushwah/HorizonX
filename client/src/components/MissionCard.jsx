import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function MissionCard({ mission, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={`/missions/${mission.id}`}
        className="group block p-6 rounded-xl2 border border-border bg-card card-glow h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <span
            className={`text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${
              mission.status === "Active"
                ? "border-hover text-hover"
                : "border-white/20 text-white/40"
            }`}
          >
            {mission.status}
          </span>
          <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-hover group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <h3 className="font-display text-xl font-semibold mb-1">{mission.name}</h3>
        <p className="text-xs text-white/40 mb-3">{mission.years}</p>
        <p className="text-sm text-white/50 leading-relaxed">{mission.summary}</p>
      </Link>
    </motion.div>
  );
}
