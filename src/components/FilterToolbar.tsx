import React from 'react';
import { ModelFilterState } from '../utils/filterSort';
import { ModelKind, ModelTier, ThinkingMode } from '../types';
import { Search, RotateCcw, Filter, CheckSquare, Square, Brain, X } from 'lucide-react';

interface FilterToolbarProps {
  filter: ModelFilterState;
  onFilterChange: (newFilter: ModelFilterState) => void;
  companies: string[];
  totalCount: number;
  filteredCount: number;
  selectedCount: number;
  onToggleSelectAll: () => void;
  onDeselectAll?: () => void;
  isAllSelected: boolean;
}

const MODEL_KINDS: (ModelKind | 'All')[] = [
  'All',
  'LLM (General)',
  'Reasoning / Hybrid',
  'Multimodal (Vision/Audio)',
  'Image / Diffusion',
  'Video Generation',
  'Audio / Speech',
  'Code Specialized'
];

const MODEL_TIERS: (ModelTier | 'All')[] = [
  'All',
  'Frontier',
  'High-Efficiency',
  'Local / Open-Weights',
  'Edge / Mobile'
];

const THINKING_MODES: (ThinkingMode | 'All')[] = [
  'All',
  'Standard / Instant',
  'High Thinking',
  'Extended Thinking',
  'Expert / Deep Research'
];

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filter,
  onFilterChange,
  companies,
  totalCount,
  filteredCount,
  selectedCount,
  onToggleSelectAll,
  onDeselectAll,
  isAllSelected
}) => {
  const isFiltered =
    filter.searchTerm !== '' ||
    filter.kind !== 'All' ||
    filter.tier !== 'All' ||
    filter.company !== 'All' ||
    (filter.thinkingMode !== undefined && filter.thinkingMode !== 'All');

  const resetFilters = () => {
    onFilterChange({
      searchTerm: '',
      kind: 'All',
      tier: 'All',
      company: 'All',
      thinkingMode: 'All'
    });
  };

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 mb-6 space-y-4">
      {/* Top Search & High-Level Filters Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={filter.searchTerm}
            onChange={(e) => onFilterChange({ ...filter, searchTerm: e.target.value })}
            placeholder="Search models, architectures, labs, or benchmarks (e.g. Claude, MoE, SWE-bench)..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Dropdowns & Reset */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Tier Select */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-neutral-400 hidden sm:inline">Tier:</span>
            <select
              value={filter.tier}
              onChange={(e) => onFilterChange({ ...filter, tier: e.target.value as ModelTier | 'All' })}
              className="text-xs bg-neutral-950 border border-neutral-700 text-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              {MODEL_TIERS.map((t) => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Tiers' : t}
                </option>
              ))}
            </select>
          </div>

          {/* Company Select */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-neutral-400 hidden sm:inline">Lab / Org:</span>
            <select
              value={filter.company}
              onChange={(e) => onFilterChange({ ...filter, company: e.target.value })}
              className="text-xs bg-neutral-950 border border-neutral-700 text-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Labs & Companies</option>
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Thinking / Reasoning Mode Select */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-neutral-400 hidden sm:inline">Thinking:</span>
            <select
              value={filter.thinkingMode || 'All'}
              onChange={(e) => onFilterChange({ ...filter, thinkingMode: e.target.value as ThinkingMode | 'All' })}
              className="text-xs bg-neutral-950 border border-neutral-700 text-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 font-sans"
            >
              <option value="All">All Reasoning Modes</option>
              <option value="Standard / Instant">Standard / Instant</option>
              <option value="High Thinking">High Thinking</option>
              <option value="Extended Thinking">Extended Thinking</option>
              <option value="Expert / Deep Research">Expert / Deep Research</option>
            </select>
          </div>

          {/* Reset Filters */}
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2.5 py-1.5 border border-neutral-800 hover:border-neutral-700 rounded-lg bg-neutral-950 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* Select All Checkbox Helper */}
          <button
            onClick={onToggleSelectAll}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white px-2.5 py-1.5 border border-neutral-800 hover:border-neutral-700 rounded-lg bg-neutral-950 transition-colors"
            title={isAllSelected ? 'Deselect all visible models' : 'Select all visible models for comparison'}
          >
            {isAllSelected ? (
              <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
            ) : (
              <Square className="w-3.5 h-3.5 text-neutral-400" />
            )}
            <span>{isAllSelected ? 'Deselect All Visible' : 'Select All Visible'}</span>
          </button>

          {/* Explicit Deselect All / Clear Selection Helper */}
          {selectedCount > 0 && onDeselectAll && (
            <button
              onClick={onDeselectAll}
              className="inline-flex items-center gap-1.5 text-xs text-rose-300 hover:text-rose-100 px-2.5 py-1.5 border border-rose-900/60 hover:border-rose-700 rounded-lg bg-rose-950/40 transition-colors"
              title="Deselect all models so all data will be exported without filtering"
            >
              <X className="w-3.5 h-3.5 text-rose-400" />
              <span>Deselect All ({selectedCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Model Kind Segmented Filter Bar (Clean unboxed/segmented buttons) */}
      <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-1 shrink-0 p-1 bg-neutral-950/70 border border-neutral-800 rounded-lg">
          {MODEL_KINDS.map((k) => {
            const isActive = filter.kind === k;
            return (
              <button
                key={k}
                onClick={() => onFilterChange({ ...filter, kind: k })}
                className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {k === 'All' ? 'All Architectures' : k}
              </button>
            );
          })}
        </div>

        {/* Status text */}
        <div className="text-xs text-neutral-400 font-mono shrink-0 whitespace-nowrap flex items-center gap-2">
          <div>
            <span>Showing </span>
            <span className="text-white font-semibold tabular-nums">{filteredCount}</span>
            <span> of </span>
            <span className="text-white font-semibold tabular-nums">{totalCount}</span>
            <span> models</span>
          </div>
          {selectedCount > 0 && (
            <div className="flex items-center gap-1.5 text-indigo-400 bg-indigo-950/50 border border-indigo-800/60 px-2 py-0.5 rounded">
              <span>· {selectedCount} selected</span>
              {onDeselectAll && (
                <button
                  onClick={onDeselectAll}
                  className="text-neutral-300 hover:text-white underline font-sans text-[11px] ml-1 cursor-pointer"
                  title="Clear all selected models"
                >
                  (Deselect All)
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
