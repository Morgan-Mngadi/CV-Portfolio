import { motion } from "framer-motion";
import { ArrowLeft, Mail, MapPin, Award, TrendingUp, Zap, Globe, BarChart3, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import logoSrc from "@assets/5259D053-7FB7-4BC6-92C7-D625ADDC9985_1779213029285.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const EXPERIENCE = [
  {
    company: "Accenture Song",
    role: "SEO Specialist",
    period: "Jan 2026 – Present",
    location: "Midrand, JHB",
    current: true,
    description:
      "Contributing to SEO delivery for enterprise-level clients in the telecommunications sector. Supporting technical audits, metadata implementation review, and performance reporting through GA4 and Search Console within a cross-functional team.",
    tags: ["Technical Audits", "Enterprise", "GA4", "Telecoms"],
  },
  {
    company: "Flume Digital Marketing",
    role: "Junior SEO Specialist",
    period: "Nov 2023 – Dec 2025",
    location: "Bryanston, JHB",
    current: false,
    description:
      "Managed SEO implementation across finance, education, humanitarian, courier, hospitality and automotive verticals. Delivered technical audits, on-page optimisation, structured data deployment and CMS implementation. Represented the agency at the Assegais — awarded two honours.",
    tags: ["Multi-industry", "Structured Data", "WordPress", "Webflow"],
    award: "2× Assegais 2024",
  },
  {
    company: "IMS Ad Agency",
    role: "SEO & Analytics Associate",
    period: "Mar 2023 – Sep 2023",
    location: "Lonehill, JHB",
    current: false,
    description:
      "Built a foundation in SEO and analytics across multiple client accounts. Keyword research, on-page optimisation, technical audits and performance reporting using GSC, SEMrush and Looker Studio.",
    tags: ["SEO Foundations", "Analytics", "Reporting"],
  },
];

const PILLARS_EXPANDED = [
  {
    number: "01",
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Organic Growth Strategy",
    summary: "Intent mapping, content systems, YouTube integration, SERP optimisation, AI Overview structuring.",
    detail: [
      "Keyword and intent mapping aligned to business goals and conversion stages",
      "Content systems designed for topical authority and scalable production",
      "YouTube integration as a search surface — titles, descriptions, chapters, and entity alignment",
      "SERP feature optimisation: featured snippets, People Also Ask, and knowledge panels",
      "AI Overview structuring — content architecture and entity clarity for LLM-visible results",
    ],
  },
  {
    number: "02",
    icon: <Zap className="w-5 h-5" />,
    title: "Technical Search Infrastructure",
    summary: "Crawl optimisation, canonicalisation, duplication resolution, schema, indexation control, HTML/CSS/JS collaboration.",
    detail: [
      "Crawl budget management via robots.txt, XML sitemaps, and internal link architecture",
      "Canonical strategy and duplication resolution across parameterised and paginated URLs",
      "Structured data (JSON-LD) implementation: Article, Product, FAQ, LocalBusiness, BreadcrumbList",
      "Indexation control using noindex, hreflang, and coverage report triage in Search Console",
      "Cross-functional HTML/CSS/JS collaboration with dev teams for implementation accuracy",
    ],
  },
  {
    number: "03",
    icon: <Globe className="w-5 h-5" />,
    title: "Local & Authority Systems",
    summary: "Google Business Profile, Bing Places, entity signals, local schema, brand visibility.",
    detail: [
      "Google Business Profile setup, verification, category optimisation and review strategy",
      "Bing Places listing management and cross-platform NAP consistency",
      "Entity and knowledge graph signals — Wikipedia alignment, brand mentions, structured references",
      "LocalBusiness and GeoCoordinates schema implementation for local SERP features",
      "Brand visibility campaigns combining organic, GBP, and off-site authority building",
    ],
  },
  {
    number: "04",
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Analytics & Revenue Attribution",
    summary: "GA4 custom events, GTM configuration, organic conversion tracking, eCommerce revenue reporting.",
    detail: [
      "GA4 custom event configuration for micro and macro conversion tracking",
      "GTM container management — trigger setup, variable configuration, tag auditing",
      "Organic channel attribution segmentation in GA4 and Looker Studio",
      "eCommerce revenue reporting tied to organic search performance and keyword-level ROI",
      "Monthly performance dashboards tracking impressions, clicks, conversions, and revenue",
    ],
  },
];

const CLIENTS = [
  "A major South African telecommunications group",
  "Established financial services providers",
  "Tertiary education institutions",
  "Humanitarian and NPO organisations",
  "National courier and logistics brands",
  "Hospitality and hotel groups",
  "Automotive dealerships and groups",
  "eCommerce retailers and DTC brands",
  "Industrial and manufacturing equipment businesses",
  "Medical and healthcare providers",
  "Entertainment and media brands",
  "Technology and SaaS businesses",
];

const AVAILABILITY = [
  "Remote UK / EU roles",
  "Contract consulting",
  "Technical SEO audits",
  "Organic growth strategy",
];

