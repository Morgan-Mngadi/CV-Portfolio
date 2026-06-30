import { useEffect, useState } from "react";
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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-[hsl(var(--background))]">
      <div className="relative z-50 max-w-6xl mx-auto px-6 min-h-12 flex items-center justify-between bg-[hsl(var(--background))]">
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
          className="md:hidden inline-flex h-9 w-9 items-center justify-center border border-border bg-[hsl(var(--background))] text-muted-foreground transition-colors hover:border-muted-foreground/50 hover:text-foreground focus:outline-none focus-visible:border-muted-foreground/60 focus-visible:text-foreground"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 h-dvh overflow-y-auto md:hidden bg-[hsl(var(--background))] animate-in fade-in-0 duration-200">
          <div className="absolute inset-0 bg-[hsl(var(--background))]" />
          <div
            className="absolute inset-0 pointer-events-none opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--border) / 0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.35) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          <div className="relative flex min-h-dvh flex-col px-6 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-24">
            <div className="mb-8 border-b border-border pb-4">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Navigation</p>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-1">
              {NAV_ITEMS.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center justify-between border-b border-border/70 py-5 transition-colors ${
                    isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-3xl font-medium tracking-tight">{item.label}</span>
                  <span className="font-mono text-xs tabular-nums text-primary/80">{String(index + 1).padStart(2, "0")}</span>
                </Link>
              ))}
            </div>

            <div className="mt-10 grid gap-4 border-t border-border pt-5">
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                Organic Search Growth Specialist focused on analytics and product-led search systems.
              </p>
              <Link
                href={contactHref}
                className="inline-flex min-h-12 items-center justify-center bg-primary px-5 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
                onClick={handleContactClick}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
