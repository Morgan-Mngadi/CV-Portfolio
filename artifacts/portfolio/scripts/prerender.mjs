import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { routes } from "../dist/server/entry-server.js";
import { render } from "../dist/server/entry-server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distRoot = path.join(projectRoot, "dist", "public");
const template = await readFile(path.join(distRoot, "index.html"), "utf8");
const deploymentId =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.CF_PAGES_COMMIT_SHA ||
  process.env.NETLIFY_COMMIT_REF ||
  new Date().toISOString();
const deploymentInfo = {
  id: deploymentId,
  generatedAt: new Date().toISOString(),
};
const deploymentMeta = `<meta name="app-build-id" content="${deploymentId}" />`;

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
    .replace("<!--build-info-->", deploymentMeta)
    .replace("<!--app-html-->", html);
  const outputPath = outputPathForRoute(route);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output);

  if (route === "/404") {
    await writeFile(path.join(distRoot, "404.html"), output);
  }
}

await writeFile(path.join(distRoot, "deployment.json"), `${JSON.stringify(deploymentInfo, null, 2)}\n`);

console.log(`Prerendered ${routes.length} routes.`);
