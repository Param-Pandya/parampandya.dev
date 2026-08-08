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

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudiesData.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const study = getCaseStudyBySlug(resolvedParams.slug);
  if (!study) {
    return { title: "Case Study Not Found | Param Pandya" };
  }
  return {
    title: `${study.title} | Engineering Case Study`,
    description: study.subtitle,
    alternates: {
      canonical: `/case-studies/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${study.title} | Engineering Case Study`,
      description: study.subtitle,
      type: "article",
      url: `https://parampandya.dev/case-studies/${resolvedParams.slug}`,
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
      title: `${study.title} | Engineering Case Study`,
      description: study.subtitle,
      creator: "@parampandya",
      images: [study.heroImage],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
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
      "@id": `https://parampandya.dev/case-studies/${study.slug}`
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
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline mb-6"
              >
                ← Back to Blogs
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
    
    style Raw fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style W1 fill:#0f172a,stroke:#6366f1,color:#f8fafc
    style W2 fill:#0f172a,stroke:#6366f1,color:#f8fafc
    style W3 fill:#0f172a,stroke:#6366f1,color:#f8fafc
    style Active fill:#064e3b,stroke:#10b981,color:#f8fafc
    style SA fill:#451a03,stroke:#f59e0b,color:#f8fafc
    style SB fill:#451a03,stroke:#f59e0b,color:#f8fafc
    style SC fill:#451a03,stroke:#f59e0b,color:#f8fafc
    style Rollup fill:#4c0519,stroke:#f43f5e,color:#f8fafc`;

    const inferenceChart = `graph LR
    Query[User Query] --> Cache[Prefix/KV Cache Lookup]
    Cache -->|Cache Hit| Skip[Skip Prefill Compute]
    Cache --> Paged[PagedAttention Allocator]
    Paged -->|Virtual Memory| Evict[Eliminate VRAM Waste]
    Paged --> GPU[GPU Core Exec]
    
    style Query fill:#0f172a,stroke:#3b82f6,color:#f8fafc
    style Cache fill:#0f172a,stroke:#f59e0b,color:#f8fafc
    style Skip fill:#064e3b,stroke:#10b981,color:#f8fafc
    style Paged fill:#0f172a,stroke:#6366f1,color:#f8fafc
    style Evict fill:#064e3b,stroke:#10b981,color:#f8fafc
    style GPU fill:#4c0519,stroke:#f43f5e,color:#f8fafc`;

    return (
      <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(studySchema) }}
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js"
          strategy="lazyOnload"
        />
        <Header />

        <div className="pt-32 pb-24 px-4 sm:px-6">
          <div className="mx-auto max-w-[800px] animate-fade-in space-y-10">
            {/* Header / Meta Block */}
            <div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline mb-6"
              >
                ← Back to Blogs
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

            {/* Executive Summary */}
            <section className="space-y-4">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Executive Summary
              </h2>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                Large Language Models (LLMs) operate as memoryless, stateless processors. Consequently, modern conversational applications must continuously append historical context to each new user request. This naive replay approach introduces significant scaling overhead: computational complexity and memory usage for standard transformer self-attention scale quadratically (<span className="font-mono">O(N²)</span>) with sequence length, degrading time-to-first-token (TTFT) latency and inflating infrastructure costs. To alleviate these bottlenecks, production architectures employ a hybrid memory paradigm. This case study analyzes the technical implementation and design trade-offs of key optimizations—specifically sliding context windows, semantic vector retrieval (RAG), tree-structured recursive summarization, key-value (KV) caching, and paged memory allocation (PagedAttention)—which collectively allow systems to scale to long dialogue sessions while minimizing VRAM footprint and server-side compute.
              </p>
            </section>

            <section className="pt-2">
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                This case study draws on publicly available research papers, open-source serving architectures, and standard production engineering practice to examine how large language model (LLM) applications sustain long-running dialogue and large context windows without exhausting GPU infrastructure. Specific implementation choices differ across commercial providers such as OpenAI, Anthropic, and Google. Where a provider has documented a choice explicitly, that is noted below; where the internal mechanics remain proprietary, the description reflects prevailing open engineering practice rather than confirmed fact.
              </p>
            </section>

            {/* 1. The problem: the computational cost of full history */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                1. The problem: the computational cost of full history
              </h2>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                LLMs are stateless. A model retains no memory of a session on its own; to simulate continuous dialogue, the host application resends prior messages as part of the prompt on every turn.
              </p>

              <Mermaid chart={naiveFlowChart} />

              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                As a conversation grows, this approach runs into a few concrete limits. Self-attention in a standard transformer scales at <span className="font-mono">O(N²)</span> in time and memory with respect to sequence length <span className="font-mono">N</span>, so doubling the context roughly quadruples the compute needed during prefill. Processing tens of thousands of historical tokens before producing the first new word also drives up time-to-first-token, which users notice directly as lag. And because GPU memory and energy use scale with context size, resending the same static history on every turn adds cost that compounds across millions of concurrent sessions.
              </p>
            </section>

            {/* 2. Token dynamics and context limits */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                2. Token dynamics and context limits
              </h2>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                Models operate on tokens, sub-word units averaging around four characters or three-quarters of a word in English.
              </p>
              <pre className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 overflow-x-auto font-mono text-sm leading-relaxed my-6 text-slate-800 dark:text-slate-200">
                <code>
                  Raw Text:    &quot;Managing context efficiency is critical.&quot;{"\n"}
                  Tokenized:  [&quot;Man&quot;, &quot;aging&quot;, &quot; context&quot;, &quot; efficiency&quot;, &quot; is&quot;, &quot; critical&quot;, &quot;.&quot;]
                </code>
              </pre>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                Production models now expose context windows ranging from 128k tokens up to over a million, but the maximum window is a ceiling, not a target for routine use.
              </p>

              {/* Table */}
              <div className="overflow-x-auto my-6">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10">
                      <th className="py-3 px-4 font-mono font-bold text-indigo-650 dark:text-indigo-400">Architecture / Model</th>
                      <th className="py-3 px-4 font-mono font-bold text-indigo-655 dark:text-indigo-400">Max Context Window</th>
                      <th className="py-3 px-4 font-mono font-bold text-indigo-655 dark:text-indigo-400">Practical Engineering Limit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    <tr className="border-b border-slate-200/50 dark:border-white/5">
                      <td className="py-3 px-4 text-slate-900 dark:text-white font-semibold">GPT-4o class</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-100 font-medium">128,000 tokens</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">Cost, TTFT latency, attention decay (&quot;lost in the middle&quot;)</td>
                    </tr>
                    <tr className="border-b border-slate-200/50 dark:border-white/5">
                      <td className="py-3 px-4 text-slate-900 dark:text-white font-semibold">Anthropic Claude 3.5 / 3.7</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-100 font-medium">200,000+ tokens</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">Prefill execution time, KV-cache memory allocation</td>
                    </tr>
                    <tr className="border-b border-slate-200/50 dark:border-white/5">
                      <td className="py-3 px-4 text-slate-900 dark:text-white font-semibold">Google Gemini 1.5 Pro</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-100 font-medium">1,000,000+ tokens</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">Reliance on linear attention mechanisms and specialized caching</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. A worked example: the 300-page PDF */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                3. A worked example: the 300-page PDF
              </h2>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                Consider a user who uploads a 300-page financial report (roughly 120,000 tokens) and spends two hours asking questions about it.
              </p>

              <Mermaid chart={pdfLifecycleChart} />

              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                A naive implementation would load all 120,000 tokens into the prompt on every turn, producing slow first responses, heavy VRAM use, high per-query cost, and rapid exhaustion of whatever context budget remains for the rest of the conversation.
              </p>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                A retrieval-augmented pipeline avoids this by treating the document as an index rather than as prompt text. The system first parses the PDF and splits it into overlapping chunks of a few hundred tokens each. Each chunk is passed through an embedding model to produce a dense vector representing its meaning, and these vectors are stored in an index built for fast similarity search, such as HNSW inside a vector database. When the user asks something like &quot;What was the Q3 operating margin?&quot;, the system embeds the query and retrieves only the handful of chunks that best match it, typically a few thousand tokens at most. The application then builds a compact prompt: system instructions, the retrieved chunks, recent dialogue, and the user&apos;s question. The model ends up processing a few thousand tokens instead of 120,000 and returns an answer at a fraction of the latency and cost.
              </p>
            </section>

            {/* 4. Sliding windows and session memory */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                4. Sliding windows and session memory
              </h2>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                Conversational systems maintain state by splitting memory into two layers: what the active thread needs right now, and what should persist across threads.
              </p>

              <Mermaid chart={memoryChart} />

              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                A sliding window keeps recent turns in active memory and drops older ones as the token budget fills, on the reasoning that recent messages are the ones most likely to hold live instructions or references. Short-term session context is volatile and tied to the current thread: raw recent turns, local system prompts, tool outputs. Long-term persistent memory works differently — background processes analyze the dialogue and extract stable facts (a user&apos;s preferences, project details, the languages they code in) into a key-value store or knowledge graph, independent of any single thread. When the user opens a new conversation weeks later, relevant facts from that store get pulled back into the base prompt, so information doesn&apos;t simply vanish once it scrolls out of the active window.
              </p>
            </section>

            {/* 5. Compression, summarization, and pruning */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                5. Compression, summarization, and pruning
              </h2>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                For history that needs to stay available within a single session without inflating the token count, systems apply staged compression.
              </p>

              <Mermaid chart={compressionChart} />

              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                A background job periodically condenses older turns into a running summary. In longer conversations, those summaries can themselves be summarized again, forming a tree structure where the system ultimately passes down a top-level summary alongside the current message window. Separately, rule-based or model-based preprocessing can strip low-value tokens — redundant metadata, stop words, verbose formatting — before the prompt reaches GPU memory.
              </p>
            </section>

            {/* 6. Inference engineering: cutting server load */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                6. Inference engineering: cutting server load
              </h2>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                The optimizations above shape what enters the prompt; the layer below governs how the GPU actually processes it, and this is what lets a serving platform support millions of concurrent multi-turn sessions.
              </p>

              <Mermaid chart={inferenceChart} />

              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                During a forward pass, the transformer computes key and value tensors for every token across all attention heads. Recomputing these for messages that haven&apos;t changed since the last turn is wasted work, so systems cache them in GPU memory — the KV cache — and reuse the cached tensors for historical tokens, computing attention only for whatever is new in the current turn.
              </p>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                Storing that cache used to require large contiguous blocks of VRAM, which fragmented memory badly as sessions accumulated. Serving frameworks such as vLLM address this with PagedAttention, borrowing the idea of paged virtual memory from operating systems: the KV cache is split into fixed-size pages that can sit non-contiguously in memory, which lets a GPU hold longer histories per session and share memory more efficiently across concurrent requests. Continuous batching and chunked prefill add a further layer on top of this, interleaving the compute-heavy prefill phase for new prompts with the memory-bound decode phase for token generation, so GPU utilization stays high without stalling active streams.
              </p>
            </section>

            {/* 7. Trade-offs */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                7. Trade-offs
              </h2>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                Every one of these techniques buys efficiency at some cost elsewhere.
              </p>

              {/* Minimal Design Decision Box */}
              <div className="py-6 border-y border-slate-200 dark:border-white/10 font-mono text-sm space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Key Design Trade-off Analyzed:
                </div>
                <div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">CHOSEN: </span>
                  <span className="text-slate-800 dark:text-slate-100">
                    Hybrid Memory Architecture (Sliding Window + Retrieval + Summarization + Persistent Memory + KV Cache)
                  </span>
                </div>
                <div>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">REJECTED: </span>
                  <span className="text-slate-400 dark:text-slate-500 line-through opacity-70">
                    Naive Full Conversation Replay (Reprocessing the entire conversation history on every request)
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto my-6">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10">
                      <th className="py-3 px-4 font-mono font-bold text-indigo-650 dark:text-indigo-400">Optimization Strategy</th>
                      <th className="py-3 px-4 font-mono font-bold text-indigo-655 dark:text-indigo-400">Benefit</th>
                      <th className="py-3 px-4 font-mono font-bold text-indigo-655 dark:text-indigo-400">Trade-off</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    <tr className="border-b border-slate-200/50 dark:border-white/5">
                      <td className="py-3 px-4 text-slate-900 dark:text-white font-semibold">Aggressive truncation</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-100 font-medium">Minimal memory use, fast responses</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">Loses instructions given early in the conversation</td>
                    </tr>
                    <tr className="border-b border-slate-200/50 dark:border-white/5">
                      <td className="py-3 px-4 text-slate-900 dark:text-white font-semibold">Vector search (RAG)</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-100 font-medium">Scales to millions of words</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">Misses queries that need global synthesis rather than keyword matches</td>
                    </tr>
                    <tr className="border-b border-slate-200/50 dark:border-white/5">
                      <td className="py-3 px-4 text-slate-900 dark:text-white font-semibold">Summarization</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-100 font-medium">Retains high-level narrative</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">Can flatten exact numbers, code syntax, or specific facts</td>
                    </tr>
                    <tr className="border-b border-slate-200/50 dark:border-white/5">
                      <td className="py-3 px-4 text-slate-900 dark:text-white font-semibold">Large KV caches</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-100 font-medium">Avoids redundant computation</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">Strains VRAM capacity across many concurrent users</td>
                    </tr>
                    <tr className="border-b border-slate-200/50 dark:border-white/5">
                      <td className="py-3 px-4 text-slate-900 dark:text-white font-semibold">Cross-session memory</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-100 font-medium">Personalized, continuous experience</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">Stale or wrong stored facts can carry into unrelated chats</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 8. Confirmed practice versus industry inference */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                8. Confirmed practice versus industry inference
              </h2>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                KV caching and PagedAttention are documented and deployed across widely used serving frameworks, including vLLM, TensorRT-LLM, and TGI — this is standard, confirmed practice. Retrieval-augmented generation and vector search are likewise standard across enterprise tools and search-augmented LLM products. Explicit user memory systems are a documented feature of commercial platforms, such as ChatGPT&apos;s memory function. Beyond these, the specific heuristics providers use for dynamic prompt compression, internal routing, and cache eviction are not publicly disclosed; what&apos;s described above for those pieces is inferred from general engineering practice, not confirmed against any single provider&apos;s internals.
              </p>
            </section>

            {/* 9. Where this is heading */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                9. Where this is heading
              </h2>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                State space models such as Mamba, and hybrid attention-SSM architectures, aim to replace quadratic attention with roughly linear scaling for long sequences. Memory systems are also moving past flat vector similarity search toward knowledge graphs that preserve structured relationships between concepts, events, and entities over time. And some newer models are beginning to manage their own context — writing scratch notes, discarding stale variables, consolidating state — as part of execution rather than as an external service wrapped around them.
              </p>
            </section>

            {/* Conclusion */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                Conclusion
              </h2>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                Sustaining dialogue in LLM systems is a systems engineering challenge as much as an algorithmic one. While raw context windows continue to scale to millions of tokens, the operational costs, retrieval performance decay (&quot;lost in the middle&quot;), and latency bottlenecks demand sophisticated optimization techniques. Production-grade platforms successfully navigate these constraints by combining stateless LLM cores with stateful orchestration layers: managing short-term dialogue via KV caching and sliding windows, distilling historical threads with background summarization pipelines, and indexing long-term documents via semantic retrieval. As architectures transition toward linear-scaling models (such as State Space Models) and native, model-managed memory loops, the separation between compute and long-term context will continue to blur, paving the way for more autonomous and resource-efficient AI agents.
              </p>
            </section>

            {/* References */}
            <section id="references" className="pt-8 border-t border-slate-200 dark:border-white/10 mt-16">
              <h2 className="text-[16px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-12 mb-4 font-mono">
                References
              </h2>
              <ol className="list-decimal pl-5 space-y-3 text-[14px] leading-[1.6] text-slate-500 dark:text-slate-400">
                <li>
                  Vaswani, A., et al. (2017). <em>Attention Is All You Need.</em> Advances in Neural Information Processing Systems (NeurIPS). <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer" className="text-indigo-650 dark:text-indigo-400 hover:underline">arXiv:1706.03762</a>
                </li>
                <li>
                  Kwon, W., et al. (2023). <em>Efficient Memory Management for Large Language Model Serving with PagedAttention (vLLM).</em> Next.js SOSP paper indexing. <a href="https://arxiv.org/abs/2309.06180" target="_blank" rel="noopener noreferrer" className="text-indigo-655 dark:text-indigo-400 hover:underline">arXiv:2309.06180</a>
                </li>
                <li>
                  Gu, A., &amp; Dao, T. (2023). <em>Mamba: Linear-Time Sequence Modeling with Selective State Spaces.</em> <a href="https://arxiv.org/abs/2312.00752" target="_blank" rel="noopener noreferrer" className="text-indigo-655 dark:text-indigo-400 hover:underline">arXiv:2312.00752</a>
                </li>
                <li>
                  Liu, N. F., et al. (2023). <em>Lost in the Middle: How Language Models Use Long Contexts.</em> Transactions of the Association for Computational Linguistics (TACL). <a href="https://arxiv.org/abs/2307.03172" target="_blank" rel="noopener noreferrer" className="text-indigo-655 dark:text-indigo-400 hover:underline">arXiv:2307.03172</a>
                </li>
                <li>
                  OpenAI. (2024). <em>Memory and New Controls for ChatGPT.</em> Official Product Documentation &amp; Release Notes.
                </li>
                <li>
                  Anthropic. (2024). <em>Prompt Caching in Claude.</em> Anthropic Engineering Documentation.
                </li>
                <li>
                  LangChain Development Team. (2024). <em>Conceptual Documentation: Retrieval-Augmented Generation (RAG) &amp; Conversational Memory Systems.</em>
                </li>
              </ol>
            </section>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  // Fallback for standard layout (if another case study is ever queried)
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(studySchema) }}
      />
      <Header />
      <div className="pt-32 pb-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[800px] animate-fade-in space-y-10">
          
          {/* Header Metadata */}
          <div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline mb-6"
            >
              ← Back to Blogs
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
            {/* Why it exists */}
            <section id="problem-context" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                01 // Problem & Context
              </h2>
              <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                {study.whyItExists}
              </p>
            </section>

            {/* System Architecture */}
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

            {/* Design Decisions */}
            <section id="design-decisions" className="scroll-mt-24 space-y-8">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                03 // Critical Design Decisions & Trade-Offs
              </h2>
              {study.designDecisions.map((dd, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mt-12 mb-4 font-mono">
                    Decision #{idx + 1}: {dd.decision}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 italic text-sm mb-4">
                    Context: &quot;{dd.context}&quot;
                  </p>

                  <div className="space-y-2 font-mono text-sm">
                    <div>
                      <span className="text-emerald-650 dark:text-emerald-400 font-bold">CHOSEN: </span>
                      <span className="text-slate-800 dark:text-slate-100">{dd.chosenOption}</span>
                    </div>
                    <div>
                      <span className="text-rose-650 dark:text-rose-400 font-bold">REJECTED: </span>
                      <span className="line-through opacity-70 text-slate-400 dark:text-slate-500">{dd.rejectedOption}</span>
                    </div>
                  </div>
                  <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100 mb-8">
                    {dd.tradeOffRationale}
                  </p>
                </div>
              ))}
            </section>

            {/* Scaling Bottlenecks */}
            <section id="scaling-bottlenecks" className="scroll-mt-24 space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                04 // Scaling Bottlenecks & Post-Mortems
              </h2>
              <div className="space-y-6">
                {study.scalingAndBottlenecks.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-lg font-semibold text-rose-500 dark:text-rose-400 font-mono">
                      ⚠️ Bottleneck: {item.bottleneck}
                    </h3>
                    <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100">
                      <strong>Impact:</strong> {item.impact}
                    </p>
                    <p className="text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100">
                      <strong>Solution:</strong> {item.solution}
                    </p>
                    <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400">
                      Metric Result: {item.metricImprovement}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Learnings */}
            <section id="learnings" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-16 mb-6 scroll-mt-24 font-mono">
                05 // Key Engineering Learnings
              </h2>
              <ul className="list-disc pl-6 space-y-3 text-[18px] leading-[1.7] font-medium tracking-[0.01em] text-slate-700 dark:text-slate-100">
                {study.engineeringLearnings.map((learning, idx) => (
                  <li key={idx}>{learning}</li>
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
