import { ArrowLeft, ArrowUpRight, Clock, SearchX } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Seo } from "@/components/seo";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { ARTICLES } from "@/data/articles";

export default function NotFound() {
  const [location] = useLocation();
  const suggestedArticles = ARTICLES.slice(0, 2);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Seo path="/404" />

      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <SiteNav />

      <main className="relative z-10 mx-auto min-h-[calc(100vh-13rem)] max-w-6xl px-6 pb-16 pt-28">
        <section className="w-full border-y border-border py-12 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:items-center lg:gap-20">
            <div>
              <div className="mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary">
                <span className="h-px w-6 bg-primary" />
                HTTP status / 404
              </div>

              <div className="mb-8 flex items-end gap-5">
                <span className="text-[clamp(6rem,20vw,13rem)] font-medium leading-[0.72] tracking-[-0.08em] text-primary">
                  404
                </span>
                <SearchX className="mb-1 hidden h-10 w-10 text-muted-foreground sm:block" aria-hidden="true" />
              </div>

              <h1 className="max-w-3xl text-3xl font-medium tracking-tight md:text-5xl">
                This URL fell out of the index.
              </h1>
              <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
                The crawler reached a dead end. The page may have moved, never existed, or taken canonicalisation a little too seriously.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <ArrowLeft className="h-4 w-4" /> Return home
                </Link>
                <Link
                  href="/areas-of-expertise"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  View expertise <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <aside className="border border-border bg-card" aria-label="Crawl diagnostics">
              <div className="border-b border-border px-5 py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Crawl diagnostics
              </div>
              <dl className="divide-y divide-border font-mono text-xs">
                <div className="grid grid-cols-[100px_1fr] gap-4 px-5 py-4">
                  <dt className="text-muted-foreground">Requested</dt>
                  <dd className="break-all text-foreground">{location}</dd>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-4 px-5 py-4">
                  <dt className="text-muted-foreground">Response</dt>
                  <dd className="text-primary">404 / Not Found</dd>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-4 px-5 py-4">
                  <dt className="text-muted-foreground">Indexability</dt>
                  <dd className="text-foreground">Excluded</dd>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-4 px-5 py-4">
                  <dt className="text-muted-foreground">Next step</dt>
                  <dd className="text-foreground">Follow a valid internal link</dd>
                </div>
              </dl>
              <Link
                href="/blog"
                className="flex items-center justify-between border-t border-border px-5 py-4 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary/5"
              >
                Browse SEO notes <ArrowUpRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </section>

        <section className="border-b border-border py-14 md:py-16" aria-labelledby="useful-detours-heading">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Useful detours</div>
              <h2 id="useful-detours-heading" className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
                The URL is missing. These pages are not.
              </h2>
            </div>
            <Link href="/blog" className="font-mono text-xs uppercase tracking-widest text-primary hover:underline">
              View all articles
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex min-h-64 flex-col border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
                  <span className="border border-primary/30 bg-primary/5 px-2 py-1 text-primary">{article.category}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {article.readTime}</span>
                </div>
                <h3 className="text-xl font-medium transition-colors group-hover:text-primary">{article.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
                <span className="mt-auto flex items-center gap-2 pt-6 font-mono text-xs uppercase tracking-widest text-primary">
                  Read article <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}

            <Link
              href="/projects/commuteza"
              className="group flex min-h-64 flex-col border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <div className="mb-5 font-mono text-xs uppercase tracking-widest text-primary">Case study</div>
              <h3 className="text-xl font-medium transition-colors group-hover:text-primary">CommuteZA</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                See how technical SEO, rendering and search architecture come together in a live South African routing product.
              </p>
              <span className="mt-auto flex items-center gap-2 pt-6 font-mono text-xs uppercase tracking-widest text-primary">
                View project <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
