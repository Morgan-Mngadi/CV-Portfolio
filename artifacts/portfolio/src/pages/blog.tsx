import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, Clock } from "lucide-react";
import { Link } from "wouter";
import logoSrc from "@assets/5259D053-7FB7-4BC6-92C7-D625ADDC9985_1779213029285.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const POSTS = [
  {
    slug: "headless-cms-seo-architecture",
    title: "Why Headless CMS Changes the SEO Game",
    excerpt:
      "Traditional CMS platforms hand control to the platform. Headless architecture hands it back — giving SEO practitioners granular control over rendering, metadata, structured data, and URL logic that monolithic systems can't match.",
    category: "Technical SEO",
    date: "May 2026",
    readTime: "6 min read",
    featured: true,
  },
  {
    slug: "ssr-vs-csr-seo-implications",
    title: "SSR vs CSR: What It Actually Means for Crawlability",
    excerpt:
      "The rendering debate isn't just a developer conversation — it sits at the core of whether Googlebot indexes your content correctly. Here's how I think about it when planning technical SEO implementations.",
    category: "Technical SEO",
    date: "Apr 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "structured-data-beyond-basics",
    title: "Structured Data Beyond the Basics",
    excerpt:
      "Most guides stop at FAQ and Product schema. But for platforms with complex content relationships — like routing apps, directories, or e-commerce catalogues — there's far more leverage to unlock.",
    category: "Structured Data",
    date: "Mar 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "seo-in-regulated-industries",
    title: "SEO in Regulated Industries: Finance, Medical, and Beyond",
    excerpt:
      "Compliance constraints don't have to be SEO blockers. Working across finance and medical verticals taught me how to find organic growth within tight guardrails — and why E-E-A-T is more important than ever.",
    category: "Strategy",
    date: "Feb 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "multi-industry-seo-lessons",
    title: "What 14 Industries Taught Me About SEO Strategy",
    excerpt:
      "From automotive to humanitarian organisations — the fundamentals stay constant but the approach shifts with every vertical. A reflection on pattern recognition, industry-specific signals, and what really drives organic growth.",
    category: "Strategy",
    date: "Jan 2026",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "google-search-console-advanced",
    title: "Getting More From Google Search Console",
    excerpt:
      "GSC is the most underused tool in most SEO workflows. Beyond average position and clicks, there are layers of performance data, coverage signals, and indexation insights that change how you prioritise work.",
    category: "Tooling",
    date: "Dec 2025",
    readTime: "6 min read",
    featured: false,
  },
];

const CATEGORIES = ["All", "Technical SEO", "Structured Data", "Strategy", "Tooling"];

export default function Blog() {
  const featured = POSTS.find((p) => p.featured)!;
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/">
            <img src={logoSrc} alt="Logo" className="h-7 w-7 object-contain opacity-80 cursor-pointer" />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
              <ArrowLeft className="w-3 h-3" /> Portfolio
            </Link>
            <a href="/#contact" className="font-mono text-xs bg-primary text-primary-foreground px-3 py-1 hover:bg-primary/90 transition-colors uppercase tracking-widest">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12">

        {/* ─── HEADER ─── */}
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
            Thinking out loud on technical SEO, systems architecture, and what actually moves the needle in organic search.
          </motion.p>
        </motion.section>

        {/* ─── FEATURED POST ─── */}
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
            <div className="relative p-8 md:p-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
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
            </div>
          </motion.div>
        </motion.section>

        {/* ─── CATEGORY FILTER (static display) ─── */}
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

        {/* ─── POST LIST ─── */}
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
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-muted-foreground border border-border px-2.5 py-0.5">{post.category}</span>
                  <span className="font-mono text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-medium mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl text-sm">{post.excerpt}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1 hidden md:block" />
            </motion.div>
          ))}
        </motion.section>

        {/* ─── COMING SOON CALLOUT ─── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="border border-border bg-card p-8 mb-16 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">More coming soon</p>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            New articles on technical SEO, implementation patterns, and organic growth strategy — published regularly.
          </p>
        </motion.div>

        {/* ─── FOOTER NAV ─── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="py-10 border-t border-border flex justify-between items-center"
        >
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
            <ArrowLeft className="w-3 h-3" /> Back to portfolio
          </Link>
          <span className="font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} Morgan Mngadi</span>
        </motion.div>

      </div>
    </div>
  );
}
