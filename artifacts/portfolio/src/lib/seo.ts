import { ARTICLES, articleParagraphText, type Article } from "@/data/articles";

export const SITE_URL = "https://morgan-mngadi-portfolio.online";
export const SITE_NAME = "Morgan Mngadi";
export const PERSON_IMAGE = `${SITE_URL}/morgan-author.png`;
export const DEFAULT_SOCIAL_IMAGE = PERSON_IMAGE;

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "profile" | "article";
  image?: string;
  imageAlt?: string;
  robots?: string;
  schema?: Record<string, unknown>[];
  pageType?: "WebPage" | "ProfilePage" | "CollectionPage";
  mainEntityId?: string;
};

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

const normaliseMetaDescription = (description: string) => {
  return description.replace(/\s+/g, " ").trim();
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Morgan Mngadi",
  alternateName: "Mcebisi Mngadi",
  jobTitle: "SEO Specialist",
  url: SITE_URL,
  email: "mailto:morganmngadi@gmail.com",
  image: PERSON_IMAGE,
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

const pageSchema = (
  path: string,
  title: string,
  description: string,
  pageType: SeoConfig["pageType"] = "WebPage",
  mainEntityId?: string,
) => ({
  "@context": "https://schema.org",
  "@type": pageType,
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
  ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
});

const breadcrumbSchema = (path: string, title: string) => {
  const items = [
    { name: "Home", url: SITE_URL },
    ...(path.startsWith("/blog/") ? [{ name: "Blog", url: `${SITE_URL}/blog` }] : []),
    { name: title.split(" | ")[0], url: absoluteUrl(path) },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

const articleText = (article: Article) => {
  const text: string[] = [article.title, article.excerpt, article.category];

  if (article.heroAnswer) {
    text.push(article.heroAnswer.answer, article.heroAnswer.explanation);
  }

  article.sections.forEach((section) => {
    text.push(section.heading, ...section.paragraphs.map(articleParagraphText));
    text.push(...(section.bullets ?? []));
    text.push(...(section.numberedSteps ?? []));
    text.push(...(section.closingParagraphs ?? []).map(articleParagraphText));
    section.imageBlocks?.forEach((image) => text.push(image.alt, image.caption));
    if (section.imageCarousel) {
      text.push(section.imageCarousel.title, section.imageCarousel.description);
      section.imageCarousel.images.forEach((image) => text.push(image.alt, image.caption));
    }
    if (section.chart) {
      text.push(section.chart.title, section.chart.subtitle, section.chart.axisLabel, section.chart.sourceLabel);
      section.chart.rows.forEach((row) => text.push(row.label, String(row.value)));
    }
    if (section.indexationChart) {
      text.push(
        `${section.indexationChart.indexedPages} indexed pages`,
        `${section.indexationChart.notIndexedPages} not indexed pages`,
        section.indexationChart.sourceLabel,
      );
    }
    section.aiFindings?.forEach((finding) => {
      text.push(finding.status, finding.context ?? "", finding.claim, finding.correction, finding.link?.label ?? "");
    });
    section.comparisonTable?.rows.forEach((row) => text.push(...row));
    section.links?.forEach((link) => text.push(link.label));
  });

  article.faqs.forEach((faq) => text.push(faq.question, faq.answer));

  return text.join(" ");
};

const articleWordCount = (article: Article) => articleText(article).match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length ?? 0;

const articleDate = (date: string) => {
  const [month, year] = date.split(" ");
  const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month);

  if (monthIndex === -1 || !year) {
    return "2026-06-01";
  }

  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-01`;
};

const articleImage = (article: Article) => {
  if (article.socialImage) return absoluteUrl(article.socialImage);
  return DEFAULT_SOCIAL_IMAGE;
};

const articleKeywords = (article: Article) =>
  [article.category, ...article.sections.map((section) => section.heading)]
    .map((keyword) => keyword.trim())
    .filter(Boolean);

const readingTime = (readTime: string) => {
  const minutes = Number.parseInt(readTime, 10);
  return Number.isFinite(minutes) ? `PT${minutes}M` : undefined;
};

const articleSchema = (article: Article) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${absoluteUrl(`/blog/${article.slug}`)}#article`,
  url: absoluteUrl(`/blog/${article.slug}`),
  headline: article.title,
  description: article.excerpt,
  image: articleImage(article),
  articleSection: article.category,
  keywords: articleKeywords(article),
  wordCount: articleWordCount(article),
  ...(readingTime(article.readTime) ? { timeRequired: readingTime(article.readTime) } : {}),
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Morgan Mngadi",
    url: SITE_URL,
    image: DEFAULT_SOCIAL_IMAGE,
  },
  publisher: {
    "@id": `${SITE_URL}/#person`,
  },
  isPartOf: {
    "@id": `${SITE_URL}/blog#blog`,
  },
  mainEntityOfPage: {
    "@id": `${absoluteUrl(`/blog/${article.slug}`)}#webpage`,
  },
  datePublished: articleDate(article.date),
  dateModified: articleDate(article.date),
});

