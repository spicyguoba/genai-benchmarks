import test from 'node:test';
import assert from 'node:assert/strict';
import {
  groupModelsByTypeAndScore,
  generateModelsGroupedCsv,
  generateBenchmarksDetailedCsv,
  generateModelBenchmarkMatrixCsv,
  generateUnifiedExportBundleCsv,
  generateComprehensiveMarkdownReport,
  generateComprehensiveJsonExport,
  generatePaperSaverPlainText
} from './exportGenerators';
import { ModelEntry, BenchmarkDefinition } from '../types';

const testModels: ModelEntry[] = [
  {
    id: 'test-reasoner-1',
    name: 'Test Reasoner 1',
    company: 'Anthropic',
    kind: 'Reasoning / Hybrid',
    tier: 'Frontier',
    thinkingMode: 'Expert / Deep Research',
    description: 'Autonomous reasoning test model',
    detailsUrl: 'https://example.com/r1',
    dateCreated: '2026-08-14',
    lastUpdateDate: '2026-10-28',
    whatsNewInUpdate: 'SOTA update',
    parameters: { display: '380B MoE', numericBillion: 380 },
    contextWindowTokens: 1000000,
    intelligenceScore: 99.9,
    arenaElo: 1552,
    codingScore: 93.9,
    agenticScore: 94.6,
    mathScore: 99.6,
    reasoningScore: 84.2,
    costPer1MTokens: { inputUsd: 5.0, outputUsd: 20.0, blendedUsd: 8.75 },
    throughputTokensPerSec: 45,
    ttftMs: 1400,
    license: 'Restricted',
    evaluatedOn: ['LiveBench', 'SWE-bench Verified', 'MATH-500'],
    platforms: [{ platform: 'Anthropic API', url: 'https://example.com', accessType: 'Commercial API' }],
    citations: [
      {
        sourceName: 'Vendor Official',
        title: 'Project Glasswing Verification',
        url: 'https://example.com/cite1',
        retrievalDate: '2026-10-28',
        metricVerified: 'SWE-bench 93.9%',
        confidence: 'Verified Primary'
      }
    ]
  },
  {
    id: 'test-reasoner-2',
    name: 'Test Reasoner 2',
    company: 'Anthropic',
    kind: 'Reasoning / Hybrid',
    tier: 'Frontier',
    thinkingMode: 'Extended Thinking',
    description: 'Safeguarded reasoning model',
    detailsUrl: 'https://example.com/r2',
    dateCreated: '2026-08-20',
    lastUpdateDate: '2026-10-27',
    whatsNewInUpdate: 'Long horizon agent release',
    parameters: { display: '350B MoE', numericBillion: 350 },
    contextWindowTokens: 500000,
    intelligenceScore: 99.5,
    arenaElo: 1535,
    codingScore: 88.4,
    agenticScore: 92.8,
    mathScore: 98.8,
    reasoningScore: 81.6,
    costPer1MTokens: { inputUsd: 3.5, outputUsd: 14.0, blendedUsd: 6.125 },
    throughputTokensPerSec: 52,
    ttftMs: 680,
    license: 'Proprietary',
    evaluatedOn: ['LiveBench', 'SWE-bench Verified'],
    platforms: [{ platform: 'Anthropic API', url: 'https://example.com', accessType: 'Commercial API' }],
    citations: []
  },
  {
    id: 'test-image-1',
    name: 'Test Diffusion 1',
    company: 'Lab Pixels',
    kind: 'Image / Diffusion',
    tier: 'Frontier',
    thinkingMode: 'N/A',
    description: 'Image synthesis model',
    detailsUrl: 'https://example.com/img1',
    dateCreated: '2026-03-14',
    lastUpdateDate: '2026-09-10',
    whatsNewInUpdate: 'GenEval score boost',
    parameters: { display: '16B DiT', numericBillion: 16 },
    contextWindowTokens: 1024,
    intelligenceScore: 96.5,
    arenaElo: 1420,
    codingScore: 0,
    agenticScore: 48.0,
    mathScore: 0,
    reasoningScore: 88.5,
    costPer1MTokens: { inputUsd: 0.04, outputUsd: 0.04, blendedUsd: 0.04 },
    throughputTokensPerSec: 3.2,
    ttftMs: 950,
    license: 'Commercial',
    evaluatedOn: ['GenEval'],
    platforms: [{ platform: 'Replicate', url: 'https://example.com', accessType: 'Commercial API' }],
    citations: []
  }
];

