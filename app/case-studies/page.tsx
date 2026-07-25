import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { caseStudiesData } from "../data/caseStudiesData";
import { Cpu, ArrowRight, Layers, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Case Studies | Param Pandya",
  description:
    "Deep-dive system design trade-offs, architecture decisions, bottleneck post-mortems, and scaling learnings in production AI.",
  openGraph: {
    title: "Engineering Case Studies | Param Pandya",
    description:
      "Deep-dive system design trade-offs, architecture decisions, bottleneck post-mortems, and scaling learnings in production AI.",
    type: "website",
    url: "https://parampandya.vercel.app/case-studies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Case Studies | Param Pandya",
    description:
      "Deep-dive system design trade-offs, architecture decisions, bottleneck post-mortems, and scaling learnings in production AI.",
  },
};

export default function CaseStudiesPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header />

      {/* Hero Section */}
      <section className="pt-34 pb-10 px-4 sm:px-6 relative bg-radial-glow overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> SYSTEM ARCHITECTURE & TRADE-OFFS
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Engineering Case Studies
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed font-normal">
            Post-mortem style technical breakdowns explaining why systems were built, key design trade-offs (Latency vs. Accuracy, Spatial vs. Frequency, Guardrails vs. Retries), bottleneck fixes, and core takeaways.
          </p>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="container mx-auto max-w-5xl px-4 sm:px-6 pb-24 space-y-8">
        {caseStudiesData.map((study) => (
          <div
            key={study.slug}
            className="glass-card glass-card-hover rounded-3xl p-6 sm:p-10 border border-white/15 space-y-6 bg-slate-950/90 shadow-2xl relative overflow-hidden group"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
                {study.category}
              </span>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>{study.readTime}</span>
                <span>•</span>
                <span>{study.date}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                {study.title}
              </h2>
              <p className="text-indigo-300 font-mono text-xs sm:text-sm font-semibold">
                {study.subtitle}
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {study.whyItExists}
              </p>
            </div>

            {/* Preview of Design Decisions */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
                Key Design Trade-off Analyzed:
              </span>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-xs text-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-emerald-400 font-bold">CHOSEN: </span>
                  <span>{study.designDecisions[0].chosenOption}</span>
                </div>
                <div>
                  <span className="text-rose-400 font-bold">REJECTED: </span>
                  <span className="line-through opacity-70">{study.designDecisions[0].rejectedOption}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Link
                href={`/case-studies/${study.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 transition-all shadow-md shadow-indigo-500/20"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </main>
  );
}
