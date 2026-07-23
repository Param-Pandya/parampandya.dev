"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface ReaderModeProps {
  title: string;
  category: string;
  readTime: string;
  date: string;
  backUrl: string;
  toc: TOCItem[];
  children: React.ReactNode;
}

export default function ReaderMode({
  title,
  category,
  readTime,
  date,
  backUrl,
  toc,
  children,
}: ReaderModeProps) {
  const router = useRouter();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileTOCOpen, setIsMobileTOCOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("reader-theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Update localStorage when theme changes
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("reader-theme", nextTheme);
  };

  // Track reading/scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle intersection observer to highlight active section in TOC
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const headingElements = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is currently intersecting
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px", // Trigger when headings are near top
        threshold: 0.1,
      }
    );

    headingElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [toc]);

  // Handle escape key to close reader
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Dismiss reader and return to portfolio, preserving list scroll position
  const handleClose = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(backUrl);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsMobileTOCOpen(false);
      // Account for the sticky top toolbar offset
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "light"
          ? "bg-white text-slate-800 selection:bg-indigo-100 selection:text-indigo-900"
          : "bg-[#020817] text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200"
      }`}
    >
      {/* Sticky Top Reader Toolbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-300 border-b ${
          theme === "light"
            ? "bg-white/80 border-slate-200 text-slate-800"
            : "bg-[#020817]/80 border-white/10 text-slate-200"
        } backdrop-blur-md`}
      >
        <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
          {/* Top Left: Breadcrumb */}
          <button
            onClick={handleClose}
            className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold transition-colors cursor-pointer ${
              theme === "light"
                ? "text-indigo-600 hover:text-indigo-800"
                : "text-indigo-400 hover:text-indigo-300"
            }`}
            aria-label="Back to Portfolio"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Portfolio</span>
          </button>

          {/* Center: Title & Metadata */}
          <div className="flex-1 min-w-0 text-center hidden md:block">
            <h2 className="text-xs font-bold font-mono tracking-tight truncate max-w-lg mx-auto">
              {title}
            </h2>
            <p className="text-[10px] font-mono text-slate-500 mt-0.5">
              {readTime} • {category} • {date}
            </p>
          </div>

          {/* Top Right Controls: Theme & Close */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all border cursor-pointer hover:scale-105 active:scale-95 ${
                theme === "light"
                  ? "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  : "bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
              aria-label="Toggle Reader Mode Theme"
            >
              {theme === "light" ? (
                <span className="flex items-center gap-1 text-[11px] font-mono font-bold">
                  <Moon className="w-3.5 h-3.5" /> Dark
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] font-mono font-bold">
                  <Sun className="w-3.5 h-3.5" /> Light
                </span>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                theme === "light"
                  ? "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-200"
              }`}
              aria-label="Close Reader Mode"
            >
              <span className="hidden sm:inline">✕ Close Reader Mode</span>
              <span className="sm:hidden">✕</span>
            </button>
          </div>
        </div>

        {/* Dynamic Reading Progress Bar */}
        <div className="w-full h-[3px] bg-slate-900/10 dark:bg-white/5 relative">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Main Page Layout Wrapper */}
      <div className="container mx-auto max-w-7xl px-4 py-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sticky Table of Contents (Desktop Only) */}
          <aside className="lg:col-span-3 sticky top-28 hidden lg:block max-h-[calc(100vh-140px)] overflow-y-auto pr-4 no-scrollbar">
            <div className="space-y-4">
              <h3
                className={`text-xs font-mono uppercase tracking-widest font-bold ${
                  theme === "light" ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Contents
              </h3>
              <nav className="flex flex-col gap-2 border-l border-slate-200 dark:border-white/5 pl-4">
                {toc.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left text-xs font-mono transition-all duration-200 py-1 cursor-pointer block hover:translate-x-1 ${
                      activeSection === item.id
                        ? theme === "light"
                          ? "text-indigo-600 font-bold border-l-2 border-indigo-600 -ml-[18px] pl-[16px]"
                          : "text-indigo-400 font-bold border-l-2 border-indigo-400 -ml-[18px] pl-[16px]"
                        : theme === "light"
                        ? "text-slate-500 hover:text-slate-800"
                        : "text-slate-400 hover:text-slate-200"
                    } ${item.level === 3 ? "pl-4" : ""}`}
                  >
                    • {item.text}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Center Column: Article Body Container */}
          <main className="lg:col-span-9 lg:pl-4 xl:pl-8">
            <div
              className={`mx-auto max-w-[800px] prose transition-colors duration-300 ${
                theme === "light" ? "prose-slate prose-invert-0" : "prose-invert"
              }`}
            >
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Floating TOC Button (Mobile/Tablet Only) */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMobileTOCOpen(true)}
          className={`p-4 rounded-full shadow-2xl transition-all border flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 ${
            theme === "light"
              ? "bg-white border-slate-200 text-indigo-600 shadow-indigo-500/10"
              : "bg-indigo-600 border-indigo-500/20 text-white shadow-indigo-500/30"
          }`}
          aria-label="Open Table of Contents"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile TOC Drawer Overlay */}
      {isMobileTOCOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            onClick={() => setIsMobileTOCOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            className={`relative w-80 h-full p-6 shadow-2xl flex flex-col justify-between border-l transition-colors duration-300 ${
              theme === "light" ? "bg-white border-slate-200" : "bg-[#0b1329] border-white/10"
            }`}
          >
            <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-100px)] no-scrollbar">
              <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-white/10">
                <h3
                  className={`text-xs font-mono uppercase tracking-widest font-bold ${
                    theme === "light" ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Contents
                </h3>
                <button
                  onClick={() => setIsMobileTOCOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-3">
                {toc.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left text-xs font-mono py-1.5 transition-colors cursor-pointer ${
                      activeSection === item.id
                        ? theme === "light"
                          ? "text-indigo-600 font-bold"
                          : "text-indigo-400 font-bold"
                        : theme === "light"
                        ? "text-slate-500"
                        : "text-slate-400"
                    } ${item.level === 3 ? "pl-4" : ""}`}
                  >
                    • {item.text}
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-white/10 text-center">
              <button
                onClick={() => setIsMobileTOCOpen(false)}
                className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  theme === "light"
                    ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
