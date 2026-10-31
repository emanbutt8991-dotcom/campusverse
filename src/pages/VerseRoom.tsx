import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BedDouble, CheckCircle2, EyeOff, HeartHandshake, MapPin, Plus, RotateCcw, Search } from 'lucide-react';
import { useUniversity } from '../hooks/useUniversity';
import { useDemoData } from '../hooks/useDemoData';
import { useToast } from '../context/ToastContext';
import { ROOM_TYPES, type Housing, type Roommate, type RoomType } from '../types/content';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { SelectField, TextArea, TextField } from '../components/common/Field';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { Avatar } from '../components/common/Avatar';
import { HouseArt, HousingCard } from '../components/cards/HousingCard';
import { AdSidebar } from '../components/advertisements/SponsoredAd';

export default function VerseRoom() {
  const u = useUniversity();
  const { housing, dataset, openConversationFor, createListing } = useDemoData();
  const toast = useToast();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [maxRent, setMaxRent] = useState('');
  const [distance, setDistance] = useState(0);
  const [lease, setLease] = useState(0);
  const [roomType, setRoomType] = useState<'' | RoomType>('');
  const [sort, setSort] = useState<'asc' | 'desc' | 'distance'>('asc');
  const [details, setDetails] = useState<Housing | null>(() => housing.find((h) => h.id === params.get('home')) ?? null);
  const [postOpen, setPostOpen] = useState(params.get('post') === '1');

  useEffect(() => {
    if (params.get('home') || params.get('post')) setParams({}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rentNum = Number(maxRent.replace(/[^0-9.]/g, ''));
  const rentError = maxRent && (Number.isNaN(rentNum) || rentNum <= 0) ? 'Enter a number, e.g. 800' : '';
  const results = useMemo(() => {
    const list = housing.filter(
      (h) =>
        (!maxRent || rentError || h.rent <= rentNum) &&
        (distance === 0 || h.distanceKm <= distance) &&
        (lease === 0 || h.leaseMonths === lease) &&
        (!roomType || h.roomType === roomType),
    );
    return [...list].sort((a, b) => (sort === 'asc' ? a.rent - b.rent : sort === 'desc' ? b.rent - a.rent : a.distanceKm - b.distanceKm));
  }, [housing, maxRent, rentNum, rentError, distance, lease, roomType, sort]);
  const active = !!(maxRent || distance || lease || roomType);
  const reset = () => {
    setMaxRent('');
    setDistance(0);
    setLease(0);
    setRoomType('');
  };

  const message = (h: Housing) => {
    const id = openConversationFor(h.lister, `Housing · ${h.neighbourhood}`, `Hi! Thanks for your interest in my ${h.roomType.toLowerCase()} near ${h.neighbourhood} ($${h.rent}/month). What would you like to know?`);
    toast({ title: 'Conversation opened', description: `Messaging ${h.lister} about ${h.neighbourhood} (simulated).` });
    navigate(`/messages?c=${id}`);
  };

  return (
    <div>
      <PageHeader
        icon={<BedDouble size={24} aria-hidden />}
        eyebrow={`${u.shortName} · ${u.city} housing`}
        title="VerseRoom"
        subtitle="Find student housing and roommates near campus"
        action={<Button variant="highlight" size="lg" icon={<Plus size={18} aria-hidden />} onClick={() => setPostOpen(true)}>Post Listing</Button>}
      />

      <form onSubmit={(e) => e.preventDefault()} className="mb-6 grid gap-3 rounded-3xl border border-uni-border bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] lg:items-end" role="search" aria-label="Filter housing">
        <TextField label="Max rent ($/month)" inputMode="numeric" placeholder="e.g. 800" value={maxRent} onChange={(e) => setMaxRent(e.target.value)} error={rentError} />
        <SelectField label="Distance to campus" value={distance} onChange={(e) => setDistance(Number(e.target.value))}>
          <option value={0}>Any distance</option>
          <option value={1}>Within 1 km</option>
          <option value={2}>Within 2 km</option>
          <option value={5}>Within 5 km</option>
        </SelectField>
        <SelectField label="Lease length" value={lease} onChange={(e) => setLease(Number(e.target.value))}>
          <option value={0}>Any length</option>
          <option value={4}>4 months (one term)</option>
          <option value={8}>8 months (school year)</option>
          <option value={12}>12 months</option>
        </SelectField>
        <SelectField label="Room type" value={roomType} onChange={(e) => setRoomType(e.target.value as RoomType | '')}>
          <option value="">Any type</option>
          {ROOM_TYPES.map((r) => <option key={r}>{r}</option>)}
        </SelectField>
        <SelectField label="Sort" value={sort} onChange={(e) => setSort(e.target.value as 'asc' | 'desc' | 'distance')}>
          <option value="asc">Rent: low to high</option>
          <option value="desc">Rent: high to low</option>
          <option value="distance">Closest to campus</option>
        </SelectField>
        <Button type="submit" size="lg" icon={<Search size={18} aria-hidden />} className={rentError ? 'lg:mb-[22px]' : ''}>Search</Button>
      </form>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <section aria-labelledby="listings-h" className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 id="listings-h" className="font-display text-xl font-bold text-slate-900" aria-live="polite">Listings ({results.length})</h2>
            <p className="flex items-center gap-1.5 text-xs text-slate-600"><EyeOff size={14} aria-hidden /> Exact addresses are hidden for privacy</p>
          </div>
          {results.length === 0 ? (
            <EmptyState title="No listings match" description={`No ${u.shortName} listings fit these filters${rentNum && !rentError ? ` under $${rentNum}` : ''}. Try a higher budget or a wider distance.`} action={<Button onClick={reset} icon={<RotateCcw size={16} aria-hidden />}>Clear filters</Button>} />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {results.map((h) => (
                <HousingCard key={h.id} home={h} onDetails={() => setDetails(h)} onMessage={() => message(h)} />
              ))}
            </div>
          )}
          {active && results.length > 0 && (
            <button onClick={reset} className="mt-4 text-sm font-semibold text-uni-ink hover:underline">Clear all filters</button>
          )}
          <RoommateFinder roommates={dataset.roommates} />
        </section>
        <aside className="space-y-4" aria-label="Sponsored">
          <p className="text-xs font-bold uppercase tracking-wider text-uni-muted">Sponsored · sample ads</p>
          <AdSidebar ads={dataset.ads.filter((a) => a.kind === 'housing').concat(dataset.ads.filter((a) => a.kind !== 'housing').slice(0, 1))} />
        </aside>
      </div>

      <Modal
        open={!!details}
        onClose={() => setDetails(null)}
        title={details ? `${details.roomType} near ${details.neighbourhood}` : ''}
        description={details ? `$${details.rent}/month · ${details.distanceKm} km to campus` : ''}
        icon={<BedDouble size={20} />}
        size="lg"
        footer={
          details && (
            <>
              <Button variant="secondary" onClick={() => setDetails(null)}>Close</Button>
              <Button onClick={() => { const d = details; setDetails(null); message(d); }} disabled={details.userCreated}>Message Lister</Button>
            </>
          )
        }
      >
        {details && (
          <div className="space-y-4">
            <HouseArt hue={details.hue} className="h-44 w-full rounded-2xl" />
            <p className="text-slate-700">{details.description}</p>
            <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              {[
                ['Monthly rent', `$${details.rent}`],
                ['Area', details.neighbourhood],
                ['Lease', `${details.leaseStart} – ${details.leaseEnd}`],
                ['Length', `${details.leaseMonths} months`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-slate-100 p-3"><dt className="text-xs text-slate-500">{k}</dt><dd className="font-semibold text-slate-900">{v}</dd></div>
              ))}
            </dl>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-800">Amenities</h3>
              <ul className="flex flex-wrap gap-2">
                {details.amenities.map((a) => (
                  <li key={a} className="inline-flex items-center gap-1 rounded-full bg-uni-soft px-3 py-1 text-xs font-semibold text-uni-ink"><CheckCircle2 size={13} aria-hidden /> {a}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <Avatar name={details.lister} size={40} />
              <div>
                <p className="text-sm font-semibold text-slate-900">Listed by {details.lister}</p>
                <p className="text-xs text-slate-600">Demo lister · contact details hidden until a viewing is approved</p>
              </div>
            </div>
            <p className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-900"><MapPin size={14} className="mt-0.5 shrink-0" aria-hidden /> Approximate area only. The exact address is never shown in this public demo.</p>
          </div>
        )}
      </Modal>

      <PostListingModal
        open={postOpen}
        onClose={() => setPostOpen(false)}
        onSubmit={(h) => {
          createListing(h);
          setPostOpen(false);
          reset();
          toast({ title: 'Listing posted!', description: `Your ${h.roomType.toLowerCase()} in ${h.neighbourhood} is now listed (demo).` });
        }}
      />
    </div>
  );
}

function RoommateFinder({ roommates }: { roommates: Roommate[] }) {
  const [pref, setPref] = useState({ budget: '800', sleep: 'Flexible' as Roommate['sleep'], cleanliness: 'Tidy' as Roommate['cleanliness'], noise: 'Quiet' as Roommate['noise'] });
  const [searched, setSearched] = useState(false);
  const scored = roommates
    .map((r) => {
      const score =
        (Math.abs(r.budget - Number(pref.budget)) <= 150 ? 1 : 0) +
        (r.sleep === pref.sleep || pref.sleep === 'Flexible' || r.sleep === 'Flexible' ? 1 : 0) +
        (r.cleanliness === pref.cleanliness ? 1 : 0) +
        (r.noise === pref.noise ? 1 : 0);
      return { r, score };
    })
    .filter((x) => x.score >= 3)
    .sort((a, b) => b.score - a.score);

  return (
    <section className="mt-8 rounded-3xl border border-uni-border bg-white p-5 shadow-card" aria-labelledby="roommate-h">
      <h2 id="roommate-h" className="flex items-center gap-2 font-display text-xl font-bold text-slate-900"><HeartHandshake size={20} aria-hidden /> Roommate Finder</h2>
      <p className="text-sm text-slate-600">Matches share at least 3 of your 4 preferences. Profiles are fictional.</p>
      <form onSubmit={(e) => { e.preventDefault(); setSearched(true); }} className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
        <TextField label="Budget ($/month)" type="number" value={pref.budget} onChange={(e) => setPref({ ...pref, budget: e.target.value })} />
        <SelectField label="Sleep schedule" value={pref.sleep} onChange={(e) => setPref({ ...pref, sleep: e.target.value as Roommate['sleep'] })}>
          <option>Early bird</option><option>Night owl</option><option>Flexible</option>
        </SelectField>
        <SelectField label="Cleanliness" value={pref.cleanliness} onChange={(e) => setPref({ ...pref, cleanliness: e.target.value as Roommate['cleanliness'] })}>
          <option>Very tidy</option><option>Tidy</option><option>Relaxed</option>
        </SelectField>
        <SelectField label="Noise" value={pref.noise} onChange={(e) => setPref({ ...pref, noise: e.target.value as Roommate['noise'] })}>
          <option>Quiet</option><option>Moderate</option><option>Lively</option>
        </SelectField>
        <Button type="submit">Find matches</Button>
      </form>
      {searched && (
        <div className="mt-5" aria-live="polite">
          <p className="mb-3 text-sm font-semibold text-slate-800">{scored.length} match{scored.length === 1 ? '' : 'es'}</p>
          {scored.length === 0 ? (
            <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">No profiles match 3+ preferences. Try adjusting your budget or noise preference.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {scored.map(({ r, score }) => (
                <div key={r.id} className="flex gap-3 rounded-2xl border border-slate-100 p-3">
                  <Avatar name={r.name} size={44} />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">{r.name} <span className="ml-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">{score}/4 match</span></p>
                    <p className="text-xs text-slate-600">{r.program} · ${r.budget}/mo · {r.sleep} · {r.cleanliness} · {r.noise}</p>
                    <p className="mt-1 text-sm text-slate-700">{r.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function PostListingModal({ open, onClose, onSubmit }: { open: boolean; onClose: () => void; onSubmit: (h: Omit<Housing, 'id' | 'lister' | 'hue' | 'userCreated' | 'amenities'>) => void }) {
  const blank = { rent: '', neighbourhood: '', distance: '', roomType: 'Private room' as RoomType, leaseStart: 'Sep 1', leaseEnd: 'Apr 30', months: '8', description: '' };
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
    const rent = Number(f.rent);
    if (!f.rent || Number.isNaN(rent) || rent < 100 || rent > 5000) err.rent = 'Enter monthly rent between $100 and $5,000.';
    if (f.neighbourhood.trim().length < 2) err.neighbourhood = 'Enter the general neighbourhood (not the exact address).';
    const dist = Number(f.distance);
    if (!f.distance || Number.isNaN(dist) || dist < 0 || dist > 50) err.distance = 'Enter distance to campus in km (0–50).';
    if (!f.leaseStart.trim()) err.leaseStart = 'Enter a lease start date.';
    if (!f.leaseEnd.trim()) err.leaseEnd = 'Enter a lease end date.';
    if (f.description.trim().length < 10) err.description = 'Add a short description (at least 10 characters).';
    setErrors(err);
    if (Object.keys(err).length) return;
    onSubmit({ rent, neighbourhood: f.neighbourhood.trim(), distanceKm: dist, roomType: f.roomType, leaseStart: f.leaseStart.trim(), leaseEnd: f.leaseEnd.trim(), leaseMonths: Number(f.months), description: f.description.trim() });
  };
  return (
    <Modal open={open} onClose={onClose} title="Post a housing listing" description="List a room or sublet. Only the approximate area is shown publicly." icon={<BedDouble size={20} />}>
      <form onSubmit={submit} noValidate className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Monthly rent ($)" type="number" value={f.rent} onChange={set('rent')} error={errors.rent} data-autofocus />
          <TextField label="Neighbourhood (approximate)" placeholder="e.g. Near campus north" value={f.neighbourhood} onChange={set('neighbourhood')} error={errors.neighbourhood} />
          <TextField label="Distance to campus (km)" type="number" step="0.1" value={f.distance} onChange={set('distance')} error={errors.distance} />
          <SelectField label="Room type" value={f.roomType} onChange={set('roomType')}>
            {ROOM_TYPES.map((r) => <option key={r}>{r}</option>)}
          </SelectField>
          <TextField label="Lease start" value={f.leaseStart} onChange={set('leaseStart')} error={errors.leaseStart} />
          <TextField label="Lease end" value={f.leaseEnd} onChange={set('leaseEnd')} error={errors.leaseEnd} />
        </div>
        <SelectField label="Lease length" value={f.months} onChange={set('months')}>
          <option value="4">4 months</option><option value="8">8 months</option><option value="12">12 months</option>
        </SelectField>
        <TextArea label="Description" placeholder="Describe the space, roommates, what's included…" value={f.description} onChange={set('description')} error={errors.description} />
        <p className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600">Photo uploads are disabled in this prototype — an illustration is used instead.</p>
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">Post listing</Button>
        </div>
      </form>
    </Modal>
  );
}
