import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/seo";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const studies = [
  {
    featured: true,
    eyebrow: "Self-initiated project · Technical SEO / Product",
    title: "CommuteZA",
    description: "Building a better public transport search experience for South African commuters through product thinking, technical SEO and AI-assisted development.",
    href: "/projects/commuteza",
    image: "/project-images/commuteza-macbook.webp",
    tags: ["Project", "Product", "Technical SEO"],
  },
  {
    eyebrow: "Professional work · Marketing Operations / Business Intelligence",
    title: "Reporting Automation & Business Intelligence",
    description: "Redesigning recurring analytics and paid media reporting workflows to reduce preparation time, improve consistency and give specialists more time for insight.",
    href: "/projects/reporting-automation",
    tags: ["Implemented at Accenture", "Reporting"],
  },
  {
    eyebrow: "Pilot project · AI & Automation / SEO Operations",
    title: "From Personal Automation to Shared AI Capability",
    description: "Designing a reusable Microsoft Copilot agent that helps SEO specialists turn article briefs into consistent, editable optimization deliverables.",
    href: "/projects/seo-optimization-agent",
    tags: ["Implemented at Accenture", "AI Automation", "Marketing Engineering"],
  },
  {
    eyebrow: "Professional / confidential client work · SEO Automation",
    title: "From 60 Hours to 8",
    description: "Accelerating SEO URL mapping with AI-assisted workflow design, structured Codex instructions and visual inputs.",
    href: "/projects/ai-url-mapping",
    tags: ["Implemented at Accenture", "AI Automation", "Marketing Engineering"],
  },
  {
    eyebrow: "Professional / confidential client work · SEO Strategy / Content Strategy",
    title: "Anticipating Demand",
    description: "Using seasonal search research and content planning to help a higher education provider prepare for a major January search demand peak.",
    href: "/projects/seasonal-seo-strategy",
    tags: ["SEO Strategy", "Seasonal Demand", "Content Planning"],
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo path="/projects" />
      <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(hsl(var(--border) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.4) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <SiteNav />
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-12">
        <header className="border-b border-border py-16 lg:py-24 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-6">Selected work</p>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.9] mb-8">Case <span className="text-primary">Studies</span></h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">A collection of projects exploring technical SEO, digital products, reporting systems and the practical application of data.</p>
        </header>
        <section className="py-16 lg:py-20 space-y-16">
          {studies.map((study) => (
            <article key={study.href} className={`w-full min-h-[280px] border border-border bg-card/40 ${study.featured ? "lg:grid lg:grid-cols-[1.05fr_0.95fr]" : ""}`}>
              {study.image && <div className="border-b lg:border-b-0 lg:border-r border-border p-5 lg:p-8 flex items-center"><img src={study.image} alt="CommuteZA website displayed on a MacBook Air" className="w-full object-contain" /></div>}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <p className="font-mono text-xs uppercase tracking-widest text-primary mb-5">{study.eyebrow}</p>
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">{study.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl">{study.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">{study.tags.map((tag) => <span key={tag} className="border border-primary/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">{tag}</span>)}</div>
                <Link href={study.href} className="inline-flex items-center gap-2 text-primary font-medium hover:underline w-fit">Read case study <ArrowUpRight className="w-4 h-4" /></Link>
              </div>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
