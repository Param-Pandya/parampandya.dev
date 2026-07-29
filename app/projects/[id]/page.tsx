import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { GithubIcon } from "../../components/SocialIcons";
import { projectsData, getProjectById } from "../../data/projectsData";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
  FileText,
  Workflow,
  Zap,
  TrendingUp,
} from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectById(resolvedParams.id);
  if (!project) {
    return {
      title: "Project Not Found | Param Pandya",
    };
  }
  return {
    title: `${project.title} | Engineering Case Study`,
    description: project.shortDescription,
    alternates: {
      canonical: `/projects/${resolvedParams.id}`,
    },
    openGraph: {
      title: `${project.title} | Engineering Case Study`,
      description: project.shortDescription,
      type: "website",
      url: `https://parampandya.dev/projects/${resolvedParams.id}`,
      siteName: "Param Pandya | AI Research & Engineering",
      locale: "en_US",
      images: [
        {
          url: project.thumbnail,
          alt: project.title,
        },
      ],
    },
    authors: [{ name: "Param Pandya", url: "https://parampandya.dev" }],
    creator: "Param Pandya",
    publisher: "Param Pandya",
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Engineering Case Study`,
      description: project.shortDescription,
      creator: "@parampandya",
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  const relatedProjects = project.relatedProjectIds
    .map((id) => getProjectById(id))
    .filter((p): p is typeof project => p !== undefined);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": project.title,
    "description": project.shortDescription,
    "image": project.thumbnail,
    "codeRepository": project.githubUrl,
    "programmingLanguage": project.technologies.join(", "),
    "author": {
      "@type": "Person",
      "name": "Param Pandya",
      "url": "https://parampandya.dev"
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <Header />

      {/* Header Breadcrumb & Banner */}
      <section className="pt-34 pb-10 px-4 sm:px-6 relative bg-radial-glow overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

        <div className="container mx-auto max-w-4xl relative z-10 space-y-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Engineering Projects
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${project.ribbonColor}`}>
              {project.ribbon}
            </span>
            <span className="text-xs font-mono text-slate-400 border border-white/10 px-3 py-0.5 rounded-full">
              {project.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25"
            >
              <GithubIcon className="w-4 h-4" /> View GitHub Code
            </a>
            {project.paperUrl && (
              <a
                href={project.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono text-slate-200 glass-card hover:bg-white/10 transition-all"
              >
                <FileText className="w-4 h-4 text-cyan-400" /> Read IEEE Paper
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Sections (Mini-Engineering Blog Layout) */}
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 space-y-16 pb-24">
        {/* Key Benchmark Metrics Bar */}
        <section className="glass-card rounded-3xl p-6 border border-white/15 bg-slate-950/80">
          <h2 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest mb-4">
            Benchmark Results & Metrics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.results.metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                <div className="text-xs font-mono text-slate-400">{m.label}</div>
                <div className="text-2xl font-extrabold text-white font-mono mt-1">{m.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 1: Overview */}
        <section className="space-y-4">
          <div className="border-b border-white/10 pb-2 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">01 // Overview</h2>
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-slate-300 text-base leading-relaxed">{project.overview}</p>
        </section>

        {/* SECTION 2: Problem Statement */}
        <section className="space-y-4">
          <div className="border-b border-white/10 pb-2 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">02 // The Problem</h2>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div className="glass-card rounded-2xl p-6 border border-amber-500/20 bg-amber-500/5 text-slate-300 text-base leading-relaxed">
            {project.problem}
          </div>
        </section>

        {/* SECTION 3: System Architecture */}
        <section className="space-y-4">
          <div className="border-b border-white/10 pb-2 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">03 // System Architecture</h2>
            <Cpu className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                {project.architecture.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.architecture.description}
              </p>
            </div>

            {project.architecture.diagramSnippet && (
              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 font-mono text-xs text-indigo-300 overflow-x-auto">
                <span className="text-slate-500 font-bold block mb-1">ARCHITECTURAL DATA FLOW:</span>
                {project.architecture.diagramSnippet}
              </div>
            )}

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
                Architecture Components:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.architecture.components.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono text-slate-200 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Implementation Details */}
        <section className="space-y-4">
          <div className="border-b border-white/10 pb-2 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">04 // Implementation</h2>
            <Layers className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-slate-300 text-base leading-relaxed">{project.implementation}</p>
        </section>

        {/* SECTION 5: Execution Workflow */}
        <section className="space-y-4">
          <div className="border-b border-white/10 pb-2 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">05 // Execution Workflow</h2>
            <Workflow className="w-5 h-5 text-violet-400" />
          </div>

          <div className="space-y-3">
            {project.workflow.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-xs text-slate-200 flex items-center gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 flex items-center justify-center font-bold text-[10px]">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: Technology Stack */}
        <section className="space-y-4">
          <div className="border-b border-white/10 pb-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">06 // Technology Stack</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.techStack.map((group, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                <h3 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-xs font-mono text-slate-300 border border-white/5"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: Engineering Challenges & Solutions */}
        <section className="space-y-4">
          <div className="border-b border-white/10 pb-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">07 // Technical Challenges</h2>
          </div>

          <div className="space-y-3">
            {project.challenges.map((c, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-sm text-slate-300 flex items-start gap-3">
                <span className="text-rose-400 font-mono font-bold">⚠️</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 8: Lessons Learned & Future Work */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="glass-card rounded-3xl p-6 border border-white/10 space-y-3">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" /> Lessons Learned
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              {project.lessonsLearned.map((lesson, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="glass-card rounded-3xl p-6 border border-white/10 space-y-3">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" /> Future Improvements
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              {project.futureImprovements.map((imp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* SECTION 9: Related Engineering Projects */}
        {relatedProjects.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-white/10">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/projects/${rel.id}`}
                  className="glass-card rounded-2xl p-5 border border-white/10 hover:border-indigo-500/40 transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400">{rel.category}</span>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {rel.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
