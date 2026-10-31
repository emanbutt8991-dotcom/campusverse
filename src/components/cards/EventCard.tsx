import { Clock, MapPin } from 'lucide-react';
import type { CampusEvent } from '../../types/content';
import { formatTime, parseIso } from '../../utils/format';
import { Button } from '../common/Button';

interface Props {
  event: CampusEvent;
  going: boolean;
  onRsvp: () => void;
  onDetails: () => void;
  compact?: boolean;
}

export function DateBadge({ iso }: { iso: string }) {
  const d = parseIso(iso);
  return (
    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-uni-soft text-center text-uni-ink ring-1 ring-uni-border">
      <div>
        <p className="text-[10px] font-bold uppercase leading-none tracking-wider">{d.toLocaleDateString('en-CA', { month: 'short' })}</p>
        <p className="font-display text-xl font-extrabold leading-none">{d.getDate()}</p>
      </div>
    </div>
  );
}

export function EventCard({ event: e, going, onRsvp, onDetails, compact }: Props) {
  const left = Math.max(0, e.capacity - e.going);
  return (
    <article className="rounded-2xl border border-uni-border bg-white p-4" aria-label={e.title}>
      <div className="flex gap-3">
        <DateBadge iso={e.date} />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-snug text-slate-900">{e.title}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-600"><MapPin size={13} aria-hidden /> <span className="truncate">{e.location}</span></p>
          <p className="flex items-center gap-1 text-xs text-slate-600"><Clock size={13} aria-hidden /> {formatTime(e.time)}</p>
        </div>
      </div>
      <p className="mt-2 text-xs font-medium text-slate-700">
        {e.going} going · <span className={left <= 10 ? 'text-rose-700' : ''}>{left} spot{left === 1 ? '' : 's'} left</span>
      </p>
      <div className={`mt-3 grid gap-2 ${compact ? 'grid-cols-2' : 'grid-cols-2'}`}>
        <Button size="sm" variant={going ? 'success' : 'primary'} onClick={onRsvp} disabled={!going && left === 0} aria-label={going ? `Cancel RSVP for ${e.title}` : `RSVP to ${e.title}`}>
          {going ? '✓ Going' : left === 0 ? 'Full' : 'RSVP'}
        </Button>
        <Button size="sm" variant="secondary" onClick={onDetails} aria-label={`Details for ${e.title}`}>Details</Button>
      </div>
    </article>
  );
}
