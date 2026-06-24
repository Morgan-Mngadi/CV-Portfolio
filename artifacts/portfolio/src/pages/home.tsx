import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Mail, Award, TrendingUp, Zap, Globe, BarChart3, Send } from "lucide-react";
import { Link } from "wouter";
import logoSrc from "@assets/5259D053-7FB7-4BC6-92C7-D625ADDC9985_1779213029285.png";
import { Seo } from "@/components/seo";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
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

const WORK_WITH_ME = [
  {
    title: "Organic Growth Systems",
    description:
      "Search strategy shaped around intent, technical foundations, content architecture, and measurable business outcomes.",
    bestFor: "Strategy, search demand, business impact",
  },
  {
    title: "Technical SEO & Implementation",
    description:
      "Hands-on technical SEO across metadata, schema, redirects, indexation, CMS workflows, rendering, and QA.",
    bestFor: "Crawlability, structured data, technical change",
  },
  {
    title: "Analytics, GTM & GA4",
    description:
      "Measurement systems that connect organic visibility to events, leads, revenue, dashboards, and decision-making.",
    bestFor: "GA4, GTM, Looker Studio, attribution",
  },
];

const PRODUCT_SYSTEMS = [
  {
    label: "Product",
    title: "CommuteZA",
    detail: "A South African commuter routing product used to test search architecture, structured data, redirects, and measurement from the ground up.",
  },
  {
    label: "Measurement",
    title: "Lead Tracking Systems",
    detail: "GTM and GA4 setups for form submissions, email clicks, booking actions, and page-level lead reporting.",
  },
  {
    label: "Search",
    title: "AI Visibility & Technical SEO",
    detail: "Experiments around AI Overviews, structured content, entity clarity, indexation, and search performance reporting.",
  },
  {
    label: "Reporting",
    title: "Organic Performance Dashboards",
    detail: "Search Console, GA4, GTM, and Looker Studio views designed to explain what changed, why it changed, and what to do next.",
  },
];

const CONTACT_REASONS = ["Networking", "Collaboration", "Industry discussion", "Project or product conversation", "CommuteZA"];
const WEB3FORMS_ACCESS_KEY = "f1c27f4e-67b3-4262-a419-127bda6406d0";
const RECAPTCHA_SITE_KEY = (import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "").trim();
const RECAPTCHA_ACTION = "contact_submit";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

function ToolPill({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border text-xs font-mono text-muted-foreground hover:border-primary hover:text-foreground transition-colors whitespace-nowrap">
      {icon && <span className="text-primary opacity-80">{icon}</span>}
      {name}
    </span>
  );
}

