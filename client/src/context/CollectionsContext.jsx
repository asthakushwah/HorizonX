import { createContext, useContext, useState, useCallback } from "react";

// Global context that lets any page save an image to the user's
// personal "Collections" page. Purely client-side (no backend).
const CollectionsContext = createContext(null);

export function CollectionsProvider({ children }) {
  const [saved, setSaved] = useState([]);

  const isSaved = useCallback(
    (id) => saved.some((item) => item.id === id),
    [saved]
  );

  const toggleSave = useCallback((item) => {
    setSaved((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) return prev.filter((p) => p.id !== item.id);
      return [...prev, item];
    });
  }, []);

  return (
    <CollectionsContext.Provider value={{ saved, isSaved, toggleSave }}>
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollections() {
  const ctx = useContext(CollectionsContext);
  if (!ctx) throw new Error("useCollections must be used within CollectionsProvider");
  return ctx;
}
