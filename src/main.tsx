import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./fonts.css";
import "./index.css";

const container = document.getElementById("root")!;

// Production HTML is prerendered (see scripts/prerender.mjs): hydrate it.
// In dev the container is empty, so mount normally.
if (container.firstElementChild) {
  hydrateRoot(container, <App pathname={window.location.pathname} />);
} else {
  createRoot(container).render(<App pathname={window.location.pathname} />);
}

// Offline fallback page (see public/sw.js). Production only, after the page has loaded.
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* not critical: the site works the same without the offline page */
    });
  });
}
