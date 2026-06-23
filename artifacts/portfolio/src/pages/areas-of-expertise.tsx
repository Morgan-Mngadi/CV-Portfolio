import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Mail } from "lucide-react";
import { Seo } from "@/components/seo";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

const fadeUp = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const EXPERTISE_AREAS = [
  {
    title: "Organic Growth Strategy",
    fit: "Search strategy connected to business impact, content systems, and measurable organic outcomes.",
    body:
      "My approach to organic growth combines intent mapping, technical foundations, SERP analysis, AI visibility, and content architecture. The aim is to make search activity easier to prioritise, execute, and measure.",
    focus: ["Search intent", "Content architecture", "AI visibility", "Organic ROI"],
    includes: [
      "Keyword and intent mapping aligned to business questions",
      "Search Console analysis and opportunity sizing",
      "AI Overview and answer engine visibility thinking",
      "Organic performance reporting tied to outcomes",
    ],
  },
  {
    title: "Technical SEO Implementation",
    fit: "Hands-on technical SEO across crawlability, metadata, structured data, CMS workflows, and QA.",
    body:
      "I work close to implementation details: templates, metadata, redirects, canonicals, structured data, indexation, and development handoff. This is where recommendations become visible site changes.",
    focus: ["Technical audits", "Schema", "CMS implementation", "Indexation"],
    includes: [
      "Metadata, schema, and internal linking updates",
      "Redirect, canonical, and indexation support",
      "CMS implementation across WordPress, Webflow, Umbraco, and headless setups",
      "QA of deployed SEO changes and reporting impact",
    ],
  },
  {
    title: "Analytics, GTM, and GA4",
    fit: "Measurement systems that explain how organic visibility becomes engagement, leads, purchases, and decisions.",
    body:
      "Analytics is part of the SEO system. I use GA4, GTM, Search Console, and Looker Studio to connect events, key actions, page performance, and business questions into clearer reporting.",
    focus: ["GA4", "GTM", "Looker Studio", "Lead tracking"],
    includes: [
      "GA4, Google Search Console, and GTM review",
      "Organic lead and ecommerce reporting structure",
      "AI platform referral visibility where data is available",
      "Dashboards and commentary that explain performance changes",
    ],
  },
  {
    title: "Digital Products and CommuteZA",
    fit: "Product thinking applied to search architecture, local information systems, and measurement.",
    body:
      "CommuteZA is where I test the relationship between product structure and search performance. It gives me a controlled environment for rendering, metadata, schema, redirect logic, local discovery, and analytics.",
    focus: ["CommuteZA", "Product SEO", "Local search", "Structured data"],
    includes: [
      "Headless CMS architecture and metadata systems",
      "Route and location page search considerations",
      "Structured data and redirect logic experiments",
      "GA4, GTM, Search Console, and AI visibility review",
    ],
  },
];

const FAQS = [
  {
    question: "Why frame this as areas of expertise?",
    answer:
      "This page is designed as a professional map of how I think and work across SEO, analytics, technical implementation, reporting, and product-led growth.",
  },
  {
    question: "How does analytics connect to SEO?",
    answer:
      "Analytics connects search visibility to what users do afterwards. GA4, GTM, Search Console, and Looker Studio help translate impressions and clicks into engagement, leads, purchases, and business context.",
  },
  {
    question: "What does CommuteZA show about your work?",
    answer:
      "CommuteZA shows how I approach search architecture when I can own the full system: URLs, metadata, rendering, schema, redirect logic, reporting, and product decisions.",
  },
  {
    question: "Can people contact you about collaborations or conversations?",
    answer:
      "Yes. The contact links are open for networking, collaborations, industry discussions, product conversations, and relevant conversations.",
  },
];

export default function AreasOfExpertise() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo path="/areas-of-expertise" />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <SiteNav />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-12">
        <motion.section initial="hidden" animate="visible" variants={stagger} className="border-b border-border py-16 lg:py-24">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6 font-mono text-xs text-primary uppercase tracking-widest">
            <span className="w-6 h-px bg-primary" />
            Areas of Expertise
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.95] mb-8 max-w-4xl">
            SEO, analytics, technical implementation, and product-led organic growth.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A closer look at the disciplines that shape my portfolio: Technical SEO, GA4, GTM, organic reporting, AI visibility, digital products, and CommuteZA.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              id="book-intro-call-areas-hero"
              href="https://cal.com/morgan-mngadi-18ixti/intro-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <CalendarDays className="w-4 h-4" /> Book a Call
            </a>
            <a
              id="email-enquiry-areas-hero"
              href="mailto:morganmngadi@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-border text-foreground font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" /> Get in Touch
            </a>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-b border-border py-16"
        >
          <motion.h2 variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-10">
            01 / Expertise Map
          </motion.h2>
          <div className="grid grid-cols-1 gap-px bg-border border border-border">
            {EXPERTISE_AREAS.map((service) => (
              <motion.article key={service.title} variants={fadeUp} className="bg-card p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[0.7fr_1fr] gap-8">
                <div>
                  <h2 className="text-2xl font-medium mb-3">{service.title}</h2>
                  <p className="font-mono text-xs uppercase tracking-widest text-primary leading-relaxed">{service.fit}</p>
                </div>
                <div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.body}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.focus.map((item) => (
                      <span key={item} className="border border-border bg-background px-3 py-1.5 font-mono text-xs text-muted-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

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
                02 / Connect
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
                Start a Conversation Around Search and Growth.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl">
                Reach out for networking, collaborations, industry discussions, product conversations, or thoughtful conversations connected to SEO, analytics, and organic growth.
              </motion.p>
            </div>
            <motion.div variants={stagger} className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <motion.a
                variants={fadeUp}
                id="book-intro-call-areas-connect"
                href="https://cal.com/morgan-mngadi-18ixti/intro-call"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                <CalendarDays className="w-4 h-4 shrink-0" />
                Book a Call
              </motion.a>
              <motion.a
                variants={fadeUp}
                id="email-enquiry-areas-of-expertise"
                href="mailto:morganmngadi@gmail.com"
                className="flex items-center justify-center gap-3 px-6 py-4 border border-border text-foreground hover:border-primary hover:text-primary transition-colors font-medium"
              >
                <Mail className="w-4 h-4 shrink-0" />
                Get in Touch
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="border-t border-border py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <motion.h2 variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              03 / FAQ
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
      </main>

      <SiteFooter />
    </div>
  );
}
