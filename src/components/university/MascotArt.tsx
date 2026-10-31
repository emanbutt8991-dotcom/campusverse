import type { MascotKind } from '../../types/university';

interface Props {
  kind: MascotKind;
  primary: string;
  highlight: string;
  monogram?: string;
  size?: number;
  className?: string;
  label?: string;
}

/**
 * Original, non-official athletic-identity illustrations.
 * They are intentionally generic "inspired-by" graphics and are not university logos or mascot artwork.
 */
export function MascotArt({ kind, primary, highlight, monogram = 'U', size = 64, className = '', label }: Props) {
  const p = primary;
  const h = highlight;
  const w = '#ffffff';
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} role="img" aria-label={label ?? `${kind} inspired illustration`}>
      <circle cx="50" cy="50" r="48" fill={p} />
      <circle cx="50" cy="50" r="43" fill="none" stroke={h} strokeWidth="2.5" strokeDasharray={kind === 'gael' ? '4 3' : undefined} />
      {ART[kind](p, h, w, monogram)}
    </svg>
  );
}

type Draw = (p: string, h: string, w: string, m: string) => JSX.Element;

const ART: Record<MascotKind, Draw> = {
  // Helmeted warrior silhouette with plume (Marauders-inspired)
  marauder: (p, h, w) => (
    <g>
      <path d="M50 20c-14 0-24 11-24 26v18c0 4 3 7 7 7h34c4 0 7-3 7-7V46c0-15-10-26-24-26z" fill={w} />
      <path d="M50 12c8 2 14 8 16 16-6-4-11-5-16-5" fill={h} />
      <rect x="34" y="44" width="32" height="6" rx="3" fill={p} />
      <rect x="47" y="44" width="6" height="22" rx="2" fill={p} />
      <path d="M30 71h40l-4 9H34z" fill={h} />
    </g>
  ),
  // Collegiate tower with chevrons (Varsity Blues-inspired campus graphic)
  varsity: (p, h, w) => (
    <g>
      <path d="M38 78V40l12-14 12 14v38z" fill={w} />
      <rect x="45" y="46" width="10" height="12" rx="5" fill={p} />
      <path d="M30 78h40" stroke={w} strokeWidth="4" strokeLinecap="round" />
      <path d="M26 30l8 10 8-10M58 30l8 10 8-10" stroke={h === '#ffffff' ? w : h} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="47" y="64" width="6" height="14" fill={p} />
    </g>
  ),
  // Shield with gear teeth (Warriors-inspired, engineering accents)
  warrior: (p, h, w) => (
    <g>
      <g fill={h}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="47" y="14" width="6" height="9" rx="1.5" transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="27" fill={h} />
      <path d="M50 30l16 6v12c0 11-7 19-16 23-9-4-16-12-16-23V36z" fill={p} />
      <path d="M50 36v30M42 44l8 6 8-6" stroke={w} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  // Hawk head profile with hooked beak (Golden Hawks-inspired)
  hawk: (p, h, w) => (
    <g>
      <path d="M26 66c2-20 14-36 34-38 8-1 15 3 18 9l-10 3c4 2 6 6 6 10H62c-6 0-10 4-12 10l-6 14c-7-1-13-4-18-8z" fill={h} />
      <path d="M68 40l10-3-4 12z" fill={w} />
      <circle cx="61" cy="40" r="3.5" fill={p} />
      <path d="M34 60c6-4 12-6 18-5" stroke={p} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  // Swooping martlet-style bird (Redbirds/Martlets-inspired)
  martlet: (p, h, w) => (
    <g>
      <path d="M18 54c14-2 22-10 28-20 3 9 9 14 18 16 7 1 13-2 18-6-3 12-13 20-26 21l-10 12-2-12c-10-1-19-5-26-11z" fill={w} />
      <circle cx="66" cy="47" r="2.6" fill={p} />
      <path d="M28 56c8 1 15-2 20-7" stroke={h === '#ffffff' ? p : h} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  // Geometric spread-wing bird with lightning (Thunderbird-inspired)
  thunderbird: (p, h, w) => (
    <g>
      <path d="M50 28l6 10 22-8-10 16 14 2-20 8-12 18-12-18-20-8 14-2-10-16 22 8z" fill={w} />
      <path d="M53 40l-8 12h7l-5 12 11-15h-7l4-9z" fill={h === '#ffffff' ? '#00A7E1' : h} />
      <circle cx="50" cy="31" r="2.5" fill={p} />
    </g>
  ),
  // Lion head with mane (Lions-inspired)
  lion: (p, h, w) => (
    <g>
      <g fill={h === '#ffffff' ? w : h}>
        {Array.from({ length: 14 }).map((_, i) => (
          <ellipse key={i} cx="50" cy="24" rx="6" ry="10" transform={`rotate(${i * (360 / 14)} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="52" r="20" fill={w} />
      <circle cx="43" cy="48" r="2.6" fill={p} />
      <circle cx="57" cy="48" r="2.6" fill={p} />
      <path d="M45 57h10l-5 5z" fill={p} />
      <path d="M50 62v4M44 67c3 3 9 3 12 0" stroke={p} strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </g>
  ),
  // Energy bolt over an urban skyline (Bold-inspired)
  bold: (p, h, w) => (
    <g>
      <path d="M22 76V58h8v-8h8v26M62 76V52h6v-6h6v30" fill={w} opacity=".55" />
      <path d="M56 18L34 54h14l-6 28 24-38H52z" fill={h} />
      <path d="M20 76h60" stroke={w} strokeWidth="4" strokeLinecap="round" />
      <circle cx="74" cy="30" r="5" fill="none" stroke={w} strokeWidth="2.5" />
      <path d="M17 34c5-1 9 1 12 4" stroke={w} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="50" r="0.1" fill={p} />
    </g>
  ),
  // Horse head profile with mane (Mustangs-inspired)
  mustang: (p, h, w) => (
    <g>
      <path d="M36 80c-2-14 0-24 6-32l-4-14 9 7c6-3 12-3 18 1l10 14c2 3 1 7-3 7l-6-1c-3 0-5 2-6 5l-4 13z" fill={w} />
      <path d="M44 38c-6 4-10 12-10 22l-6 6c2-14 6-24 16-28z" fill={h === '#ffffff' ? '#C9B6E4' : h} />
      <circle cx="60" cy="47" r="2.6" fill={p} />
      <circle cx="70" cy="60" r="1.6" fill={p} />
    </g>
  ),
  // Celtic-knot crest on tartan (Gaels-inspired collegiate graphic)
  gael: (p, h, w) => (
    <g>
      <path d="M50 20l24 8v18c0 16-10 27-24 34-14-7-24-18-24-34V28z" fill={w} />
      <path d="M38 36h24M38 46h24M38 56h24M44 30v38M56 30v38" stroke={h} strokeWidth="3" opacity=".6" />
      <path d="M50 38c6 0 9 4 9 8s-3 8-9 8-9-4-9-8 3-8 9-8z" fill="none" stroke={p} strokeWidth="4" />
      <path d="M41 46c-5 0-8 3-8 6M59 46c5 0 8 3 8 6" stroke={p} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  // Badger face with signature stripe (Badgers-inspired)
  badger: (p, h, w) => (
    <g>
      <ellipse cx="50" cy="54" rx="26" ry="22" fill="#3a3a3a" />
      <circle cx="28" cy="38" r="6" fill="#3a3a3a" />
      <circle cx="72" cy="38" r="6" fill="#3a3a3a" />
      <path d="M50 30c5 0 7 6 7 14v22c0 4-3 8-7 8s-7-4-7-8V44c0-8 2-14 7-14z" fill={w} />
      <circle cx="38" cy="54" r="3" fill={w} />
      <circle cx="62" cy="54" r="3" fill={w} />
      <ellipse cx="50" cy="72" rx="5" ry="3.5" fill={p} />
      <path d="M26 64c4 4 8 6 12 6M74 64c-4 4-8 6-12 6" stroke={h === '#ffffff' ? w : h} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  ),
  // Generic crest with monogram for custom universities (no invented mascot)
  monogram: (p, h, w, m) => (
    <g>
      <path d="M50 18l26 9v19c0 17-11 29-26 36-15-7-26-19-26-36V27z" fill={w} />
      <path d="M30 32l20-7 20 7" stroke={h} strokeWidth="3" fill="none" />
      <text x="50" y={m.length > 2 ? 58 : 60} textAnchor="middle" fontFamily="Bricolage Grotesque, system-ui, sans-serif" fontWeight="800" fontSize={m.length > 2 ? 17 : 22} fill={p}>
        {m}
      </text>
    </g>
  ),
};
