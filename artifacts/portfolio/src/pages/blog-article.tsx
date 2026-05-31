import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { Link, useRoute } from "wouter";
import { getArticle } from "@/data/articles";
import NotFound from "@/pages/not-found";
import { Seo } from "@/components/seo";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const article = params?.slug ? getArticle(params.slug) : undefined;

  if (!article) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo path={`/blog/${article.slug}`} />
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
        <motion.article initial="hidden" animate="visible" variants={stagger}>
          <header className="border-b border-border py-16 lg:py-20">
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-mono text-xs text-primary border border-primary/30 bg-primary/5 px-2.5 py-1">{article.category}</span>
              <span className="font-mono text-xs text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
              <span className="font-mono text-xs text-muted-foreground">{article.date}</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-medium tracking-tight leading-tight mb-6 max-w-4xl">
              {article.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {article.excerpt}
            </motion.p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 py-14">
            <motion.aside variants={fadeUp} className="lg:sticky lg:top-20 lg:self-start">
              <nav aria-label="Table of contents" className="border border-border bg-card p-5">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Contents</h2>
                <ol className="flex flex-col gap-3">
                  {article.sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
                        {section.heading}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#faq" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
                      FAQ
                    </a>
                  </li>
                </ol>
              </nav>
            </motion.aside>

            <div className="max-w-3xl">
              {article.sections.map((section) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  variants={fadeUp}
                  className="scroll-mt-24 border-b border-border pb-10 mb-10"
                >
                  <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-5">{section.heading}</h2>
                  <div className="flex flex-col gap-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-6 flex flex-col gap-3">
                      {section.bullets.map((item) => (
                        <li key={item} className="text-sm text-muted-foreground leading-relaxed border-l border-primary/50 pl-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.numberedSteps && (
                    <ol className="mt-6 flex flex-col gap-3">
                      {section.numberedSteps.map((item, index) => (
                        <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 text-sm text-muted-foreground leading-relaxed">
                          <span className="font-mono text-xs text-primary tabular-nums">{index + 1}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                  {section.imagePlaceholder && (
                    <figure className="mt-8 border border-dashed border-border bg-card p-6">
                      <div className="aspect-[16/9] w-full border border-border bg-background flex items-center justify-center px-6 text-center">
                        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                          Image placeholder
                        </span>
                      </div>
                      <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
                        {section.imagePlaceholder}
                      </figcaption>
                    </figure>
                  )}
                  {section.closingParagraphs && (
                    <div className="mt-6 flex flex-col gap-4">
                      {section.closingParagraphs.map((paragraph) => (
                        <p key={paragraph} className="text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                  {section.link && (
                    <Link href={section.link.href} className="mt-6 inline-flex font-mono text-xs uppercase tracking-widest text-primary hover:underline">
                      {section.link.label}
                    </Link>
                  )}
                </motion.section>
              ))}

              <motion.section id="faq" variants={fadeUp} className="scroll-mt-24 pb-14">
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-6">FAQ</h2>
                <div className="flex flex-col divide-y divide-border border border-border">
                  {article.faqs.map((faq) => (
                    <section key={faq.question} className="p-6 bg-card">
                      <h3 className="font-medium mb-3">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </section>
                  ))}
                </div>
              </motion.section>

              <motion.footer variants={fadeUp} className="border-t border-border py-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                  <ArrowLeft className="w-3 h-3" /> Back to portfolio
                </Link>
                <Link href="/blog" className="font-mono text-xs text-primary hover:underline uppercase tracking-widest">
                  More articles
                </Link>
              </motion.footer>
            </div>
          </div>
        </motion.article>
      </main>
      <SiteFooter />
    </div>
  );
}
