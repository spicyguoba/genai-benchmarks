import React from 'react';
import { SyncRunLog, PipelineStep } from '../types';
import { X, RefreshCw, CheckCircle2, AlertTriangle, Clock, Download, ExternalLink, Terminal } from 'lucide-react';

interface SyncPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSyncing: boolean;
  currentLog: SyncRunLog | null;
  onRunSync: () => void;
  onExportJson: () => void;
  onOpenAuditModal?: () => void;
}

export const SyncPipelineModal: React.FC<SyncPipelineModalProps> = ({
  isOpen,
  onClose,
  isSyncing,
  currentLog,
  onRunSync,
  onExportJson,
  onOpenAuditModal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Reproducible Benchmark Pipeline</h3>
              <p className="text-xs text-neutral-400">
                1-Click synchronization across LiveBench, Hugging Face, Artificial Analysis, and LMSYS Arena.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close sync modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          {/* Summary Banner */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs text-neutral-400 font-mono">Pipeline Status</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                <span className="text-sm font-semibold text-white capitalize">
                  {isSyncing ? 'Synchronizing Live Sources...' : currentLog?.status || 'Ready to Run'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-neutral-500 block text-[10px]">EXECUTION TIME</span>
                <span className="text-neutral-200 font-semibold tabular-nums">
                  {currentLog?.totalDurationMs ? `${currentLog.totalDurationMs}ms` : '—'}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">CITATIONS VERIFIED</span>
                <span className="text-emerald-400 font-semibold tabular-nums">
                  {currentLog?.citationsValidated ? `${currentLog.citationsValidated} sources` : '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Pipeline Steps Log */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span className="uppercase text-[11px] font-semibold">Live Ingestion & Validation Stages</span>
              <span>CLI: npx tsx scripts/fetch-benchmarks.ts</span>
            </div>

            <div className="space-y-2">
              {currentLog?.steps.map((step, idx) => {
                const isRunning = step.status === 'running';
                const isSuccess = step.status === 'success';
                const isWarning = step.status === 'warning';

                return (
                  <div
                    key={step.id || idx}
                    className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-lg text-xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 font-medium text-white">
                        {isRunning && <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />}
                        {isSuccess && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        {isWarning && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                        {!isRunning && !isSuccess && !isWarning && (
                          <Clock className="w-3.5 h-3.5 text-neutral-500" />
                        )}
                        <span>{step.source}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {step.latencyMs !== undefined && (
                          <span className="text-[11px] font-mono text-neutral-500 tabular-nums">
                            {step.latencyMs}ms
                          </span>
                        )}
                        <a
                          href={step.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-500 hover:text-indigo-400"
                          title="Open provider API / dataset"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                    <p className="text-neutral-400 text-[11px] leading-relaxed">
                      {step.description}
                    </p>
                    {step.details && (
                      <div className="mt-1.5 pt-1.5 border-t border-neutral-800/80 text-[11px] font-mono text-indigo-200/90">
                        {step.details}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reproducibility CLI Notice */}
          <div className="bg-neutral-950/60 p-3 rounded-lg border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-medium">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full Reproducibility via Terminal or CI:</span>
            </div>
            <code className="block bg-neutral-950 px-2.5 py-1.5 rounded text-neutral-200 font-mono text-xs border border-neutral-800">
              npx --yes tsx scripts/fetch-benchmarks.ts
            </code>
            <p className="text-neutral-500 text-[10px]">
              Runs the pipeline deterministically, validates all schemas, and updates local tables.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onExportJson}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Verified JSON</span>
            </button>

            {onOpenAuditModal && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuditModal();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors"
                title="Run automated completeness audit to test if any well-known models are missing"
              >
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Test Completeness</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={onRunSync}
              disabled={isSyncing}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-sm transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Running...' : 'Run Pipeline Now'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
