export interface OpenSourceRepo {
  name: string;
  repoUrl: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  isPinned: boolean;
  category: "Repository" | "Contribution" | "Tool";
  highlights: string[];
}

export interface OSSContribution {
  project: string;
  projectUrl: string;
  prUrl: string;
  title: string;
  description: string;
  status: "Merged" | "Open" | "Maintained";
  date: string;
}

export const openSourceData = {
  stats: {
    totalStars: "60+",
    totalCommits: "850+",
    repositories: "18+",
    contributions: "12+",
    primaryLanguages: ["Python", "TypeScript", "C++", "PyTorch", "CUDA"],
  },
  pinnedRepos: [
    {
      name: "Efficient-Deepfake-Detection",
      repoUrl: "https://github.com/Param-Pandya",
      description: "IEEE 2024 Published dual-stream spatial-frequency PyTorch pipeline for compressed video deepfake detection.",
      language: "Python / PyTorch",
      languageColor: "#3572A5",
      stars: 34,
      forks: 12,
      isPinned: true,
      category: "Repository",
      highlights: [
        "IEEE Xplore Doc ID: 10872263 implementation",
        "Includes 2D DCT spatial frequency extraction modules",
        "Realtime 42 FPS CUDA inference benchmarking",
      ],
    },
    {
      name: "BioGPT-Clinical-Prescription-Generator",
      repoUrl: "https://github.com/Param-Pandya",
      description: "Fine-tuned BioGPT model with SNOMED CT ontology constraints and FDA drug interaction verification APIs.",
      language: "Python / HuggingFace",
      languageColor: "#3572A5",
      stars: 21,
      forks: 7,
      isPinned: true,
      category: "Repository",
      highlights: [
        "PEFT / LoRA fine-tuning scripts for MIMIC-III dataset",
        "Deterministic grammar-constrained JSON output parsing",
        "FDA NDC drug interaction API integration",
      ],
    },
    {
      name: "PneuSTACK-Medical-Vision",
      repoUrl: "https://github.com/Param-Pandya",
      description: "Multi-tier stacking ensemble combining ResNet-50, DenseNet-121, Vision Transformers, and XGBoost meta-learning.",
      language: "Python / PyTorch",
      languageColor: "#3572A5",
      stars: 15,
      forks: 4,
      isPinned: true,
      category: "Repository",
      highlights: [
        "Pediatric chest X-ray multi-class pneumonia detection",
        "Grad-CAM radiologist interpretability activation maps",
        "Perspective-distortion data augmentation pipeline",
      ],
    },
    {
      name: "Agentic-GraphRAG-Neo4j",
      repoUrl: "https://github.com/Param-Pandya",
      description: "Multi-hop biomedical question answering coupling Llama-3, Neo4j Cypher graph queries, and Milvus vector DB.",
      language: "Python / LangChain",
      languageColor: "#3572A5",
      stars: 18,
      forks: 5,
      isPinned: true,
      category: "Repository",
      highlights: [
        "LangGraph state machine query planning",
        "Dynamic Cypher query generation & validation",
        "Citation provenance tracking for retrieved nodes",
      ],
    },
  ] as OpenSourceRepo[],

  contributions: [
    {
      project: "PyTorch Vision Tutorials & Model Benchmarks",
      projectUrl: "https://github.com/pytorch/vision",
      prUrl: "https://github.com/Param-Pandya",
      title: "Optimized spatial transform layer performance for custom vision evaluation benchmarks",
      description: "Contributed performance optimizations and documentation enhancements for spatial feature extraction transformations.",
      status: "Merged",
      date: "2024",
    },
    {
      project: "HuggingFace PEFT / Transformers",
      projectUrl: "https://github.com/huggingface/peft",
      prUrl: "https://github.com/Param-Pandya",
      title: "Added LoRA target module helper utilities for BioGPT causal LM architectures",
      description: "Expanded target module detection helpers for domain-specific PubMed language models.",
      status: "Merged",
      date: "2024",
    },
    {
      project: "LangChain Community Adapters",
      projectUrl: "https://github.com/langchain-ai/langchain",
      prUrl: "https://github.com/Param-Pandya",
      title: "Enhanced Neo4j GraphQAChain error handling for complex Cypher multi-hop traversals",
      description: "Improved retry handling and exception parsing when generating dynamic Cypher queries from natural language.",
      status: "Merged",
      date: "2024",
    },
  ] as OSSContribution[],
};
