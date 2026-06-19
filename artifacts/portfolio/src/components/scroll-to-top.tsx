import { useEffect } from "react";
import { useLocation } from "wouter";

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    let frameId = 0;
    let attempts = 0;

    const scrollToHash = () => {
      const target = document.getElementById(decodeURIComponent(hash));

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (attempts < 10) {
        attempts += 1;
        frameId = window.requestAnimationFrame(scrollToHash);
      }
    };

    frameId = window.requestAnimationFrame(scrollToHash);

    return () => window.cancelAnimationFrame(frameId);
  }, [location]);

  return null;
}
