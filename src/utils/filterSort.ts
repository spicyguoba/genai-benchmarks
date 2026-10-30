import { ModelEntry, ModelKind, ModelTier, ThinkingMode } from '../types';

export type SortDirection = 'asc' | 'desc';

export interface ModelFilterState {
  searchTerm: string;
  kind: ModelKind | 'All';
  tier: ModelTier | 'All';
  company: string | 'All';
  thinkingMode?: ThinkingMode | 'All';
  minIntelligence?: number;
  minCoding?: number;
  maxCost?: number;
  minParameters?: number;
}

export function filterModels(models: ModelEntry[], filters: ModelFilterState): ModelEntry[] {
  const query = filters.searchTerm.trim().toLowerCase();

  return models.filter(m => {
    // Search query matches name, company, description, what's new, or platforms
    if (query) {
      const nameMatch = m.name.toLowerCase().includes(query);
      const companyMatch = m.company.toLowerCase().includes(query);
      const descMatch = m.description.toLowerCase().includes(query);
      const whatsNewMatch = m.whatsNewInUpdate.toLowerCase().includes(query);
      const platformMatch = m.platforms.some(p => p.platform.toLowerCase().includes(query));
      const evalMatch = m.evaluatedOn.some(e => e.toLowerCase().includes(query));
      const thinkingMatch = m.thinkingMode ? m.thinkingMode.toLowerCase().includes(query) : false;
      if (!nameMatch && !companyMatch && !descMatch && !whatsNewMatch && !platformMatch && !evalMatch && !thinkingMatch) {
        return false;
      }
    }

    // Model kind
    if (filters.kind !== 'All' && m.kind !== filters.kind) {
      return false;
    }

    // Tier
    if (filters.tier !== 'All' && m.tier !== filters.tier) {
      return false;
    }

    // Company
    if (filters.company !== 'All' && m.company !== filters.company) {
      return false;
    }

    // Thinking Mode filter
    if (filters.thinkingMode && filters.thinkingMode !== 'All') {
      if (m.thinkingMode !== filters.thinkingMode) {
        return false;
      }
    }

    // Min Intelligence
    if (filters.minIntelligence !== undefined && m.intelligenceScore < filters.minIntelligence) {
      return false;
    }

    // Min Coding
    if (filters.minCoding !== undefined && m.codingScore < filters.minCoding) {
      return false;
    }

    // Max Cost (blended USD / 1M)
    if (filters.maxCost !== undefined && m.costPer1MTokens.blendedUsd > filters.maxCost) {
      return false;
    }

    // Min Parameters
    if (filters.minParameters !== undefined && m.parameters.numericBillion < filters.minParameters) {
      return false;
    }

    return true;
  });
}

export function sortModels(
  models: ModelEntry[],
  sortKey: string,
  direction: SortDirection
): ModelEntry[] {
  const sorted = [...models].sort((a, b) => {
    let valA: string | number = 0;
    let valB: string | number = 0;

    switch (sortKey) {
      case 'name':
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
        break;
      case 'company':
        valA = a.company.toLowerCase();
        valB = b.company.toLowerCase();
        break;
      case 'dateCreated':
        valA = new Date(a.dateCreated).getTime();
        valB = new Date(b.dateCreated).getTime();
        break;
      case 'lastUpdateDate':
        valA = new Date(a.lastUpdateDate).getTime();
        valB = new Date(b.lastUpdateDate).getTime();
        break;
      case 'parameters':
        valA = a.parameters.numericBillion;
        valB = b.parameters.numericBillion;
        break;
      case 'intelligenceScore':
        valA = a.intelligenceScore;
        valB = b.intelligenceScore;
        break;
      case 'arenaElo':
        valA = a.arenaElo;
        valB = b.arenaElo;
        break;
      case 'codingScore':
        valA = a.codingScore;
        valB = b.codingScore;
        break;
      case 'agenticScore':
        valA = a.agenticScore;
        valB = b.agenticScore;
        break;
      case 'cost':
        valA = a.costPer1MTokens.blendedUsd;
        valB = b.costPer1MTokens.blendedUsd;
        break;
      case 'speed':
        valA = a.throughputTokensPerSec;
        valB = b.throughputTokensPerSec;
        break;
      case 'contextWindow':
        valA = a.contextWindowTokens;
        valB = b.contextWindowTokens;
        break;
      case 'thinkingMode':
        valA = a.thinkingMode || '';
        valB = b.thinkingMode || '';
        break;
      default:
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
    }

    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}
