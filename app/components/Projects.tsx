"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  ArrowUpRight,
  ExternalLink,
  ShieldAlert,
  FileCode2,
  Sparkles,
  Layers,
  ChevronRight,
} from "lucide-react";
import { projectsData, ProjectCaseStudy } from "../data/projectsData";
import CaseStudyModal from "./CaseStudyModal";

export default function Projects(): React.JSX.Element {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 relative bg-radial-glow">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4">
            <BookOpen className="w-3.5 h-3.5" /> 03 // Peer-Reviewed Research Systems
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Projects & Research Systems
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Detailed technical breakdowns of AI research, deep learning architectures, and production models.
          </p>
        </div>

        {/* Case Study Cards Grid */}
        <div className="space-y-16">
          {projectsData.map((project, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="glass-card glass-card-hover rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 relative overflow-hidden group shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                {/* Top Corner Featured Ribbon Badge */}
                <div className="absolute top-0 right-0 z-10">
                  <div
                    className={`px-4 py-1.5 rounded-bl-2xl rounded-tr-3xl text-xs font-mono font-semibold shadow-md ${project.ribbonColor}`}
                  >
                    ★ {project.ribbon}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 sm:pt-0">
                  {/* Left Column: Text & Problem Solved */}
                  <div
                    className={`lg:col-span-7 space-y-5 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {/* Project Title */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors">
                      {project.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Problem Solved Highlight Box */}
                    <div className="p-4 rounded-2xl bg-slate-100/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
                        <ShieldAlert className="w-4 h-4" /> Core Problem Solved
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {project.problemSolved}
                      </p>
                    </div>

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-250 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300 group-hover:border-slate-300 dark:group-hover:border-white/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links & Read Case Study Button */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      {/* Primary Action: Read Case Study */}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 transition-all active:scale-95 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Read Project Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* GitHub Link */}
                      <a
                        href={project.githubUrl}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-mono text-slate-700 dark:text-slate-300 glass-card hover:bg-slate-200/50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all"
                      >
                        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>GitHub</span>
                      </a>

                      {/* Live Demo / Paper */}
                      {project.paperUrl && (
                        <a
                          href={project.paperUrl}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-mono text-slate-700 dark:text-slate-300 glass-card hover:bg-slate-200/50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                          <span>Paper Link</span>
                        </a>
                      )}

                      {/* Dedicated Route Navigation */}
                      <Link
                        href={`/projects/${project.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-indigo-650 dark:hover:text-indigo-300 transition-colors ml-auto"
                      >
                        <span>Dedicated Page</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Thumbnail & Interactive Click */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-950 shadow-2xl group cursor-pointer"
                    >
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none"></div>

                      <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-700 dark:text-slate-300 group-hover:border-indigo-500/40 transition-colors">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          Click for Full Technical Breakdown
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-indigo-550 dark:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Reader Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
      />
    </section>
  );
}



