import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { constellations } from "../assets/constellationsData";
import SearchBar from "../components/SearchBar";
import Starfield from "../components/Starfield";

export default function Constellation() {
  const [query, setQuery] = useState("");

  const list = useMemo(
    () =>
      constellations.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Starfield count={130} />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-widest text-hover mb-3">
            Constellation
          </p>
          <h1 className="font-display text-4xl font-semibold mb-3">
            Chart the night sky
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Search the 88 recognized constellations and learn when and where
            to find them.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-10">
          <SearchBar value={query} onChange={setQuery} placeholder="Search a constellation…" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              className="p-6 rounded-xl2 border border-border bg-card/70 glass card-glow"
            >
              <Star className="w-5 h-5 text-hover mb-4" />
              <h3 className="font-display text-lg font-semibold mb-1">{c.name}</h3>
              <p className="text-xs text-white/40 mb-4">{c.meaning}</p>
              <div className="text-sm text-white/60 space-y-1.5">
                <p><span className="text-white/30">Stars:</span> {c.stars}</p>
                <p><span className="text-white/30">Best seen:</span> {c.bestSeen}</p>
                <p><span className="text-white/30">Hemisphere:</span> {c.hemisphere}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
