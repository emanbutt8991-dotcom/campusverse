import type { CSSProperties } from 'react';
import { Check, MapPin } from 'lucide-react';
import type { UniversityConfig } from '../../types/university';
import { buildTokens } from '../../config/themeTokens';
import { CampusScene } from './CampusScene';
import { MascotArt } from './MascotArt';

interface Props {
  university: UniversityConfig;
  selected: boolean;
  onSelect: () => void;
}

export function UniversityCard({ university: u, selected, onSelect }: Props) {
  const t = buildTokens(u.colours);
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Select ${u.name}, ${u.city}`}
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white text-left shadow-card ring-1 transition duration-200 hover:-translate-y-1 hover:shadow-lift focus-visible:-translate-y-1 ${
        selected ? 'ring-[3px]' : 'ring-black/5'
      }`}
      style={selected ? ({ '--tw-ring-color': u.colours.primary } as CSSProperties) : undefined}
    >
      <div className="relative h-28 overflow-hidden">
        <CampusScene style={u.campusStyle} primary={t.primary} highlight={t.highlight} className="h-full w-full transition duration-500 group-hover:scale-105" label={`Illustrated ${u.shortName} campus`} />
        <div className="absolute right-3 top-3">
          <MascotArt kind={u.mascot} primary={t.primary} highlight={t.highlight} monogram={u.monogram} size={44} label={`${u.athleticIdentity} inspired graphic`} />
        </div>
        {selected && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold shadow" style={{ color: t.ink }}>
            <Check size={14} aria-hidden /> Selected
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-[17px] font-bold leading-tight text-slate-900">{u.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
          <MapPin size={14} aria-hidden /> {u.city}, {u.province}
        </p>
        <div className="mt-3 flex items-center gap-1.5">
          {[u.colours.primary, u.colours.secondary, u.colours.accent].map((c, i) => (
            <span key={i} className="h-4 w-4 rounded-full ring-1 ring-black/10" style={{ background: c }} />
          ))}
          <span className="ml-1 truncate text-xs text-slate-500">{u.athleticIdentity}</span>
        </div>
        <span
          className="mt-4 inline-flex h-10 items-center justify-center rounded-xl text-sm font-semibold transition"
          style={selected ? { background: t.primary, color: t.onPrimary } : { background: t.soft, color: t.ink }}
        >
          {selected ? 'Selected' : 'Select University'}
        </span>
      </div>
    </button>
  );
}
