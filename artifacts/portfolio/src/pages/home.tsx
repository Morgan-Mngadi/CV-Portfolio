import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, MapPin, Award, ExternalLink } from "lucide-react";
import {
  SiGoogleanalytics,
  SiGoogletagmanager,
  SiGooglesearchconsole,
  SiSemrush,
  SiWordpress,
  SiWebflow,
  SiUmbraco,
  SiOpenai,
} from "react-icons/si";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const DAILY_TOOLS = [
  { name: "Google Analytics 4", icon: <SiGoogleanalytics /> },
  { name: "Google Tag Manager", icon: <SiGoogletagmanager /> },
  { name: "Google Search Console", icon: <SiGooglesearchconsole /> },
  { name: "SEMrush", icon: <SiSemrush /> },
  { name: "Screaming Frog", icon: null },
  { name: "Looker Studio", icon: null },
  { name: "PageSpeed Insights", icon: null },
  { name: "Bing Webmaster Tools", icon: null },
  { name: "Keyword Planner", icon: null },
  { name: "Google Trends", icon: null },
];

const CMS_TOOLS = [
  { name: "WordPress", icon: <SiWordpress /> },
  { name: "Webflow", icon: <SiWebflow /> },
  { name: "Umbraco", icon: <SiUmbraco /> },
  { name: "Pimcore", icon: null },
  { name: "Headless CMS", icon: null },
];

const AI_TOOLS = [
  { name: "ChatGPT", icon: <SiOpenai /> },
  { name: "Gemini", icon: null },
  { name: "Copilot", icon: null },
  { name: "Perplexity AI", icon: null },
];

const LOCAL_SEO = [
  { name: "Google Business Profiles", icon: null },
  { name: "Bing Places", icon: null },
];

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

