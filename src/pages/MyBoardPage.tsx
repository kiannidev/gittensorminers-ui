import { useEffect, useState } from 'react';
import { Github, Loader2 } from 'lucide-react';
import { api } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import type { Miner, PullRequest } from '@/types';
import { formatDate, formatNumber } from '@/utils/format';

export function MyBoardPage() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [miner, setMiner] = useState<Miner | null>(null);
  const [prs, setPrs] = useState<PullRequest[]>([]);
  const [rank, setRank] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    api
      .getMyBoard()
      .then((data) => {
        setMiner(data.miner);
        setPrs(data.prs);
        setRank(data.rank);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load board'))
      .finally(() => setLoading(false));
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-gt-muted">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading your board…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="card mx-auto max-w-lg p-8 text-center">
        <h1 className="mb-2 text-xl font-bold">My Board</h1>
        <p className="mb-6 text-gt-muted">Login with GitHub to view your miner dashboard.</p>
        <a href={api.loginUrl()} className="btn-primary">
          <Github className="h-4 w-4" />
          Login with GitHub
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <img src={user.avatarUrl} alt="" className="h-16 w-16 rounded-full border border-gt-border" />
        <div>
          <h1 className="text-2xl font-bold">{user.displayName}</h1>
          <p className="text-gt-muted">@{user.username}</p>
        </div>
      </div>

      {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}

      {!miner ? (
        <div className="card p-6">
          <p className="text-gt-muted">
            No active miner profile found for your GitHub account. Register on subnet 74 and post
            your PAT via the{' '}
            <a href="https://docs.gittensor.io/miner.html" className="text-gt-accent hover:underline" target="_blank" rel="noreferrer">
              Gittensor CLI
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Rank" value={rank != null ? `#${rank}` : `#${miner.metagraphRank ?? '—'}`} />
          <Metric label="Total Score" value={formatNumber(miner.totalScore)} />
          <Metric label="Merged PRs" value={String(miner.totalMergedPrs ?? '—')} />
          <Metric label="Alpha / day" value={formatNumber(miner.alphaPerDay)} accent />
          <Metric label="Credibility" value={formatNumber(miner.credibility, 3)} />
          <Metric label="Open PRs" value={String(miner.totalOpenPrs ?? '—')} />
          <Metric label="Eligible Repos" value={String(miner.eligibleRepoCount ?? '—')} />
          <Metric label="USD / day" value={formatNumber(miner.usdPerDay)} accent />
        </div>
      )}

      <section className="card p-5">
        <h2 className="mb-4 text-lg font-semibold">Your Pull Requests</h2>
        {prs.length === 0 ? (
          <p className="text-sm text-gt-muted">No pull requests found yet.</p>
        ) : (
          <div className="space-y-2">
            {prs.slice(0, 20).map((pr, i) => (
              <div
                key={`${pr.repository}-${pr.pullRequestNumber}-${i}`}
                className="flex flex-col gap-1 rounded-lg border border-gt-border/60 px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{pr.pullRequestTitle}</p>
                  <p className="text-xs text-gt-muted">{pr.repository}</p>
                </div>
                <div className="text-xs text-gt-muted">
                  {pr.prState} · score {pr.tokenScore ?? pr.score ?? '—'} · {formatDate(pr.mergedAt ?? pr.prCreatedAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
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
      <p className={`mt-1 text-xl font-semibold font-mono ${accent ? 'text-cyan-400' : ''}`}>{value}</p>
    </div>
  );
}
