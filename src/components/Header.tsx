import React from 'react';
import { RefreshCw, BarChart3, Layers, GitCompare, BookOpen, Download, Settings } from 'lucide-react';

interface HeaderProps {
  activeTab: 'table1' | 'table2' | 'table3' | 'sources';
  setActiveTab: (tab: 'table1' | 'table2' | 'table3' | 'sources') => void;
  onOpenSyncModal: () => void;
  selectedCount: number;
  onOpenCompare: () => void;
  onOpenExportModal: () => void;
  onOpenSettings: () => void;
  isSyncing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSyncModal,
  selectedCount,
  onOpenCompare,
  onOpenExportModal,
  onOpenSettings,
  isSyncing
}) => {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold text-sm">
            G
          </div>
          <span className="text-sm sm:text-base font-bold tracking-tight text-white whitespace-nowrap">
            GenAI Benchmark Index
          </span>
        </div>

        {/* Zone 2: Navigation Links (Single-line, unboxed, subtle hover states) */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-3 lg:gap-5 text-xs lg:text-sm font-medium text-neutral-300">
          <button
            data-tab="table1"
            onClick={() => setActiveTab('table1')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
              activeTab === 'table1'
                ? 'border-indigo-500 text-white font-semibold'
                : 'border-transparent hover:text-white'
            }`}
          >
            Benchmarks & Specs
          </button>

          <button
            data-tab="table2"
            onClick={() => setActiveTab('table2')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
              activeTab === 'table2'
                ? 'border-indigo-500 text-white font-semibold'
                : 'border-transparent hover:text-white'
            }`}
          >
            Tiers & Economics
          </button>

          <button
            data-tab="table3"
            onClick={() => setActiveTab('table3')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
              activeTab === 'table3'
                ? 'border-indigo-500 text-white font-semibold'
                : 'border-transparent hover:text-white'
            }`}
          >
            Correlations & Scores
          </button>

          <button
            data-tab="sources"
            onClick={() => setActiveTab('sources')}
            className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
              activeTab === 'sources'
                ? 'border-indigo-500 text-white font-semibold'
                : 'border-transparent hover:text-white'
            }`}
          >
            Methodology & Sources
          </button>
        </nav>

        {/* Zone 3: Primary Action & Quick Tools */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {selectedCount >= 2 && (
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-indigo-200 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700 rounded-md transition-colors"
              title="Compare selected models side-by-side"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Compare ({selectedCount})</span>
            </button>
          )}

          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-600 rounded-lg transition-colors shadow-sm"
            title="Export all GenAI models (grouped by type), detailed benchmark specifications, and performance matrix in Markdown, JSON, or CSV"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export</span>
          </button>

          <button
            onClick={onOpenSyncModal}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 whitespace-nowrap"
            title="Run 1-Click Reproducible Sync Pipeline across Hugging Face, Artificial Analysis, and LMSYS Arena"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>1-Click Sync</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="p-1.5 sm:px-2.5 sm:py-1.5 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Settings: Artificial Analysis API Key, Hugging Face Token & Registry Completeness Test"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4 text-neutral-400 hover:text-indigo-400 transition-colors" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <nav aria-label="Mobile secondary navigation" className="md:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-neutral-800 gap-4 text-xs font-medium text-neutral-400">
        <button
          onClick={() => setActiveTab('table1')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'table1' ? 'text-indigo-400 font-semibold' : ''}`}
        >
          1. Benchmarks & Specs
        </button>
        <button
          onClick={() => setActiveTab('table2')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'table2' ? 'text-indigo-400 font-semibold' : ''}`}
        >
          2. Tiers & Economics
        </button>
        <button
          onClick={() => setActiveTab('table3')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'table3' ? 'text-indigo-400 font-semibold' : ''}`}
        >
          3. Correlations
        </button>
        <button
          onClick={() => setActiveTab('sources')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'sources' ? 'text-indigo-400 font-semibold' : ''}`}
        >
          Methodology & Sources
        </button>
      </nav>
    </header>
  );
};
