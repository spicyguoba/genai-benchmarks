import React, { useState, useRef, useEffect } from 'react';
import { Citation } from '../types';
import { ExternalLink, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

interface CitationPopoverProps {
  citations: Citation[];
  label?: string;
  compact?: boolean;
}

export const CitationPopover: React.FC<CitationPopoverProps> = ({
  citations,
  label = 'Sources',
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!citations || citations.length === 0) {
    return <span className="text-neutral-500 text-xs">—</span>;
  }

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-indigo-400 font-mono transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded ${
          compact ? 'px-1 py-0.5' : 'px-1.5 py-0.5 border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60'
        }`}
        aria-label={`View ${citations.length} verified citations`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
        <span className="tabular-nums">[{citations.length}]</span>
        {!compact && <span className="text-neutral-400 text-[11px]">{label}</span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-80 sm:w-96 rounded-lg bg-neutral-900 border border-neutral-700 shadow-xl z-50 p-3.5 text-xs text-neutral-200">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2.5">
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified Citations ({citations.length})</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">100% Attributable</span>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {citations.map((c, idx) => (
              <div key={idx} className="border-b border-neutral-800/80 last:border-b-0 pb-2.5 last:pb-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-neutral-200">{c.sourceName}</span>
                  <span className="text-[10px] text-neutral-400 font-mono">{c.retrievalDate}</span>
                </div>
                <p className="text-neutral-300 font-medium mb-1 line-clamp-2">{c.title}</p>
                <div className="text-[11px] text-neutral-400 mb-1.5">
                  <span className="text-neutral-500">Metric verified: </span>
                  <span className="text-neutral-300">{c.metricVerified}</span>
                </div>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline font-mono"
                >
                  <span>Open Primary Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
