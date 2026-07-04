export type ArticleTextLink = {
  text: string;
  href: string;
};

export type ArticleParagraph = string | {
  text: string;
  links: ArticleTextLink[];
};

export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: ArticleParagraph[];
  bullets?: string[];
  numberedSteps?: string[];
  imageBlocks?: ArticleImage[];
  imageLayout?: string;
  imageCarousel?: ArticleImageCarousel;
  chart?: ArticleChart;
  comparisonTable?: ArticleComparisonTable;
  imagePlaceholder?: string;
  closingParagraphs?: ArticleParagraph[];
  link?: {
    href: string;
    label: string;
  };
  links?: {
    href: string;
    label: string;
  }[];
};

export type ArticleImage = {
  src: string;
  alt: string;
  caption: string;
};

export type ArticleImageCarousel = {
  title: string;
  description: string;
  images: ArticleImage[];
};

export type ArticleComparisonTable = {
  columns: string[];
  rows: string[][];
};

export type ArticleChart = {
  title: string;
  subtitle: string;
  axisLabel: string;
  sourceLabel: string;
  rows: {
    label: string;
    value: number;
  }[];
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
  archived?: boolean;
  sections: ArticleSection[];
  faqs: ArticleFaq[];
};

type ArticleInput = Omit<Article, "readTime"> & {
  readTime?: string;
};

const WORDS_PER_MINUTE = 200;

const countWords = (text: string) => text.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length ?? 0;

export const articleParagraphText = (paragraph: ArticleParagraph) =>
  typeof paragraph === "string" ? paragraph : paragraph.text;

const calculateReadTime = (article: ArticleInput) => {
  const visibleText: string[] = [article.title, article.excerpt];

  article.sections.forEach((section) => {
    visibleText.push(section.heading, ...section.paragraphs.map(articleParagraphText));
    visibleText.push(...(section.bullets ?? []));
    visibleText.push(...(section.numberedSteps ?? []));
    visibleText.push(...(section.closingParagraphs ?? []).map(articleParagraphText));

    section.imageBlocks?.forEach((image) => {
      visibleText.push(image.caption);
    });

    if (section.imageCarousel) {
      visibleText.push(section.imageCarousel.title, section.imageCarousel.description);
      section.imageCarousel.images.forEach((image) => visibleText.push(image.alt, image.caption));
    }

    if (section.chart) {
      visibleText.push(section.chart.title, section.chart.subtitle, section.chart.axisLabel, section.chart.sourceLabel);
      section.chart.rows.forEach((row) => visibleText.push(row.label, String(row.value)));
    }

    if (section.imagePlaceholder) {
      visibleText.push(section.imagePlaceholder);
    }

    if (section.comparisonTable) {
      visibleText.push(...section.comparisonTable.columns);
      section.comparisonTable.rows.forEach((row) => visibleText.push(...row));
    }

    if (section.link) {
      visibleText.push(section.link.label);
    }

    section.links?.forEach((link) => visibleText.push(link.label));
  });

  article.faqs.forEach((faq) => {
    visibleText.push(faq.question, faq.answer);
  });

  const minutes = Math.max(1, Math.ceil(countWords(visibleText.join(" ")) / WORDS_PER_MINUTE));
  return `${minutes} min read`;
};

const withCalculatedReadTime = (article: ArticleInput): Article => ({
  ...article,
  readTime: calculateReadTime(article),
});

