import { MapPin, Trophy } from 'lucide-react';
import type { UniversityConfig } from '../../types/university';
import { buildTokens } from '../../config/themeTokens';
import { CampusScene } from './CampusScene';
import { MascotArt } from './MascotArt';

/** Reusable university identity: campus image (or original illustration), mascot-inspired graphic, colours. */
export function UniversityIdentity({ university: u, variant = 'card' }: { university: UniversityConfig; variant?: 'card' | 'compact' }) {
  const t = buildTokens(u.colours);
  const swatches = [u.colours.primary, u.colours.secondary, u.colours.accent];
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3">
        <MascotArt kind={u.mascot} primary={t.primary} highlight={t.highlight} monogram={u.monogram} size={40} label={`${u.athleticIdentity} inspired graphic`} />
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-900">{u.name}</p>
          <p className="truncate text-xs text-slate-600">{u.athleticIdentity}</p>
        </div>
      </div>
    );
  }
  return (
    <section className="overflow-hidden rounded-3xl border border-uni-border bg-white shadow-card" aria-label={`${u.name} identity`}>
      <div className="relative h-28">
        {u.heroImage ? (
          <img src={u.heroImage} alt={`${u.name} campus`} className="h-full w-full object-cover" />
        ) : (
          <CampusScene style={u.campusStyle} primary={t.primary} highlight={t.highlight} className="h-full w-full" label={`Illustrated ${u.shortName} campus`} />
        )}
        <div className="absolute -bottom-7 left-4 rounded-full bg-white p-1 shadow-card">
          <MascotArt kind={u.mascot} primary={t.primary} highlight={t.highlight} monogram={u.monogram} size={56} label={`${u.athleticIdentity} inspired graphic`} />
        </div>
      </div>
      <div className="px-4 pb-4 pt-9">
        <h2 className="font-display text-lg font-bold leading-tight text-slate-900">{u.name}</h2>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
          <MapPin size={14} aria-hidden /> {u.city}
          {u.province ? `, ${u.province}` : ''}
        </p>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
          <Trophy size={14} aria-hidden /> {u.athleticIdentity}
        </p>
        <p className="mt-3 text-sm text-slate-700">{u.campusDescription}</p>
        <div className="mt-3 flex items-center gap-1.5" aria-label="Theme colours">
          {swatches.map((c) => (
            <span key={c} className="h-5 w-5 rounded-full ring-1 ring-black/10" style={{ background: c }} title={c} />
          ))}
          <span className="ml-1 text-xs text-slate-500">{u.vibe}</span>
        </div>
        <p className="mt-3 text-[11px] leading-snug text-slate-500">Original illustration — not an official logo or mascot.</p>
      </div>
    </section>
  );
}
