import { useEffect } from "react";
import { getSeoConfig } from "@/lib/seo";

type SeoProps = {
  path: string;
};

const upsertMeta = (selector: string, create: () => HTMLMetaElement, value: string, attr: "content" = "content") => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = create();
    document.head.appendChild(element);
  }

  element.setAttribute(attr, value);
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
};

export function Seo({ path }: SeoProps) {
  useEffect(() => {
    const seo = getSeoConfig(path);

    document.title = seo.title;
    upsertMeta('meta[name="description"]', () => {
      const meta = document.createElement("meta");
      meta.name = "description";
      return meta;
    }, seo.description);
    upsertMeta('meta[name="robots"]', () => {
      const meta = document.createElement("meta");
      meta.name = "robots";
      return meta;
    }, seo.robots);
    upsertLink("canonical", seo.canonical);

    const metaPairs = [
      ["og:title", seo.title],
      ["og:description", seo.description],
      ["og:type", seo.type === "article" ? "article" : "website"],
      ["og:url", seo.canonical],
      ["og:image", seo.image],
      ["twitter:card", "summary_large_image"],
      ["twitter:title", seo.title],
      ["twitter:description", seo.description],
      ["twitter:image", seo.image],
    ];

    for (const [property, content] of metaPairs) {
      const isOpenGraph = property.startsWith("og:");
      upsertMeta(
        isOpenGraph ? `meta[property="${property}"]` : `meta[name="${property}"]`,
        () => {
          const meta = document.createElement("meta");
          if (isOpenGraph) {
            meta.setAttribute("property", property);
          } else {
            meta.name = property;
          }
          return meta;
        },
        content,
      );
    }

    document.querySelectorAll('script[data-seo-schema="true"]').forEach((script) => script.remove());

    for (const schema of seo.schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoSchema = "true";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [path]);

  return null;
}
