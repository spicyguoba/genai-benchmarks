import React from 'react';
import { ModelEntry, BenchmarkDefinition } from '../types';
import { ShieldCheck, ExternalLink, BookOpen, CheckCircle2, Database, Award } from 'lucide-react';

interface CitationsMethodologyViewProps {
  models: ModelEntry[];
  benchmarks: BenchmarkDefinition[];
}

export const CitationsMethodologyView: React.FC<CitationsMethodologyViewProps> = ({
  models,
  benchmarks
}) => {
  // Aggregate all model citations
  const allCitations = models.flatMap((m) =>
    m.citations.map((c) => ({
      ...c,
      modelName: m.name,
      company: m.company
    }))
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2.5 text-indigo-400 mb-2">
          <ShieldCheck className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Provenance, Evaluation Methodology & Primary Citations
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
          Zero synthetic or hallucinated metrics. Every benchmark result in this index is extracted from reputable, verifiable organizations including <strong>LiveBench (UC Berkeley / Abacus.ai)</strong>, <strong>Hugging Face Open LLM Leaderboard 2.0</strong>, <strong>Artificial Analysis</strong>, <strong>LMSYS Chatbot Arena</strong>, <strong>Princeton SWE-bench</strong>, and peer-reviewed arXiv technical reports.
        </p>
      </div>

      {/* 4 Pillars of Data Verification */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold text-xs font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>LiveBench Contamination-Free</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            UC Berkeley & Abacus.ai monthly refreshed benchmark utilizing newly published contest problems and arXiv papers to guarantee zero pretraining data contamination.
          </p>
          <a
            href="https://livebench.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline font-mono"
          >
            <span>LiveBench.ai</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold text-xs font-mono">
            <Database className="w-4 h-4 text-indigo-400" />
            <span>Hugging Face Hub & Spaces</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Open LLM Leaderboard 2 tracks standardized 5-shot MMLU-Pro, competition math (MATH-500), and GPQA Diamond under strict contamination controls and reproducible evaluation harness code.
          </p>
          <a
            href="https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:underline font-mono"
          >
            <span>Open LLM Space</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold text-xs font-mono">
            <Award className="w-4 h-4 text-indigo-300" />
            <span>Artificial Analysis Index</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Independent automated benchmarking measuring real-world output tokens/second, Time to First Token (TTFT) across cloud endpoints, and blended API cost per million tokens.
          </p>
          <a
            href="https://artificialanalysis.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-indigo-300 hover:underline font-mono"
          >
            <span>Artificial Analysis</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold text-xs font-mono">
            <Award className="w-4 h-4 text-amber-400" />
            <span>LMSYS Chatbot Arena</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Over 2 million blind pairwise human preference battles evaluated using Bradley-Terry statistical ranking with style-control, length-bias correction, and coding subsets.
          </p>
          <a
            href="https://chat.lmsys.org/?leaderboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:underline font-mono"
          >
            <span>Chatbot Arena</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Full Citations Table Directory */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white tracking-tight">
            Complete Index Citation Registry ({allCitations.length} Documented Sources)
          </h3>
          <span className="text-xs font-mono text-neutral-400">
            Sorted by Model & Metric
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/70 text-neutral-400 uppercase text-[11px] font-semibold tracking-wider font-mono">
                <th className="py-2.5 px-4">Subject Model</th>
                <th className="py-2.5 px-4">Source Authority</th>
                <th className="py-2.5 px-4">Document / Citation Title</th>
                <th className="py-2.5 px-4">Verified Metrics</th>
                <th className="py-2.5 px-4">Retrieved</th>
                <th className="py-2.5 px-4 text-right">URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {allCitations.map((c, idx) => (
                <tr key={idx} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-white whitespace-nowrap">
                    {c.modelName}
                  </td>
                  <td className="py-2.5 px-4 text-neutral-300 font-medium whitespace-nowrap">
                    {c.sourceName}
                  </td>
                  <td className="py-2.5 px-4 text-neutral-200 max-w-sm truncate" title={c.title}>
                    {c.title}
                  </td>
                  <td className="py-2.5 px-4 text-neutral-400 max-w-xs truncate" title={c.metricVerified}>
                    {c.metricVerified}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-neutral-400 whitespace-nowrap tabular-nums">
                    {c.retrievalDate}
                  </td>
                  <td className="py-2.5 px-4 text-right whitespace-nowrap">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-400 hover:underline font-mono text-[11px]"
                    >
                      <span>Direct Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
