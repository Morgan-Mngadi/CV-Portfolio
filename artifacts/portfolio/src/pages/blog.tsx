import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ARTICLES } from "@/data/articles";
import { Seo } from "@/components/seo";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fadeUp = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const CATEGORY_QUERY_KEY = "category";

const categoryToQueryValue = (category: string) => category.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const categoryFromSearch = (search: string, categories: string[]) => {
  const queryCategory = new URLSearchParams(search).get(CATEGORY_QUERY_KEY);

  if (!queryCategory) {
    return "All";
  }

  const matchingCategory = categories.find((category) => categoryToQueryValue(category) === queryCategory);
  return matchingCategory ?? "All";
};

export default function Blog() {
  const [featured, ...rest] = ARTICLES;
  const categories = useMemo(() => ["All", ...Array.from(new Set(ARTICLES.map((article) => article.category)))], []);
  const [activeCategory, setActiveCategory] = useState(() =>
    typeof window === "undefined" ? "All" : categoryFromSearch(window.location.search, categories),
  );
  const visiblePosts = activeCategory === "All" ? rest : ARTICLES.filter((article) => article.category === activeCategory);

  useEffect(() => {
    const handlePopState = () => {
      setActiveCategory(categoryFromSearch(window.location.search, categories));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [categories]);

  const updateCategory = (category: string) => {
    setActiveCategory(category);

    const url = new URL(window.location.href);

    if (category === "All") {
      url.searchParams.delete(CATEGORY_QUERY_KEY);
    } else {
      url.searchParams.set(CATEGORY_QUERY_KEY, categoryToQueryValue(category));
    }

    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo path="/blog" />
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <SiteNav />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12">

        {/* HEADER */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="border-b border-border py-16 lg:py-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6 font-mono text-xs text-primary uppercase tracking-widest">
            <span className="w-6 h-px bg-primary" />
            Writing
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-medium tracking-tight leading-tight mb-6">
            SEO <span className="text-primary">Perspectives</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Practical notes on AI search, measurement, and technical SEO systems.
          </motion.p>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="border-b border-border py-12"
        >
          <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">
            Featured
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="group relative border border-primary/40 bg-card hover:border-primary transition-colors overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-primary" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors duration-500" />
            <a href={`/blog/${featured.slug}`} className="relative p-8 md:p-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-primary border border-primary/30 bg-primary/5 px-2.5 py-1">{featured.category}</span>
                  <span className="font-mono text-xs text-muted-foreground flex items-center gap-1.5"><Clock className="w-3 h-3" />{featured.readTime}</span>
                  <span className="font-mono text-xs text-muted-foreground">{featured.date}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-medium mb-4 group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">By Morgan Mngadi</p>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">{featured.excerpt}</p>
              </div>
              <div className="shrink-0">
                <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </a>
          </motion.div>
        </motion.section>

        {/* CATEGORY FILTER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="py-8 border-b border-border"
          aria-label="Filter articles by category"
        >
          <div className="sm:hidden">
            <label htmlFor="mobile-category-filter" className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Filter articles
            </label>
            <Select value={activeCategory} onValueChange={updateCategory}>
              <SelectTrigger
                id="mobile-category-filter"
                className="h-12 rounded-none border-border bg-card font-mono text-xs uppercase tracking-widest text-foreground"
              >
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-border bg-card">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="rounded-none font-mono text-xs uppercase tracking-widest">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="hidden flex-wrap gap-2 sm:flex">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;

              return (
                <button
                  type="button"
                  key={cat}
                  aria-pressed={isActive}
                  onClick={() => updateCategory(cat)}
                  className={`font-mono text-xs px-3 py-1.5 border transition-colors ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary cursor-default"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground cursor-pointer"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* POST LIST */}
        <section
          id="article-results"
          aria-label={`${activeCategory} articles`}
          className="py-12 flex flex-col divide-y divide-border"
        >
          {visiblePosts.length > 0 ? visiblePosts.map((post) => (
            <article
              key={post.slug}
              className="group py-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start cursor-pointer hover:bg-card/40 transition-colors px-0 -mx-0"
            >
              <a href={`/blog/${post.slug}`}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-muted-foreground border border-border px-2.5 py-0.5">{post.category}</span>
                  <span className="font-mono text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-medium mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">By Morgan Mngadi</p>
                <p className="text-muted-foreground leading-relaxed max-w-2xl text-sm">{post.excerpt}</p>
              </a>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1 hidden md:block" />
            </article>
          )) : (
            <p className="text-sm text-muted-foreground">No articles found for this category yet.</p>
          )}
        </section>

      </div>
      <SiteFooter />
    </div>
  );
}
