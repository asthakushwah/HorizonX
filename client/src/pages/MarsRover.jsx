import { useMemo, useState } from "react";
import { marsPhotos } from "../assets/marsPhotosData";
import GalleryCard from "../components/GalleryCard";
import Modal from "../components/Modal";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";

const rovers = ["Curiosity", "Perseverance", "Opportunity", "Spirit"];

export default function MarsRover() {
  const [query, setQuery] = useState("");
  const [rover, setRover] = useState(null);
  const [preview, setPreview] = useState(null);

  const filtered = useMemo(() => {
    return marsPhotos.filter((p) => {
      const matchesRover = rover ? p.rover === rover : true;
      const matchesQuery = query
        ? p.camera.toLowerCase().includes(query.toLowerCase()) ||
          p.rover.toLowerCase().includes(query.toLowerCase())
        : true;
      return matchesRover && matchesQuery;
    });
  }, [query, rover]);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-hover mb-3">
          Mars Rover
        </p>
        <h1 className="font-display text-4xl font-semibold mb-3">
          Photos from the red planet
        </h1>
        <p className="text-white/50 max-w-xl">
          Filter by rover, search by camera, and save your favorite shots to
          your Collections.
        </p>
      </div>

      <div className="mb-8">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by rover or camera (e.g. MAST, Curiosity)…"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <Sidebar
          title="Filter by rover"
          options={rovers}
          active={rover}
          onChange={setRover}
        />

        <div className="flex-1">
          {filtered.length === 0 ? (
            <p className="text-white/40 text-center py-20">
              No photos match your search.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((item, i) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  onPreview={setPreview}
                  delay={(i % 8) * 0.04}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal item={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
