export interface Miner {
  uid?: number;
  hotkey?: string;
  githubUsername?: string;
  githubId?: string;
  totalScore?: number;
  totalMergedPrs?: number;
  totalOpenPrs?: number;
  credibility?: number;
  metagraphRank?: number;
  alphaPerDay?: number;
  taoPerDay?: number;
  usdPerDay?: number;
  uniqueReposCount?: number;
  isEligible?: boolean;
  eligibleRepoCount?: number;
}

export interface HotRepo {
  rank: number;
  fullName?: string;
  commits: number;
  linesChanged: number;
  emissionShare: number;
}

export interface ProcessedRepo {
  rank: number;
  fullName: string;
  owner: string;
  name: string;
  weight: number;
  minerCut: number;
  maintainerCut: number;
  issueDiscovery: number;
  minCredibility: number | null;
  minValidMergedPrs: number | null;
  minTokenScore: number | null;
  updatedAt?: string;
}

export interface PullRequest {
  pullRequestNumber?: number;
  pullRequestTitle?: string;
  repository?: string;
  author?: string;
  githubId?: string;
  mergedAt?: string | null;
  prCreatedAt?: string;
  prState?: string;
  tokenScore?: string;
  score?: string;
  additions?: number;
  deletions?: number;
  hotkey?: string;
}

export interface PriceData {
  price?: number;
  percentChange24h?: number;
  lastUpdated?: string;
}

export interface Prices {
  tao?: { data?: PriceData; lastUpdated?: string };
  alpha?: { data?: PriceData; lastUpdated?: string };
}

export interface DashboardStats {
  uniqueRepositories?: number;
  totalCommits?: number;
  totalIssues?: number;
  totalLinesChanged?: number;
}

export interface AuthUser {
  id: string;
  githubId: string;
  username: string;
  displayName: string;
  avatarUrl: string;
}

export interface SearchResults {
  miners: Miner[];
  repos: Array<{ fullName?: string }>;
  prs: PullRequest[];
}

export type CacheData = {
  miners?: Miner[];
  repos?: unknown[];
  prs?: PullRequest[];
  stats?: DashboardStats;
  prices?: Prices;
  config?: unknown;
  repoCommits?: unknown[];
};
