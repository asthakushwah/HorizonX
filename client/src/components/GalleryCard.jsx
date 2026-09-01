import { motion } from "framer-motion";
import { Heart, Maximize2 } from "lucide-react";

export default function GalleryCard({ item, onPreview, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group relative overflow-hidden rounded-xl2 border border-border bg-card"
    >
      {/* IMAGE */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* ACTION BUTTONS */}
      <div className="absolute top-3 right-3 flex gap-2">

        <button
          type="button"
          className="w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center border border-white/10 hover:bg-black/80"
        >
          <Heart className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onPreview(item)}
          className="w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center border border-white/10 hover:bg-black/80"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

      </div>

      {/* TITLE */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-sm text-white font-medium">
          {item.title}
        </p>
      </div>

    </motion.div>
  );
}