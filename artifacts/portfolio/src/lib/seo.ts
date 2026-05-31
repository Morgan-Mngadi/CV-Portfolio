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
      "Organic Search and Technical SEO specialist available for employment, freelance, and contract work focused on AI visibility, technical implementation, and measurable organic ROI.",
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
  "/work-with-me": {
    title: "SEO Consultant | Organic Search Consulting and Implementation",
    description:
      "SEO consultant for employment, freelance, and contract work across Organic Search, technical SEO implementation, AI visibility, reporting, and measurable organic ROI.",
    path: "/work-with-me",
    type: "website",
    schema: [
      personSchema,
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${SITE_URL}/work-with-me#service`,
        name: "SEO consultant for Organic Search consulting and implementation",
        provider: {
          "@id": `${SITE_URL}/#person`,
        },
        areaServed: ["South Africa", "United Kingdom", "European Union"],
        serviceType: ["SEO Consulting", "Technical SEO", "Organic Search", "AI Search Visibility", "SEO Reporting"],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE_URL}/work-with-me#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Why are retainers quoted individually?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Every business has a different level of SEO maturity, technical debt, CMS complexity, reporting setup, and commercial target. A tailored quote keeps the retainer aligned to the size of the business and the amount of work required.",
            },
          },
          {
            "@type": "Question",
            name: "What affects the scope of a retainer?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "The main factors are the number of pages or templates, the CMS and development workflow, whether reporting is already reliable, how much implementation support is needed, and whether the focus is leads, ecommerce revenue, AI visibility, or all three.",
            },
          },
          {
            "@type": "Question",
            name: "Can the work start with a smaller project before a retainer?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Some teams may start with a focused audit, reporting setup, or implementation sprint before moving into monthly support. That can make the ongoing scope clearer and easier to prioritise.",
            },
          },
          {
            "@type": "Question",
            name: "Do you work with both agencies and direct clients?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Morgan supports agencies that need implementation capacity and direct clients that need Organic Search work tied to measurable outcomes.",
            },
          },
        ],
      },
    ],
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
