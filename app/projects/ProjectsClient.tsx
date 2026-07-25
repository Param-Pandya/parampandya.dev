"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { projectsData } from "../data/projectsData";
import { FolderGit2, ArrowRight, Code2 } from "lucide-react";

export default function ProjectsClient(): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "🤖 AI Applications",
    "🧠 AI Agents",
    "👁 Computer Vision",
    "📚 AI Research",
    "📊 Data Science",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header />

      {/* Hero Section */}
      <section className="pt-34 pb-10 px-4 sm:px-6 relative bg-radial-glow overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono tracking-widest uppercase mb-4">
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" /> ENGINEERING SHOWCASE
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            AI Engineering Projects
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed font-normal mb-6">
            Detailed engineering showcases detailing real-world problems, neural architectures, benchmark results, system challenges, and key technical learnings.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-col items-center gap-3 bg-white/[0.03] p-3 rounded-2xl border border-white/10 w-full max-w-3xl">
            {/* Row 1: All */}
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-10 py-2.5 rounded-xl text-sm font-mono font-bold transition-all duration-200 ${
                selectedCategory === "All"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              All
            </button>

            {/* Row 2: Categories */}
            <div className="flex flex-nowrap justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar w-full py-1">
              {categories
                .filter((cat) => cat !== "All")
                .map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30 font-bold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6 flex flex-col justify-between group relative overflow-hidden bg-slate-950/80"
            >
              <div className="space-y-4">
                {/* Header Tag & Category */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${project.ribbonColor}`}>
                    {project.ribbon}
                  </span>
                  <span className="text-xs font-mono text-slate-400 border border-white/10 px-2.5 py-0.5 rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h2>

                {/* Problem Statement Box */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold">
                    Problem Solved:
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">{project.problemSolved}</p>
                </div>

                {/* Overview */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 font-mono">
                  {project.results.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-2.5 rounded-xl bg-slate-900/90 border border-white/5 text-center">
                      <div className="text-indigo-400 text-[10px] truncate">{m.label}</div>
                      <div className="text-white text-sm font-bold mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Tech Stack & Case Button */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[10px] font-mono text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex-1"
                  >
                    <span>Read Mini-Engineering Blog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Code2 className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
