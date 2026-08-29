import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { missions } from "../assets/missionsData";

export default function MissionDetail() {
  const { id } = useParams();
  const mission = missions.find((m) => m.id === id);

  if (!mission) return <Navigate to="/not-found" replace />;

  return (
    <div className="max-w-3xl mx-auto px-5 lg:px-8 py-16">
      <Link
        to="/missions"
        className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-hover mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to missions
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span
          className={`inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border mb-5 ${
            mission.status === "Active"
              ? "border-hover text-hover"
              : "border-white/20 text-white/40"
          }`}
        >
          {mission.status}
        </span>

        <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-2">
          {mission.name}
        </h1>
        <p className="text-white/40 mb-8">{mission.years}</p>

        <div className="rounded-xl2 border border-border bg-card p-8">
          <p className="text-white/70 leading-relaxed mb-4">{mission.summary}</p>
          <p className="text-white/50 leading-relaxed">{mission.details}</p>
        </div>
      </motion.div>
    </div>
  );
}
