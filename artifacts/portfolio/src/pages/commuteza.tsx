import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Seo } from "@/components/seo";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { AnimatedMetric } from "@/components/animated-metric";

const fadeUp = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const CONTENTS = [
  ["overview", "Overview"],
  ["story", "The Story"],
  ["problem", "The Problem"],
  ["vision", "The Vision"],
  ["research", "Research & Discovery"],
  ["approach", "My Approach"],
  ["product-thinking", "Product Thinking"],
  ["information-architecture", "Information Architecture"],
  ["technical-architecture", "Technical Architecture"],
  ["building-with-codex", "Building with Codex"],
  ["challenges", "Challenges & Trade-offs"],
  ["early-progress", "Early Progress"],
  ["roadmap", "Roadmap"],
  ["lessons", "Lessons Learned"],
  ["reflection", "Reflection"],
] as const;

const METRICS = [
  { value: "10,000+", label: "Google impressions" },
  { value: "5,000+", label: "Bing impressions" },
  { value: "3,000+", label: "Bing AI impressions from two articles" },
  { value: "30 days", label: "To a Copilot AI mention" },
];

const TECHNOLOGIES = [
  "React",
  "Server-side rendering",
  "Node.js",
  "Google Analytics",
  "Google Search Console",
  "OpenStreetMap",
  "Overpass API",
];

type CaseStudySectionProps = {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
};

function CaseStudySection({ id, number, title, children }: CaseStudySectionProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="scroll-mt-20 border-b border-border py-16 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16"
    >
      <motion.div variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground pt-1">
        {number} / {title}
      </motion.div>
      <motion.div variants={stagger} className="max-w-3xl space-y-5 text-muted-foreground leading-relaxed">
        {children}
      </motion.div>
    </motion.section>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <motion.aside variants={fadeUp} className="border-l-2 border-primary bg-primary/5 px-6 py-5 my-8">
      <p className="text-xl md:text-2xl font-medium leading-snug text-foreground">“{children}”</p>
    </motion.aside>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <motion.ul variants={fadeUp} className="grid gap-2 pl-5 list-disc marker:text-primary">
      {items.map((item) => <li key={item}>{item}</li>)}
    </motion.ul>
  );
}

