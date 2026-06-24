export function formatPercent(value: number | null | undefined, digits = 1): string {
  if (value == null) return '—';
  return `${(value * 100).toFixed(digits)}%`;
}

export function formatNumber(value: number | null | undefined, digits = 2): string {
  if (value == null) return '—';
  return value.toLocaleString(undefined, { maximumFractionDigits: digits });
}

export function formatUsd(value: number | null | undefined): string {
  if (value == null) return '—';
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/day`;
}

export function formatPrice(value: number | null | undefined): string {
  if (value == null) return '—';
  if (value >= 1) return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${value.toFixed(6)}`;
}

export function formatDate(value?: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleString();
}

export function shortHotkey(hotkey?: string): string {
  if (!hotkey) return '—';
  return `${hotkey.slice(0, 6)}…${hotkey.slice(-4)}`;
}
