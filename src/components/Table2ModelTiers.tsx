import React from 'react';
import { ModelEntry } from '../types';
import { CitationPopover } from './CitationPopover';
import { formatCurrency, formatMetricNumber } from '../utils/statistics';
import { SortDirection } from '../utils/filterSort';
import { CheckSquare, Square, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface Table2Props {
  models: ModelEntry[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  sortKey: string;
  sortDirection: SortDirection;
  onSort: (key: string) => void;
}

export const Table2ModelTiers: React.FC<Table2Props> = ({
  models,
  selectedIds,
  onToggleSelect,
  sortKey,
  sortDirection,
  onSort
}) => {
  const renderSortIndicator = (key: string) => {
    if (sortKey !== key) {
      return <ArrowUpDown className="w-3 h-3 text-neutral-600 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-3 h-3 text-indigo-400 inline ml-1" />
    ) : (
      <ArrowDown className="w-3 h-3 text-indigo-400 inline ml-1" />
    );
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-white tracking-tight">
            Table 2: GenAI Models by Kinds, Tiers, Specs & Economics
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Compare parameter scale, overall intelligence, SWE-bench coding, agentic score, inference throughput, and cost per 1M tokens.
          </p>
        </div>
        <div className="text-xs text-neutral-400 font-mono">
          Click column headers to sort ascending / descending
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-950/70 text-neutral-400 uppercase text-[11px] font-semibold tracking-wider font-mono">
              <th className="py-3 px-3.5 w-10 text-center">
                <span className="sr-only">Select</span>
              </th>
              <th
                onClick={() => onSort('name')}
                className="py-3 px-3.5 cursor-pointer hover:text-white transition-colors group whitespace-nowrap"
              >
                <span>Model & Lab</span>
                {renderSortIndicator('name')}
              </th>
              <th
                onClick={() => onSort('kind')}
                className="py-3 px-3.5 cursor-pointer hover:text-white transition-colors group whitespace-nowrap"
              >
                <span>Kind & Tier</span>
                {renderSortIndicator('kind')}
              </th>
              <th
                onClick={() => onSort('parameters')}
                className="py-3 px-3.5 cursor-pointer hover:text-white transition-colors group whitespace-nowrap text-right"
              >
                <span>Parameters</span>
                {renderSortIndicator('parameters')}
              </th>
              <th
                onClick={() => onSort('intelligenceScore')}
                className="py-3 px-3.5 cursor-pointer hover:text-white transition-colors group whitespace-nowrap text-right"
              >
                <span>Intelligence Index</span>
                {renderSortIndicator('intelligenceScore')}
              </th>
              <th
                onClick={() => onSort('arenaElo')}
                className="py-3 px-3.5 cursor-pointer hover:text-white transition-colors group whitespace-nowrap text-right"
              >
                <span>Arena Elo</span>
                {renderSortIndicator('arenaElo')}
              </th>
              <th
                onClick={() => onSort('codingScore')}
                className="py-3 px-3.5 cursor-pointer hover:text-white transition-colors group whitespace-nowrap text-right"
              >
                <span>SWE-bench %</span>
                {renderSortIndicator('codingScore')}
              </th>
              <th
                onClick={() => onSort('agenticScore')}
                className="py-3 px-3.5 cursor-pointer hover:text-white transition-colors group whitespace-nowrap text-right"
              >
                <span>Agentic Score</span>
                {renderSortIndicator('agenticScore')}
              </th>
              <th
                onClick={() => onSort('cost')}
                className="py-3 px-3.5 cursor-pointer hover:text-white transition-colors group whitespace-nowrap text-right"
              >
                <span>Cost / 1M Tokens</span>
                {renderSortIndicator('cost')}
              </th>
              <th
                onClick={() => onSort('speed')}
                className="py-3 px-3.5 cursor-pointer hover:text-white transition-colors group whitespace-nowrap text-right"
              >
                <span>Speed & TTFT</span>
                {renderSortIndicator('speed')}
              </th>
              <th
                onClick={() => onSort('contextWindow')}
                className="py-3 px-3.5 cursor-pointer hover:text-white transition-colors group whitespace-nowrap text-right"
              >
                <span>Context Window</span>
                {renderSortIndicator('contextWindow')}
              </th>
              <th className="py-3 px-3.5 text-right whitespace-nowrap">Citations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/70">
            {models.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-12 text-center text-neutral-500">
                  No models match your current filter settings.
                </td>
              </tr>
            ) : (
              models.map((model) => {
                const isSelected = selectedIds.has(model.id);

                return (
                  <tr
                    key={model.id}
                    className={`hover:bg-neutral-800/50 transition-colors ${
                      isSelected ? 'bg-indigo-950/20' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => onToggleSelect(model.id)}
                        className="text-neutral-400 hover:text-indigo-400 focus:outline-none"
                        aria-label={`Select ${model.name} for comparison`}
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-indigo-400" />
                        ) : (
                          <Square className="w-4 h-4 text-neutral-600 hover:text-neutral-400" />
                        )}
                      </button>
                    </td>

                    {/* Model & Lab */}
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <div className="font-semibold text-white">{model.name}</div>
                      <div className="text-xs text-neutral-400">{model.company}</div>
                    </td>

                    {/* Kind & Tier */}
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <div className="text-neutral-200 text-xs font-medium">{model.kind}</div>
                      <div className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
                        <span>{model.tier}</span>
                        {model.thinkingMode && model.thinkingMode !== 'N/A' && (
                          <>
                            <span className="text-neutral-600">·</span>
                            <span
                              className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                                model.thinkingMode === 'Expert / Deep Research'
                                  ? 'bg-purple-950/60 border-purple-800 text-purple-300'
                                  : model.thinkingMode === 'High Thinking'
                                  ? 'bg-indigo-950/60 border-indigo-800 text-indigo-300'
                                  : model.thinkingMode === 'Extended Thinking'
                                  ? 'bg-blue-950/60 border-blue-800 text-blue-300'
                                  : 'bg-neutral-800/60 border-neutral-700 text-neutral-400'
                              }`}
                            >
                              {model.thinkingMode}
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Parameters */}
                    <td className="py-3 px-3.5 text-right font-mono tabular-nums whitespace-nowrap">
                      <div className="text-neutral-100 font-semibold">{model.parameters.display}</div>
                      {model.parameters.activeBillion && (
                        <div className="text-[11px] text-neutral-400 font-mono">
                          {model.parameters.activeBillion}B active
                        </div>
                      )}
                    </td>

                    {/* Intelligence Index */}
                    <td className="py-3 px-3.5 text-right font-mono tabular-nums whitespace-nowrap">
                      <div className="text-white font-semibold">
                        {formatMetricNumber(model.intelligenceScore, 1)}
                      </div>
                      <div className="text-[10px] text-neutral-400">/ 100 Index</div>
                    </td>

                    {/* Arena Elo */}
                    <td className="py-3 px-3.5 text-right font-mono tabular-nums whitespace-nowrap text-neutral-200">
                      {model.arenaElo > 0 ? (
                        <span className="font-semibold text-indigo-300">{model.arenaElo}</span>
                      ) : (
                        <span className="text-neutral-500">—</span>
                      )}
                    </td>

                    {/* SWE-bench % */}
                    <td className="py-3 px-3.5 text-right font-mono tabular-nums whitespace-nowrap">
                      {model.codingScore > 0 ? (
                        <div>
                          <span className="font-semibold text-emerald-400">
                            {formatMetricNumber(model.codingScore, 1, '%')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-neutral-500 font-sans text-xs">N/A (Non-code)</span>
                      )}
                    </td>

                    {/* Agentic Capabilities */}
                    <td className="py-3 px-3.5 text-right font-mono tabular-nums whitespace-nowrap">
                      <span className="font-semibold text-neutral-200">
                        {formatMetricNumber(model.agenticScore, 1)}
                      </span>
                    </td>

                    {/* Cost / 1M Tokens */}
                    <td className="py-3 px-3.5 text-right font-mono tabular-nums whitespace-nowrap">
                      <div className="font-semibold text-neutral-100">
                        {formatCurrency(model.costPer1MTokens.blendedUsd)}
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        ${model.costPer1MTokens.inputUsd} in / ${model.costPer1MTokens.outputUsd} out
                      </div>
                    </td>

                    {/* Speed & TTFT */}
                    <td className="py-3 px-3.5 text-right font-mono tabular-nums whitespace-nowrap">
                      <div className="font-semibold text-neutral-200">
                        {formatMetricNumber(model.throughputTokensPerSec, 1, ' t/s')}
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        TTFT {model.ttftMs}ms
                      </div>
                    </td>

                    {/* Context Window */}
                    <td className="py-3 px-3.5 text-right font-mono tabular-nums whitespace-nowrap text-neutral-200">
                      {model.contextWindowTokens >= 1000000
                        ? `${(model.contextWindowTokens / 1000000).toFixed(1)}M`
                        : `${(model.contextWindowTokens / 1000).toFixed(0)}k`}
                    </td>

                    {/* Citations */}
                    <td className="py-3 px-3.5 text-right whitespace-nowrap">
                      <CitationPopover citations={model.citations} compact />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
