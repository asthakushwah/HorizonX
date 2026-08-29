import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Heart } from "lucide-react";
import useLockBodyScroll from "../hooks/useLockBodyScroll";
import { useCollections } from "../context/CollectionsContext";

export default function Modal({ item, onClose }) {
  useLockBodyScroll(!!item);
  const { isSaved, toggleSave } = useCollections();

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-card border border-border rounded-xl2 overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 rounded-full glass border border-border text-white hover:text-hover"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={item.img}
              alt={item.caption || "preview"}
              className="w-full max-h-[65vh] object-cover"
            />
            <div className="p-6 flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-lg font-semibold">
                  {item.caption || `${item.rover} Rover`}
                </p>
                <p className="text-sm text-white/40 mt-1">
                  {item.camera ? `${item.camera} · ` : ""}
                  {item.date || item.sol ? `Sol ${item.sol} · ${item.date}` : ""}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => toggleSave(item)}
                  className={`p-2.5 rounded-xl2 border border-border transition-colors ${
                    isSaved(item.id) ? "text-red-400 border-red-400/50" : "hover:text-hover"
                  }`}
                >
                  <Heart className="w-4 h-4" fill={isSaved(item.id) ? "currentColor" : "none"} />
                </button>
                <a
                  href={item.img}
                  download
                  className="p-2.5 rounded-xl2 border border-border hover:text-hover transition-colors"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
