export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  numberedSteps?: string[];
  imagePlaceholder?: string;
  closingParagraphs?: string[];
  link?: {
    href: string;
    label: string;
  };
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

export const ALL_ARTICLES: Article[] = [
  ...(import.meta.env.DEV
    ? [
        {
          slug: "how-to-create-gtm-tags-for-leads",
          title: "How to Create GTM Tags for Lead Tracking",
          excerpt:
            "A practical guide to tracking successful form submissions, email link clicks, and book a call buttons in Google Tag Manager and GA4.",
          category: "Measurement",
          date: "Jun 2026",
          readTime: "7 min read",
          sections: [
            {
              id: "plan-your-lead-events",
              heading: "Plan your lead events before opening GTM",
              paragraphs: [
                "Lead tracking works best when each event has one clear meaning. A successful enquiry form is a completed lead. An email link click or book a call button click shows strong intent, but it does not prove that an email was sent or a meeting was booked.",
                "Write down the action, the event name, and the condition that proves it happened. This small measurement plan will prevent vague event names and duplicate reporting later.",
              ],
              bullets: [
                "generate_lead: fire after the website confirms that an enquiry form was submitted successfully.",
                "email_click: fire when a visitor clicks a link whose destination starts with mailto:.",
                "book_call_click: fire when a visitor clicks the specific book a call button or booking link.",
                "Useful parameters may include form_name, link_url, link_text, page_location, or lead_type. Never send names, email addresses, phone numbers, or other personal information to GA4.",
              ],
              imagePlaceholder:
                "Add a screenshot of the lead measurement plan showing the action, GA4 event name, trigger condition, and parameters.",
            },
            {
              id: "check-your-ga4-setup",
              heading: "Check the Google tag and enable GTM variables",
              paragraphs: [
                "Before creating lead tags, confirm that the Google tag is already sending page data from the GTM container to the correct GA4 property. Reusing the existing Google tag keeps the lead events connected to the same measurement setup.",
                "In GTM, open Variables, select Configure under Built-In Variables, and enable the click and form variables you will need. Common choices include Click URL, Click Text, Click Classes, Click ID, Form ID, Form Classes, and Page URL.",
              ],
              numberedSteps: [
                "Open the website's GTM container and select the working workspace.",
                "Confirm that a Google tag exists and uses the correct GA4 measurement ID.",
                "Open Variables and configure the built-in click and form variables.",
                "Use GTM Preview to confirm that the expected variables become available when you interact with the website.",
              ],
              imagePlaceholder:
                "Add a GTM screenshot showing the Google tag and the enabled Click URL, Click Text, Form ID, and Page URL variables.",
            },
            {
              id: "track-form-submissions",
              heading: "Create a tag for successful form submissions",
              paragraphs: [
                "The strongest form trigger is based on proof of success, not the submit button click. A button click may still produce a validation error, and some modern forms submit through JavaScript without using the browser's standard form submission event.",
                "If the form redirects to a unique thank-you page, use that page view as the trigger. For an AJAX or single-page form, ask the developer to push a custom data layer event only after the server confirms success. A native Form Submission trigger is a reasonable fallback when the website uses a standard HTML form and GTM can detect it reliably.",
              ],
              numberedSteps: [
                "Create a new GA4 Event tag and connect it to the website's Google tag.",
                "Set the event name to generate_lead.",
                "Add a form_name or lead_type parameter if it helps distinguish forms in reporting.",
                "Create a thank-you page, Custom Event, or Form Submission trigger that only matches the intended form.",
                "Attach the trigger to the tag and save it with a clear name such as GA4 Event - Generate Lead - Contact Form.",
              ],
              imagePlaceholder:
                "Add a GTM screenshot showing the generate_lead event tag, its form_name parameter, and the successful submission trigger.",
            },
            {
              id: "track-email-link-clicks",
              heading: "Create a tag for email link clicks",
              paragraphs: [
                "Email links normally use a mailto: destination, which gives GTM a dependable condition to recognise. Use a Just Links trigger so ordinary buttons and other page elements do not enter this event.",
              ],
              numberedSteps: [
                "Create a GA4 Event tag and name the event email_click.",
                "Add link_url using the Click URL variable and link_text using the Click Text variable.",
                "Create a Just Links trigger and choose Some Link Clicks.",
                "Set the condition to Click URL starts with mailto:.",
                "Attach the trigger and name the tag GA4 Event - Email Click.",
              ],
              closingParagraphs: [
                "This event measures an attempt to contact the business by email. It cannot confirm that the visitor completed and sent the email, so label it accurately in dashboards and reports.",
              ],
              imagePlaceholder: "Add a GTM screenshot showing the email_click tag and a Just Links trigger where Click URL starts with mailto:.",
            },
            {
              id: "track-book-a-call-clicks",
              heading: "Create a tag for the book a call button",
              paragraphs: [
                "A booking button may be a normal link, an embedded calendar launcher, or a JavaScript button. Inspect the click in GTM Preview first, then build the trigger from the most stable value available.",
                "A unique booking URL or element ID is usually safer than visible button text because copy can change and the same words may appear in several places. If the booking tool provides a confirmed-booking event or thank-you page, track that separately from the initial button click.",
              ],
              numberedSteps: [
                "Click the book a call button in GTM Preview and inspect Click URL, Click ID, Click Classes, and Click Text.",
                "Create a GA4 Event tag with the event name book_call_click.",
                "Add useful parameters such as link_url, link_text, or button_location.",
                "Create a Just Links trigger for a booking link, or an All Elements trigger for a JavaScript button.",
                "Limit the trigger with a unique URL, ID, or class and attach it to the tag.",
              ],
              imagePlaceholder:
                "Add a GTM Preview screenshot showing the variables for the book a call button, followed by the final book_call_click trigger.",
            },
            {
              id: "test-and-publish",
              heading: "Test every event before publishing",
              paragraphs: [
                "Open GTM Preview, connect it to the website, and complete each lead action. Check that the correct tag fires once and that it stays silent on unrelated clicks, failed form attempts, and ordinary page views.",
                "Then check GA4 DebugView to confirm the event name and parameters arrive correctly. Testing both tools helps separate a GTM trigger problem from a GA4 data problem.",
              ],
              bullets: [
                "Submit the form successfully and also test a failed validation attempt.",
                "Click more than one email link if the site has several placements.",
                "Test the booking button on desktop and mobile layouts.",
                "Check that each event fires once per action, not twice.",
                "Remove any parameters containing personal information before publishing.",
              ],
              imagePlaceholder:
                "Add side-by-side screenshots of Tag Assistant showing the fired lead tag and GA4 DebugView showing the received event parameters.",
            },
            {
              id: "mark-key-events",
              heading: "Publish and mark the right events as key events",
              paragraphs: [
                "Once testing is complete, submit the GTM container with a version name that explains the change. In GA4, open Admin and then Events to mark the actions that genuinely matter to the business as key events.",
                "A successful generate_lead event is normally the clearest lead key event. Email clicks and book a call clicks can also be useful key events when they represent meaningful contact intent, but keep them separate from confirmed leads so reporting does not overstate results.",
              ],
              numberedSteps: [
                "Publish the tested GTM container with a descriptive version name and notes.",
                "Confirm that the new events appear in GA4.",
                "Mark the agreed lead events as key events in GA4 Admin.",
                "Add the events to acquisition and landing page reports to see which channels and pages create lead activity.",
                "Review the setup after website or form changes because selectors, URLs, and success behaviour can change.",
              ],
              imagePlaceholder:
                "Add a GA4 screenshot showing generate_lead, email_click, and book_call_click in the Events screen, with the selected key events marked.",
            },
          ],
          faqs: [
            {
              question: "Should a form submit button click count as a lead?",
              answer:
                "No. A click does not prove that validation passed or the form reached the server. Fire generate_lead from a thank-you page, confirmed data layer event, or another reliable success signal.",
            },
            {
              question: "Should email and book a call clicks use the same event name?",
              answer:
                "Keep them separate. They represent different actions and may have different lead quality. Separate names make reporting and optimisation more useful.",
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
      ]
    : []),
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
    readTime: "4 min read",
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
    readTime: "3 min read",
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
    readTime: "3 min read",
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

export const ARTICLES = ALL_ARTICLES.filter((article) => !article.archived);

export const getArticle = (slug: string) => ARTICLES.find((article) => article.slug === slug);
