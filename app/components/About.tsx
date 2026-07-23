"use client";

import Link from "next/link";
import {
  Sparkles,
  Cpu,
  Eye,
  Layers,
  Bot,
  BarChart3,
  ArrowUpRight,
  Brain,
} from "lucide-react";

interface ExpertiseCard {
  id: string;
  title: string;
  icon: React.ElementType;
  glowColor: string;
  iconColor: string;
  borderColor: string;
  description: string;
  technologies: string[];
  projectLink: string;
  projectLabel: string;
}

const expertiseCards: ExpertiseCard[] = [
  {
    id: "genai",
    title: "Generative AI",
    icon: Sparkles,
    glowColor: "from-cyan-500/20 via-blue-500/10 to-transparent",
    iconColor: "text-cyan-400",
    borderColor: "group-hover:border-cyan-500/40",
    description:
      "Fine-tuning domain-specific foundation models (BioGPT), integrating SNOMED CT clinical terminology, and enforcing FDA safety constraints for medical generation.",
    technologies: ["BioGPT", "Transformers", "SNOMED CT", "Prompt Eng.", "Diffusers"],
    projectLink: "#projects",
    projectLabel: "View BioGPT Project",
  },
  {
    id: "ml",
    title: "Machine Learning",
    icon: Cpu,
    glowColor: "from-indigo-500/20 via-violet-500/10 to-transparent",
    iconColor: "text-indigo-400",
    borderColor: "group-hover:border-indigo-500/40",
    description:
      "End-to-end ML engineering from exploratory data analysis and feature engineering to stacking ensembles, meta-learners, and rigorous model evaluation.",
    technologies: ["Scikit-Learn", "XGBoost", "Stacking Ensembles", "Pandas", "NumPy"],
    projectLink: "#projects",
    projectLabel: "View ML Stacking Framework",
  },
  {
    id: "cv",
    title: "Computer Vision",
    icon: Eye,
    glowColor: "from-violet-500/20 via-purple-500/10 to-transparent",
    iconColor: "text-violet-400",
    borderColor: "group-hover:border-violet-500/40",
    description:
      "Deepfake detection in media forensics published in IEEE Xplore 2024, facial artifact feature extraction, Vision Transformers (ViT), and chest X-ray diagnosis.",
    technologies: ["OpenCV", "Vision Transformers (ViT)", "CNNs", "Deepfake AI", "PyTorch"],
    projectLink: "#projects",
    projectLabel: "View IEEE Deepfake Research",
  },
  {
    id: "dl",
    title: "Deep Learning",
    icon: Layers,
    glowColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
    iconColor: "text-emerald-400",
    borderColor: "group-hover:border-emerald-500/40",
    description:
      "Designing multi-layered neural architectures, loss function optimization, novel perspective-distortion data augmentation, and benchmark evaluation.",
    technologies: ["PyTorch", "TensorFlow", "CUDA", "Loss Optimization", "ResNet"],
    projectLink: "#projects",
    projectLabel: "View PneuSTACK DL Framework",
  },
  {
    id: "llm",
    title: "Large Language Models",
    icon: Bot,
    glowColor: "from-amber-500/20 via-orange-500/10 to-transparent",
    iconColor: "text-amber-400",
    borderColor: "group-hover:border-amber-500/40",
    description:
      "Specialized domain adaptation of open-source LLMs, RAG pipeline construction, prompt architecture, vector database indexing, and hallucination reduction.",
    technologies: ["LLM Fine-Tuning", "RAG Pipelines", "Hugging Face", "Vector DBs", "LangChain"],
    projectLink: "#projects",
    projectLabel: "View Clinical LLM System",
  },
  {
    id: "analytics",
    title: "Data Analytics",
    icon: BarChart3,
    glowColor: "from-rose-500/20 via-pink-500/10 to-transparent",
    iconColor: "text-rose-400",
    borderColor: "group-hover:border-rose-500/40",
    description:
      "Statistical modeling, hypothesis testing, predictive analytics, automated outlier removal, and data preprocessing pipelines on real-world datasets.",
    technologies: ["SQL", "Pandas", "Matplotlib", "Seaborn", "Jupyter", "EDA Pipelines"],
    projectLink: "#projects",
    projectLabel: "View Analytics Experience",
  },
];

export default function About(): React.JSX.Element {
  return (
    <section id="about" className="py-28 px-4 sm:px-6 relative bg-radial-glow">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header Tag */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Brain className="w-3.5 h-3.5" /> 01 // Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Expertise & Specializations
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Architecting production-grade machine learning systems, foundation models, and computer vision pipelines.
          </p>

          <div className="mt-6">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Read Full Research Vision & Mission (9 Sections)</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>


        {/* 6 Apple Product Style Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {expertiseCards.map((card) => {
            const IconComp = card.icon;

            return (
              <div
                key={card.id}
                className={`glass-card glass-card-hover rounded-3xl p-7 border border-slate-200 dark:border-white/10 flex flex-col justify-between relative overflow-hidden group shadow-xl transition-all duration-300 hover:-translate-y-1.5 ${card.borderColor}`}
              >
                {/* Apple Spotlight Background Glow */}
                <div
                  className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${card.glowColor} blur-3xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`}
                ></div>

                <div>
                  {/* Card Header: Icon & Title */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100/80 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <IconComp className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-650 dark:group-hover:text-indigo-200 transition-colors">
                        {card.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Domain Capability
                      </span>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div>
                  {/* Key Technologies Pills */}
                  <div className="pt-4 border-t border-slate-150 dark:border-white/5 flex flex-wrap gap-2 mb-5">
                    {card.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-250 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300 group-hover:border-slate-300 dark:group-hover:border-white/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link to Related Projects */}
                  <Link
                    href={card.projectLink}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-650 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 font-medium tracking-wide transition-colors"
                  >
                    <span>{card.projectLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



