import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, CircleCheck, CircleHelp, Clock, Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import { ARTICLES, getArticle, type ArticleAiFinding, type ArticleChart, type ArticleComparisonTable, type ArticleImage, type ArticleImageCarousel, type ArticleIndexationChart, type ArticleParagraph, type ArticleVideo } from "@/data/articles";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NotFound from "@/pages/not-found";
import { Seo } from "@/components/seo";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import authorPhotoSrc from "@assets/Untitled_design-Photoroom_1779786532347.png";

const fadeUp = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const ARTICLE_CTA_COPY: Record<string, { title: string; description: string }> = {
  "AI Search": {
    title: "Want to strengthen your visibility in AI search?",
    description: "Let’s explore how your content and technical foundations can earn more mentions and citations across AI-powered search.",
  },
  "Authority Building": {
    title: "Want to build stronger search authority?",
    description: "Let’s turn useful content, credible citations, and off-page signals into a sustainable authority-building strategy.",
  },
  "Local SEO": {
    title: "Want more customers to find you locally?",
    description: "Let’s improve your local search presence, business profiles, citations, and location-focused content.",
  },
  Measurement: {
    title: "Want clearer insight from your SEO data?",
    description: "Let’s build measurement and reporting that connects search performance to decisions and business outcomes.",
  },
  "Social Media SEO": {
    title: "Want social activity to support search growth?",
    description: "Let’s connect content discovery, brand visibility, and social signals with a practical organic search strategy.",
  },
  "Video SEO": {
    title: "Want your videos to earn more search visibility?",
    description: "Let’s improve how your video content is structured, discovered, and connected to your wider search strategy.",
  },
};

const ARTICLE_SLUG_CTA_COPY: Record<string, { title: string; description: string }> = {
  "can-ai-recommend-you-for-a-job-portfolio-indexation": {
    title: "Already have a portfolio but aren't sure whether search engines can actually find it?",
    description:
      "I help professionals improve the technical SEO and discoverability of their portfolio websites, including indexation, metadata, structured data, and search visibility.",
  },
};

const isExternalHref = (href: string) => /^https?:\/\//.test(href);

type LightboxState = {
  images: ArticleImage[];
  index: number;
};

