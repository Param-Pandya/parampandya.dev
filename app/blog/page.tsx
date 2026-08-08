import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogPageClient from "./BlogPageClient";
import { getBlogPosts } from "../../lib/markdown";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Notes | Param Pandya",
  description: "Technical post-mortems, stateful LLM agent architectures, RAG optimization benchmarks, and PyTorch deep learning notes.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Technical Notes | Param Pandya",
    description: "Technical post-mortems, stateful LLM agent architectures, RAG optimization benchmarks, and PyTorch deep learning notes.",
    type: "website",
    url: "https://parampandya.dev/blog",
    siteName: "Param Pandya | AI Research & Engineering",
    locale: "en_US",
    images: [
      {
        url: "/assets/me-about.jpg",
        width: 1200,
        height: 1200,
        alt: "Param Pandya Technical Notes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Notes | Param Pandya",
    description: "Technical post-mortems, stateful LLM agent architectures, RAG optimization benchmarks, and PyTorch deep learning notes.",
    creator: "@parampandya",
    images: ["/assets/me-about.jpg"],
  },
};

export default async function BlogPage() {
  // Read posts from content/ directory
  const posts = getBlogPosts();

  const blogPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Technical Notes | Param Pandya",
    "description": "Technical post-mortems, stateful LLM agent architectures, RAG optimization benchmarks, and PyTorch deep learning notes.",
    "url": "https://parampandya.dev/blog"
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageSchema) }}
      />
      <Header />

      {/* Hero Header Section */}
      <section className="pt-34 pb-10 px-4 sm:px-6 relative bg-radial-glow overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono tracking-widest uppercase mb-4">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> TECHNICAL WRITING & INSIGHTS
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Notes
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed font-normal mb-6">
            Technical post-mortems, stateful LLM agent architectures, RAG optimization benchmarks, and PyTorch deep learning notes.
          </p>
        </div>
      </section>

      {/* Blog Listing & Interactive Filters Grid */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6 pb-24">
        <BlogPageClient posts={posts} />
      </section>

      <Footer />
    </main>
  );
}
