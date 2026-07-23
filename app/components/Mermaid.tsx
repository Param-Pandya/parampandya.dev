"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    mermaid?: any;
  }
}

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMermaid = () => {
      if (window.mermaid) {
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
        if (ref.current) {
          ref.current.removeAttribute("data-processed");
          ref.current.innerHTML = chart;
          try {
            window.mermaid.run({
              nodes: [ref.current],
            });
            
            // Override Mermaid's hardcoded narrow max-width styles to let the SVG fill the container
            const svg = ref.current.querySelector("svg");
            if (svg) {
              svg.style.maxWidth = "100%";
              svg.style.width = "100%";
              svg.style.height = "auto";
              svg.classList.add("scale-[1.02]", "sm:scale-[1.05]", "transition-transform", "duration-300");
            }
          } catch (e) {
            console.error("Mermaid parsing error:", e);
          }
        }
      }
    };

    if (window.mermaid) {
      initializeMermaid();
    } else {
      const interval = setInterval(() => {
        if (window.mermaid) {
          clearInterval(interval);
          initializeMermaid();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [chart]);

  return (
    <div className="flex justify-center bg-slate-950/60 p-6 rounded-2xl border border-white/5 overflow-x-auto my-4 w-full">
      <div className="mermaid text-center w-full" ref={ref}>
        {chart}
      </div>
    </div>
  );
}
