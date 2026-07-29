import type { Metadata } from "next";
import Link from "next/link";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import { GithubIcon, LinkedinIcon } from "./components/SocialIcons";
import { projectsData } from "./data/projectsData";
import { publications } from "./data/researchData";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Brain,
  Eye,
  Cpu,
  Mail,
  Download,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Param Pandya | AI Engineer • Machine Learning Engineer",
  description:
    "AI Engineer specializing in Machine Learning, RAG applications, AI Agents, and Computer Vision. Published IEEE researcher with research experience at IIT Indore and IIT Jammu.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Param Pandya | AI Engineer • Machine Learning Engineer",
    description:
      "AI Engineer specializing in Machine Learning, RAG applications, AI Agents, and Computer Vision. Published IEEE researcher with research experience at IIT Indore and IIT Jammu.",
    type: "website",
    url: "https://parampandya.dev",
    siteName: "Param Pandya | AI Research & Engineering",
    locale: "en_US",
    images: [
      {
        url: "/assets/me-about.jpg",
        width: 1200,
        height: 1200,
        alt: "Param Pandya AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Param Pandya | AI Engineer • Machine Learning Engineer",
    description:
      "AI Engineer specializing in Machine Learning, RAG applications, AI Agents, and Computer Vision. Published IEEE researcher with research experience at IIT Indore and IIT Jammu.",
    creator: "@parampandya",
    images: ["/assets/me-about.jpg"],
  },
};

const RESUME_URL = "https://drive.google.com/file/d/1SaLjcokhsq6WCEQ0AS00xRqmCiDAW9Cg/view?usp=sharing";

export default function Home(): React.JSX.Element {
  const featuredProjects = projectsData.slice(0, 3);
  const ieeePaper = publications[0];

  const focusCards = [
    {
      id: "rag",
      icon: Brain,
      title: "RAG & LLM Applications",
      description:
        "Building retrieval-augmented generation applications using vector databases and open-source LLMs.",
      iconColor: "text-indigo-400",
    },
    {
      id: "agents",
      icon: Bot,
      title: "AI Agents & Multi-Agent Systems",
      description:
        "Developing autonomous agent workflows using Model Context Protocol (MCP) and multi-agent orchestration.",
      iconColor: "text-cyan-400",
    },
    {
      id: "vision",
      icon: Eye,
      title: "Computer Vision",
      description:
        "Designing deepfake detection pipelines and computer vision models for image and video analysis.",
      iconColor: "text-violet-400",
    },
    {
      id: "deployment",
      icon: Cpu,
      title: "AI Engineering & Deployment",
      description:
        "Packaging machine learning models and AI applications using FastAPI, Docker, and structured pipelines.",
      iconColor: "text-emerald-400",
    },
  ];

  const experienceList = [
    {
      role: "Software Development Instructor",
      company: "NxtWave Disruptive Technologies Private Limited",
      period: "Apr 2026 – Jun 2026",
      summary: "Mentored learners in Python, Machine Learning, SQL, and Generative AI while building and debugging AI applications.",
    },
    {
      role: "Research Intern",
      company: "Indian Institute of Technology Jammu",
      period: "May 2023 – Jul 2023",
      summary: "Developed TensorFlow-based biometric models, reducing adversarial attack success by 40% using FGSM/PGD benchmarking.",
    },
    {
      role: "Machine Learning Intern",
      company: "Upskillz.in",
      period: "Aug 2022 – Oct 2022",
      summary: "Developed a personalized recommender system using Python and Apache Mahout, improving engagement by 16%.",
    },
    {
      role: "Research Intern",
      company: "Indian Institute of Technology Indore",
      period: "May 2022 – Jul 2022",
      summary: "Designed FGSM and PGD defense pipelines, improving neural model robustness against adversarial attacks by 25–30%.",
    },
  ];

  const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Param Pandya | AI Engineer • Machine Learning Engineer",
    "description": "AI Engineer specializing in Machine Learning, RAG applications, AI Agents, and Computer Vision. Published IEEE researcher with research experience at IIT Indore and IIT Jammu.",
    "url": "https://parampandya.dev"
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <Header />

      {/* 1. HERO SECTION */}
      <Banner />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 space-y-20 py-12">
        {/* 2. CURRENT FOCUS */}
        <section id="current-focus" className="space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Current Focus
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              The AI technologies and engineering domains I am actively building and exploring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {focusCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.id}
                  className="glass-card rounded-2xl p-6 border border-white/10 bg-slate-950/80 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                      <IconComponent className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. FEATURED PROJECTS */}
        <section id="projects-summary" className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-xs font-mono text-[#FFEDA8] hover:text-indigo-300 font-semibold"
            >
              <span>All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold">
                      {project.ribbon}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-slate-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-indigo-300 transition-colors"
                  >
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. EXPERIENCE */}
        <section id="experience-summary" className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Experience
            </h2>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-xs font-mono text-[#FFEDA8] hover:text-cyan-300 font-semibold"
            >
              <span>Full About</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {experienceList.map((exp, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">{exp.company}</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{exp.summary}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap self-start sm:self-center">
                  {exp.period}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. RESEARCH (No Resume links/buttons in this section) */}
        <section id="research-summary" className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Research
            </h2>
            <Link
              href="/research"
              className="inline-flex items-center gap-1 text-xs font-mono text-[#FFEDA8] hover:text-violet-300 font-semibold"
            >
              <span>Research Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/10 bg-slate-950/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono font-bold">
                IEEE Published Paper (2024)
              </span>
              <span className="text-xs font-mono text-slate-400">Document ID: 10872263</span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {ieeePaper.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Researched deepfake detection methods for media forensics utilizing XceptionNet and InceptionResNetV2 models. Explored reinforcement learning policies (DQN/PPO) to optimize training data augmentation and enhance cross-dataset generalization.
              </p>
            </div>

            <div className="pt-1 flex flex-wrap gap-3 items-center">
              <a
                href={ieeePaper.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
              >
                <span>IEEE Xplore Document</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* 6. ARTICLES & OPEN SOURCE PREVIEW (Temporarily Coming Soon) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Articles */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-xl font-bold text-white tracking-tight">Technical Writing</h3>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-white/10 text-center">
              <p className="text-slate-400 text-xs font-mono">
                Technical Writing – Coming Soon
              </p>
            </div>
          </section>

          {/* Open Source */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-xl font-bold text-white tracking-tight">Open Source</h3>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-white/10 text-center">
              <p className="text-slate-400 text-xs font-mono">
                Open Source – Coming Soon
              </p>
            </div>
          </section>
        </div>

        {/* 7. GET IN TOUCH SECTION */}
        <section id="contact-cta" className="glass-card rounded-2xl p-8 border border-white/15 bg-slate-950/90 text-center space-y-5 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Get in Touch
          </h2>

          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Interested in working together or discussing AI engineering opportunities? Feel free to reach out via email.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-mono">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="mailto:pandyaparam7@gmail.com"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-bold text-slate-200 glass-card hover:bg-white/10 border border-white/20 transition-all active:scale-95"
            >
              <Mail className="w-4 h-4 text-indigo-300" />
              <span>Email</span>
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
