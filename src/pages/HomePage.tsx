import { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Flame, FolderGit2, GitMerge, GitPullRequest, LayoutDashboard, Pickaxe, Sparkles, Trophy, Zap } from 'lucide-react';
import { GitHubAvatar, RepoAvatar } from '@/components/GitHubAvatar';
import { HeroMinerStars } from '@/components/HeroMinerStars';
import { HoverTooltip, TooltipHeader, TooltipRow } from '@/components/HoverTooltip';
import type { CacheData, PullRequest } from '@/types';
import { getRecentPrs, getTopHotRepos, getTopMiners } from '@/utils/dashboardData';
import { formatNumber, formatUsd } from '@/utils/format';
import { normalizePrState, prDetailPath, PR_STATE_STYLE, repoDetailPath } from '@/utils/prStatus';
const RANK_STYLES: Record<number, string> = {
  1: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
  2: 'bg-slate-300/15 text-slate-200 border-slate-300/30',
  3: 'bg-orange-700/20 text-orange-300 border-orange-600/30',
  4: 'bg-violet-500/15 text-violet-300 border-violet-400/30',
  5: 'bg-gt-border/40 text-gt-muted border-gt-border/60',
  6: 'bg-gt-border/30 text-gt-muted/80 border-gt-border/50',
};

const SNAPSHOT_ROW =
  'flex h-[54px] min-w-0 items-center gap-2.5 rounded-xl border border-gt-border/60 px-3 transition overflow-hidden';

const SNAPSHOT_RANK =
  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold';

const SNAPSHOT_TITLE = 'truncate text-sm font-semibold leading-4';
const SNAPSHOT_META = 'mt-0.5 truncate font-mono text-xs leading-4';

