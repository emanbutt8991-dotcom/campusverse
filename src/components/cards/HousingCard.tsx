import { BedDouble, CalendarRange, MapPin } from 'lucide-react';
import type { Housing } from '../../types/content';
import { Button } from '../common/Button';

export function HouseArt({ hue, className = '' }: { hue: number; className?: string }) {
  const wall = `hsl(${hue} 45% 92%)`;
  const roof = `rgb(var(--uni-primary-rgb))`;
  return (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label="Illustrated property">
      <rect width="200" height="120" fill={`hsl(${hue} 60% 85%)`} />
      <circle cx="165" cy="26" r="13" fill="rgb(var(--uni-highlight-rgb))" opacity=".8" />
      <rect y="95" width="200" height="25" fill={`hsl(${(hue + 90) % 360} 35% 62%)`} />
      <path d="M50 58 L100 24 L150 58Z" fill={roof} />
      <rect x="58" y="56" width="84" height="44" fill={wall} />
      <rect x="92" y="72" width="16" height="28" rx="2" fill={roof} opacity=".85" />
      <rect x="66" y="64" width="18" height="14" rx="2" fill="rgb(var(--uni-highlight-rgb))" opacity=".75" />
      <rect x="116" y="64" width="18" height="14" rx="2" fill="rgb(var(--uni-highlight-rgb))" opacity=".75" />
      <circle cx="30" cy="86" r="14" fill={`hsl(${(hue + 100) % 360} 40% 45%)`} />
      <rect x="28" y="92" width="4" height="10" fill="#6b4f3a" />
    </svg>
  );
}

export function HousingCard({ home: h, onDetails, onMessage }: { home: Housing; onDetails: () => void; onMessage: () => void }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-uni-border bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lift" aria-label={`${h.roomType} in ${h.neighbourhood}, $${h.rent} per month`}>
      <div className="relative">
        <HouseArt hue={h.hue} className="h-36 w-full" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm">{h.distanceKm} km to campus</span>
        {h.userCreated && <span className="absolute right-3 top-3 rounded-full bg-uni-primary px-2.5 py-1 text-xs font-bold text-uni-onprimary">Your listing</span>}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-display text-2xl font-extrabold text-slate-900">${h.rent.toLocaleString()}<span className="text-sm font-medium text-slate-600"> / month</span></p>
        <p className="mt-1 flex items-center gap-1 text-sm font-medium text-slate-700"><MapPin size={15} aria-hidden /> Near {h.neighbourhood}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1"><CalendarRange size={15} aria-hidden /> {h.leaseStart} – {h.leaseEnd}</span>
          <span className="inline-flex items-center gap-1"><BedDouble size={15} aria-hidden /> {h.roomType}</span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-slate-600">{h.description}</p>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <Button variant="secondary" size="sm" onClick={onDetails} aria-label={`Details for listing in ${h.neighbourhood}`}>View Details</Button>
          <Button size="sm" onClick={onMessage} disabled={h.userCreated} aria-label={`Message lister for ${h.neighbourhood}`}>Message Lister</Button>
        </div>
      </div>
    </article>
  );
}
