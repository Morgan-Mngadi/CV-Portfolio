import { useEffect, useRef } from "react";

type TargetCursorProps = {
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  parallaxOn?: boolean;
  cursorColorOnTarget?: string;
};

const TARGET_SELECTOR = "a, button, input, textarea, select, [role='button'], .cursor-target";

export function TargetCursor({
  spinDuration = 2,
  hideDefaultCursor = true,
  parallaxOn = true,
  cursorColorOnTarget = "#10B981",
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const cursor = cursorRef.current;
    const cursorFrame = frameRef.current;
    const cursorDot = dotRef.current;
    if (!cursor || !cursorFrame || !cursorDot) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let activeTarget: HTMLElement | null = null;

    document.documentElement.classList.toggle("custom-cursor-active", hideDefaultCursor);

    const render = () => {
      let frameX = targetX;
      let frameY = targetY;
      let frameWidth = 30;
      let frameHeight = 30;

      if (activeTarget) {
        const rect = activeTarget.getBoundingClientRect();
        frameX = rect.left + rect.width / 2;
        frameY = rect.top + rect.height / 2;
        frameWidth = rect.width + 14;
        frameHeight = rect.height + 14;

        if (parallaxOn) {
          frameX += (targetX - frameX) * 0.025;
          frameY += (targetY - frameY) * 0.025;
        }
      }

      x += (frameX - x) * 0.24;
      y += (frameY - y) * 0.24;
      cursorFrame.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      cursorFrame.style.width = `${frameWidth}px`;
      cursorFrame.style.height = `${frameHeight}px`;
      cursorDot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.dataset.visible = "true";

      const nextTarget = (event.target as Element | null)?.closest<HTMLElement>(TARGET_SELECTOR) ?? null;
      if (nextTarget !== activeTarget) {
        activeTarget = nextTarget;
        cursor.dataset.targeting = nextTarget ? "true" : "false";
        cursor.style.setProperty("--target-cursor-color", nextTarget ? cursorColorOnTarget : "currentColor");
      }

    };

    const onLeave = () => {
      cursor.dataset.visible = "false";
      cursor.dataset.targeting = "false";
      activeTarget = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [cursorColorOnTarget, hideDefaultCursor, parallaxOn]);

  return (
    <div
      ref={cursorRef}
      className="target-cursor"
      data-visible="false"
      data-targeting="false"
      style={{ "--target-cursor-spin": `${spinDuration}s` } as React.CSSProperties}
      aria-hidden="true"
    >
      <span ref={frameRef} className="target-cursor__frame">
        <span className="target-cursor__corner target-cursor__corner--tl" />
        <span className="target-cursor__corner target-cursor__corner--tr" />
        <span className="target-cursor__corner target-cursor__corner--br" />
        <span className="target-cursor__corner target-cursor__corner--bl" />
      </span>
      <span ref={dotRef} className="target-cursor__dot" />
    </div>
  );
}
