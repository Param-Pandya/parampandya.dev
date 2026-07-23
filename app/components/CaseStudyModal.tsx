"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  X,
  ExternalLink,
  BookOpen,
  Layers,
  Database,
  Cpu,
  Award,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { ProjectCaseStudy, projectsData } from "../data/projectsData";

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onSelectProject?: (project: ProjectCaseStudy) => void;
}

export default function CaseStudyModal({
  project,
  onClose,
  onSelectProject,
}: CaseStudyModalProps): React.JSX.Element | null {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [project]);

  if (!project) return null;

  const relatedProjects = project.relatedProjectIds
    .map((id) => projectsData.find((p) => p.id === id))
    .filter(Boolean) as ProjectCaseStudy[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      {/* Modal Container */}
      <div
        className="glass-card rounded-3xl border border-white/15 w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative bg-slate-950/90 text-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-slate-950/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${project.ribbonColor}`}
            >
              {project.ribbon}
            </span>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
              CASE STUDY Showcase
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-12">
          {/* Title & Actions */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono text-slate-200 bg-white/5 hover:bg-white/15 border border-white/10 transition-all"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub Repository</span>
              </a>

              {project.paperUrl && (
                <a
                  href={project.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>IEEE Paper Publication</span>
                </a>
              )}

              {project.liveDemoUrl && project.liveDemoUrl !== "#" && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/20 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Project Link</span>
                </a>
              )}
            </div>
          </div>

          {/* Screenshot Hero Banner */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Section 1: Overview */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" /> Executive Overview
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {project.overview}
            </p>
          </div>

          {/* Section 2: Architecture */}
          <div className="space-y-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" /> {project.architecture.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.architecture.description}
            </p>
            <div className="pt-2 space-y-2">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                Core Architectural Components
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.architecture.components.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 text-xs font-mono text-slate-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Workflow Pipeline */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-violet-400" /> End-to-End Execution Workflow
            </h2>
            <div className="space-y-2">
              {project.workflow.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-slate-300"
                >
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4 & 5: Dataset & Model Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dataset */}
            {project.dataset && (
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" /> Dataset & Corpus
                </h3>
                <p className="text-indigo-300 font-mono text-xs font-semibold">
                  {project.dataset.name}
                </p>
                <p className="text-slate-400 text-xs font-mono">
                  Size: {project.dataset.size}
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pt-1">
                  {project.dataset.description}
                </p>
              </div>
            )}

            {/* Model Specs */}
            {project.model && (
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-amber-400" /> Model Architecture Specs
                </h3>
                <div className="space-y-1.5 text-xs font-mono">
                  <p className="text-slate-300">
                    <span className="text-slate-500">Backbone:</span> {project.model.backbone}
                  </p>
                  <p className="text-slate-300">
                    <span className="text-slate-500">Hyperparameters:</span> {project.model.hyperparameters}
                  </p>
                  <p className="text-slate-300">
                    <span className="text-slate-500">Hardware:</span> {project.model.trainingHardware}
                  </p>
                  <p className="text-slate-300">
                    <span className="text-slate-500">Framework:</span> {project.model.framework}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 6: Key Results */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" /> Quantitative Benchmark Results
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.results.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-center"
                >
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {metric.value}
                  </div>
                  <div className="text-[11px] font-mono text-indigo-300 mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed p-4 rounded-xl bg-white/[0.02] border border-white/5">
              {project.results.summary}
            </p>
          </div>

          {/* Section 7 & 8: Challenges & Future Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" /> Engineering Challenges
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {project.challenges.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400">✕</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Future Roadmap
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {project.futureImprovements.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 9: Tech Stack Breakdown */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">Full Technology Stack</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.techStack.map((group, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2"
                >
                  <p className="text-xs font-mono text-indigo-400 font-semibold uppercase">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 10: Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h2 className="text-xl font-bold text-white">Related Case Studies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProjects.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProject && onSelectProject(rel)}
                    className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-indigo-400">
                        {rel.ribbon}
                      </span>
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                        {rel.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
