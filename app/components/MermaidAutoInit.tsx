"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    mermaid?: any;
  }
}

export default function MermaidAutoInit() {
  const initMermaid = () => {
    if (typeof window !== "undefined" && window.mermaid) {
      try {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            background: "#020817",
            primaryColor: "#1e293b",
            primaryTextColor: "#f8fafc",
            lineColor: "#6366f1",
          },
          securityLevel: "loose",
        });
        const elements = document.querySelectorAll(".mermaid:not([data-processed='true'])");
        if (elements.length > 0) {
          window.mermaid.run({
            nodes: Array.from(elements),
          });
        }
      } catch (e) {
        console.error("Mermaid auto init error:", e);
      }
    }
  };

  useEffect(() => {
    initMermaid();
    const interval = setInterval(initMermaid, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js"
      strategy="lazyOnload"
    />
  );
}
