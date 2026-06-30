import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

export function ScrollProgress() {
  const [location] = useLocation();
  const progressRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const updateProgress = () => {
    const progress = progressRef.current;

    if (!progress) {
      return;
    }

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const amount = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0;

    progress.style.transform = `scaleX(${amount})`;
  };

  const scheduleUpdate = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      updateProgress();
      animationFrameRef.current = null;
    });
  };

  useEffect(() => {
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [location]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-[calc(3rem-2px)] z-[70] h-[3px] bg-border"
    >
      <div
        ref={progressRef}
        className="h-full origin-left bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.45)] will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
