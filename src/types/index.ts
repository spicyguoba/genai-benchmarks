export type ModelKind = 
  | 'LLM (General)'
  | 'Reasoning / Hybrid'
  | 'Multimodal (Vision/Audio)'
  | 'Image / Diffusion'
  | 'Video Generation'
  | 'Audio / Speech'
  | 'Code Specialized';

export type ModelTier = 
  | 'Frontier'
  | 'High-Efficiency'
  | 'Local / Open-Weights'
  | 'Edge / Mobile';

export type ThinkingMode = 
  | 'Standard / Instant'
  | 'High Thinking'
  | 'Extended Thinking'
  | 'Expert / Deep Research'
  | 'N/A';

export interface Citation {
  sourceName: 'Hugging Face' | 'Artificial Analysis' | 'LMSYS Chatbot Arena' | 'LiveBench' | 'Epoch AI' | 'arXiv / Official Paper' | 'Vendor Official';
  title: string;
  url: string;
  retrievalDate: string;
  metricVerified: string;
  confidence: 'Verified Primary' | 'Verified Independent Benchmark' | 'Reported Vendor';
}

export interface PlatformAvailability {
  platform: 'Hugging Face' | 'Artificial Analysis' | 'OpenAI API' | 'Anthropic API' | 'Together AI' | 'Replicate' | 'AWS Bedrock' | 'Google Vertex AI' | 'Ollama / Local' | 'Mistral API' | 'DeepSeek API';
  url: string;
  accessType: 'Open Weights' | 'Commercial API' | 'Interactive Playground' | 'On-Premise';
}

export interface ModelEntry {
  id: string;
  name: string;
  company: string;
  kind: ModelKind;
  tier: ModelTier;
  thinkingMode?: ThinkingMode;
  description: string;
  detailsUrl: string;
  dateCreated: string; // YYYY-MM-DD
  lastUpdateDate: string; // YYYY-MM-DD
  whatsNewInUpdate: string;
  parameters: {
    display: string;
    numericBillion: number; // for sorting
    isActiveMoE?: boolean;
    activeBillion?: number;
  };
  contextWindowTokens: number;
  // Metrics & Scores
  intelligenceScore: number; // 0 - 100 normalized
  arenaElo: number; // LMSYS Elo
  codingScore: number; // SWE-bench Verified % or HumanEval %
  agenticScore: number; // GAIA or tool use %
  mathScore: number; // MATH-500 %
  reasoningScore: number; // GPQA Diamond %
  // Economics & Speed
  costPer1MTokens: {
    inputUsd: number;
    outputUsd: number;
    blendedUsd: number; // 3:1 input:output ratio
  };
  throughputTokensPerSec: number;
  ttftMs: number; // time to first token
  license: string;
  // Evaluation suites and availability
  evaluatedOn: string[];
  platforms: PlatformAvailability[];
  citations: Citation[];
}

export interface BenchmarkDefinition {
  id: string;
  name: string;
  category: 'General Intelligence' | 'Reasoning & Math' | 'Coding & SWE' | 'Agentic & Tool Use' | 'Multimodal Vision' | 'Human Preference' | 'Generative Media';
  metricUnit: '% Accuracy' | 'Elo Rating' | 'Pass@1 %' | 'Score (0-100)';
  description: string;
  organizer: string;
  url: string;
  datasetOrLeaderboardUrl: string;
  citation: Citation;
}

export interface CorrelationResult {
  metricA: string;
  metricB: string;
  labelA: string;
  labelB: string;
  r: number; // Pearson r (-1 to +1)
  rSquared: number;
  slope: number;
  intercept: number;
  sampleSize: number;
  points: { modelName: string; company: string; x: number; y: number }[];
}

export interface PipelineStep {
  id: string;
  source: string;
  description: string;
  status: 'pending' | 'running' | 'success' | 'warning' | 'error';
  latencyMs?: number;
  itemsProcessed?: number;
  details?: string;
  url: string;
}

export interface SyncRunLog {
  timestamp: string;
  status: 'idle' | 'syncing' | 'completed' | 'failed';
  totalDurationMs: number;
  modelsProcessed: number;
  benchmarksProcessed: number;
  citationsValidated: number;
  steps: PipelineStep[];
}

export interface ExternalAuditedModel {
  id: string;
  name: string;
  company: string;
  kind: ModelKind;
  tier: ModelTier;
  thinkingMode?: ThinkingMode;
  sourceRegistry: 'Hugging Face Hub API' | 'LMSYS Chatbot Arena' | 'Artificial Analysis' | 'LiveBench' | 'SWE-bench Leaderboard';
  externalUrl: string;
  knownBenchmarks: string[];
  parametersDisplay: string;
  templateEntry: ModelEntry;
}

export interface AuditCheckResult {
  auditedModel: ExternalAuditedModel;
  isMatched: boolean;
  matchedModelId?: string;
  matchedModelName?: string;
  matchType: 'Exact Match' | 'Normalized Match' | 'Missing';
}

export interface CompletenessAuditReport {
  timestamp: string;
  totalAudited: number;
  matchedCount: number;
  missingCount: number;
  coveragePercent: number;
  sourceName: string;
  results: AuditCheckResult[];
  categoryBreakdown: Record<string, { total: number; matched: number; percent: number }>;
}

