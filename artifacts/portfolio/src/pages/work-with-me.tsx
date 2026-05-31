import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Mail } from "lucide-react";
import { Seo } from "@/components/seo";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const SERVICES = [
  {
    title: "Organic Search Retainers",
    fit: "Best for startups, ecommerce teams, agencies, and marketing teams that need ongoing support.",
    body:
      "Monthly Organic Search support across technical SEO implementation, AI visibility, measurement, and reporting. Useful when SEO needs consistent ownership and ROI accountability instead of one off recommendations.",
    engagement: ["3 month retainer", "6 month retainer", "12 month retainer"],
    includes: [
      "Technical SEO implementation priorities",
      "Search Console and GA4 performance review",
      "AI visibility checks and content recommendations",
      "Organic ROI reporting tied to leads, purchases, or revenue",
    ],
  },
  {
    title: "SEO Implementation Support",
    fit: "Best for agencies and in house teams that already know what needs doing but need extra delivery capacity.",
    body:
      "Execution support for SEO changes inside CMS and development workflows. Smaller scopes can run once off, while larger implementation projects are better handled through a retainer so changes can be prioritised, shipped, and measured properly.",
    engagement: ["Once off implementation", "Retainer for larger projects"],
    includes: [
      "Metadata, schema, and internal linking updates",
      "Redirect, canonical, and indexation support",
      "CMS implementation across common platforms",
      "QA and ROI review of deployed SEO changes",
    ],
  },
  {
    title: "Reporting and Measurement Setup",
    fit: "Best for teams that need clearer evidence of organic search impact.",
    body:
      "Reporting setup that connects visibility, engagement, and commercial outcomes. Setup can be once off, but dashboard maintenance and monthly commentary are best included in a retainer so ROI stays visible as search performance changes.",
    engagement: ["Once off setup", "Monthly dashboard maintenance"],
    includes: [
      "GA4, Google Search Console, and GTM review",
      "Organic lead and ecommerce reporting structure",
      "AI platform referral visibility where data is available",
      "Monthly ROI commentary for stakeholders",
    ],
  },
];

const FAQS = [
  {
    question: "Why are retainers quoted individually?",
    answer:
      "Every business has a different level of SEO maturity, technical debt, CMS complexity, reporting setup, and commercial target. A tailored quote keeps the retainer aligned to the size of the business and the amount of work required.",
  },
  {
    question: "What affects the scope of a retainer?",
    answer:
      "The main factors are the number of pages or templates, the CMS and development workflow, whether reporting is already reliable, how much implementation support is needed, and whether the focus is leads, ecommerce revenue, AI visibility, or all three.",
  },
  {
    question: "Can the work start with a smaller project before a retainer?",
    answer:
      "Yes. Some teams may start with a focused audit, reporting setup, or implementation sprint before moving into monthly support. That can make the ongoing scope clearer and easier to prioritise.",
  },
  {
    question: "Do you work with both agencies and direct clients?",
    answer:
      "Yes. I can support agencies that need implementation capacity and direct clients that need Organic Search work tied to measurable outcomes.",
  },
];

export default function WorkWithMe() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo path="/work-with-me" />
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
            SEO Consultant
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.95] mb-8 max-w-4xl">
            SEO consultant for Organic Search systems that create measurable impact.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            I support employment, freelance, and contract work across technical SEO implementation, AI visibility, and organic performance reporting. The focus is simple: turn search work into leads, purchases, revenue, and clearer decision making.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:morganmngadi@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-4 h-4" /> Enquire via email
            </a>
            <a
              href="https://www.linkedin.com/in/morgan-mngadi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-border text-foreground hover:border-primary hover:text-primary transition-colors font-medium"
            >
              Enquire on LinkedIn <ArrowUpRight className="w-4 h-4" />
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
          <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-10">
            01 / Ways To Work
          </motion.div>
          <div className="grid grid-cols-1 gap-px bg-border border border-border">
            {SERVICES.map((service) => (
              <motion.article key={service.title} variants={fadeUp} className="bg-card p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[0.7fr_1fr] gap-8">
                <div>
                  <h2 className="text-2xl font-medium mb-3">{service.title}</h2>
                  <p className="font-mono text-xs uppercase tracking-widest text-primary leading-relaxed">{service.fit}</p>
                </div>
                <div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.body}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.engagement.map((item) => (
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
                02 / Enquire
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
                Tell me what you need Organic Search to change.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl">
                Email me or connect on LinkedIn with a short note about the site, team, or search problem. I can then recommend the most useful way to work together.
              </motion.p>
            </div>
            <motion.div variants={stagger} className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <motion.a
                variants={fadeUp}
                href="mailto:morganmngadi@gmail.com"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                <Mail className="w-4 h-4 shrink-0" />
                Email me
              </motion.a>
              <motion.a
                variants={fadeUp}
                href="https://www.linkedin.com/in/morgan-mngadi/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 border border-border text-foreground hover:border-primary hover:text-primary transition-colors font-medium"
              >
                <ArrowUpRight className="w-4 h-4 shrink-0" />
                LinkedIn
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
            <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
              03 / FAQ
            </motion.div>
            <motion.div variants={stagger} className="flex flex-col divide-y divide-border border border-border">
              {FAQS.map((faq) => (
                <motion.section key={faq.question} variants={fadeUp} className="bg-card p-6">
                  <h2 className="font-medium mb-3">{faq.question}</h2>
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
