import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";
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

const TECH_STACK = [
  {
    category: "AI Agents",
    tools: ["Codex", "Replit"],
  },
  {
    category: "Frontend",
    tools: ["React", "TypeScript", "Vite", "Tailwind CSS"],
  },
  {
    category: "Backend",
    tools: ["Node.js", "Express", "TypeScript"],
  },
  {
    category: "CMS",
    tools: ["Strapi 5"],
  },
  {
    category: "Measurement and Search Performance",
    tools: ["Google Search Console", "Google Analytics 4", "Google Tag Manager", "PageSpeed Insights", "Lighthouse"],
  },
  {
    category: "Developer Tooling",
    tools: ["Git", "GitHub"],
  },
];

const HIGHLIGHTS = [
  {
    title: "Headless CMS Architecture",
    body:
      "Built the platform on a headless CMS to gain granular control over metadata, structured data, and URL structures, removing the SEO constraints of traditional monolithic platforms.",
  },
  {
    title: "Server side Rendering",
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

const METRICS = [
  {
    value: "6,000+",
    label: "Search impressions",
    detail: "Generated over 6,000 search impressions across Google and Bing in the first two months, with Google contributing over 4,000 impressions.",
  },
  {
    value: "22%",
    label: "Active organic users",
    detail: "Improvement in active users from organic search between month three and month four.",
  },
  {
    value: "33%",
    label: "New organic users",
    detail: "Increase in new users arriving through organic search between month three and month four.",
  },
  {
    value: "30 days",
    label: "AI visibility",
    detail: "Appeared in AI Overviews and Microsoft Copilot with minimal content live.",
  },
  {
    value: "91%",
    label: "AI search health",
    detail: "Current AI search health score across visibility and technical readiness signals.",
  },
  {
    value: "250%",
    label: "Impression growth",
    detail: "Increase in organic search impressions between month three and month four.",
  },
  {
    value: "25%",
    label: "Click growth",
    detail: "Increase in organic search clicks between month three and month four.",
  },
];

const FAQS = [
  {
    question: "Why build CommuteZA instead of only showing client SEO work?",
    answer:
      "CommuteZA gives me a controlled environment to test SEO architecture directly. It shows how I think about rendering, metadata, URL structure, schema, reporting, and technical tradeoffs when I can own the full stack.",
  },
  {
    question: "What makes this a technical SEO case study?",
    answer:
      "The project focuses on implementation decisions that affect crawlability and indexation, including server side rendering, structured data, metadata systems, canonical paths, redirect logic, and search performance measurement.",
  },
  {
    question: "Are the results final?",
    answer:
      "No. The site is still in active development, so the metrics are early signals rather than a finished growth story. The value of the case study is the live implementation process and the way each SEO decision can be tested in production.",
  },
  {
    question: "What tools are used to measure progress?",
    answer:
      "Progress is reviewed through Google Search Console, GA4, Google Tag Manager, PageSpeed Insights, Lighthouse, and AI visibility checks across surfaces such as AI Overviews and Microsoft Copilot.",
  },
];

export default function CommuteZA() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo path="/projects/commuteza" />
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

        {/* HERO */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="border-b border-border py-16 lg:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.82fr)_minmax(420px,1fr)] gap-10 lg:gap-14 items-center">
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6 font-mono text-xs text-primary uppercase tracking-widest">
                <span className="w-6 h-px bg-primary" />
                Self initiated Project · January 2026 to Present
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.9] mb-8">
                Commute<span className="text-primary">ZA</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
                A routing web app for South African commuters, built from the ground up to deepen systems understanding and put SEO architecture into practice at a product level.
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
            </div>
            <motion.div variants={fadeUp} className="hidden lg:block">
              <img
                src="/project-images/commuteza-macbook.webp"
                alt="CommuteZA website displayed on a MacBook Air"
                className="w-full object-contain"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* OVERVIEW */}
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
            <motion.h2 variants={fadeUp} className="text-2xl font-medium leading-tight mb-6 max-w-2xl">
              A self initiated build designed to close the gap between SEO theory and systems implementation.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed max-w-2xl mb-4">
              Most SEO work happens on platforms you don't own, constrained by CMS limitations, development timelines, and third party tooling. CommuteZA was built to change that. By owning the full stack, every SEO decision, from rendering strategy to URL structure, is deliberate, testable, and measurable.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed max-w-2xl">
              The project serves South African commuters navigating public transport routes, while doubling as a live SEO laboratory where architecture decisions have real crawling and indexation consequences.
            </motion.p>
          </div>
        </motion.section>

        {/* METRICS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <motion.h2 variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              02 / Early Signals
            </motion.h2>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
              {METRICS.map((metric) => (
                <motion.div key={metric.label} variants={fadeUp} className="bg-card p-6 md:p-8">
                  <div className="text-4xl font-medium text-primary tabular-nums mb-3 tracking-tight">{metric.value}</div>
                  <div className="font-medium mb-2">{metric.label}</div>
                  <div className="font-mono text-xs text-muted-foreground leading-relaxed">{metric.detail}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* TECHNICAL FOCUS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <motion.h2 variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              03 / Technical Focus
            </motion.h2>
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

        {/* STACK */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <motion.h2 variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              04 / Stack & Methods
            </motion.h2>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TECH_STACK.map((group) => (
                <motion.div
                  key={group.category}
                  variants={fadeUp}
                  className="border border-border bg-card p-5"
                >
                  <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.tools.map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center px-3 py-1.5 bg-background border border-border text-xs font-mono text-muted-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* STATUS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <motion.h2 variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              05 / Status
            </motion.h2>
            <div className="flex flex-col gap-6 max-w-xl">
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0" />
                <span className="font-medium">Active development</span>
              </motion.div>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                Currently working on the redirect logic in the CMS and looking to add pricing info. The platform is live at{" "}
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

        {/* FAQ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <motion.h2 variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              06 / FAQ
            </motion.h2>
            <motion.div variants={stagger} className="flex flex-col divide-y divide-border border border-border">
              {FAQS.map((faq) => (
                <motion.section key={faq.question} variants={fadeUp} className="bg-card p-6">
                  <h3 className="font-medium mb-3">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </motion.section>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>
      <SiteFooter />
    </div>
  );
}
