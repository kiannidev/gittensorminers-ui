import { Link, useOutletContext, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, GitPullRequest } from 'lucide-react';
import { GitHubAvatar, RepoAvatar } from '@/components/GitHubAvatar';
import type { CacheData, PullRequest } from '@/types';
import { formatDate, formatNumber } from '@/utils/format';
import { normalizePrState, PR_STATE_STYLE, repoDetailPath } from '@/utils/prStatus';

export function PrDetailPage() {
  const { owner, repoName, prNumber } = useParams<{ owner: string; repoName: string; prNumber: string }>();
  const { data } = useOutletContext<{ data: CacheData }>();

  const fullRepo = owner && repoName ? `${owner}/${repoName}` : '';
  const num = prNumber ? parseInt(prNumber, 10) : NaN;

  const pr = (data.prs ?? []).find(
    (p: PullRequest) => p.repository === fullRepo && p.pullRequestNumber === num,
  );

  if (!pr) {
    return (
      <div className="card mx-auto max-w-lg p-8 text-center">
        <p className="mb-4 text-gt-muted">Pull request not found.</p>
        <Link to="/" className="btn-primary inline-flex">
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </div>
    );
  }

  const state = normalizePrState(pr.prState);
  const style = PR_STATE_STYLE[state];
  const ghUrl = `https://github.com/${fullRepo}/pull/${pr.pullRequestNumber}`;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-gt-muted hover:text-gt-text">
        <ArrowLeft className="h-4 w-4" />
        Home
      </Link>

      <div className={`card border-2 p-6 ${style.border} ${style.bg}`}>
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <GitPullRequest className="mt-1 h-6 w-6 shrink-0 text-gt-muted" />
            <div>
              <span className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${style.badge}`}>
                {style.label}
              </span>
              <h1 className="text-xl font-bold leading-snug">{pr.pullRequestTitle}</h1>
              <p className="mt-1 font-mono text-sm text-gt-muted">
                {fullRepo} #{pr.pullRequestNumber}
              </p>
            </div>
          </div>
          <a href={ghUrl} target="_blank" rel="noreferrer" className="btn-ghost shrink-0">
            <ExternalLink className="h-4 w-4" />
            GitHub
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-gt-border/40 pt-4">
          <Link
            to={pr.githubId ? `/miners/${pr.githubId}` : '#'}
            className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-gt-bg/50"
          >
            <GitHubAvatar githubId={pr.githubId} username={pr.author} size="md" />
            <span className="font-medium">@{pr.author}</span>
          </Link>
          <Link
            to={repoDetailPath(fullRepo)}
            className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-gt-bg/50"
          >
            <RepoAvatar fullName={fullRepo} size="sm" />
            <span className="text-sm text-gt-muted">{fullRepo}</span>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Metric label="Token score" value={formatNumber(Number(pr.tokenScore))} />
        <Metric label="Score" value={formatNumber(Number(pr.score))} />
        <Metric label="Additions" value={String(pr.additions ?? '—')} />
        <Metric label="Deletions" value={String(pr.deletions ?? '—')} />
        <Metric label="Created" value={formatDate(pr.prCreatedAt)} />
        <Metric label="Merged" value={formatDate(pr.mergedAt)} />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-4">
      <p className="text-xs uppercase tracking-wide text-gt-muted">{label}</p>
      <p className="mt-1 font-mono text-lg font-semibold">{value}</p>
    </div>
  );
}
