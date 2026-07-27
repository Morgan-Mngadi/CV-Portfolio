import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type AnimatedMetricProps = {
  value: string;
  className?: string;
  duration?: number;
};

const NUMBER_PATTERN = /(\d[\d,]*)/;

export function AnimatedMetric({
  value,
  className,
  duration = 1100,
}: AnimatedMetricProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const match = value.match(NUMBER_PATTERN);
  const hasNumber = Boolean(match);
  const target = match ? Number(match[1].replaceAll(",", "")) : 0;
  const prefix = match ? value.slice(0, match.index) : "";
  const suffix = match ? value.slice((match.index ?? 0) + match[1].length) : value;
  const usesGrouping = match?.[1].includes(",") ?? false;
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !hasNumber || prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        const startedAt = performance.now();

        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 4);
          setDisplayValue(Math.round(target * easedProgress));

          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
          }
        };

        animationFrame = requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [duration, hasNumber, prefersReducedMotion, target]);

  const formattedValue = usesGrouping
    ? displayValue.toLocaleString("en-US")
    : String(displayValue);

  return (
    <span ref={elementRef} className={className} aria-label={value}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
