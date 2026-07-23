"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  GitCommit,
  GitBranch,
  Star,
  GitFork,
  Code2,
  Calendar,
  Flame,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Activity,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import {
  githubProfile,
  languageDistribution,
  pinnedRepos,
  recentCommits,
  generateContributionMatrix,
  ContributionDay,
} from "../data/githubData";

export default function AnalyticsPage(): React.JSX.Element {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  const contributionMatrix = useMemo(() => generateContributionMatrix(), []);

  // Map contribution level to GitHub green intensity
  const getLevelBgColor = (level: number) => {
    switch (level) {
      case 4:
        return "bg-emerald-400 shadow-sm shadow-emerald-400/50";
      case 3:
        return "bg-emerald-500/80";
      case 2:
        return "bg-emerald-600/50";
      case 1:
        return "bg-emerald-800/40";
      default:
        return "bg-white/[0.04]";
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 selection:text-blue-200">

      <Header />

      {/* Hero Header Section */}
      <section className="pt-34 pb-10 px-4 sm:px-6 relative bg-radial-glow overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Profile Quick Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl overflow-hidden border-2 border-indigo-500/40 shadow-xl">
                <Image
                  src={githubProfile.avatarUrl}
                  alt={githubProfile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {githubProfile.name}
                  </h1>
                  <span className="px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-1.5 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Active Contributor
                  </span>
                </div>

                <p className="text-xs font-mono text-indigo-300">
                  @{githubProfile.username} • {githubProfile.bio}
                </p>
              </div>
            </div>

            {/* External Profile Link Button */}
            <div>
              <a
                href={githubProfile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>View GitHub Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Animated Statistics Counters Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-8">
            <div className="glass-card rounded-2xl p-5 border border-white/10 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {githubProfile.totalContributionsThisYear}+
              </div>
              <div className="text-xs font-mono text-slate-400 flex items-center justify-center gap-1">
                <GitCommit className="w-3.5 h-3.5 text-indigo-400" /> Total Commits
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-white/10 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
                {githubProfile.totalRepos}
              </div>
              <div className="text-xs font-mono text-slate-400 flex items-center justify-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Repositories
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-white/10 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                {githubProfile.totalStars}
              </div>
              <div className="text-xs font-mono text-slate-400 flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Stars Earned
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-white/10 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-violet-400 font-mono">
                {githubProfile.totalForks}
              </div>
              <div className="text-xs font-mono text-slate-400 flex items-center justify-center gap-1">
                <GitFork className="w-3.5 h-3.5 text-violet-400" /> Total Forks
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-white/10 text-center space-y-1 col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 text-rose-400 fill-rose-400" /> {githubProfile.currentStreakDays}d
              </div>
              <div className="text-xs font-mono text-slate-400">Current Streak</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 space-y-16 pb-28">
        {/* SECTION 1: 52-Week Contribution Graph Heatmap */}
        <section id="contributions" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                01 // Commit Heatmap Matrix
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                52-Week Contribution Activity
              </h2>
            </div>

            {/* Hover Tooltip Indicator */}
            <div className="text-xs font-mono text-slate-300 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10">
              {hoveredDay
                ? `${hoveredDay.count} commits on ${hoveredDay.date}`
                : `${githubProfile.totalContributionsThisYear} contributions in the last year`}
            </div>
          </div>

          {/* Heatmap Grid Container */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 bg-slate-950/80 shadow-2xl overflow-x-auto">
            <div className="flex gap-1.5 min-w-[720px] justify-between">
              {contributionMatrix.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-sm transition-all duration-200 cursor-pointer ${getLevelBgColor(
                        day.level
                      )} hover:scale-125 hover:z-10`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-white/5">
              <span>52 Weeks (365 Days)</span>
              <div className="flex items-center gap-2">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-white/[0.04]"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-800/40"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-600/50"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-500/80"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-400"></div>
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 & 3: Language Distribution & Pinned Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Languages Breakdown */}
          <section id="languages" className="lg:col-span-5 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                02 // Codebase Distribution
              </span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
                Most Used Languages
              </h2>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6 bg-slate-950/80 shadow-2xl">
              {/* Multi-segment Progress Bar */}
              <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden flex border border-white/10">
                {languageDistribution.map((lang, idx) => (
                  <div
                    key={idx}
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color,
                    }}
                  />
                ))}
              </div>

              {/* Language List */}
              <div className="space-y-3">
                {languageDistribution.map((lang, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs font-mono p-2.5 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      ></span>
                      <span className="text-white font-bold">{lang.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">{lang.bytesFormatted}</span>
                      <span className="text-indigo-300 font-bold">{lang.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pinned Repositories Grid */}
          <section id="pinned" className="lg:col-span-7 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                03 // Featured Repositories
              </span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
                Pinned GitHub Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pinnedRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card glass-card-hover rounded-2xl p-5 border border-white/10 space-y-3 flex flex-col justify-between group transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-indigo-400 font-bold flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5" /> {repo.name}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: repo.languageColor }}
                      ></span>
                      <span>{repo.language}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-violet-400" />
                        {repo.forks}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* SECTION 4: Recent Commits Feed */}
        <section id="commits" className="space-y-6">
          <div className="border-b border-white/10 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-violet-400 uppercase tracking-widest">
                04 // Live Activity Stream
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                Recent Commit History
              </h2>
            </div>
            <GitCommit className="w-7 h-7 text-violet-400 opacity-80 hidden sm:block" />
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/10 bg-slate-950/80 shadow-2xl space-y-3 font-mono">
            {recentCommits.map((commit) => (
              <div
                key={commit.id}
                className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                    {commit.hash}
                  </span>
                  <div>
                    <p className="text-xs text-slate-200 group-hover:text-white font-medium">
                      {commit.message}
                    </p>
                    <span className="text-[11px] text-indigo-400">
                      Repo: {commit.repoName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-end text-xs text-slate-400">
                  <span>{commit.timeAgo}</span>
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
