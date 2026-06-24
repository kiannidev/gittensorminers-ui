import { useEffect, useMemo, useState } from 'react';
import { Grid3X3, List, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RepoAvatar } from '@/components/GitHubAvatar';
import { api } from '@/services/api';
import type { ProcessedRepo } from '@/types';
import { formatNumber, formatPercent } from '@/utils/format';
import { repoDetailPath } from '@/utils/prStatus';
import { useOutletContext } from 'react-router-dom';
import type { CacheData } from '@/types';

type ViewMode = 'list' | 'tile';

export function RepositoriesPage() {
  const { data: liveData, lastSyncedAt } = useOutletContext<{
    data: CacheData;
    lastSyncedAt: string | null;
  }>();
  const [repos, setRepos] = useState<ProcessedRepo[]>([]);
  const [view, setView] = useState<ViewMode>('list');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .getProcessedRepos()
      .then((r) => setRepos(r.repos))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (liveData.repos) load();
  }, [liveData.repos, lastSyncedAt]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return repos;
    return repos.filter((r) => r.fullName.toLowerCase().includes(q));
  }, [repos, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Repositories</h1>
          <p className="text-gt-muted">
            Master repository list with emission weights and eligibility thresholds from{' '}
            <a href="https://api.gittensor.io/dash/repos" className="text-gt-accent hover:underline" target="_blank" rel="noreferrer">
              Gittensor API
            </a>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gt-muted" />
            <input
              type="search"
              placeholder="Search repositories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg border border-gt-border bg-gt-surface py-2 pl-9 pr-3 text-sm outline-none focus:ring-1 focus:ring-gt-accent"
            />
          </div>
          <div className="flex rounded-lg border border-gt-border p-1">
            <button
              type="button"
              onClick={() => setView('list')}
              className={`rounded px-3 py-1.5 ${view === 'list' ? 'bg-gt-accent text-white' : 'text-gt-muted'}`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setView('tile')}
              className={`rounded px-3 py-1.5 ${view === 'tile' ? 'bg-gt-accent text-white' : 'text-gt-muted'}`}
              aria-label="Tile view"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-gt-muted">Loading repositories…</p>
      ) : view === 'list' ? (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="border-b border-gt-border text-xs uppercase text-gt-muted">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Repository</th>
                <th className="px-4 py-3">Weight</th>
                <th className="px-4 py-3">Miner Cut</th>
                <th className="px-4 py-3">Issue Discovery</th>
                <th className="px-4 py-3">Min Credibility</th>
                <th className="px-4 py-3">Min Valid Merged PRs</th>
                <th className="px-4 py-3">Min Token Score</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((repo) => (
                <tr key={repo.fullName} className="border-b border-gt-border/50 hover:bg-gt-bg/50">
                  <td className="px-4 py-3 font-mono text-gt-muted">#{repo.rank}</td>
                  <td className="px-4 py-3 font-medium">
                    <Link
                      to={repoDetailPath(repo.fullName)}
                      className="inline-flex items-center gap-2 text-gt-accent hover:underline"
                    >
                      <RepoAvatar fullName={repo.fullName} owner={repo.owner} size="sm" />
                      {repo.fullName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono">{formatPercent(repo.weight)}</td>
                  <td className="px-4 py-3 font-mono">{formatPercent(repo.minerCut)}</td>
                  <td className="px-4 py-3 font-mono">{formatPercent(repo.issueDiscovery)}</td>
                  <td className="px-4 py-3 font-mono">{formatNumber(repo.minCredibility, 2)}</td>
                  <td className="px-4 py-3 font-mono">{repo.minValidMergedPrs ?? '—'}</td>
                  <td className="px-4 py-3 font-mono">{repo.minTokenScore ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((repo) => (
            <article key={repo.fullName} className="card p-4">
              <div className="mb-3 flex items-start justify-between gap-2">
                <Link to={repoDetailPath(repo.fullName)} className="flex min-w-0 items-start gap-2 transition hover:opacity-90">
                  <RepoAvatar fullName={repo.fullName} owner={repo.owner} size="md" />
                  <div className="min-w-0">
                    <span className="text-xs font-mono text-gt-muted">#{repo.rank}</span>
                    <h3 className="truncate font-semibold">{repo.fullName}</h3>
                  </div>
                </Link>
                <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-xs font-mono text-amber-400">
                  {formatPercent(repo.weight)}
                </span>
              </div>
              <dl className="grid grid-cols-2 gap-2 text-xs">
                <Stat label="Miner cut" value={formatPercent(repo.minerCut)} />
                <Stat label="Issue discovery" value={formatPercent(repo.issueDiscovery)} />
                <Stat label="Min credibility" value={formatNumber(repo.minCredibility, 2)} />
                <Stat label="Min merged PRs" value={repo.minValidMergedPrs ?? '—'} />
                <Stat label="Min token score" value={repo.minTokenScore ?? '—'} />
              </dl>
            </article>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-center text-gt-muted">No repositories match your search.</p>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-gt-bg/60 px-2 py-1.5">
      <dt className="text-gt-muted">{label}</dt>
      <dd className="font-mono font-medium">{value}</dd>
    </div>
  );
}
