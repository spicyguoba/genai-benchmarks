/**
 * Pure statistical and correlation analysis functions for GenAI benchmark analysis.
 */

export function calculateMean(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, v) => acc + v, 0);
  return sum / values.length;
}

export function calculateVariance(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = calculateMean(values);
  const sumSquaredDiff = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
  return sumSquaredDiff / (values.length - 1); // Sample variance
}

export function calculateStandardDeviation(values: number[]): number {
  return Math.sqrt(calculateVariance(values));
}

export function calculateCovariance(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) return 0;
  const meanX = calculateMean(x);
  const meanY = calculateMean(y);
  let sumProductDiff = 0;
  for (let i = 0; i < x.length; i++) {
    sumProductDiff += (x[i] - meanX) * (y[i] - meanY);
  }
  return sumProductDiff / (x.length - 1);
}

export function calculatePearsonCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) return 0;
  const sX = calculateStandardDeviation(x);
  const sY = calculateStandardDeviation(y);
  if (sX === 0 || sY === 0) return 0;

  const cov = calculateCovariance(x, y);
  const r = cov / (sX * sY);
  // Clamp between -1 and 1 to prevent floating point inaccuracy
  return Math.max(-1, Math.min(1, Number(r.toFixed(4))));
}

export interface LinearRegressionResult {
  slope: number;
  intercept: number;
  r: number;
  rSquared: number;
  sampleSize: number;
}

export function calculateLinearRegression(points: { x: number; y: number }[]): LinearRegressionResult {
  const validPoints = points.filter(p => !isNaN(p.x) && !isNaN(p.y) && isFinite(p.x) && isFinite(p.y));
  if (validPoints.length < 2) {
    return { slope: 0, intercept: 0, r: 0, rSquared: 0, sampleSize: validPoints.length };
  }

  const x = validPoints.map(p => p.x);
  const y = validPoints.map(p => p.y);
  const meanX = calculateMean(x);
  const meanY = calculateMean(y);

  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < validPoints.length; i++) {
    const diffX = x[i] - meanX;
    numerator += diffX * (y[i] - meanY);
    denominator += diffX * diffX;
  }

  if (denominator === 0) {
    return { slope: 0, intercept: meanY, r: 0, rSquared: 0, sampleSize: validPoints.length };
  }

  const slope = numerator / denominator;
  const intercept = meanY - slope * meanX;
  const r = calculatePearsonCorrelation(x, y);
  const rSquared = Math.max(0, Math.min(1, Number((r * r).toFixed(4))));

  return {
    slope: Number(slope.toFixed(4)),
    intercept: Number(intercept.toFixed(4)),
    r,
    rSquared,
    sampleSize: validPoints.length
  };
}

export function formatMetricNumber(val: number | undefined | null, decimals = 1, suffix = ''): string {
  if (val === undefined || val === null || isNaN(val)) return '—';
  return `${val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
}

export function formatCurrency(val: number | undefined | null): string {
  if (val === undefined || val === null || isNaN(val)) return '—';
  if (val === 0) return 'Free / Open';
  if (val < 0.01) return `$${val.toFixed(3)}`;
  return `$${val.toFixed(2)}`;
}
