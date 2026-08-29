import { useEffect, useState } from "react";

// Returns true once the page has been scrolled past `threshold` px.
// Used by the Navbar to switch to a solid/blurred background.
export default function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
