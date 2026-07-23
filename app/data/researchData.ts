export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "published" | "conference";
  abstract: string;
  pdfUrl?: string;
  paperUrl?: string;
  doi?: string;
  citationText: string;
  bibtex: string;
  metrics: Array<{ label: string; value: string }>;
  tags: string[];
}

export interface ResearchInterest {
  title: string;
  category: string;
  description: string;
  topics: string[];
  iconName: string;
}

export interface OngoingResearch {
  title: string;
  domain: string;
  status: string;
  description: string;
  keyGoals: string[];
}

export interface FutureIdea {
  title: string;
  vision: string;
  impact: string;
}

export interface ResearchTimelineEntry {
  year: string;
  title: string;
  institution: string;
  description: string;
  tag: string;
}

export interface DownloadAsset {
  title: string;
  category: string;
  fileSize: string;
  format: string;
  description: string;
  downloadUrl: string;
}

export const researchInterests: ResearchInterest[] = [
  {
    title: "AI Systems & Large Language Models",
    category: "Generative AI & LLMs",
    description:
      "Designing production-ready LLM systems with a focus on retrieval-augmented generation (RAG), autonomous multi-agent workflows, long-context reasoning, and building reliable architectures for real-world applications.",
    topics: ["Large Language Models", "RAG Systems", "AI Agents", "Prompt Engineering"],
    iconName: "Sparkles",
  },
  {
    title: "Generative AI for Healthcare",
    category: "Medical AI & Healthcare",
    description:
      "Developing safe and grounded clinical AI systems utilizing specialized biomedical language models, structured medical terminology integration, and constrained generation policies to improve clinical workflows.",
    topics: ["BioGPT", "Clinical NLP", "Medical AI", "Knowledge Grounding"],
    iconName: "BookOpen",
  },
  {
    title: "Computer Vision & Media Forensics",
    category: "Visual Computing",
    description:
      "Applying deep learning methodologies to visual understanding, medical diagnostics, deepfake media detection, model generalization, and explainable visual algorithms.",
    topics: ["Computer Vision", "Deepfake Detection", "Medical Imaging", "Explainable AI"],
    iconName: "Eye",
  },
  {
    title: "AI Systems Engineering",
    category: "MLOps & Systems",
    description:
      "Engineering robust pipelines, highly scalable inference systems, vector databases, MLOps strategies, APIs, and containerized deployments for production AI environments.",
    topics: ["AI Engineering", "Vector Databases", "Model Deployment", "MLOps"],
    iconName: "Cpu",
  },
];

export const publications: Publication[] = [
  {
    id: "ieee-deepfake-2024",
    title: "Efficient Deepfake Detection using AI",
    authors: ["Param Pandya", "Collaborating Researchers"],
    venue: "IEEE Advanced Engineering Systems and Practices Conference (AESPC)",
    year: 2024,
    type: "published",
    abstract:
      "This research addresses the critical challenges of deepfake detection within the field of media forensics, focusing specifically on improving model generalization across diverse datasets. To counter the domain shift caused by varying video compression formats, the study investigates reinforcement learning algorithms—specifically Deep Q-Networks (DQN) and Proximal Policy Optimization (PPO)—to dynamically optimize data augmentation strategies during model training. Utilizing robust deep learning architectures based on XceptionNet and InceptionResNetV2 backbones, the proposed framework adaptively learns generalized feature representations of visual manipulations. The integration of reinforcement learning helps the pipeline identify compression-resistant artifacts, mitigating performance drops on previously unseen datasets. This approach provides a trustworthy and robust methodology for visual media verification, contributing practical solutions for media forensics.",
    pdfUrl: "https://ieeexplore.ieee.org/document/10872263",
    paperUrl: "https://ieeexplore.ieee.org/document/10872263",
    doi: "10.1109/IEEECONF.2024.10872263",
    citationText:
      "P. Pandya et al., \"Efficient Deepfake Detection using AI,\" 2024 IEEE Advanced Engineering Systems and Practices Conference (AESPC), doi: 10.1109/IEEECONF.2024.10872263.",
    bibtex: `@inproceedings{pandya2024deepfake,\n  title={Efficient Deepfake Detection using AI},\n  author={Pandya, Param and others},\n  booktitle={IEEE Advanced Engineering Systems and Practices Conference (AESPC)},\n  year={2024},\n  doi={10.1109/IEEECONF.2024.10872263}\n}`,
    metrics: [
      { label: "IEEE Status", value: "Published (AESPC 2024)" },
      { label: "Core Approach", value: "Reinforcement Learning" },
      { label: "Architectures", value: "Xception / InceptionResNet" },
      { label: "Domain", value: "Media Forensics" },
    ],
    tags: ["IEEE Xplore", "Deepfake Detection", "Reinforcement Learning", "Media Forensics", "DQN", "PPO", "XceptionNet", "InceptionResNetV2"],
  },
];

