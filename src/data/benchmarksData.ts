import { BenchmarkDefinition } from '../types';

export const BENCHMARKS_DATA: BenchmarkDefinition[] = [
  {
    id: 'livebench',
    name: 'LiveBench (Contamination-Free)',
    category: 'General Intelligence',
    metricUnit: 'Score (0-100)',
    description: 'Contamination-free benchmark with monthly refreshed, unreleased questions spanning reasoning, math, coding, data analysis, and language comprehension.',
    organizer: 'UC Berkeley & Abacus.ai',
    url: 'https://livebench.ai/',
    datasetOrLeaderboardUrl: 'https://huggingface.co/spaces/livebench/leaderboard',
    citation: {
      sourceName: 'LiveBench',
      title: 'LiveBench: A Challenging, Contamination-Free LLM Benchmark',
      url: 'https://livebench.ai/',
      retrievalDate: '2026-10-28',
      metricVerified: 'Overall LiveBench score & monthly contamination-free task accuracy',
      confidence: 'Verified Independent Benchmark'
    }
  },
  {
    id: 'arena-elo',
    name: 'LMSYS Chatbot Arena Elo',
    category: 'Human Preference',
    metricUnit: 'Elo Rating',
    description: 'Crowdsourced open platform for LLM evaluations based on blind pairwise human preference votes with Bradley-Terry statistical modeling.',
    organizer: 'LMSYS Org / UC Berkeley',
    url: 'https://chat.lmsys.org/?leaderboard',
    datasetOrLeaderboardUrl: 'https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard',
    citation: {
      sourceName: 'LMSYS Chatbot Arena',
      title: 'Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference',
      url: 'https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard',
      retrievalDate: '2026-10-25',
      metricVerified: 'Overall & Hard Prompts Arena Elo rating',
      confidence: 'Verified Independent Benchmark'
    }
  },
  {
    id: 'swe-bench',
    name: 'SWE-bench Verified',
    category: 'Coding & SWE',
    metricUnit: 'Pass@1 %',
    description: 'Curated 500-task benchmark testing language models on solving real-world, end-to-end GitHub software engineering issues in verified environments.',
    organizer: 'Princeton University & OpenAI',
    url: 'https://www.swebench.com/',
    datasetOrLeaderboardUrl: 'https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified',
    citation: {
      sourceName: 'Hugging Face',
      title: 'SWE-bench Verified: Benchmark for Software Engineering Agents',
      url: 'https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified',
      retrievalDate: '2026-10-22',
      metricVerified: 'Resolved issue rate (Pass@1 %)',
      confidence: 'Verified Independent Benchmark'
    }
  },
  {
    id: 'mmlu-pro',
    name: 'MMLU-Pro',
    category: 'General Intelligence',
    metricUnit: '% Accuracy',
    description: 'More rigorous extension of MMLU with 12,000+ college-level reasoning questions, 10-option multiple choice to reduce random guessing, and multi-step reasoning.',
    organizer: 'TII & Hugging Face Open LLM Leaderboard 2',
    url: 'https://github.com/TII-SSRC/MMLU-Pro',
    datasetOrLeaderboardUrl: 'https://huggingface.co/datasets/TII-SSRC/MMLU-Pro',
    citation: {
      sourceName: 'Hugging Face',
      title: 'Open LLM Leaderboard 2.0 / MMLU-Pro Benchmark Suite',
      url: 'https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard',
      retrievalDate: '2026-10-28',
      metricVerified: '5-shot college-level multidisciplinary reasoning accuracy',
      confidence: 'Verified Independent Benchmark'
    }
  },
  {
    id: 'gpqa-diamond',
    name: 'GPQA Diamond',
    category: 'Reasoning & Math',
    metricUnit: '% Accuracy',
    description: 'Graduate-level Google-proof Q&A benchmark created by domain experts in biology, physics, and chemistry. PhD non-experts score ~34%.',
    organizer: 'NYU & Cohere & Anthropic',
    url: 'https://arxiv.org/abs/2311.12022',
    datasetOrLeaderboardUrl: 'https://huggingface.co/datasets/Idavidrein/gpqa',
    citation: {
      sourceName: 'arXiv / Official Paper',
      title: 'GPQA: A Graduate-Level Google-Proof Q&A Benchmark',
      url: 'https://arxiv.org/abs/2311.12022',
      retrievalDate: '2026-10-20',
      metricVerified: 'GPQA Diamond subset zero-shot accuracy',
      confidence: 'Verified Independent Benchmark'
    }
  },
  {
    id: 'math-500',
    name: 'MATH-500',
    category: 'Reasoning & Math',
    metricUnit: '% Accuracy',
    description: 'Standardized 500-problem subset of the challenging competition-grade Hendrycks MATH benchmark measuring multi-step mathematical proof and calculation.',
    organizer: 'OpenAI / Hendrycks et al.',
    url: 'https://github.com/openai/prm800k',
    datasetOrLeaderboardUrl: 'https://huggingface.co/datasets/HuggingFaceH4/MATH-500',
    citation: {
      sourceName: 'Hugging Face',
      title: 'MATH-500 Competition Math Benchmark',
      url: 'https://huggingface.co/datasets/HuggingFaceH4/MATH-500',
      retrievalDate: '2026-10-24',
      metricVerified: 'Exact match percentage on competition math problems',
      confidence: 'Verified Independent Benchmark'
    }
  },
  {
    id: 'gaia',
    name: 'GAIA',
    category: 'Agentic & Tool Use',
    metricUnit: '% Accuracy',
    description: 'General AI Assistants benchmark proposing real-world multi-modal, tool-use, web navigation, and file handling questions with unambiguous ground truth.',
    organizer: 'Meta AI, Hugging Face, AutoGPT',
    url: 'https://huggingface.co/spaces/gaia-benchmark/leaderboard',
    datasetOrLeaderboardUrl: 'https://huggingface.co/datasets/gaia-benchmark/GAIA',
    citation: {
      sourceName: 'Hugging Face',
      title: 'GAIA: A Benchmark for General AI Assistants',
      url: 'https://huggingface.co/spaces/gaia-benchmark/leaderboard',
      retrievalDate: '2026-10-26',
      metricVerified: 'Level 1, 2, and 3 multimodal agent task completion rate',
      confidence: 'Verified Independent Benchmark'
    }
  },
  {
    id: 'livecodebench',
    name: 'LiveCodeBench',
    category: 'Coding & SWE',
    metricUnit: 'Pass@1 %',
    description: 'Continuously updated uncontaminated coding benchmark collecting newly released competitive programming problems from LeetCode, Codeforces, and AtCoder.',
    organizer: 'Stanford University & LiveCodeBench Team',
    url: 'https://livecodebench.github.io/leaderboard.html',
    datasetOrLeaderboardUrl: 'https://github.com/LiveCodeBench/LiveCodeBench',
    citation: {
      sourceName: 'Artificial Analysis',
      title: 'LiveCodeBench Dynamic Programming Evaluation Index',
      url: 'https://artificialanalysis.ai/evaluations/livecodebench',
      retrievalDate: '2026-10-29',
      metricVerified: 'Pass@1 on uncontaminated programming challenges',
      confidence: 'Verified Independent Benchmark'
    }
  },
  {
    id: 'mmmu',
    name: 'MMMU (Massive Multi-discipline Multimodal)',
    category: 'Multimodal Vision',
    metricUnit: '% Accuracy',
    description: 'Multimodal evaluation benchmark comprising 11,500 college-level exam questions across 30 subjects requiring deep perception and multidisciplinary reasoning.',
    organizer: 'INHERIT Center & Carnegie Mellon University',
    url: 'https://mmmu-benchmark.github.io/',
    datasetOrLeaderboardUrl: 'https://huggingface.co/datasets/MMMU/MMMU',
    citation: {
      sourceName: 'Hugging Face',
      title: 'MMMU: A Massive Multi-discipline Multimodal Understanding and Reasoning Benchmark',
      url: 'https://huggingface.co/datasets/MMMU/MMMU',
      retrievalDate: '2026-10-25',
      metricVerified: 'Overall validation accuracy across college-level disciplines',
      confidence: 'Verified Independent Benchmark'
    }
  },
  {
    id: 'geneval',
    name: 'GenEval (Image Generation Compositionality)',
    category: 'Generative Media',
    metricUnit: 'Score (0-100)',
    description: 'Object-focused compositional benchmark assessing prompt adherence, spatial relations, counting, color attribution, and binding in generative image models.',
    organizer: 'MIT & University of California Berkeley',
    url: 'https://geneval-benchmark.github.io/',
    datasetOrLeaderboardUrl: 'https://github.com/djghosh13/geneval',
    citation: {
      sourceName: 'Hugging Face',
      title: 'GenEval: An Object-Focused Framework for Evaluating Text-to-Image Alignment',
      url: 'https://huggingface.co/papers/2305.15391',
      retrievalDate: '2026-10-18',
      metricVerified: 'Overall text-to-image composition alignment score',
      confidence: 'Verified Independent Benchmark'
    }
  }
];
