import "./index.css"; // <-- ensure Tailwind is bundled
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Shadow DOM render logic
async function loadWidgetCSS(cssFileName) {
  const scriptUrl = import.meta.url;
  const cssUrl = scriptUrl.replace(/[^/]+$/, cssFileName);
  const res = await fetch(cssUrl);
  return await res.text();
}

window.TaxonomyNavigator = {
  render: async (selector, props = {}) => {
    const container = document.querySelector(selector);
    if (!container) {
      console.error(`TaxonomyNavigator: No element found for selector "${selector}"`);
      return;
    }

    const shadow = container.attachShadow({ mode: "open" });

    try {
      const cssText = await loadWidgetCSS("taxonomy-navigator.css");
      const styleTag = document.createElement("style");
      styleTag.textContent = cssText;
      shadow.appendChild(styleTag);
    } catch (err) {
      console.error("TaxonomyNavigator: Failed to load CSS", err);
    }

    const mountPoint = document.createElement("div");
    shadow.appendChild(mountPoint);

    const root = ReactDOM.createRoot(mountPoint);
    root.render(<App {...props} />);
  },
};
