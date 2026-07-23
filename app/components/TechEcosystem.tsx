"use client";

import { useState, useRef, useEffect } from "react";
import {
  Cpu,
  Sparkles,
  ExternalLink,
  Code2,
  Calendar,
  Layers,
  Award,
  GitBranch,
} from "lucide-react";
import {
  techNodes,
  techCategories,
  TechNode,
  TechCategory,
} from "../data/techEcosystemData";

export default function TechEcosystem(): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(techNodes[0]); // Default to Python
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const filteredNodes = techNodes.filter((node) => {
    if (selectedCategory === "all") return true;
    return node.category === selectedCategory;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };
    window.addEventListener("resize", handleResize);

    // Position nodes on a 2D canvas grid
    const nodePositions = filteredNodes.map((node, index) => {
      const cols = 5;
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = (width / (cols + 1)) * (col + 1) + (Math.sin(index) * 20);
      const y = (height / 5) * (row + 1.2) + (Math.cos(index) * 15);
      return {
        node,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: node.id === hoveredNode?.id ? 14 : 10,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");

      // 1. Draw Synaptic Connecting Lines between related technologies
      for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
          const n1 = nodePositions[i];
          const n2 = nodePositions[j];

          const isConnected =
            n1.node.connectedTechIds.includes(n2.node.id) ||
            n2.node.connectedTechIds.includes(n1.node.id);

          if (isConnected) {
            const isHighlighted =
              hoveredNode &&
              (n1.node.id === hoveredNode.id || n2.node.id === hoveredNode.id);

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = isHighlighted
              ? "rgba(99, 102, 241, 0.7)"
              : isDark
              ? "rgba(255, 255, 255, 0.06)"
              : "rgba(0, 0, 0, 0.06)";
            ctx.lineWidth = isHighlighted ? 2 : 1;
            ctx.stroke();
          }
        }
      }

      // 2. Draw Floating Nodes
      nodePositions.forEach((np) => {
        // Floating movement
        np.x += np.vx;
        np.y += np.vy;

        if (np.x < 30 || np.x > width - 30) np.vx *= -1;
        if (np.y < 30 || np.y > height - 30) np.vy *= -1;

        const isHovered = hoveredNode && np.node.id === hoveredNode.id;
        const isConnectedToHovered =
          hoveredNode &&
          (np.node.connectedTechIds.includes(hoveredNode.id) ||
            hoveredNode.connectedTechIds.includes(np.node.id));

        // Node Glow Ring
        ctx.beginPath();
        ctx.arc(np.x, np.y, np.radius + (isHovered ? 6 : 0), 0, Math.PI * 2);
        ctx.fillStyle = isHovered
          ? "rgba(99, 102, 241, 0.3)"
          : isConnectedToHovered
          ? "rgba(6, 182, 212, 0.2)"
          : isDark
          ? "rgba(255, 255, 255, 0.02)"
          : "rgba(0, 0, 0, 0.02)";
        ctx.fill();

        // Core Circle
        ctx.beginPath();
        ctx.arc(np.x, np.y, np.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? "#818CF8" : isConnectedToHovered ? "#22D3EE" : isDark ? "#334155" : "#CBD5E1";
        ctx.fill();
        ctx.strokeStyle = isHovered ? "#6366F1" : isDark ? "#475569" : "#94A3B8";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Text Label below node
        ctx.font = isHovered ? "bold 11px monospace" : "10px monospace";
        ctx.fillStyle = isHovered
          ? (isDark ? "#FFFFFF" : "#1E293B")
          : isConnectedToHovered
          ? "#06B6D4"
          : (isDark ? "#94A3B8" : "#475569");
        ctx.textAlign = "center";
        ctx.fillText(np.node.name, np.x, np.y + np.radius + 14);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [filteredNodes, hoveredNode]);

  return (
    <section id="tech-ecosystem" className="py-28 px-4 sm:px-6 relative bg-radial-glow">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" /> 02 // Interactive Tech Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Interactive AI Tech Ecosystem
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Hover over any technology node to explore proficiency levels, years used, research projects, and connected neural dependencies.
          </p>

          {/* Category Filter Pills Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-slate-100/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 max-w-5xl">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 font-semibold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
              }`}
            >
              All Ecosystem ({techNodes.length})
            </button>
            {techCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 font-semibold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Network Graph & Detailed Interactive Card Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Canvas & Node Grid */}
          <div className="lg:col-span-7 space-y-6">
            {/* Animated Canvas Node Graph */}
            <div className="glass-card rounded-3xl p-4 border border-slate-200 dark:border-white/10 relative overflow-hidden bg-slate-50/50 dark:bg-slate-955/80 shadow-2xl">
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-150 dark:border-white/5 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                  Live Synaptic Network Graph
                </span>
                <span>{filteredNodes.length} Active Nodes</span>
              </div>
              <div className="relative w-full h-[360px]">
                <canvas ref={canvasRef} className="w-full h-full block" />
              </div>
            </div>

            {/* Interactive Node Chips Grid */}
            <div className="flex flex-wrap gap-2.5">
              {filteredNodes.map((node) => {
                const isHovered = hoveredNode?.id === node.id;

                return (
                  <button
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node)}
                    onClick={() => setHoveredNode(node)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer border flex items-center gap-2 ${
                      isHovered
                        ? "bg-indigo-600/90 text-white border-indigo-400 shadow-lg shadow-indigo-500/30 scale-105"
                        : "bg-slate-100/50 dark:bg-white/[0.03] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-slate-350 dark:hover:border-white/25 hover:bg-slate-200/50 dark:hover:bg-white/10"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: node.color }}
                    ></span>
                    <span>{node.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hover Node Detail Card */}
          <div className="lg:col-span-5 sticky top-28">
            {hoveredNode ? (
              <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/15 space-y-6 bg-slate-50/95 dark:bg-slate-950/90 shadow-2xl animate-in fade-in duration-200">
                {/* Tech Title & Category */}
                <div className="border-b border-slate-150 dark:border-white/10 pb-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-550/20 dark:border-indigo-500/30 text-indigo-650 dark:text-indigo-305 text-[11px] font-mono">
                      {hoveredNode.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-550 dark:text-indigo-400" />
                      {hoveredNode.yearsUsed}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight pt-1">
                    {hoveredNode.name}
                  </h3>
                </div>

                {/* Proficiency Meter */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-slate-400">Proficiency Level</span>
                    <span className="text-indigo-650 dark:text-indigo-300 font-bold">
                      {hoveredNode.proficiency}% — {hoveredNode.proficiencyLevel}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-900 overflow-hidden border border-slate-300 dark:border-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
                      style={{ width: `${hoveredNode.proficiency}%` }}
                    ></div>
                  </div>
                </div>

                {/* Applied Projects */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-550 dark:text-indigo-400" /> Real-World Projects ({hoveredNode.projects.length})
                  </span>
                  <div className="space-y-2">
                    {hoveredNode.projects.map((proj, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-mono flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
                        <span>{proj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Dependencies */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">
                    Connected Tech Dependencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {hoveredNode.connectedTechIds.map((cId) => {
                      const cNode = techNodes.find((n) => n.id === cId);
                      if (!cNode) return null;
                      return (
                        <span
                          key={cId}
                          className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/20 text-[11px] font-mono text-indigo-700 dark:text-indigo-200"
                        >
                          {cNode.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Related Repository Action Link */}
                <div className="pt-2 border-t border-slate-150 dark:border-white/5">
                  <a
                    href={hoveredNode.relatedRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/15 border border-slate-350 dark:border-white/10 transition-all w-full justify-center"
                  >
                    <GitBranch className="w-3.5 h-3.5 text-indigo-550 dark:text-indigo-400" />
                    <span>View Related Repositories</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-white/10 text-center text-slate-500 dark:text-slate-400 text-sm">
                Hover over a technology node to inspect details.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
