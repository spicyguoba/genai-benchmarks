import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMean,
  calculateVariance,
  calculatePearsonCorrelation,
  calculateLinearRegression,
  formatMetricNumber,
  formatCurrency
} from './statistics';

test('calculateMean computes accurate average', () => {
  assert.equal(calculateMean([10, 20, 30, 40]), 25);
  assert.equal(calculateMean([]), 0);
  assert.equal(calculateMean([5]), 5);
});

test('calculateVariance computes sample variance', () => {
  // [2, 4, 6] -> mean = 4, diffs = -2, 0, 2 -> sumSq = 8 -> / (3-1) = 4
  assert.equal(calculateVariance([2, 4, 6]), 4);
  assert.equal(calculateVariance([10]), 0);
});

test('calculatePearsonCorrelation returns 1 for perfect positive linear correlation', () => {
  const x = [1, 2, 3, 4, 5];
  const y = [10, 20, 30, 40, 50];
  const r = calculatePearsonCorrelation(x, y);
  assert.equal(r, 1);
});

test('calculatePearsonCorrelation returns -1 for perfect negative linear correlation', () => {
  const x = [1, 2, 3, 4, 5];
  const y = [50, 40, 30, 20, 10];
  const r = calculatePearsonCorrelation(x, y);
  assert.equal(r, -1);
});

test('calculateLinearRegression computes slope, intercept and rSquared', () => {
  const points = [
    { x: 1, y: 3 },
    { x: 2, y: 5 },
    { x: 3, y: 7 },
    { x: 4, y: 9 }
  ];
  const res = calculateLinearRegression(points);
  assert.equal(res.slope, 2);
  assert.equal(res.intercept, 1);
  assert.equal(res.r, 1);
  assert.equal(res.rSquared, 1);
  assert.equal(res.sampleSize, 4);
});

test('formatMetricNumber and formatCurrency format correctly', () => {
  assert.equal(formatMetricNumber(84.32, 1, '%'), '84.3%');
  assert.equal(formatMetricNumber(null), '—');
  assert.equal(formatCurrency(0), 'Free / Open');
  assert.equal(formatCurrency(3.00), '$3.00');
  assert.equal(formatCurrency(0.005), '$0.005');
});
