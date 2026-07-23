import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getBlogPosts, getPostBySlug, extractToc } from "../../../lib/markdown";
import { ArrowLeft, Clock } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) {
    return { title: "Post Not Found | Param Pandya" };
  }
  return {
    title: `${post.title} | Param Pandya Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.publishedDate).toISOString(),
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Extract headings for Table of Contents
  const toc = extractToc(post.rawMarkdown);

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage,
    "datePublished": new Date(post.publishedDate).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "url": "https://github.com/Param-Pandya",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Param Pandya Portfolio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://github.com/Param-Pandya.png",
      },
    },
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header />
      
      {/* JSON-LD Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-32 pb-24 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl flex flex-col lg:flex-row gap-10">
          
          {/* Main Article Content Container */}
          <article className="flex-1 max-w-[800px] space-y-10 order-2 lg:order-1">
            
            {/* Header Metadata Block */}
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-650 dark:text-indigo-400 hover:underline mb-6"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
              </Link>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 mb-4 select-none">
                <span className="font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">{post.category}</span>
                <span>•</span>
                <span className="font-semibold">{post.readingTime}</span>
                <span>•</span>
                <span className="font-semibold">{post.publishedDate}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
                {post.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-650 dark:text-slate-400 leading-relaxed italic border-l-2 border-emerald-500 pl-4 py-1 bg-slate-100/50 dark:bg-white/[0.01] rounded-r-xl">
                {post.excerpt}
              </p>
            </div>

            {/* Render Compiled HTML Content */}
            <div 
              className="space-y-4 prose prose-slate dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tag Badges Footer Block */}
            <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 mt-12">
              <div className="flex flex-wrap gap-1.5 select-none">
                {post.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.04] text-xs font-mono text-slate-650 dark:text-slate-400 border border-slate-200 dark:border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-350 transition-all border border-slate-200 dark:border-white/5"
              >
                <span>Explore More Articles</span>
              </Link>
            </div>

          </article>

          {/* Sidebar Navigation Block (TOC & Reading Progress) */}
          {toc.length > 0 && (
            <aside className="w-full lg:w-60 order-1 lg:order-2 shrink-0 select-none">
              <div className="sticky top-28 space-y-6 bg-slate-100/50 dark:bg-white/[0.02] p-5 rounded-2xl border border-slate-200 dark:border-white/5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" /> Page Outline
                </h4>
                <ul className="space-y-2.5 text-xs font-mono">
                  {toc.map((item, idx) => (
                    <li 
                      key={idx}
                      style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
                    >
                      <a 
                        href={`#${item.id}`} 
                        className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-450 transition-colors line-clamp-1 block"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

        </div>
      </div>

      <Footer />
    </main>
  );
}
