import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
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

const TECH_STACK = [
  "Headless CMS",
  "Server-side Rendering",
  "Structured Data / Schema.org",
  "Redirect Logic",
  "URL Architecture",
  "Metadata Management",
  "Google Search Console",
  "GA4",
  "Crawlability Auditing",
  "Indexation Strategy",
];

const HIGHLIGHTS = [
  {
    title: "Headless CMS Architecture",
    body:
      "Built the platform on a headless CMS to gain granular control over metadata, structured data, and URL structures — removing the SEO constraints of traditional monolithic platforms.",
  },
  {
    title: "Server-side Rendering",
    body:
      "Implemented and refined an SSR approach to ensure all content is fully rendered before reaching search engine crawlers, maximising crawlability and indexation speed.",
  },
  {
    title: "Structured Data Deployment",
    body:
      "Deployed comprehensive Schema.org markup tailored to the routing and commuter context, improving rich result eligibility and entity understanding.",
  },
  {
    title: "Redirect & URL Logic",
    body:
      "Designed a systematic redirect architecture and URL structure to ensure clean canonical paths, avoiding duplicate content and preserving link equity as the platform scales.",
  },
  {
    title: "Metadata System",
    body:
      "Centralised metadata management through the CMS layer, allowing dynamic title and description generation at scale without manual intervention per page.",
  },
];

export default function CommuteZA() {
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
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Logo" className="h-7 w-7 object-contain opacity-80" />
          </div>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Blog</Link>
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
              <ArrowLeft className="w-3 h-3" /> Back
            </Link>
            <a
              href="https://commuteza.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs bg-primary text-primary-foreground px-3 py-1 hover:bg-primary/90 transition-colors uppercase tracking-widest inline-flex items-center gap-1.5"
            >
              Visit site <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12">

        {/* ─── HERO ─── */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="border-b border-border py-16 lg:py-24"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6 font-mono text-xs text-primary uppercase tracking-widest">
            <span className="w-6 h-px bg-primary" />
            Self-initiated Project · January 2026 – Present
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.9] mb-8">
            Commute<span className="text-primary">ZA</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            A routing web app for South African commuters — built from the ground up to deepen systems understanding and put SEO architecture into practice at a product level.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="https://commuteza.co.za/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            data-testid="link-commuteza-live"
          >
            commuteza.co.za <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.section>

        {/* ─── OVERVIEW ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16"
        >
          <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
            01 / Overview
          </motion.div>
          <div>
            <motion.p variants={fadeUp} className="text-2xl font-medium leading-tight mb-6 max-w-2xl">
              A self-initiated build designed to close the gap between SEO theory and systems implementation.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed max-w-2xl mb-4">
              Most SEO work happens on platforms you don't own — constrained by CMS limitations, development timelines, and third-party tooling. CommuteZA was built to change that. By owning the full stack, every SEO decision — from rendering strategy to URL structure — is deliberate, testable, and measurable.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed max-w-2xl">
              The project serves South African commuters navigating public transport routes, while doubling as a live SEO laboratory where architecture decisions have real crawling and indexation consequences.
            </motion.p>
          </div>
        </motion.section>

        {/* ─── TECHNICAL FOCUS ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              02 / Technical Focus
            </motion.div>
            <div className="flex flex-col gap-6">
              {HIGHLIGHTS.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="border border-border bg-card p-6 group hover:border-primary transition-colors relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── STACK ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              03 / Stack & Methods
            </motion.div>
            <motion.div variants={stagger} className="flex flex-wrap gap-2">
              {TECH_STACK.map((item) => (
                <motion.span
                  key={item}
                  variants={fadeUp}
                  className="inline-flex items-center px-3 py-1.5 bg-card border border-border text-xs font-mono text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ─── STATUS ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              04 / Status
            </motion.div>
            <div className="flex flex-col gap-6 max-w-xl">
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0" />
                <span className="font-medium">Active development</span>
              </motion.div>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                Currently refining the server-side rendering approach and iterating on the structured data schema. The platform is live at{" "}
                <a
                  href="https://commuteza.co.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  commuteza.co.za
                </a>{" "}
                and continues to evolve as new SEO systems are implemented and tested in production.
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* ─── FOOTER NAV ─── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="py-12 flex justify-between items-center"
        >
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
            <ArrowLeft className="w-3 h-3" /> Back to portfolio
          </Link>
          <a
            href="https://commuteza.co.za/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:underline"
          >
            commuteza.co.za <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>

      </div>
    </div>
  );
}
