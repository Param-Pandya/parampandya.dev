"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { blogPosts } from "../data/blogData";

export default function BlogSection(): React.JSX.Element {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-28 px-4 sm:px-6 relative bg-radial-glow">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-mono tracking-widest uppercase mb-4">
              <BookOpen className="w-3.5 h-3.5" /> 04 // AI Research & Technical Writings
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Latest Learning Notes
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Technical breakdowns on Autonomous Agents, RAG optimization, LLM fine-tuning, and Deep Learning.
            </p>
          </div>

          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Explore Learning Notes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-5 group relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer block text-left"
            >
              {/* Cover Image */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-250 dark:border-white/10 bg-slate-100 dark:bg-slate-900">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-white/10 text-[11px] font-mono text-indigo-650 dark:text-indigo-300 font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                      {post.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-650 dark:group-hover:text-indigo-200 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-slate-650 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-150 dark:border-white/5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-indigo-650 dark:text-indigo-400 group-hover:text-indigo-550 dark:group-hover:text-indigo-300 transition-colors">
                    <span>Read Note</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
