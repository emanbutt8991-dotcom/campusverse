import { ArrowRight, CalendarDays, Clock, Users } from 'lucide-react';
import type { Ride } from '../../types/content';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { formatTime, relativeDay } from '../../utils/format';

interface Props {
  ride: Ride;
  requested: boolean;
  onDetails: () => void;
  onRequest: () => void;
}

export function RideCard({ ride, requested, onDetails, onRequest }: Props) {
  const full = ride.seats === 0;
  return (
    <article className="group rounded-3xl border border-uni-border bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift sm:p-5" aria-label={`Ride with ${ride.driver} to ${ride.to}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <Avatar name={ride.driver} size={48} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-slate-900">{ride.driver}</h3>
              <span className="rounded-full bg-uni-soft px-2 py-0.5 text-[11px] font-semibold text-uni-ink">{ride.userCreated ? 'Your listing' : 'Demo student'}</span>
            </div>
            <p className="text-xs text-slate-600">{ride.program}</p>
            <p className="mt-2 flex flex-wrap items-center gap-1.5 text-sm font-semibold text-slate-900">
              <span className="truncate">{ride.from}</span>
              <ArrowRight size={16} className="shrink-0 text-uni-ink" aria-label="to" />
              <span className="truncate">{ride.to}</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1"><CalendarDays size={15} aria-hidden /> {relativeDay(ride.date)}</span>
              <span className="inline-flex items-center gap-1"><Clock size={15} aria-hidden /> {formatTime(ride.time)}</span>
              <span className={`inline-flex items-center gap-1 ${full ? 'text-rose-700' : ''}`}><Users size={15} aria-hidden /> {full ? 'Full' : `${ride.seats} seat${ride.seats > 1 ? 's' : ''} available`}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
          <p className="text-right">
            <span className="font-display text-2xl font-extrabold text-uni-ink">${ride.price}</span>
            <span className="text-sm text-slate-600"> /seat</span>
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={onDetails} aria-label={`View details for ride to ${ride.to} with ${ride.driver}`}>
              View Details
            </Button>
            {requested ? (
              <Button variant="success" size="sm" disabled aria-label="Request Pending">Request Pending</Button>
            ) : (
              <Button size="sm" onClick={onRequest} disabled={full || ride.userCreated} aria-label={`Request seat on ride to ${ride.to} with ${ride.driver}`}>
                {full ? 'Ride Full' : 'Request Seat'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
