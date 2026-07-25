import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GithubIcon, LinkedinIcon } from "../components/SocialIcons";
import { Mail, Download, Sparkles, Briefcase, Send } from "lucide-react";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Param Pandya | AI Engineer",
  description:
    "Get in touch with Param Pandya for AI startup roles, machine learning engineering, research collaboration, and technical projects.",
  openGraph: {
    title: "Contact Param Pandya | AI Engineer",
    description:
      "Get in touch with Param Pandya for AI startup roles, machine learning engineering, research collaboration, and technical projects.",
    type: "website",
    url: "https://parampandya.vercel.app/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Param Pandya | AI Engineer",
    description:
      "Get in touch with Param Pandya for AI startup roles, machine learning engineering, research collaboration, and technical projects.",
  },
};

export default function ContactPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header />

      {/* Hero Header */}
      <section className="pt-34 pb-10 px-4 sm:px-6 relative bg-radial-glow overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono tracking-widest uppercase mb-4">
            <Mail className="w-3.5 h-3.5 text-cyan-400" /> GET IN TOUCH
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Contact & Collaboration
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed font-normal">
            Optimized for recruiters from AI startups, hiring managers, research collaborators, and machine learning engineering opportunities.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 pb-24 space-y-10">
        {/* 1. Direct Message Form Box (ON TOP) */}
        <ContactForm />

        {/* 2. Contact Options Cards (BELOW DIRECT MESSAGE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Full-Time AI Roles */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6 bg-slate-950/90 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Briefcase className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                Full-Time AI Roles & Startups
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Looking for an AI Engineer or ML Engineer who can deploy reliable machine learning pipelines? I am actively available for AI opportunities.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3 font-mono text-xs">
              <a
                href="mailto:pandyaparam7@gmail.com?subject=AI%20Engineering%20Opportunity"
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-500/20"
              >
                <span>Email: pandyaparam7@gmail.com</span>
                <Send className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://drive.google.com/file/d/1SaLjcokhsq6WCEQ0AS00xRqmCiDAW9Cg/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-slate-200 transition-all"
              >
                <span>View / Download Resume (PDF)</span>
                <Download className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>
          </div>

          {/* Card 2: Research & Technical Links */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6 bg-slate-950/90 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                Research & Social Profiles
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Connect with me on LinkedIn to discuss machine learning, computer vision research, or view my latest GitHub code repositories.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3 font-mono text-xs">
              <a
                href="https://www.linkedin.com/in/parampandya/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-slate-200 transition-all"
              >
                <span className="flex items-center gap-2">
                  <LinkedinIcon className="w-4 h-4 text-cyan-400" /> LinkedIn Connection
                </span>
                <Send className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/Param-Pandya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-slate-200 transition-all"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4 text-emerald-400" /> GitHub Repositories
                </span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
