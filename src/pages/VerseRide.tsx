import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, Car, CheckCircle2, MapPin, Plus, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { useUniversity } from '../hooks/useUniversity';
import { useDemoData } from '../hooks/useDemoData';
import { useToast } from '../context/ToastContext';
import type { Ride } from '../types/content';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { Chip, SelectField, TextField } from '../components/common/Field';
import { Modal } from '../components/common/Modal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { Avatar } from '../components/common/Avatar';
import { RideCard } from '../components/cards/RideCard';
import { matches, timeOfDay, type TimeOfDay } from '../utils/filters';
import { formatDate, formatTime, relativeDay, todayIso } from '../utils/format';

const TIMES: TimeOfDay[] = ['Morning', 'Afternoon', 'Evening'];

export default function VerseRide() {
  const u = useUniversity();
  const { rides, isRideRequested, requestRide, offerRide } = useDemoData();
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const resultsRef = useRef<HTMLHeadingElement>(null);

  const [from, setFrom] = useState('');
  const [to, setTo] = useState(params.get('to') ?? '');
  const [date, setDate] = useState('');
  const [times, setTimes] = useState<TimeOfDay[]>([]);
  const [seats, setSeats] = useState(0);
  const [sort, setSort] = useState<'soonest' | 'cheapest'>('soonest');
  const [showFilters, setShowFilters] = useState(false);

  const [details, setDetails] = useState<Ride | null>(() => rides.find((r) => r.id === params.get('ride')) ?? null);
  const [confirm, setConfirm] = useState<Ride | null>(null);
  const [justRequested, setJustRequested] = useState<Ride | null>(null);
  const [offerOpen, setOfferOpen] = useState(params.get('offer') === '1');

  useEffect(() => {
    if (params.get('offer') || params.get('ride')) {
      const next = new URLSearchParams(params);
      next.delete('offer');
      next.delete('ride');
      setParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const results = useMemo(() => {
    const list = rides.filter(
      (r) =>
        matches([r.from, r.pickup, r.userCreated ? '' : u.city], from) &&
        matches([r.to, r.dropoff], to) &&
        (!date || r.date >= date) &&
        (times.length === 0 || times.includes(timeOfDay(r.time))) &&
        (seats === 0 || r.seats >= seats),
    );
    return [...list].sort((a, b) => (sort === 'cheapest' ? a.price - b.price : `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)));
  }, [rides, from, to, date, times, seats, sort]);

  const activeFilters = !!(from || to || date || times.length || seats);
  const reset = () => {
    setFrom('');
    setTo('');
    setDate('');
    setTimes([]);
    setSeats(0);
  };
  const destinations = useMemo(() => [...new Set(rides.map((r) => r.to))], [rides]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    resultsRef.current?.focus();
  };

  const doRequest = (r: Ride) => {
    requestRide(r);
    setConfirm(null);
    setJustRequested(r);
    toast({ title: 'Ride request submitted!', description: `Your seat request on ${r.driver}'s ride to ${r.to} is pending. (Simulated — no real driver is notified.)` });
  };

  const filters = (
    <div className="space-y-5">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-800">Departure time</legend>
        <div className="flex flex-wrap gap-2">
          {TIMES.map((t) => (
            <Chip key={t} active={times.includes(t)} onClick={() => setTimes((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))}>
              {t}
            </Chip>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-800">Seats required</legend>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((n) => (
            <Chip key={n} active={seats === n} onClick={() => setSeats((s) => (s === n ? 0 : n))}>
              {n === 3 ? '3+ seats' : `${n} seat${n > 1 ? 's' : ''}`}
            </Chip>
          ))}
        </div>
      </fieldset>
      <SelectField label="Sort by" value={sort} onChange={(e) => setSort(e.target.value as 'soonest' | 'cheapest')}>
        <option value="soonest">Soonest departure</option>
        <option value="cheapest">Lowest price</option>
      </SelectField>
      <Button variant="secondary" block icon={<RotateCcw size={16} aria-hidden />} onClick={reset} disabled={!activeFilters}>
        Reset filters
      </Button>
    </div>
  );

  return (
    <div>
      <PageHeader
        icon={<Car size={24} aria-hidden />}
        eyebrow={`${u.shortName} · ${u.city}`}
        title="VerseRide"
        subtitle="Find or offer a ride with fellow students"
        action={
          <Button variant="highlight" size="lg" icon={<Plus size={18} aria-hidden />} onClick={() => setOfferOpen(true)}>
            Offer Ride
          </Button>
        }
      />

      <form onSubmit={onSearch} className="mb-6 grid gap-3 rounded-3xl border border-uni-border bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-[1fr_1fr_200px_auto] lg:items-end" role="search" aria-label="Search rides">
        <TextField label="From" placeholder={`e.g. ${u.shortName}`} value={from} onChange={(e) => setFrom(e.target.value)} />
        <TextField label="To" placeholder="e.g. Toronto" value={to} onChange={(e) => setTo(e.target.value)} list="ride-destinations" />
        <datalist id="ride-destinations">
          {destinations.map((d) => (
            <option key={d} value={d} />
          ))}
        </datalist>
        <TextField label="Travel date" type="date" min={todayIso()} value={date} onChange={(e) => setDate(e.target.value)} hint="Shows rides on or after this date" />
        <Button type="submit" size="lg" icon={<Search size={18} aria-hidden />} className="lg:mb-[22px]">
          Search
        </Button>
        <div className="flex flex-wrap items-center gap-2 sm:col-span-2 lg:col-span-4">
          <span className="text-xs font-semibold text-slate-500">Popular:</span>
          {destinations.slice(0, 4).map((d) => (
            <button key={d} type="button" onClick={() => setTo(d.split(' (')[0])} className="rounded-full bg-uni-soft px-3 py-1 text-xs font-semibold text-uni-ink hover:brightness-95">
              {d}
            </button>
          ))}
        </div>
      </form>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden h-fit rounded-3xl border border-uni-border bg-white p-5 shadow-card lg:block" aria-label="Ride filters">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-slate-900">
            <SlidersHorizontal size={18} aria-hidden /> Filters
          </h2>
          {filters}
        </aside>

        <section aria-labelledby="rides-h">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 id="rides-h" ref={resultsRef} tabIndex={-1} className="font-display text-xl font-bold text-slate-900 focus:outline-none" aria-live="polite">
              Available Rides ({results.length})
            </h2>
            <Button variant="secondary" size="sm" className="lg:hidden" icon={<SlidersHorizontal size={16} aria-hidden />} onClick={() => setShowFilters((s) => !s)} aria-expanded={showFilters}>
              Filters{times.length + (seats ? 1 : 0) ? ` (${times.length + (seats ? 1 : 0)})` : ''}
            </Button>
          </div>
          {showFilters && <div className="mb-4 rounded-3xl border border-uni-border bg-white p-4 shadow-card lg:hidden">{filters}</div>}

          {justRequested && isRideRequested(justRequested.id) && (
            <div className="mb-4 flex animate-fadeUp items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900" role="status">
              <CheckCircle2 className="mt-0.5 shrink-0" size={20} aria-hidden />
              <div className="flex-1">
                <p className="font-semibold">Ride request submitted!</p>
                <p className="text-sm">
                  Seat requested with {justRequested.driver} to {justRequested.to} on {formatDate(justRequested.date)} at {formatTime(justRequested.time)}. Status: <strong>Request Pending</strong>. It's now in your Upcoming Activity.
                </p>
              </div>
            </div>
          )}

          {results.length === 0 ? (
            <EmptyState
              title="No rides match your search"
              description={`There are no ${u.shortName} rides${to ? ` to “${to}”` : ''}${date ? ` on or after ${formatDate(date)}` : ''} with these filters. Try another destination or clear filters.`}
              action={
                <Button onClick={reset} icon={<RotateCcw size={16} aria-hidden />}>
                  Reset filters
                </Button>
              }
            />
          ) : (
            <div className="space-y-3">
              {results.map((r) => (
                <RideCard key={r.id} ride={r} requested={isRideRequested(r.id)} onDetails={() => setDetails(r)} onRequest={() => setConfirm(r)} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Details */}
      <Modal open={!!details} onClose={() => setDetails(null)} title="Ride details" description={details ? `${details.from} → ${details.to}` : ''} icon={<Car size={20} />}
        footer={
          details && (
            <>
              <Button variant="secondary" onClick={() => setDetails(null)}>Close</Button>
              {isRideRequested(details.id) ? (
                <Button variant="success" disabled>Request Pending</Button>
              ) : (
                <Button onClick={() => setConfirm(details)} disabled={details.seats === 0 || details.userCreated}>{details.seats === 0 ? 'Ride Full' : 'Request Seat'}</Button>
              )}
            </>
          )
        }
      >
        {details && (
          <div className="space-y-5">
            {isRideRequested(details.id) && (
              <p className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800" role="status">
                <CheckCircle2 size={18} aria-hidden /> Ride request submitted! Status: Request Pending
              </p>
            )}
            <div className="flex items-center gap-3 rounded-2xl bg-uni-soft p-3">
              <Avatar name={details.driver} size={52} />
              <div>
                <p className="font-semibold text-slate-900">{details.driver}</p>
                <p className="text-sm text-slate-600">{details.program}</p>
                <p className="text-xs font-semibold text-uni-ink">Demo driver profile · student status not verified in this prototype</p>
              </div>
            </div>
            <ol className="relative space-y-4 border-l-2 border-dashed border-uni-border pl-5">
              <li>
                <span className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full border-4 border-white bg-uni-primary" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">General pickup area</p>
                <p className="font-semibold text-slate-900">{details.pickup}</p>
                <p className="text-sm text-slate-600">{details.from}</p>
              </li>
              <li>
                <span className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full border-4 border-white bg-uni-highlight" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Destination</p>
                <p className="font-semibold text-slate-900">{details.to}</p>
                <p className="text-sm text-slate-600">Drop-off: {details.dropoff}</p>
              </li>
            </ol>
            <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              {[
                ['Date', relativeDay(details.date)],
                ['Departure', formatTime(details.time)],
                ['Seats', details.seats === 0 ? 'Full' : `${details.seats} available`],
                ['Price', `$${details.price} / seat`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-slate-100 p-3">
                  <dt className="text-xs text-slate-500">{k}</dt>
                  <dd className="font-semibold text-slate-900">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm text-slate-700"><span className="font-semibold">Vehicle:</span> {details.car}</p>
            <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">“{details.notes}”</p>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!confirm}
        title="Request a seat?"
        description={confirm ? `${confirm.from} → ${confirm.to}` : ''}
        confirmLabel="Confirm request"
        icon={<Car size={20} />}
        onCancel={() => setConfirm(null)}
        onConfirm={() => confirm && doRequest(confirm)}
      >
        {confirm && (
          <div className="space-y-1 rounded-2xl bg-uni-soft p-4 text-sm text-slate-800">
            <p><strong>Driver:</strong> {confirm.driver}</p>
            <p><strong>When:</strong> {relativeDay(confirm.date)} at {formatTime(confirm.time)}</p>
            <p className="flex items-center gap-1"><MapPin size={14} aria-hidden /> <strong>Pickup:</strong> {confirm.pickup}</p>
            <p><strong>Seats:</strong> 1 · <strong>Price:</strong> ${confirm.price}</p>
          </div>
        )}
      </ConfirmDialog>

      <OfferRideModal
        open={offerOpen}
        onClose={() => setOfferOpen(false)}
        defaultFrom={u.isCustom ? `${u.shortName} Campus` : u.name}
        onSubmit={(r) => {
          offerRide(r);
          setOfferOpen(false);
          reset();
          toast({ title: 'Ride offer posted!', description: `${r.from} → ${r.to} is now listed in VerseRide (demo).` });
        }}
      />
    </div>
  );
}

function OfferRideModal({ open, onClose, onSubmit, defaultFrom }: { open: boolean; onClose: () => void; defaultFrom: string; onSubmit: (r: Omit<Ride, 'id' | 'driver' | 'program' | 'car' | 'notes' | 'userCreated'>) => void }) {
  const blank = { from: defaultFrom, to: '', date: '', time: '', seats: '3', price: '15', pickup: '' };
  const [f, setF] = useState(blank);
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (open) {
      setF(blank);
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!f.from.trim()) err.from = 'Enter where you are leaving from.';
    if (!f.to.trim()) err.to = 'Enter your destination.';
    if (!f.date) err.date = 'Choose a travel date.';
    else if (f.date < todayIso()) err.date = 'The date cannot be in the past.';
    if (!f.time) err.time = 'Choose a departure time.';
    const seats = Number(f.seats);
    if (!Number.isInteger(seats) || seats < 1 || seats > 7) err.seats = 'Seats must be between 1 and 7.';
    const price = Number(f.price);
    if (Number.isNaN(price) || price < 0 || price > 200) err.price = 'Price must be between $0 and $200.';
    setErrors(err);
    if (Object.keys(err).length) return;
    onSubmit({ from: f.from.trim(), to: f.to.trim(), date: f.date, time: f.time, seats, price, pickup: f.pickup.trim() || f.from.trim(), dropoff: f.to.trim() });
  };
  return (
    <Modal open={open} onClose={onClose} title="Offer a ride" description="Share empty seats with fellow students. This listing stays on this device only." icon={<Car size={20} />}>
      <form onSubmit={submit} noValidate className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="From" value={f.from} onChange={set('from')} error={errors.from} data-autofocus />
          <TextField label="To" placeholder="e.g. Toronto" value={f.to} onChange={set('to')} error={errors.to} />
          <TextField label="Date" type="date" min={todayIso()} value={f.date} onChange={set('date')} error={errors.date} />
          <TextField label="Departure time" type="time" value={f.time} onChange={set('time')} error={errors.time} />
          <TextField label="Available seats" type="number" min={1} max={7} value={f.seats} onChange={set('seats')} error={errors.seats} />
          <TextField label="Price per seat ($)" type="number" min={0} max={200} value={f.price} onChange={set('price')} error={errors.price} />
        </div>
        <TextField label="General pickup spot" optional placeholder="e.g. Student Centre bus loop" value={f.pickup} onChange={set('pickup')} />
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" icon={<ArrowRight size={16} aria-hidden />}>Post ride</Button>
        </div>
      </form>
    </Modal>
  );
}
