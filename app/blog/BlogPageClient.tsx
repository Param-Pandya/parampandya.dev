"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogPostParsed } from "../../lib/markdown";
import { BookOpen, ArrowRight, Clock, Search, Layers } from "lucide-react";

interface BlogPageClientProps {
  posts: BlogPostParsed[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>(" ");

  const categories = [
    "All",
    "LLMs",
    "Machine Learning",
    "RAG",
    "Agents",
    "AI Systems",
    "MLOps",
    "Python",
    "Computer Vision",
    "Research Notes",
  ];

  // Normalized search query
  const query = searchQuery.trim().toLowerCase();

  // Search logic and Category filter
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      query === "" ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Search Input bar and Category Filter Pills */}
      <div className="flex flex-col items-center gap-6 max-w-5xl mx-auto w-full">
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 select-none pointer-events-none" />
          <input
            type="text"
            placeholder="Search notes, tags or domains..."
            value={searchQuery === " " ? "" : searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/60 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Category Pills - Centered All button on top, other categories in a single non-wrapping horizontal line */}
        <div className="flex flex-col items-center gap-3 w-full select-none">
          {/* Row 1: All Articles Trigger */}
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer shadow-md ${
              selectedCategory === "All"
                ? "bg-emerald-600 text-white shadow-emerald-500/30"
                : "text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/60 border border-slate-250 dark:border-white/10 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
            }`}
          >
            All Learning Notes
          </button>

          {/* Row 2: Specific Categories in a single scrolling/fitting horizontal row */}
          <div className="flex items-center justify-start lg:justify-center gap-2 max-w-full overflow-x-auto lg:overflow-x-visible no-scrollbar py-2 px-8 flex-nowrap scroll-smooth w-full">
            {categories
              .filter((c) => c !== "All")
              .map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/30 font-bold"
                      : "text-slate-500 dark:text-slate-450 bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Conditional Rendering Grid or Coming Soon notes */}
      {selectedCategory === "Research Notes" ? (
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-white/10 bg-slate-950/80 space-y-6 text-center shadow-2xl relative overflow-hidden">
            {/* Background glowing layer */}
            <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none"></div>

            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Layers className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Research Notes
              </h2>
              <p className="text-slate-650 dark:text-slate-350 text-sm leading-relaxed max-w-md mx-auto">
                Insights from research papers, conference publications, implementation notes, and technical literature will be published here.
              </p>
            </div>

            <div className="border-t border-slate-200 dark:border-white/10 pt-6 max-w-sm mx-auto text-left">
              <ul className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                  <span>Paper Summaries</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                  <span>Conference Notes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                  <span>Literature Reviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                  <span>Reading Lists</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                  <span>Implementation Insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                  <span>Reproducibility Notes</span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase animate-pulse">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-16 text-slate-500 font-mono text-sm">
          No learning notes found matching "{query}"
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4 flex flex-col justify-between group bg-slate-950/80 cursor-pointer block text-left transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono select-none">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
                    {post.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readingTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-500 dark:group-hover:text-emerald-350 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-slate-650 dark:text-slate-300 text-xs leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/5">
                <div className="flex flex-wrap gap-1 select-none">
                  {post.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] text-[10px] font-mono text-slate-600 dark:text-slate-450 border border-slate-200/50 dark:border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-450">{post.publishedDate}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>Read Note</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