function ToolPill({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border text-xs font-mono text-muted-foreground hover:border-primary hover:text-foreground transition-colors whitespace-nowrap">
      {icon && <span className="text-primary opacity-80">{icon}</span>}
      {name}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Subtle grid background */}
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
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Morgan Mngadi
          </span>
          <div className="flex items-center gap-6">
            <a href="#experience" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Work</a>
            <a href="#tools" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Stack</a>
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
          className="border-b border-border grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0"
        >
          <div className="py-16 lg:py-24 lg:pr-16 border-r border-border">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6 font-mono text-xs text-primary uppercase tracking-widest">
              <span className="w-6 h-px bg-primary" />
              SEO Specialist · Johannesburg, ZA
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9] mb-8">
              Morgan<br />
              <span className="text-primary">Mngadi</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Technical SEO strategist with agency and enterprise experience. I build scalable visibility — from audits to architecture.
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-3 mt-8">
              <a href="mailto:morganmngadi@gmail.com" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                <Mail className="w-4 h-4" /> Get in touch
              </a>
              <a href="https://commuteza.co.za/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-mono text-muted-foreground hover:border-foreground hover:text-foreground transition-colors">
                View project <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Stat sidebar */}
          <motion.div variants={stagger} className="lg:w-64 py-16 lg:pl-10 flex flex-col justify-between gap-8">
            {[
              { label: "Years active", value: "3+" },
              { label: "Clients worked with", value: "10+" },
              { label: "Industries served", value: "7+" },
              { label: "Award honours", value: "2×" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="flex flex-col">
                <span className="text-4xl font-medium text-primary tabular-nums">{stat.value}</span>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ─── ABOUT ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16"
        >
          <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
            01 / About
          </motion.div>
          <div>
            <motion.p variants={fadeUp} className="text-2xl md:text-3xl font-medium leading-tight mb-6 max-w-3xl">
              SEO specialist focused on business impact — combining technical depth with strategic thinking.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed max-w-2xl">
              Experienced in collaborating with development teams to implement SEO recommendations effectively across multiple CMS platforms. Strong interest in systems-driven SEO and scalable implementation across agency and enterprise environments.
            </motion.p>
          </div>
        </motion.section>

        {/* ─── INDUSTRIES ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-12">
            02 / Industries
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-12">
            <motion.p variants={fadeUp} className="text-muted-foreground text-sm leading-relaxed lg:pt-1">
              Delivered SEO across 7 distinct verticals — from regulated financial services to humanitarian organisations and enterprise telecoms.
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { name: "Finance", desc: "Regulatory-aware SEO for financial services clients" },
                { name: "Tertiary Education", desc: "Lead-driven organic strategies for universities and colleges" },
                { name: "Humanitarian", desc: "Purpose-led SEO for NGO and non-profit organisations" },
                { name: "Courier & Logistics", desc: "Local and national visibility for courier brands" },
                { name: "Hospitality", desc: "Discovery and booking-focused SEO for hospitality groups" },
                { name: "Automotive", desc: "High-competition SEO in the automotive sector" },
                { name: "Telecommunications", desc: "Enterprise-level SEO for a major telecoms group" },
              ].map((industry) => (
                <motion.div
                  key={industry.name}
                  variants={fadeUp}
                  title={industry.desc}
                  className="group relative p-4 bg-card border border-border hover:border-primary transition-colors cursor-default"
                >
                  <div className="absolute top-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  <span className="text-sm font-medium block leading-tight">{industry.name}</span>
                  <span className="text-xs text-muted-foreground font-mono mt-1.5 block leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-x-4 top-10 bottom-4 overflow-hidden">{industry.desc}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Client count callout */}
          <motion.div
            variants={fadeUp}
            className="border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <span className="text-5xl font-medium text-primary tabular-nums shrink-0">10+</span>
            <div>
              <p className="font-medium">Clients worked with</p>
              <p className="text-sm text-muted-foreground font-mono mt-0.5">Across agency and enterprise engagements — from growing brands to FTSE-listed corporates</p>
            </div>
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
            03 / Experience
          </motion.div>

          <div className="flex flex-col divide-y divide-border">
            {EXPERIENCE.map((exp) => (
              <motion.div
                key={exp.company}
                variants={fadeUp}
                className="py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-12 group"
              >
                {/* Left column */}
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

                {/* Right column */}
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

        {/* ─── PROJECT ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-12">
            04 / Project
          </motion.div>

          <motion.a
            variants={fadeUp}
            href="https://commuteza.co.za/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative overflow-hidden border border-border hover:border-primary transition-all duration-500 bg-card"
            data-testid="link-commuteza"
          >
            {/* Accent corner */}
            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors duration-500" />

            <div className="relative p-8 md:p-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl md:text-3xl font-medium group-hover:text-primary transition-colors">CommuteZA</h3>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="font-mono text-sm text-muted-foreground mb-6">Routing Web App for South African Commuters · Jan 2026 – Present</p>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8">
                  Self-initiated project built to deepen technical SEO and systems understanding from the ground up. Implements a headless CMS architecture to manage metadata, structured data, redirect logic and URL structuring with full control over rendering behaviour. Refining SSR approach to ensure optimal crawlability and indexation.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Headless CMS", "Server-side Rendering", "Structured Data", "Technical SEO", "Redirect Logic"].map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 bg-background border border-border text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:text-right">
                <span className="font-mono text-xs text-primary border border-primary/30 bg-primary/5 px-3 py-1.5 inline-block">
                  Live ↗
                </span>
              </div>
            </div>
          </motion.a>
        </motion.section>

        {/* ─── TOOLS ─── */}
        <motion.section
          id="tools"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-12">
            05 / Tooling & Stack
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 divide-border border border-border">
            {/* Daily */}
            <motion.div variants={fadeUp} className="p-8 md:border-r border-border md:border-b border-b">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-5">Daily Operations</h3>
              <div className="flex flex-wrap gap-2">
                {DAILY_TOOLS.map((t) => <ToolPill key={t.name} {...t} />)}
              </div>
            </motion.div>

            {/* CMS */}
            <motion.div variants={fadeUp} className="p-8 md:border-b border-b">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-5">CMS Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {CMS_TOOLS.map((t) => <ToolPill key={t.name} {...t} />)}
              </div>
            </motion.div>

            {/* AI */}
            <motion.div variants={fadeUp} className="p-8 md:border-r border-border">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-5">AI & Workflows</h3>
              <div className="flex flex-wrap gap-2">
                {AI_TOOLS.map((t) => <ToolPill key={t.name} {...t} />)}
              </div>
            </motion.div>

            {/* Local */}
            <motion.div variants={fadeUp} className="p-8">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-5">Local SEO</h3>
              <div className="flex flex-wrap gap-2">
                {LOCAL_SEO.map((t) => <ToolPill key={t.name} {...t} />)}
              </div>
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
                06 / Contact
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
                data-testid="link-email"
                className="flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                <Mail className="w-4 h-4 shrink-0" />
                morganmngadi@gmail.com
              </motion.a>
              <motion.a
                variants={fadeUp}
                href="tel:0762878982"
                data-testid="link-phone"
                className="flex items-center gap-3 px-6 py-4 border border-border hover:border-foreground transition-colors font-mono text-sm"
              >
                <Phone className="w-4 h-4 shrink-0" />
                (076) 287 8982
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-20 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground"
          >
            <span>© {new Date().getFullYear()} Morgan Mngadi</span>
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
