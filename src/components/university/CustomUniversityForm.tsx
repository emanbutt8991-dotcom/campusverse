import { useState, type FormEvent } from 'react';
import type { CustomUniversityInput } from '../../types/university';
import { TextField } from '../common/Field';
import { Button } from '../common/Button';
import { derivePalette } from '../../utils/generateCustomUniversity';
import { isValidHex } from '../../config/themeTokens';
import { MascotArt } from './MascotArt';
import { makeMonogram } from '../../utils/generateCustomUniversity';
import { buildTokens } from '../../config/themeTokens';

interface Props {
  initial?: Partial<CustomUniversityInput>;
  onSubmit: (input: CustomUniversityInput) => void;
  onCancel: () => void;
}

export function CustomUniversityForm({ initial, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<CustomUniversityInput>({ name: '', city: '', province: '', country: 'Canada', primary: '', secondary: '', ...initial });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof CustomUniversityInput) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const palette = derivePalette(form.name || 'Your University', form.primary, form.secondary);
  const tokens = buildTokens(palette);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 3) errs.name = 'Please enter your university name (at least 3 characters).';
    if (form.city.trim().length < 2) errs.city = 'Please enter the city your campus is in.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit(form);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="flex items-center gap-4 rounded-2xl p-4" style={{ background: tokens.soft }}>
        <MascotArt kind="monogram" primary={palette.primary} highlight={tokens.highlight} monogram={makeMonogram(form.name || 'Your University')} size={56} label="Generated monogram crest preview" />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: tokens.ink }}>
            Live preview
          </p>
          <p className="truncate font-display text-lg font-bold text-slate-900">{form.name || 'Your University'}</p>
          <div className="mt-1 flex gap-1.5">
            {[palette.primary, palette.secondary, palette.accent].map((c, i) => (
              <span key={i} className="h-4 w-4 rounded-full ring-1 ring-black/10" style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>
      <TextField label="University name" placeholder="e.g. University of Ottawa" value={form.name} onChange={set('name')} error={errors.name} required data-autofocus />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="City" placeholder="e.g. Ottawa" value={form.city} onChange={set('city')} error={errors.city} required />
        <TextField label="Province / state / region" optional value={form.province} onChange={set('province')} />
      </div>
      <TextField label="Country" value={form.country} onChange={set('country')} />
      <div className="grid gap-4 sm:grid-cols-2">
        <ColourInput label="Primary colour" value={form.primary ?? ''} fallback={palette.primary} onChange={(v) => setForm((f) => ({ ...f, primary: v }))} />
        <ColourInput label="Secondary colour" value={form.secondary ?? ''} fallback={palette.secondary} onChange={(v) => setForm((f) => ({ ...f, secondary: v }))} />
      </div>
      <p className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600">
        Colours are optional — leave them blank and CampusVerse generates a consistent palette from the name. Generated colours, the crest and all sample content are not official and not associated with your institution.
      </p>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" style={{ background: palette.primary, color: tokens.onPrimary }}>
          Create my campus
        </Button>
      </div>
    </form>
  );
}

export function ColourInput({ label, value, fallback, onChange }: { label: string; value: string; fallback: string; onChange: (v: string) => void }) {
  const shown = isValidHex(value) ? (value.startsWith('#') ? value : `#${value}`) : fallback;
  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-slate-800">
        {label} <span className="font-normal text-slate-500">(optional)</span>
      </span>
      <div className="flex items-center gap-2">
        <input type="color" aria-label={`${label} picker`} value={shown.length === 7 ? shown : fallback} onChange={(e) => onChange(e.target.value)} className="h-11 w-14 cursor-pointer rounded-xl border border-slate-200 bg-white p-1" />
        <input
          aria-label={`${label} hex value`}
          value={value}
          placeholder={fallback}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 px-3 font-mono text-sm uppercase focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200"
        />
      </div>
    </div>
  );
}
