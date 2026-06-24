import { ReactNode, useId, type CSSProperties } from 'react';

type TooltipSide = 'top' | 'bottom';

interface HoverTooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: TooltipSide;
  className?: string;
  style?: CSSProperties;
}

const sideClass: Record<TooltipSide, string> = {
  top: 'bottom-full left-1/2 mb-3 -translate-x-1/2 group-hover:translate-y-0 translate-y-1',
  bottom: 'top-full left-1/2 mt-3 -translate-x-1/2 group-hover:translate-y-0 -translate-y-1',
};

export function HoverTooltip({ content, children, side = 'top', className = '', style }: HoverTooltipProps) {
  const id = useId();

  return (
    <div className={`group/tooltip relative hover:z-30 ${className}`} style={style}>
      {children}
      <div
        id={id}
        role="tooltip"
        className={`pointer-events-none absolute z-[110] w-max max-w-[240px] rounded-lg border border-gt-border bg-gt-surface/95 px-3 py-2 text-left text-xs shadow-xl shadow-black/40 backdrop-blur-sm transition-all duration-200 ease-out opacity-0 group-hover/tooltip:opacity-100 group-hover/tooltip:delay-150 group-focus-within/tooltip:opacity-100 ${sideClass[side]}`}
      >
        {content}
        <span
          className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border border-gt-border bg-gt-surface/95 ${
            side === 'top' ? '-bottom-1 border-t-0 border-l-0' : '-top-1 border-b-0 border-r-0'
          }`}
        />
      </div>
    </div>
  );
}

const MEDAL_LABEL: Record<number, string> = {
  1: 'Gold',
  2: 'Silver',
  3: 'Bronze',
};

const MEDAL_COLOR: Record<number, string> = {
  1: 'text-amber-400',
  2: 'text-slate-300',
  3: 'text-orange-400',
};

export function TooltipHeader({ rank, label }: { rank: number; label: string }) {
  return (
    <div className="mb-1.5 flex items-center gap-2 border-b border-gt-border/60 pb-1.5">
      {rank > 0 && (
        <span className={`shrink-0 font-bold ${MEDAL_COLOR[rank] ?? 'text-gt-muted'}`}>#{rank}</span>
      )}
      <span className="min-w-0 truncate font-semibold text-gt-text" title={label}>
        {label}
      </span>
      {rank > 0 && (
        <span className={`shrink-0 text-[10px] uppercase tracking-wide ${MEDAL_COLOR[rank]}`}>
          {MEDAL_LABEL[rank]}
        </span>
      )}
    </div>
  );
}

export function TooltipRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-gt-muted">
      <span>{label}</span>
      <span className="font-mono font-medium text-gt-text">{value}</span>
    </div>
  );
}
