import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { routes } from "../dist/server/entry-server.js";
import { render } from "../dist/server/entry-server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distRoot = path.join(projectRoot, "dist", "public");
const template = await readFile(path.join(distRoot, "index.html"), "utf8");

const outputPathForRoute = (route) => {
  if (route === "/") {
    return path.join(distRoot, "index.html");
  }

  return path.join(distRoot, route.replace(/^\//, ""), "index.html");
};

for (const route of routes) {
  const { html, head } = render(route);
  const output = template
    .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, `<!--seo-start-->\n    ${head}\n    <!--seo-end-->`)
    .replace("<!--app-html-->", html);
  const outputPath = outputPathForRoute(route);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output);
}

console.log(`Prerendered ${routes.length} routes.`);
