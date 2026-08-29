import { motion } from "framer-motion";
import { timelineEvents } from "../assets/timelineData";

export default function Timeline() {
  return (
    <div className="max-w-4xl mx-auto px-5 lg:px-8 py-16">
      <div className="mb-16 text-center">
        <p className="text-xs uppercase tracking-widest text-hover mb-3">Timeline</p>
        <h1 className="font-display text-4xl font-semibold mb-3">
          Milestones in space exploration
        </h1>
        <p className="text-white/50 max-w-xl mx-auto">
          Key moments from the founding of NASA to today's active missions.
        </p>
      </div>

      <div className="relative pl-8 sm:pl-10">
        <div className="absolute left-2.5 sm:left-3.5 top-0 bottom-0 w-px bg-border" />

        {timelineEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.03 }}
            className="relative mb-10 last:mb-0"
          >
            <span className="absolute -left-8 sm:-left-10 top-1 w-5 h-5 rounded-full bg-bg border-2 border-hover flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-hover" />
            </span>
            <div className="p-5 rounded-xl2 border border-border bg-card card-glow">
              <p className="text-hover font-display font-semibold text-sm mb-1">
                {event.year}
              </p>
              <h3 className="font-display text-lg font-semibold mb-1.5">
                {event.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