export default function About() {
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
              <ArrowLeft className="w-3 h-3" /> Home
            </Link>
            <Link href="/blog" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Blog</Link>
            <a href="#contact" className="font-mono text-xs bg-primary text-primary-foreground px-3 py-1 hover:bg-primary/90 transition-colors uppercase tracking-widest">Contact</a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12">

        {/* ─── HERO ─── */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="border-b border-border grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0"
        >
          {/* Left — text */}
          <div className="py-16 lg:py-24 lg:pr-16 border-r border-border flex flex-col justify-between">
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6 font-mono text-xs text-primary uppercase tracking-widest">
                <span className="w-6 h-px bg-primary" />
                About
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] mb-8">
                Morgan<br />
                <span className="text-primary">Mngadi</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-10">
                I specialise in organic growth systems — combining technical SEO, search strategy, local authority optimisation, and revenue attribution to drive measurable business outcomes.
              </motion.p>
            </div>

            {/* Stats row */}
            <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border">
              {[
                { value: "3+", label: "Years active" },
                { value: "15+", label: "Clients worked with" },
                { value: "R700k+", label: "Organic eCommerce revenue" },
                { value: "2×", label: "Award honours" },
              ].map((s) => (
                <motion.div key={s.label} variants={fadeUp} className="flex flex-col">
                  <span className="text-3xl font-medium text-primary tabular-nums">{s.value}</span>
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mt-1 leading-tight">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — photo */}
          <motion.div
            variants={fadeUp}
            className="relative flex items-end justify-center overflow-hidden bg-card border-l-0 lg:border-l-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <img
              src="/morgan-photo.png"
              alt="Morgan Mngadi"
              className="relative z-0 w-full max-w-[320px] lg:max-w-none object-contain object-bottom h-full max-h-[480px]"
            />
          </motion.div>
        </motion.section>

        {/* ─── EXPERIENCE ─── */}
        <motion.section
          id="experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-12">
            01 / Experience
          </motion.div>

          <div className="flex flex-col divide-y divide-border">
            {EXPERIENCE.map((exp) => (
              <motion.div
                key={exp.company}
                variants={fadeUp}
                className="py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-12 group"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {exp.current && (
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                    <h3 className="text-lg font-medium">{exp.company}</h3>
                  </div>
                  <p className="text-primary font-mono text-sm">{exp.role}</p>
                  <p className="font-mono text-xs text-muted-foreground">{exp.period}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </div>
                  {exp.award && (
                    <div className="inline-flex items-center gap-1.5 mt-2 text-xs font-mono text-primary border border-primary/30 bg-primary/5 px-2.5 py-1 self-start">
                      <Award className="w-3 h-3" />
                      {exp.award}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-muted-foreground leading-relaxed mb-5">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono px-2.5 py-1 bg-card border border-border text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── 4-PILLAR EXPANDED ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-12">
            <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              02 / Methodology
            </motion.div>
            <div>
              <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-medium leading-tight mb-3">
                How I Drive Organic Growth
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                A structured four-pillar system — each discipline reinforcing the others to build compounding organic results.
              </motion.p>
            </div>
          </div>

          <motion.div variants={stagger} className="flex flex-col divide-y divide-border border border-border">
            {PILLARS_EXPANDED.map((pillar) => (
              <motion.div
                key={pillar.number}
                variants={fadeUp}
                className="group p-8 md:p-10 hover:bg-primary/[0.02] transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-12">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 text-primary">
                        {pillar.icon}
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">{pillar.number}</span>
                    </div>
                    <h3 className="font-medium text-lg mb-2">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.summary}</p>
                  </div>
                  <ul className="flex flex-col gap-2.5 pt-1">
                    {pillar.detail.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ─── SELECTED CLIENTS ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16"
        >
          <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
            03 / Clients
          </motion.div>
          <div>
            <motion.p variants={fadeUp} className="text-2xl md:text-3xl font-medium leading-tight mb-4 max-w-2xl">
              Contributed to SEO strategy for brands including:
            </motion.p>
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground font-mono mb-10">
              Across agency (Flume Digital) and enterprise (Accenture Song) engagements.
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CLIENTS.map((client) => (
                <motion.div
                  key={client}
                  variants={fadeUp}
                  className="flex items-center gap-3 p-4 bg-card border border-border text-sm text-muted-foreground font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {client}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ─── AVAILABILITY ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16"
        >
          <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
            04 / Availability
          </motion.div>
          <div>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-medium leading-tight mb-4">
              Available for
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-sm leading-relaxed max-w-xl mb-10">
              Open to remote and contract engagements — focused on bringing measurable organic growth to ambitious teams.
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
              {AVAILABILITY.map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  className="group relative border border-border bg-card p-5 hover:border-primary transition-colors overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  <span className="font-medium text-sm">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ─── CONTACT ─── */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                05 / Contact
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
                Let's build systems<br />that scale visibility.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground">
                Open to new opportunities in technical SEO and systems implementation.
              </motion.p>
            </div>
            <motion.div variants={stagger} className="flex flex-col gap-3">
              <motion.a
                variants={fadeUp}
                href="mailto:morganmngadi@gmail.com"
                className="flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                <Mail className="w-4 h-4 shrink-0" />
                morganmngadi@gmail.com
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-20 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground"
          >
            <div className="flex items-center gap-3">
              <img src={logoSrc} alt="" className="h-5 w-5 object-contain opacity-40" />
              <span>© {new Date().getFullYear()} Morgan Mngadi</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              Johannesburg, South Africa
            </div>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
}
