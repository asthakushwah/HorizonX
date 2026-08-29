import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { asteroids } from "../assets/asteroidsData";
import SearchBar from "../components/SearchBar";

const dangerStyles = {
  High: "text-red-400 border-red-400/40 bg-red-400/5",
  Medium: "text-yellow-400 border-yellow-400/40 bg-yellow-400/5",
  Low: "text-green-400 border-green-400/40 bg-green-400/5",
};

const sortOptions = [
  { value: "date", label: "Closest approach date" },
  { value: "danger", label: "Danger level" },
  { value: "name", label: "Name (A–Z)" },
];

const dangerRank = { High: 0, Medium: 1, Low: 2 };

export default function Asteroids() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("date");

  const list = useMemo(() => {
    let result = asteroids.filter((a) =>
      a.name.toLowerCase().includes(query.toLowerCase())
    );
    result = [...result].sort((a, b) => {
      if (sort === "date") return new Date(a.date) - new Date(b.date);
      if (sort === "danger") return dangerRank[a.danger] - dangerRank[b.danger];
      return a.name.localeCompare(b.name);
    });
    return result;
  }, [query, sort]);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-hover mb-3">Asteroids</p>
        <h1 className="font-display text-4xl font-semibold mb-3">
          Near-Earth object tracker
        </h1>
        <p className="text-white/50 max-w-xl">
          Monitor upcoming close approaches and their relative danger levels.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <SearchBar value={query} onChange={setQuery} placeholder="Search asteroid name…" />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-card border border-border rounded-xl2 px-4 py-3 text-sm focus:outline-none focus:border-hover sm:w-64"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort by {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {list.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
            className="p-6 rounded-xl2 border border-border bg-card card-glow"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-display text-lg font-semibold">{a.name}</h3>
              <span
                className={`flex items-center gap-1 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${dangerStyles[a.danger]}`}
              >
                <AlertTriangle className="w-3 h-3" /> {a.danger}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-white/60">
              <div>
                <p className="text-white/30 text-xs uppercase mb-0.5">Diameter</p>
                <p>{a.diameter}</p>
              </div>
              <div>
                <p className="text-white/30 text-xs uppercase mb-0.5">Velocity</p>
                <p>{a.velocity}</p>
              </div>
              <div>
                <p className="text-white/30 text-xs uppercase mb-0.5">Miss distance</p>
                <p>{a.missDistance}</p>
              </div>
              <div>
                <p className="text-white/30 text-xs uppercase mb-0.5">Approach date</p>
                <p>{a.date}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
