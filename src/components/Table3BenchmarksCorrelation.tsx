import React, { useState, useMemo } from 'react';
import { ModelEntry, BenchmarkDefinition } from '../types';
import { CitationPopover } from './CitationPopover';
import { calculatePearsonCorrelation, calculateLinearRegression, formatMetricNumber } from '../utils/statistics';
import { ExternalLink, TrendingUp, Info, HelpCircle } from 'lucide-react';

interface Table3Props {
  benchmarks: BenchmarkDefinition[];
  models: ModelEntry[];
}

interface CorrelationMetricOption {
  id: string;
  label: string;
  unit: string;
  getValue: (m: ModelEntry) => number | null;
}

const CORRELATION_METRICS: CorrelationMetricOption[] = [
  {
    id: 'intelligenceScore',
    label: 'Overall Intelligence Index',
    unit: 'pts (0-100)',
    getValue: (m) => m.intelligenceScore
  },
  {
    id: 'arenaElo',
    label: 'LMSYS Chatbot Arena Elo',
    unit: 'Elo',
    getValue: (m) => (m.arenaElo > 0 ? m.arenaElo : null)
  },
  {
    id: 'codingScore',
    label: 'SWE-bench Coding Capability',
    unit: '% resolved',
    getValue: (m) => (m.codingScore > 0 ? m.codingScore : null)
  },
  {
    id: 'mathScore',
    label: 'MATH-500 Competition Math',
    unit: '%',
    getValue: (m) => (m.mathScore > 0 ? m.mathScore : null)
  },
  {
    id: 'reasoningScore',
    label: 'GPQA Diamond Expert Reasoning',
    unit: '%',
    getValue: (m) => (m.reasoningScore > 0 ? m.reasoningScore : null)
  },
  {
    id: 'agenticScore',
    label: 'Agentic & Tool Use Score (GAIA)',
    unit: '%',
    getValue: (m) => (m.agenticScore > 0 ? m.agenticScore : null)
  },
  {
    id: 'parameters',
    label: 'Model Parameter Scale',
    unit: 'Billion Params',
    getValue: (m) => (m.parameters.numericBillion > 0 ? m.parameters.numericBillion : null)
  },
  {
    id: 'cost',
    label: 'Blended Cost / 1M Tokens',
    unit: 'USD ($)',
    getValue: (m) => m.costPer1MTokens.blendedUsd
  },
  {
    id: 'speed',
    label: 'Inference Throughput',
    unit: 'tokens/sec',
    getValue: (m) => m.throughputTokensPerSec
  }
];

