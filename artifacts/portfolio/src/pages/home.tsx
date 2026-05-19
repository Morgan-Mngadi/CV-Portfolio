import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, Code, Target, Database, BarChart3 } from "lucide-react";
import { 
  SiGooglesearchconsole, 
  SiGoogleanalytics, 
  SiGoogletagmanager, 
  SiSemrush, 
  SiWordpress, 
  SiWebflow, 
  SiUmbraco,
  SiOpenai,
} from "react-icons/si";

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center mix-blend-difference">
        <span className="font-mono text-xs font-medium tracking-wider">MM. // SEO</span>
        <a href="#contact" className="font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors">
          Contact
        </a>
      </nav>

      <main className="px-6 md:px-12 lg:px-24 pt-32 pb-24 max-w-7xl mx-auto flex flex-col gap-32 md:gap-48">
        
        {/* 1. HERO SECTION */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={STAGGER}
          className="min-h-[70vh] flex flex-col justify-center"
        >
          <motion.div variants={FADE_UP} className="mb-6 flex items-center gap-3 font-mono text-xs text-primary uppercase tracking-widest">
            <span className="w-8 h-px bg-primary block"></span>
            SEO Specialist based in Johannesburg
          </motion.div>
          <motion.h1 variants={FADE_UP} className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8">
            Morgan <br/> Mngadi
          </motion.h1>
          <motion.p variants={FADE_UP} className="max-w-2xl text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
            Technical SEO specialist operating at the intersection of systems thinking and organic growth. I build scalable visibility.
          </motion.p>
        </motion.section>


        {/* 2. SUMMARY / MANIFESTO */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={FADE_UP}
          className="border-l border-border pl-8 md:pl-16 relative"
        >
          <div className="absolute top-0 -left-[5px] w-[9px] h-[9px] rounded-full bg-primary" />
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">01. Summary</h2>
          <p className="text-2xl md:text-4xl font-medium leading-tight max-w-4xl text-gradient">
            SEO Specialist with agency and enterprise experience, working across technical audits, on-page optimisation and performance reporting. SEO strategist focused on business impact.
          </p>
          <p className="mt-8 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Experienced in collaborating with development teams to implement SEO recommendations effectively across multiple CMS platforms. Strong interest in systems-driven SEO and scalable implementation.
          </p>
        </motion.section>

        {/* 3. EXPERIENCE */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER}
          className="flex flex-col gap-12"
        >
          <motion.h2 variants={FADE_UP} className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            02. Experience
          </motion.h2>

          <div className="flex flex-col gap-16 md:gap-24 relative">
            <div className="absolute top-0 bottom-0 left-[15px] md:left-[19px] w-px bg-border/50 z-[-1]" />
            
            {/* Role 1 */}
            <motion.div variants={FADE_UP} className="flex flex-col md:flex-row gap-6 md:gap-12 relative">
              <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shrink-0 z-10 mt-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium">Accenture Song</h3>
                    <p className="text-primary font-mono text-sm mt-1">SEO Specialist</p>
                  </div>
                  <div className="text-muted-foreground font-mono text-sm mt-2 md:mt-0 text-left md:text-right">
                    <p>January 2026 – Present</p>
                    <p>Midrand, Johannesburg</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Currently contributing to SEO delivery for enterprise-level clients within the telecommunications sector. Supporting technical audits, reviewing metadata implementation, and assisting with performance reporting through GA4 and Search Console. Working within a cross-functional environment, collaborating with developers and performance teams to align SEO recommendations with broader digital objectives.
                </p>
              </div>
            </motion.div>

            {/* Role 2 */}
            <motion.div variants={FADE_UP} className="flex flex-col md:flex-row gap-6 md:gap-12 relative">
              <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shrink-0 z-10 mt-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium">Flume Digital Marketing</h3>
                    <p className="text-primary font-mono text-sm mt-1">Junior SEO Specialist</p>
                  </div>
                  <div className="text-muted-foreground font-mono text-sm mt-2 md:mt-0 text-left md:text-right">
                    <p>November 2023 – December 2025</p>
                    <p>Bryanston, Johannesburg</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Managed SEO implementation across multiple industries including finance, tertiary education, humanitarian organisations, courier services, hospitality and automotive. Responsibilities included technical audits, on-page optimisation, CMS implementation (WordPress and Webflow), structured data deployment and ongoing performance reporting through GA4 and Search Console. Worked closely with development and content teams.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-card border border-border rounded-full text-xs font-mono">
                  <Target className="w-3 h-3 text-primary" />
                  <span>2× Assegais 2024 Honours</span>
                </div>
              </div>
            </motion.div>

            {/* Role 3 */}
            <motion.div variants={FADE_UP} className="flex flex-col md:flex-row gap-6 md:gap-12 relative">
              <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shrink-0 z-10 mt-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium">IMS Ad Agency</h3>
                    <p className="text-primary font-mono text-sm mt-1">SEO & Analytics Associate</p>
                  </div>
                  <div className="text-muted-foreground font-mono text-sm mt-2 md:mt-0 text-left md:text-right">
                    <p>March 2023 – September 2023</p>
                    <p>Lonehill, Johannesburg</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Developed a strong foundation in SEO and analytics, working across a range of client accounts. Assisted with keyword research, on-page optimisation, technical audits and performance reporting using tools such as Google Search Console, SEMrush and Looker Studio.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>


        {/* 4. PROJECTS */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER}
          className="flex flex-col gap-12"
        >
          <motion.h2 variants={FADE_UP} className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            03. Systems & Projects
          </motion.h2>

          <motion.a 
            variants={FADE_UP}
            href="https://commuteza.co.za/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-8 md:p-12 bg-card border border-border hover:border-primary transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[100px] group-hover:bg-primary/20 transition-all duration-700" />
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-medium mb-2 group-hover:text-primary transition-colors flex items-center gap-3">
                  CommuteZA 
                  <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="font-mono text-sm text-muted-foreground">Routing Web App for South African Commuters</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground border border-border px-3 py-1 rounded-full hidden md:inline-block">
                Jan 2026 - Present
              </span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">
              Self-initiated project aimed at strengthening technical SEO and systems understanding by building a platform from the ground up. Implements a headless CMS architecture to manage metadata, structured data, redirect logic and URL structuring with full control over rendering behaviour. Refining server-side rendering approach to ensure optimal crawlability and indexation while balancing performance and user experience.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="text-xs font-mono bg-background border border-border px-3 py-1 text-muted-foreground">Headless CMS</span>
              <span className="text-xs font-mono bg-background border border-border px-3 py-1 text-muted-foreground">Server-side Rendering</span>
              <span className="text-xs font-mono bg-background border border-border px-3 py-1 text-muted-foreground">Technical SEO</span>
            </div>
          </motion.a>
        </motion.section>


        {/* 5. TOOLS & STACK */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER}
          className="flex flex-col gap-12"
        >
          <motion.h2 variants={FADE_UP} className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            04. Tooling & Stack
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={FADE_UP} className="p-6 bg-card border border-border flex flex-col gap-6">
              <div className="w-10 h-10 rounded bg-background border border-border flex items-center justify-center text-primary">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium mb-3">Daily Operations</h3>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground font-mono">
                  <li>Google Analytics 4</li>
                  <li>Google Tag Manager</li>
                  <li>PageSpeed Insights</li>
                  <li>Search Console</li>
                  <li>Bing Webmaster</li>
                  <li>SEMrush</li>
                  <li>Screaming Frog</li>
                  <li>Looker Studio</li>
                  <li>Keyword Planner</li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={FADE_UP} className="p-6 bg-card border border-border flex flex-col gap-6">
              <div className="w-10 h-10 rounded bg-background border border-border flex items-center justify-center text-primary">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium mb-3">CMS Platforms</h3>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground font-mono">
                  <li className="flex items-center gap-2"><SiWordpress className="w-3 h-3"/> WordPress</li>
                  <li className="flex items-center gap-2"><SiWebflow className="w-3 h-3"/> Webflow</li>
                  <li className="flex items-center gap-2"><SiUmbraco className="w-3 h-3"/> Umbraco</li>
                  <li>Pimcore</li>
                  <li>Headless Architectures</li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={FADE_UP} className="p-6 bg-card border border-border flex flex-col gap-6">
              <div className="w-10 h-10 rounded bg-background border border-border flex items-center justify-center text-primary">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium mb-3">Local SEO</h3>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground font-mono">
                  <li>Google Business Profiles</li>
                  <li>Bing Places</li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={FADE_UP} className="p-6 bg-card border border-border flex flex-col gap-6">
              <div className="w-10 h-10 rounded bg-background border border-border flex items-center justify-center text-primary">
                <SiOpenai className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium mb-3">AI & Workflows</h3>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground font-mono">
                  <li>ChatGPT</li>
                  <li>Gemini</li>
                  <li>Copilot</li>
                  <li>Perplexity AI</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.section>

      </main>

      {/* 6. CONTACT / FOOTER */}
      <footer id="contact" className="border-t border-border mt-12 px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center bg-card">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={STAGGER}
          className="max-w-2xl flex flex-col items-center"
        >
          <motion.h2 variants={FADE_UP} className="text-3xl md:text-5xl font-medium mb-6">
            Let's build systems that scale visibility.
          </motion.h2>
          <motion.p variants={FADE_UP} className="text-muted-foreground mb-12">
            Available for new opportunities in technical SEO and systems implementation.
          </motion.p>
          
          <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <a href="mailto:morganmngadi@gmail.com" className="flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              <Mail className="w-4 h-4" />
              morganmngadi@gmail.com
            </a>
            <a href="tel:0762878982" className="flex items-center gap-3 px-6 py-3 border border-border hover:border-foreground transition-colors font-mono">
              <Phone className="w-4 h-4" />
              (076) 287 8982
            </a>
          </motion.div>

          <motion.div variants={FADE_UP} className="mt-24 pt-8 border-t border-border w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
            <span>© {new Date().getFullYear()} Morgan Mngadi.</span>
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Johannesburg, ZA</span>
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
}
