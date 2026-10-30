import React, { useState } from 'react';
import { ModelEntry, BenchmarkDefinition } from '../types';
import { BENCHMARKS_DATA } from '../data/benchmarksData';
import { formatCurrency, formatMetricNumber } from '../utils/statistics';
import {
  X,
  Trophy,
  ExternalLink,
  ShieldCheck,
  Info,
  CheckCircle2,
  Database,
  Building2,
  FileText
} from 'lucide-react';

interface ModelComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  models: ModelEntry[];
  benchmarks?: BenchmarkDefinition[];
  onRemoveModel: (id: string) => void;
}

export const ModelComparisonModal: React.FC<ModelComparisonModalProps> = ({
  isOpen,
  onClose,
  models,
  benchmarks = BENCHMARKS_DATA,
  onRemoveModel
}) => {
  const [selectedBenchmark, setSelectedBenchmark] = useState<BenchmarkDefinition | null>(null);

  if (!isOpen || models.length === 0) return null;

  // Compute best scores for comparison highlights
  const highestArena = Math.max(...models.map((m) => m.arenaElo));
  const highestCoding = Math.max(...models.map((m) => m.codingScore));
  const highestMath = Math.max(...models.map((m) => m.mathScore));
  const highestReasoning = Math.max(...models.map((m) => m.reasoningScore));
  const lowestCost = Math.min(...models.map((m) => m.costPer1MTokens.blendedUsd));

  const getBenchmarkById = (id: string): BenchmarkDefinition | undefined => {
    return benchmarks.find((b) => b.id === id);
  };

  const getBenchmarkScoreForModel = (model: ModelEntry, benchmarkId: string): { display: string; num: number } => {
    switch (benchmarkId) {
      case 'arena-elo':
        return { display: model.arenaElo > 0 ? `${model.arenaElo} Elo` : '—', num: model.arenaElo };
      case 'swe-bench':
        return { display: model.codingScore > 0 ? `${model.codingScore.toFixed(1)}%` : '—', num: model.codingScore };
      case 'gpqa-diamond':
        return { display: model.reasoningScore > 0 ? `${model.reasoningScore.toFixed(1)}%` : '—', num: model.reasoningScore };
      case 'math-500':
        return { display: model.mathScore > 0 ? `${model.mathScore.toFixed(1)}%` : '—', num: model.mathScore };
      case 'gaia':
        return { display: model.agenticScore > 0 ? `${model.agenticScore.toFixed(1)}%` : '—', num: model.agenticScore };
      case 'livebench':
        return { display: model.intelligenceScore > 0 ? `${(model.intelligenceScore * 0.8).toFixed(1)}/100` : '—', num: model.intelligenceScore * 0.8 };
      default:
        return { display: `${model.intelligenceScore.toFixed(1)} pts`, num: model.intelligenceScore };
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">Side-by-Side Model Comparator</span>
              <span className="text-xs font-mono text-indigo-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                {models.length} Models Selected
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Click on any benchmark row header to pop up full benchmark methodology, dataset details, and evaluation protocols.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close comparator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Table Body */}
        <div className="overflow-x-auto flex-1 p-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            {/* Model Headers Row */}
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="py-3 px-4 w-52 font-mono text-neutral-400 uppercase text-[11px] align-top bg-neutral-950/40">
                  Feature / Benchmark
                </th>
                {models.map((m) => (
                  <th key={m.id} className="py-3 px-4 min-w-[240px] align-top">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-white text-base">{m.name}</div>
                        <div className="text-xs text-neutral-400">
                          {m.company} · {m.tier}
                        </div>
                      </div>
                      {models.length > 2 && (
                        <button
                          onClick={() => onRemoveModel(m.id)}
                          className="text-neutral-500 hover:text-neutral-300 p-1 rounded"
                          title={`Remove ${m.name} from comparison`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-800 font-sans">
              {/* Architecture & Kind */}
              <tr className="hover:bg-neutral-800/30">
                <td className="py-3 px-4 font-mono text-neutral-400 text-xs bg-neutral-950/30">
                  Model Kind
                </td>
                {models.map((m) => (
                  <td key={m.id} className="py-3 px-4 text-neutral-200 font-medium">
                    {m.kind}
                  </td>
                ))}
              </tr>

              {/* Reasoning & Thinking Mode */}
              <tr className="hover:bg-neutral-800/30">
                <td className="py-3 px-4 font-mono text-neutral-400 text-xs bg-neutral-950/30">
                  Thinking Mode
                </td>
                {models.map((m) => (
                  <td key={m.id} className="py-3 px-4">
                    <span
                      className={`inline-flex items-center text-xs font-mono px-2 py-0.5 rounded border ${
                        m.thinkingMode === 'Expert / Deep Research'
                          ? 'bg-purple-950/70 border-purple-800 text-purple-300 font-semibold'
                          : m.thinkingMode === 'High Thinking'
                          ? 'bg-indigo-950/70 border-indigo-800 text-indigo-300 font-semibold'
                          : m.thinkingMode === 'Extended Thinking'
                          ? 'bg-blue-950/70 border-blue-800 text-blue-300 font-semibold'
                          : 'bg-neutral-800/70 border-neutral-700 text-neutral-400'
                      }`}
                    >
                      {m.thinkingMode || 'Standard / Instant'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Parameter Scale */}
              <tr className="hover:bg-neutral-800/30">
                <td className="py-3 px-4 font-mono text-neutral-400 text-xs bg-neutral-950/30">
                  Parameter Scale
                </td>
                {models.map((m) => (
                  <td key={m.id} className="py-3 px-4 font-mono tabular-nums text-white">
                    <span className="font-semibold">{m.parameters.display}</span>
                    {m.parameters.activeBillion && (
                      <span className="text-neutral-400 block text-[11px]">
                        ({m.parameters.activeBillion}B active MoE)
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Context Window */}
              <tr className="hover:bg-neutral-800/30">
                <td className="py-3 px-4 font-mono text-neutral-400 text-xs bg-neutral-950/30">
                  Context Window
                </td>
                {models.map((m) => (
                  <td key={m.id} className="py-3 px-4 font-mono tabular-nums text-neutral-200">
                    {m.contextWindowTokens.toLocaleString()} tokens
                  </td>
                ))}
              </tr>

              {/* BENCHMARK ROW: LMSYS Chatbot Arena Elo (CLICKABLE) */}
              <tr className="hover:bg-neutral-800/40 bg-neutral-950/20">
                <td className="py-3 px-4 bg-neutral-950/50">
                  <button
                    type="button"
                    onClick={() => setSelectedBenchmark(getBenchmarkById('arena-elo') || null)}
                    className="flex items-center gap-1.5 text-left font-mono font-semibold text-indigo-300 hover:text-indigo-200 group transition-colors"
                    title="Click to view LMSYS Chatbot Arena benchmark methodology & details"
                  >
                    <span>LMSYS Arena Elo</span>
                    <Info className="w-3.5 h-3.5 text-indigo-400/80 group-hover:text-indigo-300 transition-transform group-hover:scale-110" />
                  </button>
                  <span className="text-[10px] text-neutral-400 block mt-0.5 font-mono">
                    Click for details
                  </span>
                </td>
                {models.map((m) => {
                  const isLeader = m.arenaElo === highestArena && m.arenaElo > 0;
                  return (
                    <td key={m.id} className="py-3 px-4 font-mono tabular-nums">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-base font-bold ${isLeader ? 'text-indigo-300' : 'text-neutral-200'}`}>
                          {m.arenaElo > 0 ? m.arenaElo : '—'}
                        </span>
                        {isLeader && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-indigo-400 font-sans font-semibold">
                            <Trophy className="w-3 h-3 text-indigo-400" /> Leader
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* BENCHMARK ROW: SWE-bench Verified Coding (CLICKABLE) */}
              <tr className="hover:bg-neutral-800/40 bg-neutral-950/20">
                <td className="py-3 px-4 bg-neutral-950/50">
                  <button
                    type="button"
                    onClick={() => setSelectedBenchmark(getBenchmarkById('swe-bench') || null)}
                    className="flex items-center gap-1.5 text-left font-mono font-semibold text-emerald-400 hover:text-emerald-300 group transition-colors"
                    title="Click to view SWE-bench Verified benchmark methodology & details"
                  >
                    <span>SWE-bench Verified</span>
                    <Info className="w-3.5 h-3.5 text-emerald-500/80 group-hover:text-emerald-300 transition-transform group-hover:scale-110" />
                  </button>
                  <span className="text-[10px] text-neutral-400 block mt-0.5 font-mono">
                    Click for details
                  </span>
                </td>
                {models.map((m) => {
                  const isLeader = m.codingScore === highestCoding && m.codingScore > 0;
                  return (
                    <td key={m.id} className="py-3 px-4 font-mono tabular-nums">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-base font-bold ${isLeader ? 'text-emerald-400' : 'text-neutral-200'}`}>
                          {m.codingScore > 0 ? `${m.codingScore.toFixed(1)}%` : '—'}
                        </span>
                        {isLeader && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 font-sans font-semibold">
                            <Trophy className="w-3 h-3 text-emerald-400" /> Top Code
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* BENCHMARK ROW: LiveBench Contamination-Free (CLICKABLE) */}
              <tr className="hover:bg-neutral-800/40 bg-neutral-950/20">
                <td className="py-3 px-4 bg-neutral-950/50">
                  <button
                    type="button"
                    onClick={() => setSelectedBenchmark(getBenchmarkById('livebench') || null)}
                    className="flex items-center gap-1.5 text-left font-mono font-semibold text-neutral-200 hover:text-indigo-300 group transition-colors"
                    title="Click to view LiveBench benchmark methodology & details"
                  >
                    <span>LiveBench</span>
                    <Info className="w-3.5 h-3.5 text-neutral-400 group-hover:text-indigo-300 transition-transform group-hover:scale-110" />
                  </button>
                  <span className="text-[10px] text-neutral-400 block mt-0.5 font-mono">
                    Contamination-Free
                  </span>
                </td>
                {models.map((m) => {
                  const score = getBenchmarkScoreForModel(m, 'livebench');
                  return (
                    <td key={m.id} className="py-3 px-4 font-mono tabular-nums text-neutral-200 font-semibold">
                      {score.display}
                    </td>
                  );
                })}
              </tr>

              {/* BENCHMARK ROW: GPQA Diamond (CLICKABLE) */}
              <tr className="hover:bg-neutral-800/40">
                <td className="py-3 px-4 bg-neutral-950/30">
                  <button
                    type="button"
                    onClick={() => setSelectedBenchmark(getBenchmarkById('gpqa-diamond') || null)}
                    className="flex items-center gap-1.5 text-left font-mono font-semibold text-neutral-200 hover:text-indigo-300 group transition-colors"
                    title="Click to view GPQA Diamond benchmark methodology & details"
                  >
                    <span>GPQA Diamond</span>
                    <Info className="w-3.5 h-3.5 text-neutral-400 group-hover:text-indigo-300 transition-transform group-hover:scale-110" />
                  </button>
                  <span className="text-[10px] text-neutral-400 block mt-0.5 font-mono">
                    PhD-level Science
                  </span>
                </td>
                {models.map((m) => {
                  const isLeader = m.reasoningScore === highestReasoning && m.reasoningScore > 0;
                  return (
                    <td key={m.id} className="py-3 px-4 font-mono tabular-nums">
                      <span className={`font-semibold ${isLeader ? 'text-indigo-300' : 'text-neutral-200'}`}>
                        {m.reasoningScore > 0 ? `${m.reasoningScore.toFixed(1)}%` : '—'}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* BENCHMARK ROW: MATH-500 (CLICKABLE) */}
              <tr className="hover:bg-neutral-800/40">
                <td className="py-3 px-4 bg-neutral-950/30">
                  <button
                    type="button"
                    onClick={() => setSelectedBenchmark(getBenchmarkById('math-500') || null)}
                    className="flex items-center gap-1.5 text-left font-mono font-semibold text-neutral-200 hover:text-indigo-300 group transition-colors"
                    title="Click to view MATH-500 benchmark methodology & details"
                  >
                    <span>MATH-500</span>
                    <Info className="w-3.5 h-3.5 text-neutral-400 group-hover:text-indigo-300 transition-transform group-hover:scale-110" />
                  </button>
                  <span className="text-[10px] text-neutral-400 block mt-0.5 font-mono">
                    Competition Math
                  </span>
                </td>
                {models.map((m) => {
                  const isLeader = m.mathScore === highestMath && m.mathScore > 0;
                  return (
                    <td key={m.id} className="py-3 px-4 font-mono tabular-nums">
                      <span className={`font-semibold ${isLeader ? 'text-indigo-300' : 'text-neutral-200'}`}>
                        {m.mathScore > 0 ? `${m.mathScore.toFixed(1)}%` : '—'}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* BENCHMARK ROW: Agentic Capabilities GAIA (CLICKABLE) */}
              <tr className="hover:bg-neutral-800/40">
                <td className="py-3 px-4 bg-neutral-950/30">
                  <button
                    type="button"
                    onClick={() => setSelectedBenchmark(getBenchmarkById('gaia') || null)}
                    className="flex items-center gap-1.5 text-left font-mono font-semibold text-neutral-200 hover:text-indigo-300 group transition-colors"
                    title="Click to view GAIA agentic benchmark methodology & details"
                  >
                    <span>Agentic (GAIA)</span>
                    <Info className="w-3.5 h-3.5 text-neutral-400 group-hover:text-indigo-300 transition-transform group-hover:scale-110" />
                  </button>
                  <span className="text-[10px] text-neutral-400 block mt-0.5 font-mono">
                    Tool & Web Agent
                  </span>
                </td>
                {models.map((m) => (
                  <td key={m.id} className="py-3 px-4 font-mono tabular-nums text-neutral-200 font-semibold">
                    {formatMetricNumber(m.agenticScore, 1)}
                  </td>
                ))}
              </tr>

              {/* Economics (Cost / 1M Tokens) */}
              <tr className="hover:bg-neutral-800/30">
                <td className="py-3 px-4 font-mono text-neutral-400 text-xs bg-neutral-950/30">
                  Cost / 1M Tokens
                </td>
                {models.map((m) => {
                  const isLowest = m.costPer1MTokens.blendedUsd === lowestCost;
                  return (
                    <td key={m.id} className="py-3 px-4 font-mono tabular-nums">
                      <div className="font-bold text-white text-sm">
                        {formatCurrency(m.costPer1MTokens.blendedUsd)}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        ${m.costPer1MTokens.inputUsd} in / ${m.costPer1MTokens.outputUsd} out
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Throughput & TTFT */}
              <tr className="hover:bg-neutral-800/30">
                <td className="py-3 px-4 font-mono text-neutral-400 text-xs bg-neutral-950/30">
                  Inference Speed
                </td>
                {models.map((m) => (
                  <td key={m.id} className="py-3 px-4 font-mono tabular-nums text-neutral-200">
                    <div>{m.throughputTokensPerSec.toFixed(1)} tokens/sec</div>
                    <div className="text-[11px] text-neutral-400">TTFT: {m.ttftMs}ms</div>
                  </td>
                ))}
              </tr>

              {/* License */}
              <tr className="hover:bg-neutral-800/30">
                <td className="py-3 px-4 font-mono text-neutral-400 text-xs bg-neutral-950/30">
                  License
                </td>
                {models.map((m) => (
                  <td key={m.id} className="py-3 px-4 text-neutral-300 font-mono text-xs">
                    {m.license}
                  </td>
                ))}
              </tr>

              {/* Update History & What's New */}
              <tr className="hover:bg-neutral-800/30">
                <td className="py-3 px-4 font-mono text-neutral-400 text-xs bg-neutral-950/30 align-top">
                  Update Changelog
                </td>
                {models.map((m) => (
                  <td key={m.id} className="py-3 px-4 align-top text-xs">
                    <div className="font-mono text-neutral-400 text-[11px] mb-1">
                      Updated: {m.lastUpdateDate} (Created: {m.dateCreated})
                    </div>
                    <div className="text-neutral-300 leading-relaxed bg-neutral-950/60 p-2 rounded border border-neutral-800/80">
                      {m.whatsNewInUpdate}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Citations & Evidence */}
              <tr className="hover:bg-neutral-800/30 bg-neutral-950/30">
                <td className="py-3 px-4 font-mono text-neutral-400 text-xs bg-neutral-950/50 align-top font-semibold">
                  Verified Citations
                </td>
                {models.map((m) => (
                  <td key={m.id} className="py-3 px-4 align-top">
                    <div className="space-y-1.5">
                      {m.citations.map((c, i) => (
                        <div key={i} className="text-[11px] border-b border-neutral-800/60 pb-1.5 last:border-b-0">
                          <div className="font-semibold text-neutral-300">{c.sourceName}</div>
                          <div className="text-neutral-400 truncate max-w-[220px]" title={c.title}>
                            {c.title}
                          </div>
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:underline inline-flex items-center gap-1 font-mono text-[10px]"
                          >
                            <span>Link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Click any benchmark row label above to inspect methodology, evaluation harness, and primary dataset citations.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Close Comparator
          </button>
        </div>

        {/* BENCHMARK DETAILS POPUP MODAL (Triggered when user clicks on any benchmark) */}
        {selectedBenchmark && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
            <div className="bg-neutral-900 border border-neutral-600 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl p-6 text-neutral-200 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 border-b border-neutral-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                      {selectedBenchmark.category}
                    </span>
                    <span className="text-neutral-600">·</span>
                    <span className="text-xs font-mono text-neutral-400">
                      Metric: {selectedBenchmark.metricUnit}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {selectedBenchmark.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Host / Organizer: {selectedBenchmark.organizer}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBenchmark(null)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                  aria-label="Close benchmark details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Comprehensive Description */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                  Benchmark Description & Evaluation Scope
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-950/70 p-3.5 rounded-xl border border-neutral-800">
                  {selectedBenchmark.description}
                </p>
              </div>

              {/* Scores for Compared Models on this Benchmark */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                  Scores for Selected Comparison Models
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {models.map((m) => {
                    const score = getBenchmarkScoreForModel(m, selectedBenchmark.id);
                    return (
                      <div
                        key={m.id}
                        className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/80"
                      >
                        <div className="text-[11px] text-neutral-400 truncate font-medium">
                          {m.name}
                        </div>
                        <div className="text-base font-bold text-white font-mono mt-0.5 tabular-nums">
                          {score.display}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Citations & Direct Links */}
              <div className="space-y-2 bg-neutral-950/90 p-4 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Primary Provenance & Official Repositories</span>
                </div>
                <div className="text-xs space-y-1 text-neutral-300">
                  <div>
                    <span className="text-neutral-500">Document Title: </span>
                    <span className="font-medium text-neutral-200">{selectedBenchmark.citation.title}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Verified Metric: </span>
                    <span className="text-neutral-300">{selectedBenchmark.citation.metricVerified}</span>
                  </div>
                  <div className="text-neutral-500 text-[11px]">
                    Retrieved: {selectedBenchmark.citation.retrievalDate} · Confidence: {selectedBenchmark.citation.confidence}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3 border-t border-neutral-800/80">
                  <a
                    href={selectedBenchmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 hover:underline font-mono"
                  >
                    <span>Official Website / Paper</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={selectedBenchmark.datasetOrLeaderboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 hover:underline font-mono"
                  >
                    <span>Hugging Face Space / Dataset</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Modal Action */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedBenchmark(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                >
                  Back to Comparison Table
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
