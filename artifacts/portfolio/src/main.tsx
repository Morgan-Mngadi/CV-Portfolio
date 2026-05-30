import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;
const hasServerRenderedHtml = root.innerHTML.trim() !== "" && !root.innerHTML.includes("app-html");

if (hasServerRenderedHtml) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
