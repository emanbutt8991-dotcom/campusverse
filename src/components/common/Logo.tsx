export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 40 40" width="32" height="32" aria-hidden>
        <rect width="40" height="40" rx="11" className="fill-uni-primary" />
        <circle cx="20" cy="20" r="6.5" className="fill-uni-onprimary" />
        <ellipse cx="20" cy="20" rx="14" ry="5" fill="none" strokeWidth="2.4" className="stroke-uni-highlight" transform="rotate(-25 20 20)" />
      </svg>
      {!compact && (
        <span className={`font-display text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
          Campus<span className={light ? 'text-white/80' : 'text-uni-ink'}>Verse</span>
        </span>
      )}
    </span>
  );
}

export function PrototypeBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-900 ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
      Interactive Prototype
    </span>
  );
}
