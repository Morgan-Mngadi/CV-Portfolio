import { useState } from "react";
import type { MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import logoSrc from "@assets/5259D053-7FB7-4BC6-92C7-D625ADDC9985_1779213029285.png";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Case Study", href: "/projects/commuteza" },
  { label: "Expertise", href: "/areas-of-expertise" },
  { label: "Blog", href: "/blog" },
];

const linkClass = (isActive: boolean) =>
  `font-mono text-xs uppercase tracking-widest transition-colors ${
    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
  }`;

export function SiteNav() {
  const [location, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const contactHref = location === "/" ? "#contact" : "/#contact";

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsOpen(false);
    navigate("/#contact");

    if (location === "/") {
      window.requestAnimationFrame(() => {
        document.getElementById("contact")?.scrollIntoView({ block: "start" });
      });
    }
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return location === "/";
    }

    return location === href || location.startsWith(`${href}/`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 min-h-12 flex items-center justify-between">
        <Link href="/" aria-label="Morgan Mngadi home" onClick={() => setIsOpen(false)}>
          <img src={logoSrc} alt="Morgan Mngadi logo" className="h-9 w-9 object-contain opacity-90 cursor-pointer" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(isActive(item.href))}>
              {item.label}
            </Link>
          ))}
          <Link
            href={contactHref}
            onClick={handleContactClick}
            className="font-mono text-xs bg-primary text-primary-foreground px-3 py-1 hover:bg-primary/90 transition-colors uppercase tracking-widest"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground hover:text-foreground"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 px-6 py-4">
          <div className="max-w-6xl mx-auto flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(isActive(item.href))}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={contactHref}
              className="font-mono text-xs bg-primary text-primary-foreground px-3 py-2 hover:bg-primary/90 transition-colors uppercase tracking-widest self-start"
              onClick={handleContactClick}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
