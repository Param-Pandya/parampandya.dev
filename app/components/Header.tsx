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

  // Dismiss mobile drawer on scroll
  useEffect(() => {
    if (!mobileMenuOpen) return;

    let active = false;
    const timer = setTimeout(() => {
      active = true;
    }, 150);

    const handleMobileScroll = () => {
      if (active) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleMobileScroll, { passive: true });
    window.addEventListener("touchmove", handleMobileScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleMobileScroll);
      window.removeEventListener("touchmove", handleMobileScroll);
    };
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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

          {/* Desktop Nav Links */}
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
      </nav>

      {/* Full-screen Backdrop Blur Overlay */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300 z-40 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Viewport-Anchored Mobile Navigation Drawer */}
      <div
        className={`fixed top-4 left-3 right-3 sm:left-6 sm:right-6 max-h-[85vh] overflow-y-auto rounded-3xl glass-card bg-nav-bg border-nav-border shadow-2xl backdrop-blur-2xl transition-all duration-300 ease-in-out z-50 lg:hidden ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-10 opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Header inside drawer */}
          <div className="flex items-center justify-between">
            <BitmojiLogo size="md" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer rounded-xl"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
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
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 text-center text-xs shadow-md shadow-indigo-500/25"
          >
            Contact Me <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
