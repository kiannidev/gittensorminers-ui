import { Link } from 'react-router-dom';
import { GitHubAvatar } from '@/components/GitHubAvatar';
import { HoverTooltip, TooltipHeader, TooltipRow } from '@/components/HoverTooltip';
import type { Miner } from '@/types';
import { formatNumber, formatUsd } from '@/utils/format';

const MEDAL_RING: Record<number, string> = {
  1: 'ring-[3px] ring-amber-400 shadow-[0_0_22px_rgba(251,191,36,0.65)]',
  2: 'ring-[3px] ring-slate-300 shadow-[0_0_18px_rgba(203,213,225,0.5)]',
  3: 'ring-[3px] ring-orange-600 shadow-[0_0_18px_rgba(234,88,12,0.5)]',
};

const STAR_BASE = [
  { left: 12, top: 10, size: 'lg' as const },
  { left: 78, top: 8, size: 'md' as const },
  { left: 45, top: 28, size: 'xl' as const },
  { left: 90, top: 35, size: 'md' as const },
  { left: 22, top: 52, size: 'md' as const },
  { left: 65, top: 58, size: 'lg' as const },
  { left: 35, top: 75, size: 'md' as const },
  { left: 85, top: 72, size: 'md' as const },
  { left: 55, top: 88, size: 'sm' as const },
  { left: 8, top: 82, size: 'md' as const },
];

function hashStr(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function starSpot(githubId: string, index: number) {
  const base = STAR_BASE[index % STAR_BASE.length];
  const h = hashStr(githubId);
  const jitterX = (h % 11) - 5;
  const jitterY = ((h >> 4) % 11) - 5;
  return {
    left: Math.min(94, Math.max(6, base.left + jitterX)),
    top: Math.min(92, Math.max(6, base.top + jitterY)),
    size: base.size,
    delay: `${(h % 20) / 10}s`,
    rotate: ((h >> 12) % 17) - 8,
  };
}

export function HeroMinerStars({ miners }: { miners: Array<Miner & { rank: number }> }) {
  if (miners.length === 0) {
    return (
      <div className="flex h-[280px] w-full min-w-[280px] items-center justify-center rounded-2xl border border-dashed border-gt-border/50 bg-gt-bg/30 md:w-[320px] lg:w-[340px]">
        <p className="text-sm text-gt-muted">Loading miners…</p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-[280px] w-full min-w-[280px] md:w-[320px] lg:mx-0 lg:h-[300px] lg:w-[340px]">
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_72%)]" />

      {miners.map((miner, i) => {
        const spot = starSpot(miner.githubId ?? String(i), i);
        const ring =
          miner.rank <= 3
            ? MEDAL_RING[miner.rank]
            : 'ring-2 ring-white/25 hover:ring-white/50';

        const avatarSize =
          miner.rank === 1 ? '2xl' : miner.rank <= 3 ? 'xl' : spot.size;

        return (
          <div
            key={miner.githubId}
            className="absolute z-10 w-fit -translate-x-1/2 -translate-y-1/2 hover:z-[100] focus-within:z-[100]"
            style={{
              left: `${spot.left}%`,
              top: `${spot.top}%`,
            }}
          >
            <HoverTooltip
              side={spot.top < 45 ? 'bottom' : 'top'}
              content={
                <>
                  <TooltipHeader
                    rank={miner.rank <= 3 ? miner.rank : 0}
                    label={`@${miner.githubUsername}`}
                  />
                  <div className="space-y-1">
                    {miner.rank > 3 && <TooltipRow label="Rank" value={`#${miner.rank}`} />}
                    <TooltipRow label="Earnings" value={formatUsd(miner.usdPerDay)} />
                    <TooltipRow label="Score" value={formatNumber(miner.totalScore)} />
                  </div>
                </>
              }
            >
              <Link
                to={`/miners/${miner.githubId}`}
                className={`hero-miner-float inline-flex rounded-full p-1 transition duration-300 hover:scale-110 ${ring}`}
                style={{
                  ['--rot' as string]: `${spot.rotate}deg`,
                  animationDelay: spot.delay,
                }}
              >
                <GitHubAvatar
                  githubId={miner.githubId}
                  username={miner.githubUsername}
                  size={avatarSize}
                  className="border-0"
                />
              </Link>
            </HoverTooltip>
          </div>
        );
      })}
    </div>
  );
}
