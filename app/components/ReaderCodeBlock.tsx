"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface ReaderCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function ReaderCodeBlock({ code, language, filename }: ReaderCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d1117] text-slate-800 dark:text-slate-200 shadow-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-150 dark:bg-[#161b22] border-b border-slate-200 dark:border-slate-800/60 select-none">
        <div className="flex items-center gap-2">
          {filename ? (
            <span className="text-[10px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
              {filename}
            </span>
          ) : (
            <span className="text-[10px] sm:text-xs font-mono text-slate-500 dark:text-slate-500 font-bold uppercase tracking-widest">
              {language || "code"}
            </span>
          )}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
          aria-label="Copy Code to Clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-650 dark:text-emerald-400 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <pre className="p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed no-scrollbar max-h-[500px]">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
