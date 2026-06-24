function avatarClass(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'): string {
  if (size === 'xs') return 'h-4 w-4';
  if (size === 'sm') return 'h-6 w-6';
  if (size === 'lg') return 'h-14 w-14';
  if (size === 'xl') return 'h-20 w-20';
  if (size === '2xl') return 'h-28 w-28';
  return 'h-8 w-8';
}

export function githubUserAvatarUrl(githubId?: string, username?: string, pixelSize = 64): string {
  if (githubId) return `https://avatars.githubusercontent.com/u/${githubId}?v=4&s=${pixelSize}`;
  if (username) return `https://github.com/${username}.png?s=${pixelSize}`;
  return '';
}

export function githubOwnerAvatarUrl(owner: string, pixelSize = 64): string {
  return `https://github.com/${owner}.png?s=${pixelSize}`;
}

interface GitHubAvatarProps {
  githubId?: string;
  username?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function GitHubAvatar({ githubId, username, size = 'md', className = '' }: GitHubAvatarProps) {
  const pixelSize =
    size === '2xl' ? 224 : size === 'xl' ? 160 : size === 'lg' ? 112 : 64;
  const src = githubUserAvatarUrl(githubId, username, pixelSize);
  const label = username ? `@${username}` : 'GitHub user';

  if (!src) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full border border-gt-border bg-gt-bg text-xs text-gt-muted ${avatarClass(size)} ${className}`}
      >
        ?
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={label}
      className={`shrink-0 rounded-full border border-gt-border bg-gt-bg object-cover ${avatarClass(size)} ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}

interface RepoAvatarProps {
  fullName?: string;
  owner?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function RepoAvatar({ fullName, owner, size = 'md', className = '' }: RepoAvatarProps) {
  const repoOwner = owner ?? fullName?.split('/')[0] ?? '';
  const pixelSize =
    size === '2xl' ? 224 : size === 'xl' ? 160 : size === 'lg' ? 112 : 64;
  const src = repoOwner ? githubOwnerAvatarUrl(repoOwner, pixelSize) : '';
  const label = fullName ?? repoOwner;

  if (!src) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-md border border-gt-border bg-gt-bg text-xs text-gt-muted ${avatarClass(size)} ${className}`}
      >
        ?
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={label}
      className={`shrink-0 rounded-md border border-gt-border bg-gt-bg object-cover ${avatarClass(size)} ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}
