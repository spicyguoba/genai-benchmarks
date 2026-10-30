import React, { useState } from 'react';
import { ModelEntry } from '../types';
import { CitationPopover } from './CitationPopover';
import { ExternalLink, ChevronDown, ChevronRight, CheckSquare, Square, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { SortDirection } from '../utils/filterSort';

interface Table1Props {
  models: ModelEntry[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  sortKey: string;
  sortDirection: SortDirection;
  onSort: (key: string) => void;
}

export const Table1ModelBenchmarks: React.FC<Table1Props> = ({
  models,
  selectedIds,
  onToggleSelect,
  sortKey,
  sortDirection,
  onSort
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const next = new Set(expandedRows);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedRows(next);
  };

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
            Table 1: GenAI Models Benchmarks & Specifications
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Architecture type, release timeline, changelog, evaluation suites, and platform availability with 100% verified citations.
          </p>
        </div>
        <div className="text-xs text-neutral-400 font-mono">
          Click any row to expand full details & changelog
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
                <span>Model Name & Lab</span>
                {renderSortIndicator('name')}
              </th>
              <th
                onClick={() => onSort('kind')}
                className="py-3 px-3.5 cursor-pointer hover:text-white transition-colors group whitespace-nowrap"
              >
                <span>Kind / Architecture</span>
                {renderSortIndicator('kind')}
              </th>
              <th
                onClick={() => onSort('dateCreated')}
                className="py-3 px-3.5 cursor-pointer hover:text-white transition-colors group whitespace-nowrap"
              >
                <span>Created</span>
                {renderSortIndicator('dateCreated')}
              </th>
              <th
                onClick={() => onSort('lastUpdateDate')}
                className="py-3 px-3.5 cursor-pointer hover:text-white transition-colors group whitespace-nowrap"
              >
                <span>Last Updated</span>
                {renderSortIndicator('lastUpdateDate')}
              </th>
              <th className="py-3 px-3.5 whitespace-nowrap">Evaluated Suites</th>
              <th className="py-3 px-3.5 whitespace-nowrap">Platforms</th>
              <th className="py-3 px-3.5 whitespace-nowrap text-right">Citations</th>
              <th className="py-3 px-3 w-8">
                <span className="sr-only">Expand</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/70">
            {models.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-neutral-500">
                  No models match the selected filter criteria. Try adjusting your search or filters.
                </td>
              </tr>
            ) : (
              models.map((model) => {
                const isSelected = selectedIds.has(model.id);
                const isExpanded = expandedRows.has(model.id);

                return (
                  <React.Fragment key={model.id}>
                    <tr
                      className={`hover:bg-neutral-800/50 transition-colors ${
                        isSelected ? 'bg-indigo-950/20' : ''
                      }`}
                    >
                      {/* Checkbox for side-by-side comparison */}
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

                      {/* Name & Company & Details link */}
                      <td className="py-3 px-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white whitespace-nowrap">
                            {model.name}
                          </span>
                          <a
                            href={model.detailsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-500 hover:text-indigo-400 transition-colors"
                            title="Open official paper / documentation"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        <div className="text-xs text-neutral-400 flex items-center gap-1.5 flex-wrap mt-0.5">
                          <span>{model.company}</span>
                          <span className="text-neutral-600">·</span>
                          <span className="font-mono text-neutral-400">{model.parameters.display}</span>
                          {model.thinkingMode && model.thinkingMode !== 'N/A' && (
                            <>
                              <span className="text-neutral-600">·</span>
                              <span
                                className={`inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                                  model.thinkingMode === 'Expert / Deep Research'
                                    ? 'bg-purple-950/70 border-purple-800/80 text-purple-300'
                                    : model.thinkingMode === 'High Thinking'
                                    ? 'bg-indigo-950/70 border-indigo-800/80 text-indigo-300'
                                    : model.thinkingMode === 'Extended Thinking'
                                    ? 'bg-blue-950/70 border-blue-800/80 text-blue-300'
                                    : 'bg-neutral-800/60 border-neutral-700/60 text-neutral-400'
                                }`}
                              >
                                {model.thinkingMode}
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Kind & Tier */}
                      <td className="py-3 px-3.5">
                        <div className="text-neutral-200 font-medium whitespace-nowrap">
                          {model.kind}
                        </div>
                        <div className="text-xs text-neutral-400">
                          <span>{model.tier}</span>
                          <span className="mx-1 text-neutral-600">·</span>
                          <span className="font-mono text-[11px] text-neutral-400">{model.license}</span>
                        </div>
                      </td>

                      {/* Creation Date */}
                      <td className="py-3 px-3.5 font-mono text-xs text-neutral-400 whitespace-nowrap tabular-nums">
                        {model.dateCreated}
                      </td>

                      {/* Last Update Date */}
                      <td className="py-3 px-3.5 font-mono text-xs text-neutral-300 whitespace-nowrap tabular-nums">
                        {model.lastUpdateDate}
                      </td>

                      {/* Evaluated On */}
                      <td className="py-3 px-3.5 max-w-xs">
                        <div className="flex flex-wrap gap-1 text-xs text-neutral-400">
                          {model.evaluatedOn.slice(0, 3).map((suite, idx) => (
                            <span key={idx} className="whitespace-nowrap">
                              {suite}
                              {idx < Math.min(model.evaluatedOn.length, 3) - 1 ? ' · ' : ''}
                            </span>
                          ))}
                          {model.evaluatedOn.length > 3 && (
                            <span className="text-neutral-500 text-[11px] font-mono">
                              +{model.evaluatedOn.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Platforms Availability */}
                      <td className="py-3 px-3.5">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-300">
                          {model.platforms.slice(0, 2).map((p, idx) => (
                            <a
                              key={idx}
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-neutral-400 hover:text-indigo-300 hover:underline whitespace-nowrap"
                              title={`${p.platform} (${p.accessType})`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {p.platform}
                              {idx < Math.min(model.platforms.length, 2) - 1 ? ' · ' : ''}
                            </a>
                          ))}
                          {model.platforms.length > 2 && (
                            <span className="text-neutral-500 text-[11px]">
                              +{model.platforms.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Explicit Citations Popover */}
                      <td className="py-3 px-3.5 text-right whitespace-nowrap">
                        <CitationPopover citations={model.citations} />
                      </td>

                      {/* Expand Button */}
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => toggleExpand(model.id)}
                          className="p-1 text-neutral-400 hover:text-white rounded transition-colors"
                          aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <tr className="bg-neutral-950/80 border-y border-neutral-800/80">
                        <td colSpan={9} className="py-4 px-6 text-xs text-neutral-300">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Description & Architecture */}
                            <div className="space-y-1.5">
                              <span className="font-semibold text-neutral-200 uppercase tracking-wider text-[11px] font-mono">
                                Architecture & Description
                              </span>
                              <p className="text-neutral-300 leading-relaxed">
                                {model.description}
                              </p>
                              <div className="pt-1 text-neutral-400 flex items-center gap-2">
                                <span>Context Window:</span>
                                <span className="font-mono text-white tabular-nums">
                                  {model.contextWindowTokens.toLocaleString()} tokens
                                </span>
                              </div>
                            </div>

                            {/* What's New in Last Update */}
                            <div className="space-y-1.5">
                              <span className="font-semibold text-neutral-200 uppercase tracking-wider text-[11px] font-mono">
                                What&apos;s New in Last Update ({model.lastUpdateDate})
                              </span>
                              <p className="text-indigo-200/90 leading-relaxed bg-neutral-900/60 p-2.5 rounded border border-neutral-800">
                                {model.whatsNewInUpdate}
                              </p>
                            </div>

                            {/* Platforms & Primary Citations */}
                            <div className="space-y-2">
                              <div>
                                <span className="font-semibold text-neutral-200 uppercase tracking-wider text-[11px] font-mono block mb-1">
                                  All Deployment Platforms
                                </span>
                                <div className="space-y-1">
                                  {model.platforms.map((p, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-[11px]">
                                      <a
                                        href={p.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-400 hover:underline flex items-center gap-1"
                                      >
                                        <span>{p.platform}</span>
                                        <ExternalLink className="w-2.5 h-2.5" />
                                      </a>
                                      <span className="text-neutral-500 font-mono">{p.accessType}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="pt-2 border-t border-neutral-800">
                                <span className="font-semibold text-neutral-200 uppercase tracking-wider text-[11px] font-mono block mb-1">
                                  Evaluated Benchmark Suites
                                </span>
                                <div className="flex flex-wrap gap-1.5 text-neutral-300">
                                  {model.evaluatedOn.map((suite, idx) => (
                                    <span key={idx} className="text-neutral-400">
                                      {suite}
                                      {idx < model.evaluatedOn.length - 1 ? ' ·' : ''}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
