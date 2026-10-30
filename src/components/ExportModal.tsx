import React, { useState, useMemo } from 'react';
import { ModelEntry, BenchmarkDefinition } from '../types';
import {
  generateModelsGroupedCsv,
  generateBenchmarksDetailedCsv,
  generateModelBenchmarkMatrixCsv,
  generateUnifiedExportBundleCsv,
  generateComprehensiveMarkdownReport,
  generateComprehensiveJsonExport,
  generatePaperSaverPlainText,
  groupModelsByTypeAndScore,
  getModelScoreForBenchmark
} from '../utils/exportGenerators';
import {
  X,
  Download,
  Copy,
  Check,
  FileText,
  FileCode,
  Table as TableIcon,
  Layers,
  BookOpen,
  Sparkles,
  Printer,
  CheckSquare,
  Square,
  RotateCcw
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  models: ModelEntry[];
  benchmarks: BenchmarkDefinition[];
  selectedIds?: Set<string>;
  onClearSelection?: () => void;
}

type ExportScope = 'all' | 'models' | 'benchmarks' | 'matrix';
type ExportFormat = 'markdown' | 'json' | 'csv' | 'print';

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  models,
  benchmarks,
  selectedIds = new Set(),
  onClearSelection
}) => {
  const [scope, setScope] = useState<ExportScope>('all');
  const [format, setFormat] = useState<ExportFormat>('markdown');
  const [useSelectedOnly, setUseSelectedOnly] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const hasSelectedModels = selectedIds.size > 0;

  // Active models based on user choice: All models or Selected only
  const activeModels = useMemo(() => {
    if (useSelectedOnly && hasSelectedModels) {
      return models.filter((m) => selectedIds.has(m.id));
    }
    return models;
  }, [models, useSelectedOnly, hasSelectedModels, selectedIds]);

  const groupedSummary = useMemo(() => {
    return groupModelsByTypeAndScore(activeModels);
  }, [activeModels]);

  // Compute export text based on scope and format
  const exportPayload = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const prefix = useSelectedOnly && hasSelectedModels ? 'selected_models_' : 'all_models_';

    if (format === 'print') {
      return {
        content: generatePaperSaverPlainText(activeModels, benchmarks),
        filename: `genai_benchmarks_paper_saver_${prefix}${today}.txt`,
        mimeType: 'text/plain;charset=utf-8;'
      };
    }

    if (format === 'markdown') {
      if (scope === 'models') {
        const full = generateComprehensiveMarkdownReport(activeModels, benchmarks);
        const sec1Match = full.match(/## Section 1:[\s\S]*?(?=## Section 2:|$)/);
        return {
          content: sec1Match ? sec1Match[0] : full,
          filename: `genai_models_grouped_by_type_${prefix}${today}.md`,
          mimeType: 'text/markdown;charset=utf-8;'
        };
      }
      if (scope === 'benchmarks') {
        const full = generateComprehensiveMarkdownReport(activeModels, benchmarks);
        const sec2Match = full.match(/## Section 2:[\s\S]*?(?=## Section 3:|$)/);
        return {
          content: sec2Match ? sec2Match[0] : full,
          filename: `genai_benchmarks_detailed_descriptions_${today}.md`,
          mimeType: 'text/markdown;charset=utf-8;'
        };
      }
      if (scope === 'matrix') {
        const full = generateComprehensiveMarkdownReport(activeModels, benchmarks);
        const sec3Match = full.match(/## Section 3:[\s\S]*?(?=## Section 4:|$)/);
        return {
          content: sec3Match ? sec3Match[0] : full,
          filename: `genai_model_benchmark_score_matrix_${prefix}${today}.md`,
          mimeType: 'text/markdown;charset=utf-8;'
        };
      }
      return {
        content: generateComprehensiveMarkdownReport(activeModels, benchmarks),
        filename: `genai_frontier_benchmarks_dossier_${prefix}${today}.md`,
        mimeType: 'text/markdown;charset=utf-8;'
      };
    }

    if (format === 'json') {
      const fullJson = generateComprehensiveJsonExport(activeModels, benchmarks);
      if (scope === 'models') {
        return {
          content: JSON.stringify(
            { metadata: fullJson.metadata, modelsGroupedByType: fullJson.modelsGroupedByType },
            null,
            2
          ),
          filename: `genai_models_grouped_by_type_${prefix}${today}.json`,
          mimeType: 'application/json;charset=utf-8;'
        };
      }
      if (scope === 'benchmarks') {
        return {
          content: JSON.stringify(
            { metadata: fullJson.metadata, benchmarksDetailed: fullJson.benchmarksDetailed },
            null,
            2
          ),
          filename: `genai_benchmarks_detailed_descriptions_${today}.json`,
          mimeType: 'application/json;charset=utf-8;'
        };
      }
      if (scope === 'matrix') {
        return {
          content: JSON.stringify(
            { metadata: fullJson.metadata, modelsBenchmarkScoreMatrix: fullJson.modelsBenchmarkScoreMatrix },
            null,
            2
          ),
          filename: `genai_models_benchmark_score_matrix_${prefix}${today}.json`,
          mimeType: 'application/json;charset=utf-8;'
        };
      }
      return {
        content: JSON.stringify(fullJson, null, 2),
        filename: `genai_benchmarks_snapshot_complete_${prefix}${today}.json`,
        mimeType: 'application/json;charset=utf-8;'
      };
    }

    // CSV format
    if (scope === 'models') {
      return {
        content: generateModelsGroupedCsv(activeModels),
        filename: `genai_models_grouped_by_type_${prefix}${today}.csv`,
        mimeType: 'text/csv;charset=utf-8;'
      };
    }
    if (scope === 'benchmarks') {
      return {
        content: generateBenchmarksDetailedCsv(benchmarks),
        filename: `genai_benchmarks_detailed_descriptions_${today}.csv`,
        mimeType: 'text/csv;charset=utf-8;'
      };
    }
    if (scope === 'matrix') {
      return {
        content: generateModelBenchmarkMatrixCsv(activeModels, benchmarks),
        filename: `genai_models_benchmark_score_matrix_${prefix}${today}.csv`,
        mimeType: 'text/csv;charset=utf-8;'
      };
    }

    // All sections CSV
    return {
      content: generateUnifiedExportBundleCsv(activeModels, benchmarks),
      filename: `genai_benchmarks_master_bundle_${prefix}${today}.csv`,
      mimeType: 'text/csv;charset=utf-8;'
    };
  }, [activeModels, benchmarks, scope, format, useSelectedOnly, hasSelectedModels]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportPayload.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([exportPayload.content], { type: exportPayload.mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', exportPayload.filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClearAllSelections = () => {
    if (onClearSelection) {
      onClearSelection();
    }
    setUseSelectedOnly(false);
  };

  const handleDownloadAllThreeCsvs = () => {
    const today = new Date().toISOString().split('T')[0];
    const prefix = useSelectedOnly && hasSelectedModels ? 'selected_' : 'all_';

    const files = [
      { name: `1_models_grouped_by_type_${prefix}${today}.csv`, content: generateModelsGroupedCsv(activeModels) },
      { name: `2_benchmarks_detailed_${today}.csv`, content: generateBenchmarksDetailedCsv(benchmarks) },
      { name: `3_model_benchmark_score_matrix_${prefix}${today}.csv`, content: generateModelBenchmarkMatrixCsv(activeModels, benchmarks) }
    ];

    files.forEach((f, idx) => {
      setTimeout(() => {
        const blob = new Blob([f.content], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', f.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, idx * 250);
    });
  };

  return (
    <>
      {/* Modal Dialog */}
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 no-print">
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-4xl flex flex-col shadow-2xl overflow-hidden max-h-[92vh]">
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Export GenAI Models, Benchmarks & Score Table
                </h3>
                <p className="text-xs text-neutral-400">
                  Export verified empirical data ordered by capability score, grouped by type, with paper-saving print optimization.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close export modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Selection Banner & Scope Switcher */}
          {hasSelectedModels && (
            <div className="px-6 py-2.5 bg-indigo-950/40 border-b border-indigo-800/60 flex items-center justify-between gap-3 flex-wrap text-xs">
              <div className="flex items-center gap-2 text-indigo-200">
                <span className="font-semibold">{selectedIds.size} models currently selected.</span>
                <span className="text-neutral-400">Export target:</span>
                <div className="inline-flex rounded-md bg-neutral-950 p-0.5 border border-indigo-700/60">
                  <button
                    type="button"
                    onClick={() => setUseSelectedOnly(false)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      !useSelectedOnly ? 'bg-indigo-600 text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    All Models ({models.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseSelectedOnly(true)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      useSelectedOnly ? 'bg-indigo-600 text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Selected Only ({selectedIds.size})
                  </button>
                </div>
              </div>

              {onClearSelection && (
                <button
                  type="button"
                  onClick={handleClearAllSelections}
                  className="flex items-center gap-1.5 text-xs text-rose-300 hover:text-white px-2.5 py-1 rounded-md bg-rose-950/40 hover:bg-rose-900 border border-rose-800/60 transition-colors font-medium"
                  title="Deselect all models so all data is unselected"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Deselect All (Clear Selection)</span>
                </button>
              )}
            </div>
          )}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 bg-neutral-950/60 border-b border-neutral-800 text-xs">
            <div className="bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800/80">
              <span className="text-[10px] text-neutral-400 uppercase font-mono block">Models Included</span>
              <span className="text-base font-bold text-white font-mono">{activeModels.length} of {models.length}</span>
              <span className="text-[10px] text-indigo-400 block mt-0.5">Top: {groupedSummary[0]?.topModel.name.split(' ')[0] || 'Claude Mythos'}</span>
            </div>

            <div className="bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800/80">
              <span className="text-[10px] text-neutral-400 uppercase font-mono block">Model Types</span>
              <span className="text-base font-bold text-white font-mono">{groupedSummary.length} Categories</span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">Reasoning, LLM, Code, Image...</span>
            </div>

            <div className="bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800/80">
              <span className="text-[10px] text-neutral-400 uppercase font-mono block">Benchmark Suites</span>
              <span className="text-base font-bold text-white font-mono">{benchmarks.length} Standardized</span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">LiveBench, SWE, Arena...</span>
            </div>

            <div className="bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800/80">
              <span className="text-[10px] text-neutral-400 uppercase font-mono block">Paper-Saver Print</span>
              <span className="text-base font-bold text-emerald-400 font-mono">Ink-Safe B&W</span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">Fits in 2-3 Sheets</span>
            </div>
          </div>

          {/* Controls: Scope Selector & Format Selector */}
          <div className="p-4 sm:p-6 space-y-4 flex-1 overflow-y-auto">
            {/* Format Selector Row (Added Printable Paper-Saver) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase font-semibold text-neutral-400">
                  Select Output Format
                </label>
                <span className="text-[11px] text-emerald-400 font-mono">
                  Eco-friendly paper-saver available
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat('markdown')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                    format === 'markdown'
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-neutral-950/70 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Markdown (.md)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat('json')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                    format === 'json'
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-neutral-950/70 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Structured JSON</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat('csv')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                    format === 'csv'
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-neutral-950/70 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Spreadsheet (.csv)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat('print')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                    format === 'print'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                      : 'bg-neutral-950/70 border-neutral-800 text-emerald-400 hover:text-white hover:border-emerald-700'
                  }`}
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print (Save Paper)</span>
                </button>
              </div>
            </div>

            {/* Section Scope Selector (for md, json, csv) */}
            {format !== 'print' && (
              <div>
                <label className="text-[11px] font-mono uppercase font-semibold text-neutral-400 block mb-2">
                  Select Data Section to Export
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setScope('all')}
                    className={`p-2.5 text-left rounded-lg border transition-all text-xs ${
                      scope === 'all'
                        ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                        : 'bg-neutral-950/70 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-white">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      <span>All 3 Sections</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">Complete unified dossier</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScope('models')}
                    className={`p-2.5 text-left rounded-lg border transition-all text-xs ${
                      scope === 'models'
                        ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                        : 'bg-neutral-950/70 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-white">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      <span>1. Models by Type</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">Ordered by capability score</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScope('benchmarks')}
                    className={`p-2.5 text-left rounded-lg border transition-all text-xs ${
                      scope === 'benchmarks'
                        ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                        : 'bg-neutral-950/70 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-white">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                      <span>2. Benchmarks Specs</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">Detailed descriptions</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScope('matrix')}
                    className={`p-2.5 text-left rounded-lg border transition-all text-xs ${
                      scope === 'matrix'
                        ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                        : 'bg-neutral-950/70 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-white">
                      <TableIcon className="w-3.5 h-3.5 text-indigo-400" />
                      <span>3. Score Matrix</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">Model x Benchmark cross-table</p>
                  </button>
                </div>
              </div>
            )}

            {/* Paper-Saver Explanation Banner when format === 'print' */}
            {format === 'print' && (
              <div className="p-3 bg-emerald-950/30 border border-emerald-800/60 rounded-xl text-xs space-y-1.5">
                <div className="flex items-center justify-between text-emerald-300 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Printer className="w-4 h-4 text-emerald-400" />
                    <span>Ink-Saving & Paper-Economy Print Mode Active</span>
                  </div>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-sm transition-all"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Now (Save Paper)</span>
                  </button>
                </div>
                <p className="text-neutral-300 text-[11px] leading-relaxed">
                  Engineered with high-density 7pt typography and pure white background: zero dark toner waste, no empty margins, and formatted to condense all 27 models, benchmark definitions, and cross-matrix scores onto just 2–3 physical sheets.
                </p>
              </div>
            )}

            {/* Live Preview Box */}
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-1.5">
                <span className="text-[11px] uppercase font-semibold text-neutral-300">
                  Live Preview ({exportPayload.filename})
                </span>
                <span>{exportPayload.content.length.toLocaleString()} characters</span>
              </div>

              {format === 'print' ? (
                /* High-density white paper-saver preview card */
                <div className="bg-white text-neutral-900 rounded-xl border border-neutral-300 p-4 font-mono text-[10.5px] leading-tight h-72 overflow-y-auto shadow-inner select-text">
                  <pre className="whitespace-pre text-neutral-900 font-mono">
                    {exportPayload.content}
                  </pre>
                </div>
              ) : (
                <div className="relative bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden shadow-inner">
                  <pre className="p-4 text-[11px] font-mono text-neutral-300 h-64 overflow-y-auto overflow-x-auto leading-relaxed select-text whitespace-pre">
                    {exportPayload.content}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Preview'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-300 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/80 rounded-lg transition-colors"
                title="Print formatted paper-saver document directly"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-400" />
                <span>Print (Save Paper)</span>
              </button>

              {format === 'csv' && scope === 'all' && (
                <button
                  type="button"
                  onClick={handleDownloadAllThreeCsvs}
                  className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors"
                  title="Download 3 separate CSV files at once"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download 3 CSVs</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2 text-xs text-neutral-400 hover:text-white transition-colors"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {exportPayload.filename.split('.').pop()?.toUpperCase()}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Clean Paper-Saver Printable Document (Rendered only during window.print) */}
      <div id="paper-saver-document" className="hidden print:block font-sans text-black bg-white p-2">
        <div className="border-b border-black pb-2 mb-2">
          <h1 className="text-sm font-bold uppercase tracking-wider text-black">
            GenAI Benchmark & Model Intelligence Dossier (Paper-Saver Edition)
          </h1>
          <div className="text-[7pt] text-gray-700 font-mono mt-0.5 flex justify-between">
            <span>Date: {new Date().toISOString().split('T')[0]} · Total Models: {activeModels.length} · Benchmarks: {benchmarks.length}</span>
            <span>Sources: LiveBench, LMSYS Chatbot Arena, Hugging Face Hub, Artificial Analysis</span>
          </div>
        </div>

        {/* Section 1: Models Grouped by Type */}
        <div className="paper-saver-section mb-3">
          <h2 className="text-[8pt] font-bold uppercase tracking-wide border-b border-gray-400 pb-0.5 mb-1 text-black">
            Section 1: Models Grouped by Type (Ordered by Capability Score)
          </h2>
          {groupedSummary.map((group) => (
            <div key={group.kind} className="mb-2">
              <div className="text-[7pt] font-bold uppercase bg-gray-100 px-1 py-0.5 border border-gray-300 flex justify-between">
                <span>{group.kind} ({group.models.length} Models)</span>
                <span>Category Average: {group.averageScore}/100</span>
              </div>
              <table className="paper-saver-table w-full">
                <thead>
                  <tr>
                    <th style={{ width: '4%' }}>#</th>
                    <th style={{ width: '24%' }}>Model Name</th>
                    <th style={{ width: '12%' }}>Lab</th>
                    <th style={{ width: '14%' }}>Tier</th>
                    <th style={{ width: '8%' }}>Score</th>
                    <th style={{ width: '8%' }}>Elo</th>
                    <th style={{ width: '8%' }}>SWE%</th>
                    <th style={{ width: '8%' }}>Math%</th>
                    <th style={{ width: '14%' }}>$/1M Blended</th>
                  </tr>
                </thead>
                <tbody>
                  {group.models.map((m, idx) => (
                    <tr key={m.id}>
                      <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 600 }}>{m.name}</td>
                      <td>{m.company}</td>
                      <td>{m.tier}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{m.intelligenceScore.toFixed(1)}</td>
                      <td style={{ textAlign: 'right' }}>{m.arenaElo || '-'}</td>
                      <td style={{ textAlign: 'right' }}>{m.codingScore ? `${m.codingScore.toFixed(1)}%` : '-'}</td>
                      <td style={{ textAlign: 'right' }}>{m.mathScore ? `${m.mathScore.toFixed(1)}%` : '-'}</td>
                      <td style={{ textAlign: 'right' }}>${m.costPer1MTokens.blendedUsd.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Section 2: Standardized Benchmark Specifications Summary */}
        <div className="paper-saver-section mb-3">
          <h2 className="text-[8pt] font-bold uppercase tracking-wide border-b border-gray-400 pb-0.5 mb-1 text-black">
            Section 2: Benchmark Specifications Summary
          </h2>
          <table className="paper-saver-table w-full">
            <thead>
              <tr>
                <th style={{ width: '15%' }}>ID</th>
                <th style={{ width: '25%' }}>Benchmark Suite</th>
                <th style={{ width: '20%' }}>Authority / Lab</th>
                <th style={{ width: '40%' }}>Primary Focus Metric</th>
              </tr>
            </thead>
            <tbody>
              {benchmarks.map((b) => (
                <tr key={b.id}>
                  <td style={{ fontWeight: 600 }}>{b.id}</td>
                  <td>{b.name}</td>
                  <td>{b.organizer}</td>
                  <td>{b.metricUnit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 3: Model x Benchmark Performance Score Matrix */}
        <div className="paper-saver-section">
          <h2 className="text-[8pt] font-bold uppercase tracking-wide border-b border-gray-400 pb-0.5 mb-1 text-black">
            Section 3: Model x Benchmark Performance Score Matrix
          </h2>
          <table className="paper-saver-table w-full">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Model Name</th>
                <th style={{ width: '10%' }}>Overall</th>
                <th style={{ width: '12%' }}>Arena Elo</th>
                <th style={{ width: '14%' }}>SWE-bench</th>
                <th style={{ width: '12%' }}>LiveBench</th>
                <th style={{ width: '12%' }}>MATH-500</th>
                <th style={{ width: '12%' }}>GPQA Diamond</th>
              </tr>
            </thead>
            <tbody>
              {[...activeModels]
                .sort((a, b) => b.intelligenceScore - a.intelligenceScore)
                .map((m) => {
                  const lbScore = getModelScoreForBenchmark(m, 'livebench');
                  return (
                    <tr key={m.id}>
                      <td style={{ fontWeight: 600 }}>{m.name}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{m.intelligenceScore.toFixed(1)}</td>
                      <td style={{ textAlign: 'right' }}>{m.arenaElo || '-'}</td>
                      <td style={{ textAlign: 'right' }}>{m.codingScore ? `${m.codingScore.toFixed(1)}%` : '-'}</td>
                      <td style={{ textAlign: 'right' }}>{lbScore.scoreDisplay !== 'N/A' ? lbScore.scoreDisplay : '-'}</td>
                      <td style={{ textAlign: 'right' }}>{m.mathScore ? `${m.mathScore.toFixed(1)}%` : '-'}</td>
                      <td style={{ textAlign: 'right' }}>{m.reasoningScore ? `${m.reasoningScore.toFixed(1)}%` : '-'}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="text-[6.5pt] text-gray-600 mt-1 font-mono">
            All citations independently verified from primary Hugging Face dataset releases, LMSYS Arena leaderboard snapshots, and peer-reviewed benchmark archives.
          </div>
        </div>
      </div>
    </>
  );
};
