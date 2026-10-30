import React, { useState, useMemo, useEffect } from 'react';
import { ModelEntry, BenchmarkDefinition, SyncRunLog } from './types';
import { INITIAL_MODELS_DATA } from './data/modelsData';
import { BENCHMARKS_DATA } from './data/benchmarksData';
import { Header } from './components/Header';
import { FilterToolbar } from './components/FilterToolbar';
import { Table1ModelBenchmarks } from './components/Table1ModelBenchmarks';
import { Table2ModelTiers } from './components/Table2ModelTiers';
import { Table3BenchmarksCorrelation } from './components/Table3BenchmarksCorrelation';
import { CitationsMethodologyView } from './components/CitationsMethodologyView';
import { ModelComparisonModal } from './components/ModelComparisonModal';
import { SyncPipelineModal } from './components/SyncPipelineModal';
import { ExportModal } from './components/ExportModal';
import { SettingsModal } from './components/SettingsModal';
import { ModelFilterState, filterModels, sortModels, SortDirection } from './utils/filterSort';
import { runReproducibleSync } from './services/reproducibleSync';
import { GitCompare, X, RefreshCw, Sparkles, Layers, ShieldCheck, Download, Terminal, Settings } from 'lucide-react';

export default function App() {
  const [models, setModels] = useState<ModelEntry[]>(INITIAL_MODELS_DATA);
  const [benchmarks] = useState<BenchmarkDefinition[]>(BENCHMARKS_DATA);
  const [activeTab, setActiveTab] = useState<'table1' | 'table2' | 'table3' | 'sources'>('table1');

  // Filters & Sorting state
  const [filter, setFilter] = useState<ModelFilterState>({
    searchTerm: '',
    kind: 'All',
    tier: 'All',
    company: 'All'
  });

  const [sortKey, setSortKey] = useState<string>('intelligenceScore');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Multi-model selection for side-by-side comparison (Frontier & Thinking Mode Leaders)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(['gemini-4-carbon-expert', 'gemini-4-carbon', 'gemini-4-argon-thinking', 'gemini-4-argon', 'claude-opus-5-5'])
  );
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Reproducible Sync Pipeline state
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLog, setSyncLog] = useState<SyncRunLog | null>(null);

  // Comprehensive Export Modal state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Unified Settings & Model Registry Completeness Test Modal state
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'keys' | 'test'>('keys');

  // Keyboard shortcut listener: Ctrl+Shift+T or Alt+T opens the audit test suite inside Settings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'T' || e.key === 't')) ||
        (e.altKey && (e.key === 't' || e.key === 'T'))
      ) {
        e.preventDefault();
        setSettingsTab('test');
        setIsSettingsModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Distinct company list
  const companies = useMemo(() => {
    const list = Array.from(new Set(models.map((m) => m.company)));
    return list.sort();
  }, [models]);

  // Filtered & Sorted models
  const filteredModels = useMemo(() => {
    return filterModels(models, filter);
  }, [models, filter]);

  const sortedAndFilteredModels = useMemo(() => {
    return sortModels(filteredModels, sortKey, sortDirection);
  }, [filteredModels, sortKey, sortDirection]);

  // Selected models objects
  const selectedModelsList = useMemo(() => {
    return models.filter((m) => selectedIds.has(m.id));
  }, [models, selectedIds]);

  const isAllVisibleSelected = useMemo(() => {
    if (sortedAndFilteredModels.length === 0) return false;
    return sortedAndFilteredModels.every((m) => selectedIds.has(m.id));
  }, [sortedAndFilteredModels, selectedIds]);

  const handleToggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleDeselectAll = () => {
    setSelectedIds(new Set());
  };

  const handleToggleSelectAll = () => {
    const next = new Set(selectedIds);
    if (isAllVisibleSelected) {
      sortedAndFilteredModels.forEach((m) => next.delete(m.id));
    } else {
      sortedAndFilteredModels.forEach((m) => next.add(m.id));
    }
    setSelectedIds(next);
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  // Run reproducible sync
  const handleExecuteSync = async () => {
    setIsSyncing(true);
    try {
      const { updatedModels, log } = await runReproducibleSync((_, allSteps) => {
        setSyncLog((prev) => ({
          timestamp: prev?.timestamp || new Date().toISOString(),
          status: 'syncing',
          totalDurationMs: 0,
          modelsProcessed: models.length,
          benchmarksProcessed: benchmarks.length,
          citationsValidated: 26,
          steps: allSteps
        }));
      });
      setModels(updatedModels);
      setSyncLog(log);
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = [
      'Model Name',
      'Lab / Company',
      'Kind',
      'Tier',
      'Parameters',
      'Intelligence Index',
      'Arena Elo',
      'SWE-bench Verified %',
      'Agentic Score',
      'Cost Input ($/1M)',
      'Cost Output ($/1M)',
      'Blended Cost ($/1M)',
      'Throughput (t/s)',
      'TTFT (ms)',
      'Context Window',
      'Created Date',
      'Last Update Date',
      'Citations Count'
    ];

    const rows = sortedAndFilteredModels.map((m) => [
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.company.replace(/"/g, '""')}"`,
      `"${m.kind}"`,
      `"${m.tier}"`,
      `"${m.parameters.display}"`,
      m.intelligenceScore,
      m.arenaElo || '',
      m.codingScore || '',
      m.agenticScore || '',
      m.costPer1MTokens.inputUsd,
      m.costPer1MTokens.outputUsd,
      m.costPer1MTokens.blendedUsd,
      m.throughputTokensPerSec,
      m.ttftMs,
      m.contextWindowTokens,
      m.dateCreated,
      m.lastUpdateDate,
      m.citations.length
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `genai_model_benchmarks_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // JSON Export
  const handleExportJson = () => {
    const exportData = {
      metadata: {
        exportedAt: new Date().toISOString(),
        totalModels: models.length,
        totalBenchmarks: benchmarks.length,
        version: '1.0.0-verified'
      },
      models,
      benchmarks
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `genai_benchmarks_snapshot_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans pb-24">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        selectedCount={selectedIds.size}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenSettings={() => {
          setSettingsTab('keys');
          setIsSettingsModalOpen(true);
        }}
        isSyncing={isSyncing}
      />

      {/* Hero / Context Sub-Header */}
      <div className="border-b border-neutral-800 bg-neutral-900/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1 flex-wrap">
                <span>LiveBench</span>
                <span>·</span>
                <span>Hugging Face Hub</span>
                <span>·</span>
                <span>Artificial Analysis</span>
                <span>·</span>
                <span>LMSYS Chatbot Arena</span>
                <span>·</span>
                <span>SWE-bench</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                GenAI Model Benchmarks, Tier Hierarchy & Empirical Correlations
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-3xl leading-relaxed">
                Reproducible index synthesizing frontier, high-efficiency, local open-weights, and media models across reasoning, software engineering, human preference, and inference economics.
              </p>
            </div>

            {/* Quick Metrics Badges */}
            <div className="flex items-center gap-3 font-mono text-xs text-neutral-300 shrink-0">
              <div className="bg-neutral-900 border border-neutral-800 px-3 py-2 rounded-lg">
                <span className="text-[10px] text-neutral-500 block">TOTAL MODELS</span>
                <span className="text-white font-bold tabular-nums">{models.length} Evaluated</span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 px-3 py-2 rounded-lg">
                <span className="text-[10px] text-neutral-500 block">BENCHMARK SUITES</span>
                <span className="text-indigo-400 font-bold tabular-nums">{benchmarks.length} Standardized</span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 px-3 py-2 rounded-lg">
                <span className="text-[10px] text-neutral-500 block">CITATIONS</span>
                <span className="text-emerald-400 font-bold tabular-nums">100% Verifiable</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Render Filter Toolbar for Tables 1 and 2 */}
        {(activeTab === 'table1' || activeTab === 'table2') && (
          <FilterToolbar
            filter={filter}
            onFilterChange={setFilter}
            companies={companies}
            totalCount={models.length}
            filteredCount={filteredModels.length}
            selectedCount={selectedIds.size}
            onToggleSelectAll={handleToggleSelectAll}
            onDeselectAll={handleDeselectAll}
            isAllSelected={isAllVisibleSelected}
          />
        )}

        {/* View Switching */}
        {activeTab === 'table1' && (
          <Table1ModelBenchmarks
            models={sortedAndFilteredModels}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        )}

        {activeTab === 'table2' && (
          <Table2ModelTiers
            models={sortedAndFilteredModels}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        )}

        {activeTab === 'table3' && (
          <Table3BenchmarksCorrelation
            benchmarks={benchmarks}
            models={models}
          />
        )}

        {activeTab === 'sources' && (
          <CitationsMethodologyView
            models={models}
            benchmarks={benchmarks}
          />
        )}
      </main>

      {/* Floating Bottom Comparison Drawer Bar */}
      {selectedIds.size > 0 && (
        <aside
          aria-label="Model comparison tray"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-neutral-900/95 backdrop-blur-md border border-neutral-700 rounded-xl px-4 py-3 shadow-2xl flex items-center justify-between gap-4 max-w-2xl w-[92vw]"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300 font-bold text-xs shrink-0">
              {selectedIds.size}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">
                {selectedIds.size === 1
                  ? 'Select at least 1 more model to compare'
                  : `${selectedIds.size} Models Selected for Comparison`}
              </div>
              <div className="text-[11px] text-neutral-400 truncate font-mono">
                {selectedModelsList.map((m) => m.name.split(' ')[0]).join(' vs ')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-xs text-neutral-400 hover:text-white px-2 py-1 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={() => setIsCompareModalOpen(true)}
              disabled={selectedIds.size < 2}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 rounded-lg shadow-sm transition-all whitespace-nowrap"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Compare Side-by-Side</span>
            </button>
          </div>
        </aside>
      )}

      {/* Side-by-Side Model Comparison Modal */}
      <ModelComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        models={selectedModelsList}
        benchmarks={benchmarks}
        onRemoveModel={handleToggleSelect}
      />

      {/* Footer Diagnostic Link (Subtle, almost hidden admin trigger) */}
      <footer className="mt-16 pt-8 pb-4 border-t border-neutral-900 text-center text-xs text-neutral-600 font-mono no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            Reproducible GenAI Benchmark Synthesis · LiveBench, Hugging Face, Artificial Analysis, LMSYS
          </div>
          <div className="flex items-center gap-3">
            <span>100% Verifiable Primary Citations</span>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                setSettingsTab('test');
                setIsSettingsModalOpen(true);
              }}
              className="text-neutral-500 hover:text-neutral-300 transition-colors flex items-center gap-1 font-mono text-[11px] opacity-75 hover:opacity-100 cursor-pointer"
              title="Run Automated External Registry Completeness Test (Ctrl+Shift+T)"
            >
              <Terminal className="w-3 h-3 text-neutral-500" />
              <span>Audit Registry Completeness</span>
            </button>
          </div>
        </div>
      </footer>

      {/* 1-Click Reproducible Sync Pipeline Modal */}
      <SyncPipelineModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        isSyncing={isSyncing}
        currentLog={syncLog}
        onRunSync={handleExecuteSync}
        onExportJson={() => setIsExportModalOpen(true)}
        onOpenAuditModal={() => {
          setSettingsTab('test');
          setIsSettingsModalOpen(true);
        }}
      />

      {/* Comprehensive Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        models={models}
        benchmarks={benchmarks}
        selectedIds={selectedIds}
        onClearSelection={handleDeselectAll}
      />

      {/* Unified Settings & Model Registry Completeness Test Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentModels={models}
        onApplyIngestion={(updated) => setModels(updated)}
        initialTab={settingsTab}
      />
    </div>
  );
}
