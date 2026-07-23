"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import BitmojiLogo from "./BitmojiLogo";
import { useTheme } from "./ThemeProvider";

export default function Header(): React.JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Research", href: "/research" },
    { label: "Blog", href: "/blog" },
    { label: "Open Source", href: "/open-source" },
    { label: "Now", href: "/now" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-3 sm:px-6 transition-all duration-300">
      <nav
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 ${
          scrolled
            ? "glass-card bg-nav-bg shadow-2xl shadow-indigo-950/5 dark:shadow-indigo-950/30 py-2.5 px-4 sm:px-6 border-nav-border"
            : "bg-nav-bg/60 backdrop-blur-md py-3.5 px-4 sm:px-6 border border-nav-border"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Custom Bitmoji Logo */}
          <BitmojiLogo size="md" />

          {/* Desktop Nav Links - text-base (16px) for larger menu items, flex-nowrap to keep on one line */}
          <ul className="hidden lg:flex items-center gap-1.5 bg-slate-100/50 dark:bg-white/[0.03] p-1.5 rounded-full border border-slate-200 dark:border-white/10 font-semibold text-base tracking-wide text-slate-700 dark:text-slate-300 flex-nowrap whitespace-nowrap">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-4 py-2 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 transition-all duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA Action */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {!mounted ? (
                <span className="w-4.5 h-4.5 block" />
              ) : theme === "dark" ? (
                <Sun className="w-4.5 h-4.5 text-amber-400" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-slate-600" />
              )}
            </button>

            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Actions Container */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer rounded-xl"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2 font-medium text-sm text-slate-800 dark:text-slate-200 animate-in fade-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl bg-slate-100/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-mono text-slate-700 dark:text-slate-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Theme Toggle inside the Menu Drawer */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 mt-2">
              <span className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">Switch Theme</span>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-xs font-mono"
                aria-label="Toggle Theme"
              >
                {!mounted ? (
                  <span className="w-4 h-4 block" />
                ) : theme === "dark" ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-600" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 text-center text-xs"
            >
              Contact Me <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