const testBenchmarks: BenchmarkDefinition[] = [
  {
    id: 'livebench',
    name: 'LiveBench',
    category: 'General Intelligence',
    metricUnit: 'Score (0-100)',
    description: 'Contamination-free benchmark with monthly refreshed tasks',
    organizer: 'UC Berkeley & Abacus.ai',
    url: 'https://livebench.ai',
    datasetOrLeaderboardUrl: 'https://livebench.ai/leaderboard',
    citation: {
      sourceName: 'LiveBench',
      title: 'LiveBench Contamination-Free Evaluation',
      url: 'https://livebench.ai',
      retrievalDate: '2026-10-28',
      metricVerified: 'Overall score',
      confidence: 'Verified Independent Benchmark'
    }
  },
  {
    id: 'swe-bench',
    name: 'SWE-bench Verified',
    category: 'Coding & SWE',
    metricUnit: 'Pass@1 %',
    description: 'Real-world software engineering bug resolution',
    organizer: 'Princeton University',
    url: 'https://swebench.com',
    datasetOrLeaderboardUrl: 'https://swebench.com/leaderboard',
    citation: {
      sourceName: 'Hugging Face',
      title: 'SWE-bench Verified Dataset',
      url: 'https://huggingface.co',
      retrievalDate: '2026-10-28',
      metricVerified: 'Pass@1 rate',
      confidence: 'Verified Independent Benchmark'
    }
  }
];

test('groupModelsByTypeAndScore groups correctly and sorts by intelligenceScore descending', () => {
  const grouped = groupModelsByTypeAndScore(testModels);
  assert.equal(grouped.length, 2); // Reasoning / Hybrid and Image / Diffusion

  const reasoningGroup = grouped.find((g) => g.kind === 'Reasoning / Hybrid');
  assert.ok(reasoningGroup);
  assert.equal(reasoningGroup.models.length, 2);
  assert.equal(reasoningGroup.models[0].name, 'Test Reasoner 1');
  assert.equal(reasoningGroup.models[1].name, 'Test Reasoner 2');
  assert.equal(reasoningGroup.topModel.intelligenceScore, 99.9);
  assert.equal(reasoningGroup.averageScore, 99.7);
});

test('generateModelsGroupedCsv outputs valid CSV header and rows', () => {
  const csv = generateModelsGroupedCsv(testModels);
  const lines = csv.split('\n');
  assert.ok(lines.length >= 4);
  assert.ok(lines[0].startsWith('Model Type / Kind,Rank in Type,Model Name'));
  assert.ok(csv.includes('Test Reasoner 1'));
  assert.ok(csv.includes('Test Diffusion 1'));
});

test('generateBenchmarksDetailedCsv outputs all benchmarks and detailed descriptions', () => {
  const csv = generateBenchmarksDetailedCsv(testBenchmarks);
  const lines = csv.split('\n');
  assert.equal(lines.length, 3); // 1 header + 2 benchmarks
  assert.ok(csv.includes('Contamination-free benchmark with monthly refreshed tasks'));
  assert.ok(csv.includes('Real-world software engineering bug resolution'));
});

test('generateModelBenchmarkMatrixCsv outputs model x benchmark score table', () => {
  const csv = generateModelBenchmarkMatrixCsv(testModels, testBenchmarks);
  const lines = csv.split('\n');
  assert.equal(lines.length, 4); // 1 header + 3 models
  assert.ok(lines[0].includes('LiveBench [Score (0-100)]'));
  assert.ok(lines[0].includes('SWE-bench Verified [Pass@1 %]'));
  assert.ok(csv.includes('Test Reasoner 1'));
  assert.ok(csv.includes('93.9%'));
});

test('generateComprehensiveMarkdownReport contains all 3 requested sections', () => {
  const md = generateComprehensiveMarkdownReport(testModels, testBenchmarks);
  assert.ok(md.includes('## Section 1: GenAI Models Grouped by Type'));
  assert.ok(md.includes('## Section 2: Established Benchmarks & Detailed Technical Descriptions'));
  assert.ok(md.includes('## Section 3: GenAI Models / Benchmark Score Cross-Comparison Matrix'));
  assert.ok(md.includes('Test Reasoner 1'));
  assert.ok(md.includes('LiveBench'));
  assert.ok(md.includes('SWE-bench Verified'));
});

test('generateComprehensiveJsonExport produces structured JSON with all components', () => {
  const json = generateComprehensiveJsonExport(testModels, testBenchmarks);
  assert.equal(json.metadata.totalModels, 3);
  assert.equal(json.metadata.totalBenchmarks, 2);
  assert.ok(json.modelsGroupedByType['Reasoning / Hybrid']);
  assert.ok(json.modelsGroupedByType['Image / Diffusion']);
  assert.equal(json.modelsBenchmarkScoreMatrix.length, 3);
  assert.equal(json.benchmarksDetailed.length, 2);
});

test('generatePaperSaverPlainText generates dense ink-saving dossier text', () => {
  const text = generatePaperSaverPlainText(testModels, testBenchmarks);
  assert.ok(text.includes('PAPER-SAVER COMPACT FORMAT'));
  assert.ok(text.includes('SECTION 1: MODELS GROUPED BY ARCHITECTURE TYPE'));
  assert.ok(text.includes('SECTION 2: BENCHMARK SPECIFICATIONS SUMMARY'));
  assert.ok(text.includes('SECTION 3: MODEL X BENCHMARK SCORE MATRIX'));
  assert.ok(text.includes('Test Reasoner 1'));
  assert.ok(text.includes('livebench'));
  assert.ok(text.includes('swe-bench'));
});

