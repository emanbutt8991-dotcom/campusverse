import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, RotateCcw, SlidersHorizontal, UtensilsCrossed } from 'lucide-react';
import { useUniversity } from '../hooks/useUniversity';
import { useDemoData } from '../hooks/useDemoData';
import { useToast } from '../context/ToastContext';
import { ALLERGENS, DIET_TAGS, type Allergen, type DietTag, type Meal } from '../types/content';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { Chip, SelectField, TextArea, TextField } from '../components/common/Field';
import { SearchBar } from '../components/common/SearchBar';
import { Modal } from '../components/common/Modal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { FoodArt, MealCard } from '../components/cards/MealCard';
import { SponsoredAd } from '../components/advertisements/SponsoredAd';
import { matches } from '../utils/filters';

const FILTER_TAGS: DietTag[] = ['Halal', 'Vegetarian', 'Vegan', 'Gluten-Free'];

export default function VerseMeals() {
  const u = useUniversity();
  const { meals, dataset, isMealClaimed, claimMeal, shareMeal } = useDemoData();
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const [tags, setTags] = useState<DietTag[]>([]);
  const [avoid, setAvoid] = useState<Allergen[]>([]);
  const [maxKm, setMaxKm] = useState(0);
  const [portions, setPortions] = useState(0);
  const [confirm, setConfirm] = useState<Meal | null>(null);
  const [shareOpen, setShareOpen] = useState(params.get('share') === '1');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (params.get('share') || params.get('q')) setParams({}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const results = useMemo(
    () =>
      meals.filter(
        (m) =>
          matches([m.dish, m.description, m.student, m.pickup], q) &&
          tags.every((t) => m.tags.includes(t)) &&
          avoid.every((a) => !m.allergens.includes(a)) &&
          (maxKm === 0 || m.distanceKm <= maxKm) &&
          (portions === 0 || m.quantity >= portions),
      ),
    [meals, q, tags, avoid, maxKm, portions],
  );
  const active = !!(q || tags.length || avoid.length || maxKm || portions);
  const reset = () => {
    setQ('');
    setTags([]);
    setAvoid([]);
    setMaxKm(0);
    setPortions(0);
  };
  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const foodAds = dataset.ads.filter((a) => a.kind === 'food' || a.kind === 'coffee');

  const filters = (
    <div className="space-y-5">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-800">Dietary preference</legend>
        <div className="flex flex-wrap gap-2">
          {FILTER_TAGS.map((t) => (
            <Chip key={t} active={tags.includes(t)} onClick={() => setTags((s) => toggle(s, t))}>{t}</Chip>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-800">Avoid allergens</legend>
        <div className="flex flex-wrap gap-2">
          {ALLERGENS.map((a) => (
            <Chip key={a} active={avoid.includes(a)} onClick={() => setAvoid((s) => toggle(s, a))}>No {a.toLowerCase()}</Chip>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-800">Portions</legend>
        <div className="flex flex-wrap gap-2">
          {[1, 2].map((n) => (
            <Chip key={n} active={portions === n} onClick={() => setPortions((p) => (p === n ? 0 : n))}>{n} plate{n > 1 ? 's' : ''}+</Chip>
          ))}
        </div>
      </fieldset>
      <SelectField label="Distance from campus" value={maxKm} onChange={(e) => setMaxKm(Number(e.target.value))}>
        <option value={0}>Any distance</option>
        <option value={0.5}>Within 0.5 km</option>
        <option value={1}>Within 1 km</option>
        <option value={2}>Within 2 km</option>
      </SelectField>
      <Button variant="secondary" block onClick={reset} disabled={!active} icon={<RotateCcw size={16} aria-hidden />}>Clear filters</Button>
    </div>
  );

  return (
    <div>
      <PageHeader
        icon={<UtensilsCrossed size={24} aria-hidden />}
        eyebrow={`${u.shortName} · Food sharing`}
        title="VerseMeals"
        subtitle="Share extra food and find affordable meals on campus"
        action={<Button variant="highlight" size="lg" icon={<Plus size={18} aria-hidden />} onClick={() => setShareOpen(true)}>Share Food</Button>}
      />

      <div className="mb-6 flex gap-2 rounded-3xl border border-uni-border bg-white p-3 shadow-card">
        <SearchBar className="flex-1" value={q} onChange={setQ} label="Search dishes and meals" placeholder="Search dishes, e.g. biryani, cookies…" />
        <Button variant="secondary" className="lg:hidden" icon={<SlidersHorizontal size={16} aria-hidden />} onClick={() => setShowFilters((s) => !s)} aria-expanded={showFilters}>
          <span className="hidden sm:inline">Filters</span>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden h-fit rounded-3xl border border-uni-border bg-white p-5 shadow-card lg:block" aria-label="Meal filters">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-slate-900"><SlidersHorizontal size={18} aria-hidden /> Filters</h2>
          {filters}
        </aside>
        <section aria-labelledby="meals-h">
          {showFilters && <div className="mb-4 rounded-3xl border border-uni-border bg-white p-4 shadow-card lg:hidden">{filters}</div>}
          <div className="mb-3 flex items-center justify-between">
            <h2 id="meals-h" className="font-display text-xl font-bold text-slate-900" aria-live="polite">Available Dishes ({results.length})</h2>
            {active && <Button variant="ghost" size="sm" onClick={reset} icon={<RotateCcw size={15} aria-hidden />}>Clear</Button>}
          </div>
          {results.length === 0 ? (
            <EmptyState title="No dishes match" description="Nothing currently shared matches these filters. Try removing a dietary filter or widening the distance." action={<Button onClick={reset}>Clear filters</Button>} />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((m) => (
                <MealCard key={m.id} meal={m} claimed={isMealClaimed(m.id)} onClaim={() => setConfirm(m)} />
              ))}
            </div>
          )}
          {foodAds[0] && (
            <div className="mt-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-uni-muted">Sponsored · sample ad</p>
              <SponsoredAd ad={foodAds[0]} variant="banner" />
            </div>
          )}
        </section>
      </div>

      <ConfirmDialog
        open={!!confirm}
        title={`Claim ${confirm?.dish ?? ''}?`}
        description={confirm ? `Shared by ${confirm.student}` : ''}
        confirmLabel="Request claim"
        icon={<UtensilsCrossed size={20} />}
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          if (!confirm) return;
          claimMeal(confirm);
          toast({ title: 'Claim requested!', description: `Pick up ${confirm.dish} at ${confirm.pickup}, ${confirm.window}. (Simulated — no real food is reserved.)` });
          setConfirm(null);
        }}
      >
        {confirm && (
          <div className="flex gap-3 rounded-2xl bg-uni-soft p-3">
            <FoodArt emoji={confirm.emoji} hue={confirm.hue} className="h-16 w-16 shrink-0 rounded-xl" />
            <div className="text-sm text-slate-800">
              <p><strong>Pickup:</strong> {confirm.pickup}</p>
              <p><strong>When:</strong> {confirm.window}</p>
              <p><strong>Portion:</strong> 1 of {confirm.quantity}</p>
            </div>
          </div>
        )}
      </ConfirmDialog>

      <ShareFoodModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        locations={u.campusLocations}
        onSubmit={(m) => {
          shareMeal(m);
          setShareOpen(false);
          reset();
          toast({ title: 'Food shared!', description: `${m.dish} is now listed for ${u.shortName} students (demo).` });
        }}
      />
    </div>
  );
}

function ShareFoodModal({ open, onClose, onSubmit, locations }: { open: boolean; onClose: () => void; locations: string[]; onSubmit: (m: Omit<Meal, 'id' | 'student' | 'distanceKm' | 'emoji' | 'hue' | 'userCreated' | 'allergens'>) => void }) {
  const blank = { dish: '', description: '', quantity: '2', pickup: locations[0], time: 'Today · 5:00–7:00 PM', tags: [] as DietTag[] };
  const [f, setF] = useState(blank);
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (open) {
      setF(blank);
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (f.dish.trim().length < 2) err.dish = 'Enter the dish name.';
    if (f.description.trim().length < 5) err.description = 'Add a short description (at least 5 characters).';
    const qty = Number(f.quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > 20) err.quantity = 'Quantity must be between 1 and 20.';
    if (!f.pickup.trim()) err.pickup = 'Enter a pickup location.';
    if (!f.time.trim()) err.time = 'Enter a pickup time window.';
    setErrors(err);
    if (Object.keys(err).length) return;
    onSubmit({ dish: f.dish.trim(), description: f.description.trim(), quantity: qty, pickup: f.pickup.trim(), window: f.time.trim(), tags: f.tags });
  };
  return (
    <Modal open={open} onClose={onClose} title="Share food" description="Post extra food for other students. Saved on this device only." icon={<UtensilsCrossed size={20} />}>
      <form onSubmit={submit} noValidate className="space-y-4">
        <TextField label="Dish name" placeholder="e.g. Vegetable Biryani" value={f.dish} onChange={(e) => setF({ ...f, dish: e.target.value })} error={errors.dish} data-autofocus />
        <TextArea label="Description" placeholder="Ingredients, how much is left, anything to know…" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} error={errors.description} />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Quantity (portions)" type="number" min={1} value={f.quantity} onChange={(e) => setF({ ...f, quantity: e.target.value })} error={errors.quantity} />
          <TextField label="Pickup time" value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })} error={errors.time} />
        </div>
        <TextField label="Pickup location" value={f.pickup} onChange={(e) => setF({ ...f, pickup: e.target.value })} error={errors.pickup} list="meal-locations" />
        <datalist id="meal-locations">{locations.map((l) => <option key={l} value={l} />)}</datalist>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-slate-800">Dietary tags <span className="font-normal text-slate-500">(optional)</span></legend>
          <div className="flex flex-wrap gap-2">
            {DIET_TAGS.map((t) => (
              <Chip key={t} active={f.tags.includes(t)} onClick={() => setF({ ...f, tags: f.tags.includes(t) ? f.tags.filter((x) => x !== t) : [...f.tags, t] })}>{t}</Chip>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">Post food</Button>
        </div>
      </form>
    </Modal>
  );
}
