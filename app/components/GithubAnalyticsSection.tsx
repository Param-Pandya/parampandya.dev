"use client";

import Link from "next/link";
import {
  GitCommit,
  Star,
  GitFork,
  Flame,
  ArrowRight,
  Code2,
  ExternalLink,
} from "lucide-react";
import { githubProfile, languageDistribution, pinnedRepos } from "../data/githubData";

export default function GithubAnalyticsSection(): React.JSX.Element {
  return (
    <section id="github-analytics" className="py-24 px-4 sm:px-6 relative bg-grid-pattern">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-650 dark:text-emerald-300 text-xs font-mono tracking-widest uppercase mb-4">
              <GitCommit className="w-3.5 h-3.5" /> 05 // Open Source & Code Activity
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Live GitHub Analytics
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Open-source machine learning repositories, commit frequency metrics, and language distributions.
            </p>
          </div>

          <div>
            <Link
              href="/analytics"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Explore GitHub Analytics</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-white/10 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {githubProfile.totalContributionsThisYear}+
            </div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Total Commits (2024)</div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-white/10 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
              {githubProfile.totalRepos}
            </div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Public Repositories</div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-white/10 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
              {githubProfile.totalStars}
            </div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">GitHub Stars</div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-white/10 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 font-mono flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 fill-rose-650 dark:fill-rose-400" /> {githubProfile.currentStreakDays}d
            </div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Current Commit Streak</div>
          </div>
        </div>

        {/* Pinned Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pinnedRepos.slice(0, 2).map((repo) => (
            <a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4 flex flex-col justify-between group transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-indigo-650 dark:text-indigo-300 font-bold flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> {repo.name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-150 dark:border-white/5">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: repo.languageColor }}
                  ></span>
                  <span>{repo.language}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
                    {repo.forks}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
