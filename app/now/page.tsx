import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { nowData } from "../data/nowData";
import { Clock, MapPin, Zap, BookOpen, Target, Cpu, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "What I'm Doing Now (/now) | Param Pandya",
  description:
    "What Param Pandya is currently building, learning, reading, and aiming for in production AI engineering.",
  alternates: {
    canonical: "/now",
  },
  openGraph: {
    title: "What I'm Doing Now (/now) | Param Pandya",
    description:
      "A public snapshot of what Param Pandya is currently building, learning, reading, and working toward.",
    type: "website",
    url: "https://parampandya.dev/now",
    siteName: "Param Pandya | AI Research & Engineering",
    locale: "en_US",
    images: [
      {
        url: "/assets/me-about.jpg",
        width: 1200,
        height: 1200,
        alt: "Param Pandya Now Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What I'm Doing Now (/now) | Param Pandya",
    description:
      "A public snapshot of what Param Pandya is currently building, learning, reading, and working toward.",
    creator: "@parampandya",
    images: ["/assets/me-about.jpg"],
  },
};

export default function NowPage(): React.JSX.Element {
  const nowPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "What I'm Doing Now (/now) | Param Pandya",
    "description": "What Param Pandya is currently building, learning, reading, and aiming for in production AI engineering.",
    "url": "https://parampandya.dev/now"
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nowPageSchema) }}
      />
      <Header />

      {/* Hero Header */}
      <section className="pt-34 pb-10 px-4 sm:px-6 relative bg-radial-glow overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ACTIVE SNAPSHOT /NOW
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            What I&apos;m Doing Now
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed font-normal">
            Inspired by Derek Sivers&apos; <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">/now page movement</a>. A public snapshot of what I&apos;m currently building, learning, reading, and working toward.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> Updated: {nowData.lastUpdated}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {nowData.location}
            </span>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 space-y-16 pb-24">
        {/* 1. Currently Building */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-semibold">
                01 // In Production & Lab
              </span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                Currently Building
              </h2>
            </div>
            <Zap className="w-6 h-6 text-amber-400 opacity-80" />
          </div>

          <div className="space-y-4">
            {nowData.currentlyBuilding.map((item, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                  {item.link && (
                    <Link href={item.link} className="text-xs font-mono text-indigo-400 hover:underline flex items-center gap-1">
                      Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tech.map((t, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Currently Learning */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                02 // Expanding Technical Depth
              </span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                Currently Learning
              </h2>
            </div>
            <Cpu className="w-6 h-6 text-cyan-400 opacity-80" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nowData.currentlyLearning.map((item, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-5 border border-white/10 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-cyan-300 font-sans tracking-tight">{item.topic}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                </div>
                <div className="pt-2.5 border-t border-white/5 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Current Topics:</span>
                  <ul className="space-y-1 font-mono text-[10px] text-slate-400">
                    {item.currentTopics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Currently Reading */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                03 // Literature & Papers
              </span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                Currently Reading
              </h2>
            </div>
            <BookOpen className="w-6 h-6 text-emerald-400 opacity-80" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
            {nowData.currentlyReading.map((item, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
                <span className="text-[10px] text-emerald-400 font-bold uppercase">{item.category}</span>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                {item.author && <p className="text-slate-450 text-xs">By {item.author}</p>}
                <p className="text-slate-300 text-xs font-sans leading-relaxed pt-1 border-t border-white/5">
                  {item.takeaway}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Current Goals */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-rose-400 uppercase tracking-widest font-semibold">
                04 // Target Milestones
              </span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                Current Goals
              </h2>
            </div>
            <Target className="w-6 h-6 text-rose-400 opacity-80" />
          </div>

          <div className="space-y-3">
            {nowData.currentGoals.map((g, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 font-sans">
                <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-2 font-mono text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="font-bold text-white text-sm">{g.goal}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-[11px] whitespace-nowrap">
                    <span>{g.timeframe}</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-bold">{g.status}</span>
                  </div>
                </div>
                <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">{g.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
