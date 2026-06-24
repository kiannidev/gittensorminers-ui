import { io, Socket } from 'socket.io-client';
import type { CacheData } from '@/types';

const WS_URL =
  import.meta.env.VITE_WS_URL ||
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' ? window.location.origin : '');

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(WS_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });
  }
  return socket;
}

export function subscribeToDataUpdates(
  onFull: (data: CacheData) => void,
  onUpdated: (payload: { keys: string[]; syncedAt: string }) => void,
): () => void {
  const s = getSocket();

  const handleFull = (data: CacheData) => onFull(data);
  const handleUpdated = (payload: { keys: string[]; syncedAt: string }) => onUpdated(payload);

  s.on('data:full', handleFull);
  s.on('data:updated', handleUpdated);
  s.emit('request:full');

  return () => {
    s.off('data:full', handleFull);
    s.off('data:updated', handleUpdated);
  };
}
