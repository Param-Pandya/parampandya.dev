"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function Banner(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle neural background network logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const particleCount = Math.min(Math.floor(width / 25), 45);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${p1.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const RESUME_URL = "https://drive.google.com/file/d/1SaLjcokhsq6WCEQ0AS00xRqmCiDAW9Cg/view?usp=sharing";

  return (
    <section id="home" className="relative min-h-[70vh] sm:min-h-[78vh] pt-36 pb-16 px-4 sm:px-6 flex flex-col justify-center overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0"></div>

      <div className="container mx-auto max-w-4xl relative z-10 my-auto text-center flex flex-col items-center">
        {/* Availability Badge */}
        <div className="animate-hero-fade-1 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-mono tracking-wide mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>OPEN TO AI / ML ENGINEERING ROLES</span>
        </div>

        {/* Name Heading */}
        <h1 className="animate-hero-fade-2 text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-4">
          Param Pandya
        </h1>

        {/* Hero Role */}
        <div className="animate-hero-fade-3 inline-block px-4 py-1.5 rounded-xl bg-slate-100/70 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 backdrop-blur-md mb-6">
          <p className="text-xs sm:text-sm font-mono font-semibold text-indigo-650 dark:text-indigo-300 tracking-wide">
            AI Engineer <span className="text-slate-400 dark:text-slate-500 mx-2">•</span> Machine Learning Engineer
          </p>
        </div>

        {/* Hero Description */}
        <p className="animate-hero-fade-4 text-slate-705 dark:text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-8 font-medium">
          AI Engineer specializing in Machine Learning, RAG applications, AI Agents, and Computer Vision. Published IEEE researcher with experience building ML models and robustness pipelines at Indian Institute of Technology (IIT) Indore and Indian Institute of Technology (IIT) Jammu.
        </p>

        {/* Hero Buttons: View Projects & Download Resume */}
        <div className="animate-hero-fade-5 flex flex-wrap items-center justify-center gap-4 mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-350 dark:border-white/20 text-slate-700 dark:text-white transition-all active:scale-95 shadow-md backdrop-blur-md"
          >
            <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Social Links: ONLY GitHub, LinkedIn, Email */}
        <div className="animate-hero-fade-5 flex flex-wrap items-center justify-center gap-3.5 text-xs sm:text-sm font-mono">
          <a
            href="https://github.com/Param-Pandya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-350 dark:border-white/20 text-slate-700 dark:text-white font-semibold transition-all shadow-sm"
          >
            <GithubIcon className="w-4.5 h-4.5 fill-slate-750 dark:fill-white text-slate-700 dark:text-white" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/parampandya/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-355 dark:border-white/20 text-slate-700 dark:text-white font-semibold transition-all shadow-sm"
          >
            <LinkedinIcon className="w-4.5 h-4.5 fill-slate-750 dark:fill-white text-slate-700 dark:text-white" />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:pandyaparam7@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-355 dark:border-white/20 text-slate-700 dark:text-white font-semibold transition-all shadow-sm"
          >
            <Mail className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-300" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </section>
  );
}