const articleVideoSchema = (article: Article) => {
  const video = article.sections.find((section) => section.video)?.video;

  if (!video?.poster) return null;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${absoluteUrl(`/blog/${article.slug}`)}#video`,
    name: video.title,
    description: video.description,
    thumbnailUrl: [absoluteUrl(video.poster)],
    uploadDate: articleDate(article.date),
    contentUrl: absoluteUrl(video.src),
    isPartOf: {
      "@id": `${absoluteUrl(`/blog/${article.slug}`)}#article`,
    },
  };
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog#blog`,
  name: "SEO Perspectives",
  description: "Articles on AI search, SEO measurement, technical SEO systems, and organic search reporting by Morgan Mngadi.",
  url: `${SITE_URL}/blog`,
  author: {
    "@id": `${SITE_URL}/#person`,
  },
  blogPost: ARTICLES.map((article) => ({
    "@id": `${absoluteUrl(`/blog/${article.slug}`)}#article`,
  })),
};

const blogItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/blog#articles`,
  name: "Morgan Mngadi SEO articles",
  numberOfItems: ARTICLES.length,
  itemListElement: ARTICLES.map((article, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: article.title,
    url: absoluteUrl(`/blog/${article.slug}`),
  })),
};

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
    title: "SEO Specialist | Morgan Mngadi",
    description:
      "Portfolio of Morgan Mngadi, an SEO specialist focused on organic search growth for product and service-led businesses.",
    path: "/",
    type: "profile",
    pageType: "ProfilePage",
    mainEntityId: `${SITE_URL}/#person`,
    schema: [personSchema, websiteSchema],
  },
  "/about": {
    title: "About Morgan Mngadi | Technical SEO and Organic Search",
    description:
      "Learn about Morgan Mngadi's SEO experience across technical SEO, search strategy, analytics, structured data, and agency implementation.",
    path: "/about",
    type: "profile",
    pageType: "ProfilePage",
    mainEntityId: `${SITE_URL}/#person`,
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
    pageType: "CollectionPage",
    mainEntityId: `${SITE_URL}/#person`,
    schema: [
      personSchema,
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${SITE_URL}/areas-of-expertise#expertise-overview`,
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
      "A CommuteZA technical SEO case study covering headless CMS architecture, redirects, AI visibility, Lighthouse SEO, and search signals.",
    path: "/projects/commuteza",
    type: "article",
    mainEntityId: `${SITE_URL}/projects/commuteza#case-study`,
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
    pageType: "CollectionPage",
    mainEntityId: `${SITE_URL}/blog#blog`,
    schema: [personSchema, websiteSchema, blogSchema, blogItemListSchema],
  },
};

for (const article of ARTICLES) {
  const path = `/blog/${article.slug}`;
  seoByPath[path] = {
    title: article.metaTitle ?? `${article.title} | Morgan Mngadi`,
    description: article.metaDescription ?? article.excerpt,
    path,
    type: "article",
    image: article.socialImage ? absoluteUrl(article.socialImage) : DEFAULT_SOCIAL_IMAGE,
    imageAlt: article.socialImage ? article.title : "Morgan Mngadi, SEO Specialist",
    mainEntityId: `${absoluteUrl(path)}#article`,
    schema: [
      personSchema,
      articleSchema(article),
      faqSchema(article),
      ...(articleVideoSchema(article) ? [articleVideoSchema(article)!] : []),
    ],
  };
}

export const routes = Object.keys(seoByPath);

const schemaKey = (schema: Record<string, unknown>) => {
  const id = schema["@id"];
  const type = schema["@type"];

  return typeof id === "string" ? id : `${String(type)}-${JSON.stringify(schema)}`;
};

const withSitewideSchemas = (schema: Record<string, unknown>[]) => {
  const seen = new Set<string>();
  const [primarySchema, ...additionalSchema] = schema;
  const schemaWithPerson = primarySchema
    ? [primarySchema, websiteSchema, personSchema, ...additionalSchema]
    : [websiteSchema, personSchema, ...additionalSchema];

  return schemaWithPerson.filter((item) => {
    const key = schemaKey(item);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

export const getSeoConfig = (path: string) => {
  const normalisedPath = path === "" ? "/" : path.replace(/\/$/, "") || "/";
  const config = seoByPath[normalisedPath] ?? seoByPath["/"];
  const description = normaliseMetaDescription(config.description);
  const page = pageSchema(config.path, config.title, description, config.pageType, config.mainEntityId);
  const breadcrumb = config.path === "/" || config.path === "/404"
    ? null
    : breadcrumbSchema(config.path, config.title);

  return {
    ...config,
    description,
    canonical: absoluteUrl(config.path),
    image: config.image ?? DEFAULT_SOCIAL_IMAGE,
    imageAlt: config.imageAlt ?? "Morgan Mngadi, SEO Specialist",
    robots: config.robots ?? "index, follow",
    schema: withSitewideSchemas([page, ...(breadcrumb ? [breadcrumb] : []), ...(config.schema ?? [])]),
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
    ...(seo.image ? [`<meta property="og:image:width" content="800" />`] : []),
    ...(seo.image ? [`<meta property="og:image:height" content="800" />`] : []),
    ...(seo.image ? [`<meta property="og:image:type" content="image/png" />`] : []),
    ...(seo.image ? [`<meta property="og:image:alt" content="${escapeHtml(seo.imageAlt)}" />`] : []),
    `<meta name="twitter:card" content="${seo.image ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    ...(seo.image ? [`<meta name="twitter:image" content="${escapeHtml(seo.image)}" />`] : []),
    ...(seo.image ? [`<meta name="twitter:image:alt" content="${escapeHtml(seo.imageAlt)}" />`] : []),
    `<script type="application/ld+json">${schema}</script>`,
  ].join("\n    ");
};
