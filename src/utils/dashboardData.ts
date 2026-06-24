import type { CacheData, HotRepo, Miner, PullRequest } from '@/types';

type RepoCommitRow = {
  repositoryFullName?: string;
  emissionShare?: string | number;
  commits?: string | number;
  linesChanged?: string | number;
};

export function getTopMiners(data: CacheData, limit = 6): Array<Miner & { rank: number }> {
  return [...(data.miners ?? [])]
    .sort((a, b) => (b.usdPerDay ?? 0) - (a.usdPerDay ?? 0))
    .slice(0, limit)
    .map((m, i) => ({ ...m, rank: i + 1 }));
}

export function getRecentPrs(data: CacheData, limit = 6): PullRequest[] {
  const prTime = (pr: PullRequest) => {
    const merged = pr.mergedAt ? new Date(pr.mergedAt).getTime() : 0;
    const created = pr.prCreatedAt ? new Date(pr.prCreatedAt).getTime() : 0;
    return Math.max(merged, created);
  };

  return [...(data.prs ?? [])]
    .sort((a, b) => {
      const diff = prTime(b) - prTime(a);
      if (diff !== 0) return diff;
      return (b.pullRequestNumber ?? 0) - (a.pullRequestNumber ?? 0);
    })
    .slice(0, limit);
}

export function getTopHotRepos(data: CacheData, limit = 6): HotRepo[] {
  return [...((data.repoCommits ?? []) as RepoCommitRow[])]
    .sort(
      (a, b) =>
        Number(b.linesChanged ?? b.commits ?? 0) - Number(a.linesChanged ?? a.commits ?? 0),
    )
    .slice(0, limit)
    .map((r, i) => ({
      rank: i + 1,
      fullName: r.repositoryFullName,
      commits: Number(r.commits ?? 0),
      linesChanged: Number(r.linesChanged ?? 0),
      emissionShare: Number(r.emissionShare ?? 0),
    }));
}