export const Table3BenchmarksCorrelation: React.FC<Table3Props> = ({
  benchmarks,
  models
}) => {
  const [metricXId, setMetricXId] = useState<string>('reasoningScore');
  const [metricYId, setMetricYId] = useState<string>('arenaElo');
  const [hoveredPoint, setHoveredPoint] = useState<{ name: string; x: number; y: number } | null>(null);

  // Benchmarks table sorting
  const [benchmarkSortKey, setBenchmarkSortKey] = useState<'name' | 'category' | 'organizer'>('name');
  const [benchmarkSortAsc, setBenchmarkSortAsc] = useState(true);

  const sortedBenchmarks = useMemo(() => {
    return [...benchmarks].sort((a, b) => {
      const valA = a[benchmarkSortKey].toLowerCase();
      const valB = b[benchmarkSortKey].toLowerCase();
      if (valA < valB) return benchmarkSortAsc ? -1 : 1;
      if (valA > valB) return benchmarkSortAsc ? 1 : -1;
      return 0;
    });
  }, [benchmarks, benchmarkSortKey, benchmarkSortAsc]);

  const metricX = CORRELATION_METRICS.find((m) => m.id === metricXId) || CORRELATION_METRICS[0];
  const metricY = CORRELATION_METRICS.find((m) => m.id === metricYId) || CORRELATION_METRICS[1];

  // Calculate pairs of valid (x, y) coordinates
  const validDataPoints = useMemo(() => {
    const list: { model: ModelEntry; x: number; y: number }[] = [];
    models.forEach((m) => {
      const vx = metricX.getValue(m);
      const vy = metricY.getValue(m);
      if (vx !== null && vy !== null && !isNaN(vx) && !isNaN(vy)) {
        list.push({ model: m, x: vx, y: vy });
      }
    });
    return list;
  }, [models, metricX, metricY]);

  // Linear Regression & Correlation
  const regression = useMemo(() => {
    return calculateLinearRegression(validDataPoints.map((p) => ({ x: p.x, y: p.y })));
  }, [validDataPoints]);

  // Compute full correlation matrix for key metrics
  const matrixMetrics = useMemo(() => {
    return CORRELATION_METRICS.slice(0, 6);
  }, []);

  const fullCorrelationMatrix = useMemo(() => {
    const matrix: Record<string, Record<string, number>> = {};
    matrixMetrics.forEach((m1) => {
      matrix[m1.id] = {};
      matrixMetrics.forEach((m2) => {
        const pairs: { x: number; y: number }[] = [];
        models.forEach((m) => {
          const v1 = m1.getValue(m);
          const v2 = m2.getValue(m);
          if (v1 !== null && v2 !== null) {
            pairs.push({ x: v1, y: v2 });
          }
        });
        const r = calculatePearsonCorrelation(
          pairs.map((p) => p.x),
          pairs.map((p) => p.y)
        );
        matrix[m1.id][m2.id] = r;
      });
    });
    return matrix;
  }, [matrixMetrics, models]);

  // SVG Scatter plot bounds
  const scatterBounds = useMemo(() => {
    if (validDataPoints.length === 0) return { minX: 0, maxX: 100, minY: 0, maxY: 100 };
    const xs = validDataPoints.map((p) => p.x);
    const ys = validDataPoints.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const padX = (maxX - minX) * 0.1 || 5;
    const padY = (maxY - minY) * 0.1 || 5;
    return {
      minX: Math.max(0, minX - padX),
      maxX: maxX + padX,
      minY: Math.max(0, minY - padY),
      maxY: maxY + padY
    };
  }, [validDataPoints]);

  const svgWidth = 600;
  const svgHeight = 320;
  const padding = 45;

  const scaleX = (val: number) => {
    const range = scatterBounds.maxX - scatterBounds.minX || 1;
    return padding + ((val - scatterBounds.minX) / range) * (svgWidth - padding * 2);
  };

  const scaleY = (val: number) => {
    const range = scatterBounds.maxY - scatterBounds.minY || 1;
    return svgHeight - padding - ((val - scatterBounds.minY) / range) * (svgHeight - padding * 2);
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: Benchmarks Catalog & Model Scores Matrix */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold text-white tracking-tight">
              Table 3A: Established GenAI Benchmark Suites & Independent Authority
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Verified benchmark suites from Hugging Face, Princeton SWE-bench, LMSYS, and NYU with direct dataset citations.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            {benchmarks.length} Standardized Suites
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/70 text-neutral-400 uppercase text-[11px] font-semibold tracking-wider font-mono">
                <th
                  onClick={() => {
                    if (benchmarkSortKey === 'name') setBenchmarkSortAsc(!benchmarkSortAsc);
                    else {
                      setBenchmarkSortKey('name');
                      setBenchmarkSortAsc(true);
                    }
                  }}
                  className="py-3 px-4 cursor-pointer hover:text-white"
                >
                  Benchmark Suite & Scope
                </th>
                <th
                  onClick={() => {
                    if (benchmarkSortKey === 'category') setBenchmarkSortAsc(!benchmarkSortAsc);
                    else {
                      setBenchmarkSortKey('category');
                      setBenchmarkSortAsc(true);
                    }
                  }}
                  className="py-3 px-4 cursor-pointer hover:text-white"
                >
                  Category
                </th>
                <th className="py-3 px-4">Metric Unit</th>
                <th
                  onClick={() => {
                    if (benchmarkSortKey === 'organizer') setBenchmarkSortAsc(!benchmarkSortAsc);
                    else {
                      setBenchmarkSortKey('organizer');
                      setBenchmarkSortAsc(true);
                    }
                  }}
                  className="py-3 px-4 cursor-pointer hover:text-white"
                >
                  Organizer & Institution
                </th>
                <th className="py-3 px-4 text-right">Dataset / Space</th>
                <th className="py-3 px-4 text-right">Citations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/70">
              {sortedBenchmarks.map((b) => (
                <tr key={b.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{b.name}</span>
                      <a
                        href={b.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:text-indigo-400 transition-colors"
                        title="Open benchmark homepage"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 max-w-xl leading-relaxed">
                      {b.description}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-neutral-300 font-medium">
                    {b.category}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-neutral-300">
                    {b.metricUnit}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-neutral-400">
                    {b.organizer}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <a
                      href={b.datasetOrLeaderboardUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 hover:underline font-mono"
                    >
                      <span>Hugging Face Hub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <CitationPopover citations={[b.citation]} label="Source" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Statistical Correlation Analysis & Dynamic Scatter Plot */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-semibold text-white tracking-tight">
                Table 3B: Cross-Benchmark Pearson Correlation & Linear Regression
              </h3>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Quantify statistical alignment ($r$) between reasoning, coding capability, human preference Elo, parameter count, and pricing.
            </p>
          </div>

          {/* Interactive Metric Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-neutral-400 font-mono">X Axis:</span>
              <select
                value={metricXId}
                onChange={(e) => setMetricXId(e.target.value)}
                className="bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 font-medium"
              >
                {CORRELATION_METRICS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label} ({m.unit})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-neutral-400 font-mono">Y Axis:</span>
              <select
                value={metricYId}
                onChange={(e) => setMetricYId(e.target.value)}
                className="bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 font-medium"
              >
                {CORRELATION_METRICS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label} ({m.unit})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistical Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-950/70 p-3.5 rounded-lg border border-neutral-800">
          <div>
            <div className="text-[11px] text-neutral-400 uppercase font-mono">Pearson r</div>
            <div className="text-lg font-bold font-mono tabular-nums text-white mt-0.5">
              {regression.r > 0 ? `+${regression.r.toFixed(3)}` : regression.r.toFixed(3)}
            </div>
            <div className="text-[10px] text-neutral-400">
              {Math.abs(regression.r) >= 0.8
                ? 'Strong correlation'
                : Math.abs(regression.r) >= 0.5
                ? 'Moderate correlation'
                : 'Weak / independent'}
            </div>
          </div>

          <div>
            <div className="text-[11px] text-neutral-400 uppercase font-mono">Coefficient R²</div>
            <div className="text-lg font-bold font-mono tabular-nums text-indigo-300 mt-0.5">
              {(regression.rSquared * 100).toFixed(1)}%
            </div>
            <div className="text-[10px] text-neutral-400">Variance explained</div>
          </div>

          <div>
            <div className="text-[11px] text-neutral-400 uppercase font-mono">Regression Equation</div>
            <div className="text-sm font-semibold font-mono text-neutral-200 mt-1 truncate">
              y = {regression.slope}x {regression.intercept >= 0 ? `+ ${regression.intercept}` : `- ${Math.abs(regression.intercept)}`}
            </div>
            <div className="text-[10px] text-neutral-400">Linear slope m = {regression.slope}</div>
          </div>

          <div>
            <div className="text-[11px] text-neutral-400 uppercase font-mono">Sample Size (N)</div>
            <div className="text-lg font-bold font-mono tabular-nums text-neutral-200 mt-0.5">
              {validDataPoints.length} models
            </div>
            <div className="text-[10px] text-neutral-400">Evaluated jointly</div>
          </div>
        </div>

        {/* Dynamic Scatter Plot */}
        <div className="relative bg-neutral-950 p-4 rounded-xl border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
            <span>
              Y: <strong className="text-white font-medium">{metricY.label}</strong> ({metricY.unit})
            </span>
            <span>
              X: <strong className="text-white font-medium">{metricX.label}</strong> ({metricX.unit})
            </span>
          </div>

          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-72 sm:h-80 select-none"
            >
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                const y = padding + pct * (svgHeight - padding * 2);
                const x = padding + pct * (svgWidth - padding * 2);
                return (
                  <g key={i}>
                    <line
                      x1={padding}
                      y1={y}
                      x2={svgWidth - padding}
                      y2={y}
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1={x}
                      y1={padding}
                      x2={x}
                      y2={svgHeight - padding}
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray="4 4"
                    />
                  </g>
                );
              })}

              {/* Regression Line */}
              {validDataPoints.length >= 2 && (
                <line
                  x1={scaleX(scatterBounds.minX)}
                  y1={scaleY(regression.slope * scatterBounds.minX + regression.intercept)}
                  x2={scaleX(scatterBounds.maxX)}
                  y2={scaleY(regression.slope * scatterBounds.maxX + regression.intercept)}
                  stroke="#818cf8"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  opacity="0.85"
                />
              )}

              {/* Data Points */}
              {validDataPoints.map((pt, i) => {
                const cx = scaleX(pt.x);
                const cy = scaleY(pt.y);
                const isHovered = hoveredPoint?.name === pt.model.name;

                return (
                  <g
                    key={i}
                    onMouseEnter={() =>
                      setHoveredPoint({ name: pt.model.name, x: pt.x, y: pt.y })
                    }
                    onMouseLeave={() => setHoveredPoint(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 7 : 4.5}
                      className="fill-indigo-500 stroke-white/80 transition-all"
                      strokeWidth={isHovered ? 2 : 1}
                    />
                    <text
                      x={cx + 8}
                      y={cy - 4}
                      fill={isHovered ? '#ffffff' : '#94a3b8'}
                      fontSize={isHovered ? '11' : '9.5'}
                      fontFamily="monospace"
                      className="pointer-events-none transition-all font-medium"
                    >
                      {pt.model.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Active Hover Tooltip */}
          {hoveredPoint && (
            <div className="absolute top-6 right-6 bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white shadow-xl pointer-events-none font-mono">
              <div className="font-bold text-indigo-300">{hoveredPoint.name}</div>
              <div className="text-neutral-400 mt-1">
                {metricX.label}: <span className="text-white">{hoveredPoint.x}</span>
              </div>
              <div className="text-neutral-400">
                {metricY.label}: <span className="text-white">{hoveredPoint.y}</span>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: Multi-Metric Pearson Correlation Heatmap Matrix */}
        <div>
          <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono mb-2.5">
            Full Benchmark Correlation Matrix (Pearson r)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-mono text-[11px]">
                  <th className="py-2 px-3 text-left">Metric</th>
                  {matrixMetrics.map((m) => (
                    <th key={m.id} className="py-2 px-2 whitespace-nowrap">
                      {m.label.split(' ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-mono">
                {matrixMetrics.map((rowMetric) => (
                  <tr key={rowMetric.id} className="hover:bg-neutral-800/30">
                    <td className="py-2 px-3 text-left font-medium text-neutral-300 whitespace-nowrap">
                      {rowMetric.label}
                    </td>
                    {matrixMetrics.map((colMetric) => {
                      const r = fullCorrelationMatrix[rowMetric.id]?.[colMetric.id] ?? 0;
                      const isDiagonal = rowMetric.id === colMetric.id;
                      let bgStyle = 'text-neutral-400';
                      if (isDiagonal) {
                        bgStyle = 'text-white font-bold bg-neutral-800/40';
                      } else if (r >= 0.8) {
                        bgStyle = 'text-emerald-400 font-semibold bg-emerald-950/20';
                      } else if (r >= 0.5) {
                        bgStyle = 'text-indigo-300 bg-indigo-950/20';
                      } else if (r < 0) {
                        bgStyle = 'text-amber-400 bg-amber-950/20';
                      }

                      return (
                        <td key={colMetric.id} className={`py-2 px-2 tabular-nums ${bgStyle}`}>
                          {r > 0 ? `+${r.toFixed(2)}` : r.toFixed(2)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
