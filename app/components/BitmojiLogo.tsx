"use client";

import Image from "next/image";
import Link from "next/link";

interface BitmojiLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function BitmojiLogo({
  size = "md",
  showText = true,
}: BitmojiLogoProps): React.JSX.Element {
  const dimensionMap = {
    sm: { avatar: "w-8 h-8", text: "text-xs", badge: "w-1.5 h-1.5" },
    md: { avatar: "w-10 h-10", text: "text-sm", badge: "w-2 h-2" },
    lg: { avatar: "w-14 h-14", text: "text-base", badge: "w-2.5 h-2.5" },
  };

  const currentSize = dimensionMap[size];

  return (
    <Link href="/" className="inline-flex items-center gap-3 group">
      {/* Avatar Container with me.png & me-glow.png on hover */}
      <div className={`relative ${currentSize.avatar} rounded-xl overflow-hidden border border-indigo-500/40 bg-slate-900 shadow-md shadow-indigo-500/20 group-hover:scale-105 group-hover:border-indigo-400 transition-all duration-300`}>
        {/* Glow Layer */}
        <Image
          src="/assets/me-glow.png"
          alt="Param Pandya Glow"
          fill
          sizes="(max-width: 768px) 40px, 60px"
          className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          priority
        />
        {/* Main Photo Layer */}
        <Image
          src="/assets/me.png"
          alt="Param Pandya Avatar"
          fill
          sizes="(max-width: 768px) 40px, 60px"
          className="object-cover group-hover:opacity-90 transition-opacity duration-300"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/30 via-transparent to-cyan-500/10 pointer-events-none"></div>
      </div>

      {/* Brand Text & AI Engineer Title */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-extrabold tracking-tight text-white group-hover:text-indigo-300 transition-colors ${currentSize.text}`}>
            PARAM PANDYA
          </span>
          <span className="text-[10px] font-mono text-indigo-400 tracking-wider flex items-center gap-1.5 font-semibold">
            <span className={`relative flex ${currentSize.badge}`}>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500"></span>
            </span>
            AI ENGINEER
          </span>
        </div>
      )}
    </Link>
  );
}
