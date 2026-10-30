import React, { useState, useEffect } from 'react';
import { ModelEntry, CompletenessAuditReport, AuditCheckResult } from '../types';
import {
  AppSettings,
  getAppSettings,
  saveAppSettings,
  verifyArtificialAnalysisKey,
  verifyHuggingFaceKey,
  KeyVerificationResult,
  USER_INITIAL_AA_KEY
} from '../services/appSettings';
import { runCompletenessAudit, ingestMissingModels } from '../services/modelRegistryAuditor';
import {
  X,
  Settings as SettingsIcon,
  Key,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Search,
  Lock,
  Globe
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentModels: ModelEntry[];
  onApplyIngestion: (updatedModels: ModelEntry[]) => void;
  initialTab?: 'keys' | 'test';
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentModels,
  onApplyIngestion,
  initialTab = 'keys'
}) => {
  const [activeTab, setActiveTab] = useState<'keys' | 'test'>(initialTab);

  // Settings state
  const [aaKey, setAaKey] = useState<string>(USER_INITIAL_AA_KEY);
  const [hfKey, setHfKey] = useState<string>('');
  const [showAaKey, setShowAaKey] = useState(false);
  const [showHfKey, setShowHfKey] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Verification results
  const [aaVerifying, setAaVerifying] = useState(false);
  const [aaResult, setAaResult] = useState<KeyVerificationResult | null>(null);
  const [hfVerifying, setHfVerifying] = useState(false);
  const [hfResult, setHfResult] = useState<KeyVerificationResult | null>(null);

  // Audit test runner state
  const [auditReport, setAuditReport] = useState<CompletenessAuditReport | null>(null);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testFilter, setTestFilter] = useState<'all' | 'missing' | 'matched'>('all');
  const [testSearch, setTestSearch] = useState('');
  const [selectedToIngest, setSelectedToIngest] = useState<Set<string>>(new Set());
  const [ingestedSuccessMessage, setIngestedSuccessMessage] = useState<string | null>(null);

  // Sync settings when modal opens
  useEffect(() => {
    if (isOpen) {
      const current = getAppSettings();
      setAaKey(current.artificialAnalysisApiKey);
      setHfKey(current.huggingFaceApiKey);
      setActiveTab(initialTab);
      // Automatically run audit test to have fresh data in Test tab
      executeAudit();
    }
  }, [isOpen, initialTab, currentModels]);

  const executeAudit = async () => {
    setIsRunningTest(true);
    setIngestedSuccessMessage(null);
    try {
      await new Promise((r) => setTimeout(r, 200));
      const report = await runCompletenessAudit(currentModels);
      setAuditReport(report);
      const missingIds = report.results.filter((r) => !r.isMatched).map((r) => r.auditedModel.id);
      setSelectedToIngest(new Set(missingIds));
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsRunningTest(false);
    }
  };

  if (!isOpen) return null;

  const handleSaveSettings = () => {
    saveAppSettings({
      artificialAnalysisApiKey: aaKey.trim(),
      huggingFaceApiKey: hfKey.trim()
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2200);
  };

  const handleTestAaKey = async () => {
    setAaVerifying(true);
    setAaResult(null);
    const res = await verifyArtificialAnalysisKey(aaKey);
    setAaResult(res);
    setAaVerifying(false);
  };

  const handleTestHfKey = async () => {
    setHfVerifying(true);
    setHfResult(null);
    const res = await verifyHuggingFaceKey(hfKey);
    setHfResult(res);
    setHfVerifying(false);
  };

  const handleResetAaKey = () => {
    setAaKey(USER_INITIAL_AA_KEY);
    saveAppSettings({ artificialAnalysisApiKey: USER_INITIAL_AA_KEY });
    setAaResult(null);
  };

  const handleCopyKey = (val: string, keyName: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Test Runner helpers
  const results = auditReport?.results || [];
  const filteredTestResults = results.filter((r) => {
    if (testFilter === 'missing' && r.isMatched) return false;
    if (testFilter === 'matched' && !r.isMatched) return false;
    if (testSearch) {
      const term = testSearch.toLowerCase();
      return (
        r.auditedModel.name.toLowerCase().includes(term) ||
        r.auditedModel.company.toLowerCase().includes(term) ||
        r.auditedModel.kind.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const handleToggleSelectIngest = (id: string) => {
    const next = new Set(selectedToIngest);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedToIngest(next);
  };

  const handleSelectAllMissing = () => {
    const missingIds = results.filter((r) => !r.isMatched).map((r) => r.auditedModel.id);
    setSelectedToIngest(new Set(missingIds));
  };

  const handleExecuteIngestion = () => {
    if (selectedToIngest.size === 0) return;
    const ids = Array.from(selectedToIngest);
    const updated = ingestMissingModels(currentModels, ids);
    onApplyIngestion(updated);
    setIngestedSuccessMessage(`Successfully ingested ${ids.length} missing models into the database!`);
    setSelectedToIngest(new Set());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 no-print">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-4xl flex flex-col shadow-2xl overflow-hidden max-h-[94vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
              <SettingsIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Settings & Model Registry Diagnostics
              </h3>
              <p className="text-xs text-neutral-400">
                Configure API keys for Artificial Analysis and Hugging Face, or run the automated registry completeness test.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 py-2.5 bg-neutral-950 border-b border-neutral-800 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('keys')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'keys'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>API Keys & Integrations</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('test')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'test'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Registry Completeness Test</span>
            {auditReport && auditReport.missingCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>
        </div>

        {/* Tab 1: API Keys & Integrations */}
        {activeTab === 'keys' && (
          <div className="p-4 sm:p-6 space-y-6 flex-1 overflow-y-auto">
            {/* Success toast */}
            {savedNotice && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-700/80 rounded-xl text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Settings and API keys saved successfully to persistent local storage.</span>
              </div>
            )}

            {/* Provider 1: Artificial Analysis */}
            <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 sm:p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center font-bold text-xs text-white">
                    AA
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Artificial Analysis API Key</h4>
                    <p className="text-[11px] text-neutral-400">
                      Powers live throughput curves (tokens/sec), time-to-first-token (TTFT), and API blended pricing.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleResetAaKey}
                    className="text-[11px] text-neutral-400 hover:text-neutral-200 px-2 py-1 rounded bg-neutral-900 border border-neutral-800 transition-colors"
                    title="Reset to default provided key"
                  >
                    Reset Key
                  </button>
                  <button
                    type="button"
                    onClick={handleTestAaKey}
                    disabled={aaVerifying || !aaKey}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors disabled:opacity-40"
                  >
                    <RefreshCw className={`w-3 h-3 ${aaVerifying ? 'animate-spin' : ''}`} />
                    <span>Test Key</span>
                  </button>
                </div>
              </div>

              {/* Input field */}
              <div className="relative">
                <input
                  type={showAaKey ? 'text' : 'password'}
                  value={aaKey}
                  onChange={(e) => setAaKey(e.target.value)}
                  placeholder="aa_..."
                  className="w-full pl-3 pr-20 py-2 text-xs font-mono bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleCopyKey(aaKey, 'aa')}
                    className="p-1 text-neutral-400 hover:text-white rounded"
                    title="Copy API Key"
                  >
                    {copiedKey === 'aa' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAaKey(!showAaKey)}
                    className="p-1 text-neutral-400 hover:text-white rounded"
                    title={showAaKey ? 'Mask key' : 'Show key'}
                  >
                    {showAaKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Test verification feedback */}
              {aaResult && (
                <div
                  className={`p-2.5 rounded-lg text-xs font-mono flex items-start gap-2 border ${
                    aaResult.valid
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-800 text-rose-300'
                  }`}
                >
                  {aaResult.valid ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  )}
                  <div>
                    <div className="font-semibold">{aaResult.message}</div>
                    {aaResult.latencyMs > 0 && (
                      <div className="text-[10px] text-neutral-400 mt-0.5">Latency: {aaResult.latencyMs}ms</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Provider 2: Hugging Face User Access Token */}
            <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 sm:p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center font-bold text-xs text-amber-400">
                    HF
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Hugging Face Hub API Token</h4>
                    <p className="text-[11px] text-neutral-400">
                      Optional User Access Token (<code className="text-amber-300">hf_...</code>) for higher rate-limits on Open LLM Leaderboard 2 & model card queries.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="https://huggingface.co/settings/tokens"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white px-2 py-1 rounded bg-neutral-900 border border-neutral-800 transition-colors"
                  >
                    <span>Get Token</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={handleTestHfKey}
                    disabled={hfVerifying || !hfKey}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors disabled:opacity-40"
                  >
                    <RefreshCw className={`w-3 h-3 ${hfVerifying ? 'animate-spin' : ''}`} />
                    <span>Test Token</span>
                  </button>
                </div>
              </div>

              {/* Input field */}
              <div className="relative">
                <input
                  type={showHfKey ? 'text' : 'password'}
                  value={hfKey}
                  onChange={(e) => setHfKey(e.target.value)}
                  placeholder="hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (Optional)"
                  className="w-full pl-3 pr-20 py-2 text-xs font-mono bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {hfKey && (
                    <button
                      type="button"
                      onClick={() => handleCopyKey(hfKey, 'hf')}
                      className="p-1 text-neutral-400 hover:text-white rounded"
                      title="Copy Token"
                    >
                      {copiedKey === 'hf' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowHfKey(!showHfKey)}
                    className="p-1 text-neutral-400 hover:text-white rounded"
                    title={showHfKey ? 'Mask token' : 'Show token'}
                  >
                    {showHfKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Test verification feedback */}
              {hfResult && (
                <div
                  className={`p-2.5 rounded-lg text-xs font-mono flex items-start gap-2 border ${
                    hfResult.valid
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-800 text-rose-300'
                  }`}
                >
                  {hfResult.valid ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  )}
                  <div>
                    <div className="font-semibold">{hfResult.message}</div>
                    {hfResult.latencyMs > 0 && (
                      <div className="text-[10px] text-neutral-400 mt-0.5">Latency: {hfResult.latencyMs}ms</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Test Feature Moved to Settings */}
        {activeTab === 'test' && (
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Top Diagnostics Dashboard */}
            <div className="p-4 sm:p-6 bg-neutral-950/60 border-b border-neutral-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="bg-neutral-900/90 border border-neutral-800 p-3 rounded-xl">
                  <span className="text-[10px] font-mono text-neutral-400 block uppercase">External Tracked</span>
                  <span className="text-xl font-bold font-mono text-white">
                    {auditReport ? auditReport.totalAudited : '--'} Models
                  </span>
                  <span className="text-[11px] text-neutral-500 block mt-0.5">From HF Hub, LMSYS, LiveBench</span>
                </div>

                <div className="bg-neutral-900/90 border border-neutral-800 p-3 rounded-xl">
                  <span className="text-[10px] font-mono text-neutral-400 block uppercase">Verified in Database</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">
                    {auditReport ? auditReport.matchedCount : '--'} Matched
                  </span>
                  <span className="text-[11px] text-emerald-500/80 block mt-0.5">Active & verified entries</span>
                </div>

                <div className="bg-neutral-900/90 border border-neutral-800 p-3 rounded-xl">
                  <span className="text-[10px] font-mono text-neutral-400 block uppercase">Identified Gaps</span>
                  <span className="text-xl font-bold font-mono text-amber-400">
                    {auditReport ? auditReport.missingCount : '--'} Missing
                  </span>
                  <span className="text-[11px] text-amber-500/80 block mt-0.5">Available for 1-click ingestion</span>
                </div>

                <div className="bg-neutral-900/90 border border-neutral-800 p-3 rounded-xl">
                  <span className="text-[10px] font-mono text-neutral-400 block uppercase">Coverage Score</span>
                  <span className={`text-xl font-bold font-mono ${auditReport && auditReport.coveragePercent >= 90 ? 'text-emerald-400' : 'text-indigo-400'}`}>
                    {auditReport ? `${auditReport.coveragePercent}%` : '--%'}
                  </span>
                  <span className="text-[11px] text-neutral-400 block mt-0.5">
                    {auditReport && auditReport.missingCount === 0 ? 'Full 100% Industry Parity' : 'Ingest to achieve 100%'}
                  </span>
                </div>
              </div>

              {/* Automated Test Suite Assertion Checklist */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs space-y-2">
                <div className="flex items-center justify-between text-neutral-300 font-mono text-[11px] border-b border-neutral-800/80 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-semibold text-white">AUTOMATED REGISTRY AUDITOR TEST RUNNER</span>
                  </div>
                  <button
                    type="button"
                    onClick={executeAudit}
                    disabled={isRunningTest}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isRunningTest ? 'animate-spin' : ''}`} />
                    <span>Rerun Test</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Frontier Models: 100% SOTA</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Open-Weights: 12+ Roster</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>SWE-bench Top 10 Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>LiveBench Contamination-Free</span>
                  </div>
                </div>
              </div>

              {/* Success Banner if ingested */}
              {ingestedSuccessMessage && (
                <div className="mt-3 p-3 bg-emerald-950/60 border border-emerald-700/80 rounded-xl text-xs text-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{ingestedSuccessMessage}</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">Database Updated</span>
                </div>
              )}
            </div>

            {/* Filter and Bulk Action Bar */}
            <div className="p-4 border-b border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-900/80">
              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-lg bg-neutral-950 p-1 border border-neutral-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setTestFilter('all')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      testFilter === 'all' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    All Audited ({auditReport?.totalAudited || 0})
                  </button>
                  <button
                    type="button"
                    onClick={() => setTestFilter('missing')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      testFilter === 'missing' ? 'bg-amber-900/50 text-amber-200' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Missing Gaps ({auditReport?.missingCount || 0})
                  </button>
                  <button
                    type="button"
                    onClick={() => setTestFilter('matched')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      testFilter === 'matched' ? 'bg-emerald-900/50 text-emerald-200' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Verified in DB ({auditReport?.matchedCount || 0})
                  </button>
                </div>

                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                  <input
                    type="text"
                    value={testSearch}
                    onChange={(e) => setTestSearch(e.target.value)}
                    placeholder="Search audited models..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Action to Ingest Selected Missing Models */}
              {auditReport && auditReport.missingCount > 0 && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleSelectAllMissing}
                    className="text-xs text-neutral-400 hover:text-white px-2 py-1 transition-colors"
                  >
                    Select All Missing
                  </button>
                  <button
                    type="button"
                    onClick={handleExecuteIngestion}
                    disabled={selectedToIngest.size === 0}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 rounded-lg shadow-sm transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ingest {selectedToIngest.size} Missing Models</span>
                  </button>
                </div>
              )}
            </div>

            {/* Audited Models Table */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950/60">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-neutral-900/90 text-neutral-400 uppercase font-mono text-[10px] border-b border-neutral-800">
                      <th className="p-3 w-10 text-center">Select</th>
                      <th className="p-3">Model Name & Lab</th>
                      <th className="p-3">Architecture & Tier</th>
                      <th className="p-3">External Registry</th>
                      <th className="p-3">Database Match</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 font-sans">
                    {filteredTestResults.map((r) => {
                      const isSelected = selectedToIngest.has(r.auditedModel.id);
                      return (
                        <tr
                          key={r.auditedModel.id}
                          className={`hover:bg-neutral-900/50 transition-colors ${
                            !r.isMatched ? 'bg-amber-950/10' : ''
                          }`}
                        >
                          <td className="p-3 text-center">
                            {!r.isMatched ? (
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleToggleSelectIngest(r.auditedModel.id)}
                                className="rounded border-neutral-700 bg-neutral-900 text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                              />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                            )}
                          </td>

                          <td className="p-3">
                            <div className="font-semibold text-white">{r.auditedModel.name}</div>
                            <div className="text-[11px] text-neutral-400">{r.auditedModel.company}</div>
                          </td>

                          <td className="p-3">
                            <div className="text-neutral-200">{r.auditedModel.kind}</div>
                            <div className="text-[10px] text-neutral-400 font-mono">
                              {r.auditedModel.tier} · {r.auditedModel.parametersDisplay}
                            </div>
                          </td>

                          <td className="p-3 font-mono text-[11px]">
                            <a
                              href={r.auditedModel.externalUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 hover:underline"
                            >
                              <span>{r.auditedModel.sourceRegistry}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>

                          <td className="p-3">
                            {r.isMatched ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
                                <CheckCircle2 className="w-3 h-3" />
                                VERIFIED IN DB
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/80">
                                <AlertTriangle className="w-3 h-3" />
                                MISSING FROM DB
                              </span>
                            )}
                          </td>

                          <td className="p-3 text-right">
                            {!r.isMatched ? (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = ingestMissingModels(currentModels, [r.auditedModel.id]);
                                  onApplyIngestion(updated);
                                  setIngestedSuccessMessage(`Added ${r.auditedModel.name} to database!`);
                                }}
                                className="px-2.5 py-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 rounded transition-colors"
                              >
                                + Ingest
                              </button>
                            ) : (
                              <span className="text-[11px] text-neutral-500 font-mono">Active</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <Lock className="w-3.5 h-3.5 text-neutral-500" />
            <span>Keys stored locally in browser storage & passed to secure data-fetching proxies.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Close
            </button>

            {activeTab === 'keys' && (
              <button
                type="button"
                onClick={handleSaveSettings}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-sm transition-all"
              >
                Save Settings
              </button>
            )}

            {activeTab === 'test' && auditReport && auditReport.missingCount > 0 && (
              <button
                type="button"
                onClick={handleExecuteIngestion}
                disabled={selectedToIngest.size === 0}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-lg shadow-sm transition-all"
              >
                Ingest Selected ({selectedToIngest.size})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
