import { renderToString } from "react-dom/server";
import App from "./App";
import { renderSeoHead, routes } from "@/lib/seo";
import "./index.css";

export function render(url: string) {
  const path = new URL(url, "https://local.invalid").pathname;
  const html = renderToString(<App ssrPath={path} />);
  const head = renderSeoHead(path);

  return { html, head };
}

export { routes };
