import { Link, useOutletContext, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RepoAvatar } from '@/components/GitHubAvatar';
import { api } from '@/services/api';
import type { CacheData, ProcessedRepo } from '@/types';
import { formatNumber, formatPercent } from '@/utils/format';

export function RepoDetailPage() {
  const { owner, repoName } = useParams<{ owner: string; repoName: string }>();
  const { data } = useOutletContext<{ data: CacheData }>();
  const [repo, setRepo] = useState<ProcessedRepo | null>(null);
  const [loading, setLoading] = useState(true);

  const fullName = owner && repoName ? `${owner}/${repoName}` : '';

  useEffect(() => {
    api
      .getProcessedRepos()
      .then((r) => setRepo(r.repos.find((x) => x.fullName === fullName) ?? null))
      .finally(() => setLoading(false));
  }, [fullName, data.repos]);

  if (loading) {
    return <p className="text-gt-muted">Loading repository…</p>;
  }

  if (!repo) {
    return (
      <div className="card mx-auto max-w-lg p-8 text-center">
        <p className="mb-4 text-gt-muted">Repository not found.</p>
        <Link to="/repositories" className="btn-primary inline-flex">
          <ArrowLeft className="h-4 w-4" />
          All repositories
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link to="/repositories" className="inline-flex items-center gap-2 text-sm text-gt-muted hover:text-gt-text">
        <ArrowLeft className="h-4 w-4" />
        Repositories
      </Link>

      <div className="card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <RepoAvatar fullName={repo.fullName} owner={repo.owner} size="xl" />
            <div>
              <p className="text-sm text-gt-muted">Rank #{repo.rank}</p>
              <h1 className="text-2xl font-bold">{repo.fullName}</h1>
            </div>
          </div>
          <a
            href={`https://github.com/${repo.fullName}`}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost shrink-0"
          >
            <ExternalLink className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Metric label="Emission weight" value={formatPercent(repo.weight)} accent />
        <Metric label="Miner cut" value={formatPercent(repo.minerCut)} />
        <Metric label="Issue discovery" value={formatPercent(repo.issueDiscovery)} />
        <Metric label="Min credibility" value={formatNumber(repo.minCredibility, 2)} />
        <Metric label="Min valid merged PRs" value={repo.minValidMergedPrs ?? '—'} />
        <Metric label="Min token score" value={repo.minTokenScore ?? '—'} />
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
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="card p-4">
      <p className="text-xs uppercase tracking-wide text-gt-muted">{label}</p>
      <p className={`mt-1 text-lg font-semibold font-mono ${accent ? 'text-amber-400' : ''}`}>{value}</p>
    </div>
  );
}
