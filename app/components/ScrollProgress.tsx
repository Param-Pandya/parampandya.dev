"use client";

import { useState, useEffect } from "react";

export default function ScrollProgress(): React.JSX.Element {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentScroll = window.scrollY;
        const progress = (currentScroll / totalHeight) * 100;
        setScrollPercentage(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 shadow-sm shadow-indigo-500/50 transition-all duration-150 ease-out"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}
