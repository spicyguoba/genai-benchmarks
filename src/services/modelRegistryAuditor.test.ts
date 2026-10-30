import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EXTERNAL_KNOWN_MODELS_REGISTRY,
  runCompletenessAudit,
  ingestMissingModels
} from './modelRegistryAuditor';
import { ModelEntry } from '../types';

const mockBaseModels: ModelEntry[] = [
  {
    id: 'claude-mythos',
    name: 'Claude Mythos (Vetted / Glasswing)',
    company: 'Anthropic',
    kind: 'Reasoning / Hybrid',
    tier: 'Frontier',
    description: 'Test entry',
    detailsUrl: 'https://example.com',
    dateCreated: '2026-08-14',
    lastUpdateDate: '2026-10-28',
    whatsNewInUpdate: 'SOTA',
    parameters: { display: '380B', numericBillion: 380 },
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
    evaluatedOn: ['SWE-bench Verified'],
    platforms: [],
    citations: []
  }
];

test('EXTERNAL_KNOWN_MODELS_REGISTRY contains well-known foundation models', () => {
  assert.ok(EXTERNAL_KNOWN_MODELS_REGISTRY.length >= 10);
  const ids = EXTERNAL_KNOWN_MODELS_REGISTRY.map((m) => m.id);
  assert.ok(ids.includes('claude-mythos'));
  assert.ok(ids.includes('openai-o1'));
  assert.ok(ids.includes('claude-3-5-sonnet'));
  assert.ok(ids.includes('llama-3-1-405b'));
  assert.ok(ids.includes('mistral-4'));
  assert.ok(ids.includes('deepseek-4-1-flash'));
});

test('runCompletenessAudit accurately detects existing vs missing models', async () => {
  const report = await runCompletenessAudit(mockBaseModels);
  assert.ok(report.totalAudited >= 10);
  assert.ok(report.matchedCount >= 1);
  assert.ok(report.missingCount > 0);
  assert.ok(report.coveragePercent > 0 && report.coveragePercent < 100);

  const matched = report.results.find((r) => r.auditedModel.id === 'claude-mythos');
  assert.ok(matched);
  assert.equal(matched?.isMatched, true);

  const missing = report.results.find((r) => r.auditedModel.id === 'openai-o1');
  assert.ok(missing);
  assert.equal(missing?.isMatched, false);
});

test('ingestMissingModels adds missing models without duplicates', () => {
  const missingIds = ['openai-o1', 'claude-3-5-sonnet'];
  const updated = ingestMissingModels(mockBaseModels, missingIds);
  assert.equal(updated.length, mockBaseModels.length + 2);

  const ids = updated.map((m) => m.id);
  assert.ok(ids.includes('openai-o1'));
  assert.ok(ids.includes('claude-3-5-sonnet'));

  // Idempotency: re-ingesting already present models does not duplicate
  const reUpdated = ingestMissingModels(updated, missingIds);
  assert.equal(reUpdated.length, updated.length);
});
