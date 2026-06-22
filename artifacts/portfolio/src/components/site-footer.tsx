import { Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";
import logoSrc from "@assets/5259D053-7FB7-4BC6-92C7-D625ADDC9985_1779213029285.png";

const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Case Study", href: "/projects/commuteza" },
  { label: "Work With Me", href: "/work-with-me" },
  { label: "Blog", href: "/blog" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border bg-background/80">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <Link href="/" className="group flex items-center gap-4" aria-label="Morgan Mngadi home">
            <span className="flex h-12 w-12 items-center justify-center border border-border bg-card transition-colors group-hover:border-primary">
              <img src={logoSrc} alt="" className="h-8 w-8 object-contain opacity-90" />
            </span>
            <span>
              <span className="block font-medium text-foreground">Morgan Mngadi</span>
              <span className="mt-1 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Organic Search Specialist
              </span>
            </span>
          </Link>

          <div className="flex flex-col gap-6 md:items-end">
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                id="footer-contact-email"
                href="mailto:morganmngadi@gmail.com"
                aria-label="Email Morgan Mngadi"
                className="inline-flex h-10 w-10 items-center justify-center border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/morgan-mngadi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Morgan Mngadi on LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Morgan Mngadi</span>
          <span>Johannesburg, South Africa</span>
        </div>
      </div>
    </footer>
  );
}
