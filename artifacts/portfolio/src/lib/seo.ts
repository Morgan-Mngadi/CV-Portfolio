import { ARTICLES, type Article } from "@/data/articles";

export const SITE_URL = "https://morganmngadi.com";
export const SITE_NAME = "Morgan Mngadi";
export const DEFAULT_IMAGE = `${SITE_URL}/opengraph.jpg`;

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "profile" | "article";
  image?: string;
  schema?: Record<string, unknown>[];
};

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Morgan Mngadi",
  alternateName: "Mcebisi Mngadi",
  jobTitle: "SEO Specialist",
  url: SITE_URL,
  email: "mailto:morganmngadi@gmail.com",
  image: `${SITE_URL}/morgan-photo.png`,
  sameAs: ["https://www.linkedin.com/in/morgan-mngadi/"],
  knowsAbout: [
    "Technical SEO",
    "Organic Search",
    "AI Search Visibility",
    "Google Analytics 4",
    "Google Search Console",
    "Structured Data",
    "Local SEO",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Johannesburg",
    addressCountry: "ZA",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: {
    "@id": `${SITE_URL}/#person`,
  },
};

const pageSchema = (path: string, title: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name: title,
  description,
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  about: {
    "@id": `${SITE_URL}/#person`,
  },
});

const articleSchema = (article: Article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${absoluteUrl(`/blog/${article.slug}`)}#article`,
  headline: article.title,
  description: article.excerpt,
  author: {
    "@id": `${SITE_URL}/#person`,
  },
  publisher: {
    "@id": `${SITE_URL}/#person`,
  },
  mainEntityOfPage: {
    "@id": `${absoluteUrl(`/blog/${article.slug}`)}#webpage`,
  },
  datePublished: "2026-06-01",
  dateModified: "2026-06-01",
});

const faqSchema = (article: Article) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${absoluteUrl(`/blog/${article.slug}`)}#faq`,
  mainEntity: article.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const seoByPath: Record<string, SeoConfig> = {
  "/": {
    title: "Morgan Mngadi | Organic Search and Technical SEO Specialist",
    description:
      "Organic Search and Technical SEO specialist open to full time and part time roles focused on AI visibility, technical implementation, and measurable organic ROI.",
    path: "/",
    type: "profile",
    schema: [personSchema, websiteSchema],
  },
  "/about": {
    title: "About Morgan Mngadi | Technical SEO and Organic Search",
    description:
      "Learn more about Morgan Mngadi, an SEO specialist with experience in technical SEO, search strategy, analytics, structured data, and agency led implementation.",
    path: "/about",
    type: "profile",
    schema: [personSchema],
  },
  "/projects/commuteza": {
    title: "CommuteZA Case Study | Technical SEO, AI Visibility and Search Systems",
    description:
      "A technical SEO case study for CommuteZA covering headless CMS architecture, redirect logic, AI visibility, Lighthouse SEO, and early organic search signals.",
    path: "/projects/commuteza",
    type: "article",
    schema: [
      personSchema,
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/projects/commuteza#case-study`,
        name: "CommuteZA Case Study",
        url: `${SITE_URL}/projects/commuteza`,
        creator: {
          "@id": `${SITE_URL}/#person`,
        },
        about: ["Technical SEO", "AI Search Visibility", "Headless CMS", "Organic Search"],
      },
    ],
  },
  "/blog": {
    title: "SEO Perspectives | Morgan Mngadi",
    description:
      "Articles on AI search, SEO measurement, technical SEO systems, and organic search reporting by Morgan Mngadi.",
    path: "/blog",
    type: "website",
    schema: [personSchema, websiteSchema],
  },
};

for (const article of ARTICLES) {
  const path = `/blog/${article.slug}`;
  seoByPath[path] = {
    title: `${article.title} | Morgan Mngadi`,
    description: article.excerpt,
    path,
    type: "article",
    schema: [personSchema, articleSchema(article), faqSchema(article)],
  };
}

export const routes = Object.keys(seoByPath);

export const getSeoConfig = (path: string) => {
  const normalisedPath = path === "" ? "/" : path.replace(/\/$/, "") || "/";
  const config = seoByPath[normalisedPath] ?? seoByPath["/"];

  return {
    ...config,
    canonical: absoluteUrl(config.path),
    image: config.image ?? DEFAULT_IMAGE,
    schema: [pageSchema(config.path, config.title, config.description), ...(config.schema ?? [])],
  };
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderSeoHead = (path: string) => {
  const seo = getSeoConfig(path);
  const schema = JSON.stringify(seo.schema).replaceAll("</script", "<\\/script");

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:type" content="${seo.type === "article" ? "article" : "website"}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(seo.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.image)}" />`,
    `<script type="application/ld+json">${schema}</script>`,
  ].join("\n    ");
};
