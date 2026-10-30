import test from 'node:test';
import assert from 'node:assert/strict';
import { filterModels, sortModels, ModelFilterState } from './filterSort';
import { ModelEntry } from '../types';

const sampleModels: ModelEntry[] = [
  {
    id: 'model-a',
    name: 'Alpha LLM',
    company: 'Lab A',
    kind: 'LLM (General)',
    tier: 'Frontier',
    thinkingMode: 'Standard / Instant',
    description: 'High capacity model',
    detailsUrl: 'https://example.com/a',
    dateCreated: '2025-01-10',
    lastUpdateDate: '2025-05-01',
    whatsNewInUpdate: 'Added system prompts',
    parameters: { display: '70B', numericBillion: 70 },
    contextWindowTokens: 128000,
    intelligenceScore: 88,
    arenaElo: 1310,
    codingScore: 78.5,
    agenticScore: 65,
    mathScore: 82,
    reasoningScore: 74,
    costPer1MTokens: { inputUsd: 1.0, outputUsd: 3.0, blendedUsd: 2.5 },
    throughputTokensPerSec: 65,
    ttftMs: 400,
    license: 'Apache 2.0',
    evaluatedOn: ['MMLU-Pro', 'SWE-bench'],
    platforms: [{ platform: 'Hugging Face', url: 'https://hf.co/a', accessType: 'Open Weights' }],
    citations: []
  },
  {
    id: 'model-b',
    name: 'Beta Reasoner',
    company: 'Lab B',
    kind: 'Reasoning / Hybrid',
    tier: 'Frontier',
    thinkingMode: 'High Thinking',
    description: 'Reinforced chain of thought',
    detailsUrl: 'https://example.com/b',
    dateCreated: '2025-03-15',
    lastUpdateDate: '2025-06-20',
    whatsNewInUpdate: 'Dynamic reasoning effort slider',
    parameters: { display: '671B MoE', numericBillion: 671 },
    contextWindowTokens: 200000,
    intelligenceScore: 94,
    arenaElo: 1365,
    codingScore: 86.2,
    agenticScore: 79,
    mathScore: 92,
    reasoningScore: 88,
    costPer1MTokens: { inputUsd: 0.55, outputUsd: 2.19, blendedUsd: 1.78 },
    throughputTokensPerSec: 42,
    ttftMs: 650,
    license: 'MIT',
    evaluatedOn: ['SWE-bench', 'AIME', 'GPQA'],
    platforms: [{ platform: 'Hugging Face', url: 'https://hf.co/b', accessType: 'Open Weights' }],
    citations: []
  },
  {
    id: 'model-c',
    name: 'Gamma Mini',
    company: 'Lab A',
    kind: 'LLM (General)',
    tier: 'Local / Open-Weights',
    description: 'Edge friendly model',
    detailsUrl: 'https://example.com/c',
    dateCreated: '2025-02-01',
    lastUpdateDate: '2025-04-10',
    whatsNewInUpdate: 'Quantization support',
    parameters: { display: '8B', numericBillion: 8 },
    contextWindowTokens: 32000,
    intelligenceScore: 72,
    arenaElo: 1210,
    codingScore: 61.0,
    agenticScore: 48,
    mathScore: 64,
    reasoningScore: 55,
    costPer1MTokens: { inputUsd: 0.05, outputUsd: 0.15, blendedUsd: 0.125 },
    throughputTokensPerSec: 120,
    ttftMs: 210,
    license: 'Apache 2.0',
    evaluatedOn: ['MMLU-Pro'],
    platforms: [{ platform: 'Hugging Face', url: 'https://hf.co/c', accessType: 'Open Weights' }],
    citations: []
  }
];

test('filterModels filters by search term across name, company, and description', () => {
  const filter: ModelFilterState = {
    searchTerm: 'chain of thought',
    kind: 'All',
    tier: 'All',
    company: 'All'
  };
  const results = filterModels(sampleModels, filter);
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'model-b');
});

test('filterModels filters by tier and company', () => {
  const filter: ModelFilterState = {
    searchTerm: '',
    kind: 'All',
    tier: 'Local / Open-Weights',
    company: 'Lab A'
  };
  const results = filterModels(sampleModels, filter);
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'model-c');
});

test('sortModels sorts ascending and descending by coding score and parameters', () => {
  const descCoding = sortModels(sampleModels, 'codingScore', 'desc');
  assert.equal(descCoding[0].id, 'model-b'); // 86.2
  assert.equal(descCoding[2].id, 'model-c'); // 61.0

  const ascParams = sortModels(sampleModels, 'parameters', 'asc');
  assert.equal(ascParams[0].id, 'model-c'); // 8B
  assert.equal(ascParams[2].id, 'model-b'); // 671B
});

test('filterModels filters by thinkingMode accurately', () => {
  const filterHighThinking: ModelFilterState = {
    searchTerm: '',
    kind: 'All',
    tier: 'All',
    company: 'All',
    thinkingMode: 'High Thinking'
  };
  const highResults = filterModels(sampleModels, filterHighThinking);
  assert.equal(highResults.length, 1);
  assert.equal(highResults[0].id, 'model-b');

  const filterStandard: ModelFilterState = {
    searchTerm: '',
    kind: 'All',
    tier: 'All',
    company: 'All',
    thinkingMode: 'Standard / Instant'
  };
  const standardResults = filterModels(sampleModels, filterStandard);
  assert.equal(standardResults.length, 1);
  assert.equal(standardResults[0].id, 'model-a');
});
