export type BlogCategory =
  | "LLMs"
  | "Machine Learning"
  | "RAG"
  | "Agents"
  | "Python"
  | "Computer Vision"
  | "Research Notes"
  | "Prompt Engineering";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  coverImage: string;
  publishedDate: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  featured?: boolean;
}

export const blogCategories: BlogCategory[] = [
  "LLMs",
  "Machine Learning",
  "RAG",
  "Agents",
  "Python",
  "Computer Vision",
  "Research Notes",
  "Prompt Engineering",
];

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "building-autonomous-ai-agents-langgraph",
    title: "Building Autonomous AI Agents with LangGraph and State Graphs",
    excerpt:
      "A deep dive into stateful multi-agent orchestration, cyclical reasoning loops, and deterministic fallback control in production AI applications.",
    category: "Agents",
    coverImage: "/projects/deepfake.png",
    publishedDate: "July 18, 2024",
    readingTime: "7 min read",
    author: {
      name: "Param Pandya",
      role: "AI & ML Research Engineer",
      avatar: "https://github.com/Param-Pandya.png",
    },
    tags: ["Agents", "LangGraph", "Python", "LLMs", "State Machines"],
    featured: true,
    content: `
# Building Autonomous AI Agents with LangGraph and State Graphs

Autonomous AI agents represent the next frontier in Generative AI engineering. Unlike simple prompt-response chains, agents operate using **stateful execution graphs**, memory reflection, and tool-calling primitives.

## Why Linear Chains Fail in Production

Standard LLM chains fail when faced with complex multi-step problems because:
1. **Lack of Error Recovery**: If an intermediate step returns garbage, linear pipelines propagate errors downstream.
2. **Infinite Loop Risks**: Unbounded execution loops cost money and exceed context window token limits.
3. **State Loss**: Complex decisions require maintaining execution state across multiple tool interactions.

## Architectural Paradigm: LangGraph State Machines

By modeling agent workflows as directed graphs with typed state contracts, we obtain deterministic control over stochastic LLM outputs.

\`\`\`python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated

class AgentState(TypedDict):
    query: str
    plan: list[str]
    current_step: int
    tool_outputs: dict
    final_response: str

# Define state transition nodes
builder = StateGraph(AgentState)
builder.add_node("planner", plan_execution)
builder.add_node("tool_runner", execute_tools)
builder.add_node("evaluator", evaluate_output)

builder.add_conditional_edges(
    "evaluator",
    should_continue,
    {"continue": "tool_runner", "end": END}
)
\`\`\`

## Key Takeaways
- Always enforce schema-level output validation on agent responses.
- Implement strict max-iteration bounds (e.g. max 5 tool hops per query).
- Maintain audit logs of all tool inputs and raw JSON outputs for production debugging.
    `,
  },
  {
    id: "post-2",
    slug: "optimizing-rag-pipelines-hybrid-search",
    title: "Optimizing Production RAG Pipelines: Hybrid Vector-BM25 & Reciprocal Rank Fusion",
    excerpt:
      "Eliminate retrieval failures in RAG by combining dense vector embeddings with sparse BM25 keyword matching and cross-encoder re-ranking.",
    category: "RAG",
    coverImage: "/projects/biogpt.png",
    publishedDate: "July 12, 2024",
    readingTime: "6 min read",
    author: {
      name: "Param Pandya",
      role: "AI & ML Research Engineer",
      avatar: "https://github.com/Param-Pandya.png",
    },
    tags: ["RAG", "Vector Search", "BM25", "Re-ranking", "LangChain"],
    featured: true,
    content: `
# Optimizing Production RAG Pipelines: Hybrid Search & Re-ranking

Retrieval-Augmented Generation (RAG) is standard for enterprise search over custom knowledge bases. However, relying purely on dense vector distance (e.g. Cosine similarity over OpenAI embeddings) leads to silent retrieval failures for keyword-exact queries like serial numbers or technical SKUs.

## The Hybrid Solution: Dense + Sparse Retrieval

By combining **Dense Vector Search** (semantic context) with **Sparse BM25 Search** (keyword precision) via **Reciprocal Rank Fusion (RRF)**, retrieval recall increases by 24%.

\`\`\`python
def reciprocal_rank_fusion(dense_results, sparse_results, k=60):
    rrf_scores = {}
    for rank, doc in enumerate(dense_results):
        rrf_scores[doc.id] = rrf_scores.get(doc.id, 0) + 1 / (k + rank + 1)
    for rank, doc in enumerate(sparse_results):
        rrf_scores[doc.id] = rrf_scores.get(doc.id, 0) + 1 / (k + rank + 1)
    return sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)
\`\`\`

## Summary
- Sparse BM25 catches exact acronyms and part numbers.
- Cross-encoders (bge-reranker-large) rank top 10 candidates before passing to LLM context.
    `,
  },
  {
    id: "post-3",
    slug: "spatial-frequency-deepfake-detection",
    title: "Spatial-Frequency Fusion in Deepfake Media Forensics",
    excerpt:
      "A technical breakdown of IEEE 2024 research combining spatial CNN attention maps with Discrete Cosine Transform (DCT) frequency analysis.",
    category: "Computer Vision",
    coverImage: "/projects/pneustack.png",
    publishedDate: "June 28, 2024",
    readingTime: "9 min read",
    author: {
      name: "Param Pandya",
      role: "AI & ML Research Engineer",
      avatar: "https://github.com/Param-Pandya.png",
    },
    tags: ["Computer Vision", "Deepfake Detection", "DCT", "PyTorch", "IEEE 2024"],
    content: `
# Spatial-Frequency Fusion in Deepfake Media Forensics

Generative AI face-swapping algorithms leave high-frequency artifacts in the discrete cosine transform spectrum that are invisible to the human eye.

## The Dual-Stream Neural Architecture

1. **Spatial Stream**: ResNet-50 backbone extracting spatial facial landmark blurs and boundary artifacts.
2. **Frequency Stream**: 2D Discrete Cosine Transform (DCT) conversion capturing spectral energy distributions.
3. **Cross-Attention Fusion**: Merges spatial and spectral channels into a joint classification tensor.
    `,
  },
  {
    id: "post-4",
    slug: "system-prompts-structured-json-output",
    title: "Mastering System Prompts for Guaranteed Structured JSON Outputs",
    excerpt:
      "Advanced prompt engineering techniques, Pydantic schemas, and grammar-guided decoding for zero JSON parsing errors.",
    category: "Prompt Engineering",
    coverImage: "/projects/biogpt.png",
    publishedDate: "June 15, 2024",
    readingTime: "5 min read",
    author: {
      name: "Param Pandya",
      role: "AI & ML Research Engineer",
      avatar: "https://github.com/Param-Pandya.png",
    },
    tags: ["Prompt Engineering", "JSON", "Pydantic", "LLMs", "Grammar Decoding"],
    content: `
# Mastering System Prompts for Structured JSON Outputs

Relying on LLMs to return valid JSON without schema enforcement causes production crash loops.

## 3 Rules for Reliable System Prompts

1. **Explicit Schema Injection**: Provide standard TypeScript/Pydantic schemas directly inside system prompts.
2. **Grammar-Guided Decoding**: Use GBNF or Outlines to enforce token-level syntax restrictions at model generation time.
3. **Negative Constraint Demarcation**: Tell the model: "Respond strictly with valid JSON. Do not write introductory prose or code block backticks."
    `,
  },
  {
    id: "post-5",
    slug: "python-asyncio-vllm-high-throughput-inference",
    title: "High-Throughput LLM Serving with Python asyncio and vLLM",
    excerpt:
      "How PagedAttention and asynchronous continuous batching enable 5x higher token throughput on single GPU nodes.",
    category: "Python",
    coverImage: "/projects/deepfake.png",
    publishedDate: "May 30, 2024",
    readingTime: "8 min read",
    author: {
      name: "Param Pandya",
      role: "AI & ML Research Engineer",
      avatar: "https://github.com/Param-Pandya.png",
    },
    tags: ["Python", "vLLM", "asyncio", "Inference", "CUDA"],
    content: `
# High-Throughput Serving with Python asyncio and vLLM

Traditional Hugging Face \`pipeline.generate()\` calls block GPU execution threads and waste memory due to KV-cache fragmentation.

## PagedAttention Memory Management

vLLM manages Key-Value memory like virtual memory pages in operating systems, reducing memory waste from 60% down to under 4%.

Combining Python's \`asyncio\` event loop with vLLM's AsyncLLMEngine enables handling hundreds of parallel client streams on a single NVIDIA A10G GPU.
    `,
  },
  {
    id: "post-6",
    slug: "evaluating-llms-ragas-custom-benchmarks",
    title: "Evaluating RAG & LLM Applications: Faithfulness, Answer Relevance & Context Recall",
    excerpt:
      "A pragmatic framework for automated LLM-as-a-judge benchmarking using Ragas metrics and synthetic test dataset generation.",
    category: "Research Notes",
    coverImage: "/projects/pneustack.png",
    publishedDate: "May 10, 2024",
    readingTime: "6 min read",
    author: {
      name: "Param Pandya",
      role: "AI & ML Research Engineer",
      avatar: "https://github.com/Param-Pandya.png",
    },
    tags: ["Research Notes", "Evaluation", "Ragas", "LLM Benchmark", "Metrics"],
    content: `
# Evaluating RAG & LLM Applications with Automated Benchmarks

"You cannot optimize what you do not measure." Testing RAG systems requires continuous metrics tracking.

## Core Evaluation Triad

1. **Faithfulness**: Is the answer derived *only* from retrieved context documents? (Detects hallucinations).
2. **Answer Relevance**: Does the generated answer directly answer the user query?
3. **Context Recall**: Did the retrieval engine fetch all required ground-truth evidence?
    `,
  },
  {
    id: "post-7",
    slug: "lora-qlora-fine-tuning-guide",
    title: "Parameter-Efficient Fine-Tuning: Understanding LoRA & QLoRA Mathematics",
    excerpt:
      "Deconstructing low-rank matrix decomposition ($W + A \\times B$) and 4-bit NormalFloat quantization for fine-tuning 70B models on consumer hardware.",
    category: "LLMs",
    coverImage: "/projects/biogpt.png",
    publishedDate: "April 22, 2024",
    readingTime: "10 min read",
    author: {
      name: "Param Pandya",
      role: "AI & ML Research Engineer",
      avatar: "https://github.com/Param-Pandya.png",
    },
    tags: ["LLMs", "LoRA", "QLoRA", "Fine-Tuning", "PyTorch"],
    content: `
# Parameter-Efficient Fine-Tuning: LoRA & QLoRA Math

Full parameter fine-tuning of 70B parameter LLMs requires hundreds of gigabytes of GPU memory to store optimizer states (AdamW).

## Low-Rank Adaptation (LoRA)

LoRA freezes the pretrained model weights $W_0 \\in \\mathbb{R}^{d \\times k}$ and injects trainable rank decomposition matrices $A \\in \\mathbb{R}^{r \\times k}$ and $B \\in \\mathbb{R}^{d \\times r}$, where rank $r \\ll \\min(d, k)$.

$$W = W_0 + \\frac{\\alpha}{r} (B \\times A)$$

This reduces trainable parameters by **99.9%** while retaining 98% of full fine-tuning performance.
    `,
  },
  {
    id: "post-8",
    slug: "stacking-ensemble-meta-learners-tabular-vision",
    title: "Stacking Ensemble Meta-Learners: Blending CNNs and Gradient Boosting",
    excerpt:
      "Combining deep spatial embeddings from ResNet/DenseNet with XGBoost meta-classifiers for tabular-vision hybrid tasks.",
    category: "Machine Learning",
    coverImage: "/projects/pneustack.png",
    publishedDate: "April 05, 2024",
    readingTime: "7 min read",
    author: {
      name: "Param Pandya",
      role: "AI & ML Research Engineer",
      avatar: "https://github.com/Param-Pandya.png",
    },
    tags: ["Machine Learning", "Stacking Ensembles", "XGBoost", "CNNs", "Scikit-Learn"],
    content: `
# Stacking Ensemble Meta-Learners in Machine Learning

While deep neural networks excel at spatial feature extraction, gradient boosted decision trees (XGBoost/LightGBM) outperform neural networks on structured tabular metadata.

## Stacking Architecture

1. **Level-0 Base Learners**: Train CNN backbones to output logits and deep feature embeddings.
2. **Feature Stacking**: Concatenate CNN embeddings with tabular patient metadata.
3. **Level-1 Meta-Learner**: Train an XGBoost meta-classifier on out-of-fold predictions to make final diagnostic decisions.
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
