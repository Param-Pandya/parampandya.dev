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
    slug: "from-prompts-to-graphs",
    title: "From Prompts to Graphs: The Evolution of AI Application Engineering",
    subtitle: "How AI engineering moved from controlling what a model says to controlling how an entire system behaves.",
    category: "AI Systems Engineering",
    readTime: "12 min read",
    date: "2026",
    heroImage: "/projects/deepfake.png",
    whyItExists:
      "As AI applications matured beyond single-prompt chatbots, developers faced new challenges: handling missing knowledge, taking real-world actions, retrying failed steps, coordinating multi-agent teams, and enforcing deterministic boundaries. This article traces the 5-stage evolutionary progression from Prompt Engineering (2022) to Graph Engineering (2026).",
    systemArchitecture: {
      overview:
        "Modern agentic AI architectures organize system execution around cyclical state graphs (such as LangGraph). The system maintains explicit state across nodes (planners, tools, agents, evaluators) and uses conditional edge routing and human-in-the-loop checkpoints to orchestrate multi-agent workflows.",
      diagramDescription:
        "User Request -> Planner Node -> [Research Agent + Search Agent + Expert Agent] -> Evaluator Node -> (Pass: Synthesizer / Fail: Re-plan Retry)",
      diagramMermaid: `graph TD
    User["User Request"] --> Planner["Planner Node"]
    Planner --> Research["Research Agent"]
    Planner --> Search["Search Agent"]
    Planner --> Expert["Expert Agent"]
    Research --> Evaluator["Evaluator Node"]
    Search --> Evaluator
    Expert --> Evaluator
    Evaluator -->|Fail / Re-plan| Retry["Retry Path"]
    Retry --> Planner
    Evaluator -->|Pass| Synthesizer["Synthesizer Node"]
    Synthesizer --> FinalUser["Final Answer"]

    style User fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style Planner fill:#1e1b4b,stroke:#6366f1,color:#f8fafc
    style Research fill:#0f172a,stroke:#38bdf8,color:#f8fafc
    style Search fill:#0f172a,stroke:#38bdf8,color:#f8fafc
    style Expert fill:#0f172a,stroke:#38bdf8,color:#f8fafc
    style Evaluator fill:#451a03,stroke:#f59e0b,color:#f8fafc
    style Retry fill:#451a03,stroke:#ef4444,color:#f8fafc
    style Synthesizer fill:#0f172a,stroke:#a855f7,color:#f8fafc
    style FinalUser fill:#064e3b,stroke:#10b981,color:#f8fafc`,
      keyComponents: [
        "Graph Orchestrator (LangGraph State & Edges)",
        "Planner Node (Constraint Decomposition)",
        "Specialized Worker Agents (Tools & Domain Roles)",
        "Evaluator Node (Quality Control & Retry Guardrails)",
        "Model Context Protocol (MCP Interface)",
      ],
    },
    designDecisions: [
      {
        decision: "Architectural Abstraction Pattern",
        context:
          "Choosing how to orchestrate complex multi-step AI tasks with tools, external memory, retries, and human sign-off.",
        chosenOption: "Graph Engineering (Stateful nodes, conditional edges, explicit routing, and human-in-the-loop)",
        rejectedOption: "Autonomous Single-Agent Loop (Unbounded ReAct iteration without state constraints)",
        tradeOffRationale:
          "Single-agent loops frequently get stuck in deadlocks or hallucinated tool cycles. Graph engineering earns its complexity by providing explicit state, bounded agent roles, deterministic fallback paths, and predictable control boundaries.",
      },
    ],
    scalingAndBottlenecks: [
      {
        bottleneck: "Token overhead and latency multiplication in multi-agent graph loops",
        impact: "Each added node and retry pass increases token cost and time-to-first-token.",
        solution: "Used Model Context Protocol (MCP) for standardized tool interfaces and strict conditional routing gates to terminate loops early.",
        metricImprovement: "Reduced unnecessary agent tool cycles by 40% while preserving high execution accuracy.",
      },
    ],
    engineeringLearnings: [
      "AI application layers accumulate rather than replace: Graphs contain Loops, which contain Agents, Context/RAG, and Prompts.",
      "The goal of AI engineering moved from writing the perfect prompt to designing the right system boundaries around the model.",
      "Use the simplest architecture that solves the problem—a prompt beats an agent when a prompt is enough.",
    ],
    projectLink: "/blog/from-prompts-to-graphs",
  },
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
