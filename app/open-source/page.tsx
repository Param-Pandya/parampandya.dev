import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GithubIcon } from "../components/SocialIcons";
import { Terminal, Layers, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Open Source Contributions & Repositories | Param Pandya",
  description: "Explore Param Pandya's open source developer tools, reusable libraries, and community contributions.",
  openGraph: {
    title: "Open Source Contributions & Repositories | Param Pandya",
    description: "Explore Param Pandya's open source developer tools, reusable libraries, and community contributions.",
    type: "website",
    url: "https://parampandya.vercel.app/open-source",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source Contributions & Repositories | Param Pandya",
    description: "Explore Param Pandya's open source developer tools, reusable libraries, and community contributions.",
  },
};

export default function OpenSourcePage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header />

      {/* Hero Header Section */}
      <section className="pt-34 pb-10 px-4 sm:px-6 relative bg-radial-glow overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono tracking-widest uppercase mb-4">
            <GithubIcon className="w-3.5 h-3.5 text-rose-400" /> OPEN SOURCE & COMMUNITY
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Open Source
          </h1>

          <p className="text-slate-350 text-sm sm:text-lg max-w-2xl leading-relaxed font-normal">
            Open source projects, developer tools, reusable libraries, and community contributions will be published here as they become production-ready.
          </p>
        </div>
      </section>

      {/* Content Placeholder Card Section */}
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 pb-24">
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-white/10 bg-slate-950/80 space-y-6 text-center shadow-2xl relative overflow-hidden">
          {/* Background glowing layer */}
          <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none"></div>

          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Terminal className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2">
              <span>🚀 Planned Contributions</span>
            </h2>
          </div>

          {/* Planned Items Grid */}
          <div className="border-t border-slate-200 dark:border-white/10 pt-6 max-w-sm mx-auto text-left">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-650 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>AI Engineering Libraries</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>LLM Utilities & Tooling</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>Python Packages</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>Developer Productivity Tools</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>Open Source Templates</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>Community Contributions</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-white/5 space-y-4">
            <div className="flex justify-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-450 dark:text-rose-400 text-xs font-mono font-bold tracking-widest uppercase animate-pulse">
                Coming Soon
              </span>
            </div>
            
            <p className="text-slate-500 dark:text-slate-450 text-xs leading-relaxed max-w-md mx-auto italic">
              I'm currently focused on building production AI systems and educational content. My open source projects will be published here once they reach a stable, production-ready state.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
