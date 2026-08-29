import { motion } from "framer-motion";

export default function PlanetCard({ planet, onSelect, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl2 border border-border bg-card card-glow overflow-hidden flex flex-col"
    >
      <div
        className="h-44 flex items-center justify-center relative"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${planet.color}55, #050505 70%)`,
        }}
      >
        <div
          className="w-24 h-24 rounded-full animate-floaty"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${planet.color}, #05050580)`,
            boxShadow: `0 0 40px ${planet.color}66`,
          }}
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-display text-xl font-semibold">{planet.name}</h3>
        <p className="text-sm text-white/40 mb-4">{planet.tagline}</p>
        <div className="grid grid-cols-2 gap-3 text-xs text-white/60 mb-5">
          <div>
            <p className="text-white/30 uppercase tracking-wide mb-0.5">Distance</p>
            <p>{planet.distance}</p>
          </div>
          <div>
            <p className="text-white/30 uppercase tracking-wide mb-0.5">Diameter</p>
            <p>{planet.diameter}</p>
          </div>
          <div>
            <p className="text-white/30 uppercase tracking-wide mb-0.5">Gravity</p>
            <p>{planet.gravity}</p>
          </div>
          <div>
            <p className="text-white/30 uppercase tracking-wide mb-0.5">Day length</p>
            <p>{planet.dayLength}</p>
          </div>
        </div>
        <button
          onClick={() => onSelect(planet)}
          className="mt-auto w-full py-2.5 rounded-xl2 border border-border text-sm hover:border-hover hover:text-hover transition-colors"
        >
          View facts
        </button>
      </div>
    </motion.div>
  );
}
