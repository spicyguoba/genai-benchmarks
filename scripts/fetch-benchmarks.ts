/**
 * Standalone reproducible CLI pipeline for GenAI model benchmarks.
 * Usage: npx --yes tsx scripts/fetch-benchmarks.ts
 */
import { runReproducibleSync } from '../src/services/reproducibleSync';

async function main() {
  console.log('==================================================================');
  console.log('🚀 Starting GenAI Benchmark & Model Data Synchronization Pipeline');
  console.log('==================================================================\n');

  const { updatedModels, log } = await runReproducibleSync((step) => {
    const symbol = step.status === 'success' ? '✅' : step.status === 'warning' ? '⚠️' : step.status === 'running' ? '⏳' : '⚪';
    console.log(`${symbol} [${step.source}] - ${step.status.toUpperCase()}`);
    if (step.details) {
      console.log(`   └─ ${step.details} (${step.latencyMs || 0}ms)`);
    }
  });

  console.log('\n==================================================================');
  console.log(`✨ Pipeline Completed in ${log.totalDurationMs}ms`);
  console.log(`📊 Models Processed: ${log.modelsProcessed}`);
  console.log(`🎯 Benchmarks Tracked: ${log.benchmarksProcessed}`);
  console.log(`🔗 Citations Validated: ${log.citationsValidated}`);
  console.log('==================================================================');

  // Verify non-empty
  if (updatedModels.length === 0) {
    console.error('❌ Error: No models processed.');
    process.exit(1);
  }

  process.exit(0);
}

main().catch(err => {
  console.error('Pipeline failed:', err);
  process.exit(1);
});
