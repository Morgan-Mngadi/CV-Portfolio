import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Award, TrendingUp, Zap, Globe, BarChart3 } from "lucide-react";
import { Link } from "wouter";
import logoSrc from "@assets/5259D053-7FB7-4BC6-92C7-D625ADDC9985_1779213029285.png";
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

const PILLARS = [
  {
    number: "01",
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Organic Growth Strategy",
    desc: "Intent mapping, content systems, YouTube integration, SERP optimisation, AI Overview structuring.",
  },
  {
    number: "02",
    icon: <Zap className="w-5 h-5" />,
    title: "Technical Search Infrastructure",
    desc: "Crawl optimisation, canonicalisation, duplication resolution, schema, indexation control, HTML/CSS/JS collaboration.",
  },
  {
    number: "03",
    icon: <Globe className="w-5 h-5" />,
    title: "Local & Authority Systems",
    desc: "Google Business Profile, Bing Places, entity signals, local schema, brand visibility.",
  },
  {
    number: "04",
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Analytics & Revenue Attribution",
    desc: "GA4 custom events, GTM configuration, organic conversion tracking, eCommerce revenue reporting.",
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
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Morgan Mngadi logo" className="h-7 w-7 object-contain opacity-80" />
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">About</Link>
            <a href="#tools" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Stack</a>
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
          className="border-b border-border grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0"
        >
          <div className="py-16 lg:py-24 lg:pr-16 border-r border-border">
            <motion.div variants={fadeUp} className="mb-6">
              <img src={logoSrc} alt="Morgan Mngadi" className="h-12 w-12 object-contain opacity-70" />
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6 font-mono text-xs text-primary uppercase tracking-widest">
              <span className="w-6 h-px bg-primary" />
              SEO Specialist · Johannesburg, ZA
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9] mb-8">
              Morgan<br />
              <span className="text-primary">Mngadi</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              SEO strategist with agency and enterprise experience. I build scalable visibility — from audits to architecture.
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
              { label: "Clients worked with", value: "15+" },
              { label: "Industries served", value: "14+" },
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
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
              Experienced in collaborating with development teams to implement SEO recommendations effectively across multiple CMS platforms. Strong interest in systems-driven SEO and scalable implementation across agency and enterprise environments.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/about" className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:underline uppercase tracking-widest">
                Full profile <ArrowUpRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* ─── IMPACT METRICS ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-12">
            02 / Impact Metrics
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              {
                value: "R700,000+",
                label: "Organic eCommerce Revenue",
                sub: "Attributed directly to organic search campaigns",
              },
              {
                value: "200,000+",
                label: "Organic Clicks in 72 Hours",
                sub: "Peak organic traffic driven within a 72-hour window",
              },
              {
                value: "30 Days",
                label: "AI Overview Visibility",
                sub: "Achieved AI Overview presence within 30 days of optimisation",
              },
            ].map((metric) => (
              <motion.div
                key={metric.label}
                variants={fadeUp}
                className="group relative p-8 md:p-10 bg-card hover:bg-primary/5 transition-colors overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-4xl md:text-5xl font-medium text-primary tabular-nums mb-3 tracking-tight">{metric.value}</div>
                <div className="font-medium mb-2">{metric.label}</div>
                <div className="font-mono text-xs text-muted-foreground leading-relaxed">{metric.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ─── CERTIFICATIONS ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16"
        >
          <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
            03 / Certifications
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: "Google Analytics 4",
                issuer: "Google",
                desc: "Certified in GA4 measurement, event tracking, reporting and audience configuration.",
                badge: "GA4",
              },
              {
                name: "Google Business Profile",
                issuer: "Google",
                desc: "Certified in managing and optimising Google Business Profiles for local search visibility.",
                badge: "GBP",
              },
            ].map((cert) => (
              <motion.div
                key={cert.name}
                variants={fadeUp}
                className="group relative border border-border bg-card p-6 hover:border-primary transition-colors overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-10 h-10 rounded border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0">
                    <span className="font-mono text-[10px] font-medium text-primary leading-tight text-center">{cert.badge}</span>
                  </div>
                  <span className="font-mono text-xs text-primary border border-primary/30 bg-primary/5 px-2 py-0.5 self-start">Certified</span>
                </div>
                <h3 className="font-medium mb-1">{cert.name}</h3>
                <p className="font-mono text-xs text-muted-foreground mb-3">{cert.issuer}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{cert.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ─── 4-PILLAR FRAMEWORK ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-12">
            <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              04 / Framework
            </motion.div>
            <div>
              <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-medium leading-tight mb-3">
                How I Drive Organic Growth
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                A four-pillar system built for measurable, compounding results — from search infrastructure to revenue attribution.
              </motion.p>
            </div>
          </div>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PILLARS.map((pillar) => (
              <motion.div
                key={pillar.number}
                variants={fadeUp}
                className="group relative border border-border bg-card p-8 hover:border-primary transition-colors overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-9 h-9 border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 text-primary">
                    {pillar.icon}
                  </div>
                  <span className="font-mono text-xs text-muted-foreground self-center">{pillar.number}</span>
                </div>
                <h3 className="font-medium text-lg mb-3">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>
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
            05 / Industries
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-12">
            <motion.p variants={fadeUp} className="text-muted-foreground text-sm leading-relaxed lg:pt-1">
              Delivered SEO across 14 distinct verticals — from regulated financial services to enterprise telecoms, retail, and beyond.
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { name: "Finance", desc: "Regulatory-aware SEO for financial services clients" },
                { name: "Tertiary Education", desc: "Lead-driven organic strategies for universities and colleges" },
                { name: "Humanitarian / NPO", desc: "Purpose-led SEO for NGO and non-profit organisations" },
                { name: "Courier & Logistics", desc: "Local and national visibility for courier brands" },
                { name: "Hospitality", desc: "Discovery and booking-focused SEO for hospitality groups" },
                { name: "Automotive", desc: "High-competition SEO in the automotive sector" },
                { name: "Telecommunications", desc: "Enterprise-level SEO for a major telecoms group" },
                { name: "Industrial Machinery", desc: "B2B SEO for industrial and manufacturing equipment brands" },
                { name: "Medical", desc: "Trust-first SEO strategies for healthcare and medical providers" },
                { name: "Entertainment", desc: "Audience-growth SEO for entertainment and media brands" },
                { name: "Retail", desc: "In-store and online visibility for retail brands" },
                { name: "Ecommerce", desc: "Product and category SEO driving conversions at scale" },
                { name: "Technology", desc: "SaaS and tech product SEO with a focus on authority building" },
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
            <span className="text-5xl font-medium text-primary tabular-nums shrink-0">15+</span>
            <div>
              <p className="font-medium">Clients worked with</p>
              <p className="text-sm text-muted-foreground font-mono mt-0.5">Across agency and enterprise engagements — from growing brands to FTSE-listed corporates</p>
            </div>
          </motion.div>
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
            06 / Project
          </motion.div>

          <Link href="/projects/commuteza">
          <motion.div
            variants={fadeUp}
            className="group block relative overflow-hidden border border-border hover:border-primary transition-all duration-500 bg-card cursor-pointer"
            data-testid="link-commuteza"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors duration-500" />

            <div className="relative p-8 md:p-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl md:text-3xl font-medium group-hover:text-primary transition-colors">CommuteZA</h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="font-mono text-sm text-muted-foreground mb-6">Routing Web App for South African Commuters · Jan 2026 – Present</p>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8">
                  Self-initiated project built to deepen SEO and systems understanding from the ground up. Implements a headless CMS architecture to manage metadata, structured data, redirect logic and URL structuring with full control over rendering behaviour. Refining SSR approach to ensure optimal crawlability and indexation.
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
                  View project →
                </span>
              </div>
            </div>
          </motion.div>
          </Link>
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
            07 / Tooling & Stack
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 divide-border border border-border">
            <motion.div variants={fadeUp} className="p-8 md:border-r border-border md:border-b border-b">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-5">Daily Operations</h3>
              <div className="flex flex-wrap gap-2">
                {DAILY_TOOLS.map((t) => <ToolPill key={t.name} {...t} />)}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-8 md:border-b border-b">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-5">CMS Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {CMS_TOOLS.map((t) => <ToolPill key={t.name} {...t} />)}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-8 md:border-r border-border">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-5">AI & Workflows</h3>
              <div className="flex flex-wrap gap-2">
                {AI_TOOLS.map((t) => <ToolPill key={t.name} {...t} />)}
              </div>
            </motion.div>

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
                08 / Contact
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
