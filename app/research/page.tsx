"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BibtexModal from "../components/BibtexModal";
import {
  publications,
  researchInterests,
  ongoingResearch,
  futureIdeas,
  researchTimeline,
  researchDownloads,
  Publication,
} from "../data/researchData";
import {
  FileText,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  ArrowUpRight,
  Download,
  Calendar,
  Compass,
  Cpu,
  Quote,
} from "lucide-react";

export default function ResearchPage(): React.JSX.Element {
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const ieeePaper = publications[0];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header />

      {/* Hero Header Section */}
      <section className="pt-34 pb-10 px-4 sm:px-6 relative bg-radial-glow overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4">
            <FileText className="w-3.5 h-3.5 text-cyan-400" /> IEEE PUBLICATION & RESEARCH
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            AI Research & Publications
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed font-normal">
            Advancing empirical AI research across media forensics, clinical NLP, and computer vision—bridging academic research across IITs with production safety.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 space-y-24 pb-24">
        {/* SECTION 1: Featured IEEE Publication */}
        <section id="ieee-publication" className="space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                01 // Peer-Reviewed Publication
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                IEEE Publication (2024)
              </h2>
            </div>
            <Award className="w-6 h-6 text-cyan-400 opacity-80 hidden sm:block" />
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/15 bg-gradient-to-r from-slate-100/70 via-white/80 to-white/80 dark:from-indigo-950/50 dark:via-slate-950 dark:to-slate-950 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
                IEEE Xplore Published (2024)
              </span>
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Document ID: 10872263
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {ieeePaper.title}
              </h3>
              <p className="text-indigo-400 font-mono text-xs font-semibold">
                {ieeePaper.authors.join(", ")} — {ieeePaper.venue}
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {ieeePaper.abstract}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {ieeePaper.metrics.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 font-mono text-center">
                  <div className="text-indigo-400 text-xs">{m.label}</div>
                  <div className="text-white text-base font-bold mt-1">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={ieeePaper.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25"
              >
                <span>IEEE Xplore Document</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setSelectedPub(ieeePaper)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-semibold text-slate-200 glass-card hover:bg-white/10 transition-all"
              >
                <Quote className="w-3.5 h-3.5 text-cyan-400" /> View BibTeX & Citation
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: Research Interests */}
        <section id="interests" className="space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-semibold">
                02 // Core Domains
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Research Interests
              </h2>
            </div>
            <Sparkles className="w-6 h-6 text-indigo-400 opacity-80 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchInterests.map((interest, idx) => (
              <div
                key={idx}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 relative overflow-hidden bg-slate-950/80"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                    {interest.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">{interest.title}</h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {interest.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {interest.topics.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[10px] font-mono text-slate-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Research Experience */}
        <section id="experience" className="space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                03 // Academic & IIT Milestones
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Research Experience
              </h2>
            </div>
            <Calendar className="w-6 h-6 text-emerald-400 opacity-80 hidden sm:block" />
          </div>

          <div className="space-y-4">
            {researchTimeline.map((item, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold">
                      {item.year}
                    </span>
                    <span className="text-xs text-indigo-400 font-bold">{item.institution}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-slate-300 text-xs font-sans leading-relaxed">{item.description}</p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-slate-300 whitespace-nowrap self-start sm:self-center">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Future Research & Reading List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 bg-slate-950/80">
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" /> Future Research Areas
            </h3>
            <div className="space-y-3">
              {futureIdeas.map((idea, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <h4 className="text-sm font-bold text-indigo-300 font-mono">{idea.title}</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">{idea.vision}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5 bg-slate-950/80 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" /> Curated Reading & Preprints
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                This repository features ongoing academic preprints, technical reports, and notes on foundational machine learning models.
              </p>
            </div>

            <div className="rounded-2xl border border-dashed border-slate-200/10 dark:border-white/5 bg-white/[0.01] p-6 text-center space-y-3 my-auto">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold tracking-wider uppercase">
                Coming Soon
              </span>
              <p className="text-slate-300 text-xs leading-relaxed max-w-sm mx-auto">
                Documents, technical slides, and reading logs are being indexed. This section will publish:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 text-left max-w-xs mx-auto pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                  <span>Research Papers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                  <span>Preprints</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                  <span>Technical Reports</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                  <span>Reading Notes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                  <span>Presentations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                  <span>Case Studies</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* BibTeX Modal */}
      <BibtexModal
        publication={selectedPub}
        onClose={() => setSelectedPub(null)}
      />

      <Footer />
    </main>
  );
}