function renderLinkedParagraph(paragraph: ArticleParagraph) {
  if (typeof paragraph === "string") {
    return paragraph;
  }

  const content = [];
  let remainingText = paragraph.text;

  paragraph.links.forEach((link) => {
    const linkIndex = remainingText.indexOf(link.text);

    if (linkIndex === -1) {
      return;
    }

    const beforeLink = remainingText.slice(0, linkIndex);

    if (beforeLink) {
      content.push(beforeLink);
    }

    content.push(
      isExternalHref(link.href) ? (
        <a
          key={`${link.href}-${content.length}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
        >
          {link.text}
        </a>
      ) : (
        <Link
          key={`${link.href}-${content.length}`}
          href={link.href}
          className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
        >
          {link.text}
        </Link>
      ),
    );

    remainingText = remainingText.slice(linkIndex + link.text.length);
  });

  if (remainingText) {
    content.push(remainingText);
  }

  return content;
}

function ArticleBarChart({ chart }: { chart: ArticleChart }) {
  const maxValue = Math.max(...chart.rows.map((row) => row.value), 1);
  const ticks = [0, 2.5, 5, 7.5, 10];
  const highlightedLabels = chart.highlightedLabels ?? ["wikipedia.org"];

  return (
    <figure className="mt-8 border border-border bg-card p-4 sm:p-6">
      <div className="mb-6 border-b border-border pb-5">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">AI Citation Visibility</p>
        <h3 className="mt-3 text-2xl font-medium tracking-tight text-foreground">{chart.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{chart.subtitle}</p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-[7.5rem] right-0 hidden sm:grid grid-cols-4">
          {[0, 1, 2, 3].map((line) => (
            <span key={line} className="border-l border-border/70" />
          ))}
        </div>

        <div className="relative z-10 flex flex-col gap-2">
          {chart.rows.map((row, index) => {
            const width = `${Math.min(100, (row.value / maxValue) * 100)}%`;
            const isHighlighted = highlightedLabels.includes(row.label);

            return (
              <div
                key={row.label}
                className="grid grid-cols-[7.5rem_1fr] items-center gap-3 sm:grid-cols-[7.5rem_1fr_3.25rem]"
              >
                <div className={`truncate font-mono text-[0.7rem] sm:text-xs ${isHighlighted ? "text-primary" : "text-muted-foreground"}`}>
                  {row.label}
                </div>
                <div className="h-7 border border-border bg-background/80 p-1">
                  <motion.div
                    className={isHighlighted ? "h-full bg-primary" : "h-full bg-muted-foreground/35"}
                    initial={{ width: 0 }}
                    whileInView={{ width }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, delay: index * 0.025, ease: "easeOut" }}
                    aria-label={`${row.label}: ${row.value}%`}
                  />
                </div>
                <div className={`hidden text-right font-mono text-[0.7rem] sm:block ${isHighlighted ? "text-primary" : "text-muted-foreground"}`}>
                  {row.value.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 hidden grid-cols-[7.5rem_1fr_3.25rem] items-center gap-3 sm:grid">
          <span />
          <div className="grid grid-cols-5 font-mono text-[0.65rem] text-muted-foreground">
            {ticks.map((tick) => (
              <span key={tick} className={tick === 0 ? "text-left" : "text-right"}>
                {tick === 0 ? "0" : `${tick}%`}
              </span>
            ))}
          </div>
          <span />
        </div>
      </div>

      <figcaption className="mt-5 border-t border-border pt-4 font-mono text-xs leading-relaxed text-muted-foreground">
        {chart.axisLabel}. {chart.sourceLabel}
      </figcaption>
    </figure>
  );
}

function AnimatedInteger({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!element || prefersReducedMotion || !("IntersectionObserver" in window)) {
      setDisplayValue(value);
      return;
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        const startedAt = performance.now();
        const duration = 1150;

        const update = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 4);
          setDisplayValue(Math.round(value * easedProgress));

          if (progress < 1) {
            animationFrame = requestAnimationFrame(update);
          }
        };

        animationFrame = requestAnimationFrame(update);
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return <span ref={ref}>{displayValue}</span>;
}

function ArticleIndexationChartBlock({ chart }: { chart: ArticleIndexationChart }) {
  const bars = [1, 8, 8, 8, 8, 8, 8, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16];

  return (
    <figure className="mt-8 overflow-hidden border border-border bg-card">
      <div className="grid sm:grid-cols-2">
        <div className="border-b border-border bg-muted/40 p-5 sm:border-b-0 sm:border-r sm:p-6">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="grid h-5 w-5 place-items-center border border-muted-foreground/60"><Check className="h-3.5 w-3.5" /></span>
            Not indexed
          </p>
          <p className="mt-5 text-5xl font-medium tabular-nums text-foreground"><AnimatedInteger value={chart.notIndexedPages} /></p>
          <p className="mt-2 text-sm text-muted-foreground">No reasons</p>
        </div>
        <div className="border border-primary/60 bg-primary/[0.06] p-5 text-foreground sm:p-6">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
            <span className="grid h-5 w-5 place-items-center border border-primary/70"><Check className="h-3.5 w-3.5" /></span>
            Indexed
          </p>
          <p className="mt-5 text-5xl font-medium tabular-nums text-primary"><AnimatedInteger value={chart.indexedPages} /></p>
          <p className="mt-2 text-sm text-foreground/70">Pages available in search</p>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Page indexation</p>
            <h3 className="mt-2 text-xl font-medium tracking-tight text-foreground">Indexed portfolio pages over time</h3>
          </div>
          <span className="hidden font-mono text-xs text-muted-foreground sm:block">May–Aug 2026</span>
        </div>

        <div className="grid grid-cols-[1.75rem_1fr] gap-2">
          <div className="flex h-56 flex-col justify-between pb-6 text-right font-mono text-[0.65rem] text-muted-foreground">
            <span>18</span><span>12</span><span>6</span><span>0</span>
          </div>
          <div>
            <div className="relative flex h-56 items-end gap-px border-b border-border">
              {[0, 1, 2].map((line) => <span key={line} className="pointer-events-none absolute inset-x-0 border-t border-border/70" style={{ top: `${line * 33.333}%` }} />)}
              {bars.map((height, index) => (
                <motion.span
                  key={index}
                  className="relative z-10 min-w-0 flex-1 bg-primary"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(height / 18) * 100}%` }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: index * 0.012, ease: "easeOut" }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between font-mono text-[0.6rem] text-muted-foreground sm:text-[0.7rem]">
              <span>13 May</span><span>4 Jun</span><span>26 Jun</span><span>18 Jul</span><span>11 Aug</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="border-t border-border px-4 py-4 font-mono text-xs leading-relaxed text-muted-foreground sm:px-6">
        {chart.sourceLabel}
      </figcaption>
    </figure>
  );
}

function ArticleAiFindings({ findings }: { findings: ArticleAiFinding[] }) {
  const statusStyle = {
    "Overstated claim": {
      icon: AlertTriangle,
      className: "border-amber-500/50 bg-amber-500/[0.07] text-amber-600 dark:text-amber-400",
    },
    "Unsupported assumption": {
      icon: CircleHelp,
      className: "border-rose-500/50 bg-rose-500/[0.07] text-rose-600 dark:text-rose-400",
    },
    "Partially accurate": {
      icon: CircleCheck,
      className: "border-primary/50 bg-primary/[0.06] text-primary",
    },
  } as const;

  return (
    <div className="mt-7 flex flex-col gap-4" aria-label="AI response findings">
      {findings.map((finding, index) => {
        const style = statusStyle[finding.status];
        const Icon = style.icon;

        return (
          <motion.article
            key={finding.claim}
            className="flex flex-col border border-border bg-card p-5 sm:p-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            <div className={`inline-flex w-fit items-center gap-2 border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-widest ${style.className}`}>
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {finding.status}
            </div>
            {finding.context && (
              <p className="mt-4 text-sm font-medium leading-relaxed text-foreground">{finding.context}</p>
            )}
            <blockquote className="mt-4 border-l-2 border-border pl-4 text-base font-medium leading-relaxed text-foreground">
              {finding.claim}
            </blockquote>
            <div className="mt-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">What the evidence supports</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{finding.correction}</p>
            </div>
            {finding.link && (
              <Link href={finding.link.href} className="mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-[0.68rem] uppercase tracking-widest text-primary hover:underline">
                {finding.link.label}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            )}
          </motion.article>
        );
      })}
    </div>
  );
}

function ArticleImageCarouselBlock({
  carousel,
  onSelectImage,
}: {
  carousel: ArticleImageCarousel;
  onSelectImage: (images: ArticleImage[], index: number) => void;
}) {
  return (
    <figure className="mt-8 border border-border bg-card p-3 sm:p-5">
      <div className="mb-4 border-b border-border pb-4">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Visual Examples</p>
        <h3 className="mt-2 text-xl font-medium tracking-tight text-foreground">{carousel.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{carousel.description}</p>
      </div>

      <Carousel opts={{ align: "start", loop: false }} className="mx-auto w-full">
        <CarouselContent>
          {carousel.images.map((image, index) => (
            <CarouselItem key={image.src}>
              <div className="border border-border bg-background p-2 sm:p-3">
                <button
                  type="button"
                  className="group relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border border-border bg-background"
                  onClick={() => onSelectImage(carousel.images, index)}
                  aria-label={`Open larger image: ${image.alt}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center border border-border bg-background/90 text-foreground opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </button>
                <figcaption className="mt-3 grid gap-2 text-xs leading-relaxed text-muted-foreground sm:grid-cols-[auto_1fr]">
                  <span className="font-mono text-primary tabular-nums">
                    {index + 1}/{carousel.images.length}
                  </span>
                  <span>{image.caption}</span>
                </figcaption>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 border-border bg-background/90 text-foreground hover:bg-card disabled:opacity-30" />
        <CarouselNext className="right-3 border-border bg-background/90 text-foreground hover:bg-card disabled:opacity-30" />
      </Carousel>
    </figure>
  );
}

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

function ArticleVideoBlock({ video }: { video: ArticleVideo }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const sourceType = video.src.toLowerCase().endsWith(".mov") ? "video/quicktime" : "video/mp4";

  useEffect(() => {
    const element = videoRef.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !prefersReducedMotion) {
          void element.play().catch(() => {
            // Native controls remain available if a browser blocks autoplay.
          });
        } else {
          element.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      element.pause();
    };
  }, []);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  const updatePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);

    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const openFullScreen = () => {
    const element = containerRef.current;

    if (element?.requestFullscreen) {
      void element.requestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    }
  };

  return (
    <figure className="mt-8 border border-border bg-card p-3 sm:p-5">
      <div className="mb-4 border-b border-border pb-4">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Dashboard Demo</p>
        <h3 className="mt-2 text-xl font-medium tracking-tight text-foreground">{video.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{video.description}</p>
      </div>

      <div ref={containerRef} className="relative bg-black p-1 sm:p-2">
        {isFullScreen && (
          <button
            type="button"
            onClick={exitFullScreen}
            className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center border border-white/30 bg-black/80 text-white backdrop-blur transition-colors hover:border-white/70 hover:bg-black"
            aria-label="Exit full screen"
            title="Exit full screen"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <video
          ref={videoRef}
          controls
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster={video.poster}
          className="aspect-video w-full bg-black object-contain"
          aria-label={video.title}
          onRateChange={(event) => setPlaybackRate(event.currentTarget.playbackRate)}
        >
          <source src={video.src} type={sourceType} />
          Your browser does not support embedded video playback.
        </video>
      </div>

      <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
        <figcaption className="text-xs leading-relaxed text-muted-foreground sm:max-w-xl">
          {video.caption}
        </figcaption>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <label htmlFor="article-video-speed" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Speed
          </label>
          <select
            id="article-video-speed"
            value={playbackRate}
            onChange={(event) => updatePlaybackRate(Number(event.target.value))}
            className="h-10 border border-border bg-background px-3 font-mono text-xs text-foreground focus:border-primary focus:outline-none"
            aria-label="Video playback speed"
          >
            {PLAYBACK_SPEEDS.map((speed) => (
              <option key={speed} value={speed}>
                {speed}x
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={openFullScreen}
            className="inline-flex h-10 items-center justify-center gap-2 border border-border bg-background px-3 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Maximize2 className="h-4 w-4" />
            Full screen
          </button>
        </div>
      </div>
    </figure>
  );
}

function ScrollableComparisonTable({ table }: { table: ArticleComparisonTable }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const updateThumb = () => {
    const element = scrollRef.current;
    const thumb = thumbRef.current;

    if (!element || !thumb) {
      return;
    }

    const maxScroll = element.scrollWidth - element.clientWidth;
    const scrollable = maxScroll > 0;
    const width = scrollable ? Math.max(18, (element.clientWidth / element.scrollWidth) * 100) : 100;
    const trackWidth = thumb.parentElement?.clientWidth ?? 0;
    const thumbWidth = (trackWidth * width) / 100;
    const left = scrollable ? (element.scrollLeft / maxScroll) * (trackWidth - thumbWidth) : 0;

    setIsScrollable(scrollable);
    thumb.style.width = `${thumbWidth}px`;
    thumb.style.transform = `translate3d(${left}px, 0, 0)`;
  };

  const scheduleThumbUpdate = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      updateThumb();
      animationFrameRef.current = null;
    });
  };

  useEffect(() => {
    scheduleThumbUpdate();
    window.addEventListener("resize", scheduleThumbUpdate);

    return () => {
      window.removeEventListener("resize", scheduleThumbUpdate);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="mt-8">
      <div
        className={`mb-2 flex items-center justify-end gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-primary transition-opacity duration-300 ${
          isScrollable ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isScrollable}
      >
        <span>Scroll horizontally to see all columns</span>
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </div>
      <div ref={scrollRef} onScroll={scheduleThumbUpdate} className="overflow-x-auto border border-border bg-card">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="border-b border-primary/30 bg-primary/10">
            <tr>
              {table.columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className={`px-4 py-3 font-mono text-xs uppercase tracking-widest text-primary ${
                    column.includes("Recommended") ? "bg-primary/15 shadow-[inset_3px_0_0_hsl(var(--primary))]" : ""
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {table.rows.map((row) => (
              <tr key={row.join("-")} className="align-top">
                {row.map((cell, index) => {
                  const isRecommendedColumn = table.columns[index]?.includes("Recommended");

                  return (
                    <td
                      key={`${cell}-${index}`}
                      className={`px-4 py-4 text-muted-foreground leading-relaxed ${
                        isRecommendedColumn ? "bg-primary/5 shadow-[inset_3px_0_0_hsl(var(--primary))]" : ""
                      }`}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        aria-hidden="true"
        className={`relative mt-2 h-0.5 w-24 overflow-hidden bg-border transition-opacity duration-300 ${
          isScrollable ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          ref={thumbRef}
          className="absolute inset-y-0 left-0 bg-primary transition-[transform,width] duration-200 ease-out will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)", width: "100%" }}
        />
      </div>
    </div>
  );
}

function ArticleAuthorCard({ headingId }: { headingId: string }) {
  return (
    <section aria-labelledby={headingId} className="border border-border bg-card p-5">
      <h2 id={headingId} className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Author
      </h2>
      <div className="flex items-center gap-3">
        <img
          src={authorPhotoSrc}
          alt="Morgan Mngadi"
          className="h-14 w-12 shrink-0 border border-border bg-background object-cover object-top"
          loading="eager"
        />
        <div>
          <p className="font-medium leading-tight">Morgan Mngadi</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-primary">SEO Specialist</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Writing about technical SEO, analytics, AI visibility, organic growth, and product-led search systems.
      </p>
    </section>
  );
}

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const article = params?.slug ? getArticle(params.slug) : undefined;
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  if (!article) {
    return <NotFound />;
  }

  const moreArticles = ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);
  const ctaCopy = ARTICLE_SLUG_CTA_COPY[article.slug] ?? ARTICLE_CTA_COPY[article.category] ?? {
    title: "Want to apply these ideas to your search strategy?",
    description: "Let’s talk about how this approach could support your website, content, analytics, or digital product.",
  };
  const selectedImage = lightbox?.images[lightbox.index] ?? null;
  const canShowPreviousImage = Boolean(lightbox && lightbox.index > 0);
  const canShowNextImage = Boolean(lightbox && lightbox.index < lightbox.images.length - 1);
  const openLightbox = (images: ArticleImage[], index = 0) => setLightbox({ images, index });
  const showPreviousImage = () => {
    setLightbox((current) => current && current.index > 0 ? { ...current, index: current.index - 1 } : current);
  };
  const showNextImage = () => {
    setLightbox((current) => current && current.index < current.images.length - 1 ? { ...current, index: current.index + 1 } : current);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo path={`/blog/${article.slug}`} />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <SiteNav />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-12">
        <motion.article initial="hidden" animate="visible" variants={stagger}>
          <header className="border-b border-border py-16 lg:py-20">
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-mono text-xs text-primary border border-primary/30 bg-primary/5 px-2.5 py-1">{article.category}</span>
              <span className="font-mono text-xs text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
              <span className="font-mono text-xs text-muted-foreground">{article.date}</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-medium tracking-tight leading-tight mb-6 max-w-4xl">
              {article.title}
            </motion.h1>
            {article.heroAnswer ? (
              <motion.aside variants={fadeUp} className="max-w-3xl border border-primary/60 bg-primary/[0.05] p-5 sm:p-6" aria-label="Short answer">
                <p className="font-mono text-xs uppercase tracking-widest text-primary">Short Answer</p>
                <p className="mt-3 text-xl font-medium leading-snug text-foreground sm:text-2xl">{article.heroAnswer.answer}</p>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{article.heroAnswer.explanation}</p>
              </motion.aside>
            ) : (
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {article.excerpt}
              </motion.p>
            )}
          </header>

          <div className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[200px_minmax(0,1fr)_240px] xl:gap-8">
            <motion.aside variants={fadeUp} className="flex flex-col gap-5 lg:sticky lg:top-20 lg:self-start">
              <nav aria-label="Table of contents" className="border border-border bg-card p-5">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Contents</h2>
                <ol className="flex flex-col gap-3">
                  {article.sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
                        {section.heading}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#faq" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
                      FAQ
                    </a>
                  </li>
                </ol>
              </nav>
            </motion.aside>

            <div className="max-w-3xl">
              {article.sections.map((section) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  variants={fadeUp}
                  className="scroll-mt-24 border-b border-border pb-10 mb-10"
                >
                  <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-5">{section.heading}</h2>
                  <div className="flex flex-col gap-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={typeof paragraph === "string" ? paragraph : paragraph.text} className="text-muted-foreground leading-relaxed">
                        {renderLinkedParagraph(paragraph)}
                      </p>
                    ))}
                  </div>
                  {section.notice && (
                    <aside
                      className="mt-6 border border-primary/50 bg-primary/[0.06] p-5 text-sm leading-relaxed text-foreground"
                      aria-label="Important disclosure"
                    >
                      <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-primary">
                        Important disclosure
                      </span>
                      {section.notice}
                    </aside>
                  )}
                  {section.bullets && (
                    <ul className="mt-6 flex flex-col gap-3">
                      {section.bullets.map((item) => (
                        <li key={item} className="text-sm text-muted-foreground leading-relaxed border-l-4 border-primary/70 pl-5">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.numberedSteps && (
                    <ol className="mt-6 flex flex-col gap-3">
                      {section.numberedSteps.map((item, index) => (
                        <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 text-sm text-muted-foreground leading-relaxed">
                          <span className="font-mono text-xs text-primary tabular-nums">{index + 1}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                  {section.comparisonTable && (
                    <ScrollableComparisonTable table={section.comparisonTable} />
                  )}
                  {section.chart && (
                    <ArticleBarChart chart={section.chart} />
                  )}
                  {section.indexationChart && (
                    <ArticleIndexationChartBlock chart={section.indexationChart} />
                  )}
                  {section.aiFindings && (
                    <ArticleAiFindings findings={section.aiFindings} />
                  )}
                  {section.imageBlocks && (
                    <div className={section.imageLayout === "grid" ? "mt-8 grid grid-cols-1 gap-6 md:grid-cols-2" : "mt-8 flex flex-col gap-8"}>
                      {section.imageBlocks.map((image, index) => (
                        <figure key={image.src} className="border border-border bg-card p-3 sm:p-4">
                          <button
                            type="button"
                            className="group relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden border border-border bg-background"
                            onClick={() => openLightbox([image])}
                            aria-label={`Open larger image: ${image.alt}`}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              loading={index === 0 ? "eager" : "lazy"}
                              className="h-full w-full object-contain"
                            />
                            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center border border-border bg-background/90 text-foreground opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                              <Maximize2 className="h-4 w-4" />
                            </span>
                          </button>
                          <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
                            {image.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                  {section.video && (
                    <ArticleVideoBlock video={section.video} />
                  )}
                  {section.imageCarousel && (
                    <ArticleImageCarouselBlock carousel={section.imageCarousel} onSelectImage={openLightbox} />
                  )}
                  {section.imagePlaceholder && (
                    <figure className="mt-8 border border-dashed border-border bg-card p-6">
                      <div className="aspect-[16/9] w-full border border-border bg-background flex items-center justify-center px-6 text-center">
                        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                          Image placeholder
                        </span>
                      </div>
                      <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
                        {section.imagePlaceholder}
                      </figcaption>
                    </figure>
                  )}
                  {section.closingParagraphs && (
                    <div className="mt-6 flex flex-col gap-4">
                      {section.closingParagraphs.map((paragraph) => (
                        <p key={typeof paragraph === "string" ? paragraph : paragraph.text} className="text-muted-foreground leading-relaxed">
                          {renderLinkedParagraph(paragraph)}
                        </p>
                      ))}
                    </div>
                  )}
                  {section.link && (
                    isExternalHref(section.link.href) ? (
                      <a
                        href={section.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex font-mono text-xs uppercase tracking-widest text-primary hover:underline"
                      >
                        {section.link.label}
                      </a>
                    ) : (
                      <Link href={section.link.href} className="mt-6 inline-flex font-mono text-xs uppercase tracking-widest text-primary hover:underline">
                        {section.link.label}
                      </Link>
                    )
                  )}
                  {section.links && (
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      {section.links.map((link) => (
                        isExternalHref(link.href) ? (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex font-mono text-xs uppercase tracking-widest text-primary hover:underline"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="inline-flex font-mono text-xs uppercase tracking-widest text-primary hover:underline"
                          >
                            {link.label}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </motion.section>
              ))}

              <motion.section variants={fadeUp} className="mb-10 flex flex-col gap-5 border-y border-border py-10 xl:hidden">
                <ArticleAuthorCard headingId="article-author-mobile" />
                <div className="border border-primary/40 bg-card p-6 md:p-8">
                  <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Let’s Connect</p>
                  <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
                    {ctaCopy.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {ctaCopy.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/areas-of-expertise"
                      className="inline-flex items-center justify-center gap-2 border border-border px-5 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      Explore Expertise <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <a
                      id="article-book-intro-call"
                      href="https://cal.com/morgan-mngadi-18ixti/intro-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <CalendarDays className="w-4 h-4" /> Book a Call
                    </a>
                    <a
                      id="article-contact-email"
                      href="mailto:morganmngadi@gmail.com"
                      className="inline-flex items-center justify-center gap-2 border border-border px-5 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      Get in Touch
                    </a>
                  </div>
                </div>
              </motion.section>

              <motion.section id="faq" variants={fadeUp} className="scroll-mt-24 pb-14">
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-6">FAQ</h2>
                <div className="flex flex-col divide-y divide-border border border-border">
                  {article.faqs.map((faq) => (
                    <section key={faq.question} className="p-6 bg-card">
                      <h3 className="font-medium mb-3">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </section>
                  ))}
                </div>
              </motion.section>

              {moreArticles.length > 0 && (
                <motion.section variants={fadeUp} className="border-b border-border pb-10 mb-10">
                  <div className="flex items-end justify-between gap-4 mb-6">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Keep Reading</p>
                      <h2 className="text-2xl md:text-3xl font-medium tracking-tight">More Articles</h2>
                    </div>
                    <Link href="/blog" className="hidden sm:inline-flex font-mono text-xs uppercase tracking-widest text-primary hover:underline">
                      View all
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {moreArticles.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/blog/${item.slug}`}
                        className="group border border-border bg-card p-5 hover:border-primary transition-colors"
                      >
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="font-mono text-xs text-primary border border-primary/30 bg-primary/5 px-2.5 py-1">
                            {item.category}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {item.readTime}
                          </span>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
                          <div>
                            <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.excerpt}</p>
                          </div>
                          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.section>
              )}

              <motion.footer variants={fadeUp} className="py-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                  <ArrowLeft className="w-3 h-3" /> Back to portfolio
                </Link>
                <Link href="/blog" className="font-mono text-xs text-primary hover:underline uppercase tracking-widest">
                  View All Articles
                </Link>
              </motion.footer>
            </div>

            <motion.aside variants={fadeUp} className="hidden xl:sticky xl:top-24 xl:flex xl:flex-col xl:gap-5 xl:self-start">
              <ArticleAuthorCard headingId="article-author-desktop" />
              <section aria-labelledby="article-sidebar-cta" className="border border-primary bg-primary p-6 text-primary-foreground shadow-lg shadow-primary/10">
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-primary-foreground/75">Let’s Connect</p>
                <h2 id="article-sidebar-cta" className="text-2xl font-medium leading-tight tracking-tight">
                  {ctaCopy.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
                  {ctaCopy.description}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    id="article-sidebar-book-intro-call"
                    href="https://cal.com/morgan-mngadi-18ixti/intro-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
                  >
                    <CalendarDays className="h-4 w-4" /> Book a Call
                  </a>
                  <a
                    id="article-sidebar-contact-email"
                    href="mailto:morganmngadi@gmail.com"
                    className="inline-flex items-center justify-center border border-primary-foreground/50 px-4 py-3 text-sm font-medium transition-colors hover:border-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Get in Touch
                  </a>
                  <Link
                    href="/areas-of-expertise"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    Explore Expertise <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>
            </motion.aside>
          </div>
        </motion.article>
      </main>
      <Dialog open={Boolean(selectedImage)} onOpenChange={(open) => !open && setLightbox(null)}>
        <DialogContent className="max-h-[92svh] w-[calc(100vw-1.5rem)] max-w-6xl gap-3 border-border bg-background p-3 sm:p-4 [&>button]:hidden">
          <div className="absolute right-3 top-3 z-10">
            <DialogClose className="grid h-10 w-10 place-items-center border border-border bg-card/95 text-muted-foreground opacity-100 transition-colors hover:border-muted-foreground/50 hover:bg-background hover:text-foreground focus:outline-none focus-visible:border-muted-foreground/60 focus-visible:bg-background focus-visible:text-foreground">
              <span className="relative block h-4 w-4" aria-hidden="true">
                <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 rotate-45 bg-current" />
                <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 -rotate-45 bg-current" />
              </span>
              <span className="sr-only">Close image</span>
            </DialogClose>
          </div>
          <DialogTitle className="sr-only">{selectedImage?.alt ?? "Article image"}</DialogTitle>
          <DialogDescription className="sr-only">{selectedImage?.caption ?? "Expanded article image"}</DialogDescription>
          {selectedImage && (
            <figure className="flex max-h-[calc(92svh-2rem)] flex-col gap-3">
              <div className="relative min-h-0 flex-1 overflow-auto border border-border bg-card">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="h-auto min-h-full w-full max-w-none object-contain sm:max-h-[78svh]"
                />
                {lightbox && lightbox.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPreviousImage}
                      disabled={!canShowPreviousImage}
                      className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-border bg-background/90 text-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
                      aria-label="Show previous image"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      disabled={!canShowNextImage}
                      className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-border bg-background/90 text-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
                      aria-label="Show next image"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
              <figcaption className="grid gap-2 font-mono text-xs leading-relaxed text-muted-foreground sm:grid-cols-[auto_1fr]">
                {lightbox && lightbox.images.length > 1 && (
                  <span className="text-primary tabular-nums">
                    {lightbox.index + 1}/{lightbox.images.length}
                  </span>
                )}
                <span>{selectedImage.caption}</span>
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
      <SiteFooter />
    </div>
  );
}
