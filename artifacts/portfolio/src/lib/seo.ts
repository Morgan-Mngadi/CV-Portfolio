import { ARTICLES, type Article } from "@/data/articles";

export const SITE_URL = "https://morgan-mngadi-portfolio.online";
export const SITE_NAME = "Morgan Mngadi";

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "profile" | "article";
  image?: string;
  robots?: string;
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
  "/404": {
    title: "Page Not Found | Morgan Mngadi",
    description: "The requested page could not be found. Return to Morgan Mngadi's Organic Search portfolio.",
    path: "/404",
    type: "website",
    robots: "noindex, follow",
    schema: [],
  },
  "/": {
    title: "Morgan Mngadi | SEO, Analytics and Digital Product Portfolio",
    description:
      "Portfolio of Morgan Mngadi, an SEO professional focused on technical SEO, analytics, GTM, GA4, organic growth, digital products, and CommuteZA.",
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
    schema: [
      personSchema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE_URL}/about#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How much SEO experience does Morgan Mngadi have?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Morgan has 3+ years of SEO experience across agency environments, with work spanning technical audits, on-page optimisation, structured data, CMS implementation, analytics, and organic performance reporting.",
            },
          },
          {
            "@type": "Question",
            name: "What areas of SEO does Morgan Mngadi focus on?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Morgan focuses on technical SEO, organic growth strategy, analytics, GTM, GA4, structured data, CMS implementation, reporting, and product-led search systems.",
            },
          },
          {
            "@type": "Question",
            name: "What is CommuteZA?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "CommuteZA is a digital product Morgan is building to explore SEO architecture, metadata systems, structured data, redirect logic, local search behaviour, and analytics.",
            },
          },
          {
            "@type": "Question",
            name: "What makes Morgan's background useful to teams and collaborators?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Agency work has exposed Morgan to multiple industries, CMS platforms, stakeholder needs, and implementation constraints across audits, reporting, content recommendations, developer collaboration, and measurable business impact.",
            },
          },
        ],
      },
    ],
  },
  "/areas-of-expertise": {
    title: "Areas of Expertise | SEO, Analytics, GTM and Organic Growth",
    description:
      "Explore Morgan Mngadi's areas of expertise across technical SEO, analytics, GTM, GA4, organic growth, AI visibility, reporting, and CommuteZA.",
    path: "/areas-of-expertise",
    type: "website",
    schema: [
      personSchema,
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${SITE_URL}/areas-of-expertise#webpage`,
        name: "Areas of Expertise",
        about: [
          "Technical SEO",
          "Google Analytics 4",
          "Google Tag Manager",
          "Organic Growth",
          "AI Search Visibility",
          "CommuteZA",
          "Digital Products",
        ],
        author: {
          "@id": `${SITE_URL}/#person`,
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE_URL}/areas-of-expertise#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Why frame this as areas of expertise?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "The page maps how Morgan thinks and works across SEO, analytics, technical implementation, reporting, and product-led growth.",
            },
          },
          {
            "@type": "Question",
            name: "How does analytics connect to SEO?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Analytics connects search visibility to what users do afterwards. GA4, GTM, Search Console, and Looker Studio help translate impressions and clicks into engagement, leads, purchases, and business context.",
            },
          },
          {
            "@type": "Question",
            name: "What does CommuteZA show about Morgan's work?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "CommuteZA shows how Morgan approaches search architecture when he can own the full system: URLs, metadata, rendering, schema, redirect logic, reporting, and product decisions.",
            },
          },
          {
            "@type": "Question",
            name: "Can people contact Morgan about collaborations or thoughtful conversations?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Yes. The contact links are open for networking, collaborations, industry discussions, product conversations, and thoughtful conversations.",
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
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE_URL}/projects/commuteza#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Why build CommuteZA instead of only showing client SEO work?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "CommuteZA gives Morgan a controlled environment to test SEO architecture directly, including rendering, metadata, URL structure, schema, reporting, and technical tradeoffs.",
            },
          },
          {
            "@type": "Question",
            name: "What makes this a technical SEO case study?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "The project focuses on implementation decisions that affect crawlability and indexation, including server side rendering, structured data, metadata systems, canonical paths, redirect logic, and search performance measurement.",
            },
          },
          {
            "@type": "Question",
            name: "Are the results final?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "No. The site is still in active development, so the metrics are early signals rather than a finished growth story.",
            },
          },
          {
            "@type": "Question",
            name: "What tools are used to measure progress?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Progress is reviewed through Google Search Console, GA4, Google Tag Manager, PageSpeed Insights, Lighthouse, and AI visibility checks across surfaces such as AI Overviews and Microsoft Copilot.",
            },
          },
        ],
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
    image: config.image,
    robots: config.robots ?? "index, follow",
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
    ...(path === "/" ? [`<meta name="google-site-verification" content="A4ci4oieIQ_6atz06tTpMrzdvIc6CMPvLzI3Bw3fQvA" />`] : []),
    `<meta name="robots" content="${escapeHtml(seo.robots)}" />`,
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:type" content="${seo.type === "article" ? "article" : "website"}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`,
    ...(seo.image ? [`<meta property="og:image" content="${escapeHtml(seo.image)}" />`] : []),
    `<meta name="twitter:card" content="${seo.image ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    ...(seo.image ? [`<meta name="twitter:image" content="${escapeHtml(seo.image)}" />`] : []),
    `<script type="application/ld+json">${schema}</script>`,
  ].join("\n    ");
};
