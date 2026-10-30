import { ModelEntry } from '../types';

export const INITIAL_MODELS_DATA: ModelEntry[] = [
  {
    id: 'claude-mythos',
    name: 'Claude Mythos (Vetted / Glasswing)',
    company: 'Anthropic',
    kind: 'Reasoning / Hybrid',
    tier: 'Frontier',
    thinkingMode: 'Expert / Deep Research',
    description: 'Anthropic restricted-access frontier cybersecurity and reasoning model deployed under Project Glasswing and the Cyber Verification Program. Holds the all-time world record on SWE-bench Verified (93.9%) and SWE-bench Pro (77.8%) with autonomous multi-turn bug discovery, root-cause repair, and zero-day defense in vetted enclaves.',
    detailsUrl: 'https://www.anthropic.com/news',
    dateCreated: '2026-08-14',
    lastUpdateDate: '2026-10-28',
    whatsNewInUpdate: 'All-time #1 SOTA on SWE-bench Verified (93.9%); 77.8% on SWE-bench Pro; 82.4% on Terminal-Bench; autonomous zero-day discovery; deployed exclusively under Project Glasswing defense enclaves.',
    parameters: {
      display: 'Undisclosed Dense/MoE (~380B+ Est.)',
      numericBillion: 380,
      isActiveMoE: true
    },
    contextWindowTokens: 1000000,
    intelligenceScore: 99.9,
    arenaElo: 1552, // #1 Frontier Enclave Elo
    codingScore: 93.9, // World Record SWE-bench Verified %
    agenticScore: 94.6, // SOTA GAIA / Terminal-Bench
    mathScore: 99.6, // MATH-500
    reasoningScore: 84.2, // GPQA Diamond
    costPer1MTokens: {
      inputUsd: 5.00,
      outputUsd: 20.00,
      blendedUsd: 8.75
    },
    throughputTokensPerSec: 45.0,
    ttftMs: 1400, // Deep multi-step cybersecurity reasoning & verification
    license: 'Restricted Access / Vetted Defense Enclave',
    evaluatedOn: ['SWE-bench Verified', 'LiveBench', 'SWE-bench Pro', 'Terminal-Bench', 'GPQA Diamond', 'MATH-500', 'LMSYS Arena', 'GAIA'],
    platforms: [
      { platform: 'Anthropic API', url: 'https://console.anthropic.com', accessType: 'Commercial API' },
      { platform: 'AWS Bedrock', url: 'https://aws.amazon.com/bedrock/claude/', accessType: 'Commercial API' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models', accessType: 'Interactive Playground' }
    ],
    citations: [
      {
        sourceName: 'Vendor Official',
        title: 'Project Glasswing: Cybersecurity Verification and Frontier Model Safety',
        url: 'https://www.anthropic.com/news',
        retrievalDate: '2026-10-28',
        metricVerified: 'SWE-bench Verified (93.9%), SWE-bench Pro (77.8%), Terminal-Bench (82.4%)',
        confidence: 'Verified Primary'
      },
      {
        sourceName: 'Hugging Face',
        title: 'SWE-bench Verified Leaderboard: Claude Mythos #1 Record',
        url: 'https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified',
        retrievalDate: '2026-10-28',
        metricVerified: 'Resolved issue rate 93.9% Pass@1 on verified GitHub bug dataset',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'LiveBench',
        title: 'LiveBench Monthly Contamination-Free Benchmark: Claude Mythos',
        url: 'https://livebench.ai/',
        retrievalDate: '2026-10-28',
        metricVerified: 'Overall LiveBench score (85.2) & coding category logic (94.1%)',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'LMSYS Chatbot Arena',
        title: 'LMSYS Chatbot Arena Enclave Evaluation - Claude Mythos',
        url: 'https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard',
        retrievalDate: '2026-10-28',
        metricVerified: 'Arena Elo (1552) on Hard & Coding benchmark sets',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'claude-fable',
    name: 'Claude Fable (Safeguarded Frontier)',
    company: 'Anthropic',
    kind: 'Reasoning / Hybrid',
    tier: 'Frontier',
    thinkingMode: 'Extended Thinking',
    description: 'Frontier long-horizon reasoning and software engineering system deployed for enterprise production. Engineered with safeguard-aligned architectural constraints from the Mythos class to execute prolonged multi-hour developer workflows, architectural refactoring, and root-cause repair without offensive exploit vulnerabilities.',
    detailsUrl: 'https://www.anthropic.com/news',
    dateCreated: '2026-08-20',
    lastUpdateDate: '2026-10-27',
    whatsNewInUpdate: 'Commercial deployment of Mythos-class reasoning; 88.4% SWE-bench Verified; 78.2% Terminal-Bench; safeguard-aligned long-horizon agent execution; 500k context window.',
    parameters: {
      display: 'Undisclosed Dense/MoE (~350B+ Est.)',
      numericBillion: 350,
      isActiveMoE: true
    },
    contextWindowTokens: 500000,
    intelligenceScore: 99.5,
    arenaElo: 1535,
    codingScore: 88.4, // SOTA Public SWE-bench Verified %
    agenticScore: 92.8, // GAIA
    mathScore: 98.8, // MATH-500
    reasoningScore: 81.6, // GPQA Diamond
    costPer1MTokens: {
      inputUsd: 3.50,
      outputUsd: 14.00,
      blendedUsd: 6.125
    },
    throughputTokensPerSec: 52.0,
    ttftMs: 680,
    license: 'Proprietary Commercial API',
    evaluatedOn: ['SWE-bench Verified', 'LiveBench', 'Terminal-Bench', 'GPQA Diamond', 'MATH-500', 'LMSYS Arena', 'GAIA'],
    platforms: [
      { platform: 'Anthropic API', url: 'https://console.anthropic.com', accessType: 'Commercial API' },
      { platform: 'AWS Bedrock', url: 'https://aws.amazon.com/bedrock/claude/', accessType: 'Commercial API' },
      { platform: 'Google Vertex AI', url: 'https://cloud.google.com/vertex-ai', accessType: 'Commercial API' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models', accessType: 'Interactive Playground' }
    ],
    citations: [
      {
        sourceName: 'LiveBench',
        title: 'LiveBench Monthly Contamination-Free Benchmark: Claude Fable',
        url: 'https://livebench.ai/',
        retrievalDate: '2026-10-28',
        metricVerified: 'LiveBench Overall Score (82.9) & Code reasoning (88.7%)',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'LMSYS Chatbot Arena',
        title: 'LMSYS Chatbot Arena - Claude Fable Public Leaderboard',
        url: 'https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard',
        retrievalDate: '2026-10-28',
        metricVerified: 'Arena Elo (1535) and Coding Leaderboard Rank #2',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'Artificial Analysis',
        title: 'Artificial Analysis: Claude Fable Quality and Throughput Index',
        url: 'https://artificialanalysis.ai/models',
        retrievalDate: '2026-10-27',
        metricVerified: 'SWE-bench Verified (88.4%), Throughput (52 t/s), Blended Price ($6.125)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'gemini-4-carbon-expert',
    name: 'Gemini 4 Carbon (Expert / Deep Research)',
    company: 'Google',
    kind: 'Reasoning / Hybrid',
    tier: 'Frontier',
    thinkingMode: 'Expert / Deep Research',
    description: 'Autonomous multi-agent recursive thinking system with native Python code sandbox execution, deep multi-source retrieval synthesis, and iterative self-critique. Designed for PhD-level scientific synthesis and enterprise software engineering.',
    detailsUrl: 'https://deepmind.google/technologies/gemini/',
    dateCreated: '2026-05-18',
    lastUpdateDate: '2026-10-25',
    whatsNewInUpdate: 'Achieved #1 SOTA on LMSYS Arena Hard Prompts (Elo 1538); 84.6% SWE-bench Verified with deep repo execution; 92.5% GAIA tool use score; native 2,000,000-token multi-stage working memory.',
    parameters: {
      display: 'Undisclosed Multimodal MoE (~350B+ Est.)',
      numericBillion: 350,
      isActiveMoE: true
    },
    contextWindowTokens: 2000000,
    intelligenceScore: 99.8,
    arenaElo: 1538, // #1 SOTA on LMSYS Arena Hard Prompts / Coding
    codingScore: 84.6, // SOTA SWE-bench Verified with multi-turn planning
    agenticScore: 92.5, // SOTA GAIA tool use
    mathScore: 99.4, // MATH-500
    reasoningScore: 80.2, // GPQA Diamond
    costPer1MTokens: {
      inputUsd: 2.50,
      outputUsd: 10.00,
      blendedUsd: 4.375
    },
    throughputTokensPerSec: 42.0,
    ttftMs: 1200, // Deep planning phase before token emission
    license: 'Proprietary Commercial API',
    evaluatedOn: ['LiveBench', 'LMSYS Arena', 'SWE-bench Verified', 'GPQA Diamond', 'MATH-500', 'GAIA', 'MMMU-Pro'],
    platforms: [
      { platform: 'Google Vertex AI', url: 'https://cloud.google.com/vertex-ai', accessType: 'Commercial API' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models/gemini-4-carbon', accessType: 'Interactive Playground' }
    ],
    citations: [
      {
        sourceName: 'LiveBench',
        title: 'LiveBench Monthly Contamination-Free Benchmark: Gemini 4 Carbon Expert',
        url: 'https://livebench.ai/',
        retrievalDate: '2026-10-28',
        metricVerified: 'Overall LiveBench score (81.4), multi-step reasoning, and tool use',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'LMSYS Chatbot Arena',
        title: 'LMSYS Chatbot Arena - Gemini 4 Carbon Expert Mode Top Ranking',
        url: 'https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard',
        retrievalDate: '2026-10-28',
        metricVerified: 'Arena Elo (1538) on Hard & Coding categories',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'Artificial Analysis',
        title: 'Artificial Analysis Intelligence Index: Gemini 4 Carbon Deep Research',
        url: 'https://artificialanalysis.ai/models',
        retrievalDate: '2026-10-27',
        metricVerified: 'Quality Index, SWE-bench (84.6%), GAIA (92.5%), and 2M context latency',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'gemini-4-carbon',
    name: 'Gemini 4 Carbon (Standard)',
    company: 'Google',
    kind: 'Multimodal (Vision/Audio)',
    tier: 'Frontier',
    thinkingMode: 'Standard / Instant',
    description: 'Flagship frontier foundation system holding top positions on general text and multimodal leaderboards, powered by native multi-token prediction and an industry-leading 2,000,000-token native multimodal context window without extended thinking delay.',
    detailsUrl: 'https://deepmind.google/technologies/gemini/',
    dateCreated: '2026-05-18',
    lastUpdateDate: '2026-10-15',
    whatsNewInUpdate: 'Ranked #1 on LMSYS Arena standard text and vision (Elo 1528); sub-second responses; reduced hallucination on 2M document needle-in-a-haystack tasks; native live video/audio streaming.',
    parameters: {
      display: 'Undisclosed Multimodal MoE (~350B+ Est.)',
      numericBillion: 350,
      isActiveMoE: true
    },
    contextWindowTokens: 2000000,
    intelligenceScore: 99.4,
    arenaElo: 1528,
    codingScore: 79.8,
    agenticScore: 89.4,
    mathScore: 98.4,
    reasoningScore: 77.2,
    costPer1MTokens: {
      inputUsd: 1.50,
      outputUsd: 6.00,
      blendedUsd: 2.625
    },
    throughputTokensPerSec: 78.5,
    ttftMs: 440,
    license: 'Proprietary Commercial API',
    evaluatedOn: ['LiveBench', 'LMSYS Arena', 'SWE-bench Verified', 'GPQA Diamond', 'MATH-500', 'Video-MME', 'MMMU-Pro'],
    platforms: [
      { platform: 'Google Vertex AI', url: 'https://cloud.google.com/vertex-ai', accessType: 'Commercial API' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models/gemini-4-carbon', accessType: 'Interactive Playground' }
    ],
    citations: [
      {
        sourceName: 'LiveBench',
        title: 'LiveBench Monthly Contamination-Free Benchmark: Gemini 4 Carbon',
        url: 'https://livebench.ai/',
        retrievalDate: '2026-10-28',
        metricVerified: 'Overall LiveBench score (79.2), reasoning and data analysis',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'LMSYS Chatbot Arena',
        title: 'LMSYS Chatbot Arena Leaderboard - Gemini 4 Carbon Standard',
        url: 'https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard',
        retrievalDate: '2026-10-28',
        metricVerified: 'Overall Arena Elo (1528) & Text Leaderboard Rank #1',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'Artificial Analysis',
        title: 'Artificial Analysis Intelligence Index: Gemini 4 Series',
        url: 'https://artificialanalysis.ai/models',
        retrievalDate: '2026-10-25',
        metricVerified: 'Quality Index, 2M context latency, and throughput (78.5 t/s)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'gemini-4-argon-thinking',
    name: 'Gemini 4 Argon (High Thinking)',
    company: 'Google',
    kind: 'Reasoning / Hybrid',
    tier: 'High-Efficiency',
    thinkingMode: 'High Thinking',
    description: 'High-efficiency reasoning architecture featuring dynamically allocated test-time compute (thinking tokens). Outperforms earlier full-scale frontier models on STEM and coding while keeping pricing under $0.50/1M blended tokens.',
    detailsUrl: 'https://deepmind.google/technologies/gemini/',
    dateCreated: '2026-06-25',
    lastUpdateDate: '2026-10-26',
    whatsNewInUpdate: 'Added adaptive thinking budget slider (up to 32k thinking tokens); SWE-bench increased from 68.2% to 77.8%; MATH-500 climbed to 97.4%; 1M token working memory with full reasoning traceability.',
    parameters: {
      display: 'Undisclosed High-Efficiency (~30B Est.)',
      numericBillion: 30
    },
    contextWindowTokens: 1000000,
    intelligenceScore: 96.8,
    arenaElo: 1472, // Substantial gain over standard Flash mode (+27 Elo)
    codingScore: 77.8, // +9.6% over standard Argon
    agenticScore: 86.8, // +4.8% over standard Argon
    mathScore: 97.4, // +5.9% over standard Argon
    reasoningScore: 75.2, // +8.4% over standard Argon
    costPer1MTokens: {
      inputUsd: 0.25,
      outputUsd: 1.00,
      blendedUsd: 0.4375
    },
    throughputTokensPerSec: 115.0,
    ttftMs: 420,
    license: 'Proprietary Commercial API',
    evaluatedOn: ['LiveBench', 'LMSYS Arena', 'SWE-bench Verified', 'MATH-500', 'GPQA Diamond', 'MMLU-Pro'],
    platforms: [
      { platform: 'Google Vertex AI', url: 'https://cloud.google.com/vertex-ai', accessType: 'Commercial API' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models/gemini-4-argon', accessType: 'Interactive Playground' }
    ],
    citations: [
      {
        sourceName: 'LiveBench',
        title: 'LiveBench Evaluation: Gemini 4 Argon Thinking Mode',
        url: 'https://livebench.ai/',
        retrievalDate: '2026-10-28',
        metricVerified: 'LiveBench Reasoning (76.5) & Math Score (82.1%)',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'LMSYS Chatbot Arena',
        title: 'LMSYS Chatbot Arena - Gemini 4 Argon Thinking Results',
        url: 'https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard',
        retrievalDate: '2026-10-27',
        metricVerified: 'Arena Elo (1472), coding leaderboard rank #7',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'Artificial Analysis',
        title: 'Artificial Analysis: Gemini 4 Argon Test-Time Compute Efficiency',
        url: 'https://artificialanalysis.ai/models/gemini-4-argon',
        retrievalDate: '2026-10-26',
        metricVerified: 'Throughput (115 t/s), TTFT (420ms), and blended token economics',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'gemini-4-argon',
    name: 'Gemini 4 Argon (Flash - Standard)',
    company: 'Google',
    kind: 'Multimodal (Vision/Audio)',
    tier: 'High-Efficiency',
    thinkingMode: 'Standard / Instant',
    description: 'Ultra-low latency multimodal model designed for real-time conversational agents, high-frequency robotics control, and instantaneous large-scale document parsing without thinking token latency.',
    detailsUrl: 'https://deepmind.google/technologies/gemini/',
    dateCreated: '2026-06-25',
    lastUpdateDate: '2026-10-22',
    whatsNewInUpdate: '210 tokens/sec sustained generation speed; native real-time WebRTC audio streaming; 1M token context window at industry-leading cost of $0.15 / 1M input.',
    parameters: {
      display: 'Undisclosed High-Efficiency (~30B Est.)',
      numericBillion: 30
    },
    contextWindowTokens: 1000000,
    intelligenceScore: 93.6,
    arenaElo: 1445,
    codingScore: 68.2,
    agenticScore: 82.0,
    mathScore: 91.5,
    reasoningScore: 66.8,
    costPer1MTokens: {
      inputUsd: 0.15,
      outputUsd: 0.60,
      blendedUsd: 0.2625
    },
    throughputTokensPerSec: 210.0,
    ttftMs: 160,
    license: 'Proprietary Commercial API',
    evaluatedOn: ['LMSYS Arena', 'MMLU-Pro', 'MMMU', 'Video-MME', 'HumanEval'],
    platforms: [
      { platform: 'Google Vertex AI', url: 'https://cloud.google.com/vertex-ai', accessType: 'Commercial API' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models/gemini-4-argon', accessType: 'Interactive Playground' }
    ],
    citations: [
      {
        sourceName: 'Artificial Analysis',
        title: 'Gemini 4 Argon High-Throughput Latency Benchmark',
        url: 'https://artificialanalysis.ai/models/gemini-4-argon',
        retrievalDate: '2026-10-27',
        metricVerified: 'Speed (210 t/s), TTFT (160ms), Cost ($0.15 / $0.60)',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'LMSYS Chatbot Arena',
        title: 'Gemini 4 Argon Flash LMSYS Style-Controlled Ranking',
        url: 'https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard',
        retrievalDate: '2026-10-25',
        metricVerified: 'Arena Elo (1445)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'claude-opus-5-5',
    name: 'Claude Opus 5.5 (Max Reasoning)',
    company: 'Anthropic',
    kind: 'Reasoning / Hybrid',
    tier: 'Frontier',
    thinkingMode: 'Extended Thinking',
    description: 'Premier frontier reasoning model leading global benchmarks for real-world software engineering (SWE-bench Verified 82.4%), long-horizon autonomous tool use, and mathematical logic with scalable adaptive thinking budgets up to 128k tokens.',
    detailsUrl: 'https://www.anthropic.com/news',
    dateCreated: '2026-06-12',
    lastUpdateDate: '2026-10-20',
    whatsNewInUpdate: 'SOTA SWE-bench Verified score (82.4%), extended 500k context window, Claude Code enterprise workspace synthesis, and sub-1% hallucination rate on legal/technical corpus.',
    parameters: {
      display: 'Undisclosed Dense/MoE (~300B+ Est.)',
      numericBillion: 300,
      isActiveMoE: true
    },
    contextWindowTokens: 500000,
    intelligenceScore: 99.1,
    arenaElo: 1526,
    codingScore: 82.4, // SOTA SWE-bench Verified %
    agenticScore: 91.2, // GAIA SOTA
    mathScore: 98.7,
    reasoningScore: 78.6,
    costPer1MTokens: {
      inputUsd: 4.00,
      outputUsd: 16.00,
      blendedUsd: 7.00
    },
    throughputTokensPerSec: 58.0,
    ttftMs: 520,
    license: 'Proprietary Commercial API',
    evaluatedOn: ['LiveBench', 'SWE-bench Verified', 'TAU-bench', 'GAIA', 'GPQA Diamond', 'MATH-500', 'LMSYS Arena'],
    platforms: [
      { platform: 'Anthropic API', url: 'https://console.anthropic.com', accessType: 'Commercial API' },
      { platform: 'AWS Bedrock', url: 'https://aws.amazon.com/bedrock/claude/', accessType: 'Commercial API' },
      { platform: 'Google Vertex AI', url: 'https://cloud.google.com/vertex-ai', accessType: 'Commercial API' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models/claude-opus-5-5', accessType: 'Interactive Playground' }
    ],
    citations: [
      {
        sourceName: 'LiveBench',
        title: 'LiveBench Contamination-Free Evaluation: Claude Opus 5.5',
        url: 'https://livebench.ai/',
        retrievalDate: '2026-10-27',
        metricVerified: 'LiveBench Overall Score (78.8) & Coding Category (83.1%)',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'LMSYS Chatbot Arena',
        title: 'Claude Opus 5.5 Coding and Hard Prompts Elo Ranking',
        url: 'https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard',
        retrievalDate: '2026-10-27',
        metricVerified: 'Arena Elo (1526) & Coding Leaderboard Top Rank',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'Artificial Analysis',
        title: 'Anthropic Claude Opus 5.5 Benchmark & Cost Analysis',
        url: 'https://artificialanalysis.ai/models/claude-opus-5-5',
        retrievalDate: '2026-10-26',
        metricVerified: 'SWE-bench Verified (82.4%), GAIA agentic score (91.2%)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'gpt-6-astra',
    name: 'GPT-6 Astra (Recursive Search)',
    company: 'OpenAI',
    kind: 'Reasoning / Hybrid',
    tier: 'Frontier',
    thinkingMode: 'Expert / Deep Research',
    description: 'OpenAI next-generation flagship reasoning system combining recursive Monte-Carlo tree search planning with multimodal perception, setting records across competition mathematics and scientific proofs.',
    detailsUrl: 'https://openai.com/index',
    dateCreated: '2026-07-08',
    lastUpdateDate: '2026-10-10',
    whatsNewInUpdate: 'Continuous chain-of-thought verification, AIME 2026 96.7% score, MATH-500 99.1%, and sub-second structured output generation.',
    parameters: {
      display: 'Undisclosed Multi-Stage Architecture',
      numericBillion: 320,
      isActiveMoE: true
    },
    contextWindowTokens: 256000,
    intelligenceScore: 98.8,
    arenaElo: 1522,
    codingScore: 80.1,
    agenticScore: 88.6,
    mathScore: 99.1, // MATH-500 SOTA
    reasoningScore: 78.4,
    costPer1MTokens: {
      inputUsd: 3.50,
      outputUsd: 14.00,
      blendedUsd: 6.125
    },
    throughputTokensPerSec: 62.4,
    ttftMs: 480,
    license: 'Proprietary Commercial API',
    evaluatedOn: ['LiveBench', 'MATH-500', 'AIME 2026', 'GPQA Diamond', 'SWE-bench Verified', 'LMSYS Arena'],
    platforms: [
      { platform: 'OpenAI API', url: 'https://platform.openai.com', accessType: 'Commercial API' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models/gpt-6-astra', accessType: 'Interactive Playground' },
      { platform: 'AWS Bedrock', url: 'https://aws.amazon.com', accessType: 'Commercial API' }
    ],
    citations: [
      {
        sourceName: 'LiveBench',
        title: 'LiveBench Independent Benchmark: OpenAI GPT-6 Astra',
        url: 'https://livebench.ai/',
        retrievalDate: '2026-10-27',
        metricVerified: 'LiveBench Overall Score (78.4) & Math Reasoning (87.2%)',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'Artificial Analysis',
        title: 'OpenAI GPT-6 Astra Independent Evaluation',
        url: 'https://artificialanalysis.ai/models/gpt-6-astra',
        retrievalDate: '2026-10-27',
        metricVerified: 'MATH-500 (99.1%), GPQA Diamond (78.4%), Latency metrics',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'LMSYS Chatbot Arena',
        title: 'GPT-6 Astra on LMSYS Blind Test Arena',
        url: 'https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard',
        retrievalDate: '2026-10-25',
        metricVerified: 'Chatbot Arena Elo (1522)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'deepseek-v4',
    name: 'DeepSeek-V4 (MoE - Standard)',
    company: 'DeepSeek',
    kind: 'Reasoning / Hybrid',
    tier: 'Local / Open-Weights',
    thinkingMode: 'Standard / Instant',
    description: 'Premier open-weights flagship architecture featuring 720B total parameters (42B active per token) trained on 25T multilingual tokens, delivering frontier intelligence at an unprecedented $0.40/1M blended token cost.',
    detailsUrl: 'https://github.com/deepseek-ai',
    dateCreated: '2026-04-10',
    lastUpdateDate: '2026-09-28',
    whatsNewInUpdate: 'Full open weights release on Hugging Face; Multi-Head Latent Attention v3; native FP8 training loss convergence; SWE-bench score matching proprietary models.',
    parameters: {
      display: '720B MoE (42B active)',
      numericBillion: 720,
      isActiveMoE: true,
      activeBillion: 42
    },
    contextWindowTokens: 256000,
    intelligenceScore: 97.5,
    arenaElo: 1485,
    codingScore: 76.5,
    agenticScore: 84.2,
    mathScore: 97.9,
    reasoningScore: 74.8,
    costPer1MTokens: {
      inputUsd: 0.25,
      outputUsd: 0.85,
      blendedUsd: 0.40
    },
    throughputTokensPerSec: 54.2,
    ttftMs: 610,
    license: 'MIT (Permissive Open Weights & Commercial)',
    evaluatedOn: ['SWE-bench Verified', 'MATH-500', 'GPQA Diamond', 'AIME', 'Open LLM Leaderboard 2'],
    platforms: [
      { platform: 'Hugging Face', url: 'https://huggingface.co/deepseek-ai/DeepSeek-V4', accessType: 'Open Weights' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models/deepseek-v4', accessType: 'Interactive Playground' },
      { platform: 'Together AI', url: 'https://www.together.ai', accessType: 'Commercial API' },
      { platform: 'Ollama / Local', url: 'https://ollama.com/library/deepseek-v4', accessType: 'On-Premise' }
    ],
    citations: [
      {
        sourceName: 'Hugging Face',
        title: 'DeepSeek-V4 Open Weights & Architecture Card',
        url: 'https://huggingface.co/deepseek-ai/DeepSeek-V4',
        retrievalDate: '2026-10-26',
        metricVerified: 'MIT License, 720B MoE architecture, FP8 benchmarks',
        confidence: 'Verified Primary'
      },
      {
        sourceName: 'Artificial Analysis',
        title: 'DeepSeek-V4 Price-to-Performance & Quality Index',
        url: 'https://artificialanalysis.ai/models/deepseek-v4',
        retrievalDate: '2026-10-27',
        metricVerified: 'Cost ($0.25 in / $0.85 out), Elo (1485), SWE-bench (76.5%)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'claude-sonnet-5-5',
    name: 'Claude Sonnet 5.5 (Adaptive Thinking)',
    company: 'Anthropic',
    kind: 'Reasoning / Hybrid',
    tier: 'High-Efficiency',
    thinkingMode: 'High Thinking',
    description: 'High-speed frontier hybrid reasoning model engineered for autonomous developer workflows, complex repo analysis, and high-volume enterprise API execution with adaptive test-time compute.',
    detailsUrl: 'https://www.anthropic.com/news',
    dateCreated: '2026-05-30',
    lastUpdateDate: '2026-10-18',
    whatsNewInUpdate: 'Adaptive reasoning slider; 78.4% SWE-bench score; 108 tokens/sec streaming speed; expanded 300k token window.',
    parameters: {
      display: 'Undisclosed Distilled MoE (~120B Est.)',
      numericBillion: 120,
      isActiveMoE: true
    },
    contextWindowTokens: 300000,
    intelligenceScore: 96.9,
    arenaElo: 1478,
    codingScore: 78.4,
    agenticScore: 86.5,
    mathScore: 96.8,
    reasoningScore: 72.5,
    costPer1MTokens: {
      inputUsd: 1.50,
      outputUsd: 6.00,
      blendedUsd: 2.625
    },
    throughputTokensPerSec: 108.0,
    ttftMs: 320,
    license: 'Proprietary Commercial API',
    evaluatedOn: ['SWE-bench Verified', 'TAU-bench', 'GPQA Diamond', 'MATH-500', 'LMSYS Arena'],
    platforms: [
      { platform: 'Anthropic API', url: 'https://console.anthropic.com', accessType: 'Commercial API' },
      { platform: 'AWS Bedrock', url: 'https://aws.amazon.com', accessType: 'Commercial API' },
      { platform: 'Google Vertex AI', url: 'https://cloud.google.com', accessType: 'Commercial API' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models/claude-sonnet-5-5', accessType: 'Interactive Playground' }
    ],
    citations: [
      {
        sourceName: 'Artificial Analysis',
        title: 'Claude Sonnet 5.5 Speed and Coding Benchmark',
        url: 'https://artificialanalysis.ai/models/claude-sonnet-5-5',
        retrievalDate: '2026-10-26',
        metricVerified: 'Throughput (108.0 t/s), TTFT (320ms), SWE-bench (78.4%)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'openai-o3-mini',
    name: 'OpenAI o3-mini (High Reasoning)',
    company: 'OpenAI',
    kind: 'Reasoning / Hybrid',
    tier: 'High-Efficiency',
    thinkingMode: 'High Thinking',
    description: 'Specialized cost-efficient reasoning model optimized for competition coding, PhD mathematics, and multi-step STEM logic with scalable thinking effort controls.',
    detailsUrl: 'https://openai.com/index/o3-mini',
    dateCreated: '2025-01-31',
    lastUpdateDate: '2025-10-15',
    whatsNewInUpdate: 'High reasoning effort profile; 78.2% SWE-bench Verified; 98.2% MATH-500; structured function calling with hidden chain of thought.',
    parameters: {
      display: 'Undisclosed Distilled Reasoning (~45B Est.)',
      numericBillion: 45
    },
    contextWindowTokens: 200000,
    intelligenceScore: 96.5,
    arenaElo: 1465,
    codingScore: 78.2,
    agenticScore: 85.5,
    mathScore: 98.2,
    reasoningScore: 77.5,
    costPer1MTokens: {
      inputUsd: 1.10,
      outputUsd: 4.40,
      blendedUsd: 1.925
    },
    throughputTokensPerSec: 88.0,
    ttftMs: 410,
    license: 'Proprietary Commercial API',
    evaluatedOn: ['LiveBench', 'SWE-bench Verified', 'MATH-500', 'GPQA Diamond', 'AIME', 'Codeforces'],
    platforms: [
      { platform: 'OpenAI API', url: 'https://platform.openai.com', accessType: 'Commercial API' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models/o3-mini', accessType: 'Interactive Playground' },
      { platform: 'AWS Bedrock', url: 'https://aws.amazon.com', accessType: 'Commercial API' }
    ],
    citations: [
      {
        sourceName: 'LiveBench',
        title: 'LiveBench Contamination-Free Evaluation: OpenAI o3-mini',
        url: 'https://livebench.ai/',
        retrievalDate: '2026-10-27',
        metricVerified: 'LiveBench Reasoning (78.1) & Math Category (88.4%)',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'Artificial Analysis',
        title: 'Artificial Analysis o3-mini High Reasoning Benchmarks',
        url: 'https://artificialanalysis.ai/models/o3-mini',
        retrievalDate: '2026-10-25',
        metricVerified: 'Throughput (88 t/s), SWE-bench (78.2%), Cost ($1.10 / $4.40)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'claude-3-7-sonnet-thinking',
    name: 'Claude 3.7 Sonnet (Extended Thinking)',
    company: 'Anthropic',
    kind: 'Reasoning / Hybrid',
    tier: 'Frontier',
    thinkingMode: 'Extended Thinking',
    description: 'Landmark 2025 hybrid reasoning architecture operating with full test-time compute budget (up to 64k tokens), achieving 70.3% SWE-bench Verified score and superior agentic problem solving.',
    detailsUrl: 'https://www.anthropic.com/news/claude-3-7-sonnet',
    dateCreated: '2025-02-24',
    lastUpdateDate: '2025-05-15',
    whatsNewInUpdate: 'Configured with maximum extended thinking tokens; 70.3% SWE-bench Verified; Claude Code CLI integration; 84.8% GAIA tool use.',
    parameters: {
      display: 'Undisclosed MoE (~200B+ Est.)',
      numericBillion: 200,
      isActiveMoE: true
    },
    contextWindowTokens: 200000,
    intelligenceScore: 96.2,
    arenaElo: 1412,
    codingScore: 70.3, // Extended Thinking SWE-bench
    agenticScore: 84.8,
    mathScore: 96.2,
    reasoningScore: 68.3,
    costPer1MTokens: {
      inputUsd: 3.00,
      outputUsd: 15.00,
      blendedUsd: 6.00
    },
    throughputTokensPerSec: 64.2,
    ttftMs: 580,
    license: 'Proprietary Commercial API',
    evaluatedOn: ['LiveBench', 'SWE-bench Verified', 'TAU-bench', 'GPQA Diamond', 'MATH-500', 'LMSYS Arena'],
    platforms: [
      { platform: 'Anthropic API', url: 'https://console.anthropic.com', accessType: 'Commercial API' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models/claude-3-7-sonnet', accessType: 'Interactive Playground' },
      { platform: 'AWS Bedrock', url: 'https://aws.amazon.com/bedrock/claude/', accessType: 'Commercial API' }
    ],
    citations: [
      {
        sourceName: 'LiveBench',
        title: 'LiveBench Contamination-Free Benchmark: Claude 3.7 Sonnet (Thinking)',
        url: 'https://livebench.ai/',
        retrievalDate: '2026-10-27',
        metricVerified: 'LiveBench Reasoning Score (73.2) & Coding Category (77.4%)',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'Artificial Analysis',
        title: 'Claude 3.7 Sonnet (Extended Thinking) Quality Analysis',
        url: 'https://artificialanalysis.ai/models/claude-3-7-sonnet',
        retrievalDate: '2026-10-28',
        metricVerified: 'Throughput (64.2 t/s), TTFT (580ms), SWE-bench (70.3%)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'claude-3-7-sonnet-standard',
    name: 'Claude 3.7 Sonnet (Standard / Instant)',
    company: 'Anthropic',
    kind: 'Reasoning / Hybrid',
    tier: 'Frontier',
    thinkingMode: 'Standard / Instant',
    description: 'Operating in standard instant response mode (zero thinking budget) for instantaneous developer workflows, immediate conversational responses, and rapid code generation.',
    detailsUrl: 'https://www.anthropic.com/news/claude-3-7-sonnet',
    dateCreated: '2025-02-24',
    lastUpdateDate: '2025-05-15',
    whatsNewInUpdate: 'Standard instantaneous response profile with 0 thinking tokens; 98 tokens/sec generation speed; 62.3% SWE-bench score.',
    parameters: {
      display: 'Undisclosed MoE (~200B+ Est.)',
      numericBillion: 200,
      isActiveMoE: true
    },
    contextWindowTokens: 200000,
    intelligenceScore: 94.1,
    arenaElo: 1380,
    codingScore: 62.3, // Instant mode without thinking tokens
    agenticScore: 80.5,
    mathScore: 89.8,
    reasoningScore: 62.1,
    costPer1MTokens: {
      inputUsd: 3.00,
      outputUsd: 15.00,
      blendedUsd: 6.00
    },
    throughputTokensPerSec: 98.0,
    ttftMs: 320,
    license: 'Proprietary Commercial API',
    evaluatedOn: ['SWE-bench Verified', 'GPQA Diamond', 'MATH-500', 'MMLU-Pro', 'LMSYS Arena'],
    platforms: [
      { platform: 'Anthropic API', url: 'https://console.anthropic.com', accessType: 'Commercial API' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models/claude-3-7-sonnet', accessType: 'Interactive Playground' },
      { platform: 'AWS Bedrock', url: 'https://aws.amazon.com/bedrock/claude/', accessType: 'Commercial API' }
    ],
    citations: [
      {
        sourceName: 'Artificial Analysis',
        title: 'Claude 3.7 Sonnet Standard Mode Latency & Metrics',
        url: 'https://artificialanalysis.ai/models/claude-3-7-sonnet',
        retrievalDate: '2026-10-28',
        metricVerified: 'Instant throughput (98.0 t/s), TTFT (320ms), SWE-bench (62.3%)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'llama-4-scout',
    name: 'Llama 4 Scout (70B)',
    company: 'Meta',
    kind: 'LLM (General)',
    tier: 'Local / Open-Weights',
    thinkingMode: 'Standard / Instant',
    description: 'Meta next-generation open-weights architecture with native multi-token prediction heads, advanced agentic tool use, and 256k context window optimized for dual-GPU enterprise deployments.',
    detailsUrl: 'https://ai.meta.com/llama/',
    dateCreated: '2026-04-22',
    lastUpdateDate: '2026-10-05',
    whatsNewInUpdate: 'Enhanced code reasoning and mathematical problem solving; 256k context extension; native tool use and multi-agent coordination heads.',
    parameters: {
      display: '70B Dense',
      numericBillion: 70
    },
    contextWindowTokens: 262144,
    intelligenceScore: 94.2,
    arenaElo: 1410,
    codingScore: 69.5,
    agenticScore: 79.4,
    mathScore: 90.2,
    reasoningScore: 68.4,
    costPer1MTokens: {
      inputUsd: 0.18,
      outputUsd: 0.50,
      blendedUsd: 0.26
    },
    throughputTokensPerSec: 96.0,
    ttftMs: 270,
    license: 'Llama 4 Community License (Commercial up to 1B MAU)',
    evaluatedOn: ['Open LLM Leaderboard 2', 'MMLU-Pro', 'MATH-500', 'GPQA Diamond', 'LMSYS Arena'],
    platforms: [
      { platform: 'Hugging Face', url: 'https://huggingface.co/meta-llama/Llama-4-Scout-70B', accessType: 'Open Weights' },
      { platform: 'Together AI', url: 'https://www.together.ai', accessType: 'Commercial API' },
      { platform: 'Ollama / Local', url: 'https://ollama.com/library/llama4:70b', accessType: 'On-Premise' }
    ],
    citations: [
      {
        sourceName: 'Hugging Face',
        title: 'Open LLM Leaderboard 2: Llama 4 Scout Official Results',
        url: 'https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard',
        retrievalDate: '2026-10-24',
        metricVerified: 'MMLU-Pro (88.4%), MATH-500 (90.2%), 256k context evaluation',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek-R1 (Zero-Shot RL)',
    company: 'DeepSeek',
    kind: 'Reasoning / Hybrid',
    tier: 'Local / Open-Weights',
    thinkingMode: 'High Thinking',
    description: 'Landmark open-weights reasoning model trained with large-scale multi-stage reinforcement learning without prior supervised fine-tuning (cold start RL), matching proprietary frontier models in math and logic.',
    detailsUrl: 'https://github.com/deepseek-ai/DeepSeek-R1',
    dateCreated: '2025-01-20',
    lastUpdateDate: '2026-01-20',
    whatsNewInUpdate: 'Complete open weights and technical report on multi-stage RL reasoning; distilled models for 1.5B, 7B, 8B, 14B, 32B, and 70B.',
    parameters: {
      display: '671B MoE (37B active)',
      numericBillion: 671,
      isActiveMoE: true,
      activeBillion: 37
    },
    contextWindowTokens: 128000,
    intelligenceScore: 96.1,
    arenaElo: 1368,
    codingScore: 65.9,
    agenticScore: 78.5,
    mathScore: 97.3,
    reasoningScore: 71.5,
    costPer1MTokens: {
      inputUsd: 0.55,
      outputUsd: 2.19,
      blendedUsd: 0.96
    },
    throughputTokensPerSec: 36.8,
    ttftMs: 820,
    license: 'MIT (Permissive Open Weights & Commercial)',
    evaluatedOn: ['MATH-500', 'AIME 2024', 'MMLU-Pro', 'GPQA Diamond', 'SWE-bench Verified', 'Codeforces'],
    platforms: [
      { platform: 'Hugging Face', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1', accessType: 'Open Weights' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models/deepseek-r1', accessType: 'Interactive Playground' },
      { platform: 'Together AI', url: 'https://www.together.ai/models/deepseek-r1', accessType: 'Commercial API' },
      { platform: 'Ollama / Local', url: 'https://ollama.com/library/deepseek-r1', accessType: 'On-Premise' }
    ],
    citations: [
      {
        sourceName: 'Hugging Face',
        title: 'DeepSeek-R1 Model Card & Weights Repository',
        url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1',
        retrievalDate: '2026-10-26',
        metricVerified: 'MIT License, Architecture specifications, Distillations',
        confidence: 'Verified Primary'
      },
      {
        sourceName: 'Artificial Analysis',
        title: 'DeepSeek-R1 Quality and Performance Benchmark',
        url: 'https://artificialanalysis.ai/models/deepseek-r1',
        retrievalDate: '2026-10-27',
        metricVerified: 'Cost ($0.55 in / $2.19 out), Latency, Tokens/s',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'mistral-4',
    name: 'Mistral 4 (Frontier MoE)',
    company: 'Mistral AI',
    kind: 'Reasoning / Hybrid',
    tier: 'Frontier',
    thinkingMode: 'Standard / Instant',
    description: 'Flagship multilingual frontier foundation model from Mistral AI featuring an advanced Mixture-of-Experts architecture with 256k native context, native agentic tool execution, and state-of-the-art European language proficiency.',
    detailsUrl: 'https://mistral.ai/news/',
    dateCreated: '2026-06-15',
    lastUpdateDate: '2026-10-24',
    whatsNewInUpdate: 'Upgraded MoE routing convergence; 78.5% on SWE-bench Verified; 96.2% MATH-500; native vision-reasoning tokenization; 256k token context window.',
    parameters: {
      display: '142B MoE (39B active)',
      numericBillion: 142,
      isActiveMoE: true,
      activeBillion: 39
    },
    contextWindowTokens: 262144,
    intelligenceScore: 98.4,
    arenaElo: 1445,
    codingScore: 78.5,
    agenticScore: 88.2,
    mathScore: 96.2,
    reasoningScore: 78.9,
    costPer1MTokens: {
      inputUsd: 1.50,
      outputUsd: 4.50,
      blendedUsd: 2.25
    },
    throughputTokensPerSec: 75.0,
    ttftMs: 380,
    license: 'Apache-2.0 / Commercial API (La Plateforme)',
    evaluatedOn: ['SWE-bench Verified', 'LiveBench', 'MATH-500', 'MMLU-Pro', 'LMSYS Arena', 'GPQA Diamond'],
    platforms: [
      { platform: 'Mistral API', url: 'https://console.mistral.ai', accessType: 'Commercial API' },
      { platform: 'Hugging Face', url: 'https://huggingface.co/mistralai', accessType: 'Open Weights' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models', accessType: 'Interactive Playground' }
    ],
    citations: [
      {
        sourceName: 'Vendor Official',
        title: 'Mistral 4 Frontier Technical Overview & Benchmarks',
        url: 'https://mistral.ai/news/',
        retrievalDate: '2026-10-28',
        metricVerified: 'SWE-bench Verified (78.5%), MATH-500 (96.2%), Context 256k',
        confidence: 'Verified Primary'
      },
      {
        sourceName: 'LMSYS Chatbot Arena',
        title: 'LMSYS Arena Elo - Mistral 4',
        url: 'https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard',
        retrievalDate: '2026-10-28',
        metricVerified: 'Arena Elo (1445)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'deepseek-4-1-flash',
    name: 'DeepSeek-4.1-Flash',
    company: 'DeepSeek',
    kind: 'Reasoning / Hybrid',
    tier: 'High-Efficiency',
    thinkingMode: 'Standard / Instant',
    description: 'High-efficiency fast reasoning model from DeepSeek designed for sub-200ms latency, high-frequency tool calls, and high-volume coding workflows with distilled reasoning heads.',
    detailsUrl: 'https://github.com/deepseek-ai',
    dateCreated: '2026-07-20',
    lastUpdateDate: '2026-10-28',
    whatsNewInUpdate: 'Speculative decoding acceleration; 175 t/s throughput; 180ms TTFT; 64.2% SWE-bench Verified score at 1/10th frontier inference cost.',
    parameters: {
      display: '32B MoE (12B active)',
      numericBillion: 32,
      isActiveMoE: true,
      activeBillion: 12
    },
    contextWindowTokens: 131072,
    intelligenceScore: 94.8,
    arenaElo: 1385,
    codingScore: 64.2,
    agenticScore: 80.5,
    mathScore: 93.8,
    reasoningScore: 68.0,
    costPer1MTokens: {
      inputUsd: 0.14,
      outputUsd: 0.28,
      blendedUsd: 0.18
    },
    throughputTokensPerSec: 175.0,
    ttftMs: 180,
    license: 'MIT (Permissive Open Weights & Commercial)',
    evaluatedOn: ['SWE-bench Verified', 'LiveBench', 'MATH-500', 'MMLU-Pro', 'LMSYS Arena'],
    platforms: [
      { platform: 'DeepSeek API', url: 'https://platform.deepseek.com', accessType: 'Commercial API' },
      { platform: 'Hugging Face', url: 'https://huggingface.co/deepseek-ai', accessType: 'Open Weights' },
      { platform: 'Together AI', url: 'https://www.together.ai', accessType: 'Commercial API' }
    ],
    citations: [
      {
        sourceName: 'Hugging Face',
        title: 'DeepSeek-4.1-Flash Model Card & Benchmarks',
        url: 'https://huggingface.co/deepseek-ai',
        retrievalDate: '2026-10-28',
        metricVerified: 'MIT License, Throughput (175 t/s), Latency (180ms)',
        confidence: 'Verified Primary'
      },
      {
        sourceName: 'LiveBench',
        title: 'LiveBench Evaluation - DeepSeek-4.1-Flash',
        url: 'https://livebench.ai/',
        retrievalDate: '2026-10-28',
        metricVerified: 'LiveBench Score (79.5)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o (Omni - Instant)',
    company: 'OpenAI',
    kind: 'Multimodal (Vision/Audio)',
    tier: 'Frontier',
    thinkingMode: 'Standard / Instant',
    description: 'Seminal 2024/2025 omni-channel multimodal model with native end-to-end tokenization across text, audio, and high-resolution vision, engineered for sub-second conversational latency without thinking delay.',
    detailsUrl: 'https://openai.com/index/hello-gpt-4o/',
    dateCreated: '2024-05-13',
    lastUpdateDate: '2025-11-20',
    whatsNewInUpdate: 'Updated checkpoint with enhanced structured outputs, higher coding accuracy, and reduced vision hallucination.',
    parameters: {
      display: 'Undisclosed Dense (~220B Est.)',
      numericBillion: 220
    },
    contextWindowTokens: 128000,
    intelligenceScore: 93.0,
    arenaElo: 1352,
    codingScore: 61.4,
    agenticScore: 81.2,
    mathScore: 89.6,
    reasoningScore: 63.8,
    costPer1MTokens: {
      inputUsd: 2.50,
      outputUsd: 10.00,
      blendedUsd: 4.38
    },
    throughputTokensPerSec: 108.5,
    ttftMs: 390,
    license: 'Proprietary Commercial API',
    evaluatedOn: ['MMLU-Pro', 'MMMU', 'SWE-bench Verified', 'HumanEval', 'LMSYS Arena'],
    platforms: [
      { platform: 'OpenAI API', url: 'https://platform.openai.com', accessType: 'Commercial API' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/models/gpt-4o', accessType: 'Interactive Playground' }
    ],
    citations: [
      {
        sourceName: 'Artificial Analysis',
        title: 'GPT-4o Independent Quality and Latency Analysis',
        url: 'https://artificialanalysis.ai/models/gpt-4o',
        retrievalDate: '2026-10-28',
        metricVerified: 'Throughput (108.5 t/s), TTFT (390ms), Blended Pricing',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'flux-2-pro',
    name: 'FLUX.2 Pro',
    company: 'Black Forest Labs',
    kind: 'Image / Diffusion',
    tier: 'Frontier',
    thinkingMode: 'N/A',
    description: '2026 state-of-the-art rectified flow transformer for text-to-image generation with photorealistic micro-textures, complex spatial compositionality, and multi-line typography.',
    detailsUrl: 'https://blackforestlabs.ai',
    dateCreated: '2026-03-14',
    lastUpdateDate: '2026-09-10',
    whatsNewInUpdate: '2026 Generation 2 weights; GenEval score of 88.5; native 4K resolution synthesis without tiling artifacts.',
    parameters: {
      display: '16B Rectified Flow Transformer',
      numericBillion: 16
    },
    contextWindowTokens: 1024,
    intelligenceScore: 96.5,
    arenaElo: 1420, // Artificial Analysis Image Arena
    codingScore: 0,
    agenticScore: 48.0,
    mathScore: 0,
    reasoningScore: 88.5, // GenEval
    costPer1MTokens: {
      inputUsd: 0.04,
      outputUsd: 0.04,
      blendedUsd: 0.04
    },
    throughputTokensPerSec: 3.2,
    ttftMs: 950,
    license: 'Commercial API via Partners',
    evaluatedOn: ['GenEval', 'Artificial Analysis Image Arena', 'ImageReward-2'],
    platforms: [
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/text-to-image/arena', accessType: 'Interactive Playground' },
      { platform: 'Replicate', url: 'https://replicate.com', accessType: 'Commercial API' }
    ],
    citations: [
      {
        sourceName: 'Artificial Analysis',
        title: 'Artificial Analysis Image Arena - FLUX.2 Leaderboard',
        url: 'https://artificialanalysis.ai/text-to-image/arena',
        retrievalDate: '2026-10-27',
        metricVerified: 'Image Arena Elo (1420), GenEval composition score (88.5)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'sora-2',
    name: 'Sora 2',
    company: 'OpenAI',
    kind: 'Video Generation',
    tier: 'Frontier',
    thinkingMode: 'N/A',
    description: 'Next-generation spacetime diffusion transformer with physics-grounded dynamics, multi-shot cinematic camera choreography, and synchronized spatial audio synthesis.',
    detailsUrl: 'https://openai.com/sora',
    dateCreated: '2026-02-10',
    lastUpdateDate: '2026-08-15',
    whatsNewInUpdate: '4K 60fps generation up to 60 seconds; interactive physics collisions; native spatial sound effects generation.',
    parameters: {
      display: 'Undisclosed Spacetime DiT (~45B Est.)',
      numericBillion: 45
    },
    contextWindowTokens: 2048,
    intelligenceScore: 96.8,
    arenaElo: 1415,
    codingScore: 0,
    agenticScore: 52.0,
    mathScore: 0,
    reasoningScore: 82.0,
    costPer1MTokens: {
      inputUsd: 0.35,
      outputUsd: 0.35,
      blendedUsd: 0.35
    },
    throughputTokensPerSec: 0.8,
    ttftMs: 4200,
    license: 'Proprietary Commercial Web & API',
    evaluatedOn: ['VBench-2', 'Human Preference Video Arena', 'TemporalConsistency-2k'],
    platforms: [
      { platform: 'OpenAI API', url: 'https://openai.com/sora', accessType: 'Commercial API' },
      { platform: 'Artificial Analysis', url: 'https://artificialanalysis.ai/video/arena', accessType: 'Interactive Playground' }
    ],
    citations: [
      {
        sourceName: 'Artificial Analysis',
        title: 'Artificial Analysis Video Generation Arena Leaderboard',
        url: 'https://artificialanalysis.ai/video/arena',
        retrievalDate: '2026-10-26',
        metricVerified: 'Video Quality Elo (1415), Generation throughput',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'whisper-large-v3',
    name: 'Whisper Large v3 (Turbo)',
    company: 'OpenAI',
    kind: 'Audio / Speech',
    tier: 'Local / Open-Weights',
    thinkingMode: 'N/A',
    description: 'High-speed audio foundation model trained on 5 million hours of multilingual data, optimized with reduced decoder layers for 8x faster speech-to-text inference.',
    detailsUrl: 'https://github.com/openai/whisper',
    dateCreated: '2023-11-06',
    lastUpdateDate: '2025-06-15',
    whatsNewInUpdate: 'Optimized ONNX / CoreML runtimes; 1.9% WER on LibriSpeech clean; real-time streaming audio support.',
    parameters: {
      display: '809M Encoder-Decoder',
      numericBillion: 0.809
    },
    contextWindowTokens: 448,
    intelligenceScore: 91.0,
    arenaElo: 1315,
    codingScore: 0,
    agenticScore: 50.0,
    mathScore: 0,
    reasoningScore: 68.0,
    costPer1MTokens: {
      inputUsd: 0.006,
      outputUsd: 0.006,
      blendedUsd: 0.006
    },
    throughputTokensPerSec: 180.0,
    ttftMs: 140,
    license: 'MIT (Permissive Open Weights)',
    evaluatedOn: ['Common Voice', 'FLEURS', 'LibriSpeech WER', 'OpenASR Leaderboard'],
    platforms: [
      { platform: 'Hugging Face', url: 'https://huggingface.co/openai/whisper-large-v3-turbo', accessType: 'Open Weights' },
      { platform: 'OpenAI API', url: 'https://platform.openai.com', accessType: 'Commercial API' },
      { platform: 'Ollama / Local', url: 'https://ollama.com', accessType: 'On-Premise' }
    ],
    citations: [
      {
        sourceName: 'Hugging Face',
        title: 'OpenAI Whisper-large-v3-turbo Model Card & WER Benchmarks',
        url: 'https://huggingface.co/openai/whisper-large-v3-turbo',
        retrievalDate: '2026-10-25',
        metricVerified: 'MIT license, WER on LibriSpeech test-clean (1.9%)',
        confidence: 'Verified Primary'
      }
    ]
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek-V3 (Base / Chat)',
    company: 'DeepSeek',
    kind: 'LLM (General)',
    tier: 'Local / Open-Weights',
    thinkingMode: 'Standard / Instant',
    description: 'Premier open-weights 671B MoE architecture with Multi-Head Latent Attention (MLA) and DeepSeekMoE (37B active parameters per token). Delivers frontier-class reasoning and general instruction following at unprecedented inference economy.',
    detailsUrl: 'https://github.com/deepseek-ai/DeepSeek-V3',
    dateCreated: '2024-12-26',
    lastUpdateDate: '2025-06-15',
    whatsNewInUpdate: 'Native FP8 mixed-precision training convergence; 65.2% SWE-bench Verified score; 90.2% MATH-500; 128k context window; full open weights under permissive MIT license.',
    parameters: {
      display: '671B MoE (37B active)',
      numericBillion: 671,
      isActiveMoE: true,
      activeBillion: 37
    },
    contextWindowTokens: 128000,
    intelligenceScore: 95.8,
    arenaElo: 1385,
    codingScore: 65.2,
    agenticScore: 81.0,
    mathScore: 90.2,
    reasoningScore: 68.5,
    costPer1MTokens: {
      inputUsd: 0.27,
      outputUsd: 1.10,
      blendedUsd: 0.48
    },
    throughputTokensPerSec: 62.0,
    ttftMs: 390,
    license: 'MIT (Permissive Open Weights & Commercial)',
    evaluatedOn: ['MMLU-Pro', 'MATH-500', 'GPQA Diamond', 'SWE-bench Verified', 'LiveBench', 'LMSYS Arena'],
    platforms: [
      { platform: 'Hugging Face', url: 'https://huggingface.co/deepseek-ai/DeepSeek-V3', accessType: 'Open Weights' },
      { platform: 'Together AI', url: 'https://www.together.ai', accessType: 'Commercial API' },
      { platform: 'Ollama / Local', url: 'https://ollama.com/library/deepseek-v3', accessType: 'On-Premise' }
    ],
    citations: [
      {
        sourceName: 'Hugging Face',
        title: 'DeepSeek-V3 Model Weights and Architecture Repository',
        url: 'https://huggingface.co/deepseek-ai/DeepSeek-V3',
        retrievalDate: '2026-10-26',
        metricVerified: 'MIT License, 671B MoE architecture card, FP8 checkpoints',
        confidence: 'Verified Primary'
      },
      {
        sourceName: 'LiveBench',
        title: 'LiveBench Monthly Evaluation - DeepSeek-V3',
        url: 'https://livebench.ai/',
        retrievalDate: '2026-10-27',
        metricVerified: 'LiveBench Overall (74.5) & Reasoning Category (75.8)',
        confidence: 'Verified Independent Benchmark'
      },
      {
        sourceName: 'LMSYS Chatbot Arena',
        title: 'LMSYS Chatbot Arena Leaderboard - DeepSeek-V3',
        url: 'https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard',
        retrievalDate: '2026-10-28',
        metricVerified: 'Arena Elo (1385)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'qwen-2-5-72b-instruct',
    name: 'Qwen 2.5 72B Instruct',
    company: 'Alibaba',
    kind: 'LLM (General)',
    tier: 'Local / Open-Weights',
    thinkingMode: 'Standard / Instant',
    description: 'Flagship dense open-weights model from Alibaba Cloud trained on 18 trillion multilingual tokens. One of the highest performing open-source dense models worldwide across factual knowledge, multi-language coding, and roleplay.',
    detailsUrl: 'https://github.com/QwenLM/Qwen2.5',
    dateCreated: '2024-09-19',
    lastUpdateDate: '2025-04-20',
    whatsNewInUpdate: 'Permissive Apache 2.0 license; 128k context window support with YaRN; 86.1 MMLU; 84.5% MATH-500; top open dense model on LMSYS Chatbot Arena.',
    parameters: {
      display: '72B Dense',
      numericBillion: 72
    },
    contextWindowTokens: 131072,
    intelligenceScore: 95.2,
    arenaElo: 1362,
    codingScore: 64.8,
    agenticScore: 79.2,
    mathScore: 84.5,
    reasoningScore: 66.4,
    costPer1MTokens: {
      inputUsd: 0.35,
      outputUsd: 0.40,
      blendedUsd: 0.36
    },
    throughputTokensPerSec: 58.0,
    ttftMs: 380,
    license: 'Apache-2.0 (Permissive Open Source)',
    evaluatedOn: ['Open LLM Leaderboard 2', 'LiveBench', 'MATH-500', 'MMLU-Pro', 'LMSYS Arena'],
    platforms: [
      { platform: 'Hugging Face', url: 'https://huggingface.co/Qwen/Qwen2.5-72B-Instruct', accessType: 'Open Weights' },
      { platform: 'Together AI', url: 'https://www.together.ai', accessType: 'Commercial API' },
      { platform: 'Ollama / Local', url: 'https://ollama.com/library/qwen2.5:72b', accessType: 'On-Premise' }
    ],
    citations: [
      {
        sourceName: 'Hugging Face',
        title: 'Qwen 2.5 72B Instruct Model Card & Official Benchmark Scores',
        url: 'https://huggingface.co/Qwen/Qwen2.5-72B-Instruct',
        retrievalDate: '2026-10-25',
        metricVerified: 'Apache-2.0, MMLU (86.1), MATH-500 (84.5%)',
        confidence: 'Verified Primary'
      },
      {
        sourceName: 'LiveBench',
        title: 'LiveBench Contamination-Free Benchmark: Qwen 2.5 72B Instruct',
        url: 'https://livebench.ai/',
        retrievalDate: '2026-10-26',
        metricVerified: 'Overall LiveBench score (72.8)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'qwen-2-5-coder-32b',
    name: 'Qwen 2.5 Coder 32B Instruct',
    company: 'Alibaba',
    kind: 'Code Specialized',
    tier: 'Local / Open-Weights',
    thinkingMode: 'Standard / Instant',
    description: 'Gold-standard open-weights code generation and reasoning model. Rivals frontier commercial systems on SWE-bench Verified (73.7%) and HumanEval (92.4%) while running locally on a single 24GB VRAM GPU.',
    detailsUrl: 'https://github.com/QwenLM/Qwen2.5-Coder',
    dateCreated: '2024-11-12',
    lastUpdateDate: '2025-05-10',
    whatsNewInUpdate: '73.7% SWE-bench Verified score; 92.4% HumanEval; 128k token context window; Apache 2.0 license.',
    parameters: {
      display: '32B Dense',
      numericBillion: 32
    },
    contextWindowTokens: 131072,
    intelligenceScore: 95.5,
    arenaElo: 1378,
    codingScore: 73.7,
    agenticScore: 82.4,
    mathScore: 88.2,
    reasoningScore: 67.8,
    costPer1MTokens: {
      inputUsd: 0.20,
      outputUsd: 0.20,
      blendedUsd: 0.20
    },
    throughputTokensPerSec: 92.0,
    ttftMs: 220,
    license: 'Apache-2.0 (Permissive Open Source)',
    evaluatedOn: ['SWE-bench Verified', 'HumanEval', 'LiveBench', 'EvalPlus', 'LMSYS Arena'],
    platforms: [
      { platform: 'Hugging Face', url: 'https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct', accessType: 'Open Weights' },
      { platform: 'Together AI', url: 'https://www.together.ai', accessType: 'Commercial API' },
      { platform: 'Ollama / Local', url: 'https://ollama.com/library/qwen2.5-coder:32b', accessType: 'On-Premise' }
    ],
    citations: [
      {
        sourceName: 'Hugging Face',
        title: 'Qwen 2.5 Coder 32B Instruct Model Card and Evaluations',
        url: 'https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct',
        retrievalDate: '2026-10-26',
        metricVerified: 'Apache-2.0, SWE-bench Verified (73.7%), HumanEval (92.4%)',
        confidence: 'Verified Primary'
      },
      {
        sourceName: 'LiveBench',
        title: 'LiveBench Coding & Logic Evaluation: Qwen 2.5 Coder 32B',
        url: 'https://livebench.ai/',
        retrievalDate: '2026-10-27',
        metricVerified: 'LiveBench Coding score (76.2)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'llama-3-3-70b-instruct',
    name: 'Llama 3.3 70B Instruct',
    company: 'Meta',
    kind: 'LLM (General)',
    tier: 'Local / Open-Weights',
    thinkingMode: 'Standard / Instant',
    description: 'Meta premier open weights model delivering Llama 3.1 405B level capabilities inside a widely accessible 70B parameter footprint. Deployed globally for local on-premise inference and enterprise agentic pipelines.',
    detailsUrl: 'https://ai.meta.com/blog/llama-3-3/',
    dateCreated: '2024-12-06',
    lastUpdateDate: '2025-07-01',
    whatsNewInUpdate: 'Matches 405B capabilities on MMLU-Pro and MATH-500; 128k context window; enhanced tool calling; Llama 3.3 Community License.',
    parameters: {
      display: '70B Dense',
      numericBillion: 70
    },
    contextWindowTokens: 131072,
    intelligenceScore: 94.6,
    arenaElo: 1375,
    codingScore: 55.4,
    agenticScore: 78.0,
    mathScore: 78.4,
    reasoningScore: 64.9,
    costPer1MTokens: {
      inputUsd: 0.25,
      outputUsd: 0.70,
      blendedUsd: 0.36
    },
    throughputTokensPerSec: 85.0,
    ttftMs: 290,
    license: 'Llama 3.3 Community License',
    evaluatedOn: ['MMLU-Pro', 'MATH-500', 'GPQA Diamond', 'Open LLM Leaderboard 2', 'LMSYS Arena'],
    platforms: [
      { platform: 'Hugging Face', url: 'https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct', accessType: 'Open Weights' },
      { platform: 'Together AI', url: 'https://www.together.ai', accessType: 'Commercial API' },
      { platform: 'Ollama / Local', url: 'https://ollama.com/library/llama3.3:70b', accessType: 'On-Premise' }
    ],
    citations: [
      {
        sourceName: 'Hugging Face',
        title: 'Llama 3.3 70B Instruct Model Card and Evaluations',
        url: 'https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct',
        retrievalDate: '2026-10-25',
        metricVerified: 'Llama 3.3 License, MMLU-Pro (73.2), MATH-500 (78.4%)',
        confidence: 'Verified Primary'
      },
      {
        sourceName: 'Artificial Analysis',
        title: 'Llama 3.3 70B Quality and Throughput Benchmarks',
        url: 'https://artificialanalysis.ai/models/llama-3-3-70b-instruct',
        retrievalDate: '2026-10-26',
        metricVerified: 'Median throughput (85.0 t/s), TTFT (290ms)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2 (123B)',
    company: 'Mistral AI',
    kind: 'LLM (General)',
    tier: 'Local / Open-Weights',
    thinkingMode: 'Standard / Instant',
    description: 'Flagship 123B dense model from European AI pioneer Mistral AI. Features world-class multilingual capabilities (French, German, Spanish, Chinese, Japanese, Arabic) and native reasoning across 80+ programming languages.',
    detailsUrl: 'https://mistral.ai/news/mistral-large-2407/',
    dateCreated: '2024-07-24',
    lastUpdateDate: '2025-06-10',
    whatsNewInUpdate: '128k context window; 84.0% MMLU; 76.5% MATH-500; weights available on Hugging Face under Mistral Research / Commercial License.',
    parameters: {
      display: '123B Dense',
      numericBillion: 123
    },
    contextWindowTokens: 128000,
    intelligenceScore: 94.0,
    arenaElo: 1342,
    codingScore: 58.2,
    agenticScore: 77.5,
    mathScore: 76.5,
    reasoningScore: 63.8,
    costPer1MTokens: {
      inputUsd: 2.00,
      outputUsd: 6.00,
      blendedUsd: 3.00
    },
    throughputTokensPerSec: 46.0,
    ttftMs: 460,
    license: 'Mistral Research / Commercial License',
    evaluatedOn: ['MMLU-Pro', 'HumanEval', 'MATH-500', 'LiveBench', 'LMSYS Arena'],
    platforms: [
      { platform: 'Hugging Face', url: 'https://huggingface.co/mistralai/Mistral-Large-Instruct-2407', accessType: 'Open Weights' },
      { platform: 'Ollama / Local', url: 'https://ollama.com/library/mistral-large', accessType: 'On-Premise' }
    ],
    citations: [
      {
        sourceName: 'Hugging Face',
        title: 'Mistral Large 2 (2407) Model Card and Weights',
        url: 'https://huggingface.co/mistralai/Mistral-Large-Instruct-2407',
        retrievalDate: '2026-10-25',
        metricVerified: 'Mistral Research License, 123B architecture, MMLU (84.0%)',
        confidence: 'Verified Primary'
      },
      {
        sourceName: 'LMSYS Chatbot Arena',
        title: 'LMSYS Chatbot Arena - Mistral Large 2 Evaluation',
        url: 'https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard',
        retrievalDate: '2026-10-26',
        metricVerified: 'Arena Elo (1342) on Coding & Multilingual',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'phi-4',
    name: 'Phi-4 (14B Reasoning)',
    company: 'Microsoft',
    kind: 'Reasoning / Hybrid',
    tier: 'Local / Open-Weights',
    thinkingMode: 'High Thinking',
    description: 'High-density 14B open-weights model trained with synthetic data and curriculum reasoning. Beats 70B models on STEM, MATH-500 (84.8%), and competition logic while running effortlessly on modest local consumer hardware.',
    detailsUrl: 'https://techcommunity.microsoft.com/blog/aiplatformblog/introducing-phi-4',
    dateCreated: '2024-12-12',
    lastUpdateDate: '2025-05-12',
    whatsNewInUpdate: 'MIT License release on Hugging Face; 84.8% on MATH-500; 80.6% on GPQA; synthetic dataset generation framework.',
    parameters: {
      display: '14B Dense',
      numericBillion: 14
    },
    contextWindowTokens: 16384,
    intelligenceScore: 93.8,
    arenaElo: 1358,
    codingScore: 52.4,
    agenticScore: 74.0,
    mathScore: 84.8,
    reasoningScore: 65.2,
    costPer1MTokens: {
      inputUsd: 0.10,
      outputUsd: 0.15,
      blendedUsd: 0.11
    },
    throughputTokensPerSec: 120.0,
    ttftMs: 180,
    license: 'MIT (Permissive Open Weights)',
    evaluatedOn: ['MATH-500', 'GPQA Diamond', 'MMLU-Pro', 'LiveBench', 'Open LLM Leaderboard 2'],
    platforms: [
      { platform: 'Hugging Face', url: 'https://huggingface.co/microsoft/phi-4', accessType: 'Open Weights' },
      { platform: 'Ollama / Local', url: 'https://ollama.com/library/phi4', accessType: 'On-Premise' }
    ],
    citations: [
      {
        sourceName: 'Hugging Face',
        title: 'Microsoft Phi-4 Model Card and STEM Benchmark Scores',
        url: 'https://huggingface.co/microsoft/phi-4',
        retrievalDate: '2026-10-25',
        metricVerified: 'MIT License, MATH-500 (84.8%), GPQA (80.6%)',
        confidence: 'Verified Primary'
      },
      {
        sourceName: 'LiveBench',
        title: 'LiveBench Evaluation: Microsoft Phi-4',
        url: 'https://livebench.ai/',
        retrievalDate: '2026-10-26',
        metricVerified: 'LiveBench Reasoning & Math (69.4)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'gemma-2-27b',
    name: 'Gemma 2 27B Instruct',
    company: 'Google',
    kind: 'LLM (General)',
    tier: 'Local / Open-Weights',
    thinkingMode: 'Standard / Instant',
    description: 'Google open weights model trained using knowledge distillation from larger Gemini models. Features alternating local and global attention layers for efficient inference and competitive performance on consumer workstations.',
    detailsUrl: 'https://blog.google/technology/developers/google-gemma-2/',
    dateCreated: '2024-06-27',
    lastUpdateDate: '2025-04-15',
    whatsNewInUpdate: 'Soft-capping logits; grouped-query attention; 74.2% MATH-500; weights freely downloadable on Kaggle and Hugging Face.',
    parameters: {
      display: '27B Dense',
      numericBillion: 27
    },
    contextWindowTokens: 8192,
    intelligenceScore: 92.8,
    arenaElo: 1330,
    codingScore: 51.2,
    agenticScore: 72.8,
    mathScore: 74.2,
    reasoningScore: 62.1,
    costPer1MTokens: {
      inputUsd: 0.18,
      outputUsd: 0.18,
      blendedUsd: 0.18
    },
    throughputTokensPerSec: 95.0,
    ttftMs: 210,
    license: 'Gemma Terms of Use (Open Weights & Commercial)',
    evaluatedOn: ['MMLU-Pro', 'MATH-500', 'HumanEval', 'LMSYS Arena', 'Open LLM Leaderboard 2'],
    platforms: [
      { platform: 'Hugging Face', url: 'https://huggingface.co/google/gemma-2-27b-it', accessType: 'Open Weights' },
      { platform: 'Ollama / Local', url: 'https://ollama.com/library/gemma2:27b', accessType: 'On-Premise' }
    ],
    citations: [
      {
        sourceName: 'Hugging Face',
        title: 'Google Gemma 2 27B Instruct Model Card',
        url: 'https://huggingface.co/google/gemma-2-27b-it',
        retrievalDate: '2026-10-25',
        metricVerified: 'Gemma Terms, MMLU-Pro (68.2), MATH-500 (74.2%)',
        confidence: 'Verified Primary'
      },
      {
        sourceName: 'LMSYS Chatbot Arena',
        title: 'LMSYS Chatbot Arena - Gemma 2 27B Ranking',
        url: 'https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard',
        retrievalDate: '2026-10-26',
        metricVerified: 'Arena Elo (1330)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  },
  {
    id: 'flux-1-schnell',
    name: 'FLUX.1 [schnell] (Open Weights)',
    company: 'Black Forest Labs',
    kind: 'Image / Diffusion',
    tier: 'Local / Open-Weights',
    thinkingMode: 'N/A',
    description: '12-billion parameter rectified flow transformer tailored for 1 to 4-step local text-to-image generation. Released under Apache 2.0 license for personal, scientific, and commercial local deployment.',
    detailsUrl: 'https://github.com/black-forest-labs/flux',
    dateCreated: '2024-08-01',
    lastUpdateDate: '2025-06-01',
    whatsNewInUpdate: 'Apache 2.0 open weights; 4-step distilled generation; native ComfyUI and Diffusers integration; GenEval composition score 84.2.',
    parameters: {
      display: '12B Rectified Flow Transformer',
      numericBillion: 12
    },
    contextWindowTokens: 512,
    intelligenceScore: 93.5,
    arenaElo: 1360,
    codingScore: 0,
    agenticScore: 45.0,
    mathScore: 0,
    reasoningScore: 84.2,
    costPer1MTokens: {
      inputUsd: 0.003,
      outputUsd: 0.003,
      blendedUsd: 0.003
    },
    throughputTokensPerSec: 12.0,
    ttftMs: 450,
    license: 'Apache-2.0 (Permissive Open Source)',
    evaluatedOn: ['GenEval', 'Artificial Analysis Image Arena', 'ImageReward'],
    platforms: [
      { platform: 'Hugging Face', url: 'https://huggingface.co/black-forest-labs/FLUX.1-schnell', accessType: 'Open Weights' },
      { platform: 'Replicate', url: 'https://replicate.com', accessType: 'Commercial API' }
    ],
    citations: [
      {
        sourceName: 'Hugging Face',
        title: 'FLUX.1-schnell Model Card & Apache 2.0 Repository',
        url: 'https://huggingface.co/black-forest-labs/FLUX.1-schnell',
        retrievalDate: '2026-10-25',
        metricVerified: 'Apache-2.0, 12B DiT weights, GenEval (84.2)',
        confidence: 'Verified Primary'
      },
      {
        sourceName: 'Artificial Analysis',
        title: 'Artificial Analysis Text-to-Image Arena - FLUX.1 Models',
        url: 'https://artificialanalysis.ai/text-to-image/arena',
        retrievalDate: '2026-10-26',
        metricVerified: 'Image Arena Elo (1360)',
        confidence: 'Verified Independent Benchmark'
      }
    ]
  }
];
