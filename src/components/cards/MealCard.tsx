import { Clock, MapPin, Package } from 'lucide-react';
import type { Meal } from '../../types/content';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';

export function FoodArt({ emoji, hue, className = '' }: { emoji: string; hue: number; className?: string }) {
  return (
    <div className={`relative grid place-items-center overflow-hidden ${className}`} style={{ background: `linear-gradient(135deg, hsl(${hue} 85% 88%), hsl(${(hue + 30) % 360} 80% 76%))` }} role="img" aria-label="Food illustration">
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/30" aria-hidden />
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/20" aria-hidden />
      <span className="relative text-5xl drop-shadow-sm" aria-hidden>{emoji}</span>
    </div>
  );
}

export function MealCard({ meal: m, claimed, onClaim }: { meal: Meal; claimed: boolean; onClaim: () => void }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-uni-border bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lift" aria-label={m.dish}>
      <FoodArt emoji={m.emoji} hue={m.hue} className="h-32" />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold leading-snug text-slate-900">{m.dish}</h3>
          <span className="shrink-0 rounded-full bg-uni-soft px-2 py-0.5 text-xs font-semibold text-uni-ink">{m.distanceKm} km</span>
        </div>
        <p className="mt-1 flex items-center gap-2 text-sm text-slate-600"><Avatar name={m.student} size={22} /> {m.student}</p>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{m.description}</p>
        <div className="mt-3 space-y-1 text-sm text-slate-700">
          <p className="flex items-center gap-1.5"><MapPin size={15} className="text-slate-400" aria-hidden /> <span className="truncate">{m.pickup}</span></p>
          <p className="flex items-center gap-1.5"><Clock size={15} className="text-slate-400" aria-hidden /> {m.window}</p>
          <p className="flex items-center gap-1.5"><Package size={15} className="text-slate-400" aria-hidden /> {m.quantity} portion{m.quantity > 1 ? 's' : ''} left</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {m.tags.map((t) => (
            <span key={t} className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-700">{t}</span>
          ))}
          {m.allergens.length > 0 && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">Contains: {m.allergens.join(', ')}</span>}
        </div>
        <div className="mt-auto pt-4">
          {claimed ? (
            <Button variant="success" block disabled>Claim Requested</Button>
          ) : (
            <Button block onClick={onClaim} disabled={m.userCreated} aria-label={`Claim ${m.dish}`}>{m.userCreated ? 'Your post' : '+ Claim'}</Button>
          )}
        </div>
      </div>
    </article>
  );
}
