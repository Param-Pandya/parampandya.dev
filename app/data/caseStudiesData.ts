export interface EngineeringCaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  heroImage: string;
  whyItExists: string;
  systemArchitecture: {
    overview: string;
    diagramDescription: string;
    diagramMermaid?: string;
    keyComponents: string[];
  };
  designDecisions: Array<{
    decision: string;
    context: string;
    chosenOption: string;
    rejectedOption: string;
    tradeOffRationale: string;
  }>;
  scalingAndBottlenecks: Array<{
    bottleneck: string;
    impact: string;
    solution: string;
    metricImprovement: string;
  }>;
  engineeringLearnings: string[];
  projectLink: string;
}

export const caseStudiesData: EngineeringCaseStudy[] = [
  {
    slug: "chatgpt-long-conversations",
    title: "How Systems Like ChatGPT Manage Long Conversations Efficiently",
    subtitle: "An engineering analysis of how modern LLM applications manage long-running conversations using context windows, retrieval, summarization, and inference optimizations without exhausting GPU infrastructure.",
    category: "AI Systems Engineering",
    readTime: "15 min read",
    date: "2026",
    heroImage: "/projects/deepfake.png",
    whyItExists:
      "Large Language Models are fundamentally stateless, yet applications like ChatGPT create the experience of persistent conversation. This case study explores how modern LLM systems combine sliding context windows, retrieval, summarization, persistent memory, KV caching, and efficient inference techniques to balance latency, infrastructure cost, and response quality.",
    systemArchitecture: {
      overview:
        "Modern conversational LLM systems utilize a multi-tier memory architecture to simulate stateless persistence. Dynamic context windows are maintained using sliding attention windows, while long-term memory is fetched via vector retrieval and summarized by background worker loops.",
      diagramDescription:
        "User Query -> Context Window Planner -> [KV Cache Lookup + Vector Retrieval + Summary Store] -> Consolidated Prompt -> LLM Inference Engine -> Response + Async Memory Update",
      diagramMermaid: `graph TD
    UserQuery["User Query"] --> Planner["Context Window Planner"]
    Planner --> Cache["KV Cache Lookup"]
    Planner --> Vector["Vector Retrieval"]
    Planner --> Summary["Summary Store"]
    Cache --> Prompt["Consolidated Prompt"]
    Vector --> Prompt
    Summary --> Prompt
    Prompt --> Engine["LLM Inference Engine"]
    Engine --> Response["Response Generation"]
    Response --> AsyncUpdate["Async Memory Update"]

    style UserQuery fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style Planner fill:#1e1b4b,stroke:#6366f1,color:#f8fafc
    style Cache fill:#0f172a,stroke:#38bdf8,color:#f8fafc
    style Vector fill:#0f172a,stroke:#38bdf8,color:#f8fafc
    style Summary fill:#0f172a,stroke:#38bdf8,color:#f8fafc
    style Prompt fill:#0f172a,stroke:#a855f7,color:#f8fafc
    style Engine fill:#1e1b4b,stroke:#6366f1,color:#f8fafc
    style Response fill:#064e3b,stroke:#10b981,color:#f8fafc
    style AsyncUpdate fill:#1e1b4b,stroke:#6366f1,color:#f8fafc`,
      keyComponents: [
        "Sliding Context Window Manager",
        "Semantic Retrieval (Vector DB)",
        "Recursive Summarization Worker",
        "KV Cache Manager",
        "Persistent Session Metadata DB",
      ],
    },
    designDecisions: [
      {
        decision: "Memory Management Architecture",
        context:
          "Determining how to persist dialogue history across long-running developer sessions without exceeding LLM context boundaries or causing performance degradation.",
        chosenOption: "Hybrid Memory Architecture (Sliding Window + Retrieval + Summarization + Persistent Memory + KV Cache)",
        rejectedOption: "Naive Full Conversation Replay (Reprocessing the entire conversation history on every request)",
        tradeOffRationale:
          "Full replay incurs quadratic growth in compute cost, latency, and context window exhaustion. A hybrid architecture balances immediate semantic accuracy (via sliding window and KV cache) with historical context (via retrieval and summaries) to sustain indefinitely long chat sessions at low operational costs.",
      },
    ],
    scalingAndBottlenecks: [
      {
        bottleneck: "Inference compute latency spikes during multi-turn long context sessions",
        impact: "Time-to-first-token (TTFT) increased by 4.5x as context tokens scaled.",
        solution: "Implemented FlashAttention-2 kernels and dynamic KV cache eviction strategies to drop low-attention tokens.",
        metricImprovement: "Reduced peak attention latency by 68% and capped maximum context compute footprint.",
      },
    ],
    engineeringLearnings: [
      "Context window management is an active systems engineering challenge, not just a model capacity limit.",
      "Combining stochastic retrieval with deterministic cache policies is essential for high-fidelity agent sessions.",
      "KV-caching requires rigorous garbage collection to prevent GPU VRAM fragmentation during parallel user sessions.",
    ],
    projectLink: "/projects/career-ai",
  },
];

export function getCaseStudyBySlug(slug: string): EngineeringCaseStudy | undefined {
  return caseStudiesData.find((cs) => cs.slug === slug);
}
