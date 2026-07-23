export interface NowPageData {
  lastUpdated: string;
  location: string;
  currentRole: string;
  currentlyBuilding: Array<{
    title: string;
    description: string;
    tech: string[];
    link?: string;
  }>;
  currentlyLearning: Array<{
    topic: string;
    description: string;
    currentTopics: string[];
  }>;
  currentlyReading: Array<{
    title: string;
    author: string;
    category: string;
    takeaway: string;
  }>;
  currentGoals: Array<{
    goal: string;
    timeframe: string;
    status: string;
    description: string;
  }>;
}

export const nowData: NowPageData = {
  lastUpdated: "July 2026",
  location: "India • Available for AI/ML Opportunities",
  currentRole: "AI Engineer | Building Production AI & ML Systems",

  currentlyBuilding: [
    {
      title: "CareerAI – AI Career Coach",
      description: "Building an AI-powered career assistant that helps users improve resumes, prepare for interviews, generate cover letters, and receive personalized career guidance.",
      tech: ["React", "TypeScript", "FastAPI", "Gemini API", "PostgreSQL"],
      link: "/projects/career-ai",
    },
    {
      title: "GMSAC – Gujarati Sentiment Analysis Corpus",
      description: "Maintaining and documenting a benchmark Gujarati sentiment analysis dataset while evaluating transformer-based language models for low-resource languages.",
      tech: ["Python", "Hugging Face", "IndicBERT", "Pandas", "NLP"],
      link: "/projects/gmsac",
    },
    {
      title: "AI Portfolio & Technical Blog",
      description: "Building a documentation-style portfolio featuring AI engineering articles, technical case studies, and project documentation focused on LLMs, RAG, AI Agents, Computer Vision, and MLOps.",
      tech: ["React", "TypeScript", "Markdown", "Tailwind CSS"],
    },
  ],

  currentlyLearning: [
    {
      topic: "Large Language Models & AI Systems",
      description: "Studying how modern LLM-powered applications are designed, optimized, and deployed in production environments.",
      currentTopics: ["Transformers", "Context Windows", "Prompt Engineering", "RAG", "Vector Databases", "AI System Design"],
    },
    {
      topic: "AI Agents",
      description: "Learning how autonomous AI systems perform planning, memory management, tool usage, and workflow orchestration.",
      currentTopics: ["LangGraph", "MCP", "Tool Calling", "Agent Memory", "Multi-Agent Workflows"],
    },
    {
      topic: "MLOps & Production AI",
      description: "Understanding deployment pipelines, monitoring, model versioning, Docker, FastAPI, and scalable AI infrastructure.",
      currentTopics: ["FastAPI", "Docker", "CI/CD", "Model Serving", "Monitoring"],
    },
  ],

  currentlyReading: [
    {
      title: "Designing Machine Learning Systems",
      author: "Chip Huyen",
      category: "AI Engineering",
      takeaway: "Learning practical approaches to building reliable, scalable, and production-ready machine learning systems.",
    },
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      category: "Distributed Systems",
      takeaway: "Understanding distributed systems, scalable backend architecture, reliability, and data engineering fundamentals.",
    },
    {
      title: "Current Reading Topics",
      author: "",
      category: "Research Papers",
      takeaway: "Actively reading research papers on: Large Language Models, Retrieval-Augmented Generation (RAG), AI Agents, Computer Vision, Healthcare AI.",
    },
  ],

  currentGoals: [
    {
      goal: "Secure my first AI/ML Engineer role",
      timeframe: "Current Priority",
      status: "In Progress",
      description: "Actively preparing for and applying to AI Engineer, Machine Learning Engineer, and Generative AI roles while strengthening practical engineering skills.",
    },
    {
      goal: "Publish high-quality AI engineering articles",
      timeframe: "Ongoing",
      status: "In Progress",
      description: "Building a documentation-style technical blog covering LLMs, RAG, AI Agents, Computer Vision, Machine Learning, AI Systems, and MLOps.",
    },
    {
      goal: "Build production-ready AI projects",
      timeframe: "Ongoing",
      status: "In Progress",
      description: "Creating end-to-end AI applications that demonstrate practical engineering, deployment, and real-world problem solving.",
    },
  ],
};
