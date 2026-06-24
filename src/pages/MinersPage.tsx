import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { GitHubAvatar } from '@/components/GitHubAvatar';
import type { Miner } from '@/types';
import { formatNumber, formatUsd, shortHotkey } from '@/utils/format';
import { useOutletContext } from 'react-router-dom';
import type { CacheData } from '@/types';

export function MinersPage() {
  const { data } = useOutletContext<{ data: CacheData }>();
  const [search, setSearch] = useState('');

  const miners = useMemo(() => {
    const list = [...(data.miners ?? [])].sort(
      (a, b) => (b.usdPerDay ?? 0) - (a.usdPerDay ?? 0),
    );
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (m) =>
        m.githubUsername?.toLowerCase().includes(q) ||
        m.hotkey?.toLowerCase().includes(q) ||
        m.githubId?.includes(q),
    );
  }, [data.miners, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Miners</h1>
          <p className="text-gt-muted">Active miners on Gittensor subnet, sorted by daily earnings.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gt-muted" />
          <input
            type="search"
            placeholder="Search miners…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gt-border bg-gt-surface py-2 pl-9 pr-3 text-sm outline-none focus:ring-1 focus:ring-gt-accent"
          />
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead className="border-b border-gt-border text-xs uppercase text-gt-muted">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Miner</th>
              <th className="px-4 py-3">Earnings</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Merged PRs</th>
              <th className="px-4 py-3">Credibility</th>
              <th className="px-4 py-3">Alpha/day</th>
              <th className="px-4 py-3">Hotkey</th>
            </tr>
          </thead>
          <tbody>
            {miners.map((m, i) => (
              <MinerRow key={m.githubId ?? m.hotkey} miner={m} rank={i + 1} />
            ))}
          </tbody>
        </table>
        {miners.length === 0 && (
          <p className="p-8 text-center text-gt-muted">
            {data.miners ? 'No miners match your search.' : 'Waiting for data sync…'}
          </p>
        )}
      </div>
    </div>
  );
}

function MinerRow({ miner, rank }: { miner: Miner; rank: number }) {
  return (
    <tr className="border-b border-gt-border/50 hover:bg-gt-bg/50">
      <td className="px-4 py-3 font-mono text-gt-muted">#{rank}</td>
      <td className="px-4 py-3">
        <Link
          to={`/miners/${miner.githubId}`}
          className="inline-flex items-center gap-2 font-medium text-gt-accent hover:underline"
        >
          <GitHubAvatar githubId={miner.githubId} username={miner.githubUsername} size="sm" />
          @{miner.githubUsername}
        </Link>
      </td>
      <td className="px-4 py-3 font-mono text-emerald-400">{formatUsd(miner.usdPerDay)}</td>
      <td className="px-4 py-3 font-mono">{formatNumber(miner.totalScore)}</td>
      <td className="px-4 py-3 font-mono">{miner.totalMergedPrs ?? '—'}</td>
      <td className="px-4 py-3 font-mono">{formatNumber(miner.credibility, 3)}</td>
      <td className="px-4 py-3 font-mono text-cyan-400">{formatNumber(miner.alphaPerDay)}</td>
      <td className="px-4 py-3 font-mono text-xs text-gt-muted">{shortHotkey(miner.hotkey)}</td>
    </tr>
  );
}
