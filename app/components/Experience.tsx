"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Code2,
  ExternalLink,
  CheckCircle2,
  Layers,
  FileCheck2,
} from "lucide-react";

export type TimelineCategory =
  | "all"
  | "education"
  | "internships"
  | "research"
  | "projects"
  | "milestones"
  | "certifications";

export interface TimelineNode {
  id: string;
  category: TimelineCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  location?: string;
  period: string;
  shortSummary: string;
  highlights: string[];
  expandedDetails: {
    overview: string;
    metrics?: Array<{ label: string; value: string }>;
    codeSnippet?: string;
    technologies: string[];
    actionLink?: { label: string; url: string };
  };
  badgeColor: string;
}

const timelineData: TimelineNode[] = [
  {
    id: "ieee-publication-2024",
    category: "research",
    categoryLabel: "Research Publication",
    title: "Published IEEE Conference Research Paper",
    subtitle: "IEEE Xplore International Conference",
    location: "IEEE Xplore (Doc ID: 10872263)",
    period: "2024",
    shortSummary:
      "Authored and published 'Efficient Deepfake Detection using AI' in IEEE Xplore, introducing spatial-frequency dual-stream neural detection.",
    highlights: [
      "Published in IEEE Xplore Index",
      "96.4% detection accuracy on uncompressed media",
      "Robust under heavy lossy video compression",
    ],
    expandedDetails: {
      overview:
        "Engineered a novel dual-stream architecture combining spatial ResNet-50 features with frequency-domain Discrete Cosine Transform (DCT) maps to detect synthetic facial manipulations across lossy web video streams.",
      metrics: [
        { label: "Uncompressed Acc.", value: "96.4%" },
        { label: "Lossy H.264 Acc.", value: "91.2%" },
        { label: "Inference Speed", value: "42 FPS" },
      ],
      codeSnippet: "# IEEE Spatial-Frequency Fusion\nspatial_feats = resnet_backbone(face_crops)\nfreq_feats = dct_spectral_analyzer(face_crops)\nfused = attention_fusion(spatial_feats, freq_feats)\nprediction = classifier(fused)",
      technologies: ["PyTorch", "OpenCV", "ResNet-50", "DCT Spectral Analysis", "IEEE 2024"],
      actionLink: { label: "View on IEEE Xplore", url: "https://ieeexplore.ieee.org/document/10872263" },
    },
    badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
  },
  {
    id: "iit-jammu-2023",
    category: "internships",
    categoryLabel: "Academic Internship",
    title: "IIT Jammu — Machine Learning Research Intern",
    subtitle: "Indian Institute of Technology Jammu",
    location: "Jammu, India",
    period: "May 2023 – July 2023",
    shortSummary:
      "Developed research-oriented computer vision & deep learning neural network pipelines with benchmark ablation testing.",
    highlights: [
      "Engineered custom PyTorch & TensorFlow deep learning models",
      "Implemented OpenCV image preprocessing & feature extraction",
      "Formulated experimental validation methodologies for CV tasks",
    ],
    expandedDetails: {
      overview:
        "Worked alongside premier academic faculty at IIT Jammu on deep neural network optimization, benchmark validation datasets, and ablation studies for real-world computer vision deployment.",
      metrics: [
        { label: "Institution", value: "IIT Jammu" },
        { label: "Domain", value: "Deep Learning" },
        { label: "Focus", value: "Computer Vision" },
      ],
      technologies: ["Python", "PyTorch", "TensorFlow", "OpenCV", "NumPy", "Scikit-Learn"],
    },
    badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  },
  {
    id: "biogpt-nlp-2024",
    category: "projects",
    categoryLabel: "Healthcare AI Project",
    title: "BioGPT Clinical Prescription Generation System",
    subtitle: "Healthcare AI & Clinical NLP",
    period: "2024",
    shortSummary:
      "Domain adaptation of Microsoft BioGPT for automated medical prescription synthesis integrated with SNOMED CT and FDA safety rules.",
    highlights: [
      "Fine-tuned BioGPT-large for medical dialogue",
      "Strict enforcement of SNOMED CT medical vocabulary",
      "0% contraindication hallucination rate under FDA validation",
    ],
    expandedDetails: {
      overview:
        "Eliminated generative language model hallucination risks in clinical healthcare by adding SNOMED CT concept mapping and real-time FDA API drug interaction verification.",
      metrics: [
        { label: "SNOMED Acc.", value: "99.1%" },
        { label: "Contraindication", value: "0.0%" },
        { label: "ROUGE-L Score", value: "0.84" },
      ],
      technologies: ["BioGPT", "Hugging Face", "SNOMED CT", "FDA API", "PyTorch"],
      actionLink: { label: "View Case Study", url: "/#projects" },
    },
    badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "iit-indore-2022",
    category: "internships",
    categoryLabel: "Academic Internship",
    title: "IIT Indore — AI/ML Research Intern",
    subtitle: "Indian Institute of Technology Indore",
    location: "Indore, India",
    period: "May 2022 – July 2022",
    shortSummary:
      "Conducted foundational AI/ML research with statistical exploratory data analysis and feature engineering workflows.",
    highlights: [
      "Designed advanced feature engineering scripts",
      "Built statistical EDA workflows on complex datasets",
      "Drafted reproducible academic research documentation",
    ],
    expandedDetails: {
      overview:
        "Focused on data preprocessing, feature selection algorithms, and statistical model evaluation at IIT Indore, establishing rigorous academic research benchmarks.",
      metrics: [
        { label: "Institution", value: "IIT Indore" },
        { label: "Focus", value: "Feature Eng." },
      ],
      technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    },
    badgeColor: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  },
  {
    id: "pneustack-2023",
    category: "projects",
    categoryLabel: "Computer Vision Project",
    title: "PneuSTACK: Pneumonia Diagnostic Stacking Framework",
    subtitle: "Medical Imaging & Stacking Ensembles",
    period: "2023",
    shortSummary:
      "Multi-class pneumonia detection combining CNN base models, Vision Transformers (ViT), and XGBoost meta-learners.",
    highlights: [
      "Novel perspective-distortion data augmentation",
      "Stacking meta-learner combining CNNs + XGBoost",
      "0.978 multi-class ROC-AUC diagnostic accuracy",
    ],
    expandedDetails: {
      overview:
        "Designed a multi-tier stacking ensemble to diagnose bacterial vs viral pneumonia from chest X-rays, outperforming standalone CNN baselines by 4.3%.",
      metrics: [
        { label: "ROC-AUC", value: "0.978" },
        { label: "Accuracy Gain", value: "+4.3%" },
      ],
      technologies: ["Vision Transformers", "PyTorch", "XGBoost", "ResNet-50", "OpenCV"],
      actionLink: { label: "View Framework", url: "/#projects" },
    },
    badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
  {
    id: "education-btech",
    category: "education",
    categoryLabel: "Academic Degree",
    title: "B.Tech in Computer Science & Engineering",
    subtitle: "Artificial Intelligence & Machine Learning Specialization",
    period: "2020 – 2024",
    shortSummary:
      "Graduated with strong academic standing, specializing in deep learning, probability, linear algebra, and software systems.",
    highlights: [
      "Specialized in Artificial Intelligence & Machine Learning",
      "Published IEEE paper as part of undergraduate research thesis",
      "Selected for dual IIT research internships (Jammu & Indore)",
    ],
    expandedDetails: {
      overview:
        "Comprehensive computer science curriculum with advanced coursework in Neural Networks, Natural Language Processing, Computer Vision, Algorithms, and Distributed Systems.",
      metrics: [
        { label: "Degree", value: "B.Tech CSE" },
        { label: "Focus", value: "AI & ML" },
      ],
      technologies: ["Deep Learning", "Mathematics for ML", "Algorithms", "Systems Architecture"],
    },
    badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  },
  {
    id: "upskillz-2022",
    category: "internships",
    categoryLabel: "Industry Internship",
    title: "upskillz.in — Data Analyst (ML) Intern",
    subtitle: "Data Analytics & Machine Learning",
    location: "Remote",
    period: "Aug 2022 – Oct 2022",
    shortSummary:
      "Applied machine learning algorithms for automated data cleaning, predictive modeling, and SQL database pipelines.",
    highlights: [
      "Built SQL & Pandas automated ETL data pipelines",
      "Trained predictive regression & classification baselines",
    ],
    expandedDetails: {
      overview:
        "Delivered production analytical scripts for enterprise dataset cleaning, outlier mitigation, and predictive forecasting.",
      metrics: [
        { label: "Role", value: "ML Analyst" },
        { label: "Domain", value: "Analytics" },
      ],
      technologies: ["Python", "Pandas", "SQL", "Scikit-Learn", "Jupyter Notebook"],
    },
    badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/30",
  },
  {
    id: "cert-pytorch-2023",
    category: "certifications",
    categoryLabel: "Professional Certification",
    title: "PyTorch Deep Learning & Vision Specialist",
    subtitle: "Deep Learning Institute & PyTorch Ecosystem",
    period: "2023",
    shortSummary:
      "Advanced certification in PyTorch neural network design, custom autograd operators, CUDA acceleration, and Torchvision models.",
    highlights: [
      "Custom autograd operators & loss functions",
      "Multi-GPU CUDA distributed data parallel training",
    ],
    expandedDetails: {
      overview:
        "Mastered advanced PyTorch workflows including mixed-precision FP16 training, TorchScript export, and model optimization.",
      metrics: [{ label: "Certification", value: "Verified" }],
      technologies: ["PyTorch", "CUDA", "Torchvision", "Distributed Training"],
    },
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  },
  {
    id: "cert-genai-2024",
    category: "certifications",
    categoryLabel: "Professional Certification",
    title: "Generative AI & LLM Fine-Tuning Specialist",
    subtitle: "Foundation Models & Hugging Face",
    period: "2024",
    shortSummary:
      "Certified in parameter-efficient fine-tuning (LoRA, QLoRA), RAG vector index building, and open-source LLM optimization.",
    highlights: [
      "LoRA & QLoRA parameter-efficient fine-tuning",
      "Vector database retrieval augmented generation (RAG)",
    ],
    expandedDetails: {
      overview:
        "Validated expertise in adapting Llama 3, BioGPT, and Mistral models for specialized enterprise QA tasks.",
      metrics: [{ label: "Certification", value: "Verified" }],
      technologies: ["Hugging Face", "LoRA", "RAG", "LangChain", "Vector DBs"],
    },
    badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  },
  {
    id: "milestone-iit-dual",
    category: "milestones",
    categoryLabel: "Research Milestone",
    title: "Dual IIT Research Selection Milestone",
    subtitle: "IIT Jammu & IIT Indore Academic Recognition",
    period: "2022 – 2023",
    shortSummary:
      "Selected for back-to-back competitive research internships at Indian Institutes of Technology (IIT Jammu & IIT Indore).",
    highlights: [
      "Selected from thousands of academic applicants nationwide",
      "Contributed to published media forensics and ML research",
    ],
    expandedDetails: {
      overview:
        "Achieved national academic recognition by securing research positions across two premier Indian Institutes of Technology.",
      metrics: [{ label: "Selection", value: "Dual IIT" }],
      technologies: ["Academic Research", "Peer Collaboration", "Experimental AI"],
    },
    badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
];

export default function Experience(): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<TimelineCategory>("all");
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    "ieee-publication-2024": true, // Default expanded for highlight
  });
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredData = timelineData.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  // Toggle node expansion on click
  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Scroll-Spy: detect which node is in the center of the viewport
  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let currentActiveId: string | null = null;
      let minDistance = Infinity;

      Object.entries(nodeRefs.current).forEach(([id, el]) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - elementCenter);

        if (distance < minDistance && rect.top < window.innerHeight && rect.bottom > 0) {
          minDistance = distance;
          currentActiveId = id;
        }
      });

      if (currentActiveId) {
        setActiveNodeId(currentActiveId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredData]);

  const categories: Array<{ id: TimelineCategory; label: string }> = [
    { id: "all", label: "All Milestones" },
    { id: "research", label: "Research" },
    { id: "internships", label: "Internships" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "milestones", label: "Milestones" },
    { id: "certifications", label: "Certifications" },
  ];

  return (
    <section id="experience" className="py-28 px-4 sm:px-6 relative bg-grid-pattern">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header Tag */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-mono tracking-widest uppercase mb-4">
            <GraduationCap className="w-3.5 h-3.5" /> 02 // Interactive Career & Research Timeline
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Journey & Key Milestones
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Click any timeline node to expand technical breakdowns, metrics, code snippets, and research publications.
          </p>

          {/* Category Filter Pills Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-slate-100/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 max-w-4xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 font-semibold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Interactive Timeline */}
        <div className="relative max-w-4xl mx-auto pl-4 sm:pl-10">
          {/* Vertical Connecting Glow Line */}
          <div className="absolute left-4 sm:left-10 top-6 bottom-6 w-0.5 bg-gradient-to-b from-indigo-500 via-violet-500/50 to-transparent"></div>

          <div className="space-y-8">
            {filteredData.map((node) => {
              const isExpanded = !!expandedNodes[node.id];
              const isActive = activeNodeId === node.id;

              return (
                <div
                  key={node.id}
                  ref={(el) => {
                    nodeRefs.current[node.id] = el;
                  }}
                  className="relative pl-8 sm:pl-12 group transition-all duration-300"
                >
                  {/* Timeline Dot Node (Expands & Glows on Active Scroll) */}
                  <button
                    onClick={() => toggleNode(node.id)}
                    className={`absolute left-[-5px] sm:left-[31px] top-4 w-5 h-5 rounded-full bg-white dark:bg-slate-950 border-2 transition-all duration-300 cursor-pointer flex items-center justify-center ${
                      isActive
                        ? "border-cyan-400 ring-4 ring-indigo-500/50 scale-125 shadow-lg shadow-cyan-500/50"
                        : "border-indigo-400 group-hover:border-cyan-400 group-hover:scale-110"
                    }`}
                    aria-label={`Toggle timeline node ${node.title}`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isActive ? "bg-cyan-400" : "bg-indigo-400"
                      }`}
                    ></div>
                  </button>

                  {/* Main Expandable Card */}
                  <div
                    className={`glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border relative overflow-hidden transition-all duration-300 ${
                      isActive
                        ? "border-indigo-500/50 shadow-2xl shadow-indigo-950/5 dark:shadow-indigo-950/30 bg-slate-50/95 dark:bg-slate-950/90"
                        : "border-slate-200 dark:border-white/10"
                    }`}
                  >
                    {/* Header: Badge, Period & Click to Toggle */}
                    <div
                      onClick={() => toggleNode(node.id)}
                      className="cursor-pointer space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${node.badgeColor}`}
                        >
                          {node.categoryLabel}
                        </span>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                            {node.period}
                          </span>

                          <button
                            className="p-1 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-all"
                            aria-label="Expand details"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors">
                          {node.title}
                        </h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm sm:text-base flex items-center gap-2 mt-0.5">
                          <span>{node.subtitle}</span>
                          {node.location && (
                            <span className="text-slate-500 text-xs font-normal flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" /> {node.location}
                            </span>
                          )}
                        </p>
                      </div>

                      {/* Short Summary */}
                      <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                        {node.shortSummary}
                      </p>

                      {/* Highlights Bullets */}
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        {node.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="text-indigo-500 dark:text-indigo-400 mt-1">▸</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* EXPANDED CONTENT (Shown when clicked) */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                        {/* Extended Overview */}
                        <div className="p-4 rounded-2xl bg-slate-100/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-1">
                          <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-semibold">
                            Extended Technical Breakdown
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                            {node.expandedDetails.overview}
                          </p>
                        </div>

                        {/* Quantitative Metrics (if available) */}
                        {node.expandedDetails.metrics && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {node.expandedDetails.metrics.map((m, mIdx) => (
                              <div
                                key={mIdx}
                                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/5 text-center"
                              >
                                <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono">
                                  {m.value}
                                </div>
                                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                                  {m.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Code Snippet (if available) */}
                        {node.expandedDetails.codeSnippet && (
                          <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-indigo-200 border border-slate-200 dark:border-white/10 overflow-x-auto">
                            <p className="text-slate-500 mb-1">// Technical Implementation</p>
                            <pre className="whitespace-pre">{node.expandedDetails.codeSnippet}</pre>
                          </div>
                        )}

                        {/* Technologies Pills */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1">
                            <Code2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> Stack & Focus:
                          </span>
                          {node.expandedDetails.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-500/20 text-xs font-mono text-indigo-700 dark:text-indigo-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action Link Button */}
                        {node.expandedDetails.actionLink && (
                          <div className="pt-2">
                            <Link
                              href={node.expandedDetails.actionLink.url}
                              target={node.expandedDetails.actionLink.url.startsWith("http") ? "_blank" : "_self"}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all active:scale-95"
                            >
                              <span>{node.expandedDetails.actionLink.label}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}



