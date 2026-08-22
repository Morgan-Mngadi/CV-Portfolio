import { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLocation } from "wouter";

type PageSection = {
  element: HTMLElement;
  label: string;
};

function getSectionLabel(section: HTMLElement, index: number) {
  const explicitLabel = section.dataset.sectionLabel?.trim();
  if (explicitLabel) return explicitLabel;

  const labelledBy = section.getAttribute("aria-labelledby");
  const labelledElement = labelledBy ? document.getElementById(labelledBy) : null;
  const headings = Array.from(section.querySelectorAll<HTMLElement>("h1, h2, h3"));
  const numberedHeading = headings.find((heading) => /^\s*\d{2}\s*\//.test(heading.textContent ?? ""));
  const heading = labelledElement ?? numberedHeading ?? headings[0];

  return heading?.textContent?.replace(/\s+/g, " ").trim() || `Section ${index + 1}`;
}

function findPageSections(): PageSection[] {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>("section"));
  const topLevelSections = candidates.filter(
    (section) =>
      !section.parentElement?.closest("section") &&
      section.offsetHeight > 80 &&
      Boolean(section.dataset.sectionLabel || section.querySelector("h1, h2, h3")),
  );

  return topLevelSections.map((element, index) => ({
    element,
    label: getSectionLabel(element, index),
  }));
}

export function SectionNavigation() {
  const [location] = useLocation();
  const [sections, setSections] = useState<PageSection[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveSection = useCallback(() => {
    if (sections.length === 0) return;

    const marker = window.scrollY + window.innerHeight * 0.42;
    let nextIndex = 0;

    sections.forEach(({ element }, index) => {
      const sectionTop = element.getBoundingClientRect().top + window.scrollY;
      if (sectionTop <= marker) nextIndex = index;
    });

    setActiveIndex(nextIndex);
  }, [sections]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setSections(findPageSections()));
    return () => cancelAnimationFrame(frame);
  }, [location]);

  useEffect(() => {
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [updateActiveSection]);

  if (sections.length < 3) return null;

  const goToSection = (index: number) => {
    const section = sections[index]?.element;
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-border bg-background/85 px-2 py-3 shadow-lg backdrop-blur-md xl:flex"
    >
      <div
        aria-live="polite"
        className="pointer-events-none absolute right-full top-1/2 mr-2 w-max max-w-56 -translate-y-1/2 border border-border bg-background/90 px-3 py-2 text-right text-sm font-medium leading-snug text-foreground shadow-lg backdrop-blur-md"
      >
        {sections[activeIndex]?.label}
      </div>

      <button
        type="button"
        aria-label="Go to previous section"
        disabled={activeIndex === 0}
        onClick={() => goToSection(activeIndex - 1)}
        className="grid size-7 place-items-center rounded-full text-primary transition-colors hover:bg-primary/10 disabled:pointer-events-none disabled:opacity-25"
      >
        <ChevronUp className="size-5" aria-hidden="true" />
      </button>

      <ol className="flex flex-col items-center gap-2" aria-label="Section position">
        {sections.map((section, index) => (
          <li key={`${section.label}-${index}`} className="flex">
            <button
              type="button"
              aria-label={`Go to ${section.label}`}
              aria-current={index === activeIndex ? "location" : undefined}
              title={section.label}
              onClick={() => goToSection(index)}
              className={`size-2.5 rounded-full border transition-all duration-200 hover:scale-125 hover:border-primary ${
                index === activeIndex
                  ? "scale-110 border-primary bg-primary"
                  : "border-muted-foreground/50 bg-muted-foreground/45"
              }`}
            />
          </li>
        ))}
      </ol>

      <button
        type="button"
        aria-label="Go to next section"
        disabled={activeIndex === sections.length - 1}
        onClick={() => goToSection(activeIndex + 1)}
        className="grid size-7 place-items-center rounded-full text-primary transition-colors hover:bg-primary/10 disabled:pointer-events-none disabled:opacity-25"
      >
        <ChevronDown className="size-5" aria-hidden="true" />
      </button>
    </nav>
  );
}
