import type {
  AuthUser,
  DashboardStats,
  HotRepo,
  Miner,
  Prices,
  ProcessedRepo,
  PullRequest,
  SearchResults,
} from '@/types';

const API_URL = import.meta.env.VITE_API_URL ?? '';

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    ...init,
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getDashboardSummary: () =>
    fetchJson<{
      stats: DashboardStats;
      prices: Prices;
      topMiners: Array<Miner & { rank: number }>;
      recentPrs: PullRequest[];
      topHotRepos: HotRepo[];
    }>('/api/dashboard/summary'),

  getProcessedRepos: () =>
    fetchJson<{ repos: ProcessedRepo[] }>('/api/repos/processed'),

  getMiners: () => fetchJson<{ data: Miner[] }>('/api/data/miners').then((r) => r.data),

  search: (q: string) => fetchJson<SearchResults>(`/api/search?q=${encodeURIComponent(q)}`),

  getMe: () => fetchJson<{ user: AuthUser | null }>('/auth/me'),

  getMyBoard: () =>
    fetchJson<{
      user: AuthUser;
      miner: Miner | null;
      prs: PullRequest[];
      rank: number | null;
    }>('/auth/my-board'),

  logout: () => fetchJson<{ ok: boolean }>('/auth/logout', { method: 'POST' }),

  loginUrl: () => `${API_URL}/auth/github`,
};

export type { AuthUser, Miner, ProcessedRepo, PullRequest, Prices, DashboardStats, SearchResults, HotRepo };