const ARTICLE_INPUTS: ArticleInput[] = [
  {
    slug: "social-media-seo-ai-era",
    title: "Social Media SEO in the AI Era",
    excerpt:
      "A practical look at how social media affects SEO in 2026, from branded SERP visibility and content discovery to AI Overviews, LLM citations, and off-page authority.",
    category: "Social Media SEO",
    date: "Jul 2026",
    sections: [
      {
        id: "what-social-media-seo-is",
        heading: "What social media SEO means in 2026",
        paragraphs: [
          "Social media SEO is the practice of making brand, creator, and content activity on social platforms easier to discover, understand, trust, and connect back to the wider organic search strategy.",
          "It does not mean that every like, share, or follower count is a direct Google ranking factor. The more useful way to think about it is that social media can influence discovery, branded demand, entity recognition, content distribution, reputation, and the sources people and AI systems encounter when researching a topic.",
          {
            text: "This is why social media now sits inside a wider off-page SEO strategy. The website is still the home base, but platforms such as YouTube, LinkedIn, Reddit, Instagram, TikTok, Facebook, and niche communities can shape how people search for a brand and how confidently search systems understand it.",
            links: [
              {
                text: "off-page SEO strategy",
                href: "/blog/off-page-seo-in-2026",
              },
            ],
          },
        ],
        bullets: [
          "Social profiles can rank for branded searches and occupy more SERP real estate.",
          "Social content can be discovered directly inside Google results, platform search, and AI-assisted answers.",
          "Useful posts can create secondary demand by encouraging people to search for the brand, product, person, or topic later.",
          "Community conversations can reveal how real users describe problems, objections, comparisons, and alternatives.",
          "Social platforms can help distribute assets that earn links, mentions, embeds, newsletter references, and PR opportunities.",
        ],
      },
      {
        id: "how-social-media-impacts-seo",
        heading: "How social media impacts SEO",
        paragraphs: [
          "The SEO impact of social media is mostly indirect, but indirect does not mean unimportant. Search visibility is shaped by more than what happens on a website. It is shaped by what people search, where they discover a brand, what independent sources mention it, and whether the same entity is described consistently across the web.",
          "A strong social presence can help SEO by improving content distribution. When an article, tool, video, report, or opinion reaches the right audience, it has a better chance of earning links, branded searches, newsletter mentions, podcast references, forum discussions, and PR coverage.",
          "It can also help search intent research. Comments, replies, DMs, Reddit threads, LinkedIn discussions, and YouTube comments often reveal the exact language people use before that language appears in keyword tools.",
        ],
        comparisonTable: {
          columns: ["Social Activity", "SEO Impact", "What To Measure"],
          rows: [
            ["Consistent branded profiles", "Improves branded SERP coverage and entity consistency.", "Branded rankings, profile visibility, knowledge panel signals, referral clicks."],
            ["Educational posts and clips", "Creates demand and supports topical authority beyond the website.", "Branded search growth, assisted conversions, engagement quality."],
            ["Community discussions", "Reveals real user language, pain points, and comparison intent.", "Repeated questions, objections, product terms, competitor mentions."],
            ["Social distribution of assets", "Increases the chance of links, mentions, embeds, and PR pickup.", "Backlinks, unlinked mentions, newsletter references, referring domains."],
            ["YouTube and video content", "Can appear in Google results and support richer search visibility.", "Video impressions, watch time, SERP appearances, embedded page engagement."],
          ],
        },
      },
      {
        id: "social-media-in-ai-search",
        heading: "Social media in AI search and LLM visibility",
        paragraphs: [
          {
            text: "AI search has made social media more important because AI systems often need fresh, human, experience-led sources to answer messy real-world questions. Google's own guidance on generative AI search says SEO best practices still matter because AI features are rooted in Search ranking and quality systems, while also rewarding useful, non-commodity content and first-hand experience.",
            links: [
              {
                text: "Google's own guidance on generative AI search",
                href: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide",
              },
            ],
          },
          {
            text: "The shift is visible in citation data too. Semrush's study of the most-cited domains in LLM responses placed community, social, and content platforms such as Reddit, LinkedIn, Wikipedia, Medium, YouTube, Facebook, Quora, and Instagram among the domains that AI systems reference frequently.",
            links: [
              {
                text: "Semrush's study of the most-cited domains in LLM responses",
                href: "https://www.semrush.com/blog/most-cited-domains-ai/",
              },
            ],
          },
          "This does not mean every brand should chase every platform. It means social content is increasingly part of the public evidence layer around a brand, person, product, or topic. If that evidence is thin, inconsistent, overly promotional, or absent, AI systems and users have less to work with.",
        ],
        bullets: [
          "Reddit-style discussions can surface authentic experience, objections, and comparisons.",
          "LinkedIn can strengthen professional entity signals for people, teams, and B2B brands.",
          "YouTube can support search visibility through videos, transcripts, embeds, and VideoObject schema on relevant pages.",
          "Instagram and TikTok can influence discovery and branded demand, especially where visuals, locations, products, and creators matter.",
          "Quora, forums, and niche communities can reveal questions that deserve stronger website content.",
        ],
        imageCarousel: {
          title: "Examples of Social Sources in AI Overviews",
          description:
            "These screenshots show YouTube and Facebook results appearing as cited or supporting examples inside an AI Overview source panel.",
          images: [
            {
              src: "/article-images/ai-overview-youtube-social-source.png",
              alt: "AI Overview source panel highlighting a YouTube result for a brownie-related query.",
              caption:
                "YouTube result highlighted inside an AI Overview source panel, showing how video platforms can become part of AI-assisted discovery.",
            },
            {
              src: "/article-images/ai-overview-facebook-blue-bowl.png",
              alt: "AI Overview source panel highlighting a Facebook result from Blue Bowl Recipes.",
              caption:
                "Facebook content highlighted in an AI Overview source panel, showing that social posts can appear alongside traditional web pages.",
            },
            {
              src: "/article-images/ai-overview-facebook-recipetin.png",
              alt: "AI Overview source panel highlighting a Facebook result from RecipeTin Eats.",
              caption:
                "Another Facebook example in an AI Overview source panel, reinforcing how platform content can support search and AI visibility.",
            },
          ],
        },
      },
      {
        id: "platform-by-platform",
        heading: "Platform-by-platform SEO opportunities",
        paragraphs: [
          "Different platforms support SEO in different ways. The mistake is treating every channel as a place to repost the same caption. The better approach is to understand what each platform contributes to discovery, trust, and evidence.",
          {
            text: "YouTube deserves special attention because it is both a social platform and a search engine. A well-optimised video can rank on YouTube, appear in Google results, support a website page when embedded, and strengthen the wider organic strategy.",
            links: [
              {
                text: "well-optimised video",
                href: "/blog/youtube-seo-in-2026",
              },
            ],
          },
        ],
        bullets: [
          "LinkedIn: useful for B2B authority, expert commentary, employee advocacy, case study distribution, and professional entity visibility.",
          "YouTube: useful for tutorials, explainers, product demos, reviews, webinars, interviews, and embedded video SEO.",
          "Reddit and forums: useful for understanding real user language, pain points, comparisons, and reputation risks.",
          "Instagram: useful for visual proof, local discovery, product storytelling, creators, and brand familiarity.",
          "TikTok: useful for demand creation, short educational clips, product discovery, and early trend signals.",
          "Facebook: still useful for local communities, reviews, events, groups, and older audience segments in many markets.",
          "Pinterest: useful for visual search, evergreen inspiration, ecommerce, recipes, design, travel, fashion, and planning-led queries.",
        ],
      },
      {
        id: "how-to-optimise-social-profiles",
        heading: "How to optimise social profiles for SEO",
        paragraphs: [
          "Profile optimisation is the foundation. If the brand name, handles, bios, links, locations, descriptions, and visual identity are inconsistent, search engines and users receive a weaker entity signal.",
          {
            text: "At a technical level, a website can also use Organization or Person structured data with sameAs references to connect official social profiles to the main entity. Schema.org describes sameAs as a URL that unambiguously indicates the identity of the item.",
            links: [
              {
                text: "sameAs",
                href: "https://schema.org/sameAs",
              },
            ],
          },
        ],
        numberedSteps: [
          "Use a consistent brand, person, or organisation name across platforms.",
          "Keep handles as consistent as possible, especially for branded search clarity.",
          "Write bios that clearly explain who you help, what you do, and the topics you cover.",
          "Link back to the most relevant website page, not always only the homepage.",
          "Keep location, contact, and business information consistent where relevant.",
          "Use profile images and banners that match the wider brand identity.",
          "Add official social profile links to the website and structured data where appropriate.",
          "Refresh pinned posts, featured links, playlists, and highlights so the first impression is current.",
        ],
      },
      {
        id: "content-strategy",
        heading: "A social content strategy that supports SEO",
        paragraphs: [
          "The best social media strategy for SEO starts with assets worth discovering. That could be a guide, tool, dataset, template, case study, video, original opinion, research breakdown, or practical checklist.",
          "From there, social content should distribute and reframe the asset. One article can become a LinkedIn post, a short video, a YouTube explainer, a carousel, a Reddit discussion prompt, a newsletter section, and a series of FAQs. Each format should add something useful for that platform rather than simply pointing back to the article.",
          "The strongest signal is usefulness. If social posts help people understand a problem, make a decision, compare options, or do something more effectively, they are more likely to earn engagement that matters: saves, replies, shares, branded searches, mentions, links, and qualified traffic.",
        ],
        bullets: [
          "Turn strong website content into native social formats.",
          "Use social comments and questions to improve website FAQs and article sections.",
          "Repurpose videos into embedded website assets with transcripts and schema where useful.",
          "Create original data, tools, templates, and opinion-led content that people have a reason to reference.",
          "Use employee and expert voices where trust matters more than brand polish.",
          "Track which social topics lead to branded search, assisted conversions, links, and enquiries.",
        ],
      },
      {
        id: "measurement",
        heading: "How to measure social media's SEO impact",
        paragraphs: [
          "The biggest measurement mistake is expecting social media to behave like last-click organic search. Social often works earlier in the journey. It creates awareness, trust, memory, and demand before a user searches, visits, converts, or mentions the brand elsewhere.",
          "Measurement should connect platform metrics with search and business outcomes. A post with fewer likes but strong saves, profile visits, branded searches, demo requests, newsletter signups, or link pickup may be more valuable than a viral post that attracts the wrong audience.",
        ],
        bullets: [
          "Track branded search growth in Google Search Console.",
          "Review social referral traffic and assisted conversions in GA4.",
          "Monitor unlinked brand mentions, backlinks, newsletter mentions, and podcast references.",
          "Watch profile rankings and branded SERP coverage.",
          "Use UTM parameters for important campaign links.",
          "Compare social topics against organic search impressions, queries, and content updates.",
          "Track AI search visibility manually or with specialist tools where budget allows.",
        ],
        closingParagraphs: [
          "Social media is not a replacement for technical SEO, content strategy, or link building. It is the distribution, conversation, and evidence layer that helps people and search systems understand why a brand deserves attention.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does social media directly improve Google rankings?",
        answer:
          "Not in the simple sense of likes or follower counts acting as direct ranking factors. Social media usually supports SEO indirectly through discovery, branded searches, content distribution, links, mentions, reputation, and entity consistency.",
      },
      {
        question: "Can social media content appear in search results?",
        answer:
          "Yes. Social profiles, YouTube videos, Reddit threads, LinkedIn posts, Instagram content, TikTok results, and other platform pages can appear in search results depending on the query, platform accessibility, and search intent.",
      },
      {
        question: "Why does social media matter more in the AI era?",
        answer:
          "AI systems often draw from public web content and sources that show real experience, discussion, and up-to-date context. Social platforms and communities can become part of the evidence layer around a brand, person, product, or topic.",
      },
      {
        question: "Which social platform is best for SEO?",
        answer:
          "It depends on the audience and topic. YouTube is especially strong for search-led video discovery, LinkedIn is useful for B2B authority, Reddit and forums reveal real user language, and visual platforms can support product, local, creator, and lifestyle discovery.",
      },
      {
        question: "Should every website add social profile schema?",
        answer:
          "If the profiles are official and important to the entity, structured data with sameAs references can help connect the website to those profiles. It should be accurate, consistent, and supported by visible links where appropriate.",
      },
      {
        question: "How should SEO and social teams work together?",
        answer:
          "SEO teams can provide search intent, content gaps, priority topics, and measurement. Social teams can provide audience language, creative formats, distribution, community insight, and trend feedback. The strongest results happen when both teams plan around the same assets and business goals.",
      },
    ],
  },
  {
    slug: "youtube-seo-in-2026",
    title: "YouTube SEO in 2026: Audits, Embeds, and Video Schema",
    excerpt:
      "A practical guide to YouTube SEO in 2026, covering channel audits, video optimisation, embedded YouTube videos, and VideoObject schema markup.",
    category: "Video SEO",
    date: "Jul 2026",
    sections: [
      {
        id: "what-youtube-seo-is",
        heading: "What YouTube SEO is in 2026",
        paragraphs: [
          "YouTube SEO is the process of making videos and channels easier to discover, understand, watch, and trust across YouTube, Google Search, Google video surfaces, and wider AI-assisted discovery.",
          "It is not only about adding tags or repeating keywords in a title. Good YouTube SEO connects audience intent, video packaging, content quality, retention, channel authority, website embeds, and structured data into one system.",
          "In 2026, YouTube SEO sits between search, content strategy, brand building, and off-page SEO. A useful video can rank on YouTube, appear in Google results, support AI visibility, earn branded searches, and make website pages more engaging.",
        ],
        bullets: [
          "Optimise the video title, description, thumbnail, chapters, transcript, and on-video content around real user intent.",
          "Improve watch behaviour by making the opening clear, useful, and aligned with the promise of the title and thumbnail.",
          "Use playlists and channel structure to group related topics.",
          "Support video discovery from the website with embedded videos, helpful surrounding content, and schema markup.",
          "Measure performance through views, retention, search traffic, referral clicks, leads, branded search, and assisted conversions.",
        ],
        link: {
          href: "/blog/off-page-seo-in-2026",
          label: "Read how YouTube fits into off-page SEO",
        },
      },
      {
        id: "benefits-of-youtube-seo",
        heading: "The benefits of YouTube SEO",
        paragraphs: [
          "The biggest benefit of YouTube SEO is discoverability. People use YouTube to learn, compare, review, troubleshoot, and validate whether they trust a person, brand, product, or service.",
          "For businesses and specialists, YouTube can also support authority. A well-structured video can demonstrate expertise faster than a page of copy, especially when the user needs to see a process, explanation, product, location, or result.",
        ],
        bullets: [
          "Increases visibility across YouTube search, suggested videos, Google Search, video results, and Google Discover where eligible.",
          "Builds trust by showing expertise, personality, process, and proof in a more human format.",
          "Supports website engagement when videos are embedded on relevant pages.",
          "Creates another discovery path for users who prefer watching before reading or enquiring.",
          "Can support branded demand when users discover the channel before searching for the brand directly.",
          "Provides reusable content that can be repurposed into articles, clips, social posts, FAQs, and sales enablement material.",
        ],
      },
      {
        id: "how-to-audit-a-youtube-channel",
        heading: "How to audit a YouTube channel",
        paragraphs: [
          "A YouTube SEO audit should start with the channel as a whole before moving into individual videos. The goal is to understand whether the channel has a clear topic focus, strong packaging, useful metadata, and content that earns attention after the click.",
          {
            text: "Tools can speed up the first pass. TubePilot's YouTube Channel Audit tool describes itself as a free tool for analysing channel performance and helping optimise growth and engagement. TubeRanker also provides a YouTube audit tool that can be used as part of a channel review workflow.",
            links: [
              {
                text: "TubePilot's YouTube Channel Audit tool",
                href: "https://tubepilot.ai/tools/youtube-channel-audit/",
              },
              {
                text: "TubeRanker",
                href: "https://tuberanker.com/youtube-audit",
              },
            ],
          },
          "The tool output should not replace judgement. A useful audit connects tool findings with actual search intent, audience behaviour, channel positioning, and business goals.",
        ],
        numberedSteps: [
          "Review the channel positioning: name, handle, banner, profile image, about section, links, and topic clarity.",
          "Check whether the channel has logical playlists and a clear content architecture.",
          "Review top videos by views, watch time, traffic source, retention, click-through rate, and conversions where available.",
          "Audit video titles for intent, clarity, differentiation, and promise accuracy.",
          "Review thumbnails for readability, contrast, subject clarity, and consistency across the channel.",
          "Check descriptions for useful summaries, links, timestamps, chapters, and supporting resources.",
          "Review captions, transcripts, and spoken content to see whether the video actually covers the search intent.",
          "Compare competing channels and videos to understand what formats, topics, lengths, and angles are already working.",
          "Prioritise fixes by potential impact: packaging, topic gaps, weak descriptions, missing chapters, poor embeds, and missing schema.",
        ],
      },
      {
        id: "video-level-optimisation",
        heading: "How to optimise individual YouTube videos",
        paragraphs: [
          "A video audit looks at whether each video earns the click and then satisfies the viewer. If a video has a good topic but weak packaging, it may never get watched. If the packaging is strong but the content does not deliver quickly, retention will suffer.",
          "The strongest optimisation usually starts before upload. Plan the target query, audience problem, opening hook, video structure, chapters, and supporting page before the video goes live.",
        ],
        bullets: [
          "Use a clear title that matches the viewer's problem or desired outcome.",
          "Design thumbnails that can be understood quickly on mobile and desktop.",
          "Write descriptions that summarise the video, include useful links, and add context without stuffing keywords.",
          "Add chapters with accurate timestamps so users can navigate the video quickly.",
          "Use captions or transcripts where possible to support accessibility and content understanding.",
          "Mention the main topic naturally in the spoken intro and deliver value early.",
          "Use end screens, playlists, and pinned comments to guide the next useful action.",
        ],
      },
      {
        id: "embedded-youtube-videos",
        heading: "Embedded YouTube videos on websites",
        paragraphs: [
          "Embedded YouTube videos can strengthen a webpage when the video genuinely supports the page intent. A product demo, tutorial, explainer, webinar clip, case study, or walkthrough can help users understand something faster than text alone.",
          "The mistake is embedding videos as decoration. A video should sit near relevant copy, answer the same search intent as the page, and have enough surrounding context for users and search engines to understand why it is there.",
          "From an SEO perspective, embedded videos can improve engagement and help a page qualify for richer video understanding when the page is crawlable, the video is visible, and the right structured data is present.",
        ],
        bullets: [
          "Place the video close to the section it supports rather than hiding it at the bottom of the page.",
          "Add a short intro explaining what the viewer will learn or see.",
          "Include a transcript or summary for accessibility, scannability, and search context.",
          "Use a strong static thumbnail or YouTube thumbnail that clearly represents the video.",
          "Lazy-load embeds where possible so the video does not hurt page performance.",
          "Make the video responsive so it works properly on mobile.",
          "Avoid embedding several heavy videos on one page unless they are genuinely useful.",
        ],
      },
      {
        id: "video-schema-markup",
        heading: "Video schema markup",
        paragraphs: [
          {
            text: "Video schema helps search engines understand video content on a webpage. Google's video structured data documentation explains that VideoObject markup can influence details shown in video results, such as the description, thumbnail URL, upload date, and duration, and can make it easier for Google to find the video.",
            links: [
              {
                text: "Google's video structured data documentation",
                href: "https://developers.google.com/search/docs/appearance/structured-data/video",
              },
            ],
          },
          "For embedded YouTube videos, the schema should describe the video that appears on the page and should match the visible content. Do not add video schema for a video that is hidden, irrelevant, blocked, or not actually useful to the page.",
          {
            text: "A practical VideoObject setup usually includes the video name, description, thumbnailUrl, uploadDate, duration where available, and embedUrl. If you need a quicker starting point, the TechnicalSEO Schema Markup Generator can help create a draft before you validate and adjust it for the page.",
            links: [
              {
                text: "TechnicalSEO Schema Markup Generator",
                href: "https://technicalseo.com/tools/schema-markup-generator/",
              },
            ],
          },
        ],
        comparisonTable: {
          columns: ["Schema Field", "Why It Matters", "Implementation Note"],
          rows: [
            ["name", "Tells search engines the video title.", "Match the visible video title or a clear page-level version of it."],
            ["description", "Explains what the video covers.", "Keep it accurate and aligned with the page copy."],
            ["thumbnailUrl", "Provides the preview image Google can associate with the video.", "Use a crawlable thumbnail URL."],
            ["uploadDate", "Clarifies when the video was published.", "Use ISO 8601 date format."],
            ["duration", "Helps describe video length.", "Use ISO 8601 duration format such as PT3M24S."],
            ["embedUrl", "Points to the embedded player.", "For YouTube, use the YouTube embed URL for the video."],
            ["hasPart or timestamps", "Can support key moments when implemented correctly.", "Use only when the chapters are accurate and useful."],
          ],
        },
        closingParagraphs: [
          "After adding video schema, test it with Google's Rich Results Test and inspect the page in Search Console once it is live. Schema is not a ranking shortcut, but it helps search systems interpret the video more accurately.",
        ],
      },
      {
        id: "youtube-seo-workflow",
        heading: "A practical YouTube SEO workflow",
        paragraphs: [
          "The best YouTube SEO workflow connects the channel, the video, and the website page. Treat the video as part of the wider organic search system rather than a standalone upload.",
        ],
        numberedSteps: [
          "Choose the audience problem or search intent before recording.",
          "Research competing YouTube and Google results for the topic.",
          "Plan the video structure, hook, chapters, and supporting website page.",
          "Optimise the title, thumbnail, description, chapters, captions, and playlist placement.",
          "Embed the video on the most relevant webpage with useful surrounding copy.",
          "Add VideoObject schema where the page contains an indexable, useful embedded video.",
          "Measure channel metrics and website outcomes together.",
          "Update titles, thumbnails, descriptions, embeds, and schema as performance data comes in.",
        ],
        closingParagraphs: [
          "YouTube SEO in 2026 is not only a creator tactic. It is part of modern organic visibility. When videos, webpages, schema, and audience intent work together, YouTube can support search discovery, trust, engagement, and business outcomes.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is YouTube SEO?",
        answer:
          "YouTube SEO is the process of optimising videos and channels so they are easier to discover, understand, watch, and trust across YouTube, Google Search, video results, and wider organic discovery surfaces.",
      },
      {
        question: "What should a YouTube SEO audit include?",
        answer:
          "A YouTube SEO audit should review channel positioning, playlists, titles, thumbnails, descriptions, chapters, captions, retention, traffic sources, competing videos, embeds, and any video schema used on the website.",
      },
      {
        question: "Which tools can help with a YouTube audit?",
        answer:
          "Tools such as TubePilot's YouTube Channel Audit and TubeRanker's YouTube Audit can help with the first pass, but the findings should still be reviewed against search intent, audience behaviour, and business goals.",
      },
      {
        question: "Do embedded YouTube videos help SEO?",
        answer:
          "They can help when the video supports the page intent, improves engagement, is visible to users, has useful surrounding context, and is supported by accurate VideoObject schema where appropriate.",
      },
      {
        question: "What is VideoObject schema?",
        answer:
          "VideoObject schema is structured data that describes a video on a webpage, including details such as the name, description, thumbnail, upload date, duration, and embed URL.",
      },
      {
        question: "Should every embedded YouTube video have schema markup?",
        answer:
          "No. Add video schema when the video is important to the page, visible to users, relevant to the page content, and accurately described by the markup.",
      },
    ],
  },
  {
    slug: "wikipedia-for-seo-and-knowledge-graphs",
    title: "Wikipedia for SEO, Knowledge Graphs, and AI Search",
    excerpt:
      "A practical look at what Wikipedia is, why it matters for SEO, how the backlink value has changed, and why it still matters in the AI search age.",
    category: "Authority Building",
    date: "Jul 2026",
    sections: [
      {
        id: "what-wikipedia-is",
        heading: "What Wikipedia is",
        paragraphs: [
          "Wikipedia is a free, community-edited online encyclopedia. Its purpose is not to promote brands, sell products, or help marketers build backlinks. Its purpose is to document notable topics using reliable, independent sources.",
          "That distinction matters for SEO. Wikipedia is powerful because it is trusted, heavily referenced, structured, and widely used across the web. But it is not a place where every business, person, product, or campaign automatically belongs.",
          "A Wikipedia page usually needs notability. That means the subject should have meaningful coverage from independent sources, not only its own website, social profiles, press releases, or paid placements.",
        ],
      },
      {
        id: "why-wikipedia-matters-for-seo",
        heading: "Why Wikipedia matters for SEO",
        paragraphs: [
          "From an SEO perspective, Wikipedia matters less as a ranking shortcut and more as an authority and entity signal. It can help search systems understand what a topic is, how it relates to other topics, and which sources support that understanding.",
          "For well-known people, organisations, places, books, films, public figures, products, and concepts, Wikipedia often becomes part of the public evidence layer around that entity. It can influence how users validate information and how search engines connect facts across the web.",
          "The benefit is not simply traffic from Wikipedia. The bigger benefit is credibility, entity clarity, and the possibility of supporting wider visibility in search features that depend on structured understanding.",
        ],
        bullets: [
          "It can support entity recognition when a subject is notable and well documented.",
          "It can help users validate public information about a person, organisation, place, or topic.",
          "It can contribute to the broader source ecosystem around a brand or entity.",
          "It can send referral traffic when a citation is genuinely useful.",
          "It can support trust when it aligns with independent coverage, structured data, Wikidata, and consistent brand information elsewhere.",
        ],
      },
      {
        id: "knowledge-graphs",
        heading: "Wikipedia and search engine knowledge graphs",
        paragraphs: [
          "A knowledge graph is a structured way of understanding entities and the relationships between them. Instead of only matching words on pages, search engines use entity understanding to connect people, organisations, places, topics, products, and facts.",
          "Wikipedia and Wikidata are important in this context because they provide structured, widely referenced information about notable entities. They are not the only sources search engines use, but they can be part of the evidence that helps systems understand what an entity is and how it connects to other entities.",
          "This is why Wikipedia often appears around Knowledge Panels, entity results, and fact-based search experiences. It helps create a clearer public record, especially when it is supported by other reliable sources.",
        ],
        comparisonTable: {
          columns: ["Element", "Role in Search Understanding", "SEO Implication"],
          rows: [
            [
              "Wikipedia",
              "Provides encyclopedic context, citations, and public explanations of notable entities.",
              "Can support credibility and entity clarity, but should not be used as a promotional page.",
            ],
            [
              "Wikidata",
              "Stores structured facts about entities and relationships in a machine-readable way.",
              "Can help reinforce entity consistency when information is accurate and properly sourced.",
            ],
            [
              "Knowledge Graph",
              "Connects entities and facts so search engines can understand meaning beyond keywords.",
              "Makes consistent entity signals, reliable sources, schema, and public mentions more important.",
            ],
          ],
        },
      },
      {
        id: "backlinking-has-changed",
        heading: "What changed from a backlinking perspective",
        paragraphs: [
          "Years ago, many SEOs treated Wikipedia as a dream backlink target because the domain had enormous authority. That mindset created abuse. People tried to insert links for ranking value, not because the link genuinely improved the article.",
          "Wikipedia responded by making external links nofollow. That means Wikipedia should not be treated as a clean follow-link strategy or a way to pass traditional link equity.",
          "This does not make Wikipedia worthless for SEO. It changes the reason it matters. The value is now closer to citation quality, referral discovery, entity validation, and knowledge graph support than direct PageRank-style link building.",
        ],
        bullets: [
          "Do not add Wikipedia links for self-promotion or backlink value.",
          "Do not create or edit a page unless the subject has genuine notability and independent coverage.",
          "A nofollow citation can still support discovery and trust when it is relevant.",
          "The best SEO outcome comes from becoming citation-worthy, not forcing a link into an article.",
          "If the source would not improve the Wikipedia article for readers, it probably should not be there.",
        ],
      },
      {
        id: "impact-in-the-ai-age",
        heading: "Wikipedia in the AI search age",
        paragraphs: [
          "In the AI search age, Wikipedia matters because AI systems and search engines need reliable context about entities. AI Overviews, answer engines, assistants, and LLM-powered discovery experiences all depend on understanding who or what something is, what it is connected to, and which sources support that understanding.",
          "That does not mean having a Wikipedia page guarantees AI visibility. It does not. But a well-sourced Wikipedia presence, supported by Wikidata, structured data, credible mentions, and consistent information across the web, can strengthen the broader entity footprint that AI systems may use when forming answers.",
          "The new opportunity is not to game Wikipedia. The opportunity is to build public evidence. Strong content, independent coverage, digital PR, original data, useful tools, and accurate structured information all make it easier for both search engines and AI systems to understand a brand or topic.",
        ],
        bullets: [
          "AI systems need entity context, not only keyword-optimised pages.",
          "Wikipedia can act as one public trust source for notable entities.",
          "Wikidata can reinforce structured facts when information is accurate.",
          "Independent sources matter because Wikipedia depends on external evidence.",
          "Brands should focus on consistency across their website, schema, social profiles, PR coverage, directories, and knowledge sources.",
        ],
        chart: {
          title: "Top Cited Domains on LLMs",
          subtitle: "ChatGPT, Google AI Mode, and Perplexity: October 2025",
          axisLabel: "Percentage of LLM responses with a citation",
          sourceLabel: "Theme-adapted visual recreation based on Semrush's study of 230K prompts in October 2025.",
          rows: [
            { label: "reddit.com", value: 9.7 },
            { label: "linkedin.com", value: 8.9 },
            { label: "wikipedia.org", value: 7.6 },
            { label: "medium.com", value: 4.8 },
            { label: "youtube.com", value: 4.1 },
            { label: "google.com", value: 4.0 },
            { label: "nih.gov", value: 4.0 },
            { label: "forbes.com", value: 3.3 },
            { label: "amazon.com", value: 2.6 },
            { label: "microsoft.com", value: 2.5 },
            { label: "arxiv.org", value: 2.5 },
            { label: "prnewswire.com", value: 2.1 },
            { label: "blog.google", value: 1.9 },
            { label: "facebook.com", value: 1.8 },
            { label: "quora.com", value: 1.8 },
            { label: "moldstud.com", value: 1.6 },
            { label: "apple.com", value: 1.5 },
            { label: "mdpi.com", value: 1.4 },
            { label: "g2.com", value: 1.4 },
            { label: "instagram.com", value: 1.4 },
          ],
        },
        link: {
          href: "https://www.semrush.com/blog/most-cited-domains-ai/",
          label: "View the Semrush AI citations study",
        },
      },
      {
        id: "how-to-approach-wikipedia-for-seo",
        heading: "How to approach Wikipedia for SEO",
        paragraphs: [
          "The safest way to approach Wikipedia is to stop thinking like a link builder and start thinking like an editor. The question is not, can I get a backlink? The question is, does this source help the public understand a notable topic more accurately?",
          "For most businesses, the better SEO strategy is not to force a Wikipedia page. It is to build the kind of independent evidence that would make the business, person, product, or topic genuinely notable over time.",
        ],
        numberedSteps: [
          "Check whether the subject has independent, reliable coverage from credible sources.",
          "Avoid using press releases, owned content, paid placements, or thin mentions as the main evidence.",
          "Use Schema.org markup on the official website, and keep it aligned with public entity sources such as Wikidata, Wikipedia, social profiles, business listings, and credible third-party coverage.",
          "Build authority through digital PR, useful tools, original research, industry coverage, and credible citations.",
          "Review Wikidata only where there is a legitimate entity record and accurate sourced information.",
          "Treat Wikipedia citations as public evidence and referral opportunities, not ranking shortcuts.",
        ],
        closingParagraphs: [
          "Wikipedia is still relevant to SEO, but the value has shifted. It is no longer about chasing a powerful backlink. It is about entity clarity, trustworthy public evidence, and the way search engines and AI systems understand the web.",
        ],
        link: {
          href: "/blog/off-page-seo-in-2026",
          label: "Read the related Off-Page SEO article",
        },
      },
    ],
    faqs: [
      {
        question: "Is Wikipedia good for SEO?",
        answer:
          "Yes, but not mainly because of backlink value. Wikipedia can support SEO through trust, entity clarity, referral traffic, citations, and its role in the wider public knowledge ecosystem.",
      },
      {
        question: "Are Wikipedia backlinks follow or nofollow?",
        answer:
          "Wikipedia external links are generally nofollow, so they should not be treated as a traditional follow backlink strategy.",
      },
      {
        question: "Can any business create a Wikipedia page?",
        answer:
          "No. A subject usually needs notability supported by reliable, independent sources. Owned content, press releases, and promotional mentions are usually not enough.",
      },
      {
        question: "How does Wikipedia connect to Google's Knowledge Graph?",
        answer:
          "Wikipedia and Wikidata can be part of the public source ecosystem that helps search systems understand notable entities, relationships, and facts, although search engines use many sources and do not rely on Wikipedia alone.",
      },
      {
        question: "Does Wikipedia help AI visibility?",
        answer:
          "It can help indirectly when it strengthens entity understanding and public evidence, but it does not guarantee AI Overview or LLM visibility. It works best alongside credible mentions, schema, Wikidata, social profiles, and consistent brand information.",
      },
      {
        question: "What is the right Wikipedia strategy for SEO?",
        answer:
          "Build citation-worthy evidence first. Focus on notability, independent coverage, accurate entity information, and useful public sources instead of trying to force backlinks.",
      },
    ],
  },
  {
    slug: "off-page-seo-in-2026",
    title: "Off-Page SEO Is More Than Link Building",
    excerpt:
      "A practical view of off-page SEO in 2026, covering link building, YouTube SEO, Wikipedia, social media, and how authority is built beyond your own website.",
    category: "Authority Building",
    date: "Jul 2026",
    sections: [
      {
        id: "what-off-page-seo-means",
        heading: "What off-page SEO means in 2026",
        paragraphs: [
          "Off-page SEO is the work that helps a website build authority, trust, and discoverability outside of its own pages. It includes backlinks, brand mentions, digital PR, local citations, social visibility, video discovery, reviews, and the wider signals that help people and search engines understand whether a brand is credible.",
          "In 2026, off-page SEO is less about chasing one magic ranking factor and more about building a strong footprint across the places where people discover, compare, and validate businesses. Search behaviour is spread across Google, YouTube, social platforms, AI answers, directories, communities, and publications.",
          "The goal is not only to get links. The goal is to become easier to find, easier to trust, and easier to reference.",
        ],
      },
      {
        id: "link-building",
        heading: "Link building remains the foundation",
        paragraphs: [
          "Link building is still one of the clearest off-page SEO disciplines because links connect your site to the wider web. A relevant link from a trusted website can support rankings, referral traffic, brand discovery, and topical authority.",
          "The important shift is quality. Strong link building is not about buying random placements or chasing every directory that accepts submissions. It is about creating great content, tools, data, resources, or stories that give other websites a real reason to reference you.",
          "Digital PR, credible business directories, partner mentions, and useful industry resources are often stronger than old-school link outreach because they create value beyond the backlink itself.",
        ],
        bullets: [
          "Prioritise links from websites with topical, local, or industry relevance.",
          "Use digital PR when you have a story, data point, expert quote, tool, or useful asset worth covering.",
          "Work with PR teams or partner agencies so SEO can support announcements, campaigns, interviews, and media opportunities.",
          "Treat paid or sponsored placements carefully and qualify them correctly with sponsored or nofollow attributes.",
          "Measure links alongside referral traffic, branded search movement, and real business outcomes.",
        ],
        link: {
          href: "/blog/link-building-in-2026",
          label: "Read the full Link Building in 2026 article",
        },
      },
      {
        id: "youtube-seo",
        heading: "YouTube SEO is part of off-page visibility",
        paragraphs: [
          "YouTube matters because it is both a discovery platform and a search engine in its own right. People use it to learn, compare, troubleshoot, review products, understand services, and decide whether they trust a person or brand.",
          "From an SEO perspective, YouTube can support off-page authority in a few ways. It can increase brand visibility, earn search demand, drive referral traffic, occupy more search result surfaces, and give people another format for understanding your expertise.",
          "A good YouTube SEO approach starts with intent. The video title, description, chapters, thumbnail, and spoken content should all make the topic clear. The video should answer a real question, not only exist because the brand wants to publish more content.",
        ],
        bullets: [
          "Research questions people ask before they buy, compare, or request help.",
          "Use clear video titles that match the topic and user intent.",
          "Write descriptions that summarise the value and link to useful supporting pages where relevant.",
          "Use chapters so users and search systems can understand the structure of the video.",
          "Turn strong website content into helpful video explainers, demos, walkthroughs, or opinion pieces.",
          "Track YouTube impact through views, engagement, referral clicks, assisted conversions, and branded search lift.",
        ],
      },
      {
        id: "google-business-profile-and-bing-places",
        heading: "Google Business Profile and Bing Places strengthen local trust",
        paragraphs: [
          "For local and service-area businesses, Google Business Profile and Bing Places are some of the most practical off-page SEO assets to maintain. They help a business appear where people are already searching: map results, local packs, branded searches, and discovery searches for products or services nearby.",
          "A complete profile does more than show a name and phone number. It helps customers confirm opening hours, service areas, categories, reviews, photos, products, services, booking options, and the correct website before they decide to enquire.",
          "Google Business Profile will usually get most of the attention because Google Search and Maps dominate local discovery in many markets. Bing Places still matters because Bing powers its own search experience and can support visibility across Microsoft surfaces where customers may still compare local options.",
        ],
        bullets: [
          "Claim and verify the listing instead of leaving business details unmanaged.",
          "Keep the business name, address, phone number, website, categories, and service areas consistent with the website and other directories.",
          "Add strong photos, service details, products, opening hours, and useful updates where relevant.",
          "Respond to reviews professionally and avoid fake or incentivised reviews.",
          "Use profile insights alongside Search Console, GA4, call tracking, and lead data to understand local demand.",
          "Treat these profiles as trust assets, not only citation boxes.",
        ],
      },
      {
        id: "wikipedia",
        heading: "Wikipedia is useful, but not a backlink shortcut",
        paragraphs: [
          "Wikipedia often comes up in off-page SEO conversations because it carries huge trust and visibility. The mistake is treating it like a simple backlink tactic.",
          "Wikipedia external links are generally nofollow, so they should not be viewed as a clean way to pass ranking authority. They can still matter for discovery, referral traffic, entity understanding, and source visibility, but only when the reference is genuinely useful and appropriate.",
          "The right way to think about Wikipedia is credibility, not manipulation. If your brand, research, tool, or content becomes a legitimate source that deserves to be cited, that is a signal of authority in the real world. If the only goal is to place a link, it is the wrong approach.",
        ],
        bullets: [
          "Do not use Wikipedia as a link-building shortcut.",
          "Only cite sources that genuinely support the page topic and meet editorial expectations.",
          "Understand that nofollow links can still support discovery and trust, even if they are not traditional authority-passing backlinks.",
          "Focus on becoming citation-worthy through useful research, data, tools, and public evidence.",
        ],
        link: {
          href: "/blog/wikipedia-for-seo-and-knowledge-graphs",
          label: "Read the full Wikipedia for SEO article",
        },
      },
      {
        id: "social-media",
        heading: "Social media supports demand and discovery",
        paragraphs: [
          "Social media is not traditional link building, and most social links are not treated like editorial backlinks. But social media still matters for off-page SEO because it can create awareness, demand, distribution, trust, and content discovery.",
          "A useful post can lead to branded searches. A strong opinion can lead to a journalist quote. A practical thread can lead to newsletter mentions. A case study can lead to podcast invites, partner conversations, or links from people who discovered the work socially first.",
          "Social content can also support wider search visibility because platform posts, videos, discussions, and profiles can appear in SERPs and contribute to the broader entity signals that AI Overviews and LLM-powered discovery systems may use to understand a brand, person, or topic.",
          "The mistake is measuring social only by whether the link passes SEO value. The stronger question is whether social activity helps the right people find, trust, share, reference, and search for the brand.",
        ],
        bullets: [
          "Use social media to distribute strong content, tools, case studies, research, and expert commentary.",
          "Repurpose articles into short posts, carousels, videos, and practical explainers.",
          "Engage with journalists, industry peers, partners, and communities where useful conversations already happen.",
          "Optimise social profiles and recurring content themes so they reinforce the same entities, services, topics, and expertise found on the website.",
          "Track branded search, referral traffic, assisted conversions, mentions, and content shares instead of only follower growth.",
          "Keep messaging consistent so social profiles, website content, directory listings, and PR mentions reinforce the same expertise.",
        ],
      },
      {
        id: "how-to-approach-off-page-seo",
        heading: "How to approach off-page SEO in 2026",
        paragraphs: [
          "The strongest off-page SEO strategy starts with the brand's real strengths. What expertise can be proven? What assets are worth referencing? Which stories are worth telling? Which platforms do customers already use to validate decisions?",
          "Once those answers are clear, the off-page work becomes more focused. Link building, YouTube SEO, Wikipedia, and social media stop being separate tactics and become different ways of helping the market discover and trust the same core value.",
        ],
        numberedSteps: [
          "Audit the current off-page footprint: backlinks, mentions, directories, YouTube presence, social profiles, and branded search demand.",
          "Create linkable assets such as guides, tools, studies, case studies, templates, local resources, or useful explainers.",
          "Use digital PR and partner collaboration to place strong assets in front of relevant publications and audiences.",
          "Build or improve YouTube content around questions, demos, comparisons, and expertise-led topics.",
          "Claim and maintain Google Business Profile and Bing Places listings for accurate local visibility and trust.",
          "Review Wikipedia and knowledge sources only where there is a legitimate citation or entity opportunity.",
          "Use social media to distribute content, create conversations, and increase branded demand.",
          "Measure visibility, referral traffic, branded search, mentions, assisted conversions, and link quality together.",
        ],
        closingParagraphs: [
          "Off-page SEO in 2026 is really about authority in the open web. Links still matter, but they work best when they are supported by useful content, credible mentions, video visibility, social discovery, and a brand footprint that feels trustworthy wherever people encounter it.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is off-page SEO?",
        answer:
          "Off-page SEO is the work done outside your own website to build authority, trust, discovery, and demand. It includes link building, digital PR, business directories, YouTube visibility, social media, mentions, reviews, and other external trust signals.",
      },
      {
        question: "Is link building still part of off-page SEO in 2026?",
        answer:
          "Yes. Link building is still a major part of off-page SEO, but the focus should be on relevant, credible links earned through useful content, tools, PR, partnerships, and legitimate citations.",
      },
      {
        question: "Does YouTube help SEO?",
        answer:
          "YouTube can support SEO by increasing brand visibility, answering search intent in video format, driving referral traffic, earning branded searches, and helping a brand occupy more discovery surfaces.",
      },
      {
        question: "Do Google Business Profile and Bing Places help off-page SEO?",
        answer:
          "Yes. They support local discovery, map visibility, trust, reviews, business information consistency, and branded validation outside your own website.",
      },
      {
        question: "Are Wikipedia links good for SEO?",
        answer:
          "Wikipedia links can support discovery and credibility, but they should not be treated as a shortcut for passing authority because external links are generally nofollow.",
      },
      {
        question: "Do social media links count as backlinks?",
        answer:
          "Social links are usually not the same as editorial backlinks. Their value is more often in distribution, awareness, branded search demand, relationship building, and the chance that other people discover and reference your content.",
      },
      {
        question: "What should an off-page SEO strategy focus on first?",
        answer:
          "Start with assets worth referencing, then use link building, PR, directories, YouTube, Wikipedia where appropriate, and social media to increase visibility and trust around those assets.",
      },
    ],
  },
  {
    slug: "link-building-in-2026",
    title: "Link Building in 2026: What Still Works",
    excerpt:
      "A practical look at modern link building, from sponsored links and guest posting to digital PR, business directories, and the difference between follow and nofollow backlinks.",
    category: "Authority Building",
    date: "Jul 2026",
    sections: [
      {
        id: "what-link-building-means-now",
        heading: "What link building means in 2026",
        paragraphs: [
          "Link building is the process of earning links from other websites back to your own website. In SEO, those links matter because they can help search engines understand trust, relevance, authority, and how your brand fits into the wider web.",
          "In 2026, link building is not only about getting as many links as possible. My approach is more asset-led: create great content, useful resources, or tools that are genuinely worth linking back to, then use the right channels to help people discover them.",
          "The stronger approach is to earn links from places that make sense: industry publications, trusted local directories, digital PR coverage, partner mentions, useful resources, and websites that real people actually use.",
          "A good backlink should make sense even if search engines did not exist. If a potential customer, journalist, supplier, or industry peer would find the link useful, it is much more likely to be the kind of link worth having.",
        ],
      },
      {
        id: "benefits-of-link-building",
        heading: "The benefits of link building",
        paragraphs: [
          "The obvious benefit is authority. When credible websites refer to your site, it can support organic visibility, especially in competitive markets where many pages have similar content quality and technical foundations.",
          "The better benefit is trust. A link from a relevant publication, business association, local directory, or industry resource can help users discover the brand before they are ready to search for it directly.",
        ],
        bullets: [
          "Improves authority signals when links are relevant and earned from credible websites.",
          "Supports referral traffic from people who discover the business through another trusted source.",
          "Helps search engines understand brand relationships, local relevance, and topical relevance.",
          "Can increase branded search demand when PR coverage or directory visibility introduces people to the business.",
          "Strengthens competitive SEO performance when paired with useful content, technical SEO, and internal linking.",
        ],
      },
      {
        id: "follow-vs-nofollow-backlinks",
        heading: "Follow vs nofollow backlinks",
        paragraphs: [
          "A follow backlink is a normal link without a qualifying rel attribute such as nofollow or sponsored. It can be crawled and may pass ranking signals, depending on the quality and context of the page linking to you.",
          "A nofollow backlink includes rel=\"nofollow\" in the link. It tells search engines that the linking site does not want to pass endorsement signals in the normal way. Google now treats nofollow as a hint rather than a simple all-or-nothing command, but the practical SEO meaning is still clear: you should not value a nofollow link in the same way as a strong editorial follow link.",
          "There are also sponsored and UGC attributes. Sponsored is used for paid placements, sponsorships, advertorials, and other compensated links. UGC is used for user-generated content such as comments or forum posts. These attributes help clarify the relationship behind the link.",
        ],
        comparisonTable: {
          columns: ["Link Type", "What It Means", "Typical Use"],
          rows: [
            [
              "Follow link",
              "A standard link that may pass ranking signals when the linking page is trusted and relevant.",
              "Editorial mentions, resource links, partner pages, and genuine citations.",
            ],
            [
              "Nofollow link",
              "A link marked with rel=\"nofollow\" to avoid treating the link as a normal endorsement.",
              "Untrusted references, some directories, comments, forums, and platforms that do not want to pass link equity.",
            ],
            [
              "Sponsored link",
              "A paid or compensated link marked with rel=\"sponsored\" so search engines understand the commercial relationship.",
              "Sponsored posts, paid placements, advertorials, influencer campaigns, and paid media links.",
            ],
            [
              "UGC link",
              "A link marked with rel=\"ugc\" because it was added by users rather than the site owner or editorial team.",
              "Comments, forums, community posts, and user-submitted content.",
            ],
          ],
        },
      },
      {
        id: "sponsored-links",
        heading: "Sponsored links",
        paragraphs: [
          "Sponsored links are links placed because money, products, services, or another form of compensation changed hands. They are not automatically bad. Advertising, sponsorships, partnerships, and paid media are normal parts of the web.",
          "The SEO risk begins when a sponsored link is used to pass ranking credit as if it were an organic editorial endorsement. That is why paid placements should be qualified with rel=\"sponsored\" or rel=\"nofollow\".",
          "For businesses, the question should be: would this sponsorship still be worth doing for brand visibility, referral traffic, audience fit, or credibility if the link did not pass authority? If the answer is no, the link is probably doing too much of the strategic work.",
        ],
        bullets: [
          "Use sponsored links for visibility, awareness, referral traffic, and partnership value.",
          "Avoid relying on paid placements as the main authority-building strategy.",
          "Make sure paid links are disclosed and correctly qualified with sponsored or nofollow attributes.",
          "Be careful with sites that sell links at scale, publish thin sponsored articles, or accept any niche without editorial standards.",
        ],
      },
      {
        id: "guest-posting-reality",
        heading: "Guest posting has changed",
        paragraphs: [
          "Guest posting used to feel like a clean exchange: you bring useful expertise to another website, they get quality content, and you earn a relevant author link or contextual link. That version still exists, but it is harder to find.",
          "From my own experience, guest posting has become very similar to buying links in many cases. When you target a website and ask to write for them, they often respond with a fee because they know exactly how powerful their links can be. The conversation quickly moves away from editorial contribution and towards placement cost.",
          "That does not mean every guest post is bad. A thoughtful article on a genuinely relevant website can still support brand authority and referral traffic. But if the main selling point is the strength of the backlink, and the site is charging mostly for that link, then it should be treated with caution.",
        ],
        bullets: [
          "Prioritise sites with real audiences, real editorial standards, and topical relevance.",
          "Avoid guest post farms that sell placements across unrelated categories.",
          "Do not force exact-match anchor text into articles where it feels unnatural.",
          "Treat paid guest posts as sponsored placements and qualify the links correctly.",
          "Focus on expertise and brand visibility first, not only the link metric.",
        ],
      },
      {
        id: "digital-pr",
        heading: "Digital PR is usually the strongest route",
        paragraphs: [
          "Digital PR is one of the most effective link-building routes because it earns attention rather than asking for a link directly. The link is a by-product of a useful story, data point, campaign, expert quote, local angle, or newsworthy asset.",
          "This is where authority building becomes closer to brand building. A publication is more likely to mention and link to a business when there is a strong reason: original research, a helpful tool, a founder insight, a timely comment, a community initiative, or a genuinely interesting story.",
          "As an SEO specialist, this is also where collaboration matters. Working with PR teams inside your company, or with partner agencies already running media and communications work, can create link-building opportunities that would be difficult to find through cold outreach alone.",
          "Digital PR is ideal because it can create opportunities beyond the backlink itself. A strong campaign can open doors for media mentions, expert commentary, industry relationships, referral traffic, and future collaborations.",
          "Digital PR is not always quick, and it is not guaranteed. But when it works, the links tend to be more defensible because they come from editorial judgement rather than a link placement transaction.",
        ],
        numberedSteps: [
          "Find the topics where your expertise, data, or opinion can add something useful.",
          "Create a story, content asset, or tool that journalists, industry writers, or local publications would care about.",
          "Speak to internal PR teams or partner agencies so SEO can support planned announcements, campaigns, interviews, and media opportunities.",
          "Build a focused media list instead of blasting every publication you can find.",
          "Pitch the angle clearly, with a short summary, useful evidence, and why it matters now.",
          "Make it easy for the writer to cite your brand, link to the source, or ask follow-up questions.",
        ],
      },
      {
        id: "business-directories",
        heading: "Business directories still matter when they are credible",
        paragraphs: [
          "Business directories are still useful, especially for local SEO, B2B discovery, and trust signals. The key is quality. A credible directory should help users verify a business, understand what it offers, and find consistent contact or location details.",
          "The strongest directory work is not about submitting to hundreds of low-quality sites. It is about being present in the places customers, suppliers, search engines, and local platforms expect to see a legitimate business.",
          "This can create real opportunities too. The right business directory can support local discovery, supplier research, partnership enquiries, and trust before somebody even reaches your website.",
        ],
        bullets: [
          "Use Google Business Profile and other relevant local platforms where appropriate.",
          "Keep name, address, phone number, website, and business category details consistent.",
          "Prioritise directories with real local, industry, or professional relevance.",
          "Avoid low-quality directory networks created mainly to sell links.",
          "Review listings periodically so outdated contact details do not weaken trust.",
        ],
      },
      {
        id: "wikipedia-and-nofollow",
        heading: "Why Wikipedia is not the shortcut people thought it was",
        paragraphs: [
          "For years, people treated Wikipedia as one of the dream backlinks because of its authority. The problem is that Wikipedia understood that too. To reduce spam and stop people from abusing the platform for rankings, its external links have long used nofollow.",
          "That does not make Wikipedia useless. A citation from Wikipedia can still send referral traffic, support discovery, and place a source in a trusted context. But it should not be treated as a clean follow backlink strategy.",
          "The broader lesson is important: if a platform becomes famous for link value, it usually becomes stricter. That is why sustainable link building has to move beyond chasing loopholes.",
        ],
      },
      {
        id: "how-to-build-links-in-2026",
        heading: "How to approach link building in 2026",
        paragraphs: [
          "A practical link-building strategy should begin with the business, not the backlink tool. Look at who needs to trust the brand, where those people spend time, which publications shape the market, and which directories or platforms validate the business.",
          "Then build assets worth referencing. This could be a guide, a data study, a case study, a useful calculator, a local resource, a technical explainer, an interactive tool, or a strong opinion backed by experience.",
          "For me, this is the centre of good link building: create something worth linking to first. Digital PR and business directories then become the practical routes for earning visibility, mentions, trust, and opportunities around that work.",
        ],
        numberedSteps: [
          "Audit existing backlinks and separate strong links from spam, irrelevant directories, or old low-value placements.",
          "Fix the basics first: useful pages, strong internal links, crawlable content, clear service pages, and accurate business information.",
          "Choose the authority gaps that matter, such as local trust, industry credibility, PR visibility, or partner mentions.",
          "Build a target list across digital PR prospects, relevant directories, partner websites, associations, and niche publications.",
          "Create something worth citing before asking for coverage or links.",
          "Track link quality, referral traffic, branded search movement, and business outcomes rather than reporting only the number of links built.",
        ],
        closingParagraphs: [
          "The best link building in 2026 is less about chasing loopholes and more about earning references that make sense in the real world. Great content and useful tools create the reason to link, while digital PR and credible business directories help turn that value into visibility, trust, and opportunity.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is link building still important in 2026?",
        answer:
          "Yes. Links still help search engines and users understand authority, relevance, and trust. The difference is that quality, context, and legitimacy matter far more than link volume.",
      },
      {
        question: "What is the difference between a follow and nofollow backlink?",
        answer:
          "A follow backlink is a normal link that may pass ranking signals. A nofollow backlink uses rel=\"nofollow\", which tells search engines not to treat the link as a normal endorsement.",
      },
      {
        question: "Are sponsored links bad for SEO?",
        answer:
          "Sponsored links are not bad when they are used honestly for advertising, awareness, or referral traffic. They become risky when they are paid placements designed to pass ranking credit without rel=\"sponsored\" or rel=\"nofollow\".",
      },
      {
        question: "Does guest posting still work?",
        answer:
          "Guest posting can still work when the website is relevant, editorially selective, and useful to a real audience. It becomes risky when the placement is mainly a paid link transaction.",
      },
      {
        question: "What is the most effective link-building method?",
        answer:
          "Digital PR and credible business directories are often the most effective routes because they create trust signals, referral opportunities, and links that make sense beyond SEO metrics.",
      },
      {
        question: "Are Wikipedia backlinks useful?",
        answer:
          "Wikipedia links can support discovery and referral traffic, but they should not be treated as a follow backlink strategy because external links on Wikipedia are nofollow.",
      },
    ],
  },
  {
          slug: "how-to-create-gtm-tags-for-leads",
          title: "How to Create GTM Tags for Lead Tracking",
          excerpt:
            "A practical guide to tracking successful form submissions, email link clicks, and book a call buttons in Google Tag Manager and GA4.",
          category: "Measurement",
          date: "Jun 2026",
          sections: [
            {
              id: "plan-the-lead-events",
              heading: "Plan the Lead Events Before Building Tags",
              paragraphs: [
                "Start by deciding which user actions count as lead activity. In this setup, the three lead actions are email link clicks, Book a Call clicks, and form submissions.",
                "The flow should be built in this order: create or confirm the Google tag in Google Tag Manager, build the GTM event tags and triggers, then register the useful parameters in Google Analytics so they can be used in reports.",
              ],
              bullets: [
                "generate_lead is the shared GA4 event name for contact-intent actions.",
                "lead_type explains whether the action was an email link click, Book a Call click, or form submission.",
                "page_url, lead_type, click_url, and form_id explain where and how the lead action happened.",
                "has_contacted marks users who completed any contact-intent action.",
              ],
              comparisonTable: {
                columns: ["Lead Action", "GA4 Event Name", "GTM Trigger", "Key Parameters"],
                rows: [
                  ["Email Link Click", "generate_lead", "Just Links where Click URL contains mailto:", "page_url, lead_type, click_url"],
                  ["Book a Call", "generate_lead", "Just Links where Click URL contains intro-call", "page_url, lead_type, click_url"],
                  ["Form Submission", "generate_lead", "Form Submission trigger", "page_url, lead_type, form_id"],
                ],
              },
            },
            {
              id: "what-are-ga4-event-tags-and-triggers",
              heading: "What Are GA4 Event Tags and Triggers?",
              paragraphs: [
                "In Google Tag Manager, a tag is the instruction that sends data somewhere. For this lead tracking setup, the most important tag type is Google Analytics: GA4 Event. A GA4 Event tag tells GTM what event name to send to GA4, which event parameters to include, and whether any user properties should be set.",
                "A trigger is the rule that decides when the tag should fire. The tag answers what should be sent, while the trigger answers when it should be sent. For example, the Email Link Click tag sends the generate_lead event with lead_type set to email_link_click, but the Just Links trigger makes sure it only fires when the clicked URL contains mailto:.",
              ],
              bullets: [
                "Choose Google Analytics as the tag type when you want to send a GA4 event.",
                "Use a GA4 Event tag named generate_lead for lead actions, then use lead_type to describe the action.",
                "Use triggers such as Just Links or Form Submission to control the exact interaction that fires the tag.",
                "Keep the tag and trigger names descriptive so Tag Assistant is easier to debug later.",
              ],
              imageLayout: "grid",
              imageBlocks: [
                {
                  src: "/article-images/gtm-choose-tag-type.png",
                  alt: "Google Tag Manager choose tag type screen showing Google Analytics, Google Ads, Floodlight, Google Tag, and Conversion Linker options.",
                  caption:
                    "The tag type screen is where you choose what GTM should send. For lead tracking in GA4, choose Google Analytics and create a GA4 Event tag.",
                },
                {
                  src: "/article-images/gtm-choose-trigger-type.png",
                  alt: "Google Tag Manager choose trigger type screen showing page view triggers and click triggers including All Elements and Just Links.",
                  caption:
                    "The trigger type screen is where you choose when the tag should fire. For email and Book a Call clicks, Just Links is useful because those actions happen through links.",
                },
              ],
            },
            {
              id: "tag-manager-google-tag",
              heading: "Tag Manager: Add the Google Tag First",
              paragraphs: [
                "Inside Google Tag Manager, the Google tag is the foundation. It connects the GTM container to the GA4 property so that the lead events created later are sent to the right place.",
                "The Measurement ID is the GA4 identifier that tells GTM which web data stream should receive the data. It usually starts with G-, such as G-ABC123XYZ. You can find it in Google Analytics by going to Admin, then Data Streams, selecting the website stream, and copying the Measurement ID.",
                "Once the Google tag is saved with the Measurement ID, each GA4 Event tag can reuse that configuration. This keeps the measurement setup cleaner than creating disconnected tracking for every lead action.",
              ],
              bullets: [
                "Use the Measurement ID from the GA4 web data stream you want to report into.",
                "The Measurement ID is different from the GTM container ID, which usually starts with GTM-.",
                "In this setup, the Google tag uses the Measurement ID first, then the GA4 Event tags send lead events through that same configuration.",
              ],
              imageBlocks: [
                {
                  src: "/article-images/gtm-google-tag-complete.png",
                  alt: "Google Tag Manager Google Tag configuration screen showing a completed Tag ID field.",
                  caption:
                    "After the GA4 Measurement ID is added to the Google Tag, GTM can send page and event data into the connected GA4 property.",
                },
              ],
            },
            {
              id: "what-are-event-parameters",
              heading: "What Are Event Parameters?",
              paragraphs: [
                "Event parameters are extra details sent with a GA4 event. The event name tells GA4 what happened, while the parameters explain the context around that action.",
                "For lead tracking, the event name on its own is not enough. If GA4 only receives generate_lead, the report can count lead activity but cannot easily explain which page, link, form, or CTA created it. That is why lead_type, page_url, click_url, and form_id are sent with the event.",
              ],
              bullets: [
                "page_url tells you where the lead action happened.",
                "lead_type keeps email clicks, booking clicks, and form submissions grouped consistently.",
                "click_url shows the destination clicked for email and booking actions.",
                "form_id identifies which form was submitted.",
                "These parameters become especially useful once they are registered as GA4 custom dimensions and used in Looker Studio tables or filters.",
              ],
            },
            {
              id: "why-use-event-parameters",
              heading: "Why Use Event Parameters Instead of Creating Events for Every Form, Link, or Button?",
              paragraphs: [
                "My preference is to keep the event structure simple and use parameters to carry the detail. In agency environments, I have seen setups where every form, button, or link gets its own event name. It can work at first, but it usually creates more maintenance than value.",
                "For example, a site could create separate events for contact_form_submit, footer_form_submit, pricing_form_submit, email_header_click, email_footer_click, and book_intro_call_click. The problem is that reporting then becomes messy. Every new button or form creates another naming decision, another trigger, another custom dimension conversation, and another QA task.",
                "A cleaner approach is to use generate_lead as the shared lead event, then use parameters like page_url, form_id, click_url, and lead_type to explain the context. The event tells GA4 that a lead action happened. The parameters explain where it happened and which element was involved.",
              ],
              bullets: [
                "It reduces unnecessary GTM maintenance when pages, forms, buttons, or links change.",
                "It keeps GA4 reports easier to group because the main lead actions stay consistent.",
                "It makes Looker Studio dashboards cleaner because filters can use lead_type, form_id, page_url, or click_url instead of dozens of event names.",
                "It improves QA because you test whether the right parameters are being passed rather than chasing many near-duplicate events.",
                "It scales better when a site adds new forms, landing pages, CTAs, or booking links.",
              ],
              comparisonTable: {
                columns: ["Comparison Area", "Separate Event Per Element", "Reusable Events With Parameters (Recommended)"],
                rows: [
                  [
                    "Event Structure",
                    "Creates many narrow events such as footer_form_submit, pricing_form_submit, email_header_click, and email_footer_click.",
                    "Uses generate_lead as the shared lead event, then uses parameters for the detail.",
                  ],
                  [
                    "GTM Maintenance",
                    "Every new form, button, or link can require another tag, trigger, naming decision, and QA check.",
                    "New pages or CTAs can often reuse the same tag pattern because page_url, form_id, click_url, and lead_type carry the context.",
                  ],
                  [
                    "GA4 Reporting",
                    "Reports become fragmented because similar actions are split across many event names.",
                    "Reports stay cleaner because the main lead actions are consistent and can be filtered or broken down by parameters.",
                  ],
                  [
                    "Looker Studio",
                    "Dashboards need extra blending, filters, or calculated fields to group near-duplicate events back together.",
                    "Dashboards can use lead_type, form_id, page_url, and click_url directly for tables, filters, and scorecards.",
                  ],
                ],
              },
              closingParagraphs: [
                "The key takeaway is that reusable events with parameters scale better. The tracking structure stays simple, while the parameters preserve the detail needed for GA4 analysis, Looker Studio dashboards, and future QA.",
              ],
            },
            {
              id: "what-are-user-properties",
              heading: "What Are User Properties?",
              paragraphs: [
                "User properties describe the user rather than only the single event. In this setup, has_contacted is used to mark a visitor who has taken a contact-intent action.",
                "That means email clicks, Book a Call clicks, and form submissions can all set has_contacted to TRUE. The individual event still explains the exact action, while the user property helps create a broader contacted-user segment.",
              ],
              bullets: [
                "Use event parameters when the value belongs to the action, such as the clicked URL or submitted form ID.",
                "Use user properties when the value should describe the user after the action, such as whether they have contacted you.",
                "In Looker Studio, has_contacted can help separate users who only browsed from users who showed lead intent.",
              ],
            },
            {
              id: "tag-manager-email-link-click",
              heading: "Tag Manager: Email Link Click",
              paragraphs: [
                "The email link click is an intent event. It does not prove that the visitor sent an email, but it does show that they tried to contact you through a mailto link.",
                "In GTM, create a GA4 Event tag that sends the event name generate_lead. Add event parameters for page_url, lead_type, and click_url, then set the user property has_contacted to TRUE.",
              ],
              bullets: [
                "page_url shows which page generated the email click.",
                "lead_type is set to email_link_click so the action can be grouped separately from bookings and form submissions.",
                "click_url stores the mailto destination that was clicked.",
                "has_contacted = TRUE lets reporting identify users who took a contact-intent action.",
              ],
              imageBlocks: [
                {
                  src: "/article-images/gtm-email-click-tag.png",
                  alt: "GA4 Event tag for an email link click using generate_lead with page_url, lead_type, click_url, and has_contacted configured.",
                  caption:
                    "The GA4 Email Link Click tag sends generate_lead with lead_type set to email_link_click, alongside page_url, click_url, and has_contacted.",
                },
                {
                  src: "/article-images/gtm-email-click-trigger.png",
                  alt: "Google Tag Manager Just Links trigger that fires when Click URL contains mailto.",
                  caption:
                    "The trigger uses Click URL contains mailto: so the tag fires only when someone clicks an email link.",
                },
              ],
            },
            {
              id: "tag-manager-book-a-call",
              heading: "Tag Manager: Book a Call",
              paragraphs: [
                "Book a Call clicks should be tracked separately because they usually show stronger commercial intent than a general email click. A visitor is moving towards a scheduled conversation, so the event deserves its own lead type.",
                "In GTM, create a GA4 Event tag that sends the event name generate_lead. Add page_url, lead_type, and click_url as event parameters, then set has_contacted to TRUE as a user property.",
              ],
              bullets: [
                "page_url shows which page or CTA placement generated the booking click.",
                "lead_type is set to book_a_call so booking intent can be reported separately.",
                "click_url records the booking destination, which helps if multiple booking links are used.",
                "has_contacted = TRUE keeps booking-click users in the broader contacted-user audience.",
              ],
              imageBlocks: [
                {
                  src: "/article-images/gtm-book-call-tag.png",
                  alt: "GA4 Event tag for Book a Call using generate_lead with page_url, lead_type, click_url, and has_contacted configured.",
                  caption:
                    "The GA4 Book a Call tag sends generate_lead with lead_type set to book_a_call, alongside page_url, click_url, and has_contacted.",
                },
                {
                  src: "/article-images/gtm-book-call-trigger.png",
                  alt: "Google Tag Manager Just Links trigger that fires when Click URL contains intro-call.",
                  caption:
                    "The Book a Call trigger uses Click URL contains intro-call so the event only fires for the intro-call or calendar link.",
                },
              ],
            },
            {
              id: "tag-manager-form-submission",
              heading: "Tag Manager: Form Submission",
              paragraphs: [
                "Form submission is the strongest lead action in this setup because the visitor has completed the enquiry form. It should be reported separately from click-based intent.",
                "In GTM, create a GA4 Event tag that sends the event name generate_lead. Add page_url, lead_type, and form_id as event parameters, then set has_contacted to TRUE as a user property.",
              ],
              bullets: [
                "page_url shows which page produced the submitted enquiry.",
                "lead_type is set to form_submission so confirmed form leads are easy to isolate.",
                "form_id captures the submitted form ID, such as form-submission.",
                "has_contacted = TRUE marks the user as someone who completed a meaningful contact action.",
              ],
              imageBlocks: [
                {
                  src: "/article-images/gtm-form-submission-tag.png",
                  alt: "GA4 Event tag for Form Submission using generate_lead with page_url, lead_type, form_id, and has_contacted configured.",
                  caption:
                    "The GA4 Form Submission tag sends generate_lead with lead_type set to form_submission, alongside page_url, form_id, and has_contacted.",
                },
                {
                  src: "/article-images/gtm-form-submission-trigger.png",
                  alt: "Google Tag Manager form submission trigger connected to the GA4 Form Submission tag.",
                  caption:
                    "The Form Submission trigger is attached to the GA4 Form Submission tag so GTM can fire the event when the form submit action is detected.",
                },
              ],
            },
            {
              id: "tag-assistant-validation",
              heading: "Tag Assistant: Confirm the Values Are Firing",
              paragraphs: [
                "After the GTM tags and triggers are created, use Tag Assistant preview mode to confirm that each event is sending the expected values. This step is where you check whether the tag is doing what the report needs it to do.",
                "In the tag details view, look for the event name, event settings table, and user properties. The event settings table should show the parameters you configured in GTM, and the user properties row should show has_contacted set to TRUE.",
              ],
              bullets: [
                "For form submissions, confirm generate_lead fires with page_url, lead_type, and form_id.",
                "For email clicks and Book a Call clicks, confirm generate_lead fires with page_url, lead_type, and click_url.",
                "Confirm the event name is generate_lead and the lead_type value matches the action you want to report in GA4 and Looker Studio.",
                "Confirm has_contacted is set to TRUE so the user can be included in contacted-user reporting.",
              ],
              imageBlocks: [
                {
                  src: "/article-images/gtm-tag-assistant-email-click.png",
                  alt: "Tag Assistant tag details for a GA4 Email Link Click event showing generate_lead, page_url, lead_type, click_url, and has_contacted.",
                  caption:
                    "Tag Assistant confirms the Email Link Click tag is sending generate_lead with lead_type set to email_link_click, plus page_url, click_url, and has_contacted.",
                },
                {
                  src: "/article-images/gtm-tag-assistant-form-submission.png",
                  alt: "Tag Assistant tag details for a GA4 Form Submission event showing generate_lead, page_url, lead_type, form_id, and has_contacted.",
                  caption:
                    "Tag Assistant confirms the Form Submission tag is sending generate_lead with lead_type set to form_submission, plus page_url, form_id, and has_contacted.",
                },
              ],
            },
            {
              id: "google-analytics-custom-definitions",
              heading: "Google Analytics: Register the Parameters",
              paragraphs: [
                "After the GTM tags are configured, move into Google Analytics. GA4 can receive event parameters, but custom definitions make those values easier to use in reports and explorations.",
                "Create event-scoped custom dimensions for generate_lead, page_url, lead_type, click_url, and form_id. Create the has_contacted custom definition as a user property so it can describe the user after they have taken a contact action.",
              ],
              bullets: [
                "Use event scope for generate_lead, page_url, lead_type, click_url, and form_id because those values describe the event that happened.",
                "Use user scope for has_contacted because it describes the user after contact intent has been recorded.",
                "Keep the names consistent between GTM and GA4 so Looker Studio fields are easy to understand later.",
              ],
              imageBlocks: [
                {
                  src: "/article-images/gtm-custom-definitions.png",
                  alt: "GA4 custom definitions table showing click_url, form_id, generate_lead, has_contacted, lead_type, and page_url.",
                  caption:
                    "The custom definitions list shows generate_lead, the lead parameters, and the has_contacted user property registered in GA4.",
                },
                {
                  src: "/article-images/gtm-custom-dimension-form.png",
                  alt: "GA4 new custom dimension form with Event scope selected and an event parameter dropdown.",
                  caption:
                    "Use event scope when creating a custom dimension for event parameters such as generate_lead, page_url, lead_type, click_url, and form_id.",
                },
              ],
            },
            {
              id: "looker-studio-reporting",
              heading: "Why This Matters for Looker Studio",
              paragraphs: [
                "The reason for adding event parameters and user properties is not just cleaner GA4 setup. The real value appears when the data reaches Looker Studio and stakeholders need to understand which pages and actions create leads.",
                "With this structure, a dashboard can separate softer contact intent from stronger form submissions, compare lead actions by page, and show whether users are moving from visibility into actual enquiry behaviour.",
              ],
              bullets: [
                "Create scorecards for total email clicks, Book a Call clicks, and form submissions.",
                "Build tables that show page_url by lead_type so you can see which pages generate each action.",
                "Use click_url to audit which email or booking links are being used.",
                "Use form_id to separate forms if the site adds more enquiry forms later.",
                "Use has_contacted to segment users who have shown contact intent across any lead action.",
              ],
            },
          ],
          faqs: [
            {
              question: "Should a form submit button click count as a lead?",
              answer:
                "No. A click does not prove that validation passed or the form reached the server. Fire generate_lead from a thank-you page, confirmed data layer event, or another reliable success signal.",
            },
            {
              question: "Should email and Book a Call clicks use separate event names?",
              answer:
                "Not in this setup. Use generate_lead as the shared event name, then separate the actions with lead_type values such as email_link_click and book_a_call. This keeps GA4 cleaner while still preserving the reporting detail.",
            },
            {
              question: "Can GTM confirm that somebody sent an email or booked a meeting?",
              answer:
                "A website click only confirms intent. To measure the completed outcome, use a confirmation page, a supported booking-platform event, or a CRM integration.",
            },
            {
              question: "What information should not be sent to GA4?",
              answer:
                "Do not send personally identifiable information such as names, email addresses, phone numbers, or message contents. Use non-personal labels such as form_name or lead_type instead.",
            },
          ],
  },
  {
    slug: "ai-is-reshaping-search-reporting",
    title: "AI Is Reshaping Search Reporting",
    excerpt:
      "AI search changes how people discover, compare, and decide. Organic reporting needs to account for visibility, assisted journeys, and answer engine presence.",
    category: "AI Search",
    date: "Jun 2026",
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
          "Tools such as SEMrush and Similarweb can help report on AI visibility data, depending on the markets and features available. GA4 can also support this work through referral traffic, where visits from platforms such as ChatGPT, Perplexity, Copilot, or Gemini may appear as referring sources.",
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
        id: "proof-from-commuteza",
        heading: "Proof from CommuteZA",
        paragraphs: [
          "CommuteZA is a useful proof concept because it is still a new website and does not rely on shortcuts. Within 30 days, an article on the site appeared in AI Overviews and was surfaced by Microsoft Copilot.",
          "The site is also small. It has 11 pages in total, with only two blog articles, so there is not a deep content library or much internal linking supporting the result.",
          "There are currently no backlinks, no LLMs.txt file, and no fancy AI tricks. The work is grounded in search fundamentals: crawlable pages, clear entities, useful content, structured information, and technical foundations that make the site easier to understand.",
          "And yet the webpage still achieved meaningful search visibility:",
        ],
        bullets: [
          "Appeared in AI Overviews and Microsoft Copilot.",
          "No current backlinks.",
          "No LLMs.txt file or artificial AI visibility tactics.",
          "The result came from technical SEO fundamentals and clear content structure.",
        ],
        closingParagraphs: [
          "That does not mean links and authority do not matter. It means AI search visibility is not won by chasing a separate GEO playbook. It is often earned by making the existing SEO foundations strong enough for both search engines and AI systems to interpret.",
        ],
        link: {
          href: "/projects/commuteza",
          label: "View the CommuteZA case study",
        },
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
          "The practical path is not complicated. Start with the work that helps people and search engines understand the site clearly, then measure whether that work improves visibility and business value.",
        ],
        numberedSteps: [
          "Choose the topics that matter most to the business.",
          "Improve the pages that answer those topics.",
          "Make the brand, service, location, and important entities easy to understand.",
          "Add useful supporting content where users need more context.",
          "Use internal links to connect related pages and strengthen topic coverage.",
          "Measure visibility in search results, AI Overviews, answer engines, and downstream conversions.",
        ],
        closingParagraphs: [
          "That is not a rejection of AI search. It is a simpler and more grounded way to prepare for it.",
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
  {
    slug: "how-to-set-up-gtm-custom-metrics-commuteza",
    title: "How to Set Up GTM for Custom Metrics Using CommuteZA",
    excerpt:
      "A practical guide to planning custom metrics in Google Tag Manager for CommuteZA, from event naming to GA4 validation.",
    category: "Measurement",
    date: "Jun 2026",
    archived: true,
    sections: [
      {
        id: "start-with-the-business-question",
        heading: "Start with the business question",
        paragraphs: [
          "Before opening Google Tag Manager, decide what the metric needs to explain. For CommuteZA, a useful custom metric might help answer whether users are interacting with route search, transport filters, location inputs, or pricing information.",
          "Custom metrics are most useful when they help explain behaviour that normal page views cannot show on their own.",
        ],
        imagePlaceholder: "Add a screenshot of the CommuteZA interaction or event map that shows which user actions will be tracked.",
      },
      {
        id: "create-a-clean-event-plan",
        heading: "Create a clean event plan",
        paragraphs: [
          "Keep event names simple and consistent. A messy naming system makes reporting harder later, especially once the data reaches GA4 and Looker Studio.",
        ],
        numberedSteps: [
          "List the user actions worth tracking.",
          "Choose clear event names such as route_search_started or transport_filter_selected.",
          "Decide which parameters should travel with the event.",
          "Document the purpose of each event before building tags.",
        ],
      },
      {
        id: "build-the-tag-in-gtm",
        heading: "Build the tag in GTM",
        paragraphs: [
          "In GTM, create a GA4 event tag and use the event name from the plan. Add parameters such as transport type, route type, city, or search status only when they will help future reporting.",
          "Use triggers that match the user action as closely as possible. If the trigger is too broad, the metric becomes noisy. If it is too narrow, important interactions may be missed.",
        ],
        imagePlaceholder: "Add a GTM screenshot showing the GA4 event tag, event parameters, and trigger configuration.",
      },
      {
        id: "test-before-publishing",
        heading: "Test before publishing",
        paragraphs: [
          "Use Preview mode in GTM and DebugView in GA4 before publishing the container. Check that the event fires once, carries the right parameters, and only appears when the intended action happens.",
          "Once published, review the event in GA4 after data has processed. If the metric supports business questions, it can then be added to reports and dashboards.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should every interaction become a custom metric?",
        answer:
          "No. Track the actions that explain user intent, product engagement, or conversion progress. Too many events make reporting harder to use.",
      },
      {
        question: "Why use GTM instead of adding tracking directly to the code?",
        answer:
          "GTM gives marketing and measurement teams more control over tracking changes without needing every update to go through a full development cycle.",
      },
      {
        question: "When should a GTM event become a GA4 key event?",
        answer:
          "Only when the action represents meaningful progress towards a business goal, such as a lead, route enquiry, purchase, or other high value conversion.",
      },
    ],
  },
  {
    slug: "how-to-set-up-looker-studio-dashboard-stakeholders",
    title: "How to Set Up a Looker Studio Dashboard That Impresses Stakeholders",
    excerpt:
      "A practical guide to building a premium looking Looker Studio dashboard that makes organic performance easier to understand.",
    category: "Measurement",
    date: "Jun 2026",
    archived: true,
    sections: [
      {
        id: "start-with-the-user",
        heading: "Start with the stakeholder",
        paragraphs: [
          "A premium dashboard is not just a nice looking report. It is a report that helps a stakeholder understand what changed, why it changed, and what should happen next.",
          "Before designing the page, decide who will use it. A founder, SEO manager, paid media lead, and agency client may all need different levels of detail.",
        ],
      },
      {
        id: "build-a-clear-layout",
        heading: "Build a clear layout",
        paragraphs: [
          "The best dashboards guide the eye. Put headline metrics at the top, filters where users expect them, and deeper tables or charts further down the page.",
        ],
        numberedSteps: [
          "Start with the headline KPI or business question.",
          "Add filters for segment, channel, page type, or date range.",
          "Use charts to explain trends and tables to show detail.",
          "Add short commentary boxes where the data needs interpretation.",
          "Keep colours, spacing, and typography consistent across the report.",
        ],
        imagePlaceholder: "Add a screenshot of the dashboard overview, showing filters, KPI cards, tables, and charts.",
      },
      {
        id: "make-roi-easy-to-see",
        heading: "Make ROI easy to see",
        paragraphs: [
          "Stakeholders care about visibility, but they care even more about business impact. A dashboard should make it easy to connect organic activity to leads, purchases, revenue, or meaningful user actions.",
          "For SEO, this means combining Search Console visibility with GA4 behaviour and conversion data where possible. The report should not only say traffic went up. It should help explain whether the increase mattered.",
        ],
        bullets: [
          "Show organic revenue, leads, or key events where available.",
          "Separate branded and non branded search where useful.",
          "Use commentary to explain the action behind the numbers.",
          "Avoid vanity metrics unless they support a decision.",
        ],
      },
      {
        id: "premium-feel",
        heading: "What creates a premium feel",
        paragraphs: [
          "A premium dashboard feels calm, deliberate, and easy to scan. It does not need heavy decoration. It needs clear hierarchy, useful filters, tidy spacing, and charts that answer real questions.",
          "It is fair to write about premium dashboard design if you focus on business clarity, not only aesthetics. The value is in making performance easier to understand and act on.",
        ],
        imagePlaceholder: "Add a screenshot or recreated sample of a polished dashboard page with anonymised data.",
      },
    ],
    faqs: [
      {
        question: "Can an SEO dashboard look premium without custom design software?",
        answer:
          "Yes. Strong layout, consistent colours, clear typography, and good commentary can make Looker Studio feel professional without extra design tools.",
      },
      {
        question: "What should be above the fold in a dashboard?",
        answer:
          "The most important KPI, the key filters, and a quick view of performance direction should be visible first.",
      },
      {
        question: "Should dashboard screenshots use real client data?",
        answer:
          "Only if you have permission. Otherwise, anonymise the data or recreate the layout with sample information.",
      },
    ],
  },
];

export const ALL_ARTICLES = ARTICLE_INPUTS.map(withCalculatedReadTime);

export const ARTICLES = ALL_ARTICLES.filter((article) => !article.archived);

export const getArticle = (slug: string) => ARTICLES.find((article) => article.slug === slug);