export const ongoingResearch: OngoingResearch[] = [
  {
    title: "Self-Supervised Vision Transformers for Low-Resource Radiography",
    domain: "Medical Computer Vision",
    status: "Active Benchmark Experimentation",
    description:
      "Adapting self-supervised ViT pretraining (DINOv2) to eliminate dense annotation bottlenecks in rural medical imaging centers.",
    keyGoals: [
      "Achieve >95% diagnostic ROC-AUC with only 10% labeled training samples",
      "Minimize cross-domain variance across heterogeneous X-ray tube voltages",
    ],
  },
];

export const futureIdeas: FutureIdea[] = [
  {
    title: "Reliable Large Language Models & RAG",
    vision: "Researching systems to mitigate hallucinations in LLM workflows, optimizing multi-hop retrieval-augmented generation (RAG), and improving long-context reasoning in real-world environments.",
    impact: "Ensures factually grounded generation for high-stakes enterprise applications."
  },
  {
    title: "AI Agents & Multi-Agent Systems",
    vision: "Exploring autonomous task-planning agents, tool-use integration, Model Context Protocol (MCP) standards, and cooperative multi-agent orchestration for complex workflows.",
    impact: "Enables robust, end-to-end task execution in software and engineering environments."
  },
  {
    title: "Healthcare AI & Clinical Decision Support",
    vision: "Adapting foundation clinical language models with ontology grounding (SNOMED CT, UMLS) to build transparent decision tools for diagnosis and prescription drafting.",
    impact: "Supports clinical professionals with reliable, constraint-compliant AI assistance."
  },
  {
    title: "Computer Vision & Medical Imaging",
    vision: "Developing trustworthy vision models for media forensics, deepfake detection, and medical imaging diagnostics utilizing self-supervised learning and explainable architectures.",
    impact: "Provides resilient verification and diagnostics tools resistant to domain shifts."
  },
  {
    title: "AI Safety & Explainable AI (XAI)",
    vision: "Investigating model explainability (Grad-CAM, feature attribution), verifiable decision boundaries, and robust safety guardrails for deployment in critical systems.",
    impact: "Establishes trust, compliance, and transparent audit trails for neural model predictions."
  },
  {
    title: "Efficient Inference & Edge AI",
    vision: "Benchmarking and optimizing deep learning model deployment, quantization (INT8/FP4), pruning, and edge inference pipelines for resource-constrained client systems.",
    impact: "Minimizes computing footprint and network latencies for localized AI deployment."
  }
];

export const researchTimeline: ResearchTimelineEntry[] = [
  {
    year: "2024",
    title: "IEEE Publication",
    institution: "IEEE AESPC 2024",
    description:
      "Published research paper on Efficient Deepfake Detection using AI at IEEE AESPC 2024. Focus on reinforcement learning enhanced deepfake detection, cross-dataset evaluation, and media forensics.",
    tag: "Publication Milestone",
  },
  {
    year: "2023",
    title: "Research Internship",
    institution: "IIT Jammu",
    description:
      "Worked on deep learning experimentation, computer vision workflows, benchmarking, and AI model evaluation.",
    tag: "IIT Jammu",
  },
  {
    year: "2022",
    title: "Research Internship",
    institution: "IIT Indore",
    description:
      "Conducted foundational AI research involving machine learning experimentation, data preprocessing, exploratory analysis, and academic research workflows.",
    tag: "IIT Indore",
  },
];

export const researchDownloads: DownloadAsset[] = [];
