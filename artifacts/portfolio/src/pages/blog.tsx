import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { ARTICLES } from "@/data/articles";
import { Seo } from "@/components/seo";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const fadeUp = {
  hidden: { opacity: 1, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const CATEGORIES = ["All", "AI Search", "Measurement"];

export default function Blog() {
  const [featured, ...rest] = ARTICLES;

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

        {/* FEATURED POST */}
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
          className="py-8 flex flex-wrap gap-2 border-b border-border"
        >
          {CATEGORIES.map((cat, i) => (
            <span
              key={cat}
              className={`font-mono text-xs px-3 py-1.5 border transition-colors cursor-default ${
                i === 0
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {cat}
            </span>
          ))}
        </motion.div>

        {/* POST LIST */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="py-12 flex flex-col divide-y divide-border"
        >
          {rest.map((post) => (
            <motion.div
              key={post.slug}
              variants={fadeUp}
              className="group py-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start cursor-pointer hover:bg-card/40 transition-colors px-0 -mx-0"
            >
              <a href={`/blog/${post.slug}`}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-muted-foreground border border-border px-2.5 py-0.5">{post.category}</span>
                  <span className="font-mono text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-medium mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl text-sm">{post.excerpt}</p>
              </a>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1 hidden md:block" />
            </motion.div>
          ))}
        </motion.section>

      </div>
      <SiteFooter />
    </div>
  );
}