export default function CommuteZA() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo path="/projects/commuteza" />
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
        <motion.section initial="hidden" animate="visible" variants={stagger} className="border-b border-border py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.82fr)_minmax(420px,1fr)] gap-10 lg:gap-14 items-center">
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6 font-mono text-xs text-primary uppercase tracking-widest">
                <span className="w-6 h-px bg-primary" />
                Self-initiated project · January 2026 to present
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.9] mb-8">
                Commute<span className="text-primary">ZA</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-5">
                Building a better public transport search experience for South African commuters.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed max-w-2xl mb-10">
                CommuteZA combines technical SEO, product thinking and AI-assisted development to make public transport information easier to discover, understand and use.
              </motion.p>
              <motion.a variants={fadeUp} href="https://commuteza.co.za/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors" data-testid="link-commuteza-live">
                Visit CommuteZA <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
            <motion.div variants={fadeUp} className="hidden lg:block">
              <img src="/project-images/commuteza-macbook.webp" alt="CommuteZA website displayed on a MacBook Air" className="w-full object-contain" />
            </motion.div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-0 lg:gap-12 xl:gap-16 items-start">
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={stagger}
            aria-labelledby="contents-title"
            className="border-b border-border py-10 lg:sticky lg:top-20 lg:z-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:border-b-0 lg:py-12"
          >
            <motion.h2 id="contents-title" variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Table of Contents</motion.h2>
            <motion.ol variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 border-t border-l border-border bg-background/95 backdrop-blur-sm">
              {CONTENTS.map(([id, label], index) => (
                <motion.li key={id} variants={fadeUp}>
                  <a href={`#${id}`} className="flex gap-3 border-r border-b border-border px-3 py-2.5 text-sm hover:bg-primary/5 hover:text-primary transition-colors">
                    <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                    {label}
                  </a>
                </motion.li>
              ))}
            </motion.ol>
          </motion.nav>

          <div className="min-w-0">
            <CaseStudySection id="overview" number="01" title="Overview">
          <motion.h2 variants={fadeUp} className="text-2xl font-medium leading-tight text-foreground">A product born from a personal challenge.</motion.h2>
          <motion.p variants={fadeUp}>CommuteZA is a public transport discovery and journey-planning platform built for South African commuters. It brings technical SEO, product thinking and software development together around a practical, everyday need.</motion.p>
          <motion.p variants={fadeUp}>The platform has now been live for four months. These early search results show growing demand while the product remains in active development.</motion.p>
          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 border border-border divide-y sm:divide-y-0 divide-border mt-8">
            {METRICS.map((metric) => (
              <motion.div key={metric.label} variants={fadeUp} className="bg-card min-h-44 p-8 border-b border-border odd:sm:border-r last:border-b-0 [&:nth-last-child(-n+2)]:sm:border-b-0">
                <AnimatedMetric value={metric.value} className="block text-4xl font-medium text-primary tabular-nums whitespace-nowrap mb-3" />
                <div className="font-mono text-sm text-muted-foreground">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </CaseStudySection>

        <CaseStudySection id="story" number="02" title="The Story">
          <motion.h2 variants={fadeUp} className="text-2xl font-medium text-foreground">Why I Built CommuteZA</motion.h2>
          <motion.p variants={fadeUp}>When I started my career, I relied on public transport to get to work every day.</motion.p>
          <motion.p variants={fadeUp}>Like many South Africans, I searched for routes, pickup locations and transport information across multiple websites, Facebook pages and PDF documents. The answers were often incomplete, outdated or difficult to find.</motion.p>
          <motion.p variants={fadeUp}>Working in technical SEO made me realise that the problem was not always a lack of information. It was that the information was not organised around how commuters actually search.</motion.p>
          <Highlight>Instead of accepting that experience, I decided to build the platform I wished existed.</Highlight>
        </CaseStudySection>

        <CaseStudySection id="problem" number="03" title="The Problem">
          <motion.p variants={fadeUp}>Public transport information in South Africa is fragmented. Operators publish information in different ways, making reliable answers difficult to find quickly.</motion.p>
          <BulletList items={["Downloadable PDF timetables", "Updates published mainly on social media", "Limited websites with poor search visibility", "Route and pickup information spread across multiple sources"]} />
          <motion.p variants={fadeUp}>This creates unnecessary friction for people simply trying to get from one place to another.</motion.p>
        </CaseStudySection>

        <CaseStudySection id="vision" number="04" title="The Vision">
          <motion.p variants={fadeUp}>The vision extends beyond another transport website. I want to build a platform that commuters can use every day to plan journeys with greater confidence.</motion.p>
          <BulletList items={["Discover transport options", "Compare routes", "Understand pricing", "Find stations and pickup locations", "Plan journeys more efficiently"]} />
          <Highlight>Every feature is tested against one question: Will this make travelling easier for commuters?</Highlight>
        </CaseStudySection>

        <CaseStudySection id="research" number="05" title="Research & Discovery">
          <motion.p variants={fadeUp}>Before writing code, I wanted to understand how people searched for transport information. The research covered search behaviour, intent, existing results, information gaps, common commuter questions and the way current transport websites organise their content.</motion.p>
          <Highlight>The best SEO doesn't begin with keywords. It begins with understanding what someone is trying to accomplish.</Highlight>
          <motion.p variants={fadeUp}>Starting with people rather than keywords shaped the design and architecture decisions that followed.</motion.p>
        </CaseStudySection>

        <CaseStudySection id="approach" number="06" title="My Approach">
          <motion.p variants={fadeUp}>Rather than building pages for search engines, I designed pages to solve user problems. Every page should answer a specific question, every click should reduce friction and every piece of information should move someone closer to their destination.</motion.p>
          <Highlight>SEO became the distribution channel, not the product itself.</Highlight>
        </CaseStudySection>

        <CaseStudySection id="product-thinking" number="07" title="Product Thinking">
          <motion.p variants={fadeUp}>CommuteZA challenged me to think beyond rankings and balance user needs, scalability and technical constraints.</motion.p>
          <BulletList items={["Design for mobile-first users", "Prioritise clarity over complexity", "Build reusable page templates", "Create scalable information architecture", "Reduce the clicks needed to reach useful information"]} />
          <Highlight>The objective was not simply to rank. It was to create something worth returning to.</Highlight>
        </CaseStudySection>

        <CaseStudySection id="information-architecture" number="08" title="Information Architecture">
          <motion.p variants={fadeUp}>The platform is organised around how commuters naturally search rather than how transport operators structure their businesses.</motion.p>
          <BulletList items={["Transport modes", "Stations", "Routes", "Nearby transport", "Journey planning"]} />
          <Highlight>Every page on CommuteZA exists because it answers a real commuter question.</Highlight>
          <motion.p variants={fadeUp}>This approach supports intuitive navigation and creates a logical internal linking structure that can scale with the product.</motion.p>
        </CaseStudySection>

        <CaseStudySection id="technical-architecture" number="09" title="Technical Architecture">
          <motion.p variants={fadeUp}>CommuteZA combines modern web technologies in an architecture designed for performance, discoverability and long-term maintainability.</motion.p>
          <motion.div variants={stagger} className="flex flex-wrap gap-2">
            {TECHNOLOGIES.map((technology) => <motion.span key={technology} variants={fadeUp} className="border border-border bg-card px-3 py-2 font-mono text-xs">{technology}</motion.span>)}
          </motion.div>
        </CaseStudySection>

        <CaseStudySection id="building-with-codex" number="10" title="Building with Codex">
          <motion.p variants={fadeUp}>Codex acted as a collaborative development partner. It helped build React components, refactor code, debug issues, improve code quality, accelerate repetitive tasks and explore implementation approaches.</motion.p>
          <Highlight>AI accelerated development. It didn't replace product thinking.</Highlight>
          <motion.p variants={fadeUp}>The product vision, information architecture, SEO strategy and user experience decisions remained my responsibility. AI created more time for solving problems instead of repeating routine implementation work.</motion.p>
        </CaseStudySection>

        <CaseStudySection id="challenges" number="11" title="Challenges & Trade-offs">
          <motion.p variants={fadeUp}>Every project involves trade-offs. The main decisions prioritised a strong, scalable foundation over short-term convenience.</motion.p>
          <motion.div variants={stagger} className="grid md:grid-cols-2 gap-4">
            {[
              ["React over a traditional CMS", "Greater flexibility as the platform grows."],
              ["Server-side rendering", "Improved discoverability while maintaining a modern user experience."],
              ["Start small", "Build the core journey and technical foundation before expanding the feature set."],
              ["Clarity over feature volume", "Make the existing information genuinely useful before adding more complexity."],
            ].map(([title, body]) => (
              <motion.div key={title} variants={fadeUp} className="border border-border bg-card p-5">
                <h3 className="font-medium text-foreground mb-2">{title}</h3>
                <p className="text-sm">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </CaseStudySection>

        <CaseStudySection id="early-progress" number="12" title="Early Progress">
          <motion.p variants={fadeUp}>After four months live, CommuteZA has generated more than 10,000 Google impressions and 5,000 Bing impressions. The domain is also seeing more than 3,000 impressions from Bing AI Overviews and earned a mention in Microsoft Copilot within about 30 days.</motion.p>
          <motion.p variants={fadeUp}>These are early signals, not a finished growth story. They show that commuters are actively searching for this information and reinforce the long-term direction of the platform. The current focus remains improving the product rather than maximising traffic.</motion.p>
        </CaseStudySection>

        <CaseStudySection id="roadmap" number="13" title="Roadmap">
          <motion.p variants={fadeUp}>CommuteZA will continue evolving towards a more complete journey-planning experience.</motion.p>
          <BulletList items={["Interactive route planning", "Journey comparisons", "Transport pricing", "Real-time transport information where available", "Smarter internal search", "Richer structured data", "User accounts and saved journeys"]} />
          <Highlight>Each release should make public transport easier to understand and navigate.</Highlight>
        </CaseStudySection>

        <CaseStudySection id="lessons" number="14" title="Lessons Learned">
          <BulletList items={["Real problems lead to meaningful products", "Technical SEO is most effective when combined with product thinking", "Information architecture is as important as content", "AI is a powerful accelerator, but thoughtful decision-making remains human", "Shipping and learning provides more value than waiting for perfection"]} />
        </CaseStudySection>

            <CaseStudySection id="reflection" number="15" title="Reflection">
              <motion.p variants={fadeUp}>CommuteZA has become more than a side project. It is a practical way to turn lived experience into a useful product and to test how technical SEO, information architecture and software development work together in a live environment.</motion.p>
              <motion.p variants={fadeUp}>The first four months have provided encouraging evidence, but the most valuable result is the learning loop: build, release, observe and improve around genuine commuter needs.</motion.p>
              <motion.a variants={fadeUp} href="https://commuteza.co.za/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                Explore CommuteZA <ExternalLink className="w-4 h-4" />
              </motion.a>
            </CaseStudySection>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
