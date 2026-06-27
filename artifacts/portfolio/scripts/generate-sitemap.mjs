import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SITE_URL = "https://morgan-mngadi-portfolio.online";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const serverEntryPath = path.join(projectRoot, "dist", "server", "entry-server.js");
const sourceSitemapPath = path.join(projectRoot, "public", "sitemap.xml");
const distSitemapPath = path.join(projectRoot, "dist", "public", "sitemap.xml");

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const priorityForRoute = (route) => {
  if (route === "/") return "1.0";
  if (route === "/areas-of-expertise") return "0.9";
  if (route === "/about" || route === "/projects/commuteza") return "0.8";
  return "0.7";
};

const absoluteUrl = (route) => `${SITE_URL}${route === "/" ? "" : route}`;

export const buildSitemap = (routes) => {
  const urls = routes
    .filter((route) => route !== "/404")
    .sort((a, b) => {
      if (a === "/") return -1;
      if (b === "/") return 1;
      return a.localeCompare(b);
    })
    .map(
      (route) => `  <url>
    <loc>${escapeXml(absoluteUrl(route))}</loc>
    <changefreq>monthly</changefreq>
    <priority>${priorityForRoute(route)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

export const writeSitemap = async (routes) => {
  const sitemap = buildSitemap(routes);
  const outputPaths = [sourceSitemapPath, distSitemapPath];

  await Promise.all(
    outputPaths.map(async (outputPath) => {
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, sitemap);
    }),
  );

  console.log(`Generated sitemap.xml with ${routes.filter((route) => route !== "/404").length} routes.`);
};

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
  const { routes } = await import(pathToFileURL(serverEntryPath).href);
  await writeSitemap(routes);
}
