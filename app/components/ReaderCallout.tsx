"use client";

import { Lightbulb, Cpu, AlertTriangle, CheckCircle2, BookOpen } from "lucide-react";

type CalloutType = "insight" | "note" | "warning" | "research" | "practice";

interface ReaderCalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export default function ReaderCallout({ type, title, children }: ReaderCalloutProps) {
  // Configure colors and icons dynamically
  const config = {
    insight: {
      icon: Lightbulb,
      borderClass: "border-amber-500",
      bgClass: "bg-amber-500/5 dark:bg-amber-500/10",
      textClass: "text-amber-800 dark:text-amber-200",
      iconClass: "text-amber-500",
      defaultTitle: "Key Insight",
    },
    note: {
      icon: Cpu,
      borderClass: "border-indigo-500",
      bgClass: "bg-indigo-500/5 dark:bg-indigo-500/10",
      textClass: "text-indigo-900 dark:text-indigo-200",
      iconClass: "text-indigo-500",
      defaultTitle: "Engineering Note",
    },
    warning: {
      icon: AlertTriangle,
      borderClass: "border-rose-500",
      bgClass: "bg-rose-500/5 dark:bg-rose-500/10",
      textClass: "text-rose-900 dark:text-rose-200",
      iconClass: "text-rose-500",
      defaultTitle: "Warning",
    },
    research: {
      icon: BookOpen,
      borderClass: "border-cyan-500",
      bgClass: "bg-cyan-500/5 dark:bg-cyan-500/10",
      textClass: "text-cyan-900 dark:text-cyan-200",
      iconClass: "text-cyan-500",
      defaultTitle: "Research Note",
    },
    practice: {
      icon: CheckCircle2,
      borderClass: "border-emerald-500",
      bgClass: "bg-emerald-500/5 dark:bg-emerald-500/10",
      textClass: "text-emerald-900 dark:text-emerald-200",
      iconClass: "text-emerald-500",
      defaultTitle: "Best Practice",
    },
  }[type];

  const IconComponent = config.icon;

  return (
    <div
      className={`my-6 p-5 rounded-2xl border-l-4 border-y border-r border-slate-200/40 dark:border-white/5 shadow-md flex gap-4 ${config.borderClass} ${config.bgClass} ${config.textClass}`}
    >
      <div className="flex-shrink-0 pt-0.5">
        <IconComponent className={`w-5 h-5 ${config.iconClass}`} />
      </div>

      <div className="space-y-1 flex-1 min-w-0">
        <span className="text-xs font-mono font-bold uppercase tracking-wider block select-none">
          {title || config.defaultTitle}
        </span>
        <div className="text-sm leading-relaxed font-normal">{children}</div>
      </div>
    </div>
  );
}
