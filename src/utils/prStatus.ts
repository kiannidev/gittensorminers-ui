export function normalizePrState(state?: string | null): 'merged' | 'open' | 'closed' {
  const s = (state ?? '').toUpperCase();
  if (s === 'MERGED') return 'merged';
  if (s === 'OPEN') return 'open';
  return 'closed';
}

export const PR_STATE_STYLE: Record<
  ReturnType<typeof normalizePrState>,
  { border: string; bg: string; badge: string; label: string }
> = {
  merged: {
    border: 'border-emerald-500/50',
    bg: 'bg-emerald-500/10',
    badge: 'bg-emerald-500/20 text-emerald-300',
    label: 'Merged',
  },
  open: {
    border: 'border-sky-500/50',
    bg: 'bg-sky-500/10',
    badge: 'bg-sky-500/20 text-sky-300',
    label: 'Open',
  },
  closed: {
    border: 'border-rose-500/40',
    bg: 'bg-rose-500/10',
    badge: 'bg-rose-500/20 text-rose-300',
    label: 'Closed',
  },
};

export function prDetailPath(repository?: string, pullRequestNumber?: number): string {
  if (!repository || pullRequestNumber == null) return '/';
  const [owner, name] = repository.split('/');
  if (!owner || !name) return '/';
  return `/prs/${owner}/${name}/${pullRequestNumber}`;
}

export function repoDetailPath(fullName?: string): string {
  if (!fullName) return '/repositories';
  const [owner, name] = fullName.split('/');
  if (!owner || !name) return '/repositories';
  return `/repositories/${owner}/${name}`;
}
