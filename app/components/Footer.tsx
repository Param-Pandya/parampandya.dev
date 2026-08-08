"use client";

import Link from "next/link";
import BitmojiLogo from "./BitmojiLogo";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { ArrowUpRight, Mail, FileText, Heart } from "lucide-react";

export default function Footer(): React.JSX.Element {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 pt-16 pb-12 text-slate-600 dark:text-slate-300 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-600/10 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-white/10">
          {/* Column 1: Brand & Bitmoji Logo */}
          <div className="md:col-span-5 space-y-4">
            <BitmojiLogo size="lg" />
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Param Pandya — AI Engineer with an M.Tech from VIT. Building machine learning, computer vision, and generative AI applications grounded in research and production reliability.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Param-Pandya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-250 dark:hover:bg-white/10 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/parampandya/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-250 dark:hover:bg-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://drive.google.com/file/d/1SaLjcokhsq6WCEQ0AS00xRqmCiDAW9Cg/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-250 dark:hover:bg-white/10 transition-colors"
                aria-label="Resume (Google Drive)"
                title="View Resume on Google Drive"
              >
                <FileText className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              </a>
              <a
                href="mailto:pandyaparam7@gmail.com"
                className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-250 dark:hover:bg-white/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Map */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/" className="hover:text-indigo-650 dark:hover:text-indigo-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-650 dark:hover:text-indigo-300 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-indigo-650 dark:hover:text-indigo-300 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-indigo-650 dark:hover:text-indigo-300 transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-indigo-650 dark:hover:text-indigo-300 transition-colors">
                  Research
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Writing */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Platform & Updates
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/blog" className="hover:text-indigo-650 dark:hover:text-indigo-300 transition-colors">
                  Learning Notes
                </Link>
              </li>
              <li>
                <Link href="/open-source" className="hover:text-indigo-650 dark:hover:text-indigo-300 transition-colors">
                  Open Source Repositories
                </Link>
              </li>
              <li>
                <Link href="/now" className="hover:text-indigo-650 dark:hover:text-indigo-300 transition-colors flex items-center gap-1.5 text-indigo-650 dark:text-indigo-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                  What I'm Doing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-650 dark:hover:text-indigo-300 transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Param Pandya. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js 16 & PyTorch Mindset
          </p>
        </div>
      </div>
    </footer>
  );
}
