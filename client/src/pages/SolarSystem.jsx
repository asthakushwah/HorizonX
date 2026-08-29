import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { planets } from "../assets/planetsData";
import PlanetCard from "../components/PlanetCard";

export default function SolarSystem() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-widest text-hover mb-3">
          Solar System
        </p>
        <h1 className="font-display text-4xl font-semibold mb-3">
          Eight worlds, one neighborhood
        </h1>
        <p className="text-white/50 max-w-xl mx-auto">
          Tap any planet to see its key facts — distance, diameter, gravity,
          and more.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {planets.map((planet, i) => (
          <PlanetCard
            key={planet.id}
            planet={planet}
            onSelect={setSelected}
            delay={i * 0.05}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-card border border-border rounded-xl2 p-8"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-hover"
              >
                <X className="w-5 h-5" />
              </button>
              <div
                className="w-16 h-16 rounded-full mb-5"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${selected.color}, #05050580)`,
                  boxShadow: `0 0 40px ${selected.color}66`,
                }}
              />
              <h2 className="font-display text-2xl font-semibold mb-2">
                {selected.name}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                {selected.facts}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/30 text-xs uppercase mb-1">Distance</p>
                  <p>{selected.distance}</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase mb-1">Diameter</p>
                  <p>{selected.diameter}</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase mb-1">Gravity</p>
                  <p>{selected.gravity}</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase mb-1">Day length</p>
                  <p>{selected.dayLength}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
