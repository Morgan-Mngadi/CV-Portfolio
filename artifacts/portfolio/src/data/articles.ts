export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  sections: ArticleSection[];
  faqs: ArticleFaq[];
};

export const ARTICLES: Article[] = [
  {
    slug: "ai-is-reshaping-search-reporting",
    title: "AI Is Reshaping Search Reporting",
    excerpt:
      "AI search changes how people discover, compare, and decide. Organic reporting needs to account for visibility, assisted journeys, and answer engine presence.",
    category: "AI Search",
    date: "Jun 2026",
    readTime: "3 min read",
    sections: [
      {
        id: "why-reporting-needs-to-change",
        heading: "Why reporting needs to change",
        paragraphs: [
          "Traditional SEO reporting was built around rankings, clicks, and landing page sessions. Those still matter, but they do not explain the full journey when AI summaries, answer engines, and conversational search shape the first impression.",
          "A user may see a brand in an AI Overview, ask a follow up question in Copilot, return later through organic search, and finally convert through a branded query. If the report only counts the final click, the value of organic search is under reported.",
        ],
      },
      {
        id: "what-ai-visibility-adds",
        heading: "What AI visibility adds",
        paragraphs: [
          "AI visibility is not a replacement for SEO. It is another layer of evidence that your content is understood, trusted, and useful enough to be surfaced in generated answers.",
          "The practical work remains familiar: clear information architecture, crawlable pages, accurate entities, strong topical coverage, useful content, and consistent brand signals across the web.",
        ],
        bullets: [
          "Track whether key topics trigger AI Overviews or answer engine citations.",
          "Review which pages are most likely to support AI assisted discovery.",
          "Compare AI visibility with Search Console impressions and organic landing page engagement.",
          "Look for branded search lift after non branded AI exposure.",
        ],
      },
      {
        id: "how-to-report-it",
        heading: "How to report it",
        paragraphs: [
          "A stronger organic report combines search visibility, AI visibility, and commercial outcomes. Google Search Console shows demand and query movement. GA4 shows behaviour after the click. Manual AI checks and third party monitoring can show whether the brand is present in generated answers.",
          "The goal is not to flood a report with more numbers. The goal is to connect visibility to decisions, leads, purchases, and content priorities.",
        ],
      },
      {
        id: "what-to-change-first",
        heading: "What to change first",
        paragraphs: [
          "Start with the queries and pages that already matter commercially. Then assess whether those topics are clear enough for both search engines and AI systems to interpret.",
          "For many sites, the first gains come from improving content structure, answering specific user questions, adding evidence, and aligning internal links around topic clusters.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does AI search make SEO reporting less important?",
        answer:
          "No. It makes reporting more important because the journey is less linear. SEO reports need to show visibility, engagement, and contribution to business outcomes.",
      },
      {
        question: "Should AI Overview visibility be treated as a conversion metric?",
        answer:
          "Not on its own. It is a visibility signal. It becomes more useful when compared with branded demand, assisted organic sessions, leads, and purchases.",
      },
      {
        question: "What should be included in an AI search report?",
        answer:
          "Include query visibility, landing page performance, AI answer presence, entity coverage, content gaps, and the commercial actions that organic search supports.",
      },
    ],
  },
  {
    slug: "seo-metrics-that-businesses-care-about",
    title: "SEO Metrics That Businesses Actually Care About",
    excerpt:
      "Most businesses do not care about SEO metrics in isolation. They care about whether organic search creates demand, leads, purchases, and useful insight.",
    category: "Measurement",
    date: "Jun 2026",
    readTime: "2 min read",
    sections: [
      {
        id: "the-metric-problem",
        heading: "The metric problem",
        paragraphs: [
          "Rankings, impressions, clicks, and average position are useful diagnostic signals. They are not always useful boardroom language.",
          "A business wants to know whether organic search is creating qualified demand, reducing paid dependency, supporting revenue, or uncovering customer intent. SEO reporting should translate technical signals into business meaning.",
        ],
      },
      {
        id: "metrics-that-connect-to-outcomes",
        heading: "Metrics that connect to outcomes",
        paragraphs: [
          "The strongest SEO metrics sit closer to business impact. They show what organic search is doing for leads, purchases, revenue, assisted journeys, and customer acquisition.",
          "This does not mean ignoring technical metrics. It means using them to explain why performance changed and what should happen next.",
        ],
        bullets: [
          "Organic leads and lead quality.",
          "Organic purchases and ecommerce revenue.",
          "Assisted conversions from organic landing pages.",
          "Non branded demand growth.",
          "Content contribution by topic or funnel stage.",
          "Technical fixes tied to measurable search impact.",
        ],
      },
      {
        id: "how-to-use-ga4-and-search-console",
        heading: "How to use GA4 and Search Console together",
        paragraphs: [
          "Search Console explains how people find the site. GA4 explains what people do after they arrive. One tool shows search demand and visibility. The other shows behaviour, engagement, and conversion.",
          "Together, they help move reporting from activity to impact. A page gaining impressions but not leads may need stronger intent alignment. A page with fewer clicks but higher conversion value may deserve more internal support.",
        ],
      },
      {
        id: "technical-seo-as-commercial-context",
        heading: "Technical SEO as commercial context",
        paragraphs: [
          "Technical SEO should not be reported as a checklist. It should be reported as risk, opportunity, and impact.",
          "A redirect fix, schema deployment, crawl improvement, or template change becomes more meaningful when it is connected to indexation, visibility, revenue pages, or lead generation paths.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are rankings still worth reporting?",
        answer:
          "Yes, but rankings should not sit alone. They are most useful when connected to search demand, click through behaviour, and business outcomes.",
      },
      {
        question: "What is the best SEO metric for a business?",
        answer:
          "There is no single best metric. For lead generation it may be qualified organic leads. For ecommerce it may be organic revenue, assisted revenue, or purchase rate.",
      },
      {
        question: "How should technical SEO work be reported?",
        answer:
          "Report the technical change, the reason it mattered, the affected templates or pages, and the search or commercial impact that followed.",
      },
    ],
  },
  {
    slug: "geo-is-not-a-replacement-for-seo",
    title: "GEO Is Not a Replacement for SEO",
    excerpt:
      "Generative engine optimisation is often framed as a new discipline. In practice, most of the durable work still comes from strong SEO fundamentals.",
    category: "AI Search",
    date: "Jun 2026",
    readTime: "2 min read",
    sections: [
      {
        id: "what-geo-gets-wrong",
        heading: "What GEO gets wrong",
        paragraphs: [
          "The phrase generative engine optimisation can make AI search sound like a completely separate discipline. That is where the confusion starts.",
          "AI systems still need to understand topics, entities, sources, authority, and usefulness. Those are not new problems. They are familiar SEO problems expressed through a new interface.",
        ],
      },
      {
        id: "what-still-matters",
        heading: "What still matters",
        paragraphs: [
          "The work that improves AI search visibility is usually the same work that improves organic search quality. Clear pages, useful answers, strong internal links, reliable source signals, and technically accessible content remain central.",
          "A site that cannot be crawled, understood, or trusted will struggle in both traditional search and AI generated results.",
        ],
        bullets: [
          "Crawlable, indexable content.",
          "Clear entity signals and consistent naming.",
          "Helpful answers written for real user intent.",
          "Structured data where it clarifies meaning.",
          "Topical depth supported by internal linking.",
          "External brand mentions and credible references.",
        ],
      },
      {
        id: "why-the-label-can-be-dangerous",
        heading: "Why the label can be dangerous",
        paragraphs: [
          "A new label can encourage teams to chase shortcuts. That usually leads to thin content, shallow prompt chasing, and reports that look impressive without proving business value.",
          "The better approach is to treat AI search as an additional visibility surface and build the measurement around evidence, not hype.",
        ],
      },
      {
        id: "a-practical-way-forward",
        heading: "A practical way forward",
        paragraphs: [
          "Start with the topics that matter commercially. Strengthen the pages that answer those topics. Make the entities obvious. Add useful supporting content. Then measure whether the brand appears in search results, AI Overviews, answer engines, and downstream conversions.",
          "That is not a rejection of AI search. It is a more grounded way to prepare for it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is GEO a real discipline?",
        answer:
          "It can be useful as a label for AI search visibility work, but it should not be treated as separate from SEO fundamentals.",
      },
      {
        question: "What improves visibility in AI generated answers?",
        answer:
          "Clear content, strong entity signals, topical authority, crawlability, structured data, credible references, and consistent brand mentions can all help.",
      },
      {
        question: "Should businesses create a separate GEO strategy?",
        answer:
          "Most should extend their SEO strategy instead. Add AI visibility checks and answer engine monitoring, but keep the core work grounded in technical SEO, content quality, and authority.",
      },
    ],
  },
];

export const getArticle = (slug: string) => ARTICLES.find((article) => article.slug === slug);
