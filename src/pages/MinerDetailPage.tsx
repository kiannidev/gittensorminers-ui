import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GitHubAvatar } from '@/components/GitHubAvatar';
import { formatNumber, formatUsd, shortHotkey } from '@/utils/format';
import { useOutletContext } from 'react-router-dom';
import type { CacheData } from '@/types';

export function MinerDetailPage() {
  const { githubId } = useParams<{ githubId: string }>();
  const { data } = useOutletContext<{ data: CacheData }>();

  const miners = [...(data.miners ?? [])].sort((a, b) => (b.usdPerDay ?? 0) - (a.usdPerDay ?? 0));
  const miner = miners.find((m) => m.githubId === githubId);
  const earningRank = miner ? miners.findIndex((m) => m.githubId === githubId) + 1 : null;

  if (!miner) {
    return (
      <div className="card mx-auto max-w-lg p-8 text-center">
        <p className="mb-4 text-gt-muted">Miner not found.</p>
        <Link to="/miners" className="btn-primary inline-flex">
          <ArrowLeft className="h-4 w-4" />
          Back to miners
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/miners" className="inline-flex items-center gap-2 text-sm text-gt-muted hover:text-gt-text">
        <ArrowLeft className="h-4 w-4" />
        All miners
      </Link>

      <div className="card p-6">
        <div className="flex flex-wrap items-center gap-4">
          <GitHubAvatar githubId={miner.githubId} username={miner.githubUsername} size="lg" />
          <div>
            <p className="text-sm text-gt-muted">Rank #{earningRank} by earnings</p>
            <h1 className="text-2xl font-bold">@{miner.githubUsername}</h1>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Earnings" value={formatUsd(miner.usdPerDay)} accent />
        <Metric label="Total Score" value={formatNumber(miner.totalScore)} />
        <Metric label="Merged PRs" value={String(miner.totalMergedPrs ?? '—')} />
        <Metric label="Alpha / day" value={formatNumber(miner.alphaPerDay)} accent />
        <Metric label="TAO / day" value={formatNumber(miner.taoPerDay)} />
        <Metric label="Credibility" value={formatNumber(miner.credibility, 3)} />
        <Metric label="Open PRs" value={String(miner.totalOpenPrs ?? '—')} />
        <Metric label="Eligible Repos" value={String(miner.eligibleRepoCount ?? '—')} />
        <Metric label="Hotkey" value={shortHotkey(miner.hotkey)} />
        <Metric label="Metagraph Rank" value={miner.metagraphRank != null ? `#${miner.metagraphRank}` : '—'} />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="card p-4">
      <p className="text-xs uppercase tracking-wide text-gt-muted">{label}</p>
      <p className={`mt-1 text-lg font-semibold font-mono ${accent ? 'text-cyan-400' : ''}`}>{value}</p>
    </div>
  );
}