export function HomePage() {
  const { data: liveData, lastSyncedAt } = useOutletContext<{
    data: CacheData;
    lastSyncedAt: string | null;
  }>();

  const top10Miners = useMemo(() => getTopMiners(liveData, 10), [liveData, lastSyncedAt]);
  const topMiners = useMemo(() => getTopMiners(liveData, 6), [liveData, lastSyncedAt]);
  const recentPrs = useMemo(() => getRecentPrs(liveData, 6), [liveData, lastSyncedAt]);
  const topHotRepos = useMemo(() => getTopHotRepos(liveData, 6), [liveData, lastSyncedAt]);

  const minerCount = liveData.miners?.length ?? 0;
  const repoCount = Array.isArray(liveData.repos) ? liveData.repos.length : 0;

  return (
    <div className="space-y-12">
      <section className="hero-shell card relative overflow-visible px-7 py-8 md:px-11 md:py-10 lg:px-14 lg:py-12">
        <div className="hero-grid-bg pointer-events-none absolute inset-0 rounded-xl opacity-40" />
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gt-accent/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_340px] lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <p className="hero-badge inline-flex items-center gap-2 rounded-full border border-gt-accent2/40 bg-gt-accent2/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gt-accent2">
                <Trophy className="h-3.5 w-3.5" />
                Bittensor Subnet 74
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Live data
              </span>
            </div>

            <h1 className="mb-3 text-3xl font-bold leading-[1.08] md:text-[2.65rem] lg:text-5xl">
              <span className="hero-title-line text-gradient-hero">Gittensor</span>
              <span className="hero-title-line text-gradient-gold">Miners</span>
            </h1>

            <p className="hero-tagline mb-3 max-w-xl text-lg text-gt-text/95 md:text-xl">
              Merge code.{' '}
              <span className="text-gradient-gold">Mint rewards.</span>{' '}
              <span className="text-gradient-cyan">Own the leaderboard.</span>
            </p>

            <p className="mb-5 max-w-xl text-sm leading-relaxed text-gt-muted md:text-base">
              The command center for open-source mining on Bittensor — live rankings, whitelisted
              repos, and every merged PR that moves the needle.
            </p>

            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <HeroStatPill
                icon={<Pickaxe className="h-3.5 w-3.5 text-cyan-400" />}
                value={minerCount > 0 ? String(minerCount) : '—'}
                label="miners live"
              />
              <HeroStatPill
                icon={<FolderGit2 className="h-3.5 w-3.5 text-amber-400" />}
                value={repoCount > 0 ? String(repoCount) : '—'}
                label="whitelisted repos"
              />
              <HeroStatPill
                icon={<Zap className="h-3.5 w-3.5 text-emerald-400" />}
                value="Quality"
                label="over quantity"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link to="/miners" className="hero-cta-primary px-5 py-2.5">
                <Pickaxe className="h-4 w-4" />
                Explore Miners
              </Link>
              <Link to="/repositories" className="hero-cta-ghost px-5 py-2.5">
                Browse Repositories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs text-gt-muted/80">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-gt-accent2" />
              Streaming from the{' '}
              <a
                href="https://api.gittensor.io/swagger#/"
                className="text-gt-accent transition hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Gittensor API
              </a>
            </p>
          </div>

          <HeroMinerStars miners={top10Miners} />
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gt-accent2">
            Live snapshot
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            Subnet activity right now
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-gt-muted">
            Top earners, latest pull requests, and the hottest repos — updated in real time.
          </p>
        </div>

        <div className="grid min-w-0 gap-6 lg:grid-cols-3 lg:items-stretch">
          <Panel title="Top Miners" subtitle="By daily earnings" icon={<Pickaxe className="h-5 w-5 text-gt-accent" />}>
            <div className="flex h-full flex-col">
              <div className="flex-1 space-y-2">
                {topMiners.map((m) => (
                  <Link
                    key={m.githubId}
                    to={`/miners/${m.githubId}`}
                    className={`${SNAPSHOT_ROW} hover:border-gt-accent/40 hover:bg-gt-bg/60`}
                  >
                    <span className={`${SNAPSHOT_RANK} ${RANK_STYLES[m.rank]}`}>
                      {m.rank}
                    </span>
                    <GitHubAvatar githubId={m.githubId} username={m.githubUsername} size="sm" className="shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className={SNAPSHOT_TITLE}>@{m.githubUsername}</p>
                      <p className={`${SNAPSHOT_META} text-emerald-400`}>{formatUsd(m.usdPerDay)}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link to="/miners" className="mt-4 inline-flex items-center gap-1 text-sm text-gt-accent hover:underline">
                View all miners <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Panel>

          <Panel title="Recent PRs" subtitle="Latest activity" icon={<GitPullRequest className="h-5 w-5 text-emerald-400" />}>
            <div className="flex h-full flex-col">
              <div className="flex-1 space-y-2">
                {recentPrs.map((pr, i) => (
                  <RecentPrRow key={`${pr.repository}-${pr.pullRequestNumber}-${i}`} pr={pr} />
                ))}
              </div>
              <span className="mt-4 inline-flex h-5 items-center gap-1 text-sm invisible" aria-hidden>
                spacer <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Panel>

          <Panel title="Hot Repos" subtitle="Most active this week" icon={<Flame className="h-5 w-5 text-orange-400" />}>
            <div className="flex h-full flex-col">
              <div className="flex-1 space-y-2">
                {topHotRepos.map((r) => (
                  <Link
                    key={r.fullName}
                    to={repoDetailPath(r.fullName)}
                    className={`${SNAPSHOT_ROW} hover:border-orange-400/40 hover:bg-gt-bg/60`}
                  >
                    <span className={`${SNAPSHOT_RANK} ${RANK_STYLES[r.rank]}`}>
                      {r.rank}
                    </span>
                    <RepoAvatar fullName={r.fullName} size="sm" className="shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className={SNAPSHOT_TITLE} title={r.fullName}>
                        {r.fullName}
                      </p>
                      <p className={`${SNAPSHOT_META} text-orange-400`}>
                        {formatNumber(r.commits, 0)} commits · {formatNumber(r.linesChanged, 0)} lines
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link to="/repositories" className="mt-4 inline-flex items-center gap-1 text-sm text-gt-accent hover:underline">
                Browse repositories <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Panel>
        </div>
      </section>

      <section className="relative border-t border-gt-border/60 pt-12">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gt-accent2">
            How it works
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            Three steps to start earning
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-gt-muted">
            From picking a repo to tracking your rank — everything you need to mine on subnet 74.
          </p>
        </div>

        <div className="relative grid gap-5 md:grid-cols-3 md:gap-6">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-[52px] hidden h-px md:block"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(34,211,238,0.35) 15%, rgba(52,211,153,0.35) 50%, rgba(167,139,250,0.35) 85%, transparent)',
            }}
          />

          <UsageCard
            step="1"
            title="Pick a repository"
            description="Browse weights, eligibility rules, and activity on whitelisted repos."
            to="/repositories"
            icon={FolderGit2}
            accent="cyan"
          />
          <UsageCard
            step="2"
            title="Contribute & merge PRs"
            description="Ship meaningful merged pull requests — quality beats quantity every time."
            to="https://docs.gittensor.io/miner.html"
            external
            icon={GitMerge}
            accent="emerald"
          />
          <UsageCard
            step="3"
            title="Track your rank"
            description="Sign in with GitHub to open My Board and watch your score climb."
            to="/my-board"
            icon={LayoutDashboard}
            accent="violet"
          />
        </div>
      </section>
    </div>
  );
}

function HeroStatPill({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="hero-stat-pill inline-flex items-center gap-2 rounded-lg border border-gt-border/70 bg-gt-bg/50 px-3 py-2 backdrop-blur-sm">
      {icon}
      <div className="leading-tight">
        <span className="block font-mono text-sm font-semibold text-gt-text">{value}</span>
        <span className="block text-[10px] uppercase tracking-wide text-gt-muted">{label}</span>
      </div>
    </div>
  );
}

function RecentPrRow({ pr }: { pr: PullRequest }) {
  const state = normalizePrState(pr.prState);
  const style = PR_STATE_STYLE[state];

  return (
    <HoverTooltip
      className="block w-full min-w-0"
      side="bottom"
      content={
        <>
          <TooltipHeader rank={0} label={pr.pullRequestTitle ?? 'Pull Request'} />
          <div className="space-y-1">
            <TooltipRow label="Repo" value={pr.repository ?? '—'} />
            <TooltipRow label="Author" value={`@${pr.author}`} />
            <TooltipRow label="Status" value={style.label} />
            <TooltipRow label="Token score" value={formatNumber(Number(pr.tokenScore))} />
          </div>
        </>
      }
    >
      <Link
        to={prDetailPath(pr.repository, pr.pullRequestNumber)}
        className={`${SNAPSHOT_ROW} border-2 hover:brightness-110 ${style.border} ${style.bg}`}
      >
        <GitHubAvatar githubId={pr.githubId} username={pr.author} size="sm" className="shrink-0" />
        <div className="min-w-0 flex-1">
          <p className={SNAPSHOT_TITLE} title={pr.pullRequestTitle}>
            {pr.pullRequestTitle}
          </p>
          <div className="mt-0.5 flex min-w-0 items-center gap-2 leading-4">
            <p className={`min-w-0 flex-1 truncate text-xs text-gt-muted`} title={pr.repository}>
              {pr.repository}
            </p>
            <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase leading-none ${style.badge}`}>
              {style.label}
            </span>
          </div>
        </div>
      </Link>
    </HoverTooltip>
  );
}

type UsageAccent = 'cyan' | 'emerald' | 'violet';

const USAGE_ACCENT: Record<
  UsageAccent,
  {
    iconRing: string;
    iconBg: string;
    iconColor: string;
    stepBadge: string;
    hoverBorder: string;
    hoverGlow: string;
    gradient: string;
    cta: string;
  }
> = {
  cyan: {
    iconRing: 'ring-cyan-400/40',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
    stepBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    hoverBorder: 'hover:border-cyan-400/35',
    hoverGlow: 'hover:shadow-cyan-500/10',
    gradient: 'from-cyan-500/12 via-transparent to-transparent',
    cta: 'text-cyan-400',
  },
  emerald: {
    iconRing: 'ring-emerald-400/40',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    stepBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    hoverBorder: 'hover:border-emerald-400/35',
    hoverGlow: 'hover:shadow-emerald-500/10',
    gradient: 'from-emerald-500/12 via-transparent to-transparent',
    cta: 'text-emerald-400',
  },
  violet: {
    iconRing: 'ring-violet-400/40',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-400',
    stepBadge: 'bg-violet-500/20 text-violet-300 border-violet-400/30',
    hoverBorder: 'hover:border-violet-400/35',
    hoverGlow: 'hover:shadow-violet-500/10',
    gradient: 'from-violet-500/12 via-transparent to-transparent',
    cta: 'text-violet-400',
  },
};

function UsageCard({
  step,
  title,
  description,
  to,
  external,
  icon: Icon,
  accent,
}: {
  step: string;
  title: string;
  description: string;
  to: string;
  external?: boolean;
  icon: typeof FolderGit2;
  accent: UsageAccent;
}) {
  const styles = USAGE_ACCENT[accent];
  const className = `usage-step-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gt-border/70 bg-gt-surface/60 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-gt-surface/90 hover:shadow-xl ${styles.hoverBorder} ${styles.hoverGlow}`;

  const inner = (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80 ${styles.gradient}`}
      />

      <div className="relative mb-5 flex items-start justify-between">
        <div className="relative">
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-full ring-2 ${styles.iconRing} ${styles.iconBg}`}
          >
            <Icon className={`h-6 w-6 ${styles.iconColor}`} strokeWidth={1.75} />
          </span>
          <span
            className={`absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-bold ${styles.stepBadge}`}
          >
            {step}
          </span>
        </div>
        <ArrowUpRight
          className={`h-4 w-4 shrink-0 opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 ${styles.cta}`}
        />
      </div>

      <h3 className="relative mb-2 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="relative flex-1 text-sm leading-relaxed text-gt-muted">{description}</p>

      <span className={`relative mt-5 inline-flex items-center gap-1 text-xs font-medium ${styles.cta}`}>
        {external ? 'Read the guide' : 'Get started'}
        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to} className={className}>
      {inner}
    </Link>
  );
}

function Panel({ title, subtitle, icon, children }: { title: string; subtitle: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="card flex h-full min-w-0 flex-col overflow-visible p-5">
      <div className="mb-4 shrink-0">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <p className="mt-0.5 pl-7 text-xs text-gt-muted">{subtitle}</p>
      </div>
      <div className="min-w-0 flex-1 overflow-visible">{children}</div>
    </section>
  );
}