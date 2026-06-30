import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock, Maximize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import { ARTICLES, getArticle, type ArticleComparisonTable, type ArticleImage } from "@/data/articles";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import NotFound from "@/pages/not-found";
import { Seo } from "@/components/seo";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const fadeUp = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

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
        className={`relative mt-2 h-0.5 w-24 overflow-hidden bg-border transition-opacity duration-300 md:hidden ${
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

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const article = params?.slug ? getArticle(params.slug) : undefined;
  const [selectedImage, setSelectedImage] = useState<ArticleImage | null>(null);

  if (!article) {
    return <NotFound />;
  }

  const moreArticles = ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);

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
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {article.excerpt}
            </motion.p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 py-14">
            <motion.aside variants={fadeUp} className="flex flex-col gap-5 lg:sticky lg:top-20 lg:self-start">
              <section aria-labelledby="article-author" className="border border-border bg-card p-5">
                <h2 id="article-author" className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  Author
                </h2>
                <div className="flex items-center gap-3">
                  <img
                    src="/morgan-photo.png"
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
                      <p key={paragraph} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
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
                  {section.imageBlocks && (
                    <div className={section.imageLayout === "grid" ? "mt-8 grid grid-cols-1 gap-6 md:grid-cols-2" : "mt-8 flex flex-col gap-8"}>
                      {section.imageBlocks.map((image, index) => (
                        <figure key={image.src} className="border border-border bg-card p-3 sm:p-4">
                          <button
                            type="button"
                            className="group relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden border border-border bg-background"
                            onClick={() => setSelectedImage(image)}
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
                        <p key={paragraph} className="text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                  {section.link && (
                    <Link href={section.link.href} className="mt-6 inline-flex font-mono text-xs uppercase tracking-widest text-primary hover:underline">
                      {section.link.label}
                    </Link>
                  )}
                </motion.section>
              ))}

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

              <motion.section variants={fadeUp} className="border-y border-border py-10 mb-10">
                <div className="border border-primary/40 bg-card p-6 md:p-8">
                  <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Let’s Connect</p>
                  <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
                    Want to Talk Search, Analytics, or Digital Products?
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    I’m interested in thoughtful conversations around technical SEO, analytics, GTM, GA4, organic growth, and product-led search systems.
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
          </div>
        </motion.article>
      </main>
      <Dialog open={Boolean(selectedImage)} onOpenChange={(open) => !open && setSelectedImage(null)}>
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
              <div className="min-h-0 flex-1 overflow-auto border border-border bg-card">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="h-auto min-h-full w-full max-w-none object-contain sm:max-h-[78svh]"
                />
              </div>
              <figcaption className="font-mono text-xs leading-relaxed text-muted-foreground">
                {selectedImage.caption}
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
      <SiteFooter />
    </div>
  );
}
