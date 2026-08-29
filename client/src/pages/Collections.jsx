import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { useCollections } from "../context/CollectionsContext";
import GalleryCard from "../components/GalleryCard";
import Modal from "../components/Modal";
import Button from "../components/Button";

export default function Collections() {
  const { saved } = useCollections();
  const [preview, setPreview] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-hover mb-3">Collections</p>
        <h1 className="font-display text-4xl font-semibold mb-3">
          Your saved images
        </h1>
        <p className="text-white/50 max-w-xl">
          Everything you've favorited across Mars Rover and Earth galleries,
          all in one place.
        </p>
      </div>

      {saved.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center py-24 rounded-xl2 border border-border bg-card"
        >
          <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center mb-5">
            <Heart className="w-6 h-6 text-white/30" />
          </div>
          <h3 className="font-display text-lg font-semibold mb-2">
            Nothing saved yet
          </h3>
          <p className="text-white/40 text-sm max-w-sm mb-6">
            Tap the heart icon on any Mars Rover or Earth image to add it to
            your collection.
          </p>
          <Button as={Link} to="/mars-rover" variant="secondary">
            <Compass className="w-4 h-4" /> Start exploring
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {saved.map((item, i) => (
            <GalleryCard key={item.id} item={item} onPreview={setPreview} delay={(i % 8) * 0.04} />
          ))}
        </div>
      )}

      <Modal item={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
