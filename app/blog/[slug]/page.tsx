import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Script from "next/script";
import Mermaid from "../../components/Mermaid";
import MermaidAutoInit from "../../components/MermaidAutoInit";
import { caseStudiesData, getCaseStudyBySlug } from "../../data/caseStudiesData";
import { getPostBySlug } from "../../../lib/markdown";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudiesData.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const study = getCaseStudyBySlug(resolvedParams.slug);
  if (!study) {
    return { title: "Blog Article Not Found | Param Pandya" };
  }
  return {
    title: `${study.title} | Engineering Blog`,
    description: study.subtitle,
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${study.title} | Engineering Blog`,
      description: study.subtitle,
      type: "article",
      url: `https://parampandya.dev/blog/${resolvedParams.slug}`,
      siteName: "Param Pandya | AI Research & Engineering",
      locale: "en_US",
      images: [
        {
          url: study.heroImage,
          alt: study.title,
        },
      ],
    },
    authors: [{ name: "Param Pandya", url: "https://parampandya.dev" }],
    creator: "Param Pandya",
    publisher: "Param Pandya",
    twitter: {
      card: "summary_large_image",
      title: `${study.title} | Engineering Blog`,
      description: study.subtitle,
      creator: "@parampandya",
      images: [study.heroImage],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const resolvedParams = await params;
  const study = getCaseStudyBySlug(resolvedParams.slug);

  if (!study) {
    notFound();
  }

  const studySchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": study.title,
    "description": study.subtitle,
    "image": study.heroImage,
    "datePublished": study.date,
    "author": {
      "@type": "Person",
      "name": "Param Pandya",
      "url": "https://parampandya.dev"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://parampandya.dev/blog/${study.slug}`
    }
  };

  // Render Markdown-backed post if available (e.g. from-prompts-to-graphs)
  const markdownPost = getPostBySlug(study.slug);
  if (markdownPost) {
    return (
      <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
        <Header />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(studySchema) }}
        />
        <MermaidAutoInit />

        <div className="pt-32 pb-24 px-4 sm:px-6">
          <div className="mx-auto max-w-[800px] animate-fade-in space-y-10">
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline mb-6"
              >
                ← Back to Blog
              </Link>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 mb-4 select-none">
                <span className="font-semibold">{markdownPost.category}</span>
                <span>•</span>
                <span className="font-semibold">{markdownPost.readingTime}</span>
                <span>•</span>
                <span className="font-semibold">{markdownPost.publishedDate}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                {markdownPost.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed italic">
                {markdownPost.excerpt}
              </p>
            </div>

            <article
              className="prose dark:prose-invert max-w-none space-y-6 text-[18px] leading-[1.7]"
              dangerouslySetInnerHTML={{ __html: markdownPost.content }}
            />
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  // Render ChatGPT Case Study in clean documentation layout
  if (study.slug === "chatgpt-long-conversations") {
    const naiveFlowChart = `graph LR
    T1[Turn 1: Prompt 1] --> M1[Model Inference]
    T2[Turn 2: Prompt 1 + Ans 1 + Prompt 2] --> M2[Model Inference]
    TN[Turn N: Prompt 1 + Ans 1 + ... + Prompt N] --> MN[Model Inference]
    M1 --> M2
    M2 -.-> MN
    
    style T1 fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style T2 fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style TN fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style M1 fill:#1e1b4b,stroke:#6366f1,color:#f8fafc
    style M2 fill:#1e1b4b,stroke:#6366f1,color:#f8fafc
    style MN fill:#1e1b4b,stroke:#6366f1,color:#f8fafc`;

    const pdfLifecycleChart = `graph TD
    PDF[300-Page PDF] --> Chunk[Chunk & Embed]
    Chunk --> DB[(Vector Database Store)]
    Query[User Query] --> Search[Semantic Search]
    DB --> Search
    Search -->|Top 3 Matches ~1k Tokens| Inject[Final Prompt Injection]
    Query --> Inject
    Inject --> LLM[Target LLM]
    
    style PDF fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style Chunk fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style DB fill:#064e3b,stroke:#10b981,color:#f8fafc
    style Query fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style Search fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style Inject fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style LLM fill:#1e1b4b,stroke:#6366f1,color:#f8fafc`;

    const memoryChart = `graph TD
    subgraph User Session
        Window[Sliding Active Window<br>Recent Turns N-5 to N]
        Persist[Persistent Memory Engine<br>Extracted User Profile]
    end
    Window --> Builder[Dynamic Prompt Builder]
    Persist --> Builder
    
    style Window fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style Persist fill:#064e3b,stroke:#10b981,color:#f8fafc
    style Builder fill:#1e1b4b,stroke:#6366f1,color:#f8fafc`;

    const compressionChart = `graph TD
    Raw[Raw Dialogue 100 Turns / 30,000 Tokens] --> W1[Block Summarizer Worker]
    Raw --> W2[Block Summarizer Worker]
    Raw --> W3[Block Summarizer Worker]
    Raw --> Active[Active Window Raw Turns 76-100]
    
    W1 --> SA[Summary Chunk A Turns 1-25]
    W2 --> SB[Summary Chunk B Turns 26-50]
    W3 --> SC[Summary Chunk C Turns 51-75]
    
    SA --> Rollup[Master Rollup 500 Tokens]
    SB --> Rollup
    SC --> Rollup
    
    Rollup --> Prompt[Final Injected Prompt ~2,500 Tokens]
    Active --> Prompt
    
    style Raw fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style W1 fill:#1e1b4b,stroke:#6366f1,color:#f8fafc
    style W2 fill:#1e1b4b,stroke:#6366f1,color:#f8fafc
    style W3 fill:#1e1b4b,stroke:#6366f1,color:#f8fafc
    style Active fill:#064e3b,stroke:#10b981,color:#f8fafc
    style SA fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style SB fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style SC fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style Rollup fill:#064e3b,stroke:#10b981,color:#f8fafc
    style Prompt fill:#064e3b,stroke:#10b981,color:#f8fafc`;

    const endToEndChart = `graph TD
    UserQuery[User Input Prompt] --> CacheCheck{KV Cache Hit?}
    CacheCheck -- Yes --> InjectCache[Reuse Cached Prompt Keys & Values]
    CacheCheck -- No --> WindowPlanner[Context Window Planner]
    
    WindowPlanner --> VectorStore[(Vector Store Long-Term Profile)]
    WindowPlanner --> SummaryDB[(Background Summary Rollup Store)]
    WindowPlanner --> SlidingBuf[Sliding Window Raw Dialogue History]
    
    VectorStore --> PromptAssembler[System Prompt & Memory Assembler]
    SummaryDB --> PromptAssembler
    SlidingBuf --> PromptAssembler
    InjectCache --> PromptAssembler
    
    PromptAssembler --> LLM[LLM Inference Core Engine]
    LLM --> UserResponse[Stream User Response]
    
    UserResponse --> AsyncLoop[Async Background Worker Loop]
    AsyncLoop --> MemoryExtraction[Extract Entity Facts to Vector DB]
    AsyncLoop --> RollupWorker[Update Hierarchical Summary Rollup]
    
    style UserQuery fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style CacheCheck fill:#1e1b4b,stroke:#6366f1,color:#f8fafc
    style InjectCache fill:#064e3b,stroke:#10b981,color:#f8fafc
    style WindowPlanner fill:#1e1b4b,stroke:#6366f1,color:#f8fafc
    style VectorStore fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style SummaryDB fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style SlidingBuf fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style PromptAssembler fill:#1e1b4b,stroke:#6366f1,color:#f8fafc
    style LLM fill:#1e1b4b,stroke:#6366f1,color:#f8fafc
    style UserResponse fill:#064e3b,stroke:#10b981,color:#f8fafc
    style AsyncLoop fill:#0f172a,stroke:#a855f7,color:#f8fafc
    style MemoryExtraction fill:#0f172a,stroke:#a855f7,color:#f8fafc
    style RollupWorker fill:#0f172a,stroke:#a855f7,color:#f8fafc`;

    return (
      <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
        <Header />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(studySchema) }}
        />

        <div className="pt-32 pb-24 px-4 sm:px-6">
          <div className="mx-auto max-w-[800px] animate-fade-in space-y-10">
            {/* Header / Meta Block */}
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline mb-6"
              >
                ← Back to Blog
              </Link>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 mb-4 select-none">
                <span className="font-semibold">{study.category}</span>
                <span>•</span>
                <span className="font-semibold">{study.readTime}</span>
                <span>•</span>
                <span className="font-semibold">Year: {study.date}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                {study.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed italic">
                {study.subtitle}
              </p>
            </div>

            {/* Main Documentation Sections */}
            <article className="space-y-16 text-[18px] leading-[1.7] font-normal text-slate-800 dark:text-slate-100">
              
              {/* Section 1 */}
              <section id="introduction" className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
                  1 // The Core Problem: Stateless Models vs Stateful Conversations
                </h2>
                <p>
                  At a fundamental hardware and math level, Large Language Models (LLMs) are completely <strong>stateless functions</strong>. Given an input sequence of tokens, the transformer architecture computes attention scores across that sequence and predicts the probability distribution for the next token. When you ask a follow-up question in a chat session, the model itself has zero biological or server-side memory of your previous turn.
                </p>
                <p>
                  To create the seamless experience of ongoing dialogue in applications like ChatGPT, systems must resend previous conversation history back to the model on every single turn.
                </p>
                <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/50 dark:border-indigo-500/20 space-y-2 my-6">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    The Quadratic Cost Bottleneck
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Standard self-attention mechanisms scale quadratically <code>O(N²)</code> in compute and memory with respect to prompt sequence length <code>N</code>. As chat sessions extend from 5 turns to 50 turns, reprocessing entire uncompressed transcripts causes exponential spikes in latency (Time to First Token) and VRAM consumption.
                  </p>
                </div>
                <div className="my-6">
                  <Mermaid chart={naiveFlowChart} />
                </div>
              </section>

              {/* Section 2 */}
              <section id="pdf-analogy" className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
                  2 // The 300-Page PDF Mental Model (RAG vs Pure Memory)
                </h2>
                <p>
                  To understand how production systems manage massive histories without blowing up GPU memory, consider a helpful engineering mental model: <strong>Asking a question about a 300-page technical manual</strong>.
                </p>
                <p>
                  There are two ways an AI application can answer a query about page 240:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                    <h3 className="text-sm font-mono font-bold text-rose-500">
                      Approach A: Naive Full Ingestion
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Stuffing all 300 pages (~150,000 tokens) into a 1M token context window on every prompt. High cost, 10x slower inference, massive compute waste.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                    <h3 className="text-sm font-mono font-bold text-emerald-500">
                      Approach B: RAG & Chunk Retrieval
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Chunking the PDF into small 500-token vectors. Retrieving only the 3 most relevant pages (~1,500 tokens) and injecting them into the prompt. Fast, cheap, exact.
                    </p>
                  </div>
                </div>
                <div className="my-6">
                  <Mermaid chart={pdfLifecycleChart} />
                </div>
              </section>

              {/* Section 3 */}
              <section id="architecture" className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
                  3 // The Multi-Tiered Context Management Pipeline
                </h2>
                <p>
                  Production systems like ChatGPT use a hybrid, multi-tier strategy that combines the immediacy of short-term memory with the efficiency of vector retrieval and semantic summarization.
                </p>
                
                <div className="space-y-6 my-8">
                  <div className="p-6 rounded-2xl bg-slate-100/80 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold">
                        Tier 1
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Sliding Window Buffer (Immediate Attention)
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Keeps the last N turns (e.g., last 10 messages) raw and uncompressed in the prompt. This ensures 100% exact fidelity for immediate back-and-forth context, pronouns, and quick follow-ups.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-100/80 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                        Tier 2
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Hierarchical Summarization (Background Rollup)
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      As older turns fall out of the sliding window, background worker processes condense them into structured bullet points or executive summaries. A 5,000-token exchange is compressed into a 200-token summary block.
                    </p>
                    <div className="my-4">
                      <Mermaid chart={compressionChart} />
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-100/80 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 text-xs font-mono font-bold">
                        Tier 3
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Persistent Memory & Vector Profile Retrieval
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Explicit user preferences (e.g., "Always write code in TypeScript", "I live in San Francisco") are extracted asynchronously by a secondary LLM worker, embedded, and saved in a vector store. When relevant, these facts are fetched and dynamically injected into the system prompt.
                    </p>
                    <div className="my-4">
                      <Mermaid chart={memoryChart} />
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="inference-optimizations" className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
                  4 // System Optimization: KV Caching & vLLM PagedAttention
                </h2>
                <p>
                  Summarizing and retrieving context reduces token counts, but at the GPU infrastructure level, processing long prompts still incurs heavy memory overhead due to key-value (KV) activations.
                </p>
                <p>
                  When a model generates tokens sequentially, calculating key and value vectors for past tokens on every step is redundant. Modern serving frameworks (vLLM, TensorRT-LLM) use <strong>KV Caching</strong> and <strong>PagedAttention</strong>:
                </p>

                <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-4 my-6">
                  <h3 className="text-base font-bold text-cyan-300 font-mono">
                    How PagedAttention Prevents VRAM Waste
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
                    <li>
                      <strong>Non-Contiguous Allocation:</strong> Similar to OS virtual memory paging, PagedAttention stores KV caches in non-contiguous physical memory blocks, reducing VRAM fragmentation from 60% down to under 4%.
                    </li>
                    <li>
                      <strong>Prefix Caching:</strong> Common system prompts and initial conversation turns are shared across parallel user sessions in GPU memory, avoiding duplicated matrix calculations.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section id="end-to-end-architecture" className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
                  5 // Full End-to-End System Flow
                </h2>
                <p>
                  Bringing all components together results in a robust, low-latency production architecture for long-running conversational AI:
                </p>
                <div className="my-8">
                  <Mermaid chart={endToEndChart} />
                </div>
              </section>

              {/* Section 6 */}
              <section id="key-takeaways" className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
                  6 // Key Engineering Takeaways
                </h2>
                <div className="grid grid-cols-1 gap-4 my-6">
                  {study.engineeringLearnings.map((learning, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
                      <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {learning}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

            </article>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  // Fallback default case study rendering
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(studySchema) }}
      />
      <Header />
      <div className="pt-32 pb-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] animate-fade-in space-y-10">
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline mb-6"
            >
              ← Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 mb-4 select-none">
              <span className="font-semibold">{study.category}</span>
              <span>•</span>
              <span className="font-semibold">{study.readTime}</span>
              <span>•</span>
              <span className="font-semibold">{study.date}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
              {study.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed italic">
              {study.subtitle}
            </p>
          </div>

          <div className="space-y-12">
            <section id="problem-context" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                01 // Problem & Context
              </h2>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                {study.whyItExists}
              </p>
            </section>

            <section id="system-architecture" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                02 // System Architecture
              </h2>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                {study.systemArchitecture.overview}
              </p>

              {study.systemArchitecture.diagramMermaid ? (
                <div className="my-6">
                  <Mermaid chart={study.systemArchitecture.diagramMermaid} />
                </div>
              ) : (
                <pre className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 overflow-x-auto font-mono text-sm leading-relaxed my-6 text-slate-850 dark:text-slate-200">
                  <code>{study.systemArchitecture.diagramDescription}</code>
                </pre>
              )}

              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">
                  Architecture Components:
                </span>
                <ul className="list-disc pl-6 space-y-3 text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100">
                  {study.systemArchitecture.keyComponents.map((comp, idx) => (
                    <li key={idx}>{comp}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="design-decisions" className="scroll-mt-24 space-y-8">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                03 // Critical Design Decisions & Trade-Offs
              </h2>

              <div className="space-y-8">
                {study.designDecisions.map((dd, idx) => (
                  <div
                    key={idx}
                    className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 bg-slate-950/60"
                  >
                    <h3 className="text-lg font-bold text-white font-mono">
                      Decision #{idx + 1}: {dd.decision}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <strong className="text-white">Context: </strong>
                      {dd.context}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                          Chosen Option
                        </span>
                        <p className="text-sm font-semibold text-white">
                          {dd.chosenOption}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                        <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider block">
                          Rejected Option
                        </span>
                        <p className="text-sm font-semibold text-slate-300 line-through opacity-80">
                          {dd.rejectedOption}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold block mb-1">
                        Trade-Off Rationale:
                      </span>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {dd.tradeOffRationale}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="bottlenecks" className="scroll-mt-24 space-y-8">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                04 // Scaling & Bottleneck Post-Mortems
              </h2>

              <div className="space-y-6">
                {study.scalingAndBottlenecks.map((sb, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4"
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <h3 className="text-base font-bold text-rose-300 font-mono">
                        Bottleneck #{idx + 1}: {sb.bottleneck}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                        {sb.metricImprovement}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-slate-400 uppercase">
                          System Impact
                        </span>
                        <p className="text-slate-200">{sb.impact}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-emerald-400 uppercase">
                          Architectural Solution
                        </span>
                        <p className="text-slate-200">{sb.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="learnings" className="scroll-mt-24 space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                05 // Key Takeaways & Architectural Guidance
              </h2>

              <ul className="space-y-4">
                {study.engineeringLearnings.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/15 flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-slate-200 text-sm leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
