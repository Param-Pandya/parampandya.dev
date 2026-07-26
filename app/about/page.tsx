import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Brain,
  BookOpen,
  MapPin,
  GraduationCap,
} from "lucide-react";
import {
  whoIAmData,
  journeyData,
  personalStoryData,
  educationData,
} from "../data/aboutData";

export const metadata: Metadata = {
  title: "About Param Pandya | AI Engineer",
  description:
    "Explore Param Pandya's engineering background, education (M.Tech CSE - VIT, B.Tech - PDEU), IIT research internships, and machine learning focus.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Param Pandya | AI Engineer",
    description:
      "Explore Param Pandya's engineering background, education (M.Tech CSE - VIT, B.Tech - PDEU), IIT research internships, and machine learning focus.",
    type: "profile",
    url: "https://parampandya.dev/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Param Pandya | AI Engineer",
    description:
      "Explore Param Pandya's engineering background, education (M.Tech CSE - VIT, B.Tech - PDEU), IIT research internships, and machine learning focus.",
  },
};

export default function AboutPage(): React.JSX.Element {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Param Pandya | AI Engineer",
    "description": "Explore Param Pandya's engineering background, education (M.Tech CSE - VIT, B.Tech - PDEU), IIT research internships, and machine learning focus.",
    "url": "https://parampandya.dev/about"
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <Header />

      {/* Hero Header Section */}
      <section className="pt-34 pb-10 px-4 sm:px-6 relative bg-radial-glow overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono tracking-widest uppercase mb-4">
            <Brain className="w-3.5 h-3.5 text-cyan-400" /> ABOUT PARAM PANDYA
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Engineering & Education
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed font-normal">
            AI Engineer specializing in Machine Learning, RAG applications, AI Agents, and Computer Vision.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 space-y-20 pb-24">
        {/* SECTION 1: Who I Am */}
        <section id="who-i-am" className="space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Who I Am
            </h2>
            <Brain className="w-6 h-6 text-indigo-400 opacity-80 hidden sm:block" />
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/15 relative overflow-hidden bg-slate-950/90 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {whoIAmData.title}
                  </h3>
                  <p className="text-indigo-400 font-mono text-xs sm:text-sm font-semibold mt-1">
                    {whoIAmData.role}
                  </p>
                  <p className="text-slate-400 text-xs font-mono flex items-center gap-1.5 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    {whoIAmData.location}
                  </p>
                </div>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {whoIAmData.tagline}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
                    Technical Focus:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {whoIAmData.keySpecializations.map((spec, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-2.5"
                      >
                        <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-2 border-indigo-500/40 shadow-2xl group">
                  <Image
                    src="/assets/me-glow.png"
                    alt="Param Pandya Glow"
                    fill
                    className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <Image
                    src="/assets/me.png"
                    alt="Param Pandya Avatar"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="px-3 py-1 rounded-full bg-slate-950/90 border border-white/10 text-[10px] font-mono text-indigo-300 font-bold">
                      🟢 AI ENGINEER
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Education (Consolidated Here Only) */}
        <section id="education" className="space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Education
            </h2>
            <GraduationCap className="w-6 h-6 text-indigo-400 opacity-80 hidden sm:block" />
          </div>

          <div className="space-y-4">
            {educationData.map((edu, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-white/10 space-y-2 bg-slate-950/80"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-lg font-bold text-white tracking-tight">{edu.fieldOfStudy}</h3>
                  <span className="text-xs font-mono text-indigo-400 font-semibold">{edu.period}</span>
                </div>
                <p className="text-xs font-mono text-indigo-300 font-semibold">{edu.degree}</p>
                <p className="text-xs font-mono text-slate-300 font-medium">{edu.institution} — {edu.location}</p>
                <div className="text-slate-400 text-xs sm:text-sm leading-relaxed pt-1 space-y-1">
                  {edu.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Background & Journey */}
        <section id="personal-story" className="space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Background & Research Journey
            </h2>
            <BookOpen className="w-6 h-6 text-cyan-400 opacity-80 hidden sm:block" />
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
            {personalStoryData.storyParagraphs.map((para, idx) => (
              <p key={idx} className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* SECTION 4: Experience Timeline */}
        <section id="journey" className="space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Experience & Internships
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {journeyData.map((step) => (
              <div
                key={step.step}
                className="glass-card rounded-2xl p-5 border border-white/10 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                      {step.step}
                    </span>
                    <span className="text-slate-400">{step.period}</span>
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">{step.title}</h3>
                  <p className="text-cyan-400 font-mono text-xs font-semibold">{step.institution}</p>
                  <p className="text-slate-300 text-xs leading-relaxed">{step.description}</p>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono text-cyan-300 font-medium">
                    ★ {step.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
