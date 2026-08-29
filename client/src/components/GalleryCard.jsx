import { motion } from "framer-motion";
import { Heart, Expand } from "lucide-react";
import { useCollections } from "../context/CollectionsContext";

export default function GalleryCard({ item, onPreview, delay = 0 }) {
  const { isSaved, toggleSave } = useCollections();
  const saved = isSaved(item.id);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group relative rounded-xl2 border border-border overflow-hidden bg-card card-glow"
    >
      <button
        onClick={() => onPreview(item)}
        className="block w-full aspect-square overflow-hidden"
      >
        <img
          src={item.img}
          alt={item.caption || item.rover || "gallery image"}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </button>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
        <p className="text-xs text-white/80 line-clamp-2">
          {item.caption || `${item.rover} · ${item.camera}`}
        </p>
      </div>

      <div className="absolute top-2 right-2 flex gap-1.5">
        <button
          onClick={() => toggleSave(item)}
          className={`p-2 rounded-full glass border border-border transition-colors ${
            saved ? "text-red-400 border-red-400/50" : "text-white/70 hover:text-hover"
          }`}
          aria-label="Favorite"
        >
          <Heart className="w-3.5 h-3.5" fill={saved ? "currentColor" : "none"} />
        </button>
      
        <button
          onClick={() => onPreview(item)}
          className="p-2 rounded-full glass border border-border text-white/70 hover:text-hover transition-colors"
          aria-label="Expand"
        >
          <Expand className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