export default function Home() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || document.querySelector('script[data-recaptcha-v3="true"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}`;
    script.async = true;
    script.defer = true;
    script.dataset.recaptchaV3 = "true";
    document.head.appendChild(script);
  }, []);

  const getRecaptchaToken = () =>
    new Promise<string | null>((resolve) => {
      if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) {
        resolve(null);
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          ?.execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION })
          .then(resolve)
          .catch(() => resolve(null));
      });
    });

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("idle");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const reason = String(formData.get("reason") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const recaptchaToken = await getRecaptchaToken();

    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      const messageInput = form.elements.namedItem("message") as HTMLTextAreaElement | null;
      messageInput?.setCustomValidity("reCAPTCHA could not verify this submission. Please try again.");
      messageInput?.reportValidity();
      return;
    }

    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `${reason || "Portfolio message"} from ${name || "MorganMngadi.com"}`);
    formData.append("from_name", "Morgan Mngadi Portfolio");
    formData.append("replyto", email);

    if (recaptchaToken) {
      formData.append("recaptcha_action", RECAPTCHA_ACTION);
      formData.append("recaptcha_token", recaptchaToken);
    }

    setFormStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error("Form submission failed.");
      }

      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo path="/" />
      {/* Subtle grid background */}
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
          className="border-b border-border grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0"
        >
          <div className="py-16 lg:py-24 lg:pr-16 border-r border-border">
            <motion.div variants={fadeUp} className="mb-6">
              <img src={logoSrc} alt="Morgan Mngadi" className="h-16 w-16 object-contain opacity-80" />
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
              SEO professional and builder focused on technical search infrastructure, analytics, organic growth, and digital products.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                <Mail className="w-4 h-4" /> Get in Touch
              </a>
              <a href="https://commuteza.co.za/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-mono text-muted-foreground hover:border-foreground hover:text-foreground transition-colors">
                View CommuteZA <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Stat sidebar */}
          <motion.div variants={stagger} className="lg:w-64 py-16 lg:pl-10 flex flex-col justify-between gap-8">
            {[
              { label: "Years active", value: "3+" },
              { label: "Clients worked with", value: "15+" },
              { label: "Industries served", value: "14+" },
              { label: "Award contributions", value: "2×" },
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
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-medium leading-tight mb-6 max-w-3xl">
              Technical SEO and analytics specialist building search systems that connect visibility, product thinking, and measurable business impact.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
              My work sits across technical SEO, GA4, GTM, organic growth strategy, reporting, and digital product experimentation. CommuteZA is the clearest example: a self-built product used to test SEO architecture, structured data, redirect logic, and measurement systems in a controlled environment.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/about" className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:underline uppercase tracking-widest">
                View Profile <ArrowUpRight className="w-3 h-3" />
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
          <motion.h2 variants={fadeUp} className="sr-only">
            Impact Metrics
          </motion.h2>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              {
                value: "R700,000+",
                label: "Monthly Organic Ecommerce Revenue",
                sub: "Monthly revenue impact attributed directly to organic search campaigns",
              },
              {
                value: "200,000+",
                label: "Organic Clicks in 72 Hours",
                sub: "Peak organic traffic driven within a 72 hour window",
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
          <motion.h2 variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
            03 / Certifications
          </motion.h2>
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
              {
                name: "Semrush Certification",
                issuer: "Semrush",
                desc: "Certified in using Semrush for SEO research, analysis and performance optimisation.",
                badge: "SEO",
              },
              {
                name: "HTML, CSS and JavaScript",
                issuer: "IBM",
                desc: "Certified in the core web technologies used to build responsive, interactive websites.",
                badge: "WEB",
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

        {/* 4 PILLAR FRAMEWORK */}
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
                A four pillar system built for measurable, compounding results from search infrastructure to revenue attribution.
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
              Delivered SEO across 14 distinct verticals, including regulated financial services, telecoms, retail, and beyond.
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { name: "Finance", desc: "Regulatory aware SEO for financial services clients" },
                { name: "Tertiary Education", desc: "Lead driven organic strategies for universities and colleges" },
                { name: "Humanitarian / NPO", desc: "Purpose led SEO for NGO and nonprofit organisations" },
                { name: "Courier & Logistics", desc: "Local and national visibility for courier brands" },
                { name: "Hospitality", desc: "Discovery and booking focused SEO for hospitality groups" },
                { name: "Automotive", desc: "High competition SEO in the automotive sector" },
                { name: "Telecommunications", desc: "Enterprise level SEO for a major telecoms group" },
                { name: "Industrial Machinery", desc: "B2B SEO for industrial and manufacturing equipment brands" },
                { name: "Medical", desc: "Trust first SEO strategies for healthcare and medical providers" },
                { name: "Entertainment", desc: "Audience growth SEO for entertainment and media brands" },
                { name: "Retail", desc: "In store and online visibility for retail brands" },
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
              <p className="text-sm text-muted-foreground font-mono mt-0.5">Across agency led client work for growing brands and established organisations.</p>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── CLIENTS ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-12">
            <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              06 / Clients
            </motion.div>
            <div>
              <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-medium leading-tight mb-3">
                Examples of clients I've worked with:
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm text-muted-foreground font-mono">
                A sample of client work from agency led SEO projects.
              </motion.p>
            </div>
          </div>

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
                  title={client.name}
                  className="max-h-14 w-full max-w-[180px] object-contain opacity-80 transition-opacity group-hover:opacity-100"
                  loading="lazy"
                />
              </motion.div>
            ))}
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
            07 / Project
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
                <p className="font-mono text-sm text-muted-foreground mb-6">Routing Web App for South African Commuters · Jan 2026 to Present</p>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8">
                  Self initiated project built to deepen SEO and systems understanding from the ground up. Implements a headless CMS architecture to manage metadata, structured data, redirect logic and URL structuring with full control over rendering behaviour. Currently working on the redirect logic in the CMS and looking to add pricing info.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Headless CMS", "Server side Rendering", "Structured Data", "Technical SEO", "Redirect Logic"].map((t) => (
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

        {/* ─── PRODUCT SYSTEMS ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-12">
            <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              08 / Product Systems
            </motion.div>
            <div>
              <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-medium leading-tight mb-4 max-w-2xl">
                Builder Mindset Across Search, Analytics, and Product
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                Beyond client and agency work, I use digital products and measurement projects to explore how technical SEO decisions shape discoverability, user journeys, and reporting clarity.
              </motion.p>
            </div>
          </div>

          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {PRODUCT_SYSTEMS.map((role) => (
              <motion.div
                key={role.label}
                variants={fadeUp}
                className="group relative bg-card p-6 md:p-7 hover:bg-primary/5 transition-colors overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-primary">{role.label}</span>
                <h3 className="mt-4 font-medium text-base leading-snug">{role.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{role.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* AREAS OF EXPERTISE */}
        <motion.section
          id="areas-of-expertise"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-12">
            <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              09 / Areas of Expertise
            </motion.div>
            <div>
              <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-medium leading-tight mb-4 max-w-2xl">
                Core Disciplines Across SEO, Analytics, and Organic Growth
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                The site is organised around the areas I continue to build depth in: technical SEO, GTM, GA4, organic measurement, AI visibility, reporting, and product-led search systems.
              </motion.p>
            </div>
          </div>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {WORK_WITH_ME.map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="bg-card p-6 md:p-8">
                <h3 className="text-lg font-medium mb-4">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{item.description}</p>
                <div className="font-mono text-xs uppercase tracking-widest text-primary">{item.bestFor}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/areas-of-expertise"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-sm font-mono text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              Explore Areas of Expertise <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
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
            10 / Tooling & Stack
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-medium leading-tight mb-6 max-w-2xl">
            Tools and Platforms Behind the Work
          </motion.h2>

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
          className="scroll-mt-16 py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                11 / Contact
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
                Let’s Connect Around Search,<br />Analytics, and Digital Products.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground">
                Use the form for networking, collaborations, industry discussions, product conversations, or thoughtful conversations connected to SEO, analytics, GTM, GA4, organic growth, and CommuteZA.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="border border-border bg-card p-5 md:p-6">
              <form id="form-submission" className="grid gap-4" onSubmit={handleContactSubmit}>
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="grid gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      Name <span aria-hidden="true" className="text-primary">*</span>
                    </span>
                    <input
                      name="name"
                      required
                      className="h-11 border border-border bg-background px-3 text-sm text-foreground shadow-none outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                      autoComplete="name"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      Email <span aria-hidden="true" className="text-primary">*</span>
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="h-11 border border-border bg-background px-3 text-sm text-foreground shadow-none outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                      autoComplete="email"
                      onInput={(event) => event.currentTarget.setCustomValidity("")}
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    Reason <span aria-hidden="true" className="text-primary">*</span>
                  </span>
                  <select
                    name="reason"
                    required
                    defaultValue=""
                    className="h-11 border border-border bg-background px-3 text-sm text-foreground shadow-none outline-none transition-colors focus:border-primary"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {CONTACT_REASONS.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    Message <span aria-hidden="true" className="text-primary">*</span>
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="min-h-32 resize-y border border-border bg-background px-3 py-3 text-sm text-foreground shadow-none outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                    onInput={(event) => event.currentTarget.setCustomValidity("")}
                  />
                </label>

                <button
                  id="lead-enquiry-submit"
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                  {formStatus === "submitting" ? "Sending..." : "Start a conversation"}
                </button>

                {formStatus === "success" && (
                  <p id="lead-enquiry-success" className="font-mono text-xs leading-relaxed text-primary">
                    Thanks. Your message has been sent.
                  </p>
                )}

                {formStatus === "error" && (
                  <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                    Something went wrong. Please use the email link below.
                  </p>
                )}
              </form>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a
                  id="home-contact-email"
                  href="mailto:morganmngadi@gmail.com"
                  data-testid="link-email"
                  className="flex items-center justify-center gap-2 border border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/morgan-mngadi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>

      </div>
      <SiteFooter />
    </div>
  );
}
