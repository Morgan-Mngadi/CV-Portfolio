export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  numberedSteps?: string[];
  imageBlocks?: ArticleImage[];
  imageLayout?: string;
  comparisonTable?: ArticleComparisonTable;
  imagePlaceholder?: string;
  closingParagraphs?: string[];
  link?: {
    href: string;
    label: string;
  };
};

export type ArticleImage = {
  src: string;
  alt: string;
  caption: string;
};

export type ArticleComparisonTable = {
  columns: string[];
  rows: string[][];
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

const calculateReadTime = (article: ArticleInput) => {
  const visibleText: string[] = [article.title, article.excerpt];

  article.sections.forEach((section) => {
    visibleText.push(section.heading, ...section.paragraphs);
    visibleText.push(...(section.bullets ?? []));
    visibleText.push(...(section.numberedSteps ?? []));
    visibleText.push(...(section.closingParagraphs ?? []));

    section.imageBlocks?.forEach((image) => {
      visibleText.push(image.caption);
    });

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
