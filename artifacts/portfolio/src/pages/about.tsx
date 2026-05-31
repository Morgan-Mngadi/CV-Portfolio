import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Award, TrendingUp, Zap, Globe, BarChart3, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/seo";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const EXPERIENCE = [
  {
    company: "Accenture Song",
    role: "SEO Specialist",
    period: "Jan 2026 to Present",
    location: "Midrand, JHB",
    current: true,
    description:
      "Contributing to SEO delivery for agency clients in the telecommunications sector. Supporting technical audits, metadata implementation review, and performance reporting through GA4 and Search Console within a cross functional team.",
    tags: ["Technical Audits", "Agency", "GA4", "Telecoms"],
  },
  {
    company: "Flume Digital Marketing",
    role: "Junior SEO Specialist",
    period: "Nov 2023 to Dec 2025",
    location: "Bryanston, JHB",
    current: false,
    description:
      "Managed SEO implementation across finance, education, humanitarian, courier, hospitality and automotive verticals. Delivered technical audits, on-page optimisation, structured data deployment and CMS implementation. Contributed implementation work to campaigns recognised with two Assegai honours under senior strategic direction.",
    tags: ["Multi industry", "Structured Data", "WordPress", "Webflow"],
    award: "Contributed to 2× Assegai honours",
  },
  {
    company: "IMS Ad Agency",
    role: "SEO & Analytics Associate",
    period: "Mar 2023 to Sep 2023",
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
      "YouTube integration as a search surface with titles, descriptions, chapters, and entity alignment",
      "SERP feature optimisation: featured snippets, People Also Ask, and knowledge panels",
      "AI Overview structuring with content architecture and entity clarity for LLM visible results",
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
      "Structured data JSON LD implementation: Article, Product, FAQ, LocalBusiness, BreadcrumbList",
      "Indexation control using noindex, hreflang, and coverage report triage in Search Console",
      "Cross functional HTML/CSS/JS collaboration with dev teams for implementation accuracy",
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
      "Entity and knowledge graph signals through Wikipedia alignment, brand mentions, and structured references",
      "LocalBusiness and GeoCoordinates schema implementation for local SERP features",
      "Brand visibility campaigns combining organic, GBP, and off site authority building",
    ],
  },
  {
    number: "04",
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Analytics & Revenue Attribution",
    summary: "GA4 custom events, GTM configuration, organic conversion tracking, ecommerce revenue reporting.",
    detail: [
      "GA4 custom event configuration for micro and macro conversion tracking",
      "GTM container management with trigger setup, variable configuration, and tag auditing",
      "Organic channel attribution segmentation in GA4 and Looker Studio",
      "Ecommerce revenue reporting tied to organic search performance and keyword level ROI",
      "Monthly performance dashboards tracking impressions, clicks, conversions, and revenue",
    ],
  },
];

const CLIENT_LOGOS = [
  { name: "Regent Business School", src: "/client-logos/regent-business-school.png" },
  { name: "PSG", src: "/client-logos/psg.png" },
  { name: "Lenmed", src: "/client-logos/lenmed.png" },
  { name: "Doctors Without Borders", src: "/client-logos/doctors-without-borders.png" },
  { name: "Automark", src: "/client-logos/automark.png" },
  { name: "Lexus Pre-Owned", src: "/client-logos/lexus-pre-owned.png" },
  { name: "Computer Mania", src: "/client-logos/computer-mania.png" },
  { name: "The Capital", src: "/client-logos/the-capital.png" },
  { name: "Seabourne Logistics", src: "/client-logos/seabourne-logistics.png" },
  { name: "The Courier Guy", src: "/client-logos/the-courier-guy.png" },
];

