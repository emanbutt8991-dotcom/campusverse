import { useState } from 'react';
import { BookOpen, Bus, Coffee, Dumbbell, Home, Megaphone, UtensilsCrossed } from 'lucide-react';
import type { Ad, AdKind } from '../../types/content';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

const ICONS: Record<AdKind, typeof Coffee> = { coffee: Coffee, food: UtensilsCrossed, housing: Home, books: BookOpen, fitness: Dumbbell, transit: Bus };

export function SponsoredAd({ ad, variant = 'card' }: { ad: Ad; variant?: 'card' | 'banner' }) {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const Icon = ICONS[ad.kind];
  const graphic = (
    <div className={`relative grid shrink-0 place-items-center overflow-hidden bg-gradient-to-br from-uni-primary to-uni-accent ${variant === 'banner' ? 'h-28 w-full sm:h-auto sm:w-48' : 'h-24'}`} aria-hidden>
      <div className="pattern-grid absolute inset-0 text-white opacity-10" />
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-uni-highlight opacity-50" />
      <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/95 text-uni-ink shadow">
        <Icon size={26} />
      </span>
    </div>
  );
  return (
    <>
      <aside className={`overflow-hidden rounded-3xl border border-uni-border bg-white shadow-card ${variant === 'banner' ? 'flex flex-col sm:flex-row' : ''}`} aria-label={`Sponsored: ${ad.brand}`}>
        {graphic}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-xs font-semibold text-slate-600">{ad.brand}</p>
            <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">Sponsored</span>
          </div>
          <h3 className="mt-1 font-display text-base font-bold leading-snug text-slate-900">{ad.headline}</h3>
          <p className="mt-1 text-sm text-slate-600">{ad.description}</p>
          <div className="mt-3">
            <Button size="sm" variant="highlight" onClick={() => setOpen(true)} icon={<Megaphone size={14} aria-hidden />}>
              {ad.cta}
            </Button>
          </div>
        </div>
      </aside>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={ad.brand}
        description="Sample sponsored content"
        icon={<Icon size={20} />}
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
            <Button onClick={() => { setOpen(false); toast({ title: 'Offer saved (demo)', description: `${ad.offer} — saved to your demo wallet.` }); }}>Save offer</Button>
          </>
        }
      >
        <div className="overflow-hidden rounded-2xl">{graphic}</div>
        <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{ad.headline}</h3>
        <p className="mt-1 text-sm text-slate-700">{ad.description}</p>
        <p className="mt-3 rounded-xl bg-uni-soft px-3 py-2 text-sm font-semibold text-uni-ink">Offer: {ad.offer}</p>
        <p className="mt-3 text-xs text-slate-500">This is a fictional advertisement created for the CampusVerse prototype. The business is not real and no offer can be redeemed.</p>
      </Modal>
    </>
  );
}

export function AdSidebar({ ads }: { ads: Ad[] }) {
  return (
    <div className="space-y-4">
      {ads.map((ad) => (
        <SponsoredAd key={ad.id} ad={ad} />
      ))}
    </div>
  );
}
