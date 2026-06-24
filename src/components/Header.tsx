import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Loader2, Search } from 'lucide-react';
import { api, SearchResults } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import type { Prices } from '@/types';
import { formatPrice } from '@/utils/format';
import { GitHubAvatar, RepoAvatar } from '@/components/GitHubAvatar';

interface HeaderProps {
  prices?: Prices;
}

export function Header({ prices }: HeaderProps) {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const data = await api.search(query.trim());
        setResults(data);
        setOpen(true);
      } catch {
        setResults(null);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const taoPrice = prices?.tao?.data?.price;
  const alphaPrice = prices?.alpha?.data?.price;

  return (
    <header className="sticky top-0 z-50 border-b border-gt-border bg-gt-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 lg:gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src="/logo.svg" alt="Gittensor" className="h-9 w-9" />
          <span className="hidden font-semibold tracking-tight sm:inline">Gittensor Miners</span>
        </Link>

        <div ref={searchRef} className="relative min-w-[180px] flex-1 lg:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gt-muted" />
          <input
            type="search"
            placeholder="Global search miners, repos, PRs…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results && setOpen(true)}
            className="w-full rounded-lg border border-gt-border bg-gt-surface py-2 pl-9 pr-9 text-sm outline-none ring-gt-accent focus:ring-1"
          />
          {searching && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-gt-muted" />
          )}

          {open && results && query.trim() && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-auto rounded-xl border border-gt-border bg-gt-surface shadow-xl">
              {results.miners.length === 0 &&
              results.repos.length === 0 &&
              results.prs.length === 0 ? (
                <p className="p-4 text-sm text-gt-muted">No results found</p>
              ) : (
                <div className="divide-y divide-gt-border p-2">
                  {results.miners.length > 0 && (
                    <section className="p-2">
                      <p className="mb-1 text-xs uppercase tracking-wide text-gt-muted">Miners</p>
                      {results.miners.map((m) => (
                        <Link
                          key={m.githubId}
                          to={`/miners/${m.githubId}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-gt-bg"
                        >
                          <GitHubAvatar githubId={m.githubId} username={m.githubUsername} size="sm" />
                          @{m.githubUsername}
                        </Link>
                      ))}
                    </section>
                  )}
                  {results.repos.length > 0 && (
                    <section className="p-2">
                      <p className="mb-1 text-xs uppercase tracking-wide text-gt-muted">Repos</p>
                      {results.repos.map((r) => (
                        <Link
                          key={r.fullName}
                          to="/repositories"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-gt-bg"
                        >
                          <RepoAvatar fullName={r.fullName} size="sm" />
                          {r.fullName}
                        </Link>
                      ))}
                    </section>
                  )}
                  {results.prs.length > 0 && (
                    <section className="p-2">
                      <p className="mb-1 text-xs uppercase tracking-wide text-gt-muted">PRs</p>
                      {results.prs.map((p, i) => (
                        <div key={`${p.repository}-${p.pullRequestNumber}-${i}`} className="px-2 py-1.5 text-sm">
                          <span className="text-gt-muted">{p.repository}</span> — {p.pullRequestTitle}
                        </div>
                      ))}
                    </section>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-3 text-xs sm:text-sm">
          <div className="hidden rounded-lg border border-gt-border bg-gt-surface px-3 py-1.5 md:block">
            <span className="text-gt-muted">TAO</span>{' '}
            <span className="font-mono font-medium text-emerald-400">{formatPrice(taoPrice)}</span>
          </div>
          <div className="hidden rounded-lg border border-gt-border bg-gt-surface px-3 py-1.5 md:block">
            <span className="text-gt-muted">Alpha</span>{' '}
            <span className="font-mono font-medium text-cyan-400">{formatPrice(alphaPrice)}</span>
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <img src={user.avatarUrl} alt="" className="h-8 w-8 rounded-full border border-gt-border" />
              <button type="button" onClick={() => logout()} className="btn-ghost hidden sm:inline-flex">
                Logout
              </button>
            </div>
          ) : (
            <a href={api.loginUrl()} className="btn-primary">
              <Github className="h-4 w-4" />
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
