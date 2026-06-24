import { useCallback, useEffect, useState } from 'react';
import type { CacheData } from '@/types';
import { subscribeToDataUpdates } from '@/services/socket';

export function useRealtimeData() {
  const [data, setData] = useState<CacheData>({});
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const applyFullData = useCallback((full: CacheData) => {
    setData({
      miners: full.miners,
      repos: full.repos,
      prs: full.prs,
      stats: full.stats,
      prices: full.prices,
      config: full.config,
      repoCommits: full.repoCommits,
    });
    setConnected(true);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToDataUpdates(
      applyFullData,
      ({ syncedAt }) => {
        setLastSyncedAt(syncedAt);
      },
    );

    return unsubscribe;
  }, [applyFullData]);

  return { data, lastSyncedAt, connected };
}