const AVAILABILITY = [
  {
    label: "Employment",
    title: "Full time and part time roles",
    detail: "For teams that need Organic Search capability embedded into planning, implementation, and reporting.",
  },
  {
    label: "Freelance",
    title: "Independent SEO projects",
    detail: "For brands or agencies that need focused support across technical SEO, AI visibility, and organic growth systems.",
  },
  {
    label: "Contract",
    title: "Short and medium term support",
    detail: "For delivery sprints where technical change needs to turn into measurable organic impact.",
  },
  {
    label: "Location fit",
    title: "Remote UK and EU work",
    detail: "Available for remote collaboration with teams operating in UK, EU, South African, or similar time zones.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo path="/about" />
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

        {/* ─── HERO ─── */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative border-b border-border overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_22%,hsl(var(--primary)/0.14),transparent_32%),linear-gradient(135deg,transparent_0_62%,hsl(var(--primary)/0.07)_62%_78%,transparent_78%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.72fr)] gap-8 lg:gap-14 items-center py-14 md:py-20 lg:py-24">
            <div className="flex flex-col justify-center">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6 font-mono text-xs text-primary uppercase tracking-widest">
                <span className="w-6 h-px bg-primary" />
                About
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.92] mb-8 max-w-3xl">
                Hi, I'm<br />
                <span className="text-primary">Morgan Mngadi.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
                I specialise in organic growth systems, combining technical SEO, search strategy, local authority optimisation, and revenue attribution to drive measurable business outcomes.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                {["Technical SEO", "Search Strategy", "GA4 & GTM", "Local Authority"].map((item) => (
                  <span key={item} className="border border-border bg-background/70 px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur">
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              className="relative mx-auto flex h-[360px] w-full max-w-[420px] items-end justify-center overflow-hidden border border-border bg-card/60 md:h-[430px] lg:h-[560px] lg:max-w-none"
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0_44%,hsl(var(--primary)/0.08)_44%_67%,transparent_67%),radial-gradient(circle_at_50%_18%,hsl(var(--primary)/0.10),transparent_42%)]" />
              <div className="absolute inset-x-8 bottom-0 h-px bg-primary/30" />
              <img
                src="/morgan-photo.png"
                alt="Morgan Mngadi"
                className="relative z-10 w-[min(92vw,390px)] translate-y-5 object-contain object-bottom md:w-[410px] lg:w-[min(36vw,500px)]"
                style={{ filter: "grayscale(12%) brightness(0.96)" }}
              />
            </motion.div>
          </div>

          <motion.div variants={stagger} className="relative z-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-border bg-background/90 backdrop-blur">
            {[
              { value: "3+", label: "Years active" },
              { value: "15+", label: "Clients worked with" },
              { value: "R700k+", label: "Monthly organic ecommerce revenue" },
              { value: "200k+", label: "Organic clicks in 72 hrs" },
              { value: "14+", label: "Industries served" },
              { value: "2x", label: "Award contributions" },
            ].map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="min-h-[108px] border-r border-b border-border p-5 last:border-r-0 lg:border-b-0">
                <span className="text-3xl font-medium text-primary tabular-nums">{s.value}</span>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mt-2 block leading-tight">{s.label}</span>
              </motion.div>
            ))}
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
                A structured four pillar system where each discipline reinforces the others to build compounding organic results.
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
              Examples of clients I've worked with:
            </motion.p>
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground font-mono mb-10">
              This is a sample of client work from agency-led SEO projects.
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-border border border-border">
              {CLIENT_LOGOS.map((client) => (
                <motion.div
                  key={client.name}
                  variants={fadeUp}
                  className="bg-card flex items-center justify-center px-6 py-8 min-h-[120px] group hover:bg-primary/5 transition-colors"
                >
                  <img
                    src={client.src}
                    alt={`${client.name} logo`}
                    className="max-h-14 w-full max-w-[180px] object-contain opacity-80 transition-opacity group-hover:opacity-100"
                    loading="lazy"
                  />
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
              Open to employment, freelance, and contract work focused on bringing measurable organic growth to ambitious teams.
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
              {AVAILABILITY.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="group relative border border-border bg-card p-5 hover:border-primary transition-colors overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary">{item.label}</span>
                  <h3 className="mt-3 font-medium text-base">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
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
                Let's turn technical search<br />into measurable growth.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground">
                Open to employment, freelance, and contract Organic Search work focused on AI visibility, technical SEO implementation, and organic ROI across leads and purchases.
              </motion.p>
            </div>
            <motion.div variants={stagger} className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <motion.a
                variants={fadeUp}
                href="mailto:morganmngadi@gmail.com"
                className="flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                <Mail className="w-4 h-4 shrink-0" />
                Email me
              </motion.a>
              <motion.a
                variants={fadeUp}
                href="https://www.linkedin.com/in/morgan-mngadi/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 border border-border text-foreground hover:border-primary hover:text-primary transition-colors font-medium"
              >
                <ArrowUpRight className="w-4 h-4 shrink-0" />
                LinkedIn
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

      </div>
      <SiteFooter />
    </div>
  );
}
