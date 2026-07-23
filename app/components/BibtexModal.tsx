"use client";

import { useState } from "react";
import { X, Copy, Check, BookOpen, ExternalLink } from "lucide-react";
import { Publication } from "../data/researchData";

interface BibtexModalProps {
  publication: Publication | null;
  onClose: () => void;
}

export default function BibtexModal({
  publication,
  onClose,
}: BibtexModalProps): React.JSX.Element | null {
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [activeTab, setActiveTab] = useState<"bibtex" | "citation">("bibtex");

  if (!publication) return null;

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(publication.bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(publication.citationText);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="glass-card rounded-3xl border border-white/15 w-full max-w-2xl bg-slate-950/95 text-slate-100 p-6 sm:p-8 relative shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <BookOpen className="w-4 h-4" /> Cite Publication
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all"
            aria-label="Close citation modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Paper Title & Venue */}
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {publication.title}
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-1">
            {publication.venue} ({publication.year})
          </p>
        </div>

        {/* Tabs: BibTeX vs Plain Citation */}
        <div className="flex items-center gap-2 border-b border-white/10">
          <button
            onClick={() => setActiveTab("bibtex")}
            className={`px-4 py-2 text-xs font-mono font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === "bibtex"
                ? "border-indigo-500 text-white"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            BibTeX Format
          </button>
          <button
            onClick={() => setActiveTab("citation")}
            className={`px-4 py-2 text-xs font-mono font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === "citation"
                ? "border-indigo-500 text-white"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            APA / Text Citation
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "bibtex" ? (
          <div className="space-y-3">
            <div className="rounded-2xl bg-slate-900 p-4 font-mono text-xs text-indigo-200 border border-white/10 overflow-x-auto relative group">
              <pre className="whitespace-pre-wrap">{publication.bibtex}</pre>
            </div>
            <button
              onClick={handleCopyBibtex}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all active:scale-95 cursor-pointer"
            >
              {copiedBibtex ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>BibTeX Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy BibTeX Code</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-2xl bg-slate-900 p-4 font-mono text-xs text-slate-300 border border-white/10">
              <p>{publication.citationText}</p>
            </div>
            <button
              onClick={handleCopyCitation}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all active:scale-95 cursor-pointer"
            >
              {copiedCitation ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Citation Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Text Citation</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Modal Footer */}
        {publication.paperUrl && publication.paperUrl !== "#" && (
          <div className="pt-2 border-t border-white/5 flex justify-end">
            <a
              href={publication.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>View Original Publication</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
